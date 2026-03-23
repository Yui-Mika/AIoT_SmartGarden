"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Cpu, Droplets, Thermometer, Wifi, Zap, TerminalSquare, ShieldAlert, KeySquare, ShoppingCart, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useCart } from "@/components/providers/CartProvider";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

function HudCorners({ color = "rgba(34,211,238,0.5)" }: { color?: string }) {
  const c = `absolute w-2 h-2 border-[1.5px] pointer-events-none z-20 transition-colors duration-300`;
  return (
    <>
      <div className={`${c} top-[-1px] left-[-1px] border-r-0 border-b-0`} style={{ borderColor: color }} />
      <div className={`${c} top-[-1px] right-[-1px] border-l-0 border-b-0`} style={{ borderColor: color }} />
      <div className={`${c} bottom-[-1px] left-[-1px] border-r-0 border-t-0`} style={{ borderColor: color }} />
      <div className={`${c} bottom-[-1px] right-[-1px] border-l-0 border-t-0`} style={{ borderColor: color }} />
    </>
  );
}

const SYSTEM_LOGS = [
  "> INITIATING DIAGNOSTICS...",
  "> MCU: ESP32-S3 DETECTED",
  "> SENSORS: CALIBRATED (pH ERROR: 0.01)",
  "> NETWORK: MQTT BROKER CONNECTED",
  "> STATUS: OPERATIONAL"
];

// Reusable Counter
function GsapCounter({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  
  useGSAP(() => {
    if (!nodeRef.current) return;
    const target = { val: 0 };
    gsap.to(target, {
      val: value,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        if (nodeRef.current) {
          nodeRef.current.innerText = Math.round(target.val).toLocaleString("vi-VN") + suffix;
        }
      }
    });
  }, [value, suffix]);

  return <span ref={nodeRef}>0{suffix}</span>;
}

export default function ProductDetailClient({ product, relatedProducts }: { product: any; relatedProducts: any[] }) {
  const containerRef = useRef<HTMLElement>(null);
  const scanLineRef  = useRef<HTMLDivElement>(null);
  const { add }      = useCart();
  const [added, setAdded] = useState(false);
  const [logs, setLogs]   = useState<string[]>([]);

  const isSmartPot = product.category === "smart-pots";
  const pSpecs = product.specs || {};
  const gallery = product.images && product.images.length > 0 ? product.images : ["/window.svg"];

  // Master Timeline
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Phase 1: Deep Scan Reveal (Scanning Line + Blur removal)
    tl.fromTo(scanLineRef.current, 
      { top: "0%", opacity: 0 },
      { top: "100%", opacity: 1, duration: 1.5, ease: "power1.inOut" },
      0
    )
    .to(scanLineRef.current, { opacity: 0, duration: 0.2 })
    .fromTo(".reveal-target", 
      { opacity: 0, filter: "blur(20px)", y: 20 },
      { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.1, force3D: true },
      0.3
    );

    // Phase 2: Materialization (Wireframe -> Glass for the Hologram Center)
    tl.fromTo(".hologram-glass",
      { backgroundColor: "transparent", backdropFilter: "blur(0px)", borderColor: "rgba(34,211,238,0)" },
      { backgroundColor: "rgba(255,255,255,0.02)", backdropFilter: "blur(25px)", borderColor: "rgba(34,211,238,0.1)", duration: 1.5 },
      0.5
    );

    // Callout lines draw
    tl.fromTo(".callout-line",
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, stagger: 0.2, transformOrigin: "left center" },
      0.8
    )
    .fromTo(".callout-text", 
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.2 },
      1.0
    );

    // Phase 3: System Logs Typewriter 
    let delay = 1000;
    SYSTEM_LOGS.forEach((log, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, log]);
      }, delay + (i * 600));
    });

  }, { scope: containerRef });

  // 3D Hover Tilt for Image
  const tiltRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if(!tiltRef.current) return;
    const rect = tiltRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(tiltRef.current, { rotateX, rotateY, duration: 0.4, ease: "power2.out" });
  };
  const handleMouseLeave = () => {
    if(!tiltRef.current) return;
    gsap.to(tiltRef.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "power3.out" });
  };

  function handleAddToCart() {
    add({ slug: product.slug, name: product.name, category: product.category, price: product.price, salePrice: product.salePrice });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  // Generate deterministic ID
  const nodeId = Array.from(product.slug as string).reduce((acc, char:any) => acc + char.charCodeAt(0), 0).toString(16).toUpperCase().padStart(4, "0");

  return (
    <article ref={containerRef} className="container-app py-8 relative" style={{ perspective: "2000px" }}>
      {/* ── Phase 1: Deep Scan Line ── */}
      <div 
        ref={scanLineRef} 
        className="absolute left-0 right-0 h-1 bg-[var(--cyan-400)] z-50 pointer-events-none"
        style={{ boxShadow: "0 0 20px 5px rgba(34,211,238,0.5)" }}
      />

      <div className="reveal-target mb-6 flex items-center justify-between pointer-events-auto">
        <Link href="/products" className="flex items-center gap-2 text-xs font-mono uppercase text-[var(--cyan-500)] hover:text-[var(--cyan-300)] transition-colors">
          <ArrowLeft size={14} /> Back to Registry
        </Link>
        <span className="font-mono text-[9px] text-[var(--cyan-400)] border border-[var(--cyan-500)] px-2 py-0.5 rounded uppercase pulse-fast">
          SECURE_CONNECTION
        </span>
      </div>

      {/* ── SPLIT VIEW LAYOUT ── */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch relative z-10">
        
        {/* ── LEFT COLUMN: The Hologram Core (55%) ── */}
        <div className="w-full lg:w-[55%] flex flex-col gap-6">
          <div 
            className="hologram-glass relative w-full h-[400px] md:h-[550px] rounded-2xl border-dashed border p-8 flex items-center justify-center isolate"
            style={{ transformStyle: "preserve-3d" }}
          >
            <HudCorners />
            
            {/* Background Grid */}
            <div 
              className="absolute inset-0 z-[-1] opacity-20 pointer-events-none rounded-2xl"
              style={{ backgroundImage: "radial-gradient(circle, rgba(34,211,238,0.4) 1px, transparent 1px)", backgroundSize: "30px 30px" }}
            />

            {/* Micro texts */}
            <p className="absolute top-4 left-4 font-mono text-[10px] text-[var(--cyan-500)] opacity-70">
              [ HW_ID: {nodeId} ]<br/>
              [ RENDER: ACTIVE ]
            </p>

            {/* Ambient Base Light */}
            <div className="absolute inset-x-0 bottom-10 h-24 bg-[var(--cyan-500)] blur-[100px] opacity-20 pointer-events-none z-[-1]" />

            {/* The 3D Image Container */}
            <div
              ref={tiltRef}
              className="relative w-full max-w-[400px] aspect-square flex items-center justify-center cursor-crosshair group"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Image Lift */}
              <div 
                className="relative w-full h-full transition-transform duration-500 ease-out group-hover:translate-z-50"
                style={{ transform: "translateZ(0px)" }} // GSAP or CSS will lift this
              >
                <Image
                  src={gallery[0]}
                  alt="Product Core"
                  fill
                  className="object-contain drop-shadow-[0_20px_40px_rgba(34,211,238,0.15)] filter saturate-150 contrast-125"
                />
              </div>

              {/* Callout 1 (Top Right) */}
              <div className="absolute top-[20%] right-[-5%] md:right-[-10%] flex items-center pointer-events-none" style={{ transform: "translateZ(30px)" }}>
                <div className="callout-line w-12 md:w-24 h-px bg-[var(--cyan-500)]" />
                <div className="callout-text ml-2 flex flex-col">
                  <span className="font-mono text-[9px] text-[var(--cyan-400)] bg-[rgba(34,211,238,0.1)] px-1.5 py-0.5 border border-[var(--cyan-500)] whitespace-nowrap">
                    [ OPTICS_MODULE ]
                  </span>
                  <span className="text-[8px] text-[var(--text-muted)] mt-1 tracking-widest whitespace-nowrap">1080P AI VISION</span>
                </div>
              </div>

              {/* Callout 2 (Bottom Left) */}
              <div className="absolute bottom-[20%] left-[-5%] md:left-[-15%] flex flex-row-reverse items-center pointer-events-none" style={{ transform: "translateZ(40px)" }}>
                <div className="callout-line w-12 md:w-20 h-px bg-[var(--cyan-500)] origin-right" />
                <div className="callout-text mr-2 flex flex-col items-end">
                  <span className="font-mono text-[9px] text-[var(--emerald-400)] bg-[rgba(16,185,129,0.1)] px-1.5 py-0.5 border border-[var(--emerald-500)] whitespace-nowrap">
                    [ MAIN_BOARD ]
                  </span>
                  <span className="text-[8px] text-[var(--text-muted)] mt-1 tracking-widest whitespace-nowrap">EXT. SENSOR PORT</span>
                </div>
              </div>

              {/* Hologram Base Ring on hover */}
              <div 
                className="absolute inset-x-8 bottom-[-20%] h-32 rounded-full border-[2px] border-dashed border-[var(--cyan-500)] opacity-0 group-hover:opacity-40 group-hover:animate-pulse transition-opacity duration-700 pointer-events-none"
                style={{ transform: "rotateX(75deg) translateZ(-50px)", boxShadow: "0 0 30px rgba(34,211,238,0.3) inset" }}
              />
            </div>
          </div>

          {/* Sub Gallery */}
          {gallery.length > 1 && (
            <div className="reveal-target grid grid-cols-4 gap-3">
              {gallery.slice(1, 5).map((img: string, idx: number) => (
                <div key={idx} className="hologram-glass relative aspect-square rounded-xl border border-[rgba(34,211,238,0.2)] overflow-hidden cursor-pointer hover:border-[var(--cyan-500)] transition-colors">
                  <Image src={img} alt="Detail" fill className="object-cover opacity-60 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT COLUMN: The Data Matrix (45%) ── */}
        <div className="w-full lg:w-[45%] flex flex-col gap-6">
          
          {/* Header Info */}
          <div className="reveal-target hologram-glass rounded-2xl border border-[rgba(34,211,238,0.2)] p-6 relative">
            <HudCorners />
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-[10px] text-[var(--gold-400)] tracking-widest bg-[rgba(245,158,11,0.1)] px-2 py-1 border border-[rgba(245,158,11,0.3)]">
                {product.category.toUpperCase().replace("-", " ")}
              </span>
              <span className="flex items-center gap-1 font-mono text-[10px] text-[var(--emerald-400)]">
                <ShieldAlert size={12} /> VERIFIED COMPONENT
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-3">
              {product.name}
            </h1>
            
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              {product.description || "Module chức năng cao cấp dành cho hệ sinh thái nông nghiệp tự động Smart Garden. Được chứng nhận tương thích chuẩn truyền thông AIoT."}
            </p>

            <div className="flex items-end justify-between border-t border-[rgba(34,211,238,0.15)] pt-4">
              <div>
                <p className="font-mono text-[10px] text-[var(--text-muted)] mb-1">UNIT_PRICE</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-[var(--cyan-400)] drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
                    <GsapCounter value={product.salePrice || product.price} suffix=" ₫" duration={1.5} />
                  </span>
                  {product.salePrice && (
                    <span className="text-sm line-through text-[var(--text-muted)]">
                      {product.price.toLocaleString("vi-VN")} ₫
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Glitch Button CTA */}
          <button
            onClick={handleAddToCart}
            className="reveal-target relative group flex w-full items-center justify-center gap-2 rounded-none py-4 text-sm font-bold uppercase tracking-widest overflow-hidden transition-all duration-300"
            style={{
              color: added ? "var(--cyan-200)" : "var(--cyan-400)",
              border: `1px dashed ${added ? "var(--cyan-400)" : "rgba(34, 211, 238, 0.5)"}`,
              background: added ? "rgba(34,211,238,0.15)" : "rgba(0,0,0,0.4)",
              backdropFilter: "blur(10px)"
            }}
          >
            {/* The Glitch Scanline Background */}
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-[rgba(34,211,238,0.2)] to-transparent translate-x-[-100%] group-hover:animate-scan-horizontal" />
            
            <span className="relative z-10 flex items-center gap-2 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
              {added ? <Check size={16} /> : <ShoppingCart size={16} />}
              {added ? "EXECUTED" : "INITIATE PURCHASE MODULE"}
            </span>
          </button>

          {/* System Logs */}
          <div className="reveal-target hologram-glass flex-1 min-h-[160px] rounded-2xl border border-[rgba(34,211,238,0.2)] p-5 flex flex-col relative overflow-hidden">
            <HudCorners />
            <div className="flex items-center gap-2 mb-3 border-b border-[rgba(34,211,238,0.15)] pb-3">
              <TerminalSquare size={14} className="text-[var(--cyan-500)]" />
              <p className="font-mono text-[10px] text-[var(--cyan-400)] tracking-widest">SYSTEM_LOGS.EXE</p>
            </div>
            <div className="flex-1 font-mono text-[11px] text-[var(--text-secondary)] flex flex-col gap-1.5 overflow-y-auto">
              {logs.map((log, i) => (
                <div key={i} className="animate-fade-up">
                  <span className="text-[var(--cyan-600)] mr-2">{new Date().toISOString().substring(11, 19)}</span>
                  <span className={log.includes("ERROR") ? "text-red-400" : log.includes("OPERATIONAL") ? "text-[var(--emerald-400)]" : ""}>
                    {log}
                  </span>
                </div>
              ))}
              <div className="animate-pulse w-2 h-3 bg-[var(--cyan-500)] mt-1" />
            </div>
          </div>

          {/* Spec Grid */}
          <div className="reveal-target grid grid-cols-2 gap-3">
            {[
              { k: "ACCURACY", v: 99.9, s: "%", i: KeySquare },
              { k: "LATENCY", v: 24, s: "ms", i: Wifi },
              { k: "VOLTAGE", v: 5.0, s: "V", i: Zap },
              { k: "WT_RESIST", v: 68, s: " IP", i: Droplets },
            ].map((spec, i) => (
              <div key={i} className="hologram-glass p-4 rounded-xl border border-[rgba(34,211,238,0.1)] flex items-center gap-4">
                <spec.i size={18} className="text-[var(--cyan-500)] opacity-70" />
                <div>
                  <p className="font-mono text-[9px] text-[var(--text-muted)] tracking-wider mb-0.5">{spec.k}</p>
                  <p className="text-lg font-black text-white">
                    <GsapCounter value={spec.v} suffix={spec.s} duration={1.5 + (i * 0.2)} />
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        .container-app { max-width: 1440px; margin: 0 auto; px-4 md:px-8 }
        .group-hover\\:translate-z-50 {
          transform: translateZ(50px) !important;
        }
        @keyframes scan-horizontal {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
        .animate-scan-horizontal {
          animation: scan-horizontal 2s infinite ease-in-out;
        }
      `}</style>
    </article>
  );
}
