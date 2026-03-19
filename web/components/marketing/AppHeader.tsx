import Link from "next/link";

export default function AppHeader() {
  return (
    <header className="mesh-divider sticky top-0 z-40 border-b border-emerald-100/70 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 text-xs font-black text-white shadow-md">
            SG
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700 group-hover:text-emerald-700 md:text-base">
            Smart Garden
          </span>
        </Link>
        <nav className="flex items-center gap-2 text-sm font-semibold text-slate-700 md:gap-4">
          <Link href="/products" className="rounded-full px-3 py-2 hover:bg-emerald-50 hover:text-emerald-700">
            Sản phẩm
          </Link>
          <Link href="/cart" className="rounded-full px-3 py-2 hover:bg-emerald-50 hover:text-emerald-700">
            Giỏ hàng
          </Link>
          <Link
            href="/auth/login"
            className="rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-2 text-white shadow-md transition hover:brightness-105"
          >
            Đăng nhập
          </Link>
        </nav>
      </div>
    </header>
  );
}
