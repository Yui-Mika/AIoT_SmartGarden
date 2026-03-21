"use client";

import { useLayoutEffect, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type HomeHeroProps = {
  shouldPlayVideo?: boolean;
};

export default function HomeHero({ shouldPlayVideo = true }: HomeHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const sloganRef = useRef<HTMLParagraphElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useLayoutEffect(() => {
    if (!isLoaded) return;

    gsap.registerPlugin(ScrollTrigger);

    const hero = heroRef.current;
    const video = videoRef.current;
    const overlay = overlayRef.current;
    const title = titleRef.current;
    const slogan = sloganRef.current;
    const indicator = indicatorRef.current;
    if (!hero || !video || !overlay || !title || !slogan) return;

    const ctx = gsap.context(() => {
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();

      gsap.set(video, { scale: 1, transformOrigin: "center center" });
      gsap.set(overlay, { opacity: 0.3 });
      gsap.set(title, { autoAlpha: 0, visibility: "hidden", y: 40, filter: "blur(20px)" });
      gsap.set(slogan, { autoAlpha: 0, visibility: "hidden", y: 40, filter: "blur(20px)" });

      let step = 0;
      let isAnimating = false;
      let isReleased = false;
      let wheelObserver: { enable: () => void; disable: () => void } | null = null;

      const mediaTl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out", duration: 1 },
        onStart: () => {
          isAnimating = true;
        },
        onComplete: () => {
          isAnimating = false;
          step = 1;
        },
        onReverseComplete: () => {
          isAnimating = false;
          step = 0;
        },
      });

      mediaTl
        .to(video, { scale: 1.2 }, 0)
        .to(overlay, { opacity: 0.9 }, 0)
        .to(indicator, { autoAlpha: 0, duration: 0.3 }, 0);

      const textTl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out", duration: 1.2 },
        onStart: () => {
          isAnimating = true;
        },
        onComplete: () => {
          isAnimating = false;
          step = 2;
          isReleased = true;
          wheelObserver?.disable();
          window.requestAnimationFrame(() => {
            window.scrollTo({ top: pinST.end + 2, behavior: "smooth" });
          });
        },
        onReverseComplete: () => {
          isAnimating = false;
          step = 1;
          isReleased = false;
        },
      });

      textTl
        .to(title, { autoAlpha: 1, visibility: "visible", y: 0, filter: "blur(0px)" }, 0)
        .to(slogan, { autoAlpha: 1, visibility: "visible", y: 0, filter: "blur(0px)" }, 0.25);

      const pinST = ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "+=140%",
        pin: true,
        anticipatePin: 1,
        scrub: false,
        onEnter: () => {
          if (!isReleased) wheelObserver?.enable();
        },
        onEnterBack: () => {
          wheelObserver?.enable();
        },
        onLeave: () => {
          wheelObserver?.disable();
        },
        onLeaveBack: () => {
          wheelObserver?.disable();
        },
      });

      wheelObserver = ScrollTrigger.observe({
        target: window,
        type: "wheel,touch,scroll",
        tolerance: 8,
        preventDefault: true,
        onDown: () => {
          if (!pinST.isActive || isAnimating) return;
          if (step === 0) {
            mediaTl.play();
            return;
          }
          if (step === 1) {
            textTl.play();
          }
        },
        onUp: () => {
          if (!pinST.isActive || isAnimating) return;
          if (step === 2) {
            wheelObserver?.enable();
            textTl.reverse();
            return;
          }
          if (step === 1) {
            mediaTl.reverse();
          }
        },
      });

      wheelObserver.disable();

      // Ensure first wheel works immediately when hero starts pinned at top.
      if (pinST.isActive && !isReleased) {
        wheelObserver.enable();
      }
    }, hero);

    return () => {
      ctx.revert();
    };
  }, [isLoaded]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldPlayVideo) {
      void video.play().catch(() => {
        // Silent catch: autoplay can still be blocked in some browsers.
      });
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [shouldPlayVideo]);

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        style={{ willChange: "transform, opacity, filter" }}
      >
        <source src="/videos/video_plant.mp4" type="video/mp4" />
      </video>

      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          opacity: 0.3,
          willChange: "opacity, transform, filter",
          background: "linear-gradient(to bottom, rgba(9,9,11,0.50), rgba(9,9,11,0.78), #09090B)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
      >
        <h1
          ref={titleRef}
          className="text-6xl font-black uppercase tracking-[0.28em] text-white md:text-7xl lg:text-8xl"
          style={{ opacity: 0, visibility: "hidden", transform: "translateY(30px)", filter: "blur(15px)", willChange: "transform, opacity, filter" }}
        >
          ECO-TECH
        </h1>

        <p
          ref={sloganRef}
          className="mt-6 max-w-3xl text-sm font-medium uppercase tracking-[0.2em] text-zinc-200 md:text-base"
          style={{ opacity: 0, visibility: "hidden", transform: "translateY(30px)", filter: "blur(15px)", willChange: "transform, opacity, filter" }}
        >
          Where Nature Meets Intelligent Automation
        </p>
      </div>

      <div ref={indicatorRef} className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2">
        <div
          className="h-14 w-px animate-pulse"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(16,185,129,0.6), transparent)",
          }}
        />
      </div>
    </section>
  );
}
