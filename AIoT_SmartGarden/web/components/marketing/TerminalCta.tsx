"use client";

import { Terminal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function TerminalCta() {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(".term-title",
      { opacity: 0, filter: "blur(10px)", letterSpacing: "0.5em" },
      { opacity: 1, filter: "blur(0px)", letterSpacing: "0.2em", duration: 1.2, ease: "expo.out" }
    )
    .fromTo(".term-subtitle",
      { opacity: 0, filter: "blur(4px)" },
      { opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "expo.out", stagger: 0.15 },
      "-=0.9"
    )
    .fromTo(".term-box",
      { opacity: 0, clipPath: "inset(50% 0 50% 0)" },
      { 
        opacity: 1, clipPath: "inset(0% 0 0% 0)", duration: 1.2, ease: "expo.out",
        onComplete: () => setRevealed(true),
        onReverseComplete: () => setRevealed(false)
      },
      "-=0.6"
    );

  }, { scope: containerRef });
  const targetCmd = "./initialize_garden.sh";
  const [cmd, setCmd] = useState("");
  const [step, setStep] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!revealed) {
      setStep(0);
      setCmd("");
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      setCmd(targetCmd.slice(0, i + 1));
      i++;
      if (i === targetCmd.length) {
        clearInterval(interval);
        setTimeout(() => setStep(1), 500);
        setTimeout(() => setStep(2), 1200);
    setTimeout(() => setStep(3), 1800);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef as any}
      className="mx-auto w-full max-w-4xl px-4 md:px-6 relative z-10"
      style={{ marginTop: "3rem", marginBottom: "8rem" }}
    >
      <div
        className="flex flex-col items-center"
      >
        {/* ── Section header ── */}
        <div className="mb-12 flex flex-col items-center justify-center text-center w-full">
          <span
            className="term-subtitle font-mono text-[10px] font-bold mb-4 px-2 py-1"
            style={{ color: "var(--text-muted)", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          >
            [ SYST_LOAD: 0x7A1E ]
          </span>
          <p
            className="term-subtitle mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em]"
            style={{ color: "var(--cyan-500)" }}
          >
            // SYSTEM_OVERRIDE
          </p>
          <h2
            className="term-title text-3xl md:text-5xl font-extrabold leading-tight uppercase text-white"
          >
            Mở khóa <br/> truy cập toàn diện
          </h2>
        </div>

        {/* Terminal panel */}
        <div
          className="term-box lux-panel overflow-hidden w-full"
        >
        {/* Terminal title bar */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{
            background: "rgba(255,255,255,0.03)",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          {/* Traffic light dots */}
          <div className="h-3 w-3 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
          <div className="h-3 w-3 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
          <div className="h-3 w-3 rounded-full" style={{ background: "var(--cyan-500)", opacity: 0.85 }} />
          <div className="ml-3 flex items-center gap-2">
            <Terminal size={12} style={{ color: "var(--cyan-400)" }} />
            <span
              className="font-mono text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              bash — root@smart-garden
            </span>
          </div>
        </div>

        {/* Terminal body */}
        <div className="p-6 font-mono text-sm md:p-8 min-h-[300px]">
          {/* Command line */}
          <div className="mb-1" style={{ color: "var(--cyan-400)" }}>
            $ {cmd}
            {cmd.length < targetCmd.length && <span className="animate-pulse">_</span>}
          </div>

          {/* Output lines */}
          <div className="mb-5 space-y-1" style={{ color: "var(--text-secondary)" }}>
            {step >= 1 && (
              <p className="animate-fade-up">
                <span style={{ color: "var(--cyan-600)" }}>[....] </span>
                Loading protocols...
              </p>
            )}
            {step >= 2 && (
              <p className="animate-fade-up">
                <span style={{ color: "var(--cyan-400)" }}>[OK]   </span>
                Core modules ready.
              </p>
            )}
            {step >= 3 && (
              <div className="animate-fade-up">
                <p style={{ color: "var(--text-secondary)", marginTop: "8px" }}>
                  Khu vực sinh thái số đã trực tuyến hoàn toàn.
                </p>
                <p style={{ color: "var(--text-secondary)" }}>
                  Nhập truy cập Root:
                </p>
              </div>
            )}
          </div>

          {/* Input row */}
          <div
            className="flex flex-col gap-3 sm:flex-row sm:items-stretch transition-all duration-700 ease-out"
            style={{
              opacity: step >= 3 ? 1 : 0,
              transform: step >= 3 ? "translateY(0)" : "translateY(15px)",
              pointerEvents: step >= 3 ? "auto" : "none",
            }}
          >
            <div
              className="flex flex-1 items-center gap-3 rounded-lg px-4 py-3 transition-colors duration-300"
              style={{
                background: "rgba(0,0,0,0.4)",
                border: "1px solid var(--border-subtle)",
              }}
              onFocusCapture={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--cyan-500)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px rgba(6,182,212,0.15)";
              }}
              onBlurCapture={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <span style={{ color: "var(--cyan-500)" }}>&gt;</span>
              <input
                type="email"
                placeholder="root@matrix.com"
                className="w-full bg-transparent text-sm focus:outline-none"
                style={{
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-mono)",
                }}
              />
            </div>

            <button
              type="button"
              className="btn-cyan flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest"
            >
              Execute
            </button>
          </div>

          {/* Bottom hint */}
          <p
            className="mt-4 text-xs transition-opacity duration-700 ease-out"
            style={{ color: "var(--text-muted)", opacity: step >= 3 ? 1 : 0 }}
          >
            // Xác thực quyền khởi tạo không gian sinh trưởng.
          </p>
        </div>
      </div>
      </div>
    </section>
  );
}
