import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import educationData from "@/data/education";

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

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
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.15,
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
      id="education"
      ref={sectionRef}
      className="relative min-h-screen bg-black py-section-sm md:py-section px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-[10px] text-grey tracking-[0.3em] uppercase">
            05
          </span>
          <div className="h-px bg-accent flex-grow max-w-32" />
          <span className="font-mono text-[10px] text-grey tracking-[0.3em] uppercase">
            Origins
          </span>
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="font-display text-[clamp(3rem,10vw,8rem)] text-white-pure leading-[0.85] mb-16"
        >
          Education
          <span className="text-accent">.</span>
        </h2>

        {/* Education cards — stacked editorial */}
        <div className="space-y-8">
          {educationData.items.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => {
                if (el) cardRefs.current[i] = el;
              }}
              className="group relative grid grid-cols-1 md:grid-cols-12 gap-6 border border-dark-light p-6 md:p-8 hover:border-accent/30 transition-all duration-500"
            >
              {/* Left: period + number */}
              <div className="md:col-span-3 flex md:flex-col items-start gap-2 md:gap-4">
                <span className="font-display text-5xl md:text-7xl text-dark-light group-hover:text-accent/20 transition-colors duration-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-xs text-accent tracking-widest">
                  {item.period}
                </span>
              </div>

              {/* Right: content */}
              <div className="md:col-span-9">
                <h3 className="font-display text-2xl md:text-3xl text-white-pure group-hover:text-accent transition-colors duration-300 mb-2">
                  {item.degree}
                </h3>
                <p className="font-mono text-sm text-grey mb-4">
                  {item.institution}
                </p>

                <ul className="space-y-2">
                  {item.highlights.map((highlight, j) => (
                    <li
                      key={j}
                      className="font-mono text-xs text-grey-light flex items-start gap-2"
                    >
                      <span className="text-accent mt-0.5 shrink-0">/</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 w-full h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
