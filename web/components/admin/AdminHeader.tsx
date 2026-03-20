"use client";

import { useSession } from "next-auth/react";
import { Bell } from "lucide-react";

export default function AdminHeader() {
  const { data: session } = useSession();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-600 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="flex flex-col text-right">
              <span className="text-sm font-semibold text-slate-900">{session?.user?.name}</span>
              <span className="text-xs text-slate-500">{session?.user?.email}</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-500 flex items-center justify-center text-white font-semibold text-xs">
              {session?.user?.name?.charAt(0)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
