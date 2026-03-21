"use client";

import Link from "next/link";
import { ArrowRight, Star, Leaf, FlaskConical, Cpu, Tag, ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/providers/CartProvider";

type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  salePrice?: number | null;
  rating?: number;
};

/* ── Per-category design tokens ── */
const CATEGORY_CONFIG: Record<
  string,
  {
    label: string;
    icon: React.ElementType;
    gradient: string;
    glow: string;
    accent: string;
    accentBg: string;
    accentBorder: string;
    badgeColor: string;
  }
> = {
  seeds: {
    label: "Hạt Giống",
    icon: Leaf,
    gradient:
      "linear-gradient(135deg, rgba(16,185,129,0.18) 0%, rgba(5,150,105,0.08) 60%, rgba(16,185,129,0.04) 100%)",
    glow: "rgba(16,185,129,0.12)",
    accent: "var(--emerald-400)",
    accentBg: "rgba(16,185,129,0.10)",
    accentBorder: "rgba(16,185,129,0.22)",
    badgeColor: "var(--emerald-500)",
  },
  nutrients: {
    label: "Dinh Dưỡng",
    icon: FlaskConical,
    gradient:
      "linear-gradient(135deg, rgba(59,130,246,0.18) 0%, rgba(37,99,235,0.08) 60%, rgba(59,130,246,0.04) 100%)",
    glow: "rgba(59,130,246,0.12)",
    accent: "var(--blue-400)",
    accentBg: "rgba(59,130,246,0.10)",
    accentBorder: "rgba(59,130,246,0.22)",
    badgeColor: "#60A5FA",
  },
  "smart-pots": {
    label: "Smart Pot",
    icon: Cpu,
    gradient:
      "linear-gradient(135deg, rgba(245,158,11,0.18) 0%, rgba(217,119,6,0.08) 60%, rgba(245,158,11,0.04) 100%)",
    glow: "rgba(245,158,11,0.12)",
    accent: "var(--gold-400)",
    accentBg: "rgba(245,158,11,0.10)",
    accentBorder: "rgba(245,158,11,0.22)",
    badgeColor: "var(--gold-400)",
  },
};

const FALLBACK_CONFIG = CATEGORY_CONFIG["seeds"];

export default function ProductCard({ product }: { product: Product }) {
  const displayedPrice = product.salePrice ?? product.price;
  const hasDiscount    = Boolean(product.salePrice);
  const cfg            = CATEGORY_CONFIG[product.category] ?? FALLBACK_CONFIG;
  const Icon           = cfg.icon;
  const discountPct    = hasDiscount
    ? Math.round((1 - (product.salePrice! / product.price)) * 100)
    : 0;

  const { add } = useCart();
  const [added, setAdded] = useState(false);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    add({ slug: product.slug, name: product.name, category: product.category, price: product.price, salePrice: product.salePrice });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-3xl"
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-subtle)",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = cfg.accentBorder;
        el.style.boxShadow   = `0 8px 40px ${cfg.glow}, 0 0 0 1px ${cfg.accentBorder}`;
        el.style.transform   = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border-subtle)";
        el.style.boxShadow   = "none";
        el.style.transform   = "translateY(0)";
      }}
    >
      {/* ── Visual zone ── */}
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{ height: 180, background: cfg.gradient }}
      >
        {/* Ambient glow blob */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{
            background: `radial-gradient(circle at 50% 60%, ${cfg.glow} 0%, transparent 70%)`,
          }}
        />

        {/* Decorative grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Central icon */}
        <div
          className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl"
          style={{
            background: cfg.accentBg,
            border: `1px solid ${cfg.accentBorder}`,
            backdropFilter: "blur(8px)",
            boxShadow: `0 0 32px ${cfg.glow}`,
          }}
        >
          <Icon size={36} style={{ color: cfg.accent }} />
        </div>

        {/* Floating category badge — top left */}
        <div
          className="absolute left-3.5 top-3.5 flex items-center gap-1.5 rounded-full px-2.5 py-1"
          style={{
            background: "rgba(9,9,11,0.70)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: cfg.badgeColor }}
          />
          <span
            className="font-mono text-[10px] font-semibold uppercase tracking-wider"
            style={{ color: cfg.accent }}
          >
            {cfg.label}
          </span>
        </div>

        {/* Sale badge — top right */}
        {hasDiscount && (
          <div
            className="absolute right-3.5 top-3.5 flex items-center gap-1 rounded-full px-2 py-1"
            style={{
              background: "rgba(239,68,68,0.15)",
              border: "1px solid rgba(239,68,68,0.30)",
            }}
          >
            <Tag size={9} style={{ color: "#F87171" }} />
            <span className="font-mono text-[10px] font-bold" style={{ color: "#F87171" }}>
              -{discountPct}%
            </span>
          </div>
        )}
      </div>

      {/* ── Content zone ── */}
      <div className="flex flex-1 flex-col p-5">
        {/* Rating */}
        <div className="mb-3 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={10}
              fill={(product.rating ?? 0) > i ? "currentColor" : "none"}
              style={{
                color: (product.rating ?? 0) > i ? "var(--gold-400)" : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
          <span
            className="ml-1 font-mono text-[10px]"
            style={{ color: "var(--text-muted)" }}
          >
            {(product.rating ?? 0).toFixed(1)}
          </span>
        </div>

        {/* Name */}
        <h3
          className="line-clamp-2 text-base font-bold leading-snug"
          style={{ color: "var(--text-primary)" }}
        >
          {product.name}
        </h3>

        <p
          className="mt-1.5 line-clamp-2 text-xs leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          Sản phẩm chính hãng cho hệ thủy canh gia đình.
        </p>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price + CTA */}
        <div
          className="mt-4 pt-4"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        >
          {/* Price row */}
          <div className="mb-3 flex items-baseline gap-2">
            <span
              className="text-2xl font-black"
              style={{ color: cfg.accent }}
            >
              {displayedPrice.toLocaleString("vi-VN")}đ
            </span>
            {hasDiscount && (
              <span
                className="text-xs line-through"
                style={{ color: "var(--text-muted)" }}
              >
                {product.price.toLocaleString("vi-VN")}đ
              </span>
            )}
          </div>

          {/* CTA row */}
          <div className="flex gap-2">
            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold transition-all duration-150"
              style={{
                background: added ? "rgba(34,197,94,0.15)" : cfg.accentBg,
                color: added ? "var(--emerald-400)" : cfg.accent,
                border: `1px solid ${added ? "rgba(74,222,128,0.30)" : cfg.accentBorder}`,
              }}
            >
              {added ? <Check size={12} /> : <ShoppingCart size={12} />}
              {added ? "Đã thêm!" : "Thêm vào giỏ"}
            </button>

            {/* View detail */}
            <Link
              href={`/products/${product.slug}`}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-150"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-muted)",
              }}
              title="Xem chi tiết"
            >
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
