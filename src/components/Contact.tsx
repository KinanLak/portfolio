import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileData from "@/data/profile";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

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

      if (formRef.current) {
        const children = formRef.current.children;
        gsap.from(children, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mailto fallback
    const subject = encodeURIComponent(formState.subject);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
    );
    window.open(
      `mailto:${profileData.email}?subject=${subject}&body=${body}`,
      "_blank"
    );
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen bg-black-light py-section-sm md:py-section px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-[10px] text-grey tracking-[0.3em] uppercase">
            06
          </span>
          <div className="h-px bg-accent flex-grow max-w-32" />
          <span className="font-mono text-[10px] text-grey tracking-[0.3em] uppercase">
            Guest List
          </span>
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="font-display text-[clamp(3rem,10vw,8rem)] text-white-pure leading-[0.85] mb-16"
        >
          Get in
          <br />
          Touch<span className="text-accent">.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Left: contact info */}
          <div className="md:col-span-4 space-y-8">
            <div>
              <span className="font-mono text-[10px] text-grey tracking-[0.3em] uppercase block mb-3">
                Email
              </span>
              <a
                href={`mailto:${profileData.email}`}
                className="font-mono text-sm text-accent hover:text-accent-light transition-colors duration-300 break-all"
              >
                {profileData.email}
              </a>
            </div>

            <div>
              <span className="font-mono text-[10px] text-grey tracking-[0.3em] uppercase block mb-3">
                Phone
              </span>
              <a
                href={`tel:${profileData.phone}`}
                className="font-mono text-sm text-grey-light hover:text-accent transition-colors duration-300"
              >
                {profileData.phone}
              </a>
            </div>

            <div>
              <span className="font-mono text-[10px] text-grey tracking-[0.3em] uppercase block mb-3">
                Location
              </span>
              <span className="font-mono text-sm text-grey-light">
                {profileData.location}
              </span>
            </div>

            <div>
              <span className="font-mono text-[10px] text-grey tracking-[0.3em] uppercase block mb-3">
                Socials
              </span>
              <a
                href={profileData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-grey-light hover:text-accent transition-colors duration-300"
              >
                github.com/kinanlakhdar
              </a>
            </div>
          </div>

          {/* Right: contact form */}
          <div className="md:col-span-8">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono text-[10px] text-grey tracking-[0.3em] uppercase block mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-dark-light focus:border-accent text-white font-mono text-sm py-3 outline-none transition-colors duration-300 placeholder:text-grey/40"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] text-grey tracking-[0.3em] uppercase block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-dark-light focus:border-accent text-white font-mono text-sm py-3 outline-none transition-colors duration-300 placeholder:text-grey/40"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[10px] text-grey tracking-[0.3em] uppercase block mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={formState.subject}
                  onChange={(e) =>
                    setFormState({ ...formState, subject: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-dark-light focus:border-accent text-white font-mono text-sm py-3 outline-none transition-colors duration-300 placeholder:text-grey/40"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] text-grey tracking-[0.3em] uppercase block mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-dark-light focus:border-accent text-white font-mono text-sm py-3 outline-none transition-colors duration-300 resize-none placeholder:text-grey/40"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                className="group relative font-display text-xl tracking-widest uppercase bg-accent text-black px-8 py-4 hover:bg-accent-light transition-colors duration-300 cursor-pointer"
              >
                <span className="relative z-10">Send Message</span>
                <div className="absolute inset-0 bg-white-pure scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-dark-light flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-mono text-xs text-grey">
            &copy; {new Date().getFullYear()} {profileData.name}
          </span>
          <span className="font-mono text-[10px] text-grey/50">
            Designed & built with passion
          </span>
        </div>
      </div>
    </section>
  );
}
