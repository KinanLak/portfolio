"use client"

import { motion } from "framer-motion"
import { Code, Layout, Server, Smartphone } from "lucide-react"
import Image from "next/image"

export default function Services() {
  // Remplacer les services par les projets personnels
  const services = [
    {
      icon: <Layout className="w-12 h-12 text-blue-500" />,
      title: "Papaya",
      description: "Réseau social autour des reviews et expériences sur les jeux vidéos.",
    },
    {
      icon: <Server className="w-12 h-12 text-green-500" />,
      title: "BET4FREE",
      description: "Plateforme de paris sportifs gratuits avec un accent mis sur le côté réseaux social.",
    },
    {
      icon: <Smartphone className="w-12 h-12 text-yellow-500" />,
      title: "Les Mouettes",
      description: "Application de réservation et paiement pour un club vacances pour enfants.",
    },
    {
      icon: <Code className="w-12 h-12 text-purple-500" />,
      title: "Développement Full Stack",
      description:
        "Rédaction de cahiers des charges, conception de schémas de données, développement d'API, administration de serveurs et application des normes RGPD.",
    },
  ]

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-blue-900 transition-colors duration-300 overflow-hidden relative"
    >
      <div className="container mx-auto px-6 relative z-10">
        {/* Modifier le titre de la section */}
        <motion.h2
          className="text-4xl font-bold mb-12 text-center dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Projets Personnels
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                {service.icon}
                <h3 className="text-2xl font-semibold ml-4 dark:text-white">{service.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
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
