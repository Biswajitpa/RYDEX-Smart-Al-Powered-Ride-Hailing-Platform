import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDb from "@/lib/db";
import Vehicle from "@/models/vehicle.model";
import User from "@/models/user.model";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    /* ---------- AUTH CHECK ---------- */
    const session = await auth();
    if (!session?.user?.id || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDb();

    // Safely unpack dynamic route parameters for Next.js App Router
    const { id: vehicleId } = await context.params;

    /* ---------- ATOMIC VEHICLE UPDATE ---------- */
    // Using findByIdAndUpdate bypasses strict validation hooks for mock/test data fields
    const vehicle = await Vehicle.findByIdAndUpdate(
      vehicleId,
      {
        $set: {
          status: "approved",
          rejectionReason: null, // Clear out any previous rejection reason strings cleanly
        }
      },
      { new: true } // Returns the updated vehicle record document
    );

    if (!vehicle) {
      return NextResponse.json({ message: "Vehicle not found" }, { status: 404 });
    }

    /* ---------- UPDATE VENDOR STEP ---------- */
    // Move vendor to LIVE step (7)
    await User.findByIdAndUpdate(vehicle.owner, {
      $set: { vendorOnboardingStep: 7 }
    });

    return NextResponse.json({
      success: true,
      message: "Vehicle pricing approved successfully",
    });
  } catch (error: any) {
    console.error("VEHICLE APPROVE ERROR:", error);
    return NextResponse.json(
      { message: error.message || "Server error occurred during validation" }, 
      { status: 500 }
    );
  }
}
