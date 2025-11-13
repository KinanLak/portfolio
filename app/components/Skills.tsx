"use client"

import { motion } from "framer-motion"
import { Code, Database, Server, Layout, GitBranch, Terminal, Layers, Globe, Workflow } from "lucide-react"
import AnimatedSectionHeader from "./AnimatedSectionHeader"

const SkillIcon = ({ icon: Icon }: { icon: any }) => (
  <div className={`p-2 rounded-full bg-card shadow-lg`}>
    <Icon className={`w-6 h-6 text-primary`} />
  </div>
)

const skills = [
  {
    icon: Code,
    name: "Développement Frontend",
    tech: "HTML/JS/CSS, React Native, Qt",
    description: "Création d'interfaces utilisateur réactives et modernes pour applications web et mobiles.",
  },
  {
    icon: Server,
    name: "Développement Backend",
    tech: "Express, Flask, FastAPI",
    description: "Conception et implémentation de serveurs et APIs robustes et évolutifs.",
  },
  {
    icon: Database,
    name: "Bases de données",
    tech: "SQL, PostgreSQL",
    description: "Gestion efficace des données avec des systèmes de gestion de bases de données relationnelles.",
  },
  {
    icon: Layout,
    name: "Langages de programmation",
    tech: "C, C++, JavaScript/TypeScript, Python, Java",
    description: "Maîtrise de multiples langages pour s'adapter à divers besoins de développement.",
  },
  {
    icon: GitBranch,
    name: "Contrôle de version",
    tech: "Git, GitHub",
    description: "Gestion efficace du code source et collaboration avec d'autres développeurs.",
  },
  {
    icon: Terminal,
    name: "DevOps",
    tech: "Docker, GitHub Actions, Linux",
    description: "Mise en place de pipelines CI/CD et gestion d'environnements de déploiement.",
  },
  {
    icon: Layers,
    name: "Cloud & Hébergement",
    tech: "AWS EC2, S3, NGINX",
    description: "Déploiement et gestion d'applications sur des infrastructures cloud.",
  },
  {
    icon: Globe,
    name: "Langues",
    tech: "Français (natif), Anglais (professionnel)",
    description: "Communication efficace dans un environnement international.",
  },
  {
    icon: Workflow,
    name: "Méthodologies & Outils",
    tech: "Agile, Jira, Suite Office",
    description: "Application de méthodologies de gestion de projet et utilisation d'outils collaboratifs.",
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-background"></div>

      {/* Skill Illustrations */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="skill-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M50 30 L50 70 M30 50 L70 50" stroke="currentColor" strokeWidth="2" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#skill-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSectionHeader title="Compétences & Expertise" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-card text-card-foreground p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <SkillIcon icon={skill.icon} />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{skill.tech}</p>
                  </div>
                </div>
                <p className="text-foreground text-sm">{skill.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
