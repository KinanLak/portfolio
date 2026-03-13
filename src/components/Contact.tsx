import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileData from "@/data/profile";


gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const githubHandle = profileData.social.github.split("github.com/")[1] ?? "KinanLak";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Giant background number
      gsap.from("[data-contact-num]", {
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
      gsap.from("[data-contact-word]", {
        y: "100%",
        duration: 0.8,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "[data-contact-title]",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // CTA block
      gsap.from("[data-contact-cta]", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-contact-cta]",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Form fields stagger
      gsap.from("[data-contact-field]", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-contact-form]",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Info blocks
      gsap.from("[data-contact-info]", {
        x: -40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-contact-sidebar]",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(formState.subject);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
    );
    window.open(
      `mailto:${profileData.email}?subject=${subject}&body=${body}`,
      "_blank"
    );
  };

  const contactInfo = [
    {
      label: "Email",
      value: profileData.email,
      href: `mailto:${profileData.email}`,
    },
    {
      label: "Phone",
      value: profileData.phone,
      href: `tel:${profileData.phone}`,
    },
    { label: "Location", value: profileData.location },
    {
      label: "Github",
      value: githubHandle,
      href: profileData.social.github,
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-black py-section-sm md:py-section overflow-hidden"
    >
      {/* Giant section number */}
      <div className="absolute -top-8 right-6 md:right-16 overflow-hidden">
        <span
          data-contact-num
          className="font-display text-[clamp(12rem,30vw,28rem)] text-dark leading-none select-none block"
        >
          06
        </span>
      </div>

      <div className="section-shell relative z-10">
        {/* Section tag */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-0.5 bg-accent" />
          <span className="font-mono text-sm text-accent tracking-[0.3em] uppercase">
            Guest List
          </span>
        </div>

        {/* Title */}
        <div data-contact-title className="mb-8 md:mb-14">
          <h2 data-bass="medium" className="font-display text-[clamp(4rem,14vw,13rem)] text-white-pure leading-[0.85]">
            {"Get In".split(" ").map((word, i) => (
              <span key={i} className="overflow-hidden inline-block mr-[0.2em]">
                <span data-contact-word className="inline-block">
                  {word}
                </span>
              </span>
            ))}
            {" Touch".split("").map((char, i) => (
              <span key={`t-${i}`} className="overflow-hidden inline-block">
                <span data-contact-word className="inline-block">
                  {char}
                </span>
              </span>
            ))}
            <span className="text-accent">.</span>
          </h2>
        </div>

        {/* CTA statement */}
        <div data-contact-cta className="mb-16 md:mb-24 max-w-2xl">
          <p className="font-mono text-sm md:text-base text-grey-light/80 leading-[1.9]">
            If you are building a product, a tool, or an interface that needs
            both technical depth and attention to detail, send me a message. I
            am always happy to discuss ideas, collaborations, and new
            opportunities.
          </p>
        </div>

        {/* Two-column layout: form + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 lg:gap-20">
          {/* ── Left: Form ── */}
          <div data-contact-form>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div data-contact-field className="group">
                  <label className="font-mono text-[10px] text-grey tracking-[0.3em] uppercase block mb-3">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-dark-light focus:border-accent text-white-pure font-mono text-sm md:text-base py-4 outline-none transition-colors duration-300 placeholder:text-grey/20"
                    placeholder="Your name"
                  />
                </div>
                <div data-contact-field className="group">
                  <label className="font-mono text-[10px] text-grey tracking-[0.3em] uppercase block mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-dark-light focus:border-accent text-white-pure font-mono text-sm md:text-base py-4 outline-none transition-colors duration-300 placeholder:text-grey/20"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div data-contact-field>
                <label className="font-mono text-[10px] text-grey tracking-[0.3em] uppercase block mb-3">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={formState.subject}
                  onChange={(e) =>
                    setFormState({ ...formState, subject: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-dark-light focus:border-accent text-white-pure font-mono text-sm md:text-base py-4 outline-none transition-colors duration-300 placeholder:text-grey/20"
                  placeholder="What's this about?"
                />
              </div>

              <div data-contact-field>
                <label className="font-mono text-[10px] text-grey tracking-[0.3em] uppercase block mb-3">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-dark-light focus:border-accent text-white-pure font-mono text-sm md:text-base py-4 outline-none transition-colors duration-300 resize-none placeholder:text-grey/20"
                  placeholder="Tell me about your project..."
                />
              </div>

              <div data-contact-field className="pt-4">
                <button
                  type="submit"
                  className="group relative font-display text-xl md:text-2xl tracking-[0.15em] uppercase border border-accent text-accent px-10 md:px-14 py-5 md:py-6 hover:text-black transition-colors duration-500 cursor-pointer overflow-hidden"
                >
                  <span className="relative z-10">Send Message</span>
                  <div className="absolute inset-0 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </div>
            </form>
          </div>

          {/* ── Right: Contact info sidebar ── */}
          <div
            data-contact-sidebar
            className="lg:border-l lg:border-dark-light lg:pl-16"
          >
            <span className="font-mono text-[10px] text-grey tracking-[0.3em] uppercase block mb-8">
              Contact details
            </span>

            <div className="space-y-8">
              {contactInfo.map((info, i) => (
                <div key={i} data-contact-info>
                  <span className="font-mono text-[10px] text-accent/60 tracking-[0.25em] uppercase block mb-2">
                    {info.label}
                  </span>
                  {info.href ? (
                    <a
                      href={info.href}
                      target={
                        info.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        info.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="font-mono text-sm text-white hover:text-accent transition-colors duration-300 break-all"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <span className="font-mono text-sm text-white">
                      {info.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section divider */}
      <div className="mt-content-sm md:mt-content border-t border-dark-light" />

      {/* Footer */}
      <div className="section-shell relative z-10 mt-20 md:mt-28 pt-10 border-t border-dark-light">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-8">
          <span data-bass="light" className="font-display text-lg md:text-xl text-grey tracking-widest uppercase">
            &copy; {new Date().getFullYear()} {profileData.name}
          </span>
          <span className="font-mono text-xs text-grey/40 tracking-widest">
            Designed & built with passion
          </span>
        </div>
      </div>
    </section>
  );
}
