"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import ProductCard from "@/components/marketing/ProductCard";
import { sampleProducts } from "@/lib/mock-data";
import HomeHero from "@/components/marketing/HomeHero";
import BentoGrid from "@/components/marketing/BentoGrid";
import TerminalCta from "@/components/marketing/TerminalCta";
import SiteFooter from "@/components/marketing/SiteFooter";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Home() {
  const { locale } = useLanguage();
  const t = (vi: string, en: string) => (locale === "vi" ? vi : en);

  const trustItems = [
    t("500+ vườn đang hoạt động", "500+ active gardens"),
    "YOLOv8 Vision AI",
    "MQTT Realtime < 200ms",
    "MongoDB Atlas Time-Series",
    t("Firebase Push Alerts", "Firebase Push Alerts"),
  ];

  return (
    <main className="flex-1" style={{ background: "var(--bg-base)" }}>
      <HomeHero />

      {/* ── Stats Trust Bar ── */}
      <div
        className="w-full overflow-x-auto"
        style={{
          borderTop: "1px solid var(--border-subtle)",
          borderBottom: "1px solid var(--border-subtle)",
          background: "rgba(255,255,255,0.015)",
        }}
      >
        <div className="mx-auto flex w-max items-center gap-8 px-6 py-3.5 md:w-full md:max-w-6xl md:justify-center md:px-6">
          {trustItems.map((item) => (
            <span
              key={item}
              className="flex shrink-0 items-center gap-2 text-xs font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              <CheckCircle size={12} style={{ color: "var(--emerald-500)", flexShrink: 0 }} />
              {item}
            </span>
          ))}
        </div>
      </div>

      <BentoGrid />

      {/* ── Product Strip ── */}
      <section
        className="relative mx-auto w-full max-w-6xl px-4 md:px-6"
        style={{ marginTop: "7rem", paddingBottom: "2rem" }}
      >
        {/* Section header */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="animate-fade-up flex items-start gap-5">
            {/* Accent — vertical line + section number */}
            <div className="flex flex-col items-center gap-2 pt-1">
              <div
                className="h-10 w-px"
                style={{
                  background: "linear-gradient(to bottom, var(--gold-400), transparent)",
                }}
              />
              <span
                className="font-mono text-[11px] font-bold"
                style={{ color: "var(--gold-400)", letterSpacing: "0.12em" }}
              >
                02
              </span>
            </div>

            <div>
              <p
                className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.15em]"
                style={{ color: "var(--gold-400)" }}
              >
                // HARDWARE STORE
              </p>
              <h2
                className="text-3xl font-bold leading-tight md:text-4xl"
                style={{ color: "var(--text-primary)" }}
              >
                {t("Nâng cấp", "Upgrade")}{" "}
                <span className="text-gradient-gold">cấu hình</span>{" "}
                {t("của bạn.", "your setup.")}
              </h2>
              <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                {t(
                  "Thiết bị IoT và vật tư chuyên dụng cho vườn thủy canh thông minh.",
                  "IoT devices and specialized supplies for smart hydroponic gardens."
                )}
              </p>
            </div>
          </div>

          <Link
            href="/products"
            className="animate-fade-up link-muted-emerald flex shrink-0 items-center gap-1.5 rounded-xl border px-4 py-2 font-mono text-xs font-semibold transition-colors"
            style={{
              borderColor: "var(--border-subtle)",
              color: "var(--text-secondary)",
            }}
          >
            {t("Xem tất cả sản phẩm", "View all products")}
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Product cards grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sampleProducts.slice(0, 3).map((product, i) => (
            <div
              key={product.slug}
              className="animate-fade-up"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      <TerminalCta />

      <SiteFooter />
    </main>
  );
}
