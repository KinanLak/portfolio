import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import type { ProjectItem } from "@/types/data";

interface ProjectDetailProps {
  projects: ProjectItem[];
  selectedIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ProjectDetail({
  projects,
  selectedIndex,
  onClose,
  onNavigate,
}: ProjectDetailProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isClosing = useRef(false);
  const prevIndexRef = useRef(selectedIndex);

  const project = projects[selectedIndex];
  const total = projects.length;
  const prevIndex = selectedIndex > 0 ? selectedIndex - 1 : total - 1;
  const nextIndex = selectedIndex < total - 1 ? selectedIndex + 1 : 0;
  const prevProject = projects[prevIndex];
  const nextProject = projects[nextIndex];

  // Lock scroll on mount
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  // Entrance animation — runs once on mount
  useEffect(() => {
    if (!overlayRef.current || !wipeRef.current) return;

    const tl = gsap.timeline();

    // Overlay background fades in
    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    )
      // Orange wipe sweeps left → right
      .fromTo(
        wipeRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.5, ease: "power4.inOut" }
      )
      // Wipe exits to the right
      .to(wipeRef.current, {
        scaleX: 0,
        duration: 0.4,
        ease: "power4.in",
        onStart: () => {
          if (wipeRef.current) {
            wipeRef.current.style.transformOrigin = "right";
          }
        },
      })
      // Content elements stagger in
      .fromTo(
        "[data-detail-el]",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "power3.out",
        },
        "-=0.2"
      );

    return () => {
      tl.kill();
    };
  }, []);

  // Re-animate content on project switch
  useEffect(() => {
    if (prevIndexRef.current === selectedIndex) return;
    prevIndexRef.current = selectedIndex;

    // Scroll back to top
    if (scrollRef.current) scrollRef.current.scrollTop = 0;

    // Stagger content in
    gsap.fromTo(
      "[data-detail-el]",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.04, ease: "power3.out" }
    );
  }, [selectedIndex]);

  // Close with exit animation
  const handleClose = useCallback(() => {
    if (isClosing.current) return;
    isClosing.current = true;

    const tl = gsap.timeline({ onComplete: onClose });

    tl.to("[data-detail-el]", {
      y: -20,
      opacity: 0,
      duration: 0.2,
      stagger: 0.02,
      ease: "power2.in",
    }).to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
  }, [onClose]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") onNavigate(prevIndex);
      if (e.key === "ArrowRight") onNavigate(nextIndex);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleClose, onNavigate, prevIndex, nextIndex]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9000] bg-black cursor-none"
    >
      {/* Orange wipe transition */}
      <div
        ref={wipeRef}
        className="absolute inset-0 bg-accent pointer-events-none"
        style={{ zIndex: 50, transformOrigin: "left" }}
      />

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        className="relative h-full overflow-y-auto overflow-x-hidden"
        style={{ zIndex: 20 }}
      >
        {/* Sticky top bar */}
        <header className="sticky top-0 z-10 backdrop-blur-sm bg-black/80 border-b border-dark-light">
          <div className="section-shell flex items-center justify-between py-5">
            <div data-detail-el className="flex items-center gap-6">
              <span className="font-mono text-sm text-accent tracking-wider">
                {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </span>
              {project.featured && (
                <span className="font-mono text-[10px] border border-accent text-accent px-2 py-0.5 uppercase tracking-widest hidden md:inline">
                  Featured
                </span>
              )}
            </div>

            <div data-detail-el className="flex items-center gap-2 md:gap-4">
              <button
                onClick={() => onNavigate(prevIndex)}
                className="font-mono text-xs text-grey hover:text-accent transition-colors duration-300 px-3 py-2 border border-transparent hover:border-dark-light"
                data-cursor-hover
              >
                PREV
              </button>
              <button
                onClick={() => onNavigate(nextIndex)}
                className="font-mono text-xs text-grey hover:text-accent transition-colors duration-300 px-3 py-2 border border-transparent hover:border-dark-light"
                data-cursor-hover
              >
                NEXT
              </button>
              <button
                onClick={handleClose}
                className="font-mono text-xs text-grey hover:text-white-pure transition-colors duration-300 border border-dark-light hover:border-accent px-4 py-2 ml-2"
                data-cursor-hover
              >
                ESC
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="section-shell pt-16 md:pt-24 pb-32">
          {/* Giant background number */}
          <div
            data-detail-el
            className="font-display text-[clamp(8rem,22vw,18rem)] text-dark leading-none select-none -mb-12 md:-mb-20"
          >
            {String(selectedIndex + 1).padStart(2, "0")}
          </div>

          {/* Project name */}
          <h2
            data-detail-el
            data-bass="medium"
            className="font-display text-[clamp(3.5rem,12vw,12rem)] text-white-pure leading-[0.85] mb-6"
          >
            {project.name}
            <span className="text-accent">.</span>
          </h2>

          {/* Tagline */}
          <p
            data-detail-el
            className="font-mono text-lg md:text-xl text-accent max-w-2xl mb-12 md:mb-16"
          >
            {project.tagline}
          </p>

          {/* Divider */}
          <div
            data-detail-el
            className="w-full h-[2px] bg-dark-light mb-12 md:mb-16"
          />

          {/* Two-column content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left column — description + highlights + links */}
            <div className="lg:col-span-7 space-y-12">
              <p
                data-detail-el
                className="font-mono text-sm md:text-base text-grey-light leading-[1.85]"
              >
                {project.longDescription}
              </p>

              {/* Highlights */}
              {project.highlights.length > 0 && (
                <div data-detail-el>
                  <h3 className="font-display text-2xl text-white-pure mb-6 tracking-wide">
                    Highlights
                  </h3>
                  <ul className="space-y-4">
                    {project.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="font-mono text-sm text-grey-light flex items-start gap-4"
                      >
                        <span className="text-accent text-base leading-none mt-0.5 shrink-0">
                          /
                        </span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action links */}
              {project.links.length > 0 && (
                <div data-detail-el className="flex flex-wrap gap-4 pt-4">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-hover
                      className="group relative font-mono text-sm text-white-pure border-2 border-accent px-6 py-3 uppercase tracking-widest overflow-hidden transition-colors duration-500 hover:text-black"
                    >
                      <span className="absolute inset-0 bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                      <span className="relative">
                        {link.label}{" "}
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                          &rarr;
                        </span>
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Right column — metadata + stack + image */}
            <div className="lg:col-span-5">
              {/* Meta fields */}
              <div data-detail-el className="space-y-8 mb-12">
                {[
                  { label: "Role", value: project.role },
                  { label: "Year", value: project.year },
                ].map((field) => (
                  <div
                    key={field.label}
                    className="border-b border-dark-light pb-4"
                  >
                    <span className="font-mono text-[10px] text-grey uppercase tracking-[0.3em] block mb-2">
                      {field.label}
                    </span>
                    <span className="font-mono text-sm text-white-pure">
                      {field.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tech stack */}
              <div data-detail-el>
                <span className="font-mono text-[10px] text-grey uppercase tracking-[0.3em] block mb-4">
                  Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] px-3 py-1.5 uppercase tracking-wider font-bold text-accent bg-dark border border-accent/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Optional image */}
              {project.image && (
                <div
                  data-detail-el
                  className="mt-12 border-2 border-dark-light overflow-hidden"
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Bottom navigation — prev / next project */}
        <footer className="section-shell border-t-2 border-dark-light">
          <div className="flex items-stretch">
            <button
              onClick={() => onNavigate(prevIndex)}
              className="group flex-1 py-8 md:py-12 text-left border-r border-dark-light pr-8 transition-colors duration-300 hover:bg-dark/50"
              data-cursor-hover
            >
              <span className="font-mono text-[10px] text-grey uppercase tracking-[0.3em] block mb-2 group-hover:text-accent transition-colors duration-300">
                Previous
              </span>
              <span className="font-display text-2xl md:text-4xl text-white-pure group-hover:text-accent transition-colors duration-300">
                &larr; {prevProject.name}
              </span>
            </button>
            <button
              onClick={() => onNavigate(nextIndex)}
              className="group flex-1 py-8 md:py-12 text-right pl-8 transition-colors duration-300 hover:bg-dark/50"
              data-cursor-hover
            >
              <span className="font-mono text-[10px] text-grey uppercase tracking-[0.3em] block mb-2 group-hover:text-accent transition-colors duration-300">
                Next
              </span>
              <span className="font-display text-2xl md:text-4xl text-white-pure group-hover:text-accent transition-colors duration-300">
                {nextProject.name} &rarr;
              </span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
