'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const DashboardPage = () => {
  const [showAlert, setShowAlert] = useState(true);
  const [notes, setNotes] = useState('');
  
  return (
    <div className="p-8 max-w-7xl mx-auto">
          {/* Connection Alert */}
          {showAlert && (
            <div className="mb-8 p-4 bg-tertiary-fixed border-l-4 border-tertiary rounded-lg flex items-center justify-between animate-pulse">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-tertiary">report</span>
                <span className="text-sm font-semibold text-on-tertiary-fixed-variant">CRITICAL: CONNECTION LOST TO SENSOR HUB 0492. ATTEMPTING RECONNECT...</span>
              </div>
              <button onClick={() => setShowAlert(false)} className="text-xs font-bold uppercase tracking-widest text-tertiary hover:underline">Dismiss</button>
            </div>
          )}
          
          {/* Dashboard Header Section */}
          <div className="mb-8">
            <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tighter mb-2">System Dashboard</h1>
            <p className="text-on-surface-variant text-sm">Real-time monitoring of hydroponic systems and sensor data</p>
          </div>
         
          {/* Bento Grid: Main Data Modules - Improved Responsive Layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            {/* Sensor Card: pH Level */}
            <div className="nature-card relative overflow-hidden group p-4 md:p-6 flex flex-col items-center justify-between h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/15 to-cyan-400/10 group-hover:from-blue-400/25 group-hover:to-cyan-400/20 transition-all duration-300" />
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-4xl text-blue-500">science</span>
              </div>
              <div className="relative w-full flex flex-col flex-1 items-center justify-between">
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-2 md:mb-4 block">PH-001</span>
                <div className="relative w-24 h-24 md:w-32 md:h-32 mb-2 md:mb-4 flex items-center justify-center flex-shrink-0">
                  <svg className="w-full h-full" viewBox="0 0 128 128">
                    <circle className="text-blue-200" cx="64" cy="64" fill="transparent" r="50" stroke="currentColor" strokeWidth="8" />
                    <circle className="text-blue-500 progress-ring__circle" cx="64" cy="64" fill="transparent" r="50" stroke="currentColor" strokeDasharray="314.159" strokeDashoffset="175.9" strokeLinecap="round" strokeWidth="8" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl md:text-3xl font-extrabold font-headline tracking-tighter">6.2</span>
                  </div>
                </div>
                <h3 className="font-headline font-bold text-xs md:text-sm text-center">pH Level</h3>
                <p className="text-[8px] md:text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1 text-center">
                  Stable
                </p>
              </div>
            </div>
            {/* Sensor Card: EC/TDS */}
            <div className="nature-card relative overflow-hidden group p-4 md:p-6 flex flex-col items-center justify-between h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/15 to-emerald-400/10 group-hover:from-green-400/25 group-hover:to-emerald-400/20 transition-all duration-300" />
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-4xl text-green-500">bolt</span>
              </div>
              <div className="relative w-full flex flex-col flex-1 items-center justify-between">
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-green-600 mb-2 md:mb-4 block">EC-002</span>
                <div className="relative w-24 h-24 md:w-32 md:h-32 mb-2 md:mb-4 flex items-center justify-center flex-shrink-0">
                  <svg className="w-full h-full" viewBox="0 0 128 128">
                    <circle className="text-green-200" cx="64" cy="64" fill="transparent" r="50" stroke="currentColor" strokeWidth="8" />
                    <circle className="text-green-500 progress-ring__circle" cx="64" cy="64" fill="transparent" r="50" stroke="currentColor" strokeDasharray="314.159" strokeDashoffset="125.66" strokeLinecap="round" strokeWidth="8" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xl md:text-2xl font-extrabold font-headline tracking-tighter leading-none">1.8</span>
                    <span className="text-[8px] md:text-[10px] font-bold font-label uppercase">mS/cm</span>
                  </div>
                </div>
                <h3 className="font-headline font-bold text-xs md:text-sm text-center">EC/TDS</h3>
                <p className="text-[8px] md:text-[10px] font-bold text-green-600 uppercase tracking-widest mt-1 text-center">
                  Optimal
                </p>
              </div>
            </div>
            {/* Sensor Card: Water Temperature */}
            <div className="nature-card relative overflow-hidden group p-4 md:p-6 flex flex-col items-center justify-between h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/15 to-amber-400/10 group-hover:from-orange-400/25 group-hover:to-amber-400/20 transition-all duration-300" />
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-4xl text-orange-500">device_thermostat</span>
              </div>
              <div className="relative w-full flex flex-col flex-1 items-center justify-between">
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-orange-600 mb-2 md:mb-4 block">TEMP-003</span>
                <div className="relative w-24 h-24 md:w-32 md:h-32 mb-2 md:mb-4 flex items-center justify-center flex-shrink-0">
                  <svg className="w-full h-full" viewBox="0 0 128 128">
                    <circle className="text-orange-200" cx="64" cy="64" fill="transparent" r="50" stroke="currentColor" strokeWidth="8" />
                    <circle className="text-orange-500 progress-ring__circle" cx="64" cy="64" fill="transparent" r="50" stroke="currentColor" strokeDasharray="314.159" strokeDashoffset="125.66" strokeLinecap="round" strokeWidth="8" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl md:text-3xl font-extrabold font-headline tracking-tighter">24°C</span>
                  </div>
                </div>
                <h3 className="font-headline font-bold text-xs md:text-sm text-center">Water Temp</h3>
                <p className="text-[8px] md:text-[10px] font-bold text-orange-600 uppercase tracking-widest mt-1 text-center">
                  Optimal
                </p>
              </div>
            </div>
            {/* Sensor Card: Water Tank Level */}
            <div className="nature-card relative overflow-hidden group p-4 md:p-6 flex flex-col items-center justify-between h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/15 to-blue-400/10 group-hover:from-cyan-400/25 group-hover:to-blue-400/20 transition-all duration-300" />
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-4xl text-cyan-500">rebase_edit</span>
              </div>
              <div className="relative w-full flex flex-col flex-1 items-center justify-between">
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-cyan-600 mb-2 md:mb-4 block">LEVEL-004</span>
                <div className="relative w-24 h-24 md:w-32 md:h-32 mb-2 md:mb-4 flex items-center justify-center flex-shrink-0">
                  <svg className="w-full h-full" viewBox="0 0 128 128">
                    <circle className="text-cyan-200" cx="64" cy="64" fill="transparent" r="50" stroke="currentColor" strokeWidth="8" />
                    <circle className="text-cyan-500 progress-ring__circle" cx="64" cy="64" fill="transparent" r="50" stroke="currentColor" strokeDasharray="314.159" strokeDashoffset="47.12" strokeLinecap="round" strokeWidth="8" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl md:text-3xl font-extrabold font-headline tracking-tighter">85%</span>
                  </div>
                </div>
                <h3 className="font-headline font-bold text-xs md:text-sm text-center">Tank Level</h3>
                <p className="text-[8px] md:text-[10px] font-bold text-cyan-600 uppercase tracking-widest mt-1 text-center">
                  High
                </p>
              </div>
            </div>
          </div>
          {/* Quick Access Menu - More Responsive */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {/* Plant Doctor Link */}
            <Link href="/plant-doctor" className="nature-card block relative overflow-hidden group p-4 md:p-6 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-red-400/10 to-pink-400/10 group-hover:from-red-400/20 group-hover:to-pink-400/20 transition-all duration-300" />
              <div className="relative">
                <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 mb-3 md:mb-4">
                  <span className="material-symbols-outlined text-base md:text-2xl text-white">medical_services</span>
                </div>
                <h3 className="font-bold text-on-surface text-sm md:text-base mb-1">Plant Doctor</h3>
                <p className="text-xs md:text-xs text-on-surface-variant/60 line-clamp-2">AI Detection</p>
              </div>
            </Link>

            {/* Control Panel Link */}
            <Link href="/control" className="nature-card block relative overflow-hidden group p-4 md:p-6 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-amber-400/10 group-hover:from-orange-400/20 group-hover:to-amber-400/20 transition-all duration-300" />
              <div className="relative">
                <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 mb-3 md:mb-4">
                  <span className="material-symbols-outlined text-base md:text-2xl text-white">tune</span>
                </div>
                <h3 className="font-bold text-on-surface text-sm md:text-base mb-1">Control</h3>
                <p className="text-xs md:text-xs text-on-surface-variant/60 line-clamp-2">System</p>
              </div>
            </Link>

            {/* Analytics Link */}
            <Link href="/analytics" className="nature-card block relative overflow-hidden group p-4 md:p-6 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 group-hover:from-blue-400/20 group-hover:to-cyan-400/20 transition-all duration-300" />
              <div className="relative">
                <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 mb-3 md:mb-4">
                  <span className="material-symbols-outlined text-base md:text-2xl text-white">analytics</span>
                </div>
                <h3 className="font-bold text-on-surface text-sm md:text-base mb-1">Analytics</h3>
                <p className="text-xs md:text-xs text-on-surface-variant/60 line-clamp-2">Trends</p>
              </div>
            </Link>

            {/* Settings Link */}
            <Link href="/settings" className="nature-card block relative overflow-hidden group p-4 md:p-6 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400/10 to-green-400/10 group-hover:from-teal-400/20 group-hover:to-green-400/20 transition-all duration-300" />
              <div className="relative">
                <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-teal-500 to-green-500 mb-3 md:mb-4">
                  <span className="material-symbols-outlined text-base md:text-2xl text-white">settings</span>
                </div>
                <h3 className="font-bold text-on-surface text-sm md:text-base mb-1">Settings</h3>
                <p className="text-xs md:text-xs text-on-surface-variant/60 line-clamp-2">Configure</p>
              </div>
            </Link>
          </div>

          {/* Lower Grid: Controls & Advanced Visuals - Improved Responsive */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Actuator Quick Controls */}
            <section className="lg:col-span-1 flex flex-col gap-3 md:gap-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60 mb-2">Quick Controls</h2>
              
              <div className="nature-card p-4 md:p-5 flex items-center justify-between group transition-all hover:bg-secondary-container/10">
                <div className="flex items-center gap-3 md:gap-4 min-w-0">
                  <div className="p-2 md:p-3 rounded-lg bg-secondary text-on-secondary flex-shrink-0">
                    <span className="material-symbols-outlined text-base md:text-xl" style={{ fontVariationSettings: "'FILL' 1" } as React.CSSProperties}>water_pump</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs md:text-sm truncate">Pump</h4>
                    <span className="text-[8px] md:text-[10px] font-bold uppercase text-secondary whitespace-nowrap">5.2L/min</span>
                  </div>
                </div>
                <div className="flex flex-col items-end flex-shrink-0">
                  <span className="text-[8px] md:text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">On</span>
                  <div className="w-8 md:w-10 h-4 md:h-5 rounded-full bg-secondary p-0.5 flex justify-end">
                    <div className="w-2.5 md:w-3 h-2.5 md:h-3 rounded-full bg-white shadow-sm" />
                  </div>
                </div>
              </div>

              <div className="nature-card p-4 md:p-5 flex items-center justify-between group transition-all hover:bg-primary/5">
                <div className="flex items-center gap-3 md:gap-4 min-w-0">
                  <div className="p-2 md:p-3 rounded-lg bg-primary text-on-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-base md:text-xl">air</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs md:text-sm truncate">Aerator</h4>
                    <span className="text-[8px] md:text-[10px] font-bold uppercase text-primary whitespace-nowrap">Active</span>
                  </div>
                </div>
                <div className="flex flex-col items-end flex-shrink-0">
                  <span className="text-[8px] md:text-[10px] font-bold text-primary uppercase tracking-widest mb-1">On</span>
                  <div className="w-8 md:w-10 h-4 md:h-5 rounded-full bg-primary p-0.5 flex justify-end">
                    <div className="w-2.5 md:w-3 h-2.5 md:h-3 rounded-full bg-white shadow-sm" />
                  </div>
                </div>
              </div>

              <div className="nature-card p-4 md:p-5 flex items-center justify-between group transition-all hover:bg-tertiary/5">
                <div className="flex items-center gap-3 md:gap-4 min-w-0">
                  <div className="p-2 md:p-3 rounded-lg bg-surface-container-high text-on-surface-variant flex-shrink-0">
                    <span className="material-symbols-outlined text-base md:text-xl">medication</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs md:text-sm truncate">Dosing</h4>
                    <span className="text-[8px] md:text-[10px] font-bold uppercase text-on-surface-variant/60 whitespace-nowrap">Ready</span>
                  </div>
                </div>
                <div className="flex flex-col items-end flex-shrink-0">
                  <span className="text-[8px] md:text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest mb-1">Standby</span>
                  <div className="w-8 md:w-10 h-4 md:h-5 rounded-full bg-surface-container-highest p-0.5 flex justify-start">
                    <div className="w-2.5 md:w-3 h-2.5 md:h-3 rounded-full bg-white shadow-sm" />
                  </div>
                </div>
              </div>
            </section>

            {/* Environment Forecast / Visual */}
            <section className="lg:col-span-2">
              <h2 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60 mb-3 md:mb-4">Plantation Zone A-1</h2>
              <div className="relative h-48 md:h-56 lg:h-64 rounded-xl overflow-hidden bg-surface-container-low group">
                <Image
                  alt="Scientific Greenhouse"
                  className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-700"
                  src="/dashboard.png"
                  fill
                  priority
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-6 text-white">
                  <div>
                    <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest opacity-80">Living Lab</p>
                    <h3 className="text-lg md:text-2xl font-bold font-headline tracking-tight">Hydroponic Lettuce</h3>
                  </div>
                  <div className="flex gap-4 md:gap-6">
                    <div className="text-center">
                      <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest opacity-60">Health</p>
                      <p className="text-lg md:text-xl font-bold font-headline text-primary-container">98%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest opacity-60">Phase</p>
                      <p className="text-lg md:text-xl font-bold font-headline">Veg</p>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 md:top-6 left-4 md:left-6">
                  <div className="flex items-center gap-2 px-2 md:px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                    <span className="material-symbols-outlined text-[12px] md:text-[14px] text-primary-container">videocam</span>
                    <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-white">Live</span>
                  </div>
                </div>
              </div>

              {/* System Log */}
              <div className="mt-4 md:mt-6 p-3 md:p-4 bg-surface-container-low border-l-2 border-primary rounded-r-lg">
                <div className="flex items-center justify-between gap-2 md:gap-3">
                  <div className="flex items-center gap-2 md:gap-3 min-w-0">
                    <span className="material-symbols-outlined text-primary text-base md:text-lg flex-shrink-0">info</span>
                    <span className="text-xs md:text-sm font-medium font-body text-on-surface-variant line-clamp-2">pH level calibrated to 6.2</span>
                  </div>
                  <span className="text-[8px] md:text-[10px] font-bold font-label text-on-surface-variant/40 whitespace-nowrap flex-shrink-0">07:02 AM</span>
                </div>
              </div>
            </section>
          </div>

          {/* Floating Action for Mobile / Quick Note - Positioned above bottom nav on mobile */}
          <button onClick={() => setNotes(notes === '' ? 'Note created at ' + new Date().toLocaleTimeString() : '')} className="fixed bottom-24 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-40" title="Add a quick note">
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
  );
};

export default DashboardPage;