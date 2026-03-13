import type { ProjectsData } from "@/types/data";

const projects: ProjectsData = {
  items: [
    {
      id: "nautika",
      name: "Nautika",
      tagline: "TypeScript product platform built as a modern monorepo.",
      description:
        "A production-oriented monorepo combining a React web app, a Bun and Elysia API, PostgreSQL with Drizzle ORM, typed OpenAPI contracts, and a strong focus on data integrity and product workflows.",
      longDescription:
        "Nautika is a full-stack TypeScript monorepo architected for production-grade product workflows. The system integrates a React single-page application with a Bun-powered API layer built on the Elysia framework, backed by PostgreSQL through Drizzle ORM. Every endpoint is defined via typed OpenAPI contracts that serve as the single source of truth for both client and server, eliminating an entire class of integration bugs. The project prioritizes data integrity, developer experience, and maintainable architecture across the entire stack.",
      tags: ["TypeScript", "React", "Bun", "Elysia", "PostgreSQL"],
      featured: true,
      role: "Full Stack Developer",
      year: "2025",
      highlights: [
        "End-to-end type safety from database schema to frontend components via OpenAPI contracts",
        "Monorepo structure with shared packages for contracts, types, and validation logic",
        "Drizzle ORM for type-safe database migrations and query building",
        "Bun runtime for fast server startup and native TypeScript execution",
        "Elysia framework providing decorator-pattern API composition",
      ],
      links: [{ label: "Source Code", url: "#" }],
    },
    {
      id: "netplan",
      name: "Netplan",
      tagline: "Interactive planning interface with rich node-based flows.",
      description:
        "A modern React 19 application built with TanStack Router and Start, XYFlow, Zustand, and Tailwind CSS, designed for complex interactive workflows and deliberate interface design.",
      longDescription:
        "Netplan is a modern interactive planning interface that leverages React 19 alongside TanStack Router and Start for type-safe routing and server functions. The core of the application is a node-based flow editor built on XYFlow, enabling users to create, connect, and manipulate complex workflow diagrams with a deliberate focus on interface quality and interaction design. State management is handled through Zustand for predictable, minimal-boilerplate state trees across the workspace.",
      tags: ["React 19", "TanStack", "XYFlow", "Tailwind", "Vite"],
      featured: true,
      role: "Frontend Developer",
      year: "2025",
      highlights: [
        "React 19 with concurrent rendering and latest API patterns",
        "Node-based flow editor with custom node types and edge behaviors",
        "TanStack Router for fully type-safe file-based routing",
        "Zustand stores for workspace state, node data, and UI preferences",
        "Custom interaction patterns for node creation, linking, and bulk operations",
      ],
      links: [{ label: "Source Code", url: "#" }],
    },
    {
      id: "klnp",
      name: "klNP",
      tagline: "macOS menu bar app for real-time now-playing sync.",
      description:
        "A Go-based desktop utility that captures now-playing metadata from Apple Music, Spotify, or MediaRemote and pushes it to a WebSocket endpoint for live integrations.",
      longDescription:
        "klNP is a lightweight macOS menu bar utility written in Go that captures real-time now-playing metadata from Apple Music, Spotify, or any macOS media source via the MediaRemote framework. The captured metadata — track title, artist, album, artwork, playback state — is streamed over WebSocket to connected clients, enabling live integrations with stream overlays, visualizers, or web dashboards. The app sits silently in the menu bar, using minimal system resources while maintaining persistent connections.",
      tags: ["Go", "macOS", "WebSocket", "AppleScript", "Media"],
      featured: true,
      role: "Developer",
      year: "2025",
      highlights: [
        "Go binary with CGo bridge for macOS MediaRemote framework access",
        "AppleScript fallback for rich metadata extraction from Apple Music and Spotify",
        "Persistent WebSocket server with automatic reconnection and heartbeat",
        "Menu bar integration with native macOS system tray APIs",
        "Configurable metadata polling interval and output formatting",
      ],
      links: [{ label: "Source Code", url: "#" }],
    },
    {
      id: "spotipack",
      name: "Spotipack",
      tagline: "Spotify-connected single-page app for music discovery.",
      description:
        "A public TypeScript project that connects to Spotify, authenticates the user, and surfaces favorite tracks and artists through a focused single-page music experience.",
      longDescription:
        "Spotipack is a public TypeScript single-page application that connects to the Spotify Web API to surface a user's listening habits and favorite music. After authenticating via Spotify's OAuth 2.0 PKCE flow, users can explore their top tracks, top artists, and recently played history through a focused, distraction-free interface. The project emphasizes clean API integration patterns and a streamlined single-page experience built for music enthusiasts.",
      tags: ["TypeScript", "Spotify API", "SPA", "Music"],
      featured: true,
      role: "Developer",
      year: "2024",
      highlights: [
        "Spotify OAuth 2.0 PKCE authentication flow for secure client-side auth",
        "Top tracks, top artists, and listening history visualization",
        "Responsive single-page layout with smooth transitions",
        "Clean API abstraction layer for Spotify Web API endpoints",
        "Publicly accessible codebase demonstrating modern SPA patterns",
      ],
      links: [{ label: "Source Code", url: "#" }],
    },
    {
      id: "gradely",
      name: "Gradely",
      tagline: "Mobile app delivered through a major BUT team project.",
      description:
        "An academic product project that stands out in my coursework for its project follow-up, presentation material, and mobile-first execution, connecting school delivery with real application building.",
      longDescription:
        "Gradely was developed as a major team project during the BUT curriculum, standing out for its rigorous project management approach and mobile-first execution. The application was built with Expo and React Native, targeting both iOS and Android from a single codebase. The project is notable for its structured delivery process — from initial specifications and mockups through iterative development sprints to final presentation material and comprehensive documentation.",
      tags: ["Mobile", "Team Project", "Expo", "React Native"],
      featured: false,
      role: "Mobile Developer",
      year: "2024",
      highlights: [
        "Cross-platform mobile app built with Expo and React Native",
        "Structured team workflow with sprint planning and code reviews",
        "Comprehensive presentation material and project documentation",
        "Mobile-first UX design with platform-adaptive components",
        "Collaborative codebase with clear contribution guidelines",
      ],
      links: [],
    },
    {
      id: "horloge-opengl",
      name: "Horloge OpenGL",
      tagline: "C++ graphics project focused on rendering and interaction.",
      description:
        "A programming project built with CMake, OpenGL, GLFW, GLM, and ImGui to explore low-level rendering, graphics tooling, and interactive desktop application structure.",
      longDescription:
        "Horloge OpenGL is a C++ graphics programming project that explores low-level rendering pipelines and interactive desktop application development. Built with CMake for cross-platform compilation, the project uses OpenGL for hardware-accelerated rendering, GLFW for window management and input handling, GLM for mathematics, and Dear ImGui for an immediate-mode debug interface. The clock visualization demonstrates shader programming, transformation matrices, and real-time rendering loops.",
      tags: ["C++", "OpenGL", "CMake", "GLFW", "ImGui"],
      featured: false,
      role: "Developer",
      year: "2024",
      highlights: [
        "OpenGL rendering pipeline with custom vertex and fragment shaders",
        "CMake build system for cross-platform compilation",
        "GLFW window management with keyboard and mouse input handling",
        "GLM mathematics library for transformation and projection matrices",
        "Dear ImGui integration for runtime parameter tweaking and debug overlays",
      ],
      links: [{ label: "Source Code", url: "#" }],
    },
  ],
};

export default projects;
