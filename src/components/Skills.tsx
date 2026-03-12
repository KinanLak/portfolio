import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import skillsData from "@/data/skills";
import Marquee from "@/components/Marquee";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [expandedStage, setExpandedStage] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-skills-word]", {
        y: "100%",
        duration: 0.8,
        stagger: 0.06,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "[data-skills-title]",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      cardRefs.current.forEach((el) => {
        if (!el) return;
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // All techs for the marquee
  const allTechs = skillsData.stages.flatMap((s) => s.technologies);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative bg-black py-section-sm md:py-section overflow-hidden"
    >
      {/* Giant background number */}
      <div className="absolute -top-8 right-6 md:right-16 overflow-hidden">
        <span className="font-display text-[clamp(12rem,30vw,28rem)] text-dark leading-none select-none block">
          03
        </span>
      </div>

      {/* Tech marquee — top, like a festival wristband */}
      <div className="border-y-2 border-accent py-5 mb-content-sm md:mb-content">
        <Marquee speed={15}>
          {allTechs.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="font-display text-3xl md:text-5xl text-accent flex items-center gap-6 md:gap-10"
            >
              {tech}
              <span className="text-white-pure text-xl">&times;</span>
            </span>
          ))}
        </Marquee>
      </div>

      <div className="section-shell relative z-10">
        {/* Section tag */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-[2px] bg-accent" />
          <span className="font-mono text-sm text-accent tracking-[0.3em] uppercase">
            Stages
          </span>
        </div>

        {/* Title */}
        <div data-skills-title className="mb-24 md:mb-32">
          <h2 className="font-display text-[clamp(4rem,12vw,11rem)] text-white-pure leading-[0.85]">
            {"Skills".split("").map((char, i) => (
              <span key={i} className="overflow-hidden inline-block">
                <span data-skills-word className="inline-block">
                  {char}
                </span>
              </span>
            ))}
            <span className="text-accent">.</span>
          </h2>
        </div>

        {/* Stage list — accordion style, full width */}
        <div className="space-y-0">
          {skillsData.stages.map((stage, i) => {
            const isExpanded = expandedStage === stage.id;
            return (
              <div
                key={stage.id}
                ref={(el) => {
                  if (el) cardRefs.current[i] = el;
                }}
                onClick={() =>
                  setExpandedStage(isExpanded ? null : stage.id)
                }
                className="group border-t border-dark-light cursor-pointer"
              >
                {/* Header row */}
                <div className="py-8 md:py-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-5 md:gap-10">
                    <span className="font-mono text-xs text-grey w-8 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className={`font-display text-3xl md:text-5xl transition-colors duration-300 ${
                        isExpanded ? "text-accent" : "text-white-pure group-hover:text-accent"
                      }`}
                    >
                      {stage.category}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 ml-12 md:ml-0">
                    <span className="font-mono text-xs md:text-sm text-grey uppercase tracking-widest">
                      {stage.name}
                    </span>
                    <span
                      className={`font-display text-2xl text-accent transition-transform duration-500 ${
                        isExpanded ? "rotate-45" : "rotate-0"
                      }`}
                    >
                      +
                    </span>
                  </div>
                </div>

                {/* Expandable content */}
                <div
                  className={`overflow-hidden transition-all duration-700 ease-out ${
                    isExpanded ? "max-h-80 pb-10" : "max-h-0"
                  }`}
                >
                  <div className="pl-14 md:pl-20 grid grid-cols-1 md:grid-cols-2 gap-10">
                    <p className="font-mono text-base md:text-lg text-grey-light leading-relaxed">
                      {stage.description}
                    </p>
                    <div className="flex flex-wrap gap-3.5">
                      {stage.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-sm text-black bg-accent px-5 py-2.5 uppercase tracking-wider font-bold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="border-t border-dark-light" />
        </div>
      </div>

      {/* Bottom marquee — reverse direction */}
      <div className="border-y-2 border-accent py-5 mt-content-sm md:mt-content">
        <Marquee reverse speed={18}>
          {allTechs.map((tech, i) => (
            <span
              key={`rev-${tech}-${i}`}
              className="font-display text-3xl md:text-5xl text-accent/30 flex items-center gap-6 md:gap-10"
            >
              {tech}
              <span className="text-white-pure/20 text-xl">&times;</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
