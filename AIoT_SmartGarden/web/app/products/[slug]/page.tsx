import { notFound } from "next/navigation";
import { sampleProducts } from "@/lib/mock-data";
import ProductModel from "@/models/Product";
import { dbConnect } from "@/lib/mongodb";
import SiteFooter from "@/components/marketing/SiteFooter";
import ProductDetailClient from "@/components/marketing/ProductDetailClient";

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
    if (related.length > 0) return related;
  } catch {
    // fallback below
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

export default async function ProductDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const relatedProducts = await getRelatedProducts(product);

  return (
    <main className="flex flex-col bg-transparent relative overflow-hidden" style={{ minHeight: "100dvh" }}>
      <div className="h-24 w-full" />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
      <SiteFooter />
    </main>
  );
}
