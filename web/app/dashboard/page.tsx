import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import DeviceModel from "@/models/Device";
import { dbConnect } from "@/lib/mongodb";

type DeviceView = {
  _id: string;
  deviceId: string;
  name: string;
  plantType: string;
  isOnline: boolean;
};

async function getDevices(userId: string): Promise<DeviceView[]> {
  try {
    await dbConnect();
    const docs = await DeviceModel.find({ userId }).lean();
    return docs.map((d) => ({
      _id: String(d._id),
      deviceId: d.deviceId,
      name: d.name,
      plantType: d.plantType,
      isOnline: Boolean(d.isOnline),
    }));
  } catch {
    return [];
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const devices = userId ? await getDevices(userId) : [];

  return (
    <section className="animate-fade-up">
      <h1 className="text-4xl font-bold text-slate-900">Chậu cây của bạn</h1>
      <p className="mt-2 text-sm text-slate-600">Chọn thiết bị để theo dõi metrics, camera và cảnh báo AI.</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {devices.length === 0 ? (
          <p className="lux-panel rounded-2xl border border-dashed border-slate-300 p-4 text-sm text-slate-600">
            Chưa có thiết bị nào. Hãy dùng API POST /api/devices để thêm bằng activation code.
          </p>
        ) : (
          devices.map((device) => (
            <Link
              key={device._id}
              href={`/dashboard/${device.deviceId}/overview`}
              className="lux-panel rounded-2xl p-5 transition hover:-translate-y-1"
            >
              <p className="text-lg font-semibold text-slate-900">{device.name}</p>
              <p className="mt-1 text-sm text-slate-600">{device.plantType}</p>
              <p
                className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                  device.isOnline ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                }`}
              >
                {device.isOnline ? "Online" : "Offline"}
              </p>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
