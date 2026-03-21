"use client";

import { signIn } from "next-auth/react";
import { Leaf, ShieldCheck, Zap, Lock } from "lucide-react";

const FEATURES = [
  { icon: ShieldCheck, label: "Bảo mật OAuth 2.0" },
  { icon: Zap,         label: "Truy cập dashboard ngay" },
  { icon: Lock,        label: "Dữ liệu được mã hóa" },
];

export default function LoginPage() {
  return (
    <main
      className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden px-4 py-8"
      style={{ background: "var(--bg-base)" }}
    >
      {/* ── Ambient glow blobs ── */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/4 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "rgba(16,185,129,0.07)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-1/4 h-[320px] w-[320px] translate-x-1/3 translate-y-1/3 rounded-full blur-3xl"
        style={{ background: "rgba(59,130,246,0.05)" }}
      />

      {/* ── Auth card ── */}
      <div
        className="animate-scale-in relative z-10 w-full max-w-md overflow-hidden rounded-2xl"
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-normal)",
          boxShadow: "var(--shadow-elevated), var(--glow-emerald)",
        }}
      >
        {/* Top accent bar */}
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--emerald-500), transparent)",
          }}
        />

        <div className="p-8 md:p-10">
          {/* Logo */}
          <div className="mb-8 flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{
                background:
                  "linear-gradient(135deg, var(--emerald-500), var(--emerald-600))",
              }}
            >
              <Leaf size={18} color="#fff" />
            </div>
            <span
              className="text-sm font-black uppercase tracking-[0.18em]"
              style={{ color: "var(--text-primary)" }}
            >
              Smart Garden
            </span>
          </div>

          {/* Heading */}
          <p
            className="mb-1 font-mono text-xs font-semibold uppercase tracking-[0.15em]"
            style={{ color: "var(--emerald-500)" }}
          >
            // WELCOME BACK
          </p>
          <h1
            className="text-3xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Đăng nhập
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            Dùng tài khoản Google để truy cập dashboard và quản lý thiết bị.
          </p>

          {/* Feature pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {FEATURES.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-secondary)",
                }}
              >
                <Icon size={11} style={{ color: "var(--emerald-400)" }} />
                {label}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="divider-glow my-7" />

          {/* Google sign-in button */}
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/auth/redirect" })}
            className="group flex w-full items-center justify-center gap-3 rounded-xl px-5 py-3.5 font-semibold transition-all duration-150"
            style={{
              background: "var(--bg-overlay)",
              border: "1px solid var(--border-normal)",
              color: "var(--text-primary)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "var(--border-strong)";
              (e.currentTarget as HTMLElement).style.background =
                "rgba(255,255,255,0.05)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "var(--border-normal)";
              (e.currentTarget as HTMLElement).style.background =
                "var(--bg-overlay)";
            }}
          >
            {/* Google icon */}
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-sm">Tiếp tục với Google</span>
          </button>

          {/* Primary CTA */}
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/auth/redirect" })}
            className="btn-emerald mt-3 w-full justify-center py-3.5 text-sm"
          >
            Đăng nhập ngay
          </button>

          {/* Footer note */}
          <p
            className="mt-6 text-center text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            Bằng cách đăng nhập, bạn đồng ý với{" "}
            <span style={{ color: "var(--text-secondary)" }}>
              điều khoản sử dụng
            </span>{" "}
            của Smart Garden AIoT.
          </p>
        </div>
      </div>
    </main>
  );
}
