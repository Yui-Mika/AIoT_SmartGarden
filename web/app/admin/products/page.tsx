import ProductModel from "@/models/Product";
import { dbConnect } from "@/lib/mongodb";
import { requireAdminSession } from "@/lib/require-admin";
import AdminProductDeleteButton from "@/components/admin/AdminProductDeleteButton";

export default async function AdminProductsPage() {
  await requireAdminSession();
  await dbConnect();

  const products = await ProductModel.find({}).sort({ createdAt: -1 }).lean();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Quản lý sản phẩm</h2>
        <p className="text-sm text-slate-600">Danh sách sản phẩm</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Tên</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Slug</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Category</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Giá</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Stock</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((product) => (
              <tr key={String(product._id)}>
                <td className="px-4 py-3 font-medium text-slate-900">{product.name}</td>
                <td className="px-4 py-3 text-slate-700">{product.slug}</td>
                <td className="px-4 py-3 text-slate-700">{product.category}</td>
                <td className="px-4 py-3 text-slate-700">{product.price.toLocaleString("vi-VN")}₫</td>
                <td className="px-4 py-3 text-slate-700">{product.stock}</td>
                <td className="px-4 py-3">
                  <AdminProductDeleteButton productId={String(product._id)} />
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td className="px-4 py-8 text-center text-slate-500" colSpan={6}>
                  Chưa có sản phẩm nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
