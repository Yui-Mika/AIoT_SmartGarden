"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Leaf, Code2, MessageSquare, Briefcase } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const EXPLORE_LINKS = [
  { href: "/",          vi: "Trang chủ", en: "Home" },
  { href: "/products",  vi: "Sản phẩm", en: "Products" },
  { href: "/dashboard", vi: "Bảng điều khiển", en: "Dashboard" },
  { href: "/about",     vi: "Về chúng tôi", en: "About Us" },
];

const SUPPORT_LINKS = [
  { href: "/about",   vi: "Về chúng tôi", en: "About us" },
  { href: "/auth/login", vi: "Đăng nhập", en: "Sign in" },
  { href: "/cart",    vi: "Giỏ hàng", en: "Cart" },
  { href: "/profile", vi: "Tài khoản", en: "Account" },
];

const SOCIAL_LINKS = [
  { href: "#", icon: Code2,         label: "GitHub" },
  { href: "#", icon: MessageSquare, label: "Twitter" },
  { href: "#", icon: Briefcase,     label: "LinkedIn" },
];

export default function SiteFooter() {
  const { locale } = useLanguage();
  const t = (vi: string, en: string) => (locale === "vi" ? vi : en);

  return (
    <footer style={{ background: "var(--bg-base)", borderTop: "1px solid var(--border-subtle)" }}>

      {/* ── Top glow divider ── */}
      <div className="divider-glow" />

      {/* ── Main grid ── */}
      <div
        className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6"
      >

        {/* Brand column */}
        <div className="md:col-span-2">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2.5">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-xl"
              style={{
                background: "linear-gradient(135deg, var(--emerald-500), var(--emerald-600))",
              }}
            >
              <Leaf size={16} color="#fff" />
            </span>
            <span
              className="text-sm font-black uppercase tracking-[0.18em]"
              style={{ color: "var(--text-primary)" }}
            >
              Smart Garden
            </span>
          </Link>

          {/* Tagline */}
          <p
            className="mt-4 max-w-sm text-sm leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            {t(
              "Nền tảng AIoT thủy canh thông minh — giám sát thời gian thực, cảnh báo tự động và quản lý cây trồng hiệu quả từ mọi nơi.",
              "Smart hydroponic AIoT platform with realtime monitoring, automatic alerts, and efficient crop management from anywhere."
            )}
          </p>

          {/* Social links */}
          <div className="mt-6 flex items-center gap-2">
            {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
              <Link
                key={label}
                href={href}
                className="btn-icon"
                title={label}
                aria-label={label}
              >
                <Icon size={15} />
              </Link>
            ))}
          </div>
        </div>

        {/* Explore links */}
        <div>
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.12em]"
            style={{ color: "var(--text-muted)" }}
          >
            {t("Khám phá", "Explore")}
          </p>
          <ul className="space-y-3">
            {EXPLORE_LINKS.map(({ href, vi, en }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm transition-colors duration-150"
                  style={{ color: "var(--text-secondary)" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--emerald-400)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")
                  }
                >
                  {t(vi, en)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact column */}
        <div>
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.12em]"
            style={{ color: "var(--text-muted)" }}
          >
            {t("Liên hệ", "Contact")}
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-2.5">
              <Mail size={13} style={{ color: "var(--emerald-500)", flexShrink: 0 }} />
              <a
                href="mailto:support@eco-tech.vn"
                className="text-sm transition-colors duration-150"
                style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--emerald-400)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")
                }
              >
                support@eco-tech.vn
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={13} style={{ color: "var(--emerald-500)", flexShrink: 0 }} />
              <span
                className="text-sm"
                style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}
              >
                +84 28 1234 5678
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={13} style={{ color: "var(--emerald-500)", flexShrink: 0, marginTop: 2 }} />
              <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  {t("Thành phố Hồ Chí Minh, Việt Nam", "Ho Chi Minh City, Vietnam")}
              </span>
            </li>
          </ul>

          {/* Status indicator */}
          <div
            className="mt-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{
              background: "rgba(16,185,129,0.08)",
              border: "1px solid rgba(16,185,129,0.16)",
            }}
          >
            <span className="status-dot status-online" style={{ width: 6, height: 6 }} />
            <span className="text-xs font-medium" style={{ color: "var(--emerald-400)" }}>
              {t("Hệ thống đang hoạt động", "System online")}
            </span>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="px-4 py-5 md:px-6"
        style={{ borderTop: "1px solid var(--border-subtle)" }}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 md:flex-row">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © 2026 Smart Garden AIoT. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {SUPPORT_LINKS.slice(0, 2).map(({ href, vi, en }) => (
              <Link
                key={href}
                href={href}
                className="text-xs transition-colors duration-150"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")
                }
              >
                {t(vi, en)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
