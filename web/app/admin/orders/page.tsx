import OrderModel from "@/models/Order";
import { dbConnect } from "@/lib/mongodb";
import { requireAdminSession } from "@/lib/require-admin";
import AdminOrderActions from "@/components/admin/AdminOrderActions";

export default async function AdminOrdersPage() {
  await requireAdminSession();
  await dbConnect();

  const orders = await OrderModel.find({})
    .populate({ path: "userId", select: "name email" })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Quản lý đơn hàng</h2>
        <p className="text-sm text-slate-600">Theo dõi và cập nhật trạng thái đơn</p>
      </div>

      <div className="space-y-3">
        {orders.map((order) => {
          const user = order.userId as { name?: string; email?: string } | null;
          return (
            <div key={String(order._id)} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="grid gap-4 lg:grid-cols-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">Mã đơn</p>
                  <p className="mt-1 font-semibold text-slate-900">{order.orderCode}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">Khách hàng</p>
                  <p className="mt-1 font-semibold text-slate-900">{user?.name || "Unknown"}</p>
                  <p className="text-xs text-slate-600">{user?.email || "No email"}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">Thanh toán / Đơn hàng</p>
                  <p className="mt-1 text-sm text-slate-700">{order.paymentStatus} / {order.orderStatus}</p>
                  <p className="text-xs text-slate-600">{order.totalAmount.toLocaleString("vi-VN")}₫</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">Cập nhật nhanh</p>
                  <div className="mt-1">
                    <AdminOrderActions
                      orderId={String(order._id)}
                      currentOrderStatus={order.orderStatus}
                      currentPaymentStatus={order.paymentStatus}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {orders.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
            Chưa có đơn hàng nào
          </div>
        )}
      </div>
    </div>
  );
}
