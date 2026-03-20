"use client";

import { useState } from "react";

interface AdminSetupResult {
  success?: boolean;
  existing?: boolean;
  message?: string;
  hint?: string;
  credentials?: {
    email?: string;
    password?: string;
    loginUrl?: string;
    url?: string;
  };
  user?: {
    _id?: string;
    name?: string;
    role?: string;
    status?: string;
  };
}

export default function AdminSetupPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AdminSetupResult | null>(null);
  const [error, setError] = useState("");

  const createAdmin = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/dev/create-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || "Failed to create admin");
        setResult(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl items-center px-4 py-8">
      <section className="lux-panel w-full rounded-3xl p-7 space-y-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Admin Setup</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Create Admin Account</h1>
          <p className="mt-2 text-sm text-slate-600">
            Click the button below to create an admin account in AIoT database
          </p>
        </div>

        <button
          onClick={createAdmin}
          disabled={loading}
          className="w-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Creating..." : "Create Admin Account"}
        </button>

        {/* Success Result */}
        {result?.success && (
          <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4 space-y-3">
            <p className="text-sm font-semibold text-emerald-900">✅ {result.message}</p>
            <div className="bg-white rounded-lg p-3 space-y-2 text-xs">
              <p>
                <span className="font-semibold">Email:</span> <code className="bg-slate-100 px-2 py-1 rounded">{result.credentials?.email}</code>
              </p>
              <p>
                <span className="font-semibold">Password:</span> <code className="bg-slate-100 px-2 py-1 rounded">{result.credentials?.password}</code>
              </p>
              <p className="pt-2">
                <a
                  href={result.credentials?.loginUrl || "/auth/login"}
                  className="text-emerald-600 hover:underline font-medium"
                >
                  → Go to Login Page
                </a>
              </p>
            </div>
            <div className="bg-white rounded-lg p-3 space-y-1 text-xs">
              <p className="font-semibold">Admin User Details:</p>
              <p>ID: <code className="bg-slate-100 px-2 py-1 rounded text-xs">{result.user?._id}</code></p>
              <p>Name: {result.user?.name}</p>
              <p>Role: <span className="font-semibold text-emerald-600">{result.user?.role}</span></p>
              <p>Status: <span className="font-semibold text-blue-600">{result.user?.status}</span></p>
            </div>
          </div>
        )}

        {/* Existing Admin Result */}
        {result?.existing && !result?.success && (
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 space-y-3">
            <p className="text-sm font-semibold text-amber-900">⚠️ {result.message}</p>
            <div className="bg-white rounded-lg p-3 space-y-2 text-xs">
              <p>
                <span className="font-semibold">Email:</span> <code className="bg-slate-100 px-2 py-1 rounded">{result.credentials?.email}</code>
              </p>
              <p>
                <span className="font-semibold">Password:</span> <code className="bg-slate-100 px-2 py-1 rounded">{result.credentials?.password}</code>
              </p>
              <p className="pt-2">
                <a
                  href={result.credentials?.url || "/auth/login"}
                  className="text-emerald-600 hover:underline font-medium"
                >
                  → Go to Login Page
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Error Result */}
        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4 space-y-2">
            <p className="text-sm font-semibold text-red-900">❌ Error: {error}</p>
            {result?.hint && <p className="text-xs text-red-700">{result.hint}</p>}
          </div>
        )}
      </section>
    </main>
  );
}
