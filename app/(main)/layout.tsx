'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Đã sửa lại dùng biến màu hệ thống (primary, on-surface) để đổi màu Sáng/Tối mượt mà
  const getLinkClass = (path: string) => {
    return pathname === path
      ? "flex items-center gap-3 px-6 py-4 transition-all duration-200 text-primary font-bold border-r-4 border-primary bg-primary/10 cursor-pointer no-underline"
      : "flex items-center gap-3 px-6 py-4 transition-all duration-200 text-on-surface opacity-70 hover:bg-on-surface/5 active:scale-95 cursor-pointer no-underline";
  };

  const getIconStyle = (path: string) => {
    return pathname === path ? { fontVariationSettings: "'FILL' 1" } : {};
  };

  return (
    <>
      {/* TopNavBar Chung */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-surface-container-low/80 backdrop-blur-xl flex justify-between items-center px-6 h-16 md:left-64 border-b border-outline-variant/20">
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
      <aside className="h-screen w-64 fixed left-0 top-0 border-r border-outline-variant/20 bg-surface-container-lowest flex flex-col py-8 font-['Manrope'] antialiased tracking-tight z-30 hidden md:flex">
        <div className="px-6 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">potted_plant</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary tracking-wider leading-tight">Veridian Lab</h3>
              <p className="text-[10px] uppercase tracking-widest text-on-surface opacity-60 font-bold">Eco-Tech Systems</p>
            </div>
          </div>
        </div>
        <nav className="flex flex-col gap-1 px-2">
          <Link href="/dashboard" className={getLinkClass('/dashboard')}>
            <span className="material-symbols-outlined" style={getIconStyle('/dashboard')}>dashboard</span>
            <span className="text-xs uppercase tracking-widest">Dashboard</span>
          </Link>
          <Link href="/plant-doctor" className={getLinkClass('/plant-doctor')}>
            <span className="material-symbols-outlined" style={getIconStyle('/plant-doctor')}>medical_services</span>
            <span className="text-xs uppercase tracking-widest">Plant Doctor</span>
          </Link>
          <Link href="/control" className={getLinkClass('/control')}>
            <span className="material-symbols-outlined" style={getIconStyle('/control')}>settings_input_component</span>
            <span className="text-xs uppercase tracking-widest">Control</span>
          </Link>
          <Link href="/analytics" className={getLinkClass('/analytics')}>
            <span className="material-symbols-outlined" style={getIconStyle('/analytics')}>analytics</span>
            <span className="text-xs uppercase tracking-widest">Analytics</span>
          </Link>
        </nav>
        <div className="mt-auto flex flex-col gap-1 pt-6 px-2">
          <div className="px-4 mb-4">
            <button className="w-full py-3 bg-primary text-on-primary rounded-lg font-bold text-[10px] uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-md">
              New Experiment
            </button>
          </div>
          <Link href="/settings" className={getLinkClass('/settings')}>
            <span className="material-symbols-outlined text-[20px]" style={getIconStyle('/settings')}>settings</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">Settings</span>
          </Link>
          <Link href="/user-profile" className={getLinkClass('/user-profile')}>
            <span className="material-symbols-outlined text-[20px]" style={getIconStyle('/user-profile')}>help_outline</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">Support</span>
          </Link>
        </div>
      </aside>

      {/* Nội dung chính */}
      <main className="pt-16 pb-20 md:pb-0 md:ml-64">
        {children}
      </main>

      {/* Bottom Nav Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface-container-lowest/95 backdrop-blur-xl h-20 flex items-center justify-around z-40 px-4 border-t border-outline-variant/20">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-on-surface-variant opacity-70 cursor-pointer no-underline hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined" style={getIconStyle('/dashboard')}>dashboard</span>
          <span className="text-[9px] font-bold uppercase tracking-tighter">Dash</span>
        </Link>
        <Link href="/plant-doctor" className="flex flex-col items-center gap-1 text-on-surface-variant opacity-70 cursor-pointer no-underline hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined" style={getIconStyle('/plant-doctor')}>psychiatry</span>
          <span className="text-[9px] font-bold uppercase tracking-tighter">Doctor</span>
        </Link>
        <Link href="/control" className="flex flex-col items-center gap-1 text-on-surface-variant opacity-70 cursor-pointer no-underline hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined" style={getIconStyle('/control')}>settings_input_component</span>
          <span className="text-[9px] font-bold uppercase tracking-tighter">Control</span>
        </Link>
        <Link href="/user-profile" className="flex flex-col items-center gap-1 text-on-surface-variant opacity-70 cursor-pointer no-underline hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined" style={getIconStyle('/user-profile')}>account_circle</span>
          <span className="text-[9px] font-bold uppercase tracking-tighter">Profile</span>
        </Link>
      </nav>
    </>
  );
}