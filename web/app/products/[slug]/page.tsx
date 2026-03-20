import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sampleProductReviews, sampleProducts } from "@/lib/mock-data";
import ProductModel from "@/models/Product";
import { dbConnect } from "@/lib/mongodb";

type Params = Promise<{ slug: string }>;

type ProductData = {
  slug: string;
  name: string;
  category: string;
  price: number;
  salePrice?: number;
  images?: string[];
  description?: string;
  specs?: Record<string, unknown>;
  stock?: number;
  rating?: number;
  reviewCount?: number;
};

async function getProduct(slug: string) {
  const fallback = sampleProducts.find((item) => item.slug === slug) || null;

  try {
    await dbConnect();
    const product = await ProductModel.findOne({ slug }).lean<ProductData | null>();
    return product || fallback;
  } catch {
    return fallback;
  }
}

async function getRelatedProducts(product: ProductData) {
  try {
    await dbConnect();
    const related = await ProductModel.find({
      category: product.category,
      slug: { $ne: product.slug },
    })
      .limit(4)
      .lean<ProductData[]>();

    if (related.length > 0) {
      return related;
    }
  } catch {
    // Fallback handled below.
  }

  return sampleProducts
    .filter((item) => item.slug !== product.slug)
    .sort((a, b) => {
      const aScore = a.category === product.category ? 1 : 0;
      const bScore = b.category === product.category ? 1 : 0;
      return bScore - aScore;
    })
    .slice(0, 4);
}

function formatSpecValue(value: unknown) {
  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (typeof value === "object" && value !== null) {
    return JSON.stringify(value);
  }

  return String(value);
}

export default async function ProductDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const reviews = sampleProductReviews[product.slug] || [];
  const relatedProducts = await getRelatedProducts(product);
  const gallery = product.images && product.images.length > 0 ? product.images : ["/window.svg"];
  const specsEntries = Object.entries(product.specs || {});
  const isSmartPot = product.category === "smart-pots";
  const activePrice = Number(product.salePrice || product.price);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
      <article className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-6">
          <div className="lux-panel rounded-3xl p-4 md:p-6">
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <Image
                src={gallery[0]}
                alt={product.name}
                width={980}
                height={680}
                className="h-[320px] w-full object-cover transition duration-500 group-hover:scale-105 md:h-[420px]"
              />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3 md:grid-cols-4">
              {gallery.slice(0, 4).map((image, idx) => (
                <div key={`${image}-${idx}`} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <Image
                    src={image}
                    alt={`${product.name} preview ${idx + 1}`}
                    width={240}
                    height={180}
                    className="h-20 w-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>

          <section className="lux-panel rounded-3xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-slate-900">Thông số kỹ thuật</h2>
            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              {specsEntries.length > 0 ? (
                specsEntries.map(([key, value], idx) => (
                  <div
                    key={key}
                    className={`grid grid-cols-[0.45fr_0.55fr] gap-3 px-4 py-3 text-sm ${
                      idx !== specsEntries.length - 1 ? "border-b border-slate-200" : ""
                    }`}
                  >
                    <p className="font-semibold uppercase tracking-wider text-slate-500">{key}</p>
                    <p className="text-slate-800">{formatSpecValue(value)}</p>
                  </div>
                ))
              ) : (
                <div className="px-4 py-6 text-sm text-slate-600">Sản phẩm chưa có thông số kỹ thuật chi tiết.</div>
              )}
            </div>

            {isSmartPot ? (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Sensors Included</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {Array.isArray(product.specs?.sensors)
                    ? (product.specs?.sensors as string[]).map((sensor) => (
                        <span key={sensor} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                          {sensor}
                        </span>
                      ))
                    : null}
                </div>
              </div>
            ) : null}
          </section>

          {isSmartPot ? (
            <section className="lux-panel rounded-3xl p-6 md:p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Live Demo Widget</h2>
                <Link href="/dashboard" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
                  Mở Dashboard Demo
                </Link>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  { label: "TDS", value: "1180 ppm" },
                  { label: "pH", value: "6.2" },
                  { label: "Temp", value: "24.1°C" },
                  { label: "Humidity", value: "67%" },
                ].map((metric) => (
                  <div key={metric.label} className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{metric.label}</p>
                    <p className="mt-2 text-lg font-bold text-slate-900">{metric.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-600">
                Dữ liệu demo mô phỏng realtime từ cảm biến Smart Pot trong 24 giờ gần nhất.
              </div>
            </section>
          ) : null}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
          <div className="lux-panel rounded-3xl p-6 md:p-8">
            <p className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
              {product.category}
            </p>
            <h1 className="mt-3 text-4xl font-bold text-slate-900">{product.name}</h1>
            <p className="mt-4 leading-relaxed text-slate-700">{product.description || "Sản phẩm chất lượng cao cho hệ Smart Garden."}</p>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Giá ưu đãi</p>
              <p className="mt-2 text-3xl font-black text-slate-900">{activePrice.toLocaleString("vi-VN")}đ</p>
              {product.salePrice ? (
                <p className="mt-1 text-sm text-slate-500 line-through">{Number(product.price).toLocaleString("vi-VN")}đ</p>
              ) : null}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-700">
              <p>
                <span className="font-bold text-slate-900">{Number(product.rating || 0).toFixed(1)} ★</span> ({product.reviewCount || reviews.length} đánh giá)
              </p>
              <p>
                Tồn kho: <span className="font-semibold text-emerald-700">{product.stock || 0}</span>
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2.5 font-semibold text-white shadow-md hover:brightness-105">
                Thêm vào giỏ
              </button>
              <button className="rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-2.5 font-semibold text-white shadow-md hover:brightness-105">
                Mua ngay
              </button>
            </div>
          </div>
        </aside>
      </article>

      <section className="mt-10">
        <h2 className="text-3xl font-bold text-slate-900">Reviews & Rating</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {reviews.length > 0 ? (
            reviews.map((review, idx) => (
              <div key={`${review.author}-${idx}`} className="lux-panel rounded-2xl p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{review.author}</p>
                    <p className="text-xs text-slate-500">{new Date(review.createdAt).toLocaleDateString("vi-VN")}</p>
                  </div>
                  <p className="text-sm font-semibold text-amber-600">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{review.content}</p>
                {review.verified ? (
                  <span className="mt-3 inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    Đã mua hàng
                  </span>
                ) : null}
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600">
              Chưa có đánh giá, hãy trở thành người đầu tiên nhận xét sản phẩm này.
            </div>
          )}
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-slate-900">Mua kèm gợi ý</h2>
          <Link href="/products" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
            Xem tất cả sản phẩm
          </Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-4">
          {relatedProducts.map((item) => (
            <article key={item.slug} className="lux-panel rounded-2xl p-4">
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <Image
                  src={(item.images && item.images[0]) || "/window.svg"}
                  alt={item.name}
                  width={320}
                  height={220}
                  className="h-36 w-full object-cover"
                />
              </div>
              <p className="mt-3 line-clamp-2 text-sm font-semibold text-slate-900">{item.name}</p>
              <p className="mt-1 text-sm font-bold text-emerald-700">{Number(item.salePrice || item.price).toLocaleString("vi-VN")}đ</p>
              <Link
                href={`/products/${item.slug}`}
                className="mt-3 inline-flex rounded-full border border-emerald-200 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50"
              >
                Xem chi tiết
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
