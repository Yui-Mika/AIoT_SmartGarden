"use client";

import { Suspense } from "react";
import AppHeaderClient from "./AppHeaderClient";

function AppHeaderSkeleton() {
  return (
    <header className="sticky top-0 z-40 mx-4 mt-4 rounded-2xl border border-white/25 bg-white/15 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-6">
        <div className="h-6 w-24 rounded bg-white/20" />
        <div className="flex gap-2">
          <div className="h-8 w-16 rounded bg-white/20" />
          <div className="h-8 w-16 rounded bg-white/20" />
        </div>
      </div>
    </header>
  );
}

export default function AppHeader() {
  return (
    <Suspense fallback={<AppHeaderSkeleton />}>
      <AppHeaderClient />
    </Suspense>
  );
}
