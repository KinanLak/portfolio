import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import skillsData from "@/data/skills";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [activeStage, setActiveStage] = useState<string | null>(null);

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
          y: 80,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.08,
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
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen bg-black py-section-sm md:py-section px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-[10px] text-grey tracking-[0.3em] uppercase">
            03
          </span>
          <div className="h-px bg-accent flex-grow max-w-32" />
          <span className="font-mono text-[10px] text-grey tracking-[0.3em] uppercase">
            Stages
          </span>
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="font-display text-[clamp(3rem,10vw,8rem)] text-white-pure leading-[0.85] mb-16"
        >
          Skills
          <span className="text-accent">.</span>
        </h2>

        {/* Stage grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillsData.stages.map((stage, i) => (
            <div
              key={stage.id}
              ref={(el) => {
                if (el) cardRefs.current[i] = el;
              }}
              onMouseEnter={() => setActiveStage(stage.id)}
              onMouseLeave={() => setActiveStage(null)}
              className={`group relative bg-dark border p-6 transition-all duration-500 cursor-crosshair ${
                activeStage === stage.id
                  ? "border-accent bg-dark-light"
                  : activeStage === null
                    ? "border-dark-light hover:border-accent/30"
                    : "border-dark-light opacity-40"
              }`}
            >
              {/* Stage name (festival style) */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-lg text-accent">
                  {stage.name}
                </span>
                <span className="font-mono text-[10px] text-grey">
                  [{String(i + 1).padStart(2, "0")}]
                </span>
              </div>

              {/* Category */}
              <h3 className="font-display text-2xl text-white-pure mb-3 group-hover:text-accent transition-colors duration-300">
                {stage.category}
              </h3>

              {/* Description */}
              <p className="font-mono text-xs text-grey mb-4 leading-relaxed">
                {stage.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2">
                {stage.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] text-grey-light bg-black px-2 py-1 border border-dark-light group-hover:border-accent/20 transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-0 w-full h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
