import { Metadata } from "next";
import { Leaf, Eye, Heart, Cpu, ScanEye, Droplets, LayoutDashboard } from "lucide-react";
import SiteFooter from "@/components/marketing/SiteFooter";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us | Smart Garden AIoT",
  description: "Học thêm về sứ mệnh và công nghệ của Smart Garden AIoT",
};

const PILLARS = [
  {
    icon: Leaf,
    iconColor: "var(--emerald-400)",
    iconBg:   "rgba(16,185,129,0.10)",
    title:    "Sứ mệnh",
    desc:     "Giúp bất kì ai có thể trồng rau sạch, nuôi trồng thủy canh tại nhà một cách dễ dàng và tự động hóa.",
  },
  {
    icon: Eye,
    iconColor: "var(--blue-400)",
    iconBg:   "rgba(59,130,246,0.10)",
    title:    "Tầm nhìn",
    desc:     "Trở thành nền tảng hàng đầu trong kỹ thuật canh tác thông minh tại Đông Nam Á.",
  },
  {
    icon: Heart,
    iconColor: "var(--gold-400)",
    iconBg:   "rgba(245,158,11,0.10)",
    title:    "Giá trị",
    desc:     "Chất lượng, độ tin cậy, tính sáng tạo và sự quan tâm đến cộng đồng nông dân.",
  },
];

const TECH_STACK = [
  {
    icon: Cpu,
    color: "var(--blue-400)",
    label: "Cảm biến IoT",
    desc:  "Đo TDS, pH, nhiệt độ, độ ẩm theo thời gian thực",
  },
  {
    icon: ScanEye,
    color: "var(--emerald-400)",
    label: "AI Diagnosis",
    desc:  "Phân tích ảnh lá cây để phát hiện bệnh và gợi ý xử lý",
  },
  {
    icon: Droplets,
    color: "var(--blue-400)",
    label: "Thủy canh",
    desc:  "Hệ thống NFT, DWC tối ưu cho leafy greens",
  },
  {
    icon: LayoutDashboard,
    color: "var(--gold-400)",
    label: "Dashboard Web",
    desc:  "Giám sát và điều khiển từ bất kỳ thiết bị nào",
  },
];

export default function AboutPage() {
  return (
    <main className="flex flex-col" style={{ background: "var(--bg-base)", minHeight: "100dvh" }}>

      {/* ── Hero section ── */}
      <section
        className="relative overflow-hidden"
        style={{
          paddingTop:    "8rem",
          paddingBottom: "5rem",
          borderBottom:  "1px solid var(--border-subtle)",
        }}
      >
        {/* Ambient glow blobs */}
        <div
          className="pointer-events-none absolute left-0 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: "rgba(16,185,129,0.06)" }}
        />
        <div
          className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 translate-x-1/3 translate-y-1/3 rounded-full blur-3xl"
          style={{ background: "rgba(59,130,246,0.06)" }}
        />

        <div className="container-app relative z-10">
          <p
            className="mb-3 animate-fade-up font-mono text-xs font-semibold uppercase tracking-[0.15em]"
            style={{ color: "var(--emerald-500)" }}
          >
            // OUR MISSION
          </p>
          <h1
            className="animate-fade-up text-4xl font-black md:text-5xl lg:text-6xl"
            style={{ color: "var(--text-primary)", animationDelay: "80ms" }}
          >
            Về Smart Garden AIoT
          </h1>
          <p
            className="animate-fade-up mt-5 max-w-3xl text-base leading-relaxed md:text-lg"
            style={{ color: "var(--text-secondary)", animationDelay: "160ms" }}
          >
            Smart Garden AIoT là nền tảng kết hợp công nghệ thủy canh, IoT và AI để mang lại
            trải nghiệm trồng trọt hiện đại, đơn giản và hiệu quả cho mọi người.
          </p>

          {/* Quick stats */}
          <div
            className="animate-fade-up mt-10 flex flex-wrap gap-8"
            style={{ animationDelay: "240ms" }}
          >
            {[
              { value: "99.9%", label: "System uptime" },
              { value: "6+",    label: "Loại cảm biến" },
              { value: "24/7",  label: "Monitoring" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl font-black text-gradient-emerald">{value}</p>
                <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission / Vision / Values ── */}
      <section className="container-app py-16">
        <div className="mb-10">
          <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Nền tảng cốt lõi
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {PILLARS.map(({ icon: Icon, iconColor, iconBg, title, desc }, i) => (
            <div
              key={title}
              className="dark-card animate-fade-up p-7"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: iconBg, color: iconColor }}
              >
                <Icon size={22} />
              </div>
              <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Technology section ── */}
      <section
        style={{ borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}
      >
        <div className="container-app py-16">
          {/* Header */}
          <div className="mb-10 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p
                className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.15em]"
                style={{ color: "var(--emerald-500)" }}
              >
                // TECH STACK
              </p>
              <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                Công nghệ
              </h2>
            </div>
          </div>

          {/* lux panel — terminal style */}
          <div
            className="relative overflow-hidden rounded-2xl p-7 md:p-10"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-emerald)",
              boxShadow: "var(--glow-emerald)",
            }}
          >
            {/* Ambient glow */}
            <div
              className="pointer-events-none absolute right-0 top-0 h-64 w-64 -translate-y-1/3 translate-x-1/3 rounded-full blur-3xl"
              style={{ background: "rgba(16,185,129,0.08)" }}
            />

            {/* Terminal header */}
            <div className="relative z-10 mb-6 flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#EF4444", opacity: 0.8 }} />
              <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#F59E0B", opacity: 0.8 }} />
              <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#22C55E", opacity: 0.8 }} />
              <span
                className="ml-3 font-mono text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                tech-stack.sh
              </span>
            </div>

            {/* Tech items grid */}
            <div className="relative z-10 grid gap-4 sm:grid-cols-2">
              {TECH_STACK.map(({ icon: Icon, color, label, desc }, i) => (
                <div
                  key={label}
                  className="flex items-start gap-4 rounded-xl p-4 animate-fade-up"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid var(--border-subtle)",
                    animationDelay: `${i * 80}ms`,
                  }}
                >
                  <div
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: "rgba(255,255,255,0.04)", color }}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <p
                      className="font-mono text-sm font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      <span style={{ color: "var(--emerald-500)", marginRight: 6 }}>{">"}</span>
                      {label}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
