"use client"

import { GraduationCap, Calendar, Award } from "lucide-react"
import Image from "next/image"
import AnimatedSectionHeader from "./AnimatedSectionHeader"
import { motion } from "framer-motion"

export default function Education() {
  const education = [
    {
      degree: "BUT Informatique",
      institution: "IUT d'Aix Marseille - Arles",
      period: "Depuis Septembre 2023",
      achievements: [
        "Réalisation d'applications : conception, développement, validation",
        "Projets en équipe en méthodologie Agile",
        "Spécialisation en développement web et mobile",
      ],
    },
    {
      degree: "Formation des écoles d'ingénieurs",
      institution: "École d'ingénieur ECE - Paris 15e",
      period: "Septembre 2021 - Juin 2023",
      achievements: ["Maths, Physique, Programmation système et logiciel en C", "Électronique numérique"],
    },
    {
      degree: "Bac Mathématiques - NSI",
      institution: "Lycée Alain - Le Vésinet, Yvelines",
      period: "Septembre 2018 - Juin 2021",
      achievements: ["Option Maths expertes", "Spécialité Numérique et Sciences Informatiques"],
    },
  ]

  return (
    <section id="education" className="py-20 bg-background transition-colors duration-300 overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSectionHeader title="Formation" />
        <div className="max-w-3xl mx-auto py-0 my-0">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card text-card-foreground p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl relative overflow-hidden my-8"
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-accent rounded-br-full z-0 opacity-50"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-2 flex items-center">
                  <GraduationCap className="w-6 h-6 mr-2" />
                  {edu.degree}
                </h3>
                <p className="text-xl text-muted-foreground mb-4">{edu.institution}</p>
                <p className="text-muted-foreground mb-4 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {edu.period}
                </p>
                <h4 className="text-lg font-medium mb-2 flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Points clés :
                </h4>
                <ul className="list-disc list-inside space-y-2">
                  {edu.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-foreground">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute top-0 left-0 w-64 h-64 -mt-32 -ml-32 opacity-20">
        <Image src="/placeholder.svg?height=256&width=256" alt="Decorative background" width={256} height={256} />
      </div>
    </section>
  )
}
