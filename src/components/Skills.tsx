import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ReactIcon,
  Typescript01Icon,
  FlashIcon,
  TailwindcssIcon,
  FrameworksIcon,
  SmartPhone01Icon,
  SmartPhone02Icon,
  SmartPhone03Icon,
  WebDesign01Icon,
  CommandLineIcon,
  ApiIcon,
  ServerStack01Icon,
  WebProgrammingIcon,
  AuthorizedIcon,
  ApiGatewayIcon,
  DatabaseIcon,
  DatabaseLightningIcon,
  Database01Icon,
  Database02Icon,
  SqlIcon,
  CProgrammingIcon,
  CodeSquareIcon,
  SourceCodeIcon,
  GraphicCardIcon,
  Configuration01Icon,
  PythonIcon,
  ComputerProgramming01Icon,
  Analytics01Icon,
  NeuralNetworkIcon,
  ChartLineData01Icon,
  ContainerIcon,
  CloudIcon,
  Structure01Icon,
  Github01Icon,
  ComputerTerminal01Icon,
  GitBranchIcon,
  KanbanIcon,
  ContentWritingIcon,
  LanguageCircleIcon,
  LanguageSkillIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import skillsData from "@/data/skills";

gsap.registerPlugin(ScrollTrigger);

// Tech name → HugeIcon mapping
type IconDef = typeof ReactIcon;
const TECH_ICONS: Record<string, IconDef> = {
  "React": ReactIcon,
  "TypeScript": Typescript01Icon,
  "Vite": FlashIcon,
  "Tailwind CSS v4": TailwindcssIcon,
  "GSAP": FrameworksIcon,
  "Expo": SmartPhone01Icon,
  "React Native": ReactIcon,
  "Ionic": SmartPhone02Icon,
  "Capacitor": SmartPhone03Icon,
  "Angular": WebDesign01Icon,
  "Bun": CommandLineIcon,
  "Elysia": ApiIcon,
  "Express": ServerStack01Icon,
  "Laravel": WebProgrammingIcon,
  "Better Auth": AuthorizedIcon,
  "OpenAPI": ApiGatewayIcon,
  "PostgreSQL": DatabaseIcon,
  "Drizzle ORM": DatabaseLightningIcon,
  "MySQL": Database01Icon,
  "SQLite": Database02Icon,
  "SQL": SqlIcon,
  "C": CProgrammingIcon,
  "C++": CodeSquareIcon,
  "Go": SourceCodeIcon,
  "OpenGL": GraphicCardIcon,
  "CMake": Configuration01Icon,
  "Python": PythonIcon,
  "Jupyter": ComputerProgramming01Icon,
  "Power BI": Analytics01Icon,
  "OpenAI API": NeuralNetworkIcon,
  "Pandas": ChartLineData01Icon,
  "Docker": ContainerIcon,
  "Vercel": CloudIcon,
  "Turborepo": Structure01Icon,
  "GitHub Actions": Github01Icon,
  "Linux": ComputerTerminal01Icon,
  "Git": GitBranchIcon,
  "Agile": KanbanIcon,
  "Technical Writing": ContentWritingIcon,
  "French": LanguageCircleIcon,
  "English": LanguageSkillIcon,
};

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

      <div className="section-shell relative z-10">
        {/* Section tag */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-0.5 bg-accent" />
          <span className="font-mono text-sm text-accent tracking-[0.3em] uppercase">
            Stages
          </span>
        </div>

        {/* Title */}
        <div data-skills-title className="mb-24 md:mb-32">
          <h2 data-bass="medium" className="font-display text-[clamp(4rem,12vw,11rem)] text-white-pure leading-[0.85]">
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
                      data-bass="light"
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
                    isExpanded ? "max-h-96 pb-10" : "max-h-0"
                  }`}
                >
                  <div className="pl-14 pr-4 md:pl-20 md:pr-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                    <p className="font-mono text-base md:text-lg text-grey-light leading-relaxed">
                      {stage.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {stage.technologies.map((tech) => {
                        const icon = TECH_ICONS[tech];
                        return (
                          <span
                            key={tech}
                            className="inline-flex items-center gap-2 font-mono text-xs md:text-sm text-accent border border-accent/40 px-4 py-2 uppercase tracking-wider transition-colors duration-300 hover:bg-accent hover:text-black"
                          >
                            {icon && (
                              <HugeiconsIcon
                                icon={icon}
                                size={14}
                                strokeWidth={1.5}
                                color="currentColor"
                              />
                            )}
                            {tech}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="border-t border-dark-light" />
        </div>
      </div>
    </section>
  );
}
