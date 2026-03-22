"use client";

import { useEffect, useRef, useId } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type HomeHeroProps = {
  isLoaded?: boolean;
  shouldPlayVideo?: boolean;
};

export default function HomeHero({ isLoaded = false, shouldPlayVideo = true }: HomeHeroProps) {
  const filterId = useId().replace(/:/g, "");
  const heroRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const plexusRef = useRef<HTMLDivElement | null>(null);
  const plexusGlowRef = useRef<HTMLDivElement | null>(null);
  const titleWrapRef = useRef<HTMLHeadingElement | null>(null);
  const sloganRef = useRef<HTMLParagraphElement | null>(null);
  const ecoRef = useRef<SVGTextElement | null>(null);
  const techRef = useRef<SVGTextElement | null>(null);
  const svgTitleRef = useRef<SVGSVGElement | null>(null);
  const introIncludedVideoFadeRef = useRef(false);
  const shouldPlayVideoRef = useRef(shouldPlayVideo);
  shouldPlayVideoRef.current = shouldPlayVideo;

  useGSAP(
    () => {
      const hero = heroRef.current;
      if (!hero) return;

      /** isLoaded false: ép Hero đen tuyền (ẩn), không chạy intro */
      if (!isLoaded) {
        gsap.set(hero, { visibility: "hidden", opacity: 0 });
        return;
      }

      const video = videoRef.current;
      const plexus = plexusRef.current;
      const plexusGlow = plexusGlowRef.current;
      const titleWrap = titleWrapRef.current;
      const slogan = sloganRef.current;
      const eco = ecoRef.current;
      const tech = techRef.current;
      const svgTitle = svgTitleRef.current;
      if (
        !video ||
        !plexus ||
        !plexusGlow ||
        !titleWrap ||
        !slogan ||
        !eco ||
        !tech ||
        !svgTitle
      ) {
        return;
      }

      document.body.style.overflow = "hidden";

      /** Hero hiện ngay (nền đen); title ẩn cho đến 0.5s */
      gsap.set(hero, { visibility: "visible", opacity: 1 });

      gsap.set(video, {
        opacity: 0,
        visibility: "hidden",
        autoAlpha: 0,
        scale: 1.06,
        filter: "blur(8px)",
        transformOrigin: "center center",
      });
      gsap.set(slogan, { opacity: 0, visibility: "hidden", y: 20 });
      gsap.set(titleWrap, { opacity: 0, visibility: "hidden" });
      gsap.set(plexus, { opacity: 0, scale: 1, transformOrigin: "center center" });
      gsap.set(plexusGlow, { opacity: 0 });

      /** Layer 2 (TECH): Setup stroke - initially hidden but stroke prepared */
      gsap.set(tech, {
        visibility: "visible",
        strokeDasharray: 2000,
        strokeDashoffset: 2000,
      });

      /** Layer 1 (ECO): initially 0 opacity, translated slightly UP */
      gsap.set(eco, {
        opacity: 0,
        y: -10,
      });

      const tl = gsap.timeline({ paused: true });

      /** 0.5s: màn đen đã hiện; hiện vùng title để vẽ */
      tl.set(titleWrap, { autoAlpha: 1 }, 0.5);

      /** Phase 1: 0.6s - bắt đầu vẽ viền TECH (2.5s) */
      tl.to(
        tech,
        {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: "power2.inOut",
        },
        0.6
      );

      /** Phase 2: Ngay khi vẽ xong viền (0.6 + 2.5 = 3.1s) - Converge ECO */
      tl.to(
        eco,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        3.1
      );

      /** Phase 3: Slogan hiện lên sau khi ECO rõ nét (bắt đầu sau 3.9s) */
      tl.to(
        slogan,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          ease: "power2.out",
        },
        3.9
      );

      /** 3.5s: Video Background mờ dần hiện ra; scroll mở sau khi video đã hiện */
      const playVideo = shouldPlayVideoRef.current;
      const unlockScroll = () => {
        document.body.style.overflow = "auto";
      };

      if (playVideo) {
        introIncludedVideoFadeRef.current = true;
        tl.to(
          video,
          {
            autoAlpha: 0.4,
            filter: "blur(2px)",
            scale: 1.02,
            duration: 1.15,
            ease: "sine.out",
            onComplete: unlockScroll,
          },
          4.5
        );
        tl.to(
          plexus,
          {
            opacity: 0.22,
            scale: 1.2,
            duration: 1.05,
            ease: "sine.out",
          },
          4.5
        );
        tl.to(
          plexusGlow,
          {
            opacity: 0.45,
            duration: 0.9,
            ease: "sine.out",
          },
          4.62
        );
      } else {
        tl.to(
          plexus,
          {
            opacity: 0.22,
            scale: 1.2,
            duration: 1.05,
            ease: "sine.out",
            onComplete: unlockScroll,
          },
          4.5
        );
        tl.to(
          plexusGlow,
          {
            opacity: 0.45,
            duration: 0.9,
            ease: "sine.out",
          },
          4.62
        );
      }

      tl.play();

      return () => {
        document.body.style.overflow = "";
        tl.kill();
      };
    },
    { dependencies: [isLoaded], scope: heroRef, revertOnUpdate: true }
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!shouldPlayVideo || !video || introIncludedVideoFadeRef.current) return;

    gsap.to(video, {
      autoAlpha: 0.4,
      filter: "blur(2px)",
      scale: 1.02,
      duration: 1.2,
      ease: "sine.out",
    });
    introIncludedVideoFadeRef.current = true;
  }, [shouldPlayVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldPlayVideo) {
      void video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [shouldPlayVideo]);

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden bg-[#000000]"
      style={{ minHeight: "100dvh" }}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover will-change-transform"
        style={{
          opacity: 0,
          visibility: "hidden",
          willChange: "transform, opacity, filter",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,1) 36%, rgba(0,0,0,0.28) 72%, rgba(0,0,0,0.06) 92%)",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,1) 36%, rgba(0,0,0,0.28) 72%, rgba(0,0,0,0.06) 92%)",
        }}
      >
        <source src="/videos/video_plant.mp4" type="video/mp4" />
      </video>

      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0, 0, 0, 0) 38%, rgba(0,0,0,0.42) 72%, rgba(0,0,0,0.78) 100%)",
        }}
      />

      <div
        ref={plexusRef}
        className="absolute inset-0 z-20 overflow-hidden"
        style={{
          opacity: 0,
          willChange: "transform, opacity",
          background:
            "radial-gradient(circle at 50% 42%, rgba(80, 112, 255, 0.18) 0%, rgba(31, 41, 84, 0.12) 26%, rgba(5, 7, 16, 0.93) 64%, rgba(4, 5, 11, 0.98) 100%)",
        }}
      >
        <svg
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full opacity-80"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id={`nodeGlow-${filterId}`} cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="rgba(120,208,255,0.98)" />
              <stop offset="100%" stopColor="rgba(120,208,255,0.06)" />
            </radialGradient>
          </defs>
          <g stroke="rgba(118,196,255,0.22)" strokeWidth="1.2">
            <line x1="160" y1="210" x2="370" y2="190" />
            <line x1="370" y1="190" x2="580" y2="250" />
            <line x1="580" y1="250" x2="760" y2="170" />
            <line x1="760" y1="170" x2="980" y2="240" />
            <line x1="250" y1="420" x2="430" y2="360" />
            <line x1="430" y1="360" x2="620" y2="420" />
            <line x1="620" y1="420" x2="820" y2="360" />
            <line x1="820" y1="360" x2="980" y2="470" />
            <line x1="370" y1="190" x2="430" y2="360" />
            <line x1="580" y1="250" x2="620" y2="420" />
            <line x1="760" y1="170" x2="820" y2="360" />
            <line x1="250" y1="420" x2="160" y2="210" />
          </g>
          <g fill={`url(#nodeGlow-${filterId})`}>
            <circle cx="160" cy="210" r="4.4" />
            <circle cx="370" cy="190" r="4.8" />
            <circle cx="580" cy="250" r="5.1" />
            <circle cx="760" cy="170" r="4.6" />
            <circle cx="980" cy="240" r="4.4" />
            <circle cx="250" cy="420" r="5.2" />
            <circle cx="430" cy="360" r="4.9" />
            <circle cx="620" cy="420" r="5.1" />
            <circle cx="820" cy="360" r="4.7" />
            <circle cx="980" cy="470" r="4.1" />
          </g>
        </svg>
      </div>

      <div
        ref={plexusGlowRef}
        className="absolute inset-0 z-20"
        style={{
          opacity: 0,
          willChange: "opacity",
          background:
            "radial-gradient(circle at 50% 45%, rgba(137, 203, 255, 0.18) 0%, rgba(67, 88, 172, 0.12) 22%, rgba(3, 5, 12, 0) 58%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-[45] flex flex-col items-center justify-center px-6 text-center">
        <h1
          ref={titleWrapRef}
          className="m-0 flex w-full max-w-5xl justify-center"
          style={{
            opacity: 0,
            visibility: "hidden",
          }}
        >
          <svg
            ref={svgTitleRef}
            viewBox="0 0 800 300"
            className="mx-auto h-auto w-full max-w-4xl overflow-visible"
            role="img"
            aria-label="ECO-TECH"
            preserveAspectRatio="xMidYMid meet"
          >
            <title>ECO-TECH</title>
            
            {/* Lớp 2 (TECH - Outline Trắng, Nằm dưới đàng hoàng, không chồng) */}
            <text
              ref={techRef}
              x="400"
              y="210"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5px"
              style={{
                visibility: "hidden",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                fontFamily: "ui-sans-serif, system-ui, sans-serif",
                fontSize: 120,
                fontWeight: 900,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              TECH
            </text>

            {/* Lớp 1 (ECO - Solid White, Nằm đúng bên trên, trơn tru tinh giản) */}
            <text
              ref={ecoRef}
              x="400"
              y="90"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#ffffff"
              opacity={0}
              style={{
                stroke: "none",
                fontFamily: "ui-sans-serif, system-ui, sans-serif",
                fontSize: 120,
                fontWeight: 900,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              ECO
            </text>
          </svg>
        </h1>

        <p
          ref={sloganRef}
          className="mt-6 max-w-3xl text-sm font-medium uppercase tracking-[0.2em] text-zinc-100/90 md:text-base"
          style={{
            opacity: 0,
            visibility: "hidden",
            transform: "translateY(18px)",
            willChange: "transform, opacity",
          }}
        >
          Where Nature Meets Intelligent Automation
        </p>
      </div>

      <div
        className="absolute inset-0 z-40"
        style={{
          background:
            "linear-gradient(to bottom, rgba(3,4,9,0.38) 0%, rgba(4,5,11,0.18) 40%, rgba(4,5,11,0.72) 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 z-40 h-44"
        style={{
          background: "linear-gradient(to top, rgba(4,5,11,0.88), rgba(4,5,11,0))",
        }}
      />
    </section>
  );
}
