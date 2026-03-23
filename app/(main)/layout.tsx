'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppPreferences } from '../providers';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t } = useAppPreferences();

  // Đã sửa lại dùng biến màu hệ thống (primary, on-surface) để đổi màu Sáng/Tối mượt mà
  const getLinkClass = (path: string) => {
    return pathname === path
      ? "flex items-center gap-3 px-5 py-3.5 transition-all duration-200 text-primary font-bold bg-primary/12 ring-1 ring-primary/25 shadow-sm cursor-pointer no-underline rounded-2xl"
      : "flex items-center gap-3 px-5 py-3.5 transition-all duration-200 text-on-surface opacity-75 hover:bg-secondary/10 hover:text-on-surface active:scale-95 cursor-pointer no-underline rounded-2xl";
  };

  const getIconStyle = (path: string) => {
    return pathname === path ? { fontVariationSettings: "'FILL' 1" } : {};
  };

  return (
    <>
      {/* TopNavBar Chung */}
      <header className="shell-topbar fixed top-0 left-0 right-0 z-40 backdrop-blur-xl flex justify-between items-center px-6 h-16 md:left-64 border-b border-outline-variant/25">
        <div className="text-xl font-bold text-primary tracking-tighter font-headline flex items-center gap-2">
           <span className="md:hidden material-symbols-outlined text-primary">potted_plant</span>
           Veridian Lab
        </div>
        <div className="flex items-center gap-3 md:gap-6">
          <button className="material-symbols-outlined text-on-surface-variant hover:bg-primary/5 transition-colors p-2 rounded-full hidden md:block">notifications</button>
          <button className="material-symbols-outlined text-on-surface-variant hover:bg-primary/5 transition-colors p-2 rounded-full hidden md:block">cloud_off</button>
          <button className="material-symbols-outlined text-on-surface-variant hover:bg-primary/5 transition-colors p-2 rounded-full">account_circle</button>
        </div>
      </header>

      {/* SideNavBar Chung */}
      <aside className="shell-sidebar shell-glow h-screen w-64 fixed left-0 top-0 border-r border-outline-variant/25 flex flex-col py-8 font-['Manrope'] antialiased tracking-tight z-30 hidden md:flex">
        <div className="px-6 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center ring-1 ring-primary/20">
              <span className="material-symbols-outlined text-primary">potted_plant</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary tracking-wider leading-tight">Veridian Lab</h3>
              <p className="text-[10px] uppercase tracking-widest text-on-surface opacity-60 font-bold">Eco-Tech Systems</p>
            </div>
          </div>
        </div>
        <nav className="flex flex-col gap-1.5 px-3">
          <Link href="/dashboard" className={getLinkClass('/dashboard')}>
            <span className="material-symbols-outlined" style={getIconStyle('/dashboard')}>dashboard</span>
            <span className="text-xs uppercase tracking-widest truncate">{t('dashboard')}</span>
          </Link>
          <Link href="/plant-doctor" className={getLinkClass('/plant-doctor')}>
            <span className="material-symbols-outlined" style={getIconStyle('/plant-doctor')}>medical_services</span>
            <span className="text-xs uppercase tracking-widest truncate">{t('plantDoctor')}</span>
          </Link>
          <Link href="/control" className={getLinkClass('/control')}>
            <span className="material-symbols-outlined" style={getIconStyle('/control')}>settings_input_component</span>
            <span className="text-xs uppercase tracking-widest truncate">{t('control')}</span>
          </Link>
          <Link href="/analytics" className={getLinkClass('/analytics')}>
            <span className="material-symbols-outlined" style={getIconStyle('/analytics')}>analytics</span>
            <span className="text-xs uppercase tracking-widest truncate">{t('analytics')}</span>
          </Link>
        </nav>
        <div className="mt-auto flex flex-col gap-1 pt-6 px-3">
          <div className="px-4 mb-4">
            <button className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-on-primary rounded-xl font-bold text-[10px] uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-lg">
              {t('newExperiment')}
            </button>
          </div>
          <Link href="/settings" className={getLinkClass('/settings')}>
            <span className="material-symbols-outlined text-[20px]" style={getIconStyle('/settings')}>settings</span>
            <span className="text-[10px] font-bold uppercase tracking-widest truncate">{t('settings')}</span>
          </Link>
          <Link href="/user-profile-redesigned" className={getLinkClass('/user-profile-redesigned')}>
            <span className="material-symbols-outlined text-[20px]" style={getIconStyle('/user-profile-redesigned')}>help_outline</span>
            <span className="text-[10px] font-bold uppercase tracking-widest truncate">{t('support')}</span>
          </Link>
          <div className="mx-4 mt-4 rounded-2xl border border-outline-variant/35 bg-gradient-to-br from-surface-container to-surface-container-high p-3.5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{t('helpAndSupport')}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-on-surface-variant/80">{t('supportDescription')}</p>
          </div>
        </div>
      </aside>

      {/* Nội dung chính */}
      <main className="pt-16 pb-20 md:pb-0 md:ml-64">
        {children}
      </main>

      {/* Bottom Nav Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface-container-low/95 backdrop-blur-xl h-20 flex items-center justify-around z-40 px-3 border-t border-outline-variant/30 shadow-[0_-10px_30px_-20px_rgba(0,0,0,0.45)]">
        <Link href="/dashboard" className="w-1/4 flex flex-col items-center gap-1 text-on-surface-variant opacity-80 cursor-pointer no-underline hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined" style={getIconStyle('/dashboard')}>dashboard</span>
          <span className="max-w-full text-[8px] font-bold uppercase tracking-tight truncate">{t('dashboard')}</span>
        </Link>
        <Link href="/plant-doctor" className="w-1/4 flex flex-col items-center gap-1 text-on-surface-variant opacity-80 cursor-pointer no-underline hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined" style={getIconStyle('/plant-doctor')}>psychiatry</span>
          <span className="max-w-full text-[8px] font-bold uppercase tracking-tight truncate">{t('plantDoctor')}</span>
        </Link>
        <Link href="/control" className="w-1/4 flex flex-col items-center gap-1 text-on-surface-variant opacity-80 cursor-pointer no-underline hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined" style={getIconStyle('/control')}>settings_input_component</span>
          <span className="max-w-full text-[8px] font-bold uppercase tracking-tight truncate">{t('control')}</span>
        </Link>
        <Link href="/user-profile-redesigned" className="w-1/4 flex flex-col items-center gap-1 text-on-surface-variant opacity-80 cursor-pointer no-underline hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined" style={getIconStyle('/user-profile-redesigned')}>account_circle</span>
          <span className="max-w-full text-[8px] font-bold uppercase tracking-tight truncate">{t('profile')}</span>
        </Link>
      </nav>
    </>
  );
}