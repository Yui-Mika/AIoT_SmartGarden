import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import { requireAdminSession } from "@/lib/require-admin";
import UserModel from "@/models/User";
import DeviceModel from "@/models/Device";
import OrderModel from "@/models/Order";
import AdminUserActions from "@/components/admin/AdminUserActions";

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminSession();
  const { id } = await params;

  await dbConnect();

  const [user, devices, orders] = await Promise.all([
    UserModel.findById(id).lean(),
    DeviceModel.find({ userId: id }).sort({ createdAt: -1 }).lean(),
    OrderModel.find({ userId: id }).sort({ createdAt: -1 }).lean(),
  ]);

  if (!user) {
    notFound();
  }

  const userId = String(user._id);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Hồ sơ người dùng</h2>
        <p className="text-sm text-slate-600">Quản lý quyền, trạng thái và tài sản liên quan</p>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Tên</p>
            <p className="mt-1 font-semibold text-slate-900">{user.name}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Email</p>
            <p className="mt-1 font-semibold text-slate-900">{user.email}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Role</p>
            <p className="mt-1 font-semibold text-slate-900">{user.role}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
            <p className="mt-1 font-semibold text-slate-900">{user.status}</p>
          </div>
        </div>

        <div className="mt-6">
          <AdminUserActions
            userId={userId}
            currentRole={user.role}
            currentStatus={user.status}
          />
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Danh sách chậu</h3>
        <div className="mt-4 space-y-3">
          {devices.map((device) => (
            <div key={String(device._id)} className="rounded-lg border border-slate-200 p-3 text-sm">
              <p className="font-medium text-slate-900">{device.name || device.deviceId}</p>
              <p className="text-slate-600">Device ID: {device.deviceId}</p>
            </div>
          ))}
          {devices.length === 0 && <p className="text-sm text-slate-500">User chưa có thiết bị</p>}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Đơn hàng của user</h3>
        <div className="mt-4 space-y-3">
          {orders.map((order) => (
            <div key={String(order._id)} className="rounded-lg border border-slate-200 p-3 text-sm">
              <p className="font-medium text-slate-900">Mã đơn: {order.orderCode}</p>
              <p className="text-slate-600">Tổng tiền: {order.totalAmount.toLocaleString("vi-VN")}₫</p>
              <p className="text-slate-600">Trạng thái: {order.orderStatus}</p>
            </div>
          ))}
          {orders.length === 0 && <p className="text-sm text-slate-500">User chưa có đơn hàng</p>}
        </div>
      </section>
    </div>
  );
}
