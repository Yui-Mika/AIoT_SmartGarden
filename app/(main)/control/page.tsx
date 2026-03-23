'use client';

import './style.css';
import Link from 'next/link';
import { useState } from 'react';

export default function ControlPage() {
  const [circPumpActive, setCircPumpActive] = useState(true);
  const [aeratorActive, setAeratorActive] = useState(false);
  return (
    <>
      {/* Main Canvas */}
      <main className="px-8 pb-12 min-h-screen">
       

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column: Mode & Manual Overrides */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-8">
            {/* Mode Selector */}
            <section className="bg-surface-container-lowest p-8 rounded-xl relative overflow-hidden">
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <h2 className="font-headline font-bold text-sm uppercase tracking-widest text-on-surface-variant">Operation Mode</h2>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary relative">
                      <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75" />
                    </div>
                    <span className="text-[10px] font-bold text-primary uppercase">Active</span>
                  </div>
                </div>
                <div className="bg-surface-container-low p-1.5 rounded-full flex gap-1">
                  <button className="flex-1 py-3 px-6 rounded-full bg-primary text-on-primary font-headline font-bold text-xs uppercase tracking-widest transition-all">
                    AUTO - Fuzzy Logic
                  </button>
                  <button className="flex-1 py-3 px-6 rounded-full text-on-surface-variant font-headline font-semibold text-xs uppercase tracking-widest hover:bg-surface-container-highest transition-all">
                    MANUAL
                  </button>
                </div>
                <p className="text-xs text-on-surface-variant italic leading-relaxed">
                  Fuzzy logic is currently regulating pH and EC levels for 'General Hydroponics FloraSeries' protocol.
                </p>
              </div>
            </section>

            {/* Manual Overrides */}
            <section className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/15">
              <h2 className="font-headline font-bold text-sm uppercase tracking-widest text-on-surface-variant mb-8">Manual Overrides</h2>
              <div className="flex flex-col gap-3">
                {/* Circulation Pump */}
                <div className="bg-surface-container-lowest p-4 rounded-lg flex items-center justify-between border border-outline-variant/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-secondary/10 flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-sm">cycle</span>
                    </div>
                    <div>
                      <div className="font-headline font-bold text-xs">Circulation Pump</div>
                      <div className={`text-[9px] font-bold uppercase ${circPumpActive ? 'text-secondary' : 'text-on-surface-variant'}`}>{circPumpActive ? 'Running' : 'Idle'}</div>
                    </div>
                  </div>
                  <button onClick={() => setCircPumpActive(!circPumpActive)} className={`w-10 h-5 ${circPumpActive ? 'bg-primary' : 'bg-gray-400'} rounded-full relative transition-colors`}>
                    <div className={`absolute ${circPumpActive ? 'right-0.5' : 'left-0.5'} top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all`} />
                  </button>
                </div>

                {/* Aerator */}
                <div className="bg-surface-container-lowest p-4 rounded-lg flex items-center justify-between border border-outline-variant/10">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-md ${aeratorActive ? 'bg-secondary/10 text-secondary' : 'bg-on-surface-variant/5 text-on-surface-variant'} flex items-center justify-center`}>
                      <span className="material-symbols-outlined text-sm">air</span>
                    </div>
                    <div>
                      <div className="font-headline font-bold text-xs">Aerator</div>
                      <div className={`text-[9px] font-bold uppercase ${aeratorActive ? 'text-secondary' : 'text-on-surface-variant opacity-60'}`}>{aeratorActive ? 'Running' : 'Idle'}</div>
                    </div>
                  </div>
                  <button onClick={() => setAeratorActive(!aeratorActive)} className={`w-10 h-5 ${aeratorActive ? 'bg-primary' : 'bg-surface-container-highest'} rounded-full relative transition-colors`}>
                    <div className={`absolute ${aeratorActive ? 'right-0.5' : 'left-0.5'} top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all`} />
                  </button>
                </div>

                {/* Dosing Pump A */}
                <div className="bg-surface-container-lowest p-4 rounded-lg flex items-center justify-between border border-outline-variant/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-primary-container/20 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-sm">science</span>
                    </div>
                    <div>
                      <div className="font-headline font-bold text-xs">Dosing Pump A (Micro)</div>
                      <div className="text-[9px] text-on-surface-variant opacity-60 font-bold uppercase">Ready</div>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-surface-container-highest text-[10px] font-bold uppercase rounded-md hover:bg-primary hover:text-white transition-all">Pulse</button>
                </div>

                {/* Dosing Pump B */}
                <div className="bg-surface-container-lowest p-4 rounded-lg flex items-center justify-between border border-outline-variant/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-primary-container/20 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-sm">science</span>
                    </div>
                    <div>
                      <div className="font-headline font-bold text-xs">Dosing Pump B (Bloom)</div>
                      <div className="text-[9px] text-on-surface-variant opacity-60 font-bold uppercase">Ready</div>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-surface-container-highest text-[10px] font-bold uppercase rounded-md hover:bg-primary hover:text-white transition-all">Pulse</button>
                </div>

                {/* pH Down/Up */}
                <div className="bg-surface-container-lowest p-4 rounded-lg flex flex-col gap-3 border border-outline-variant/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-tertiary/10 flex items-center justify-center text-tertiary">
                        <span className="material-symbols-outlined text-sm">opacity</span>
                      </div>
                      <div className="font-headline font-bold text-xs">pH Down/Up Controls</div>
                    </div>
                    <div className="text-[9px] text-on-surface-variant opacity-60 font-bold uppercase">Manual Dispense</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-tertiary/10 text-tertiary text-[10px] font-extrabold uppercase rounded border border-tertiary/20 hover:bg-tertiary hover:text-white transition-all">pH Down</button>
                    <button className="flex-1 py-2 bg-secondary/10 text-secondary text-[10px] font-extrabold uppercase rounded border border-secondary/20 hover:bg-secondary hover:text-white transition-all">pH Up</button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Logic & Scheduling */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-8">
            {/* Fuzzy Logic Config */}
            <section className="bg-surface-container-lowest p-8 rounded-xl">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h2 className="font-headline font-bold text-sm uppercase tracking-widest text-on-surface-variant mb-1">Fuzzy Logic Thresholds</h2>
                  <p className="text-xs text-on-surface-variant opacity-60">Define optimal ranges for the automated dosing system.</p>
                </div>
                <div className="relative group cursor-help">
                  <span className="material-symbols-outlined text-on-surface-variant">info</span>
                  <div className="tooltip w-64 p-3 bg-inverse-surface text-inverse-on-surface text-[10px] leading-relaxed rounded-lg shadow-xl hidden group-hover:block absolute right-0 z-10">
                    <p className="font-bold mb-1 uppercase tracking-wider">Example Logic:</p>
                    <ul className="list-disc pl-3 gap-1 flex flex-col">
                      <li>If pH &lt; 5.5, trigger pH Up pump.</li>
                      <li>If EC &lt; 1.2 mS, trigger Dosing Pump A + B.</li>
                      <li>If pH &gt; 6.5, trigger pH Down pump.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-12">
                {/* pH Target Range Slider */}
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div className="label-sm font-label text-primary font-bold uppercase tracking-tighter">pH Target Range</div>
                    <div className="text-3xl font-headline font-extrabold text-on-surface">5.5 - 6.5<span className="text-sm font-normal opacity-40 ml-1">pH</span></div>
                  </div>
                  <div className="relative h-2 bg-surface-container-low rounded-full">
                    <div className="absolute left-[35%] top-0 h-full w-[25%] bg-primary rounded-full" />
                    <div className="absolute left-[35%] -top-2 w-6 h-6 bg-white border-4 border-primary rounded-full shadow-xl cursor-pointer" />
                    <div className="absolute left-[60%] -top-2 w-6 h-6 bg-white border-4 border-primary rounded-full shadow-xl cursor-pointer" />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-on-surface-variant opacity-40 uppercase">
                    <span>Acidic Risk</span>
                    <span>Optimal Range</span>
                    <span>Alkaline Risk</span>
                  </div>
                </div>

                {/* EC Concentration Slider */}
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div className="label-sm font-label text-secondary font-bold uppercase tracking-tighter">EC Concentration Thresholds</div>
                    <div className="text-3xl font-headline font-extrabold text-on-surface">1.8<span className="text-sm font-normal opacity-40 ml-1">mS/cm</span></div>
                  </div>
                  <div className="relative h-2 bg-surface-container-low rounded-full">
                    <div className="absolute left-0 top-0 h-full w-[60%] bg-secondary rounded-full" />
                    <div className="absolute left-[60%] -top-2 w-6 h-6 bg-white border-4 border-secondary rounded-full shadow-xl cursor-pointer" />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-on-surface-variant opacity-40 uppercase">
                    <span>Nutrient Deficiency</span>
                    <span>Target Level</span>
                    <span>Salt Toxicity</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Scheduler */}
            <section className="bg-surface-container-low p-8 rounded-xl">
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-primary">schedule</span>
                <h2 className="font-headline font-bold text-sm uppercase tracking-widest text-on-surface-variant">Grow Light Schedule</h2>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/10">
                  <div className="text-[10px] font-bold text-on-surface-variant opacity-60 uppercase mb-4">Daily Sunrise (ON)</div>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-headline font-bold text-on-surface tracking-tighter">08:00</div>
                    <div className="flex flex-col gap-1">
                      <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer text-sm">expand_less</span>
                      <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer text-sm">expand_more</span>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/10">
                  <div className="text-[10px] font-bold text-on-surface-variant opacity-60 uppercase mb-4">Daily Sunset (OFF)</div>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-headline font-bold text-on-surface tracking-tighter">20:00</div>
                    <div className="flex flex-col gap-1">
                      <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer text-sm">expand_less</span>
                      <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer text-sm">expand_more</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-outline-variant/10">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
                    <span className="text-xs font-semibold text-on-surface-variant">Recommended: 12h photoperiod for flowering stage.</span>
                  </div>
                  <button className="text-xs font-bold text-primary uppercase hover:underline decoration-2 underline-offset-4">Apply Global Presets</button>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer Metric Bar */}
        <footer className="mt-12 bg-surface-container-high/50 p-6 rounded-xl flex justify-between items-center">
          <div className="flex gap-12">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-on-surface-variant opacity-50 uppercase tracking-widest">CPU LOAD</span>
              <span className="font-headline font-bold text-sm">12.4%</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-on-surface-variant opacity-50 uppercase tracking-widest">UPTIME</span>
              <span className="font-headline font-bold text-sm">42d 11h 04m</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-on-surface-variant opacity-50 uppercase tracking-widest">WIFI SIGNAL</span>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-primary">signal_cellular_4_bar</span>
                <span className="font-headline font-bold text-sm">-44 dBm</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2 rounded-md bg-surface-container-lowest text-on-surface transition-all hover:bg-surface-container-high">Reboot Controller</button>
            <button className="px-5 py-2 rounded-md bg-on-surface text-white text-xs font-bold uppercase tracking-widest hover:bg-black transition-all">Commit Changes</button>
          </div>
        </footer>
      </main>
    </>
  );
}