import { useEffect } from "react";
import gsap from "gsap";
import { musicController } from "@/hooks/useMusicPlayer";

const BAR_BEATS = 4;
const METER_STEPS = 12;
const METER_PEAK_KICK = 80;
const METER_PEAK_SNARE = 60;

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
    musicController.init();

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
        "--glitch-slice": "100%",
        "--glitch-fill": "0%",
        "--glitch-glow": 0,
        "--glitch-ghost-opacity": 0,
      });
    }

    const stepsUp = `steps(${METER_STEPS})`;
    const stepsDown = `steps(${METER_STEPS})`;
    let meterTween: gsap.core.Timeline | null = null;

    // Animate VU meter: fast climb up in steps, slower fall down in steps
    const fireMeter = (peakFill: number, riseTime: number, holdTime: number, fallTime: number) => {
      if (!glitchEl) return;
      if (meterTween) meterTween.kill();

      meterTween = gsap.timeline();
      // Rise: segments light up from bottom to peak
      meterTween.to(glitchEl, {
        "--glitch-fill": `${peakFill}%`,
        "--glitch-glow": 0.5,
        duration: riseTime,
        ease: stepsUp,
        overwrite: "auto",
      }, 0);
      // Hold at peak briefly
      // Fall: segments drop back down to 0
      meterTween.to(glitchEl, {
        "--glitch-fill": "0%",
        "--glitch-glow": 0,
        duration: fallTime,
        ease: stepsDown,
        overwrite: "auto",
      }, riseTime + holdTime);
    };

    const kick = () => {
      const tl = gsap.timeline();

      // VU meter: fast rise to peak, slow segmented fall
      fireMeter(METER_PEAK_KICK, 0.08, 0.06, 0.55);

      if (main) {
        tl.to(main, { x: 3, rotation: 0.15, duration: 0.04, ease: "power4.in", overwrite: "auto" }, 0);
        tl.to(main, { x: -1.5, rotation: -0.06, duration: 0.06, ease: "power2.out", overwrite: "auto" }, 0.04);
        tl.to(main, { x: 0, rotation: 0, duration: 0.14, ease: "power2.out", overwrite: "auto" }, 0.1);
      }

      tl.to(flashEl, { opacity: 1, duration: 0.06, ease: "power4.in", overwrite: "auto" }, 0);
      tl.to(flashEl, { opacity: 0, duration: 0.5, ease: "power3.out", overwrite: "auto" }, 0.06);

      if (heavy.length) {
        tl.to(heavy, {
          keyframes: [
            { scaleY: 1.08, scaleX: 0.95, skewX: 2.5, rotation: 0.3, duration: 0.06, ease: "power4.in" },
            { scaleY: 0.97, scaleX: 1.02, skewX: -0.8, rotation: -0.1, duration: 0.09, ease: "power2.out" },
            { scaleY: 1, scaleX: 1, skewX: 0, rotation: 0, duration: 0.3, ease: "elastic.out(1, 0.3)" },
          ],
          overwrite: "auto",
        }, 0);
        tl.set(heavy, {
          filter: "drop-shadow(6px 0 0 rgba(255,20,20,0.8)) drop-shadow(-6px 0 0 rgba(20,60,255,0.8))",
        }, 0);
        tl.set(heavy, {
          filter: "drop-shadow(2px 0 0 rgba(255,20,20,0.3)) drop-shadow(-2px 0 0 rgba(20,60,255,0.3))",
        }, 0.09);
        tl.set(heavy, { filter: "none" }, 0.18);
      }

      if (glitchEl) {
        tl.to(glitchEl, {
          "--glitch-dx": "12px",
          "--glitch-dy": "-4px",
          "--glitch-slice": "42%",
          "--glitch-ghost-opacity": 0.9,
          duration: 0.05,
          ease: "power4.in",
          overwrite: "auto",
        }, 0);
        tl.to(glitchEl, {
          "--glitch-dx": "-4px",
          "--glitch-dy": "2px",
          "--glitch-slice": "68%",
          "--glitch-ghost-opacity": 0.45,
          duration: 0.08,
          ease: "power2.out",
          overwrite: "auto",
        }, 0.05);
        tl.to(glitchEl, {
          "--glitch-dx": "0px",
          "--glitch-dy": "0px",
          "--glitch-slice": "100%",
          "--glitch-ghost-opacity": 0,
          duration: 0.3,
          ease: "elastic.out(1, 0.3)",
          overwrite: "auto",
        }, 0.13);
      }

      if (medium.length) {
        tl.to(medium, {
          keyframes: [
            { scaleY: 1.05, scaleX: 0.97, skewX: 1.5, duration: 0.06, ease: "power4.in" },
            { scaleY: 0.98, skewX: -0.3, scaleX: 1.01, duration: 0.08, ease: "power2.out" },
            { scaleY: 1, scaleX: 1, skewX: 0, duration: 0.25, ease: "elastic.out(1, 0.35)" },
          ],
          overwrite: "auto",
        }, 0.01);
        tl.set(medium, {
          filter: "drop-shadow(3px 0 0 rgba(255,20,20,0.6)) drop-shadow(-3px 0 0 rgba(20,60,255,0.6))",
        }, 0.01);
        tl.set(medium, {
          filter: "drop-shadow(1px 0 0 rgba(255,20,20,0.2)) drop-shadow(-1px 0 0 rgba(20,60,255,0.2))",
        }, 0.08);
        tl.set(medium, { filter: "none" }, 0.14);
      }

      if (light.length) {
        tl.to(light, {
          keyframes: [
            { scaleY: 1.03, skewX: 0.8, duration: 0.05, ease: "power3.in" },
            { scaleY: 1, skewX: 0, duration: 0.2, ease: "power2.out" },
          ],
          overwrite: "auto",
        }, 0.025);
      }
    };

    const snare = () => {
      const tl = gsap.timeline();

      // VU meter: slightly lower peak, same segmented behaviour
      fireMeter(METER_PEAK_SNARE, 0.06, 0.04, 0.45);

      if (main) {
        tl.to(main, { y: 2, duration: 0.03, ease: "power4.in", overwrite: "auto" }, 0);
        tl.to(main, { y: -0.8, duration: 0.05, ease: "power2.out", overwrite: "auto" }, 0.03);
        tl.to(main, { y: 0, duration: 0.12, ease: "power2.out", overwrite: "auto" }, 0.08);
      }

      tl.to(flashEl, { opacity: 0.6, duration: 0.05, ease: "power4.in", overwrite: "auto" }, 0);
      tl.to(flashEl, { opacity: 0, duration: 0.4, ease: "power3.out", overwrite: "auto" }, 0.05);

      if (heavy.length) {
        tl.to(heavy, {
          keyframes: [
            { scaleX: 1.06, scaleY: 0.96, skewX: -2, rotation: -0.2, duration: 0.05, ease: "power4.in" },
            { scaleX: 0.98, scaleY: 1.01, skewX: 0.5, rotation: 0.1, duration: 0.08, ease: "power2.out" },
            { scaleX: 1, scaleY: 1, skewX: 0, rotation: 0, duration: 0.28, ease: "elastic.out(1, 0.4)" },
          ],
          overwrite: "auto",
        }, 0);
        tl.set(heavy, {
          filter: "drop-shadow(-5px 0 0 rgba(255,20,20,0.7)) drop-shadow(5px 0 0 rgba(20,60,255,0.7))",
        }, 0);
        tl.set(heavy, {
          filter: "drop-shadow(-2px 0 0 rgba(255,20,20,0.3)) drop-shadow(2px 0 0 rgba(20,60,255,0.3))",
        }, 0.08);
        tl.set(heavy, { filter: "none" }, 0.16);
      }

      if (glitchEl) {
        tl.to(glitchEl, {
          "--glitch-dx": "-8px",
          "--glitch-dy": "-3px",
          "--glitch-slice": "50%",
          "--glitch-ghost-opacity": 0.7,
          duration: 0.05,
          ease: "power4.in",
          overwrite: "auto",
        }, 0);
        tl.to(glitchEl, {
          "--glitch-dx": "2px",
          "--glitch-dy": "1px",
          "--glitch-slice": "78%",
          "--glitch-ghost-opacity": 0.32,
          duration: 0.07,
          ease: "power2.out",
          overwrite: "auto",
        }, 0.05);
        tl.to(glitchEl, {
          "--glitch-dx": "0px",
          "--glitch-dy": "0px",
          "--glitch-slice": "100%",
          "--glitch-ghost-opacity": 0,
          duration: 0.25,
          ease: "elastic.out(1, 0.4)",
          overwrite: "auto",
        }, 0.12);
      }

      if (medium.length) {
        tl.to(medium, {
          keyframes: [
            { scaleX: 1.035, scaleY: 0.98, skewX: -1, duration: 0.05, ease: "power3.in" },
            { scaleX: 1, scaleY: 1, skewX: 0, duration: 0.22, ease: "elastic.out(1, 0.4)" },
          ],
          overwrite: "auto",
        }, 0.01);
        tl.set(medium, {
          filter: "drop-shadow(-2px 0 0 rgba(255,20,20,0.5)) drop-shadow(2px 0 0 rgba(20,60,255,0.5))",
        }, 0.01);
        tl.set(medium, { filter: "none" }, 0.11);
      }

      if (light.length) {
        tl.to(light, {
          keyframes: [
            { scaleX: 1.02, skewX: -0.5, duration: 0.04, ease: "power2.in" },
            { scaleX: 1, skewX: 0, duration: 0.18, ease: "power2.out" },
          ],
          overwrite: "auto",
        }, 0.02);
      }
    };

    const ghostPulse = () => {
      const tl = gsap.timeline();

      tl.to(flashEl, { opacity: 0.28, duration: 0.03, ease: "power2.in", overwrite: "auto" }, 0);
      tl.to(flashEl, { opacity: 0, duration: 0.22, ease: "power2.out", overwrite: "auto" }, 0.03);

      if (heavy.length) {
        tl.to(heavy, {
          keyframes: [
            { scale: 1.015, duration: 0.04, ease: "power2.in" },
            { scale: 1, duration: 0.16, ease: "power2.out" },
          ],
          overwrite: "auto",
        }, 0);
      }

      if (medium.length) {
        tl.to(medium, {
          keyframes: [
            { scale: 1.018, duration: 0.04, ease: "power2.in" },
            { scale: 1, duration: 0.16, ease: "power2.out" },
          ],
          overwrite: "auto",
        }, 0.01);
      }

      if (light.length) {
        tl.to(light, {
          keyframes: [
            { scale: 1.025, duration: 0.03, ease: "power2.in" },
            { scale: 1, duration: 0.14, ease: "power2.out" },
          ],
          overwrite: "auto",
        }, 0.015);
      }
    };

    let frameId = 0;
    let lastBeat = musicController.getBeatState().beatIndex;

    const tick = () => {
      const beatState = musicController.getBeatState();

      if (!beatState.isPlaying) {
        lastBeat = beatState.beatIndex;
        frameId = window.requestAnimationFrame(tick);
        return;
      }

      if (beatState.beatIndex !== lastBeat) {
        lastBeat = beatState.beatIndex;

        switch (beatState.beatInBar % BAR_BEATS) {
          case 0:
            kick();
            break;
          case 2:
            snare();
            break;
          default:
            ghostPulse();
        }
      }

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    // ── Cleanup ──
    return () => {
      window.cancelAnimationFrame(frameId);
      if (meterTween) meterTween.kill();
      gsap.set(all, { clearProps: "transform,filter" });
      if (main) gsap.set(main, { clearProps: "transform" });
      if (glitchEl) {
        gsap.set(glitchEl, {
          "--glitch-dx": "0px",
          "--glitch-dy": "0px",
          "--glitch-slice": "100%",
          "--glitch-fill": "0%",
          "--glitch-glow": 0,
          "--glitch-ghost-opacity": 0,
        });
      }
      flashEl.remove();
    };
  }, []);
}
