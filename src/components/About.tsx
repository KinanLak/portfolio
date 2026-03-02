import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileData from "@/data/profile";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRefs = useRef<HTMLParagraphElement[]>([]);
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

      gsap.from(lineRef.current, {
        scaleX: 0,
        duration: 1.2,
        ease: "power4.out",
        transformOrigin: "left",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      textRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: 0.2 + i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen bg-black py-section-sm md:py-section px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-[10px] text-grey tracking-[0.3em] uppercase">
            01
          </span>
          <div ref={lineRef} className="h-px bg-accent flex-grow max-w-32" />
          <span className="font-mono text-[10px] text-grey tracking-[0.3em] uppercase">
            Manifesto
          </span>
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="font-display text-[clamp(3rem,10vw,8rem)] text-white-pure leading-[0.85] mb-12"
        >
          About
          <span className="text-accent">.</span>
        </h2>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          {/* Left column — bio */}
          <div className="md:col-span-7 space-y-6">
            {profileData.bio.map((paragraph, i) => (
              <p
                key={i}
                ref={(el) => {
                  if (el) textRefs.current[i] = el;
                }}
                className="font-mono text-sm md:text-base text-grey-light leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Right column — quick facts */}
          <div className="md:col-span-5 space-y-8">
            <div
              ref={(el) => {
                if (el) textRefs.current[profileData.bio.length] = el;
              }}
              className="border-l-2 border-accent pl-6"
            >
              <h3 className="font-display text-2xl text-white-pure mb-4">
                Quick Facts
              </h3>
              <ul className="space-y-3">
                {[
                  { label: "Location", value: profileData.location },
                  { label: "Focus", value: "Web & Mobile Development" },
                  { label: "Status", value: "Open to opportunities" },
                  {
                    label: "Other",
                    value: "Volunteer Firefighter since 2017",
                  },
                ].map((fact, i) => (
                  <li key={i} className="font-mono text-sm">
                    <span className="text-accent">{fact.label}</span>
                    <span className="text-grey mx-2">//</span>
                    <span className="text-grey-light">{fact.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Decorative block */}
            <div
              ref={(el) => {
                if (el) textRefs.current[profileData.bio.length + 1] = el;
              }}
              className="bg-dark p-6 border border-dark-light"
            >
              <p className="font-mono text-xs text-grey leading-loose">
                <span className="text-accent">$</span> cat manifesto.txt
                <br />
                <span className="text-grey-light">
                  &gt; Code with intention.
                </span>
                <br />
                <span className="text-grey-light">&gt; Build with craft.</span>
                <br />
                <span className="text-grey-light">
                  &gt; Ship with confidence.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
