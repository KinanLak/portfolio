import { useRef, useCallback, useEffect, lazy, Suspense } from "react";
import gsap from "gsap";
import profileData from "@/data/profile";

const Scene = lazy(() => import("@/components/Canvas/Scene"));

export default function Hero() {
  const mousePosition = useRef({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

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

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Label line
      tl.from("[data-hero-label]", {
        width: 0,
        opacity: 0,
        duration: 0.8,
        ease: "power4.out",
      });

      // Title first line
      tl.from(
        "[data-hero-first]",
        {
          y: 120,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
        },
        "-=0.4"
      );

      // Title second line (accent)
      tl.from(
        "[data-hero-second]",
        {
          y: 120,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
        },
        "-=0.7"
      );

      // Subtitle area
      tl.from(
        "[data-hero-subtitle]",
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      );

      // Links
      tl.from(
        "[data-hero-links]",
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      );

      // Scroll indicator
      tl.from(
        scrollIndicatorRef.current,
        {
          opacity: 0,
          y: -10,
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
      className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center"
    >
      {/* WebGL Particle Background — lazy loaded */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Scene mousePosition={mousePosition} />
        </Suspense>
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 px-6 md:px-12 w-full max-w-7xl">
        {/* Top line */}
        <div className="flex items-center gap-3 mb-6 overflow-hidden">
          <div data-hero-label className="w-12 h-px bg-accent" />
          <span data-hero-label className="font-mono text-xs text-grey-light tracking-widest uppercase">
            Portfolio 2025
          </span>
        </div>

        {/* Main title — massive condensed */}
        <h1 className="font-display text-[clamp(4rem,15vw,14rem)] leading-[0.85] text-white-pure tracking-tight overflow-hidden">
          <span data-hero-first className="block">
            {profileData.name.split(" ")[0]}
          </span>
          <span data-hero-second className="block text-accent">
            {profileData.name.split(" ")[1]}
          </span>
        </h1>

        {/* Subtitle */}
        <div data-hero-subtitle className="mt-8 flex items-start gap-6">
          <div className="w-px h-16 bg-accent hidden md:block" />
          <div>
            <p className="font-mono text-lg md:text-xl text-grey-light">
              {profileData.title}
            </p>
            <p className="font-mono text-sm text-grey mt-2 max-w-md">
              {profileData.tagline}
            </p>
          </div>
        </div>

        {/* Bottom links */}
        <div data-hero-links className="mt-12 flex items-center gap-6">
          <a
            href={profileData.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-grey-light hover:text-accent transition-colors duration-300 tracking-widest uppercase border-b border-grey/30 pb-1 hover:border-accent"
          >
            GitHub
          </a>
          <a
            href={`mailto:${profileData.email}`}
            className="font-mono text-xs text-grey-light hover:text-accent transition-colors duration-300 tracking-widest uppercase border-b border-grey/30 pb-1 hover:border-accent"
          >
            Contact
          </a>
          <span className="font-mono text-xs text-grey/50">
            {profileData.location}
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="font-mono text-[10px] text-grey tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-accent to-transparent animate-pulse" />
      </div>

      {/* Decorative lines */}
      <div className="absolute top-0 right-12 w-px h-full bg-gradient-to-b from-transparent via-dark-light to-transparent z-0" />
      <div className="absolute top-0 right-24 w-px h-full bg-gradient-to-b from-transparent via-dark-light/50 to-transparent z-0 hidden md:block" />
    </section>
  );
}
