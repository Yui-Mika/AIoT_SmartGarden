"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type UserRole = "customer" | "admin";
type UserStatus = "active" | "banned";

interface AdminUserActionsProps {
  userId: string;
  currentRole: UserRole;
  currentStatus: UserStatus;
}

export default function AdminUserActions({
  userId,
  currentRole,
  currentStatus,
}: AdminUserActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const updateUser = async (payload: Partial<{ role: UserRole; status: UserStatus }>) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Cập nhật thất bại");
        return;
      }

      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  const softDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Xóa mềm thất bại");
        return;
      }
      router.push("/admin/users");
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <button
        disabled={loading}
        onClick={() => updateUser({ role: currentRole === "admin" ? "customer" : "admin" })}
        className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
      >
        {currentRole === "admin" ? "Đổi thành Customer" : "Đổi thành Admin"}
      </button>
      <button
        disabled={loading}
        onClick={() => updateUser({ status: currentStatus === "active" ? "banned" : "active" })}
        className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 hover:bg-amber-100 disabled:opacity-60"
      >
        {currentStatus === "active" ? "Ban User" : "Bỏ Ban"}
      </button>
      <button
        disabled={loading}
        onClick={softDelete}
        className="rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 disabled:opacity-60 sm:col-span-2"
      >
        Xóa mềm tài khoản
      </button>
    </div>
  );
}
