import { useRef, useCallback, useEffect, lazy, Suspense } from "react";
import gsap from "gsap";
import profileData from "@/data/profile";
import Marquee from "@/components/Marquee";

const Scene = lazy(() => import("@/components/Canvas/Scene"));

export default function Hero() {
  const mousePosition = useRef({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      mousePosition.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
      };
    },
    []
  );

  // Cinematic entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Start with black overlay
      gsap.set(overlayRef.current, { scaleY: 1 });

      const tl = gsap.timeline({ delay: 0.2 });

      // Reveal overlay wipe
      tl.to(overlayRef.current, {
        scaleY: 0,
        duration: 1.2,
        ease: "power4.inOut",
        transformOrigin: "top",
      });

      // First name — slides up from below
      tl.from(
        "[data-hero-first]",
        {
          y: "100%",
          duration: 1.2,
          ease: "power4.out",
        },
        "-=0.6"
      );

      // Last name — slides up with delay
      tl.from(
        "[data-hero-second]",
        {
          y: "100%",
          duration: 1.2,
          ease: "power4.out",
        },
        "-=0.9"
      );

      // Marquee fades in
      tl.from(
        "[data-hero-marquee]",
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );

      // Side info
      tl.from(
        "[data-hero-info] > *",
        {
          opacity: 0,
          x: -20,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.5"
      );

      // Scroll cue
      tl.from(
        "[data-hero-scroll]",
        {
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full overflow-hidden bg-black flex flex-col justify-center"
    >
      {/* Wipe overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black z-50 origin-top"
      />

      {/* WebGL Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Scene mousePosition={mousePosition} />
        </Suspense>
      </div>

      {/* Vertical side label */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
        <span className="text-vertical font-mono text-[11px] text-grey tracking-[0.5em] uppercase">
          {profileData.title} &mdash; 2026
        </span>
      </div>

      {/* Main content — Name fills the viewport */}
      <div className="relative z-10 w-full">
        {/* THE NAME — Absolutely massive */}
        <div className="section-shell">
          <h1 data-bass="heavy" className="font-display leading-[0.82] tracking-tight">
            <div className="overflow-hidden">
              <span
                data-hero-first
                data-text={profileData.name.split(" ")[0]}
                className="glitch block text-[clamp(6rem,20vw,22rem)] text-white-pure"
              >
                <span className="glitch-base">{profileData.name.split(" ")[0]}</span>
              </span>
            </div>
            <div className="overflow-hidden">
              <span
                data-hero-second
                className="block text-[clamp(6rem,20vw,22rem)] text-accent"
                style={{ WebkitTextStroke: "2px #FF6600", color: "transparent" }}
              >
                {profileData.name.split(" ")[1]}
              </span>
            </div>
          </h1>
        </div>

        {/* Ticker / Marquee — festival style */}
        <div data-hero-marquee className="mt-10 md:mt-14 border-y border-dark-light py-5">
          <Marquee speed={25}>
            {[
              "REACT",
              "TYPESCRIPT",
              "BUN",
              "ELYSIA",
              "EXPO",
              "OPENGL",
              "DOCKER",
              "POSTGRESQL",
              "GO",
              "C++",
            ].map((item) => (
              <span
                key={item}
                className="font-display text-2xl md:text-4xl text-grey flex items-center gap-6 md:gap-10"
              >
                {item}
                <span className="text-accent text-lg">&diams;</span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>

      {/* Bottom bar — info */}
      <div className="absolute inset-x-0 bottom-14 z-20">
        <div
          data-hero-info
          className="section-shell flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
        >
          <div className="flex flex-col gap-1">
            <span className="font-mono text-sm md:text-base text-white">
              {profileData.tagline}
            </span>
            <span className="font-mono text-xs text-grey">
              Based in {profileData.location}
            </span>
          </div>

          <div className="flex items-center gap-10">
            <a
              href={profileData.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-white hover:text-accent transition-colors duration-300 uppercase tracking-widest border-b-2 border-accent pb-1.5"
            >
              GitHub
            </a>
            <a
              href={`mailto:${profileData.email}`}
              className="font-mono text-sm text-white hover:text-accent transition-colors duration-300 uppercase tracking-widest border-b-2 border-accent pb-1.5"
            >
              Email
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        data-hero-scroll
        className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-3"
      >
        <div className="w-px h-12 bg-linear-to-b from-accent to-transparent" />
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 right-8 md:top-10 md:right-10 z-20 font-mono text-[10px] text-grey/40 text-right leading-relaxed hidden md:block">
        PORTFOLIO<br />N&deg;002<br />2025
      </div>
    </section>
  );
}
