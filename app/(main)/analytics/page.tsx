'use client';

import Image from 'next/image';

const AnalyticsPage = () => {  
  return (
    <main className="px-8 pb-12 min-h-screen">
        {/* Header Section */}
        
        {/* Analytics Bento Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* pH Stability Area Chart Module */}
          <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-8 rounded-xl relative overflow-hidden border border-black/5">
            <div className="flex justify-between items-start mb-12">
              <div>
                <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest block mb-1">Telemetry Layer 01</span>
                <h2 className="font-headline text-xl font-bold text-on-surface flex items-center gap-2">
                  pH Stability 
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                </h2>
              </div>
              <div className="text-right">
                <span className="font-headline text-3xl font-extrabold text-secondary">6.2</span>
                <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">Current avg</p>
              </div>
            </div>
            {/* Custom SVG Chart Simulation */}
            <div className="h-64 w-full relative group">
              {/* Dosing Pump Activity Overlays */}
              <div className="absolute inset-0 flex">
                <div className="h-full w-[12%] bg-primary/5 border-x border-primary/10 ml-[20%] flex flex-col items-center pt-2">
                  <span className="font-label text-[8px] text-primary font-bold rotate-90 whitespace-nowrap opacity-40">DOSING_PUMP_ACTIVE</span>
                </div>
                <div className="h-full w-[8%] bg-primary/5 border-x border-primary/10 ml-[40%] flex flex-col items-center pt-2">
                  <span className="font-label text-[8px] text-primary font-bold rotate-90 whitespace-nowrap opacity-40">DOSING_PUMP_ACTIVE</span>
                </div>
              </div>
              {/* Chart Content */}
              <svg className="w-full h-full" viewBox="0 0 1000 200">
                <line className="text-surface-container-highest" stroke="currentColor" strokeWidth="1" x1="0" x2="1000" y1="50" y2="50" />
                <line className="text-surface-container-highest" stroke="currentColor" strokeWidth="1" x1="0" x2="1000" y1="100" y2="100" />
                <line className="text-surface-container-highest" stroke="currentColor" strokeWidth="1" x1="0" x2="1000" y1="150" y2="150" />
                <path className="opacity-30" d="M0,100 C100,105 200,95 300,110 C400,90 500,100 600,85 C700,95 800,105 900,95 L1000,100 L1000,200 L0,200 Z" fill="url(#moistureGradient)" />
                <path className="stroke-secondary" d="M0,100 C100,105 200,95 300,110 C400,90 500,100 600,85 C700,95 800,105 900,95 L1000,100" fill="none" strokeLinecap="round" strokeWidth="3" />
                <defs>
                  <linearGradient id="moistureGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#006397" />
                    <stop offset="100%" stopColor="#006397" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute bottom-0 w-full flex justify-between font-label text-[10px] text-on-surface-variant uppercase pt-4 border-t border-surface-container-high">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>23:59</span>
              </div>
            </div>
          </div>
          {/* Side Metrics / Stats Column */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            {/* EC Levels Spark Card */}
            <div className="bg-surface-container-lowest p-6 rounded-xl flex-1 border border-black/5">
              <div className="flex justify-between items-start mb-4">
                <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">EC Concentration</span>
                <span className="material-symbols-outlined text-primary">electric_bolt</span>
              </div>
              <h3 className="font-headline text-3xl font-extrabold text-on-surface mb-1">1.8 mS/cm</h3>
              <div className="flex items-center gap-2 mb-6">
                <span className="font-label text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded font-bold">+0.1 Δ</span>
                <span className="font-label text-[10px] text-on-surface-variant">vs last hour</span>
              </div>
              <div className="h-16 w-full">
                <svg className="w-full h-full" viewBox="0 0 400 60">
                  <path className="stroke-primary" d="M0,45 L40,40 L80,42 L120,35 L160,38 L200,30 L240,32 L280,25 L320,28 L360,20 L400,22" fill="none" strokeWidth="2" />
                </svg>
              </div>
            </div>
            {/* Solution Efficiency Card */}
            <div className="bg-primary text-on-primary p-6 rounded-xl flex-1 shadow-md">
              <div className="flex justify-between items-start mb-4">
                <span className="font-label text-[10px] text-on-primary/70 uppercase tracking-widest">Nutrient Bioavailability</span>
                <span className="material-symbols-outlined">waves</span>
              </div>
              <h3 className="font-headline text-3xl font-extrabold text-on-primary mb-1">94.8%</h3>
              <p className="font-body text-xs text-on-primary/80 leading-relaxed mb-6">Recirculation system maintaining optimal saturation. EC and pH buffers stable.</p>
              <div className="w-full bg-on-primary/20 h-1.5 rounded-full overflow-hidden">
                <div className="bg-on-primary h-full w-[94%]" />
              </div>
            </div>
          </div>
          {/* System Logs Data Grid */}
          <div className="col-span-12 bg-surface-container-lowest rounded-xl overflow-hidden border border-black/5">
            <div className="px-8 py-6 border-b border-surface-container-high flex justify-between items-center bg-surface-container-lowest">
              <h2 className="font-headline text-lg font-bold text-on-surface flex items-center gap-3">
                System Event Log
                <span className="font-label text-[10px] px-2 py-1 bg-surface-container-low text-on-surface-variant rounded-full tracking-tighter">LIVE_FEED</span>
              </h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
                  <input
                    className="bg-surface-container-low border-none rounded-lg pl-10 pr-4 py-2 text-xs focus:ring-1 focus:ring-primary w-64 placeholder:text-on-surface-variant/50"
                    placeholder="Search events..."
                    type="text"
                  />
                </div>
                <button className="material-symbols-outlined text-on-surface-variant p-2 hover:bg-surface-container-low rounded-lg transition-colors">filter_list</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest bg-surface-container-low/50">
                    <th className="px-8 py-4 font-semibold">Timestamp</th>
                    <th className="px-8 py-4 font-semibold">Event Classification</th>
                    <th className="px-8 py-4 font-semibold">Sensor Payload</th>
                    <th className="px-8 py-4 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-high font-body text-xs">
                  <tr className="hover:bg-surface-container-low transition-colors group">
                    <td className="px-8 py-5 text-on-surface-variant font-mono">14:22:04.12</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-secondary" />
                        <span className="font-semibold text-on-surface">pH Adjustment Triggered</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-on-surface-variant">
                      pH: <span className="text-secondary font-bold">6.8</span> | Buffer: <span className="text-primary font-bold">pH Down</span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-tighter">Applied</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors group">
                    <td className="px-8 py-5 text-on-surface-variant font-mono">14:15:33.89</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="font-semibold text-on-surface">Nutrient Solution Recirculated</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-on-surface-variant">
                      Flow Rate: <span className="text-primary font-bold">12.4 L/min</span> | Filter: <span className="text-primary font-bold">Clean</span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-tighter">Active</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-8 py-4 bg-surface-container-low/30 flex justify-between items-center">
              <span className="font-label text-[10px] text-on-surface-variant">Showing 5 of 1,248 entries</span>
              <div className="flex gap-1">
                <button className="p-2 hover:bg-surface-container-low rounded-lg transition-colors material-symbols-outlined text-sm">chevron_left</button>
                <button className="p-2 hover:bg-surface-container-low rounded-lg transition-colors material-symbols-outlined text-sm">chevron_right</button>
              </div>
            </div>
          </div>
        </div>
      </main>
  );
};

export default AnalyticsPage;

