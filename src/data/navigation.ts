import type { NavigationData } from "@/types/data";

const navigation: NavigationData = {
  sections: [
    { id: "hero", label: "Home", anchor: "#hero" },
    { id: "about", label: "Manifesto", anchor: "#about" },
    { id: "experience", label: "Lineup", anchor: "#experience" },
    { id: "skills", label: "Stages", anchor: "#skills" },
    { id: "projects", label: "Headliners", anchor: "#projects" },
    { id: "education", label: "Origins", anchor: "#education" },
    { id: "contact", label: "Guest List", anchor: "#contact" },
  ],
};

export default navigation;
