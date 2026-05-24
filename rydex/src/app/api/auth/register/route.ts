import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user.model";
import connectDb from "@/lib/db";
import { sendMail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    console.log("🔥 REGISTER API HIT");

    /* ---------------- CONNECT DB ---------------- */
    await connectDb();
    console.log("✅ DB CONNECTED");

    /* ---------------- READ BODY ---------------- */
    let body;
    try {
      body = await req.json();
    } catch (err) {
      console.log("❌ INVALID JSON BODY");
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }

    const { name, email, password } = body;

    console.log("📩 BODY:", body);

    /* ---------------- VALIDATION ---------------- */
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    /* ---------------- CHECK USER ---------------- */
    const existingUser = await User.findOne({ email });

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    /* ---------------- USER FLOW ---------------- */
    if (existingUser) {
      console.log("⚠️ USER EXISTS");

      if (existingUser.isEmailVerified) {
        return NextResponse.json(
          { message: "User already exists. Please login." },
          { status: 409 }
        );
      }

      existingUser.name = name;
      existingUser.password = hashedPassword;
      existingUser.otp = otp;
      existingUser.otpExpiresAt = otpExpiresAt;

      await existingUser.save();

      console.log("✏️ USER UPDATED");
    } else {
      await User.create({
        name,
        email,
        password: hashedPassword,
        role: "user",
        isEmailVerified: false,
        otp,
        otpExpiresAt,
      });

      console.log("🆕 USER CREATED");
    }

    /* ---------------- EMAIL ---------------- */
    try {
      console.log("📧 SENDING EMAIL...");

      await sendMail(
        email,
        "Your OTP for Email Verification",
        `<h2>Your OTP is <strong>${otp}</strong></h2>`
      );

      console.log("✅ EMAIL SENT");
    } catch (mailError: any) {
      console.error("❌ MAIL ERROR:", mailError);

      return NextResponse.json(
        {
          message: "User saved but email failed",
          error: mailError?.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "OTP sent successfully. Please verify your email." },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("💥 REGISTER ERROR:", error);

    return NextResponse.json(
      {
        message: "Internal server error",
        error: error?.message,
      },
      { status: 500 }
    );
  }
}