import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import UserModel from "@/models/User";
import { dbConnect } from "@/lib/mongodb";

export async function POST() {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not allowed in production" }, { status: 403 });
  }

  try {
    await dbConnect();

    const hashedPassword = bcrypt.hashSync("admin123", 10);

    const adminUser = await UserModel.findOneAndUpdate(
      { email: "admin@example.com" },
      {
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
        status: "active",
        provider: "email",
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Admin user created/updated successfully",
      credentials: {
        email: "admin@example.com",
        password: "admin123",
        url: "http://localhost:3000/auth/login",
      },
      user: {
        id: adminUser._id,
        name: adminUser.name,
        email: adminUser.email,
        role: adminUser.role,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create admin" },
      { status: 500 }
    );
  }
}
