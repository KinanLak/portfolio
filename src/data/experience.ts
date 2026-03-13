import type { ExperienceData } from "@/types/data";

const experience: ExperienceData = {
  items: [
    {
      id: "nautika",
      role: "Part-Time Developer",
      organization: "Nautika",
      location: "Arles, France / Remote",
      period: "2026 — Present",
      type: "part-time",
      highlights: [
        "Contributing to a TypeScript monorepo that combines a React frontend with a Bun and Elysia backend.",
        "Working on product workflows, typed API contracts, and data integrity across UI, API, and database layers.",
        "Hands-on with PostgreSQL, Drizzle ORM, Better Auth, and delivery-oriented technical documentation.",
      ],
    },
    {
      id: "student-assoc",
      role: "President",
      organization: "Student Association — IUT d'Arles",
      location: "Arles, France",
      period: "2023 — 2026",
      type: "leadership",
      highlights: [
        "Organizing events, representing students, and helping structure association initiatives.",
        "Supporting coordination, budgeting, and day-to-day operational decisions inside the student office.",
        "Developed practical leadership habits through planning, communication, and follow-through.",
      ],
    },
    {
      id: "nge",
      role: "Intern",
      organization: "NGE",
      location: "France",
      period: "2025",
      type: "internship",
      highlights: [
        "Produced internship deliverables including reporting, follow-up documents, and structured written material.",
        "Worked in a professional environment where rigor, documentation, and clear communication mattered every day.",
        "Gained firsthand exposure to project organization inside a large infrastructure group.",
      ],
    },
    {
      id: "firefighter",
      role: "Volunteer Firefighter",
      organization: "SDIS 13 & 78",
      location: "Bouches-du-Rhône & Yvelines, France",
      period: "2017 — Present",
      type: "volunteer",
      highlights: [
        "Emergency rescue and fire response in high-pressure situations.",
        "Built strong habits around calm decision-making, teamwork, and discipline.",
        "A long-term commitment that shaped the way I handle responsibility and stress.",
      ],
    },
  ],
};

export default experience;
