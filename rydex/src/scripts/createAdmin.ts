import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import path from "path";

dotenv.config({ path: ".env.local" });

async function createAdmin() {
  try {
    const mongoUri = process.env.MONGODB_URI;

    console.log("DEBUG URI:", mongoUri); // optional check

    if (!mongoUri) {
      throw new Error("MONGODB_URI not found in .env.local");
    }

    await mongoose.connect(mongoUri);

    const existing = await User.findOne({ email: "admin@gmail.com" });

    if (existing) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
      isEmailVerified: true,
    });

    console.log("✅ Admin created successfully");
    process.exit(0);

  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

createAdmin();