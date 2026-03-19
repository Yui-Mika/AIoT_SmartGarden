type SmartAlertsProps = {
  alerts: string[];
};

export default function SmartAlerts({ alerts }: SmartAlertsProps) {
  return (
    <section className="lux-panel rounded-3xl p-5">
      <h3 className="text-xl font-semibold text-slate-900">Smart Alerts</h3>
      <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">5 cảnh báo gần nhất từ hệ thống</p>
      <ul className="mt-3 space-y-2 text-sm text-slate-700">
        {alerts.slice(0, 5).map((alert, index) => (
          <li key={`${alert}-${index}`} className="rounded-xl border border-amber-200 bg-amber-50 p-3">
            {alert}
          </li>
        ))}
      </ul>
    </section>
  );
}
