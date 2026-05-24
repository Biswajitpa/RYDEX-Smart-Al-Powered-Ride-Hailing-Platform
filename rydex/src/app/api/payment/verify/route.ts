import connectDb from "@/lib/db"
import Booking from "@/models/booking.model"
import crypto from "crypto"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    await connectDb()

    const {
      bookingId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = await req.json()

    if (!bookingId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Missing payment data" },
        { status: 400 }
      )
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex")

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 400 }
      )
    }

    const booking = await Booking.findById(bookingId)

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      )
    }

    const adminCommission = Number(booking.fare) * 0.10
    const partnerAmount = Number(booking.fare) - adminCommission

    booking.paymentStatus = "paid"
    booking.status = "confirmed"
    booking.adminCommission = adminCommission
    booking.partnerAmount = partnerAmount

    await booking.save()

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      adminCommission,
      partnerAmount
    })

  } catch (error: any) {
    console.log("VERIFY ERROR:", error)

    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}