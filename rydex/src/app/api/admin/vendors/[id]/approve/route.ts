import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/db";
import { auth } from "@/auth";

import User from "@/models/user.model";

// Corrected from PATCH to POST to resolve the 405 Method Not Allowed error
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDb();

    /* ---------- AUTH ---------- */
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id: vendorId } = await context.params;

    /* ---------- ATOMIC UPDATE (Bypasses Schema Validation & Blocks) ---------- */
    const updatedUser = await User.findByIdAndUpdate(
      vendorId,
      {
        $set: {
          vendorStatus: "approved",
          isVendorBlocked: false,
          vendorOnboardingStep: 4,
          videoKycStatus: "pending",
          vendorApprovedAt: new Date(),
        }
      },
      { new: true } // Returns the modified document
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "Vendor profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Vendor approved successfully",
    });
  } catch (error: any) {
    console.error("APPROVE VENDOR ERROR:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
