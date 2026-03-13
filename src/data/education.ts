import type { EducationData } from "@/types/data";

const education: EducationData = {
  items: [
    {
      id: "but-informatique",
      degree: "B.U.T. Informatique",
      institution: "IUT d'Aix-Marseille — Arles",
      period: "Sept 2023 — Present",
      highlights: [
        "Progressed from C++, web, systems, and SQL foundations to architecture, mobile, 3D, optimization, and advanced programming.",
        "Key projects include CLI Calendrier, Military Aircrafts Manager, Gradely, Horloge OpenGL, and a final-year technical report centered on Nautika.",
        "Coursework consistently combined code quality, software architecture, data visualization, networks, and product-oriented team delivery.",
      ],
    },
    {
      id: "ece-paris",
      degree: "Engineering Preparatory Program",
      institution: "ECE Paris — Engineering School",
      period: "Sept 2021 — June 2023",
      highlights: [
        "Strong scientific foundation in mathematics, physics, mechanics, and numerical simulation.",
        "Early programming practice through C, Python notebooks, and team-based engineering assignments.",
        "Hands-on exposure to electronics, systems thinking, technical reports, and oral presentations.",
      ],
    },
    {
      id: "bac",
      degree: "Baccalauréat — Mathematics & Computer Science",
      institution: "Lycée Alain — Le Vésinet, Yvelines",
      period: "Sept 2018 — June 2021",
      highlights: [
        "Mathematics track with NSI specialization in computer science and digital sciences.",
        "Built early algorithmic and programming foundations before moving into engineering studies.",
      ],
    },
  ],
};

export default education;
