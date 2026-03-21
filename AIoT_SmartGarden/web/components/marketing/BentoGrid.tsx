"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ScanEye, TrendingUp, Cpu, BellDot, Wifi, RefreshCw, AlertTriangle, CheckCircle } from "lucide-react";

/* ─────────────────────────────────────
   Scroll-reveal hook
───────────────────────────────────── */
function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ─────────────────────────────────────
   Vision AI — camera mockup
───────────────────────────────────── */
function VisionMockup() {
  return (
    <div
      className="absolute inset-y-0 right-0 w-[52%] overflow-hidden"
      style={{ borderLeft: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="relative h-full w-full" style={{ background: "#06080F" }}>

        {/* Strawberry leaf photo — replace with /images/strawberry-leaf.jpg when available */}
        <Image
          src="/images/chaucay.webp"
          alt="Strawberry leaf"
          fill
          className="object-cover"
          style={{ opacity: 0.85 }}
        />

        {/* Dark vignette overlay to keep bounding boxes readable */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(6,8,15,0.35) 0%, rgba(6,8,15,0.10) 50%, rgba(6,8,15,0.45) 100%)",
          }}
        />

        {/* Corner brackets — blue */}
        {[
          { t: "8px",  l: "8px",  borderT: true,  borderL: true  },
          { t: "8px",  r: "8px",  borderT: true,  borderR: true  },
          { b: "8px",  l: "8px",  borderB: true,  borderL: true  },
          { b: "8px",  r: "8px",  borderB: true,  borderR: true  },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute h-5 w-5"
            style={{
              top: pos.t, left: pos.l, right: pos.r, bottom: pos.b,
              borderTop:    pos.borderT ? "1.5px solid #3B82F6" : undefined,
              borderLeft:   pos.borderL ? "1.5px solid #3B82F6" : undefined,
              borderRight:  pos.borderR ? "1.5px solid #3B82F6" : undefined,
              borderBottom: pos.borderB ? "1.5px solid #3B82F6" : undefined,
            }}
          />
        ))}

        {/* Detection box 1 — disease (red) */}
        <div
          className="absolute"
          style={{
            left: "14%", top: "22%",
            width: 68, height: 68,
            border: "1.5px solid #EF4444",
            background: "rgba(239,68,68,0.08)",
          }}
        >
          <span
            className="absolute -top-5 left-0 px-1.5 py-0.5 font-mono text-[8px] font-bold"
            style={{ background: "#EF4444", color: "#fff", whiteSpace: "nowrap" }}
          >
            Yellow_Leaf 87%
          </span>
        </div>

        {/* Detection box 2 — pest (amber) */}
        <div
          className="absolute"
          style={{
            right: "14%", bottom: "28%",
            width: 44, height: 38,
            border: "1.5px solid #F59E0B",
            background: "rgba(245,158,11,0.08)",
          }}
        >
          <span
            className="absolute -top-4 left-0 px-1 py-0.5 font-mono text-[7px] font-bold"
            style={{ background: "#F59E0B", color: "#000", whiteSpace: "nowrap" }}
          >
            Aphid 71%
          </span>
        </div>

        {/* Animated scan line */}
        <div
          className="animate-scan-down absolute inset-x-3 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.8), transparent)",
            boxShadow: "0 0 8px rgba(59,130,246,0.5)",
          }}
        />

        {/* Status bar */}
        <div
          className="absolute inset-x-0 bottom-0 flex items-center justify-between px-3 py-1.5"
          style={{ background: "rgba(0,0,0,0.65)" }}
        >
          <span className="font-mono text-[9px]" style={{ color: "#60A5FA" }}>
            CAM_01 · LIVE
          </span>
          <span className="font-mono text-[9px]" style={{ color: "#10b981" }}>
            2 objects
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   Telemetry — SVG sparkline
───────────────────────────────────── */
function TelemetryChart({ visible }: { visible: boolean }) {
  const LINE = "M0,48 C15,44 25,40 38,36 C50,32 60,28 75,24 C88,20 100,16 115,12 C128,9 140,7 155,5 C168,4 182,3 200,2";
  const FILL = `${LINE} L200,56 L0,56 Z`;

  return (
    <div
      className="overflow-hidden rounded-xl p-3"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <svg
        viewBox="0 0 200 56"
        fill="none"
        className="w-full"
        style={{ height: 56 }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="tGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Fill */}
        <path d={FILL} fill="url(#tGrad)" />
        {/* Line */}
        <path
          d={LINE}
          stroke="#10b981"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          strokeDasharray="400"
          className={visible ? "animate-draw-line" : ""}
          style={{ strokeDashoffset: visible ? 0 : 400 }}
        />
        {/* End dot */}
        <circle cx="200" cy="2" r="3" fill="#10b981" className="animate-pulse" />
      </svg>

      {/* Time labels */}
      <div className="mt-1 flex justify-between">
        <span className="font-mono text-[9px]" style={{ color: "var(--text-muted)" }}>
          −24h
        </span>
        <span className="font-mono text-[9px]" style={{ color: "var(--emerald-400)" }}>
          Now ↑
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   ESP32 — circuit mockup
───────────────────────────────────── */
function CircuitMockup() {
  const STATUS = [
    { icon: Wifi,      label: "WiFi",    on: true  },
    { icon: RefreshCw, label: "MQTT",    on: true  },
    { icon: RefreshCw, label: "OTA",     on: false },
  ];

  return (
    <div className="space-y-2">
      {/* Chip block */}
      <div
        className="relative flex items-center justify-center rounded-xl py-3"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      >
        <div
          className="flex h-10 w-16 items-center justify-center rounded-md font-mono text-[9px] font-bold"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "var(--text-secondary)",
            letterSpacing: "0.08em",
          }}
        >
          ESP32-S3
        </div>
      </div>

      {/* Status indicators */}
      <div className="grid grid-cols-3 gap-1.5">
        {STATUS.map(({ icon: Icon, label, on }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1 rounded-lg py-2"
            style={{
              background: on ? "rgba(16,185,129,0.06)" : "rgba(255,255,255,0.02)",
              border: on ? "1px solid rgba(16,185,129,0.15)" : "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <Icon
              size={11}
              style={{ color: on ? "var(--emerald-400)" : "var(--text-muted)" }}
            />
            <span
              className="font-mono text-[8px] font-semibold"
              style={{ color: on ? "var(--emerald-400)" : "var(--text-muted)" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   FCM — stacked notification preview
───────────────────────────────────── */
function NotificationStack() {
  const NOTIFS = [
    {
      icon: AlertTriangle,
      iconColor: "var(--gold-500)",
      bg: "rgba(245,158,11,0.08)",
      border: "rgba(245,158,11,0.20)",
      title: "TDS thấp ngưỡng",
      sub: "SGP-001 · 2 phút trước",
    },
    {
      icon: CheckCircle,
      iconColor: "var(--emerald-500)",
      bg: "rgba(16,185,129,0.06)",
      border: "rgba(16,185,129,0.18)",
      title: "pH ổn định 6.2",
      sub: "SGP-001 · 15 phút trước",
    },
  ];

  return (
    <div className="space-y-2">
      {NOTIFS.map(({ icon: Icon, iconColor, bg, border, title, sub }, i) => (
        <div
          key={title}
          className="flex items-start gap-2.5 rounded-xl px-3 py-2.5"
          style={{
            background: bg,
            border: `1px solid ${border}`,
            transform: i === 1 ? "scale(0.96)" : "scale(1)",
            opacity: i === 1 ? 0.75 : 1,
            transition: "transform 0.2s ease",
          }}
        >
          <Icon size={13} style={{ color: iconColor, flexShrink: 0, marginTop: 1 }} />
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold" style={{ color: "var(--text-primary)" }}>
              {title}
            </p>
            <p className="mt-0.5 font-mono text-[9px]" style={{ color: "var(--text-muted)" }}>
              {sub}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────
   Main component
───────────────────────────────────── */
export default function BentoGrid() {
  const { ref, visible } = useScrollReveal();

  const cardBase: React.CSSProperties = {
    transition: "opacity 0.7s ease, transform 0.7s ease, border-color 0.25s ease, box-shadow 0.25s ease",
  };

  const hidden: React.CSSProperties = { opacity: 0, transform: "translateY(36px)" };
  const shown: React.CSSProperties  = { opacity: 1, transform: "translateY(0)" };

  return (
    <section
      className="relative overflow-hidden"
      style={{ marginTop: "6rem", paddingBottom: "2rem" }}
    >
      {/* Subtle dot-grid background for the whole section */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 md:px-6">

        {/* ── Section header ── */}
        <div
          className="mb-12 flex items-end justify-between"
          style={Object.assign({}, cardBase, visible ? { ...shown, transitionDelay: "0ms" } : hidden)}
        >
          <div className="flex items-start gap-5">
            {/* Accent — vertical line + section number */}
            <div className="flex flex-col items-center gap-2 pt-1">
              <div
                className="h-10 w-px"
                style={{
                  background: "linear-gradient(to bottom, var(--emerald-500), transparent)",
                }}
              />
              <span
                className="font-mono text-[11px] font-bold"
                style={{ color: "var(--emerald-500)", letterSpacing: "0.12em" }}
              >
                01
              </span>
            </div>

            <div>
              <p
                className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.15em]"
                style={{ color: "var(--emerald-500)" }}
              >
                // CORE TECHNOLOGY
              </p>
              <h2
                className="text-3xl font-bold leading-tight md:text-4xl"
                style={{ color: "var(--text-primary)" }}
              >
                Trí tuệ nhân tạo{" "}
                <span className="text-gradient-emerald">hội tụ.</span>
              </h2>
              <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                Kiến trúc phần cứng và phần mềm hoạt động liền mạch.
              </p>
            </div>
          </div>
        </div>

        {/* ── Bento grid ── */}
        <div
          ref={ref}
          className="grid auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2"
        >

          {/* ══ Card 1: Vision AI (2×2) ══ */}
          <div
            className="group relative col-span-1 overflow-hidden rounded-3xl md:col-span-2 md:row-span-2"
            style={Object.assign({}, cardBase,
              visible ? { ...shown, transitionDelay: "100ms" } : hidden,
              {
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)",
              }
            )}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.35)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(59,130,246,0.10)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            {/* Ambient glow */}
            <div
              className="pointer-events-none absolute right-0 top-0 h-56 w-56 -translate-y-1/4 translate-x-1/4 rounded-full blur-3xl"
              style={{ background: "rgba(59,130,246,0.08)" }}
            />

            {/* Left content */}
            <div className="relative z-10 flex h-full flex-col justify-between p-6" style={{ width: "48%" }}>
              <div>
                <div
                  className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{
                    background: "rgba(59,130,246,0.10)",
                    border: "1px solid rgba(59,130,246,0.20)",
                    color: "var(--blue-400)",
                  }}
                >
                  <ScanEye size={20} />
                </div>
                <span
                  className="font-mono text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: "var(--text-muted)" }}
                >
                  YOLOv8 · CV
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                  Vision AI
                </h3>
                <p
                  className="mt-2 text-xs leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Phát hiện bệnh lá, sâu hại bằng bounding boxes — độ chính xác cao.
                </p>

                {/* Tag pills */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {["Detection", "Classify", "Alert"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full px-2 py-0.5 font-mono text-[9px] font-semibold"
                      style={{
                        background: "rgba(59,130,246,0.08)",
                        color: "var(--blue-400)",
                        border: "1px solid rgba(59,130,246,0.18)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Camera mockup — right half */}
            <VisionMockup />
          </div>

          {/* ══ Card 2: Telemetry (2×1) ══ */}
          <div
            className="group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-3xl p-5 md:col-span-2"
            style={Object.assign({}, cardBase,
              visible ? { ...shown, transitionDelay: "200ms" } : hidden,
              {
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)",
              }
            )}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border-emerald)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 36px rgba(16,185,129,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            {/* Ambient glow */}
            <div
              className="pointer-events-none absolute right-0 top-0 h-40 w-40 -translate-y-1/4 translate-x-1/4 rounded-full blur-3xl"
              style={{ background: "rgba(16,185,129,0.07)" }}
            />

            {/* Top row */}
            <div className="relative z-10 flex items-start justify-between">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  background: "rgba(16,185,129,0.10)",
                  border: "1px solid rgba(16,185,129,0.20)",
                  color: "var(--emerald-400)",
                }}
              >
                <TrendingUp size={18} />
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className="h-1.5 w-1.5 animate-pulse rounded-full"
                  style={{ background: "var(--emerald-500)" }}
                />
                <span
                  className="font-mono text-[9px] font-semibold uppercase tracking-widest"
                  style={{ color: "var(--text-muted)" }}
                >
                  LIVE · MQTT
                </span>
              </div>
            </div>

            {/* Sparkline */}
            <div className="relative z-10 flex-1 py-2">
              <TelemetryChart visible={visible} />
            </div>

            {/* Bottom label */}
            <div className="relative z-10">
              <h3 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
                Telemetry & Time-Series
              </h3>
              <p className="mt-0.5 text-xs" style={{ color: "var(--text-secondary)" }}>
                Biểu đồ sinh trưởng · MongoDB Atlas
              </p>
            </div>
          </div>

          {/* ══ Card 3: ESP32 (1×1) ══ */}
          <div
            className="group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-3xl p-5"
            style={Object.assign({}, cardBase,
              visible ? { ...shown, transitionDelay: "300ms" } : hidden,
              {
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)",
              }
            )}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 28px rgba(255,255,255,0.03)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <div className="flex items-start justify-between">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  color: "var(--text-secondary)",
                }}
              >
                <Cpu size={18} />
              </div>
              <span
                className="font-mono text-[9px] font-semibold uppercase tracking-widest"
                style={{ color: "var(--text-muted)" }}
              >
                ESP32
              </span>
            </div>

            <CircuitMockup />

            <div>
              <h3 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
                Hardware Core
              </h3>
              <p className="mt-0.5 text-xs" style={{ color: "var(--text-secondary)" }}>
                MCU dual-core · OTA update
              </p>
            </div>
          </div>

          {/* ══ Card 4: FCM Alerts (1×1) ══ */}
          <div
            className="group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-3xl p-5"
            style={Object.assign({}, cardBase,
              visible ? { ...shown, transitionDelay: "400ms" } : hidden,
              {
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)",
              }
            )}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border-gold)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(245,158,11,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            {/* Ambient glow */}
            <div
              className="pointer-events-none absolute right-0 top-0 h-32 w-32 -translate-y-1/4 translate-x-1/4 rounded-full blur-2xl"
              style={{ background: "rgba(245,158,11,0.08)" }}
            />

            <div className="relative z-10 flex items-start justify-between">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  background: "rgba(245,158,11,0.10)",
                  border: "1px solid rgba(245,158,11,0.20)",
                  color: "var(--gold-400)",
                }}
              >
                <BellDot size={18} />
              </div>
              <span
                className="font-mono text-[9px] font-semibold uppercase tracking-widest"
                style={{ color: "var(--text-muted)" }}
              >
                FCM · Push
              </span>
            </div>

            <div className="relative z-10 flex-1 py-2">
              <NotificationStack />
            </div>

            <div className="relative z-10">
              <h3 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
                Smart Alerts
              </h3>
              <p className="mt-0.5 text-xs" style={{ color: "var(--text-secondary)" }}>
                Firebase · Push tức thì
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
