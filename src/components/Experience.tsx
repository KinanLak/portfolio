import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import experienceData from "@/data/experience";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

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

      // Animate the vertical timeline line
      gsap.from(lineRef.current, {
        scaleY: 0,
        duration: 1.5,
        ease: "power4.out",
        transformOrigin: "top",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          x: i % 2 === 0 ? -80 : 80,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen bg-black-light py-section-sm md:py-section px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-[10px] text-grey tracking-[0.3em] uppercase">
            02
          </span>
          <div className="h-px bg-accent flex-grow max-w-32" />
          <span className="font-mono text-[10px] text-grey tracking-[0.3em] uppercase">
            Lineup
          </span>
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="font-display text-[clamp(3rem,10vw,8rem)] text-white-pure leading-[0.85] mb-16"
        >
          Experience
          <span className="text-accent">.</span>
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/50 to-transparent md:-translate-x-1/2"
          />

          <div className="space-y-12 md:space-y-16">
            {experienceData.items.map((item, i) => (
              <div
                key={item.id}
                ref={(el) => {
                  if (el) itemRefs.current[i] = el;
                }}
                className={`relative flex flex-col md:flex-row ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-start md:items-center gap-6 md:gap-0`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-accent rounded-full -translate-x-[5px] md:-translate-x-1/2 z-10 shadow-[0_0_12px_rgba(255,102,0,0.5)]" />

                {/* Period label */}
                <div
                  className={`md:w-1/2 ${
                    i % 2 === 0
                      ? "md:pr-12 md:text-right"
                      : "md:pl-12 md:text-left"
                  } pl-8 md:pl-0`}
                >
                  <span className="font-mono text-xs text-accent tracking-widest uppercase">
                    {item.period}
                  </span>
                  <span className="font-mono text-xs text-grey ml-2">
                    — {item.location}
                  </span>
                </div>

                {/* Content card */}
                <div
                  className={`md:w-1/2 ${
                    i % 2 === 0 ? "md:pl-12" : "md:pr-12"
                  } pl-8 md:pl-0 ${i % 2 !== 0 ? "" : "md:!pl-12"}`}
                >
                  <div className="bg-dark border border-dark-light p-6 hover:border-accent/30 transition-colors duration-500 group">
                    <h3 className="font-display text-2xl text-white-pure group-hover:text-accent transition-colors duration-300">
                      {item.role}
                    </h3>
                    <p className="font-mono text-sm text-grey mt-1">
                      {item.organization}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {item.highlights.map((highlight, j) => (
                        <li
                          key={j}
                          className="font-mono text-xs text-grey-light flex items-start gap-2"
                        >
                          <span className="text-accent mt-1 shrink-0">
                            &gt;
                          </span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
