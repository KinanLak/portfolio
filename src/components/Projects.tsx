import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projectsData from "@/data/projects";
import ProjectDetail from "@/components/ProjectDetail";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-proj-word]", {
        y: "100%",
        duration: 0.8,
        stagger: 0.06,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "[data-proj-title]",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      cardRefs.current.forEach((el) => {
        if (!el) return;
        gsap.from(el, {
          y: 100,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-black-light py-section-sm md:py-section overflow-hidden"
    >
      {/* Giant background number */}
      <div className="absolute -top-8 left-6 md:left-16 overflow-hidden">
        <span className="font-display text-[clamp(12rem,30vw,28rem)] text-dark leading-none select-none block">
          04
        </span>
      </div>

      <div className="section-shell relative z-10">
        {/* Section tag */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-[2px] bg-accent" />
          <span className="font-mono text-sm text-accent tracking-[0.3em] uppercase">
            Headliners
          </span>
        </div>

        {/* Title + count */}
        <div data-proj-title className="mb-24 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 data-bass="medium" className="font-display text-[clamp(4rem,12vw,11rem)] text-white-pure leading-[0.85]">
            {"Projects".split("").map((char, i) => (
              <span key={i} className="overflow-hidden inline-block">
                <span data-proj-word className="inline-block">
                  {char}
                </span>
              </span>
            ))}
            <span className="text-accent">.</span>
          </h2>
          <span className="font-display text-6xl md:text-8xl text-accent mb-2">
            ({String(projectsData.items.length).padStart(2, "0")})
          </span>
        </div>

        {/* Project cards — full-width dramatic hover */}
        <div className="space-y-0">
          {projectsData.items.map((project, i) => {
            const isHovered = hoveredProject === project.id;
            const somethingElseHovered =
              hoveredProject !== null && !isHovered;

            return (
              <div
                key={project.id}
                ref={(el) => {
                  if (el) cardRefs.current[i] = el;
                }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => setSelectedIndex(i)}
                className={`group relative border-t-2 border-dark-light cursor-pointer transition-all duration-700 ${
                  somethingElseHovered ? "opacity-20" : "opacity-100"
                }`}
              >
                {/* Accent background fill on hover */}
                <div
                  className={`absolute inset-0 bg-accent transition-transform duration-700 origin-left ${
                    isHovered ? "scale-x-100" : "scale-x-0"
                  }`}
                />

                <div className="relative py-12 md:py-20 px-4 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                  {/* Left: number + name */}
                  <div className="flex items-baseline gap-5 md:gap-10">
                    <span
                      className={`font-mono text-sm transition-colors duration-500 ${
                        isHovered ? "text-black" : "text-accent"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      data-bass="light"
                      className={`font-display text-5xl md:text-7xl lg:text-8xl transition-colors duration-500 ${
                        isHovered ? "text-black" : "text-white-pure"
                      }`}
                    >
                      {project.name}
                    </h3>
                    {project.featured && (
                      <span
                        className={`font-mono text-[10px] border px-2 py-1 uppercase tracking-widest transition-colors duration-500 hidden md:inline ${
                          isHovered
                            ? "text-black border-black"
                            : "text-accent border-accent"
                        }`}
                      >
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Right: tagline */}
                  <p
                    className={`font-mono text-sm md:text-base max-w-md md:text-right transition-colors duration-500 ${
                      isHovered ? "text-black/70" : "text-grey"
                    }`}
                  >
                    {project.tagline}
                  </p>
                </div>

                {/* Expanded description */}
                <div
                  className={`relative overflow-hidden transition-all duration-700 ${
                    isHovered ? "max-h-48 pb-12" : "max-h-0"
                  }`}
                >
                  <div className="px-6 md:px-12 flex flex-col md:flex-row justify-between gap-8">
                    <p
                      className={`font-mono text-sm md:text-base max-w-2xl leading-relaxed transition-colors duration-500 ${
                        isHovered ? "text-black/80" : "text-grey-light"
                      }`}
                    >
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-3 md:justify-end">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`font-mono text-xs px-4 py-1.5 uppercase tracking-wider font-bold transition-colors duration-500 ${
                            isHovered
                              ? "text-accent bg-black"
                              : "text-accent bg-dark border border-accent/20"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="border-t-2 border-dark-light" />
        </div>
      </div>

      {/* Project detail takeover — rendered via portal to escape stacking contexts */}
      {selectedIndex !== null &&
        createPortal(
          <ProjectDetail
            projects={projectsData.items}
            selectedIndex={selectedIndex}
            onClose={() => setSelectedIndex(null)}
            onNavigate={setSelectedIndex}
          />,
          document.body
        )}
    </section>
  );
}
