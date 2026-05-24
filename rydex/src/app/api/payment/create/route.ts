import { NextResponse } from "next/server"
import razorpay from "@/lib/razorpay"
import connectDb from "@/lib/db"
import Booking from "@/models/booking.model"

export async function POST(req: Request) {
  try {

    await connectDb()

    const { bookingId } = await req.json()

    const booking = await Booking.findById(bookingId)

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      )
    }

    const order = await razorpay.orders.create({
      amount: Number(booking.fare) * 100,
      currency: "INR",
      receipt: booking._id.toString(),
    })

    booking.status = "awaiting_payment"

    await booking.save()

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    })

  } catch (error: any) {

    console.log("RAZORPAY ERROR:", error)

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    )
  }
}