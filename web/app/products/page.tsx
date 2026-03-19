import ProductCard from "@/components/marketing/ProductCard";
import { sampleProducts } from "@/lib/mock-data";
import ProductModel from "@/models/Product";
import { dbConnect } from "@/lib/mongodb";

async function getProducts() {
  try {
    await dbConnect();
    const products = await ProductModel.find({}).sort({ createdAt: -1 }).lean();
    return products.length ? products : sampleProducts;
  } catch {
    return sampleProducts;
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
      <section className="lux-panel rounded-3xl p-6 md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Product Catalog</p>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">Danh mục Smart Garden</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Khám phá hạt giống, dung dịch dinh dưỡng và bộ Smart Pot thiết kế cho trải nghiệm trồng cây hiện đại.
        </p>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </section>
    </main>
  );
}
