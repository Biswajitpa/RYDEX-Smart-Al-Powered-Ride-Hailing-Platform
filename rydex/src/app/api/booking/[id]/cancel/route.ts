import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/db";
import Booking from "@/models/booking.model";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Fixed: Changed 'context' to destructured '{ params }'
) {
  await connectDb();

  // Extract the id cleanly
  const { id } = await params;

  // This updates the status automatically in the database
  const booking = await Booking.findOneAndUpdate(
    { _id: id, status: "requested" },
    { status: "cancelled" },
    { new: true } // Returns the updated document
  );

  if (!booking) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  // Removed booking.save() since findOneAndUpdate already handles the database save!

  return NextResponse.json({ success: true });
}
