import type { ExperienceData } from "@/types/data";

const experience: ExperienceData = {
  items: [
    {
      id: "iut-arles",
      role: "Computer Science Student",
      organization: "IUT d'Aix-Marseille — Arles",
      location: "Arles, France",
      period: "Sept 2023 — Present",
      type: "education-work",
      highlights: [
        "Application design, development & validation",
        "Mobile app for thesis evaluation — React Native, Expo, TypeScript, PostgreSQL",
        "GPS navigation software with Qt/C++ GUI",
        "Password manager built with Java Swing",
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
        "Emergency rescue & fire response operations",
        "Stress management in high-stakes situations",
        "Team coordination under pressure",
      ],
    },
    {
      id: "student-assoc",
      role: "Vice-President",
      organization: "Student Association — IUT d'Arles",
      location: "Arles, France",
      period: "Dec 2023 — Present",
      type: "leadership",
      highlights: [
        "Event planning & organization",
        "Student body representation",
        "Treasury management & budget oversight",
        "Previously served as Deputy Treasurer (Oct–Dec 2024)",
      ],
    },
    {
      id: "restos-du-coeur",
      role: "Intern",
      organization: "Les Restos du Cœur",
      location: "Aix-en-Provence, France",
      period: "May 2023",
      type: "internship",
      highlights: [
        "Beneficiary reception & administrative management",
        "Inventory management & product shelving",
      ],
    },
  ],
};

export default experience;
