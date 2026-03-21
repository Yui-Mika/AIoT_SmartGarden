import Link from "next/link";
import { ArrowRight, LayoutDashboard, Cpu } from "lucide-react";

export default function HomeHero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >
      {/* ── Video Background ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/video_plant.mp4" type="video/mp4" />
      </video>

      {/* ── Gradient Overlay ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(9,9,11,0.65) 0%, rgba(9,9,11,0.40) 35%, rgba(9,9,11,0.75) 75%, #09090B 100%)",
        }}
      />

      {/* ── Ambient glow blobs ── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/3 translate-y-1/3 rounded-full blur-3xl"
        style={{ background: "rgba(16,185,129,0.07)" }}
      />
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-[400px] w-[400px] translate-x-1/3 rounded-full blur-3xl"
        style={{ background: "rgba(59,130,246,0.05)" }}
      />

      {/* ── Main content — 2-col split ── */}
      <div
        className="relative z-20 mx-auto flex w-full max-w-7xl flex-col justify-center px-6 md:px-12"
        style={{ minHeight: "100dvh", paddingTop: "7rem", paddingBottom: "4rem" }}
      >

        {/* ════════════════════════════
            LEFT — Text content
        ════════════════════════════ */}
        <div className="flex flex-col">

          {/* Status badge */}
          <div
            className="mb-6 inline-flex w-fit animate-fade-in items-center gap-2 rounded-full px-4 py-1.5"
            style={{
              background: "rgba(16,185,129,0.10)",
              border: "1px solid rgba(16,185,129,0.25)",
            }}
          >
            <span className="status-dot status-online" style={{ width: 6, height: 6 }} />
            <span
              className="font-mono text-xs font-semibold uppercase tracking-[0.15em]"
              style={{ color: "var(--emerald-400)" }}
            >
              System Online — AIoT v2.0
            </span>
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-up text-5xl font-black leading-[1.06] tracking-tight md:text-6xl lg:text-7xl"
            style={{ animationDelay: "80ms" }}
          >
            <span style={{ color: "var(--text-primary)" }}>Tương lai </span>
            <br />
            <span className="text-gradient-hero">của mảng xanh.</span>
          </h1>

          {/* Description */}
          <p
            className="animate-fade-up mt-5 max-w-lg text-sm leading-relaxed md:text-base"
            style={{ color: "var(--text-secondary)", animationDelay: "180ms" }}
          >
            Hệ sinh thái Smart Garden kết nối vạn vật — giám sát môi trường
            realtime, phân tích hình ảnh bằng AI và tự động hóa toàn bộ
            quá trình sinh trưởng.
          </p>

          {/* CTA buttons */}
          <div
            className="animate-fade-up mt-8 flex flex-wrap gap-3"
            style={{ animationDelay: "280ms" }}
          >
            <Link href="/dashboard" className="btn-emerald gap-2 px-6 py-3 text-sm">
              <LayoutDashboard size={15} />
              Truy cập Dashboard
              <ArrowRight size={13} />
            </Link>
            <Link href="/products" className="btn-ghost gap-2 px-6 py-3 text-sm">
              <Cpu size={15} />
              Khám phá thiết bị
            </Link>
          </div>

          {/* Stats strip */}
          <div
            className="animate-fade-up mt-10 flex flex-wrap gap-8"
            style={{
              animationDelay: "380ms",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              paddingTop: "1.5rem",
            }}
          >
            {[
              { value: "99.9%",  label: "Uptime" },
              { value: "<200ms", label: "Latency" },
              { value: "6+",     label: "Sensors" },
              { value: "24/7",   label: "Monitoring" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-xl font-black" style={{ color: "var(--text-primary)" }}>
                  {value}
                </p>
                <p className="mt-0.5 text-xs" style={{ color: "var(--text-muted)" }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2">
        <div
          className="h-14 w-px animate-pulse"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(16,185,129,0.6), transparent)",
          }}
        />
      </div>
    </section>
  );
}
