import { notFound } from "next/navigation";
import { sampleProducts } from "@/lib/mock-data";
import ProductModel from "@/models/Product";
import { dbConnect } from "@/lib/mongodb";

type Params = Promise<{ slug: string }>;

async function getProduct(slug: string) {
  try {
    await dbConnect();
    const product = await ProductModel.findOne({ slug }).lean();
    return product;
  } catch {
    return sampleProducts.find((item) => item.slug === slug) || null;
  }
}

export default async function ProductDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
      <article className="grid gap-5 md:grid-cols-[1.1fr_0.9fr]">
        <div className="lux-panel rounded-3xl p-6 md:p-8">
          <p className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
            {product.category}
          </p>
          <h1 className="mt-3 text-4xl font-bold text-slate-900">{product.name}</h1>
          <p className="mt-4 leading-relaxed text-slate-700">{product.description}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Giá bán</p>
              <p className="mt-2 text-2xl font-black text-slate-900">
                {Number(product.salePrice || product.price).toLocaleString("vi-VN")}đ
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Đánh giá</p>
              <p className="mt-2 text-2xl font-black text-slate-900">{Number(product.rating || 0).toFixed(1)} ★</p>
            </div>
          </div>
        </div>

        <div className="lux-panel rounded-3xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-slate-900">Đặt hàng nhanh</h2>
          <p className="mt-2 text-sm text-slate-600">Đề xuất giao trong 2-4 ngày, hỗ trợ đổi trả trong 7 ngày.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2.5 font-semibold text-white shadow-md hover:brightness-105">
              Thêm vào giỏ
            </button>
            <button className="rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-2.5 font-semibold text-white shadow-md hover:brightness-105">
              Mua ngay
            </button>
          </div>

          <div className="mt-6 space-y-2 rounded-2xl bg-emerald-50 p-4 text-sm text-slate-700">
            <p>• Thiết kế tương thích dashboard Smart Garden</p>
            <p>• Hướng dẫn cài đặt chi tiết cho người mới</p>
            <p>• Hỗ trợ kỹ thuật online 24/7</p>
          </div>
        </div>
      </article>
    </main>
  );
}
