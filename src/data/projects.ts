import type { ProjectsData } from "@/types/data";

const projects: ProjectsData = {
  items: [
    {
      id: "papaya",
      name: "Papaya",
      tagline: "Social network for video game reviews & experiences.",
      description:
        "A community-driven platform where gamers share reviews, rate games, and connect through shared gaming experiences.",
      tags: ["Social Network", "Gaming", "Reviews"],
      featured: true,
    },
    {
      id: "bet4free",
      name: "BET4FREE",
      tagline: "Free sports betting platform with a social twist.",
      description:
        "A unique platform combining free sports betting with social networking features, putting the community first.",
      tags: ["Sports", "Social", "Platform"],
      featured: true,
    },
    {
      id: "les-mouettes",
      name: "Les Mouettes",
      tagline: "Booking & payment app for a children's vacation club.",
      description:
        "Mobile application enabling seamless reservation and payment management for a children's holiday club.",
      tags: ["Mobile App", "Booking", "Payments"],
      featured: true,
    },
    {
      id: "fullstack-dev",
      name: "Full Stack Practice",
      tagline: "End-to-end development from specs to deployment.",
      description:
        "Writing technical specifications, designing database schemas, developing APIs, server administration, and applying GDPR compliance standards.",
      tags: ["Full Stack", "API", "DevOps", "GDPR"],
      featured: false,
    },
  ],
};

export default projects;
