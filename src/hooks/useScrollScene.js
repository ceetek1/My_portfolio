import { useEffect, useState } from "react";
import { paintStops } from "../data.js";

const lerp = (a, b, t) => a + (b - a) * t;
const mix = (a, b, t) => a.map((v, i) => Math.round(lerp(v, b[i], t)));
const ease = (t) => t * t * (3 - 2 * t);

/**
 * Drives everything that follows the scroll and pointer:
 *  - CSS variables on <html>: --sy (parallax), --bob-ex/--bob-ey (Bob's eyes),
 *    --hue/--sat/--bright/--accent/--tint (the single sliding paint colour).
 *  - Which section is in view (re-renders only when it changes).
 *  - Whether the nav bar is compact.
 * Per-frame values go straight to CSS variables, so React never re-renders on scroll.
 */
export default function useScrollScene() {
  const [section, setSection] = useState("hero");
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const written = {};
    const setVar = (key, value) => {
      if (written[key] !== value) {
        written[key] = value;
        root.style.setProperty(key, value);
      }
    };

    let frame = 0;
    let lastSection = "hero";
    let lastCompact = false;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const y = window.scrollY;
      setVar("--sy", String(Math.round(y)));

      const sections = Array.from(document.querySelectorAll("[data-stop]"));
      let current = "hero";
      const centres = sections.map((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= vh * 0.5) current = el.dataset.stop;
        return { name: el.dataset.stop, centre: r.top + y + r.height / 2 };
      });

      // Blend the paint colour between the centres of neighbouring sections.
      const probe = y + vh * 0.5;
      let a = paintStops.hero;
      let b = a;
      let t = 0;
      for (let i = 0; i < centres.length; i += 1) {
        if (probe < centres[i].centre) {
          if (i === 0) a = b = paintStops[centres[0].name] || a;
          break;
        }
        a = b = paintStops[centres[i].name] || a;
        const next = centres[i + 1];
        if (next && probe < next.centre) {
          b = paintStops[next.name] || a;
          t = ease((probe - centres[i].centre) / (next.centre - centres[i].centre));
          break;
        }
      }
      setVar("--hue", `${lerp(a.hue, b.hue, t).toFixed(1)}deg`);
      setVar("--sat", lerp(a.sat, b.sat, t).toFixed(3));
      setVar("--bright", lerp(a.bright, b.bright, t).toFixed(3));
      setVar("--accent", `rgb(${mix(a.accent, b.accent, t).join(",")})`);
      setVar("--tint", mix(a.tint, b.tint, t).join(","));

      if (current !== lastSection) {
        lastSection = current;
        setSection(current);
      }
      const isCompact = y > 48;
      if (isCompact !== lastCompact) {
        lastCompact = isCompact;
        setCompact(isCompact);
      }
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const onPointer = (event) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const yy = event.clientY / window.innerHeight - 0.5;
      setVar("--bob-ex", `${(x * 12).toFixed(2)}px`);
      setVar("--bob-ey", `${(yy * 10).toFixed(2)}px`);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pointermove", onPointer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return { section, compact };
}

export function useReducedMotion() {
  const query = "(prefers-reduced-motion: reduce)";
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}
