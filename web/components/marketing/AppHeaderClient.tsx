"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { ShoppingCart, User, LogOut } from "lucide-react";

export default function AppHeaderClient() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Check scroll position immediately on mount
    const checkScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    // Call immediately
    checkScroll();

    // Add listener
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 mx-4 mt-4 rounded-2xl transition-all duration-300 md:mx-6 ${
        isScrolled
          ? "border border-emerald-100 bg-white/95 backdrop-blur-xl shadow-md"
          : "border border-white/25 bg-white/15 backdrop-blur-2xl"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <span
            className={`text-sm font-black uppercase tracking-[0.2em] transition-colors duration-300 ${
              isScrolled ? "text-emerald-700" : "text-white/95"
            } md:text-base`}
          >
            ECO-TECH
          </span>
        </Link>

        {/* Navigation Menu */}
        <nav
          className={`flex items-center gap-1 text-sm font-semibold transition-colors duration-300 md:gap-2 ${
            isScrolled ? "text-slate-700" : "text-white/90"
          }`}
        >
          <Link
            href="/"
            className={`rounded-lg px-3 py-2 transition ${
              isScrolled
                ? "hover:bg-emerald-50 hover:text-emerald-700"
                : "hover:bg-white/20 hover:text-white"
            }`}
          >
            Trang chủ
          </Link>
          <Link
            href="/products"
            className={`rounded-lg px-3 py-2 transition ${
              isScrolled
                ? "hover:bg-emerald-50 hover:text-emerald-700"
                : "hover:bg-white/20 hover:text-white"
            }`}
          >
            Sản phẩm
          </Link>
          <Link
            href="/dashboard"
            className={`rounded-lg px-3 py-2 transition ${
              isScrolled
                ? "hover:bg-emerald-50 hover:text-emerald-700"
                : "hover:bg-white/20 hover:text-white"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/about"
            className={`rounded-lg px-3 py-2 transition ${
              isScrolled
                ? "hover:bg-emerald-50 hover:text-emerald-700"
                : "hover:bg-white/20 hover:text-white"
            }`}
          >
            About Us
          </Link>
        </nav>

        {/* Right Section - Giỏ hàng + Auth */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Shopping Cart Icon */}
          <Link href="/cart">
            <ShoppingCart
              size={20}
              className={`transition ${
                isScrolled
                  ? "text-slate-700 hover:text-emerald-700"
                  : "text-white/90 hover:text-white"
              }`}
            />
          </Link>

          {/* Auth Section */}
          {session ? (
            // User Dropdown
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 transition ${
                  isScrolled
                    ? "hover:bg-emerald-50 text-slate-700"
                    : "hover:bg-white/20 text-white/90"
                }`}
              >
                <User size={20} />
                <span className="hidden text-sm font-semibold md:inline">
                  {session.user?.name || "User"}
                </span>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-emerald-100 bg-white shadow-lg">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 first:rounded-t-lg"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50"
                  >
                    Thông tin tài khoản
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 last:rounded-b-lg"
                  >
                    <LogOut size={16} />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Login Button
            <Link
              href="/auth/login"
              className={`rounded-lg px-4 py-2 font-semibold text-white shadow-md transition ${
                isScrolled
                  ? "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:brightness-105"
                  : "bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-110"
              }`}
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
