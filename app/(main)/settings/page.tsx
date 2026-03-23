'use client'; // Bắt buộc phải có để dùng onClick và onChange

import './style.css';
import { useEffect } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  // --- CHUYỂN LOGIC TỪ THẺ SCRIPT LÊN ĐÂY ---
  
  const selectLanguage = (lang: string) => {
    localStorage.setItem('language', lang);
    
    // Cập nhật giao diện nút radio
    const enRadio = document.getElementById('en-radio');
    const viRadio = document.getElementById('vi-radio');
    
    if (enRadio && viRadio) {
      enRadio.querySelector('div')?.classList.toggle('hidden', lang !== 'en');
      viRadio.querySelector('div')?.classList.toggle('hidden', lang !== 'vi');
    }
  };

  const setTheme = (theme: string) => {
    localStorage.setItem('appTheme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const setNotification = (type: string, enabled: boolean) => {
    localStorage.setItem(`notification_${type}`, String(enabled));
  };

  // useEffect thay thế cho sự kiện 'DOMContentLoaded' của HTML thuần
  useEffect(() => {
    // Khởi tạo Theme
    const savedTheme = localStorage.getItem('appTheme') || 'light';
    setTheme(savedTheme);
    
    // Khởi tạo Language
    const savedLang = localStorage.getItem('language') || 'en';
    selectLanguage(savedLang);
  }, []);

  return (
    <>
      <div className="fixed top-20 left-10 leaf-float opacity-5">
        <span className="material-symbols-outlined text-6xl text-primary">eco</span>
      </div>
      <div className="fixed bottom-40 right-20 leaf-float opacity-5" style={{ animationDelay: '1s' }}>
        <span className="material-symbols-outlined text-6xl text-primary">leaf</span>
      </div>

      {/* Main Content */}
      <main className="px-8 pb-12 min-h-screen">
        <div className="p-8 max-w-4xl mx-auto">
          {/* Header */}
          

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
            <Link href="/dashboard" className="nature-card block relative overflow-hidden group cursor-pointer hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-teal-400/10 group-hover:from-blue-400/30 group-hover:to-teal-400/20 transition-all duration-300" />
              <div className="relative p-4 flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center group-hover:shadow-lg transition-all">
                  <span className="material-symbols-outlined text-xl text-white">grid_view</span>
                </div>
                <div>
                  <p className="font-semibold text-sm text-on-surface group-hover:text-blue-600 transition-colors">Dashboard</p>
                  <p className="text-xs text-on-surface-variant/60">Back</p>
                </div>
              </div>
            </Link>

            <Link href="/user-profile" className="nature-card block relative overflow-hidden group cursor-pointer hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-green-400/10 group-hover:from-emerald-400/30 group-hover:to-green-400/20 transition-all duration-300" />
              <div className="relative p-4 flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center group-hover:shadow-lg transition-all">
                  <span className="material-symbols-outlined text-xl text-white">person</span>
                </div>
                <div>
                  <p className="font-semibold text-sm text-on-surface group-hover:text-emerald-600 transition-colors">Profile</p>
                  <p className="text-xs text-on-surface-variant/60">Account</p>
                </div>
              </div>
            </Link>

            <Link href="/control" className="nature-card block relative overflow-hidden group cursor-pointer hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-red-400/10 group-hover:from-orange-400/30 group-hover:to-red-400/20 transition-all duration-300" />
              <div className="relative p-4 flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center group-hover:shadow-lg transition-all">
                  <span className="material-symbols-outlined text-xl text-white">tune</span>
                </div>
                <div>
                  <p className="font-semibold text-sm text-on-surface group-hover:text-orange-600 transition-colors">Control</p>
                  <p className="text-xs text-on-surface-variant/60">System</p>
                </div>
              </div>
            </Link>

            <Link href="/analytics" className="nature-card block relative overflow-hidden group cursor-pointer hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-400/10 group-hover:from-cyan-400/30 group-hover:to-blue-400/20 transition-all duration-300" />
              <div className="relative p-4 flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center group-hover:shadow-lg transition-all">
                  <span className="material-symbols-outlined text-xl text-white">analytics</span>
                </div>
                <div>
                  <p className="font-semibold text-sm text-on-surface group-hover:text-cyan-600 transition-colors">Analytics</p>
                  <p className="text-xs text-on-surface-variant/60">Data</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {/* Language Settings */}
            <section className="nature-card relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-cyan-400/10" />
              <div className="relative p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl text-white">language</span>
                  </div>
                  <h2 className="text-xl font-bold font-headline bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Language</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-cyan-100 to-blue-50 hover:from-cyan-200 hover:to-blue-100 transition-all cursor-pointer group border border-cyan-200/50 hover:border-cyan-400/50" onClick={() => selectLanguage('en')}>
                    <div className="flex items-center gap-4">
                      <div id="en-radio" className="w-5 h-5 rounded-full border-2 border-cyan-500 flex items-center justify-center transition-all">
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 hidden" />
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">English</p>
                        <p className="text-sm text-on-surface-variant/60">English (US)</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity">check_circle</span>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-cyan-100 to-blue-50 hover:from-cyan-200 hover:to-blue-100 transition-all cursor-pointer group border border-cyan-200/50 hover:border-cyan-400/50" onClick={() => selectLanguage('vi')}>
                    <div className="flex items-center gap-4">
                      <div id="vi-radio" className="w-5 h-5 rounded-full border-2 border-cyan-500 flex items-center justify-center transition-all">
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 hidden" />
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">Tiếng Việt</p>
                        <p className="text-sm text-on-surface-variant/60">Vietnamese</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity">check_circle</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Theme Settings */}
            <section className="nature-card relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-400/10" />
              <div className="relative p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl text-white">palette</span>
                  </div>
                  <h2 className="text-xl font-bold font-headline bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Theme</h2>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-100 to-pink-50 hover:from-purple-200 hover:to-pink-100 transition-all cursor-pointer border border-purple-200/50 hover:border-purple-400/50">
                    <div className="flex-1">
                      <p className="font-bold text-on-surface">Light Mode</p>
                      <p className="text-sm text-on-surface-variant/60">Bright and clean interface</p>
                    </div>
                    <label className="switch">
                      <input type="radio" name="theme" value="light" defaultChecked onChange={() => setTheme('light')} />
                      <span className="slider" />
                    </label>
                  </label>

                  <label className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-100 to-pink-50 hover:from-purple-200 hover:to-pink-100 transition-all cursor-pointer border border-purple-200/50 hover:border-purple-400/50">
                    <div className="flex-1">
                      <p className="font-bold text-on-surface">Dark Mode</p>
                      <p className="text-sm text-on-surface-variant/60">Easy on the eyes at night</p>
                    </div>
                    <label className="switch">
                      <input type="radio" name="theme" value="dark" onChange={() => setTheme('dark')} />
                      <span className="slider" />
                    </label>
                  </label>
                </div>
              </div>
            </section>

            {/* Notification Settings */}
            <section className="nature-card relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-amber-400/10" />
              <div className="relative p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl text-white">notifications</span>
                  </div>
                  <h2 className="text-xl font-bold font-headline bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Notifications</h2>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-orange-100 to-amber-50 hover:from-orange-200 hover:to-amber-100 transition-all cursor-pointer border border-orange-200/50 hover:border-orange-400/50">
                    <div className="flex-1">
                      <p className="font-bold text-on-surface">Email</p>
                      <p className="text-sm text-on-surface-variant/60">Get notifications via email</p>
                    </div>
                    <label className="switch">
                      <input type="checkbox" defaultChecked onChange={(e) => setNotification('email', e.target.checked)} />
                      <span className="slider" />
                    </label>
                  </label>

                  <label className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-orange-100 to-amber-50 hover:from-orange-200 hover:to-amber-100 transition-all cursor-pointer border border-orange-200/50 hover:border-orange-400/50">
                    <div className="flex-1">
                      <p className="font-bold text-on-surface">Push Notifications</p>
                      <p className="text-sm text-on-surface-variant/60">Browser push notifications</p>
                    </div>
                    <label className="switch">
                      <input type="checkbox" defaultChecked onChange={(e) => setNotification('push', e.target.checked)} />
                      <span className="slider" />
                    </label>
                  </label>

                  <label className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-orange-100 to-amber-50 hover:from-orange-200 hover:to-amber-100 transition-all cursor-pointer border border-orange-200/50 hover:border-orange-400/50">
                    <div className="flex-1">
                      <p className="font-bold text-on-surface">Sound Alerts</p>
                      <p className="text-sm text-on-surface-variant/60">Play sound for critical alerts</p>
                    </div>
                    <label className="switch">
                      <input type="checkbox" defaultChecked onChange={(e) => setNotification('sound', e.target.checked)} />
                      <span className="slider" />
                    </label>
                  </label>
                </div>
              </div>
            </section>

            {/* System Info */}
            <section className="bg-gradient-to-r from-primary/10 to-primary-light/5 rounded-2xl p-8 border border-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-2xl text-primary">info</span>
                <h2 className="text-xl font-bold font-headline">About</h2>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">Version</span>
                  <span className="font-bold text-on-surface">1.0.0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">Eco-Tech Hydroponics</span>
                  <span className="font-bold text-primary">Premium</span>
                </div>
                <p className="text-on-surface-variant/60 mt-4">AI-powered plant monitoring system designed to optimize your hydroponics setup.</p>
              </div>
            </section>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex gap-4">
            <button className="flex-1 py-3 bg-primary text-white rounded-xl font-bold uppercase tracking-wide hover:brightness-110 transition-all">
              Save Changes
            </button>
            <button className="flex-1 py-3 bg-surface-container-high text-on-surface rounded-xl font-bold uppercase tracking-wide hover:bg-surface-container-highest transition-all">
              Logout
            </button>
          </div>
        </div>
      </main>
    </>
  );
}