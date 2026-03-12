# AGENTS.md

Guidelines for AI coding agents operating in this repository.

## Project Overview

React 19 + TypeScript single-page portfolio app built with Vite 7. Uses GSAP for scroll-driven animations, React Three Fiber for 3D WebGL particles, Lenis for smooth scrolling, and Tailwind CSS v4 for styling. Deployed to Vercel.

## Build & Dev Commands

Package manager: **Bun** (do NOT use npm/yarn/pnpm)

```sh
bun install          # Install dependencies
bun run dev          # Start Vite dev server
bun run build        # Type-check (tsc -b) then Vite build
bun run lint         # ESLint (flat config, TS + React rules)
bun run check        # Type-check only (tsc --noEmit)
bun run preview      # Preview production build locally
```

### Testing

No test framework is configured. No test files exist in the codebase.

### Pre-commit Validation

Always run before committing:
```sh
bun run check && bun run lint && bun run build
```

## Project Structure

```
src/
  main.tsx              # Entry point (createRoot)
  App.tsx               # Root component (Lenis + GSAP setup)
  index.css             # Tailwind v4 theme + global styles + animations
  components/           # UI components (PascalCase files, one per file)
    Canvas/             # Three.js / R3F components (Scene, ParticleField)
  data/                 # Static typed data constants (camelCase files)
  hooks/                # Custom React hooks (camelCase, use* prefix)
  types/                # Shared TypeScript interfaces
    data.ts             # All data-related interfaces
```

No barrel exports (no `index.ts` files). Import files directly.

## Code Style

### Imports

1. Use the `@/` path alias for all source imports (maps to `src/`)
2. `import type { ... }` is required for type-only imports (enforced by `verbatimModuleSyntax`)
3. Order: React core -> third-party libraries -> local data -> local components/hooks
4. Use double quotes for all import paths and strings

```tsx
import { useRef, useEffect } from "react";       // React core
import gsap from "gsap";                          // Third-party
import profileData from "@/data/profile";         // Local data
import type { ProfileData } from "@/types/data";  // Type import
import Marquee from "@/components/Marquee";        // Local component
```

### TypeScript

- **Strict mode** is enabled with `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`
- **`erasableSyntaxOnly: true`** -- do NOT use enums or parameter properties; use plain objects/unions instead
- Use `interface` (never `type` aliases) for all type definitions
- Data interfaces: `[Entity]Data` or `[Entity]Item` (e.g., `ExperienceData`, `ProjectItem`)
- Component props: `[Component]Props` (e.g., `MarqueeProps`, `SceneProps`)
- Define prop interfaces directly above the component in the same file
- Centralize shared data interfaces in `src/types/data.ts`

### Components

- Function declarations with `export default` (not arrow functions)
- Pattern: `export default function ComponentName() { ... }`
- One component per file, named in PascalCase
- App.tsx is the exception: declares `function App()` and exports separately

### Naming Conventions

| Entity | Convention | Example |
|--------|-----------|---------|
| Component files | PascalCase | `Hero.tsx`, `CustomCursor.tsx` |
| Data/hook/type files | camelCase | `profile.ts`, `useBassEffect.ts` |
| Component directories | PascalCase | `Canvas/` |
| Utility directories | camelCase | `hooks/`, `data/`, `types/` |
| Refs | camelCase + `Ref` suffix | `sectionRef`, `cursorRef` |
| State variables | camelCase | `activeSection`, `isVisible` |
| Module-level constants | UPPER_SNAKE_CASE | `PARTICLE_COUNT`, `BPM` |
| Interfaces | PascalCase | `ProfileData`, `MarqueeProps` |

### Exports

- Components: `export default function Name()` (default export)
- Data files: `const data: Type = {...}; export default data;`
- Custom hooks: named export (`export function useBassEffect()`)
- Shared types: named export (`export interface TypeName`)

### Styling

- **Tailwind CSS v4** via Vite plugin (no PostCSS config, no `tailwind.config` file)
- Theme defined in `src/index.css` using `@theme` directive (custom colors, fonts, spacing)
- Custom design tokens: `--color-accent (#FF6600)`, `--color-black (#050505)`, `--color-white (#EDEDED)`
- Fonts: `font-display` (Bebas Neue), `font-mono` (Space Mono)
- All styling via Tailwind utility classes inline -- no CSS modules, no styled-components
- Custom animations defined as `@keyframes` in `index.css` (grain, marquee, glitch, flicker, pulse-glow)

### GSAP Animations

- Register plugins at module level: `gsap.registerPlugin(ScrollTrigger)`
- Wrap animations in `useEffect` using `gsap.context()` scoped to a section ref
- Always clean up: `return () => ctx.revert()`
- Use `data-*` attributes for animation targeting (e.g., `data-bass="heavy"`, `data-hero-first`)
- Standard ScrollTrigger: `toggleActions: "play none none reverse"`

```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from("[data-about-word]", {
      scrollTrigger: { trigger: sectionRef.current, toggleActions: "play none none reverse" },
      opacity: 0,
      y: 40,
      stagger: 0.08,
    });
  }, sectionRef);
  return () => ctx.revert();
}, []);
```

### Error Handling

- Use early-return guard clauses instead of try/catch: `if (!sectionRef.current) return`
- Null-check refs before DOM operations inside `useEffect` and event handlers
- Use `<Suspense fallback={null}>` for lazy-loaded components
- No error boundaries exist; add one if introducing async data fetching

### State Management

- Local `useState` only -- no global state library
- `useRef` for DOM references (GSAP targets) and mutable non-rendering data (mouse position)
- Static data imported directly from `src/data/` files -- no API calls or fetching

### Comments

- Use `//` inline comments to describe what code sections do
- Use `{/* ... */}` in JSX to label UI sections
- JSDoc (`/** ... */`) for complex utility hooks explaining the system design
