import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/db";
import Booking from "@/models/booking.model";
import { auth } from "@/auth";
import axios from "axios";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Properly destructured for Next.js strict typing
) {
  await connectDb();
  
  // Destructure id safely after awaiting params
  const { id } = await params;
  
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const driverId = session.user.id;

  const booking = await Booking.findOneAndUpdate(
    {
      _id: id,
      driver: driverId,
      status: "requested",
    },
    {
      status: "rejected",
    },
    { new: true }
  );

  // Check if booking exists BEFORE using booking.user or emitting sockets
  if (!booking) {
    return NextResponse.json(
      { message: "Ride already processed or invalid" },
      { status: 400 }
    );
  }

  // Safe to emit now that we know booking is valid
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_SOCKET_SERVER}/emit`,
      {
        userId: booking.user,
        event: "booking-updated",
        data: {
          bookingId: booking._id,
          status: "rejected",
        },
      }
    );
  } catch (socketError) {
    console.error("Socket emission failed:", socketError);
    // Left inside a try/catch so a downtime on the socket server doesn't break the endpoint
  }

  return NextResponse.json({ success: true });
}
