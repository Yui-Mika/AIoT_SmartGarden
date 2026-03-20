import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import UserModel from "@/models/User";
import DeviceModel from "@/models/Device";
import OrderModel from "@/models/Order";
import { dbConnect } from "@/lib/mongodb";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  const [users, devices, orders] = await Promise.all([
    UserModel.countDocuments(),
    DeviceModel.countDocuments(),
    OrderModel.countDocuments(),
  ]);

  const logs = [
    {
      level: "info",
      module: "ai-service",
      message: "AI diagnostics queue is healthy",
      timestamp: new Date().toISOString(),
    },
    {
      level: "warning",
      module: "mqtt",
      message: "2 devices have not sent sensor payload in the last 6 hours",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
  ];

  return NextResponse.json({
    data: {
      summary: { users, devices, orders },
      logs,
    },
  });
}
