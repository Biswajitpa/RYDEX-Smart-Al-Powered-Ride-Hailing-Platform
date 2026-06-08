import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/db";
import Booking from "@/models/booking.model";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // 1. Fixed: Changed params to a Promise
) {
  await connectDb();

  // 2. Fixed: Await the params to safely get the id
  const { id } = await params; 

  const booking = await Booking.findById(id);
  if (!booking) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  booking.status = "arrived";
  booking.arrivedAt = new Date();

  await booking.save();

  return NextResponse.json({ success: true });
}
