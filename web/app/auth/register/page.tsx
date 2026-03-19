"use client";

import { useEffect } from "react";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  useEffect(() => {
    void signIn("google", { callbackUrl: "/auth/redirect" });
  }, []);

  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center px-4 py-8">
      <p className="lux-panel w-full rounded-3xl p-7 text-center text-sm text-slate-700">
        Đang chuyển hướng đến Google OAuth để tạo tài khoản an toàn...
      </p>
    </main>
  );
}
