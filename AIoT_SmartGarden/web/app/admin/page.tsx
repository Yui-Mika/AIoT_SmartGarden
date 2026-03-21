import { Users, Cpu, Package, ShieldAlert, TrendingUp, Activity } from "lucide-react";

const STATS = [
  { icon: Users,       label: "Tổng users",    value: "—",  color: "var(--blue-400)",    bg: "rgba(59,130,246,0.10)" },
  { icon: Cpu,         label: "Thiết bị",      value: "—",  color: "var(--emerald-400)", bg: "rgba(16,185,129,0.10)" },
  { icon: Package,     label: "Đơn hàng",      value: "—",  color: "var(--gold-400)",    bg: "rgba(245,158,11,0.10)" },
  { icon: ShieldAlert, label: "Cảnh báo hệ thống", value: "0", color: "#F87171",        bg: "rgba(239,68,68,0.10)" },
];

const MODULES = [
  { label: "Quản lý Users",    desc: "Xem, ban/unban tài khoản",       status: "Sắp có",     statusClass: "badge-slate" },
  { label: "Quản lý Devices",  desc: "Thiết bị đã đăng ký toàn hệ thống", status: "Sắp có", statusClass: "badge-slate" },
  { label: "Quản lý Orders",   desc: "Đơn hàng, trạng thái, hoàn tiền", status: "Sắp có",   statusClass: "badge-slate" },
  { label: "Quản lý Products", desc: "Thêm/sửa/xoá sản phẩm catalog",  status: "Sắp có",    statusClass: "badge-slate" },
  { label: "System Logs",      desc: "Nhật ký hệ thống, MQTT events",   status: "Sắp có",   statusClass: "badge-slate" },
  { label: "Analytics",        desc: "Tổng hợp metrics toàn nền tảng", status: "Sắp có",    statusClass: "badge-slate" },
];

export default function AdminPage() {
  return (
    <main
      className="flex flex-col"
      style={{ background: "var(--bg-base)", minHeight: "100dvh", paddingTop: "72px" }}
    >
      <div className="container-app py-10 space-y-8">

        {/* ── Page header ── */}
        <div>
          <p
            className="mb-1.5 font-mono text-xs font-semibold uppercase tracking-[0.15em]"
            style={{ color: "var(--emerald-500)" }}
          >
            // ADMIN CONSOLE
          </p>
          <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
            Tổng quan hệ thống — quản lý users, thiết bị và đơn hàng.
          </p>
        </div>

        {/* ── Stats grid ── */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} className="stat-card flex items-center gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{ background: bg, color }}
              >
                <Icon size={18} />
              </div>
              <div>
                <p className="text-2xl font-black" style={{ color }}>
                  {value}
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── System health bar ── */}
        <div
          className="flex items-center gap-4 rounded-2xl px-6 py-4"
          style={{
            background: "rgba(16,185,129,0.06)",
            border: "1px solid rgba(16,185,129,0.16)",
          }}
        >
          <Activity size={18} style={{ color: "var(--emerald-500)" }} />
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: "var(--emerald-400)" }}>
              Hệ thống đang hoạt động bình thường
            </p>
            <p className="mt-0.5 font-mono text-xs" style={{ color: "var(--text-muted)" }}>
              MongoDB Atlas · HiveMQ MQTT · Vercel · Cloudinary
            </p>
          </div>
          <span className="badge badge-emerald">
            <span className="status-dot status-online" style={{ width: 6, height: 6 }} />
            Healthy
          </span>
        </div>

        {/* ── Module cards ── */}
        <div>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
              Modules quản lý
            </h2>
            <span className="badge badge-slate">
              <TrendingUp size={10} />
              Phase tiếp theo
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MODULES.map(({ label, desc, status, statusClass }, i) => (
              <div
                key={label}
                className="dark-card animate-fade-up flex flex-col gap-3 p-5"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
                    {label}
                  </p>
                  <span className={`badge ${statusClass} shrink-0`}>{status}</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {desc}
                </p>
                <button
                  disabled
                  className="btn-ghost mt-auto cursor-not-allowed justify-center py-2 text-xs opacity-40"
                >
                  Mở module
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── Dev note ── */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
            {">"}{" "}
            <span style={{ color: "var(--emerald-400)" }}>MVP Admin:</span>{" "}
            Các module users/orders/products sẽ được bổ sung với phân quyền role-based ở phase phát triển tiếp theo.
          </p>
        </div>
      </div>
    </main>
  );
}
