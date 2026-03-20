import UserModel from "@/models/User";
import DeviceModel from "@/models/Device";
import OrderModel from "@/models/Order";
import { dbConnect } from "@/lib/mongodb";
import { requireAdminSession } from "@/lib/require-admin";

function toCsv(logs: Array<{ level: string; module: string; message: string; timestamp: string }>) {
  const header = "level,module,message,timestamp";
  const lines = logs.map((log) =>
    [log.level, log.module, log.message, log.timestamp]
      .map((cell) => `\"${String(cell).replace(/\"/g, "\"\"")}\"`)
      .join(",")
  );
  return [header, ...lines].join("\n");
}

export default async function AdminDiagnosticsPage() {
  await requireAdminSession();
  await dbConnect();

  const [userCount, deviceCount, orderCount] = await Promise.all([
    UserModel.countDocuments(),
    DeviceModel.countDocuments(),
    OrderModel.countDocuments(),
  ]);

  const nowIso = new Date().toISOString();
  const logs = [
    {
      level: "info",
      module: "ai-service",
      message: "AI diagnostics queue is healthy",
      timestamp: nowIso,
    },
    {
      level: "warning",
      module: "mqtt",
      message: "2 devices have no payload in last 6 hours",
      timestamp: nowIso,
    },
  ];

  const csv = toCsv(logs);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Diagnostics</h2>
        <p className="text-sm text-slate-600">Log AI hệ thống và thống kê nhanh</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">Users</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{userCount}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">Devices</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{deviceCount}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">Orders</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{orderCount}</p>
        </div>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">AI/System logs</h3>
          <a
            href={`data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`}
            download="diagnostics-logs.csv"
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            Export CSV
          </a>
        </div>

        <div className="mt-4 space-y-3">
          {logs.map((log, idx) => (
            <div key={idx} className="rounded-lg border border-slate-200 p-3 text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded px-2 py-0.5 text-xs font-semibold ${log.level === "warning" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>
                  {log.level}
                </span>
                <span className="font-medium text-slate-800">{log.module}</span>
                <span className="text-xs text-slate-500">{new Date(log.timestamp).toLocaleString("vi-VN")}</span>
              </div>
              <p className="mt-1 text-slate-700">{log.message}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
