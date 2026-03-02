import type { SkillsData } from "@/types/data";

const skills: SkillsData = {
  stages: [
    {
      id: "frontend",
      name: "Front Stage",
      category: "Frontend Development",
      technologies: ["HTML/CSS/JS", "React Native", "Qt"],
      description:
        "Building reactive, modern user interfaces for web and mobile applications.",
    },
    {
      id: "backend",
      name: "Engine Room",
      category: "Backend Development",
      technologies: ["Express", "Flask", "FastAPI"],
      description:
        "Designing and implementing robust, scalable servers and APIs.",
    },
    {
      id: "databases",
      name: "The Vault",
      category: "Databases",
      technologies: ["SQL", "PostgreSQL"],
      description:
        "Efficient data management with relational database systems.",
    },
    {
      id: "languages",
      name: "Main Stage",
      category: "Programming Languages",
      technologies: ["C", "C++", "JavaScript/TypeScript", "Python", "Java"],
      description:
        "Mastery of multiple languages to adapt to diverse development needs.",
    },
    {
      id: "vcs",
      name: "Control Tower",
      category: "Version Control",
      technologies: ["Git", "GitHub"],
      description:
        "Efficient source code management and developer collaboration.",
    },
    {
      id: "devops",
      name: "Backstage",
      category: "DevOps",
      technologies: ["Docker", "GitHub Actions", "Linux"],
      description:
        "Setting up CI/CD pipelines and managing deployment environments.",
    },
    {
      id: "cloud",
      name: "The Cloud Stage",
      category: "Cloud & Hosting",
      technologies: ["AWS EC2", "S3", "NGINX"],
      description:
        "Deploying and managing applications on cloud infrastructure.",
    },
    {
      id: "languages-spoken",
      name: "World Stage",
      category: "Languages",
      technologies: ["French (native)", "English (professional)"],
      description:
        "Effective communication in an international environment.",
    },
    {
      id: "methodologies",
      name: "Crew Area",
      category: "Methodologies & Tools",
      technologies: ["Agile", "Jira", "Office Suite"],
      description:
        "Applying project management methodologies and collaborative tools.",
    },
  ],
};

export default skills;
