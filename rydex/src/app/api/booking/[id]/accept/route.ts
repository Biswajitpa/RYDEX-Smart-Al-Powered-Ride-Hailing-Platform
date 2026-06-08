import connectDb from "@/lib/db";
import Booking from "@/models/booking.model";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDb();

  // Await the params directly to grab the id safely
  const { id } = await params;
  const booking = await Booking.findById(id);

  if (!booking || booking.status !== "requested") {
    return NextResponse.json({ message: "Invalid" }, { status: 400 });
  }

  booking.status = "awaiting_payment";
  booking.paymentDeadline = new Date(Date.now() + 5 * 60 * 1000);

  await booking.save();

  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_SOCKET_SERVER}/emit`,
      {
        userId: booking.user,
        event: "booking-updated",
        data: {
          bookingId: booking._id,
          status: "awaiting_payment",
        },
      }
    );
  } catch (socketError) {
    console.error("Socket emission failed:", socketError);
    // Prevents the build or endpoint from entirely crashing if the socket server is unreachable
  }

  return NextResponse.json({ success: true });
}
