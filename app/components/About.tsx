"use client"

import { motion } from "framer-motion"
import { Code, Database, Server, Zap } from "lucide-react"
import Image from "next/image"

export default function About() {
  const skills = [
    { icon: <Code className="w-8 h-8 text-primary" />, title: "Frontend", description: "" },
    { icon: <Server className="w-8 h-8 text-primary" />, title: "Backend", description: "" },
    { icon: <Database className="w-8 h-8 text-primary" />, title: "Base de données", description: "" },
    { icon: <Zap className="w-8 h-8 text-primary" />, title: "Hosting", description: "" },
  ]

  return (
    <section
      id="about"
      className="py-20 bg-background dark:bg-background transition-colors duration-300 overflow-hidden relative"
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="text-4xl font-bold mb-8 text-center text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          À propos de moi
        </motion.h2>
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
          <motion.div
            className="md:w-1/2 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl text-foreground leading-relaxed mb-6">
              Étudiant en 3ᵉ année de BUT Informatique à l'IUT d'Arles, je conçois et développe des applications web et
              mobiles. Passionné par la tech, j'aime créer des projets concrets.
            </p>
            <p className="text-xl text-foreground leading-relaxed">
              Sapeur-pompier volontaire depuis 2017, je sais gérer la pression et travailler en équipe. Actif dans mon
              association étudiante, j'y affine mon leadership et ma gestion de projets.
            </p>
          </motion.div>
          <motion.div
            className="md:w-1/2 grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {skills.map((skill, index) => (
              <div key={index} className="bg-card text-card-foreground p-6 rounded-lg shadow-md">
                {skill.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2">{skill.title}</h3>
                <p className="text-muted-foreground">{skill.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 -mb-32 -mr-32 opacity-20">
        <Image src="/placeholder.svg?height=256&width=256" alt="Decorative background" width={256} height={256} />
      </div>
    </section>
  )
}
