import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-7xl gap-4 px-4 py-6 md:px-6">
      <aside className="lux-panel sticky top-20 h-fit w-72 rounded-3xl p-5">
        <h2 className="text-xl font-bold text-slate-900">Garden Console</h2>
        <p className="mt-1 text-xs text-slate-500">Monitor and control your hydroponic pots</p>
        <label className="mt-3 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Pot Selector
        </label>
        <select className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-emerald-400 focus:outline-none">
          <option>Chọn chậu...</option>
          <option>SGP-2024-001</option>
          <option>SGP-2024-002</option>
        </select>
        <nav className="mt-4 space-y-2 text-sm">
          <Link className="block rounded-xl bg-emerald-50 px-3 py-2 font-semibold text-emerald-800" href="/dashboard">
            Danh sách chậu
          </Link>
        </nav>
      </aside>
      <main className="min-h-[70vh] flex-1">{children}</main>
    </div>
  );
}
