import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileData from "@/data/profile";
import Marquee from "@/components/Marquee";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Massive number reveal
      gsap.from("[data-about-num]", {
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
      gsap.from("[data-about-word]", {
        y: "100%",
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "[data-about-title]",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Bio paragraphs
      gsap.from("[data-about-bio]", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-about-bio]",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Facts
      gsap.from("[data-about-fact]", {
        x: -40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-about-facts]",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const facts = [
    { label: "Location", value: profileData.location },
    { label: "Focus", value: "Products, APIs & mobile" },
    { label: "Current", value: "Part-time at Nautika" },
    { label: "Side", value: "Firefighter since 2017" },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-black py-section-sm md:py-section overflow-hidden"
    >
      {/* Giant section number */}
      <div className="absolute -top-8 right-6 md:right-16 overflow-hidden">
        <span
          data-about-num
          className="font-display text-[clamp(12rem,30vw,28rem)] text-dark leading-none select-none block"
        >
          01
        </span>
      </div>

      <div className="section-shell relative z-10">
        {/* Section tag */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-0.5 bg-accent" />
          <span className="font-mono text-sm text-accent tracking-[0.3em] uppercase">
            Manifesto
          </span>
        </div>

        {/* Title — big and broken across lines */}
        <div data-about-title className="mb-20 md:mb-28">
          <h2 data-bass="medium" className="font-display text-[clamp(4rem,12vw,11rem)] text-white-pure leading-[0.85]">
            {"Who I Am".split(" ").map((word, i) => (
              <span key={i} className="overflow-hidden inline-block mr-[0.2em]">
                <span data-about-word className="inline-block">
                  {word}
                </span>
              </span>
            ))}
            <span className="text-accent">.</span>
          </h2>
        </div>

        {/* Bio — two massive columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-28 mb-24 md:mb-36">
          {profileData.bio.map((paragraph, i) => (
            <p
              key={i}
              data-about-bio
              className="font-mono text-base md:text-lg lg:text-xl text-grey-light leading-[1.9]"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Facts — horizontal brutal layout */}
        <div data-about-facts className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-dark-light">
          {facts.map((fact, i) => (
            <div
              key={i}
              data-about-fact
              className="border-b md:border-b-0 md:border-r border-dark-light last:border-r-0 last:border-b-0 p-8 md:p-10 group hover:bg-dark transition-colors duration-500"
            >
              <span className="font-mono text-[10px] md:text-xs text-accent tracking-[0.3em] uppercase block mb-4">
                {fact.label}
              </span>
              <span className="font-mono text-sm md:text-base text-white block">
                {fact.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Divider marquee */}
      <div className="mt-content-sm md:mt-content border-y border-dark-light py-4">
        <Marquee reverse speed={30}>
          {Array(6)
            .fill(null)
            .map((_, i) => (
              <span
                key={i}
                className="font-display text-xl md:text-2xl text-dark-light flex items-center gap-6 md:gap-10 select-none"
              >
                CODE WITH INTENTION &mdash; BUILD WITH CRAFT &mdash; SHIP WITH
                CONFIDENCE
                <span className="text-accent/30">&diams;</span>
              </span>
            ))}
        </Marquee>
      </div>
    </section>
  );
}
