import { useEffect, useRef } from "react";
import { reduceMotion } from "@/lib/scroll";

/** Counts an element from 0 to `to` when it first becomes visible. */
export function useCountUp(to: number, opts?: { suffix?: string; prefix?: string; decimals?: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { suffix = "", prefix = "", decimals = 0 } = opts || {};
    const render = (v: number) => { el.textContent = prefix + v.toFixed(decimals) + suffix; };
    if (reduceMotion) { render(to); return; }
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(), dur = 1400;
      const step = (t: number) => {
        const p = Math.min((t - t0) / dur, 1);
        render(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return ref;
}
