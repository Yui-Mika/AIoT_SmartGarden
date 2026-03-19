import Link from "next/link";

type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  salePrice?: number | null;
  rating?: number;
};

export default function ProductCard({ product }: { product: Product }) {
  const displayedPrice = product.salePrice || product.price;

  return (
    <article className="lux-panel group rounded-3xl p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-4 flex items-center justify-between">
        <p className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-800">
          {product.category}
        </p>
        <span className="text-xs font-semibold text-slate-500">{(product.rating || 0).toFixed(1)} ★</span>
      </div>
      <h3 className="line-clamp-2 min-h-14 text-xl font-semibold text-slate-900">
        {product.name}
      </h3>
      <p className="mt-3 text-sm text-slate-500">Sản phẩm chính hãng cho hệ thủy canh gia đình.</p>
      <div className="mt-5 flex items-center justify-between">
        <div>
          <p className="text-2xl font-black text-slate-900">
            {displayedPrice.toLocaleString("vi-VN")}đ
          </p>
          {product.salePrice ? (
            <p className="text-sm text-slate-400 line-through decoration-orange-400 decoration-2">
              {product.price.toLocaleString("vi-VN")}đ
            </p>
          ) : null}
        </div>
        <Link
          href={`/products/${product.slug}`}
          className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition group-hover:scale-[1.03]"
        >
          Chi tiết
        </Link>
      </div>
    </article>
  );
}
