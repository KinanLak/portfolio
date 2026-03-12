import { useState, useEffect, useCallback } from "react";
import navigationData from "@/data/navigation";

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past hero
      setIsVisible(window.scrollY > window.innerHeight * 0.3);

      // Detect active section
      const sections = navigationData.sections.map((s) => s.id);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((anchor: string) => {
    const id = anchor.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <nav
      className={`fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 transition-all duration-500 ${
        isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-4 pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-end gap-6">
        {navigationData.sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.anchor)}
              className="group flex items-center gap-3 cursor-pointer"
              aria-label={`Navigate to ${section.label}`}
            >
              {/* Label — appears on hover or when active */}
              <span
                className={`font-mono text-[10px] tracking-[0.3em] uppercase transition-all duration-300 ${
                  isActive
                    ? "text-accent opacity-100 translate-x-0"
                    : "text-grey opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                }`}
              >
                {section.label}
              </span>

              {/* Dot — wider, more presence */}
              <div className="relative flex items-center justify-center">
                <div
                  className={`transition-all duration-300 ${
                    isActive
                      ? "w-3 h-3 bg-accent shadow-[0_0_12px_rgba(255,102,0,0.6)]"
                      : "w-2 h-2 bg-grey/30 group-hover:bg-grey group-hover:scale-125"
                  }`}
                  style={{ borderRadius: isActive ? "0" : "50%" }}
                />
                {isActive && (
                  <div className="absolute w-3 h-3 bg-accent animate-ping opacity-20" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
