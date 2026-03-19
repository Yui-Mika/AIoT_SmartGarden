import Link from "next/link";
import ProductCard from "@/components/marketing/ProductCard";
import { sampleProducts } from "@/lib/mock-data";

export default function Home() {
  return (
    <main className="flex-1 pb-16">
      {/* Hero Section - Premium 100vh Full Video */}
      <section className="relative flex h-screen w-full flex-col items-stretch justify-between overflow-hidden bg-black">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/video_plant.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-transparent to-slate-900/60" />

        {/* Top Section - Left Aligned Logo + Tagline */}
        <div className="relative z-20 space-y-2 px-6 pt-24 md:px-12 md:pt-32">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span className="text-sm font-black uppercase tracking-[0.2em] text-white">ECO-TECH</span>
          </div>
          <div className="h-0.5 w-12 bg-white/30" />
          <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
            Hydroponics • IoT • AI
          </p>
          <h1 className="mt-6 max-w-lg text-5xl font-black leading-tight text-white md:text-6xl lg:text-7xl">
            Không chỉ<br />
            trồng cây.
          </h1>
        </div>

        {/* Bottom Section - Full Width Action Bar */}
        <div className="relative z-20 flex items-end justify-center px-4 pb-12 md:pb-16">
          <div className="w-full max-w-3xl rounded-2xl border border-white/25 bg-white/10 px-6 py-8 backdrop-blur-xl md:px-10 md:py-12">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Đây là khu vườn thông minh của bạn.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
              Smart Garden AIoT kết hợp thiết kế e-commerce cao cấp với dashboard giám sát cây theo thời gian thực,
              cảnh báo thông minh và AI hỗ trợ chẩn đoán.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:shadow-xl hover:scale-105"
              >
                Mua Bộ Smart Pot
              </Link>
              <Link
                href="/dashboard"
                className="rounded-lg border border-white/40 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                Xem Dashboard Demo
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 animate-bounce">
          <svg className="h-6 w-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <section className="mx-auto mt-12 w-full max-w-6xl px-4 md:px-6">
        <div className="grid gap-3 rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-sm md:grid-cols-3 md:p-6">
          <div className="rounded-2xl bg-emerald-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Realtime IoT</p>
            <p className="mt-2 text-sm text-slate-700">Cập nhật dữ liệu môi trường mỗi 30 giây.</p>
          </div>
          <div className="rounded-2xl bg-sky-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-sky-700">AI Diagnosis</p>
            <p className="mt-2 text-sm text-slate-700">Phân tích ảnh lá cây kết hợp ngữ cảnh cảm biến.</p>
          </div>
          <div className="rounded-2xl bg-amber-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-700">Premium Commerce</p>
            <p className="mt-2 text-sm text-slate-700">Mua thiết bị, vật tư và nhận kích hoạt nhanh.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-3xl font-bold text-slate-900">Bộ Sưu Tập Nổi Bật</h2>
          <Link href="/products" className="text-sm font-semibold text-blue-700 hover:text-blue-800">
            Xem tất cả
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {sampleProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="lux-panel rounded-3xl p-6 md:p-8">
          <h2 className="text-3xl font-bold text-slate-900">How It Works</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              "Chọn gói thiết bị và phụ kiện",
              "Kích hoạt chậu với mã đi kèm",
              "Theo dõi chỉ số theo thời gian thực",
              "Nhận cảnh báo AI và hành động đề xuất",
            ].map((step, idx) => (
              <div key={step} className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Bước {idx + 1}</p>
                <p className="mt-2 text-sm text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 w-full max-w-6xl px-4 md:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-900 to-slate-900 p-7 text-white md:p-10">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-200">Smart Garden Journal</p>
          <h2 className="mt-3 text-3xl font-bold">Nhận cẩm nang thủy canh mỗi tuần</h2>
          <p className="mt-2 max-w-2xl text-sm text-emerald-50/90">
            Case study thực tế, lịch chăm cây theo mùa, và gợi ý tối ưu pH/TDS cho từng loại rau.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Email của bạn"
              className="w-full max-w-md rounded-full border border-white/25 bg-white/15 px-5 py-3 text-sm placeholder:text-white/70 focus:outline-none"
            />
            <button className="rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white hover:bg-orange-400">
              Đăng ký ngay
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
