import type { SkillsData } from "@/types/data";

const skills: SkillsData = {
  stages: [
    {
      id: "frontend",
      name: "Front Stage",
      category: "Frontend & UX",
      technologies: ["React", "TypeScript", "Vite", "Tailwind CSS v4", "GSAP"],
      description:
        "Designing interfaces that stay fast, expressive, and product-focused across modern web applications.",
    },
    {
      id: "mobile",
      name: "Pocket Lab",
      category: "Mobile Development",
      technologies: ["Expo", "React Native", "Ionic", "Capacitor", "Angular"],
      description:
        "Building mobile experiences through both the React Native and Ionic ecosystems, depending on the project context.",
    },
    {
      id: "backend",
      name: "Engine Room",
      category: "Backend & APIs",
      technologies: ["Bun", "Elysia", "Express", "Laravel", "Better Auth", "OpenAPI"],
      description:
        "Designing typed APIs, auth flows, and service layers that stay pragmatic, documented, and maintainable.",
    },
    {
      id: "data",
      name: "The Vault",
      category: "Databases & Data",
      technologies: ["PostgreSQL", "Drizzle ORM", "MySQL", "SQLite", "SQL"],
      description:
        "Modeling, querying, and validating data from classroom SQL work to production-oriented application schemas.",
    },
    {
      id: "systems",
      name: "Low-Level Deck",
      category: "Systems & Graphics",
      technologies: ["C", "C++", "Go", "OpenGL", "CMake"],
      description:
        "Comfortable switching from product stacks to lower-level work in systems programming, tooling, and graphics projects.",
    },
    {
      id: "ai-data",
      name: "Signal Room",
      category: "Data, Scripting & AI",
      technologies: ["Python", "Jupyter", "Power BI", "OpenAI API", "Pandas"],
      description:
        "Using scripting, notebooks, visualization, and API experimentation to explore data and prototype ideas quickly.",
    },
    {
      id: "delivery",
      name: "Backstage",
      category: "Tooling & Delivery",
      technologies: ["Docker", "Vercel", "Turborepo", "GitHub Actions", "Linux", "Git"],
      description:
        "Shipping projects with repeatable tooling, deployment workflows, monorepos, and clean day-to-day developer ergonomics.",
    },
    {
      id: "workflow",
      name: "Crew Area",
      category: "Workflow & Communication",
      technologies: ["Agile", "Technical Writing", "French", "English"],
      description:
        "Documenting decisions, collaborating clearly, and keeping projects understandable for both teammates and stakeholders.",
    },
  ],
};

export default skills;
