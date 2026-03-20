"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Zap,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";

const navigationItems = [
  {
    label: "Bảng điều khiển",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Người dùng",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "Sản phẩm",
    href: "/admin/products",
    icon: Package,
  },
  {
    label: "Đơn hàng",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    label: "Chẩn đoán AI",
    href: "/admin/diagnostics",
    icon: Zap,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 flex-col border-r border-slate-200 bg-white lg:flex">
      {/* Logo */}
      <div className="border-b border-slate-200 p-6">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-500">
            <span className="text-sm font-bold text-white">AG</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900">EcoTech</span>
            <span className="text-xs text-slate-500">Admin</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-emerald-100 text-emerald-700"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-200 p-4">
        <button
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition"
        >
          <LogOut className="h-4 w-4" />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
