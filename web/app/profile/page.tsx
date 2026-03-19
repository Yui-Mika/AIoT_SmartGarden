"use client";

import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { User, Mail, LogOut } from "lucide-react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <main className="flex-1 pb-16">
        <section className="mx-auto w-full max-w-2xl px-4 py-12 md:px-6">
          <div className="text-center">Đang tải...</div>
        </section>
      </main>
    );
  }

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <main className="flex-1 pb-16">
      <section className="mx-auto w-full max-w-2xl px-4 py-12 md:px-6">
        <div className="animate-fade-up">
          <h1 className="text-3xl font-black text-slate-900 md:text-4xl">Thông tin tài khoản</h1>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-4">
            {session.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "User"}
                width={64}
                height={64}
                className="rounded-full border-2 border-emerald-200"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-emerald-200 bg-emerald-50">
                <User size={32} className="text-emerald-600" />
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{session.user?.name}</h2>
              <p className="text-sm text-slate-600">{session.user?.email}</p>
            </div>
          </div>

          <div className="mt-8 space-y-4 border-t border-slate-200 pt-6">
            <div className="flex items-center gap-3">
              <User size={20} className="text-emerald-600" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Tên</p>
                <p className="text-sm text-slate-900">{session.user?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-emerald-600" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Email</p>
                <p className="text-sm text-slate-900">{session.user?.email}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-3 border-t border-slate-200 pt-6">
            <Link
              href="/dashboard"
              className="flex-1 rounded-lg bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Vào Dashboard
            </Link>
            <button
              onClick={() => signOut()}
              className="flex items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              <LogOut size={16} />
              Đăng xuất
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
