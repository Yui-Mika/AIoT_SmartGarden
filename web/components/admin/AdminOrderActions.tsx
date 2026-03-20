"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface AdminOrderActionsProps {
  orderId: string;
  currentOrderStatus: "pending" | "processing" | "completed" | "cancelled";
  currentPaymentStatus: "pending" | "paid" | "failed";
}

export default function AdminOrderActions({
  orderId,
  currentOrderStatus,
  currentPaymentStatus,
}: AdminOrderActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const updateOrder = async (payload: {
    orderStatus?: "pending" | "processing" | "completed" | "cancelled";
    paymentStatus?: "pending" | "paid" | "failed";
  }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, ...payload }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Cập nhật đơn hàng thất bại");
        return;
      }

      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        disabled={loading || currentOrderStatus === "processing"}
        onClick={() => updateOrder({ orderStatus: "processing" })}
        className="rounded-md border border-blue-300 bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-700 disabled:opacity-60"
      >
        Processing
      </button>
      <button
        disabled={loading || currentOrderStatus === "completed"}
        onClick={() => updateOrder({ orderStatus: "completed" })}
        className="rounded-md border border-emerald-300 bg-emerald-50 px-2.5 py-1.5 text-xs font-medium text-emerald-700 disabled:opacity-60"
      >
        Completed
      </button>
      <button
        disabled={loading || currentPaymentStatus === "paid"}
        onClick={() => updateOrder({ paymentStatus: "paid" })}
        className="rounded-md border border-violet-300 bg-violet-50 px-2.5 py-1.5 text-xs font-medium text-violet-700 disabled:opacity-60"
      >
        Mark Paid
      </button>
    </div>
  );
}
