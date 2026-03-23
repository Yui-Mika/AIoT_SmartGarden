'use client'; // Bắt buộc phải có để dùng onClick và onChange

import './style.css';
import { useState } from 'react';
import Link from 'next/link';
import { useAppPreferences } from '../../providers';

export default function SettingsPage() {
  const { language, setLanguage, theme, setTheme, t } = useAppPreferences();
  const [notifications, setNotifications] = useState(() => {
    if (typeof window === 'undefined') {
      return {
        email: true,
        push: true,
        sound: true,
      };
    }

    return {
      email: localStorage.getItem('notification_email') !== 'false',
      push: localStorage.getItem('notification_push') !== 'false',
      sound: localStorage.getItem('notification_sound') !== 'false',
    };
  });

  const setNotification = (type: string, enabled: boolean) => {
    localStorage.setItem(`notification_${type}`, String(enabled));
    setNotifications((prev) => ({ ...prev, [type]: enabled }));
  };

  const contactSupportMail = 'mailto:support@veridian-lab.io?subject=Veridian%20Lab%20Support%20Request';
  const liveChatMail = 'mailto:support@veridian-lab.io?subject=Live%20Chat%20Request&body=Hi%20Veridian%20Lab%20team%2C%20I%20need%20help%20with%3A';

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
                  <p className="text-xs text-on-surface-variant/85">Back</p>
                </div>
              </div>
            </Link>

            <Link href="/user-profile-redesigned" className="nature-card block relative overflow-hidden group cursor-pointer hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-green-400/10 group-hover:from-emerald-400/30 group-hover:to-green-400/20 transition-all duration-300" />
              <div className="relative p-4 flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center group-hover:shadow-lg transition-all">
                  <span className="material-symbols-outlined text-xl text-white">person</span>
                </div>
                <div>
                  <p className="font-semibold text-sm text-on-surface group-hover:text-emerald-600 transition-colors">Profile</p>
                  <p className="text-xs text-on-surface-variant/85">Account</p>
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
                  <p className="text-xs text-on-surface-variant/85">System</p>
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
                  <p className="text-xs text-on-surface-variant/85">Data</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {/* Language Settings */}
            <section className="nature-card relative overflow-hidden">
              <div className="absolute inset-0 settings-section-overlay" />
              <div className="relative p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl text-white">language</span>
                  </div>
                  <h2 className="text-xl font-bold font-headline text-on-surface">{t('language')}</h2>
                </div>
                <div className="space-y-4">
                  <div className="settings-option" onClick={() => setLanguage('en')}>
                    <div className="flex items-center gap-4">
                      <div id="en-radio" className="w-5 h-5 rounded-full border-2 border-cyan-500 flex items-center justify-center transition-all">
                        <div className={`w-2.5 h-2.5 rounded-full bg-cyan-500 ${language === 'en' ? '' : 'hidden'}`} />
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">{t('english')}</p>
                        <p className="text-sm text-on-surface-variant/85">English (US)</p>
                      </div>
                    </div>
                    <span className={`material-symbols-outlined text-secondary transition-opacity ${language === 'en' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>check_circle</span>
                  </div>

                  <div className="settings-option" onClick={() => setLanguage('vi')}>
                    <div className="flex items-center gap-4">
                      <div id="vi-radio" className="w-5 h-5 rounded-full border-2 border-cyan-500 flex items-center justify-center transition-all">
                        <div className={`w-2.5 h-2.5 rounded-full bg-cyan-500 ${language === 'vi' ? '' : 'hidden'}`} />
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">{t('vietnamese')}</p>
                        <p className="text-sm text-on-surface-variant/85">Vietnamese</p>
                      </div>
                    </div>
                    <span className={`material-symbols-outlined text-secondary transition-opacity ${language === 'vi' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>check_circle</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Theme Settings */}
            <section className="nature-card relative overflow-hidden">
              <div className="absolute inset-0 settings-section-overlay" />
              <div className="relative p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl text-white">palette</span>
                  </div>
                  <h2 className="text-xl font-bold font-headline text-on-surface">{t('theme')}</h2>
                </div>

                <div className="space-y-3">
                  <label className="settings-option">
                    <div className="flex-1">
                      <p className="font-bold text-on-surface">{t('lightMode')}</p>
                      <p className="text-sm text-on-surface-variant/85">Bright and clean interface</p>
                    </div>
                    <div className="switch">
                      <input type="radio" name="theme" value="light" checked={theme === 'light'} onChange={() => setTheme('light')} />
                      <span className="slider" />
                    </div>
                  </label>

                  <label className="settings-option">
                    <div className="flex-1">
                      <p className="font-bold text-on-surface">{t('darkMode')}</p>
                      <p className="text-sm text-on-surface-variant/85">Easy on the eyes at night</p>
                    </div>
                    <div className="switch">
                      <input type="radio" name="theme" value="dark" checked={theme === 'dark'} onChange={() => setTheme('dark')} />
                      <span className="slider" />
                    </div>
                  </label>
                </div>
              </div>
            </section>

            {/* Notification Settings */}
            <section className="nature-card relative overflow-hidden">
              <div className="absolute inset-0 settings-section-overlay" />
              <div className="relative p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl text-white">notifications</span>
                  </div>
                  <h2 className="text-xl font-bold font-headline text-on-surface">{t('notifications')}</h2>
                </div>

                <div className="space-y-3">
                  <label className="settings-option">
                    <div className="flex-1">
                      <p className="font-bold text-on-surface">{t('email')}</p>
                      <p className="text-sm text-on-surface-variant/85">Get notifications via email</p>
                    </div>
                    <div className="switch">
                      <input type="checkbox" checked={notifications.email} onChange={(e) => setNotification('email', e.target.checked)} />
                      <span className="slider" />
                    </div>
                  </label>

                  <label className="settings-option">
                    <div className="flex-1">
                      <p className="font-bold text-on-surface">{t('pushNotifications')}</p>
                      <p className="text-sm text-on-surface-variant/85">Browser push notifications</p>
                    </div>
                    <div className="switch">
                      <input type="checkbox" checked={notifications.push} onChange={(e) => setNotification('push', e.target.checked)} />
                      <span className="slider" />
                    </div>
                  </label>

                  <label className="settings-option">
                    <div className="flex-1">
                      <p className="font-bold text-on-surface">{t('soundAlerts')}</p>
                      <p className="text-sm text-on-surface-variant/85">Play sound for critical alerts</p>
                    </div>
                    <div className="switch">
                      <input type="checkbox" checked={notifications.sound} onChange={(e) => setNotification('sound', e.target.checked)} />
                      <span className="slider" />
                    </div>
                  </label>
                </div>
              </div>
            </section>

            <section className="nature-card relative overflow-hidden">
              <div className="absolute inset-0 settings-section-overlay" />
              <div className="relative p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500 to-green-500 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl text-white">help</span>
                  </div>
                  <h2 className="text-xl font-bold font-headline text-on-surface">{t('helpAndSupport')}</h2>
                </div>
                <p className="text-sm text-on-surface-variant/90 mb-5">{t('supportDescription')}</p>
                <div className="mb-5 rounded-xl border border-primary/20 bg-primary/8 px-4 py-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                    <p className="text-sm font-semibold text-on-surface">{t('supportOnline')}</p>
                  </div>
                  <p className="text-xs text-on-surface-variant/90">{t('supportHours')}</p>
                  <p className="text-xs text-on-surface-variant/90">{t('supportAvgResponse')}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <a href={liveChatMail} className="support-action-card" target="_blank" rel="noreferrer">
                    <p className="font-bold text-on-surface">{t('liveChat')}</p>
                    <p className="text-xs text-on-surface-variant/85 mt-1">Avg response: &lt; 2 min</p>
                  </a>
                  <Link href="/full_diagnostic" className="support-action-card">
                    <p className="font-bold text-on-surface">{t('knowledgeBase')}</p>
                    <p className="text-xs text-on-surface-variant/85 mt-1">Setup guides and troubleshooting</p>
                  </Link>
                  <a href={contactSupportMail} className="support-action-card">
                    <p className="font-bold text-on-surface">{t('contactSupport')}</p>
                    <p className="text-xs text-on-surface-variant/85 mt-1">support@veridian-lab.io</p>
                  </a>
                </div>
              </div>
            </section>

            {/* System Info */}
            <section className="bg-gradient-to-r from-primary/10 to-primary-light/5 rounded-2xl p-8 border border-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-2xl text-primary">info</span>
                <h2 className="text-xl font-bold font-headline">{t('about')}</h2>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">{t('version')}</span>
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
              {t('saveChanges')}
            </button>
            <button className="flex-1 py-3 bg-surface-container-high text-on-surface rounded-xl font-bold uppercase tracking-wide hover:bg-surface-container-highest transition-all">
              {t('logout')}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}