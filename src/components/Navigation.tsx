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
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-50 transition-all duration-500 ${
        isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-4 pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-end gap-4">
        {navigationData.sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollTo(section.anchor)}
            className="group flex items-center gap-3 cursor-pointer"
            aria-label={`Navigate to ${section.label}`}
          >
            {/* Label — appears on hover */}
            <span
              className={`font-mono text-[10px] tracking-widest uppercase transition-all duration-300 ${
                activeSection === section.id
                  ? "text-accent opacity-100 translate-x-0"
                  : "text-grey opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
              }`}
            >
              {section.label}
            </span>

            {/* Dot */}
            <div className="relative">
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeSection === section.id
                    ? "bg-accent scale-125 shadow-[0_0_8px_rgba(255,102,0,0.5)]"
                    : "bg-grey/30 group-hover:bg-grey"
                }`}
              />
              {activeSection === section.id && (
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-accent animate-ping opacity-30" />
              )}
            </div>
          </button>
        ))}
      </div>
    </nav>
  );
}
