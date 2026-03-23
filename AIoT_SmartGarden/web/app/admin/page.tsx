import UserModel from "@/models/User";
import DeviceModel from "@/models/Device";
import OrderModel from "@/models/Order";
import { dbConnect } from "@/lib/mongodb";
import { requireAdminSession } from "@/lib/require-admin";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";

export default async function AdminPage() {
  await requireAdminSession();
  await dbConnect();

  const [users, devices, orders] = await Promise.all([
    UserModel.countDocuments(),
    DeviceModel.countDocuments(),
    OrderModel.countDocuments(),
  ]);

  return <AdminDashboardClient users={users} devices={devices} orders={orders} />;
}
