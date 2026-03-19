"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center px-4 py-8">
      <section className="lux-panel w-full rounded-3xl p-7">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Welcome Back</p>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">Đăng nhập Smart Garden</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Dùng tài khoản Google để truy cập dashboard và quản lý thiết bị.
        </p>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/auth/redirect" })}
          className="mt-6 w-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.01]"
        >
          Tiếp tục với Google
        </button>
        <p className="mt-3 text-center text-xs text-slate-500">Bằng cách đăng nhập, bạn đồng ý với điều khoản sử dụng.</p>
      </section>
    </main>
  );
}
