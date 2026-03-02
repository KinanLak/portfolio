import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projectsData from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          y: 100,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.12,
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
      className="relative min-h-screen bg-black-light py-section-sm md:py-section px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-[10px] text-grey tracking-[0.3em] uppercase">
            04
          </span>
          <div className="h-px bg-accent flex-grow max-w-32" />
          <span className="font-mono text-[10px] text-grey tracking-[0.3em] uppercase">
            Headliners
          </span>
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="font-display text-[clamp(3rem,10vw,8rem)] text-white-pure leading-[0.85] mb-16"
        >
          Projects
          <span className="text-accent">.</span>
        </h2>

        {/* Project list — editorial layout */}
        <div className="space-y-2">
          {projectsData.items.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => {
                if (el) cardRefs.current[i] = el;
              }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className={`group relative border-t border-dark-light py-8 md:py-10 px-4 md:px-8 transition-all duration-500 cursor-pointer ${
                hoveredProject === project.id
                  ? "bg-dark"
                  : hoveredProject !== null
                    ? "opacity-30"
                    : ""
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left: project name */}
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-4xl md:text-6xl text-white-pure group-hover:text-accent transition-colors duration-300">
                    {project.name}
                  </h3>
                  {project.featured && (
                    <span className="font-mono text-[10px] text-accent border border-accent px-2 py-0.5 uppercase tracking-widest hidden md:inline">
                      Featured
                    </span>
                  )}
                </div>

                {/* Right: tagline */}
                <p className="font-mono text-sm text-grey max-w-sm md:text-right">
                  {project.tagline}
                </p>
              </div>

              {/* Expanded content on hover */}
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  hoveredProject === project.id
                    ? "max-h-40 mt-6 opacity-100"
                    : "max-h-0 mt-0 opacity-0"
                }`}
              >
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <p className="font-mono text-xs text-grey-light max-w-lg leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] text-accent bg-black px-3 py-1 border border-accent/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover line */}
              <div className="absolute bottom-0 left-0 w-full h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </div>
          ))}

          {/* Last border */}
          <div className="border-t border-dark-light" />
        </div>
      </div>
    </section>
  );
}
