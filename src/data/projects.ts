import type { ProjectsData } from "@/types/data";

const projects: ProjectsData = {
  items: [
    {
      id: "nautika",
      name: "Nautika",
      tagline: "TypeScript product platform built as a modern monorepo.",
      description:
        "A production-oriented monorepo combining a React web app, a Bun and Elysia API, PostgreSQL with Drizzle ORM, typed OpenAPI contracts, and a strong focus on data integrity and product workflows.",
      tags: ["TypeScript", "React", "Bun", "Elysia", "PostgreSQL"],
      featured: true,
    },
    {
      id: "netplan",
      name: "Netplan",
      tagline: "Interactive planning interface with rich node-based flows.",
      description:
        "A modern React 19 application built with TanStack Router and Start, XYFlow, Zustand, and Tailwind CSS, designed for complex interactive workflows and deliberate interface design.",
      tags: ["React 19", "TanStack", "XYFlow", "Tailwind", "Vite"],
      featured: true,
    },
    {
      id: "klnp",
      name: "klNP",
      tagline: "macOS menu bar app for real-time now-playing sync.",
      description:
        "A Go-based desktop utility that captures now-playing metadata from Apple Music, Spotify, or MediaRemote and pushes it to a WebSocket endpoint for live integrations.",
      tags: ["Go", "macOS", "WebSocket", "AppleScript", "Media"],
      featured: true,
    },
    {
      id: "spotipack",
      name: "Spotipack",
      tagline: "Spotify-connected single-page app for music discovery.",
      description:
        "A public TypeScript project that connects to Spotify, authenticates the user, and surfaces favorite tracks and artists through a focused single-page music experience.",
      tags: ["TypeScript", "Spotify API", "SPA", "Music"],
      featured: true,
    },
    {
      id: "gradely",
      name: "Gradely",
      tagline: "Mobile app delivered through a major BUT team project.",
      description:
        "An academic product project that stands out in my coursework for its project follow-up, presentation material, and mobile-first execution, connecting school delivery with real application building.",
      tags: ["Mobile", "Team Project", "Expo", "React Native"],
      featured: false,
    },
    {
      id: "horloge-opengl",
      name: "Horloge OpenGL",
      tagline: "C++ graphics project focused on rendering and interaction.",
      description:
        "A programming project built with CMake, OpenGL, GLFW, GLM, and ImGui to explore low-level rendering, graphics tooling, and interactive desktop application structure.",
      tags: ["C++", "OpenGL", "CMake", "GLFW", "ImGui"],
      featured: false,
    },
  ],
};

export default projects;
