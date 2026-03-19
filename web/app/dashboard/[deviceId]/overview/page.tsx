import SmartAlerts from "@/components/dashboard/SmartAlerts";
import { sampleAlerts } from "@/lib/mock-data";

type Params = Promise<{ deviceId: string }>;

const mockMetrics = [
  { label: "TDS", value: "1150 ppm" },
  { label: "pH", value: "6.2" },
  { label: "Temp", value: "24.3°C" },
  { label: "Humidity", value: "68%" },
];

export default async function OverviewPage({ params }: { params: Params }) {
  const { deviceId } = await params;

  return (
    <section>
      <div className="lux-panel rounded-3xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Overview: {deviceId}</h1>
            <p className="mt-1 text-sm text-slate-600">Dữ liệu mock cho MVP, sẽ nối realtime ở Phase 2.</p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 text-xs font-bold text-white">
              Capture Now
            </button>
            <button className="rounded-full border border-emerald-300 bg-white px-4 py-2 text-xs font-bold text-emerald-700">
              Settings
            </button>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {mockMetrics.map((item) => (
            <article key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{item.label}</p>
              <p className="mt-2 text-2xl font-black text-slate-900">{item.value}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-5 text-sm text-blue-900">
          <p className="font-semibold">Nutrient Stability Chart (24h)</p>
          <p className="mt-1">Placeholder: sẽ kết nối dữ liệu sensor_readings và Recharts ở phase realtime.</p>
        </div>
      </div>

      <div className="mt-4">
        <SmartAlerts alerts={sampleAlerts} />
      </div>
    </section>
  );
}
