import connectDb from "@/lib/db";
import Booking from "@/models/booking.model";
import { NextResponse } from "next/server";
import User from "@/models/user.model"; 

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDb();
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: "Missing booking ID" }, { status: 400 });
    }

    // This fetches the booking and attaches driver details
    const booking = await Booking.findById(id).populate("driver");

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Sends the object directly to match the frontend
    return NextResponse.json(booking);
    
  } catch (error: any) {
    console.error("BACKEND FETCH ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
