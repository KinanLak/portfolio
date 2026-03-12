import { useEffect } from "react";
import gsap from "gsap";

// ── Rhythm config ──────────────────────────────────
// 130 BPM — classic electronic / bass music tempo
const BPM = 130 ;
const BEAT = 60 / BPM; // ~0.462s per beat

/**
 * Rhythmic "bass pulse" system — layers stacked on every beat:
 *
 *   1. Transform distortion    (scale / skew / rotation)  — GPU transform
 *   2. Chromatic aberration    (red/blue RGB split)       — GPU filter
 *   3. Screen-wide flash       (orange radial glow)       — GPU opacity
 *   4. Glitch burst on name    (displacement + clip)      — CSS vars
 *   5. Screen shake            (page micro-tremor)        — GPU transform
 *
 * Pattern (4/4 time, loops every bar):
 *   Beat 1 — KICK  : heavy vertical punch
 *   Beat 3 — SNARE : sharp horizontal snap
 */
export function useBassEffect() {
  useEffect(() => {
    const heavy = gsap.utils.toArray<HTMLElement>('[data-bass="heavy"]');
    const medium = gsap.utils.toArray<HTMLElement>('[data-bass="medium"]');
    const light = gsap.utils.toArray<HTMLElement>('[data-bass="light"]');
    const all = [...heavy, ...medium, ...light];
    const main = document.querySelector("main");
    const glitchEl = document.querySelector(".glitch") as HTMLElement | null;

    if (all.length === 0) return;

    gsap.set(all, { transformOrigin: "center center", force3D: true });

    // ── Create screen flash overlay ──────────────────
    const flashEl = document.createElement("div");
    flashEl.className = "bass-flash";
    document.body.appendChild(flashEl);
    gsap.set(flashEl, { opacity: 0 });

    // ── Init glitch CSS custom properties ────────────
    if (glitchEl) {
      gsap.set(glitchEl, {
        "--glitch-dx": "0px",
        "--glitch-dy": "0px",
        "--glitch-clip": "100%",
      });
    }

    const tl = gsap.timeline({ repeat: -1, delay: 3.5 });

    // ═══════════════════════════════════════════════════
    //  BEAT 1 — KICK
    // ═══════════════════════════════════════════════════

    // ▸ Screen shake — horizontal tremor
    if (main) {
      tl.to(main, { x: 3, rotation: 0.15, duration: 0.04, ease: "power4.in" }, 0);
      tl.to(main, { x: -1.5, rotation: -0.06, duration: 0.06, ease: "power2.out" }, 0.04);
      tl.to(main, { x: 0, rotation: 0, duration: 0.14, ease: "power2.out" }, 0.10);
    }

    // ▸ Screen flash — warm orange glow
    tl.to(flashEl, { opacity: 1, duration: 0.06, ease: "power4.in" }, 0);
    tl.to(flashEl, { opacity: 0, duration: 0.5, ease: "power3.out" }, 0.06);

    // ▸ Heavy (h1 / name) — big punch + RGB split
    if (heavy.length) {
      tl.to(heavy, {
        keyframes: [
          { scaleY: 1.08, scaleX: 0.95, skewX: 2.5, rotation: 0.3, duration: 0.06, ease: "power4.in" },
          { scaleY: 0.97, scaleX: 1.02, skewX: -0.8, rotation: -0.1, duration: 0.09, ease: "power2.out" },
          { scaleY: 1, scaleX: 1, skewX: 0, rotation: 0, duration: 0.3, ease: "elastic.out(1, 0.3)" },
        ],
      }, 0);
      // Chromatic aberration — red right, blue left
      tl.set(heavy, {
        filter: "drop-shadow(6px 0 0 rgba(255,20,20,0.8)) drop-shadow(-6px 0 0 rgba(20,60,255,0.8))",
      }, 0);
      tl.set(heavy, {
        filter: "drop-shadow(2px 0 0 rgba(255,20,20,0.3)) drop-shadow(-2px 0 0 rgba(20,60,255,0.3))",
      }, 0.09);
      tl.set(heavy, { filter: "none" }, 0.18);
    }

    // ▸ Glitch burst on "Kinan" — displacement + reveal
    if (glitchEl) {
      tl.to(glitchEl, {
        "--glitch-dx": "10px", "--glitch-dy": "4px", "--glitch-clip": "20%",
        duration: 0.06, ease: "power4.in",
      }, 0);
      tl.to(glitchEl, {
        "--glitch-dx": "-3px", "--glitch-dy": "-1px", "--glitch-clip": "50%",
        duration: 0.08, ease: "power2.out",
      }, 0.06);
      tl.to(glitchEl, {
        "--glitch-dx": "0px", "--glitch-dy": "0px", "--glitch-clip": "100%",
        duration: 0.3, ease: "elastic.out(1, 0.3)",
      }, 0.14);
    }

    // ▸ Medium (h2 section titles) — moderate + lighter aberration
    if (medium.length) {
      tl.to(medium, {
        keyframes: [
          { scaleY: 1.05, scaleX: 0.97, skewX: 1.5, duration: 0.06, ease: "power4.in" },
          { scaleY: 0.98, skewX: -0.3, scaleX: 1.01, duration: 0.08, ease: "power2.out" },
          { scaleY: 1, scaleX: 1, skewX: 0, duration: 0.25, ease: "elastic.out(1, 0.35)" },
        ],
      }, 0.01);
      tl.set(medium, {
        filter: "drop-shadow(3px 0 0 rgba(255,20,20,0.6)) drop-shadow(-3px 0 0 rgba(20,60,255,0.6))",
      }, 0.01);
      tl.set(medium, {
        filter: "drop-shadow(1px 0 0 rgba(255,20,20,0.2)) drop-shadow(-1px 0 0 rgba(20,60,255,0.2))",
      }, 0.08);
      tl.set(medium, { filter: "none" }, 0.14);
    }

    // ▸ Light (h3 sub-titles) — visible pulse
    if (light.length) {
      tl.to(light, {
        keyframes: [
          { scaleY: 1.03, skewX: 0.8, duration: 0.05, ease: "power3.in" },
          { scaleY: 1, skewX: 0, duration: 0.2, ease: "power2.out" },
        ],
      }, 0.025);
    }

    // ═══════════════════════════════════════════════════
    //  BEAT 3 — SNARE
    // ═══════════════════════════════════════════════════
    const snare = BEAT * 2;

    // ▸ Screen shake — vertical for snare
    if (main) {
      tl.to(main, { y: 2, duration: 0.03, ease: "power4.in" }, snare);
      tl.to(main, { y: -0.8, duration: 0.05, ease: "power2.out" }, snare + 0.03);
      tl.to(main, { y: 0, duration: 0.12, ease: "power2.out" }, snare + 0.08);
    }

    // ▸ Screen flash (lighter on snare)
    tl.to(flashEl, { opacity: 0.6, duration: 0.05, ease: "power4.in" }, snare);
    tl.to(flashEl, { opacity: 0, duration: 0.4, ease: "power3.out" }, snare + 0.05);

    // ▸ Heavy — horizontal snap + reversed aberration
    if (heavy.length) {
      tl.to(heavy, {
        keyframes: [
          { scaleX: 1.06, scaleY: 0.96, skewX: -2, rotation: -0.2, duration: 0.05, ease: "power4.in" },
          { scaleX: 0.98, scaleY: 1.01, skewX: 0.5, rotation: 0.1, duration: 0.08, ease: "power2.out" },
          { scaleX: 1, scaleY: 1, skewX: 0, rotation: 0, duration: 0.28, ease: "elastic.out(1, 0.4)" },
        ],
      }, snare);
      // Reversed aberration — red left, blue right
      tl.set(heavy, {
        filter: "drop-shadow(-5px 0 0 rgba(255,20,20,0.7)) drop-shadow(5px 0 0 rgba(20,60,255,0.7))",
      }, snare);
      tl.set(heavy, {
        filter: "drop-shadow(-2px 0 0 rgba(255,20,20,0.3)) drop-shadow(2px 0 0 rgba(20,60,255,0.3))",
      }, snare + 0.08);
      tl.set(heavy, { filter: "none" }, snare + 0.16);
    }

    // ▸ Glitch burst on snare — reversed direction
    if (glitchEl) {
      tl.to(glitchEl, {
        "--glitch-dx": "-8px", "--glitch-dy": "-3px", "--glitch-clip": "25%",
        duration: 0.05, ease: "power4.in",
      }, snare);
      tl.to(glitchEl, {
        "--glitch-dx": "2px", "--glitch-dy": "1px", "--glitch-clip": "55%",
        duration: 0.07, ease: "power2.out",
      }, snare + 0.05);
      tl.to(glitchEl, {
        "--glitch-dx": "0px", "--glitch-dy": "0px", "--glitch-clip": "100%",
        duration: 0.25, ease: "elastic.out(1, 0.4)",
      }, snare + 0.12);
    }

    // ▸ Medium — snap + aberration
    if (medium.length) {
      tl.to(medium, {
        keyframes: [
          { scaleX: 1.035, scaleY: 0.98, skewX: -1, duration: 0.05, ease: "power3.in" },
          { scaleX: 1, scaleY: 1, skewX: 0, duration: 0.22, ease: "elastic.out(1, 0.4)" },
        ],
      }, snare + 0.01);
      tl.set(medium, {
        filter: "drop-shadow(-2px 0 0 rgba(255,20,20,0.5)) drop-shadow(2px 0 0 rgba(20,60,255,0.5))",
      }, snare + 0.01);
      tl.set(medium, { filter: "none" }, snare + 0.11);
    }

    // ▸ Light — subtle snap
    if (light.length) {
      tl.to(light, {
        keyframes: [
          { scaleX: 1.02, skewX: -0.5, duration: 0.04, ease: "power2.in" },
          { scaleX: 1, skewX: 0, duration: 0.18, ease: "power2.out" },
        ],
      }, snare + 0.02);
    }

    // ── Pad to exactly one full bar (4 beats) ──
    tl.set({}, {}, BEAT * 4);

    // ── Cleanup ──
    return () => {
      tl.kill();
      gsap.set(all, { clearProps: "transform,filter" });
      if (main) gsap.set(main, { clearProps: "transform" });
      if (glitchEl) {
        gsap.set(glitchEl, {
          "--glitch-dx": "0px",
          "--glitch-dy": "0px",
          "--glitch-clip": "100%",
        });
      }
      flashEl.remove();
    };
  }, []);
}
