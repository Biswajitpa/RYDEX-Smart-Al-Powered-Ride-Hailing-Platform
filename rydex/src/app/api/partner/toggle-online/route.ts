import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDb from "@/lib/db";
import User from "@/models/user.model";

export async function POST(req: NextRequest) {
  try {
    /* ---------- 1. USER AUTHENTICATION ---------- */
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    /* ---------- 2. PARSE FRONTEND payload ---------- */
    const { isOnline, coordinates } = await req.json(); // Array order: [longitude, latitude]

    await connectDb();

    /* ---------- 3. UPDATE DB DOCUMENT ---------- */
    const updatedDriver = await User.findByIdAndUpdate(
      session.user.id,
      {
        $set: {
          isOnline: isOnline,
          // Only create the location object if going online; cleanly handle turning off
          ...(isOnline && {
            location: {
              type: "Point",
              coordinates: coordinates, 
            },
          }),
        },
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: isOnline ? "You are now active and live on the map!" : "You are now offline.",
      driver: updatedDriver,
    });
  } catch (error: any) {
    console.error("TOGGLE ONLINE ROUTE ERROR:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" }, 
      { status: 500 }
    );
  }
}
