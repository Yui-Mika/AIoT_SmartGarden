import Link from "next/link";
import ProductCard from "@/components/marketing/ProductCard";
import { sampleProducts } from "@/lib/mock-data";

export default function Home() {
  return (
    <main className="flex-1 pb-16">
      <section className="relative overflow-hidden px-4 pt-10 md:px-6 md:pt-16">
        <div className="absolute -left-24 top-8 h-56 w-56 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute -right-16 top-0 h-56 w-56 rounded-full bg-sky-300/30 blur-3xl" />
        <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div className="animate-fade-up">
            <p className="inline-flex rounded-full border border-emerald-200 bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-700">
              Hydroponics • IoT • AI
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight text-slate-900 md:text-6xl">
              Không chỉ trồng cây.
              <br />
              Đây là khu vườn thông minh của bạn.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
              Smart Garden AIoT kết hợp thiết kế e-commerce cao cấp với dashboard giám sát cây theo thời gian thực,
              cảnh báo thông minh và AI hỗ trợ chẩn đoán.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02]"
              >
                Mua Bộ Smart Pot
              </Link>
              <Link
                href="/dashboard"
                className="rounded-full border border-emerald-200 bg-white px-6 py-3 text-sm font-bold text-emerald-700 transition hover:border-emerald-400"
              >
                Xem Dashboard Demo
              </Link>
            </div>
          </div>

          <div className="lux-panel animate-soft-float rounded-[2rem] p-6 md:p-7">
            <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-cyan-600 p-5 text-white shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Device Snapshot</p>
              <h2 className="mt-2 text-2xl font-bold">My Basil Pot • Online</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-white/15 p-3">TDS: 1150 ppm</div>
                <div className="rounded-xl bg-white/15 p-3">pH: 6.2</div>
                <div className="rounded-xl bg-white/15 p-3">Temp: 24.3°C</div>
                <div className="rounded-xl bg-white/15 p-3">Humidity: 68%</div>
              </div>
            </div>
            <div className="mt-5 space-y-2 text-sm text-slate-600">
              <p className="font-semibold text-slate-800">Lợi thế nổi bật</p>
              <p>• Cảnh báo đa cảm biến theo ngưỡng cá nhân hóa</p>
              <p>• AI hỗ trợ chẩn đoán lá cây và gợi ý xử lý</p>
              <p>• Điều khiển từ xa bơm nước và đèn trồng</p>
            </div>
          </div>
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
