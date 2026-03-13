import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import educationData from "@/data/education";


gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Giant background number
      gsap.from("[data-edu-num]", {
        y: 200,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Title words stagger
      gsap.from("[data-edu-word]", {
        y: "100%",
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "[data-edu-title]",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Timeline cards stagger in
      gsap.from("[data-edu-card]", {
        x: -80,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-edu-timeline]",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative bg-black py-section-sm md:py-section overflow-hidden"
    >
      {/* Giant section number */}
      <div className="absolute -top-8 right-6 md:right-16 overflow-hidden">
        <span
          data-edu-num
          className="font-display text-[clamp(12rem,30vw,28rem)] text-dark leading-none select-none block"
        >
          05
        </span>
      </div>

      <div className="section-shell relative z-10">
        {/* Section tag */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-0.5 bg-accent" />
          <span className="font-mono text-sm text-accent tracking-[0.3em] uppercase">
            Origins
          </span>
        </div>

        {/* Title — massive broken words */}
        <div data-edu-title className="mb-20 md:mb-28">
          <h2 data-bass="medium" className="font-display text-[clamp(4rem,12vw,11rem)] text-white-pure leading-[0.85]">
            {"Education".split("").map((char, i) => (
              <span key={i} className="overflow-hidden inline-block">
                <span data-edu-word className="inline-block">
                  {char}
                </span>
              </span>
            ))}
            <span className="text-accent">.</span>
          </h2>
        </div>

        {/* Timeline — stacked brutal cards */}
        <div data-edu-timeline className="space-y-0">
          {educationData.items.map((item, i) => (
            <div
              key={item.id}
              data-edu-card
              className="group relative border-t border-dark-light first:border-t-0"
            >
              {/* Card inner */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-12 md:py-20 px-2 md:px-6 transition-colors duration-500 group-hover:bg-dark/50">
                {/* Left column: giant index + period */}
                <div className="md:col-span-2 flex items-start gap-4 md:flex-col md:gap-2">
                  <span className="font-display text-[clamp(3rem,8vw,6rem)] text-dark-light leading-none group-hover:text-accent/30 transition-colors duration-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-xs md:text-sm text-accent tracking-widest mt-2 md:mt-0">
                    {item.period}
                  </span>
                </div>

                {/* Center column: degree + institution */}
                <div className="md:col-span-6">
                  <h3 data-bass="light" className="font-display text-[clamp(1.8rem,4vw,3.5rem)] text-white-pure leading-[0.95] group-hover:text-accent transition-colors duration-300 mb-4">
                    {item.degree}
                  </h3>
                  <p className="font-mono text-sm md:text-base text-grey tracking-wide">
                    {item.institution}
                  </p>
                </div>

                {/* Right column: highlights */}
                <div className="md:col-span-4 flex flex-col justify-center">
                  <ul className="space-y-4">
                    {item.highlights.map((highlight, j) => (
                      <li
                        key={j}
                        className="font-mono text-xs md:text-sm text-grey-light flex items-start gap-3"
                      >
                        <span className="text-accent mt-0.5 shrink-0 text-lg leading-none">
                          /
                        </span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom accent bar on hover */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              </div>
            </div>
          ))}
        </div>

        {/* Closing border */}
        <div className="border-t border-dark-light" />
      </div>

      {/* Section divider */}
      <div className="mt-content-sm md:mt-content border-t border-dark-light" />
    </section>
  );
}
