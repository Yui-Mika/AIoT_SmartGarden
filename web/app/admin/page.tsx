import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import UserModel from "@/models/User";
import ProductModel from "@/models/Product";
import OrderModel from "@/models/Order";
import { dbConnect } from "@/lib/mongodb";
import { Users, Package, ShoppingCart, TrendingUp } from "lucide-react";

async function getAdminStats() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "admin") {
    redirect("/auth/login");
  }

  await dbConnect();

  const [totalUsers, totalProducts, totalOrders, totalRevenue] = await Promise.all([
    UserModel.countDocuments({ role: "customer" }),
    ProductModel.countDocuments(),
    OrderModel.countDocuments(),
    OrderModel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalPrice" },
        },
      },
    ]),
  ]);

  return {
    totalUsers,
    totalProducts,
    totalOrders,
    totalRevenue: totalRevenue[0]?.total || 0,
  };
}

interface StatCard {
  title: string;
  value: string | number;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  bgColor: string;
}

export default async function AdminPage() {
  const stats = await getAdminStats();

  const statCards: StatCard[] = [
    {
      title: "Tổng người dùng",
      value: stats.totalUsers,
      change: "+2.5% từ tháng trước",
      icon: Users,
      bgColor: "bg-blue-100",
    },
    {
      title: "Sản phẩm",
      value: stats.totalProducts,
      change: "Cập nhật hôm nay",
      icon: Package,
      bgColor: "bg-emerald-100",
    },
    {
      title: "Tổng đơn hàng",
      value: stats.totalOrders,
      change: "+12% từ tuần trước",
      icon: ShoppingCart,
      bgColor: "bg-orange-100",
    },
    {
      title: "Doanh thu",
      value: `${(stats.totalRevenue / 1000000).toFixed(1)}M₫`,
      change: "+8.2% từ tháng trước",
      icon: TrendingUp,
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Chào mừng trở lại</h2>
        <p className="text-sm text-slate-600">Đây là tổng quan quản lý hệ thống</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="rounded-lg bg-white p-6 shadow-sm border border-slate-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{card.title}</p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">{card.value}</p>
                  <p className="mt-1 text-xs text-slate-500">{card.change}</p>
                </div>
                <div className={`rounded-lg p-3 ${card.bgColor}`}>
                  <Icon className="h-6 w-6 text-slate-700" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Đơn hàng gần đây</h3>
          <div className="mt-4 space-y-3">
            <p className="text-sm text-slate-500 text-center py-6">Chưa có dữ liệu</p>
          </div>
        </div>

        {/* Top Products */}
        <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Sản phẩm bán chạy</h3>
          <div className="mt-4 space-y-3">
            <p className="text-sm text-slate-500 text-center py-6">Chưa có dữ liệu</p>
          </div>
        </div>
      </div>
    </div>
  );
}
