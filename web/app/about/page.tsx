import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us | Smart Garden AIoT",
  description: "Học thêm về sứ mệnh và công nghệ của Smart Garden AIoT",
};

export default function AboutPage() {
  return (
    <main className="flex-1 pb-16">
      <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
        <div className="animate-fade-up">
          <h1 className="text-4xl font-black text-slate-900 md:text-5xl">Về Smart Garden AIoT</h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            Smart Garden AIoT là nền tảng kết hợp công nghệ thủy canh, IoT và AI để mang lại trải nghiệm trồng trọt
            hiện đại, đơn giản và hiệu quả cho mọi người.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Sứ mệnh</h3>
            <p className="mt-3 text-sm text-slate-600">
              Giúp bất kì ai có thể trồng rau sạch, nuôi trồng thủy canh tại nhà một cách dễ dàng và tự động hóa.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Tầm nhìn</h3>
            <p className="mt-3 text-sm text-slate-600">
              Trở thành nền tảng hàng đầu trong kỹ thuật canh tác thông minh tại Đông Nam Á.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Giá trị</h3>
            <p className="mt-3 text-sm text-slate-600">
              Chất lượng, độ tin cậy, tính sáng tạo và sự quan tâm đến cộng đồng nông dân.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-3xl border border-slate-200 bg-gradient-to-r from-emerald-50 to-cyan-50 p-8">
          <h2 className="text-2xl font-bold text-slate-900">Công nghệ</h2>
          <p className="mt-3 text-slate-600">
            Chúng tôi sử dụng:
          </p>
          <ul className="mt-4 list-inside space-y-2 text-sm text-slate-600">
            <li>✓ Cảm biến IoT: Đo TDS, pH, nhiệt độ, độ ẩm theo thời gian thực</li>
            <li>✓ AI Diagnosis: Phân tích ảnh lá cây để phát hiện bệnh và gợi ý xử lý</li>
            <li>✓ Thủy canh: Hệ thống NFT, DWC tối ưu cho trồng rau leafy greens</li>
            <li>✓ Dashboard Web: Giám sát và điều khiển từ bất kỳ thiết bị nào</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
