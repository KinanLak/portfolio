import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import experienceData from "@/data/experience";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.from("[data-exp-word]", {
        y: "100%",
        duration: 0.8,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "[data-exp-title]",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Items stagger in
      itemRefs.current.forEach((el) => {
        if (!el) return;
        gsap.from(el, {
          y: 80,
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
      id="experience"
      ref={sectionRef}
      className="relative bg-black-light py-section-sm md:py-section overflow-hidden"
    >
      {/* Giant background number */}
      <div className="absolute -top-8 left-4 md:left-12 overflow-hidden">
        <span className="font-display text-[clamp(12rem,30vw,28rem)] text-dark leading-none select-none block">
          02
        </span>
      </div>

      <div className="relative z-10 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        {/* Section tag */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-[2px] bg-accent" />
          <span className="font-mono text-sm text-accent tracking-[0.3em] uppercase">
            Lineup
          </span>
        </div>

        {/* Title */}
        <div data-exp-title className="mb-20 md:mb-32">
          <h2 className="font-display text-[clamp(4rem,12vw,11rem)] text-white-pure leading-[0.85]">
            {"Experience".split("").map((char, i) => (
              <span key={i} className="overflow-hidden inline-block">
                <span data-exp-word className="inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              </span>
            ))}
            <span className="text-accent">.</span>
          </h2>
        </div>

        {/* Experience items — full width, stacked, brutal */}
        <div className="space-y-0">
          {experienceData.items.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => {
                if (el) itemRefs.current[i] = el;
              }}
              className="group border-t border-dark-light"
            >
              <div className="py-10 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
                {/* Left: number + period */}
                <div className="lg:col-span-3 flex items-start gap-4 lg:flex-col lg:gap-4">
                  <span className="font-display text-5xl md:text-7xl text-dark-light group-hover:text-accent/30 transition-colors duration-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span className="font-mono text-xs md:text-sm text-accent tracking-widest block">
                      {item.period}
                    </span>
                    <span className="font-mono text-xs text-grey block mt-1">
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Center: role + org */}
                <div className="lg:col-span-5">
                  <h3 className="font-display text-3xl md:text-5xl text-white-pure group-hover:text-accent transition-colors duration-300 mb-2">
                    {item.role}
                  </h3>
                  <p className="font-mono text-base md:text-lg text-grey">
                    {item.organization}
                  </p>
                </div>

                {/* Right: highlights */}
                <div className="lg:col-span-4">
                  <ul className="space-y-3">
                    {item.highlights.map((highlight, j) => (
                      <li
                        key={j}
                        className="font-mono text-sm md:text-base text-grey-light flex items-start gap-3"
                      >
                        <span className="text-accent mt-1 shrink-0 text-lg leading-none">
                          /
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
          {/* Final border */}
          <div className="border-t border-dark-light" />
        </div>
      </div>
    </section>
  );
}
