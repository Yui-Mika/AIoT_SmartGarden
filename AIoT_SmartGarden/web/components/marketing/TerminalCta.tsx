"use client";

import { Terminal } from "lucide-react";

export default function TerminalCta() {
  return (
    <section
      className="mx-auto w-full max-w-4xl px-4 md:px-6"
      style={{ marginTop: "5rem", marginBottom: "5rem" }}
    >
      <div
        className="overflow-hidden rounded-2xl"
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-normal)",
          boxShadow: "var(--shadow-elevated)",
        }}
      >
        {/* Terminal title bar */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{
            background: "var(--bg-overlay)",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          {/* Traffic light dots */}
          <div className="h-3 w-3 rounded-full" style={{ background: "#EF4444", opacity: 0.85 }} />
          <div className="h-3 w-3 rounded-full" style={{ background: "#F59E0B", opacity: 0.85 }} />
          <div className="h-3 w-3 rounded-full" style={{ background: "#22C55E", opacity: 0.85 }} />
          <div className="ml-3 flex items-center gap-2">
            <Terminal size={12} style={{ color: "var(--text-muted)" }} />
            <span
              className="font-mono text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              bash — root@smart-garden
            </span>
          </div>
        </div>

        {/* Terminal body */}
        <div className="p-6 font-mono text-sm md:p-8">
          {/* Command line */}
          <div className="mb-1" style={{ color: "var(--emerald-400)" }}>
            $ ./initialize_garden.sh
          </div>

          {/* Output lines */}
          <div className="mb-5 space-y-1" style={{ color: "var(--text-secondary)" }}>
            <p>
              <span style={{ color: "var(--text-muted)" }}>[....] </span>
              Loading protocols...
            </p>
            <p>
              <span style={{ color: "var(--emerald-500)" }}>[OK]   </span>
              Core modules ready.
            </p>
            <p style={{ color: "var(--text-secondary)" }}>
              Khu vườn của bạn đã sẵn sàng trực tuyến.
            </p>
            <p style={{ color: "var(--text-secondary)" }}>
              Nhập email để tham gia hệ sinh thái:
            </p>
          </div>

          {/* Input row */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
            <div
              className="flex flex-1 items-center gap-3 rounded-lg px-4 py-3 transition-all"
              style={{
                background: "var(--bg-base)",
                border: "1px solid var(--border-subtle)",
              }}
              onFocusCapture={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(16,185,129,0.45)";
              }}
              onBlurCapture={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
              }}
            >
              <span style={{ color: "var(--emerald-500)" }}>&gt;</span>
              <input
                type="email"
                placeholder="admin@domain.com"
                className="w-full bg-transparent text-sm focus:outline-none"
                style={{
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-mono)",
                }}
              />
            </div>

            <button
              type="button"
              className="btn-emerald flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest"
            >
              Execute
            </button>
          </div>

          {/* Bottom hint */}
          <p className="mt-4 text-xs" style={{ color: "var(--text-muted)" }}>
            // Không spam. Huỷ đăng ký bất kỳ lúc nào.
          </p>
        </div>
      </div>
    </section>
  );
}
