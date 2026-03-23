'use client';

import Image from 'next/image';

export default function UserProfileRedesignedPage() {
  return (
    <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Profile Section */}
          <section className="md:col-span-8 bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/15">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container-high bg-surface-container">
                  <Image
                    alt="Dr. Thorne Profile"
                    className="w-full h-full object-cover"
                    src="/user_profile.png"
                    width={128}
                    height={128}
                    unoptimized
                  />
                </div>
                <button className="absolute bottom-0 right-0 bg-primary text-on-primary p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-sm">photo_camera</span>
                </button>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-2xl font-bold text-on-surface">Dr. Thorne</h3>
                <p className="text-primary font-semibold tracking-wide flex items-center justify-center sm:justify-start gap-2">
                  <span className="material-symbols-outlined text-base">biotech</span>
                  Lead Researcher
                </p>
                <p className="text-on-surface-variant text-sm mt-1 opacity-70">thorne.research@veridian-lab.io</p>
                <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
                  <span className="px-3 py-1 bg-secondary-container/20 text-on-secondary-container text-[10px] font-bold uppercase tracking-widest rounded-full">Hydro-Botics</span>
                  <span className="px-3 py-1 bg-primary-container/20 text-on-primary-container text-[10px] font-bold uppercase tracking-widest rounded-full">Admin Access</span>
                </div>
              </div>
            </div>
            <hr className="my-8 border-outline-variant/10" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Full Legal Name</label>
                <input className="w-full bg-surface-container-low border-none rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20" type="text" defaultValue="Dr. Alistair Thorne" />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Research Unit</label>
                <input className="w-full bg-surface-container-low border-none rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20" type="text" defaultValue="Delta-7 Hydroponics Wing" />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Contact Email</label>
                <input className="w-full bg-surface-container-low border-none rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20" type="email" defaultValue="thorne.research@veridian-lab.io" />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Phone (Encrypted)</label>
                <input className="w-full bg-surface-container-low border-none rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20" type="text" defaultValue="+1 (555) 942-0192" />
              </div>
            </div>
          </section>

          {/* System Preferences */}
          <section className="md:col-span-12 bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/15">
            <h4 className="text-sm font-bold uppercase tracking-[0.15em] text-on-surface mb-8 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">settings_applications</span>
              System Preferences
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-on-surface">Interface Mode</p>
                  <p className="text-xs text-on-surface-variant opacity-60">Scientific Neutral (Light)</p>
                </div>
                <div className="w-12 h-6 bg-surface-container-highest rounded-full p-1 cursor-pointer flex items-center">
                  <div className="w-4 h-4 bg-on-surface-variant rounded-full translate-x-0 transition-transform" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">System Language</label>
                <div className="relative">
                  <select className="w-full bg-surface-container-low border-none rounded-lg py-2.5 px-4 text-sm appearance-none focus:ring-2 focus:ring-primary/20">
                    <option>English (Technical / US)</option>
                    <option>Deutsch</option>
                    <option>日本語</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-base">expand_more</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Alert Protocols</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input defaultChecked className="w-4 h-4 rounded text-primary focus:ring-primary border-outline-variant/30" type="checkbox" />
                    <span className="text-xs font-medium text-on-surface-variant">Email</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input defaultChecked className="w-4 h-4 rounded text-primary focus:ring-primary border-outline-variant/30" type="checkbox" />
                    <span className="text-xs font-medium text-on-surface-variant">Push</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer opacity-50">
                    <input className="w-4 h-4 rounded text-primary focus:ring-primary border-outline-variant/30" type="checkbox" />
                    <span className="text-xs font-medium text-on-surface-variant">SMS</span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Activity Log Section */}
          <section className="md:col-span-12 bg-surface-container-low rounded-xl p-8 border border-outline-variant/5">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-sm font-bold uppercase tracking-[0.15em] text-on-surface">Recent System Access</h4>
              <span className="text-[10px] font-bold text-primary hover:underline cursor-pointer">EXPORT LOGS</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs py-2 border-b border-outline-variant/10">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-sm">login</span>
                  <span className="font-medium">System Login — Main Terminal Alpha</span>
                </div>
                <span className="text-on-surface-variant opacity-60">Today, 08:42 AM</span>
              </div>
              <div className="flex items-center justify-between text-xs py-2 border-b border-outline-variant/10">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-sm">settings</span>
                  <span className="font-medium">Sensor Calibration Updated — Greenhouse A</span>
                </div>
                <span className="text-on-surface-variant opacity-60">Yesterday, 04:15 PM</span>
              </div>
              <div className="flex items-center justify-between text-xs py-2">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary text-sm">lock_reset</span>
                  <span className="font-medium">2FA Re-verification</span>
                </div>
                <span className="text-on-surface-variant opacity-60">Oct 24, 2023</span>
              </div>
            </div>
          </section>
        </div>
      </main>
  );
}
