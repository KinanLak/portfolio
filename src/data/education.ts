import type { EducationData } from "@/types/data";

const education: EducationData = {
  items: [
    {
      id: "but-informatique",
      degree: "B.Sc. in Computer Science (BUT Informatique)",
      institution: "IUT d'Aix-Marseille — Arles",
      period: "Sept 2023 — Present",
      highlights: [
        "Application design, development & validation",
        "Team projects using Agile methodology",
        "Specialization in web & mobile development",
      ],
    },
    {
      id: "ece-paris",
      degree: "Engineering Preparatory Program",
      institution: "ECE Paris — Engineering School",
      period: "Sept 2021 — June 2023",
      highlights: [
        "Mathematics, Physics",
        "Systems & software programming in C",
        "Digital electronics",
      ],
    },
    {
      id: "bac",
      degree: "Baccalauréat — Mathematics & Computer Science",
      institution: "Lycée Alain — Le Vésinet, Yvelines",
      period: "Sept 2018 — June 2021",
      highlights: [
        "Advanced Mathematics option",
        "NSI specialty (Computer Science & Digital Sciences)",
      ],
    },
  ],
};

export default education;
