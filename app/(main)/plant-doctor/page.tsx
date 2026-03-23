'use client';

import Image from 'next/image';
import { useState } from 'react';

const PlantDoctorPage = () => {
  const [aiEnabled, setAiEnabled] = useState(true);
  const [chatMessage, setChatMessage] = useState('');
  
  const handleScan = () => {
    alert('Scan initiated! Processing camera feed...');
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      alert(`Message sent: ${chatMessage}`);
      setChatMessage('');
    }
  };
  return (
    <main className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-screen">
        
        {/* Center Diagnostics Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Header Section */}
          <div className="flex items-end justify-between">
            <div>
              <span className="font-label text-[10px] font-bold tracking-[0.2em] text-outline uppercase">Hydroponic Diagnostics</span>
              <h1 className="font-headline text-4xl font-extrabold tracking-tighter text-on-surface">Plant Doctor <span className="text-primary">v2.4</span></h1>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-full">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-label text-xs font-semibold text-on-surface-variant uppercase tracking-wider">ESP32-CAM: Active</span>
              </div>
            </div>
          </div>

          {/* Live Camera Feed Container */}
          <div className="relative aspect-video rounded-lg overflow-hidden bg-surface-container-highest group">
            <Image
              alt="Live Hydroponic Feed"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIGtnWPLFQrT6bIVO6AkRBD0kQFHgJjQX-DQkKHJM_OojJMQ3u29aWbrhvncK4UnWcizCPoxKXa2CUVd9Zk2v-Dk6hzohvmqMsJIS-JXSCLSUCW3zAEP969eLxyEGqc9ap-0U97fDN2KDP3U-J1yigvlrivasVpOdCdjkDKPSUjiuS5ph0zpIN3XcDSH11g9RFAXHoiZPozolEWle5HWR6QPJ-o8XIyRJfkPCk-HLxMCaqVlmhe8vrwolQYUzk19LQk68KNs021iXp"
              fill
              priority
              unoptimized
            />
            {/* AI Bounding Boxes (Simulated) */}
            <div className="absolute top-[20%] left-[25%] w-[30%] h-[40%] border-2 border-tertiary flex flex-col justify-start">
              <span className="bg-tertiary text-on-tertiary font-label text-[10px] font-bold px-2 py-0.5 w-fit">Nutrient Deficiency (N) - 94%</span>
            </div>
            <div className="absolute bottom-[10%] left-[40%] w-[20%] h-[20%] border-2 border-error flex flex-col justify-start">
              <span className="bg-error text-on-error font-label text-[10px] font-bold px-2 py-0.5 w-fit">Potential Root Rot - 88%</span>
            </div>
            {/* Camera UI Overlay */}
            <div className="absolute bottom-6 left-6 flex items-center gap-4">
              <button onClick={handleScan} className="bg-primary text-on-primary px-6 py-3 rounded font-headline font-bold flex items-center gap-2 hover:bg-primary-container hover:text-on-primary-container transition-all shadow-xl">
                <span className="material-symbols-outlined">center_focus_strong</span>
                Scan Now
              </button>
              <div className="bg-surface-container-lowest/80 backdrop-blur-md px-4 py-2.5 rounded flex items-center gap-3">
                <span className="font-label text-xs font-bold text-on-surface-variant">Explainable AI</span>
                <button onClick={() => setAiEnabled(!aiEnabled)} className={`w-10 h-5 ${aiEnabled ? 'bg-primary' : 'bg-gray-400'} rounded-full relative transition-all`}>
                  <span className={`absolute ${aiEnabled ? 'right-1' : 'left-1'} top-1 w-3 h-3 bg-white rounded-full transition-all`} />
                </button>
              </div>
            </div>
            {/* Lens Metadata */}
            <div className="absolute top-6 right-6 font-label text-[10px] text-white/70 text-right uppercase tracking-[0.1em] pointer-events-none">
              <p>Focal: 3.6mm</p>
              <p>Res: 1600x1200</p>
              <p>Module: Hydro-v2</p>
            </div>
          </div>

          {/* Secondary Metrics Bento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-surface-container-lowest p-5 rounded-lg flex flex-col justify-between">
              <span className="font-label text-[10px] font-bold text-outline uppercase">Reservoir pH</span>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="font-headline text-3xl font-extrabold text-on-surface">5.8</span>
                <span className="text-on-surface-variant text-sm font-semibold">pH</span>
              </div>
              <div className="mt-4 h-1 bg-surface-container-low rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[80%]" />
              </div>
            </div>
            <div className="bg-surface-container-lowest p-5 rounded-lg flex flex-col justify-between">
              <span className="font-label text-[10px] font-bold text-outline uppercase">Nutrient EC</span>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="font-headline text-3xl font-extrabold text-on-surface">1.2</span>
                <span className="text-on-surface-variant text-sm font-semibold">mS/cm</span>
              </div>
              <div className="mt-4 h-1 bg-surface-container-low rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-[40%]" />
              </div>
            </div>
            <div className="bg-surface-container-lowest p-5 rounded-lg flex flex-col justify-between">
              <span className="font-label text-[10px] font-bold text-outline uppercase">System Health</span>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="font-headline text-3xl font-extrabold text-tertiary">CRITICAL</span>
              </div>
              <div className="mt-4 flex gap-1">
                <div className="h-1 bg-tertiary flex-1 rounded-full" />
                <div className="h-1 bg-tertiary flex-1 rounded-full" />
                <div className="h-1 bg-tertiary flex-1 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* LLM Assistant Sidebar Column */}
        <div className="lg:col-span-4 h-full">
          <div className="bg-surface-container-low rounded-lg h-full flex flex-col overflow-hidden border border-outline-variant/10 shadow-sm">
            {/* Chat Header */}
            <div className="p-5 bg-surface-container-lowest flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" } as React.CSSProperties}>neurology</span>
              </div>
              <div>
                <h2 className="font-headline font-bold text-sm text-on-surface">Greenhouse AI</h2>
                <p className="text-[10px] font-semibold text-primary uppercase tracking-widest">Synthesizing Data...</p>
              </div>
            </div>
            {/* Chat History */}
            <div className="flex-1 p-5 overflow-y-auto space-y-6 no-scrollbar">
              {/* AI Message */}
              <div className="flex flex-col gap-2 max-w-[90%]">
                <div className="bg-primary text-on-primary p-4 rounded-lg rounded-tl-none text-sm leading-relaxed shadow-sm">
                  System detected <span className="font-bold underline">low Nitrogen levels</span> and potential <span className="font-bold underline">Root Rot</span>. Would you like to adjust the nutrient dosing schedule?
                </div>
                <span className="text-[9px] font-bold text-outline uppercase ml-1">AI Assistant • 12:44 PM</span>
              </div>
              {/* User Choice / Suggestions */}
              <div className="flex flex-col gap-2 items-end">
                <button className="bg-surface-container-highest hover:bg-surface-container-high transition-colors text-on-surface p-3 rounded text-xs font-semibold w-fit border border-outline-variant/20">
                  Adjust dosing schedule
                </button>
                <button className="bg-surface-container-highest hover:bg-surface-container-high transition-colors text-on-surface p-3 rounded text-xs font-semibold w-fit border border-outline-variant/20">
                  Run root zone diagnostic
                </button>
              </div>
              {/* Recommendation Card */}
              <div className="bg-surface-container-lowest border border-tertiary/20 p-4 rounded-lg space-y-3">
                <div className="flex items-center gap-2 text-tertiary">
                  <span className="material-symbols-outlined text-lg">warning</span>
                  <span className="font-headline font-bold text-xs uppercase tracking-tight">Immediate Action Required</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Nitrogen levels at 40% of target. Root zone moisture sensor indicates potential saturation. Flush system and increase oxygenation immediately.
                </p>
              </div>
            </div>
            {/* Chat Input */}
            <div className="p-4 bg-surface-container-lowest border-t border-outline-variant/15">
              <div className="relative flex gap-2">
                <input
                  className="flex-1 bg-surface-container-low border-none rounded py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-outline/60"
                  placeholder="Ask about hydroponic health..."
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button onClick={handleSendMessage} className="w-10 h-10 bg-primary text-on-primary rounded flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-all">
                  <span className="material-symbols-outlined text-lg">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
    </main>
  );
};

export default PlantDoctorPage;