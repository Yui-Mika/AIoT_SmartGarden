export default function CartPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
      <h1 className="text-4xl font-bold text-slate-900">Giỏ hàng của bạn</h1>
      <p className="mt-2 text-slate-600">Kiểm tra đơn hàng trước khi chuyển sang checkout.</p>

      <section className="mt-7 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="lux-panel rounded-3xl p-6">
          <h2 className="text-2xl font-bold text-slate-900">Sản phẩm đã chọn</h2>
          <p className="mt-2 text-sm text-slate-600">MVP: kết nối cart state ở phase tiếp theo.</p>
          <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600">
            Chưa có sản phẩm trong giỏ. Hãy thêm sản phẩm từ trang danh mục để tiếp tục.
          </div>
        </div>

        <aside className="lux-panel h-fit rounded-3xl p-6">
          <h3 className="text-xl font-bold text-slate-900">Tổng đơn hàng</h3>
          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <p className="flex justify-between">
              <span>Tạm tính</span>
              <span>0đ</span>
            </p>
            <p className="flex justify-between">
              <span>Phí vận chuyển</span>
              <span>0đ</span>
            </p>
            <p className="flex justify-between border-t border-slate-200 pt-2 text-base font-bold text-slate-900">
              <span>Tổng cộng</span>
              <span>0đ</span>
            </p>
          </div>
          <button className="mt-5 w-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-md">
            Tiến hành thanh toán
          </button>
        </aside>
      </section>
    </main>
  );
}
