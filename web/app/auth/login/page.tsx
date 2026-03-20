"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [loginMode, setLoginMode] = useState<"customer" | "admin">("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else if (result?.ok) {
      window.location.href = "/admin";
    }
  };

  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center px-4 py-8">
      <section className="lux-panel w-full rounded-3xl p-7">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Welcome Back</p>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">Đăng nhập Smart Garden</h1>

        {/* Login Mode Tabs */}
        <div className="mt-6 flex gap-2 rounded-lg bg-slate-100 p-1">
          <button
            onClick={() => {
              setLoginMode("customer");
              setError("");
            }}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-semibold transition ${
              loginMode === "customer"
                ? "bg-white text-emerald-700 shadow"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Khách hàng
          </button>
          <button
            onClick={() => {
              setLoginMode("admin");
              setError("");
            }}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-semibold transition ${
              loginMode === "admin"
                ? "bg-white text-emerald-700 shadow"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Admin
          </button>
        </div>

        {/* Customer Login */}
        {loginMode === "customer" && (
          <>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Dùng tài khoản Google để truy cập dashboard và quản lý thiết bị.
            </p>
            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/auth/redirect" })}
              className="mt-6 w-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.01]"
            >
              Tiếp tục với Google
            </button>
          </>
        )}

        {/* Admin Login */}
        {loginMode === "admin" && (
          <>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Nhập email và mật khẩu admin để truy cập bảng điều khiển.
            </p>
            <form onSubmit={handleAdminLogin} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Mật khẩu</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  required
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.01] disabled:opacity-60"
              >
                {loading ? "Đang xử lý..." : "Đăng nhập Admin"}
              </button>
            </form>
          </>
        )}

        <p className="mt-3 text-center text-xs text-slate-500">Bằng cách đăng nhập, bạn đồng ý với điều khoản sử dụng.</p>
      </section>
    </main>
  );
}
