import Link from "next/link";
import { dbConnect } from "@/lib/mongodb";
import UserModel from "@/models/User";
import { requireAdminSession } from "@/lib/require-admin";

export default async function AdminUsersPage() {
  await requireAdminSession();
  await dbConnect();

  const users = await UserModel.find({})
    .select("name email role status provider createdAt")
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Quản lý người dùng</h2>
        <p className="text-sm text-slate-600">Danh sách user, role, trạng thái tài khoản</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Họ tên</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Email</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Role</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Provider</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Chi tiết</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((user) => {
              const id = String(user._id);
              return (
                <tr key={id}>
                  <td className="px-4 py-3 font-medium text-slate-900">{user.name}</td>
                  <td className="px-4 py-3 text-slate-700">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${user.role === "admin" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${user.status === "active" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{user.provider || "google"}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/users/${id}`} className="font-medium text-emerald-700 hover:underline">
                      Xem hồ sơ
                    </Link>
                  </td>
                </tr>
              );
            })}
            {users.length === 0 && (
              <tr>
                <td className="px-4 py-8 text-center text-slate-500" colSpan={6}>
                  Chưa có user nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
