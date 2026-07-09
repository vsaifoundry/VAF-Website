import { useEffect } from "react";
import { clamp } from "@/lib/scroll";

/** Scroll-driven word fill for [data-fill] elements. The words are
 *  rendered by React (<FillWords/>); this hook only toggles `.lit`.
 *  Re-runs when `dep` (the active language) changes so it picks up
 *  the freshly rendered spans. */
export function useFillTitles(dep?: unknown) {
  useEffect(() => {
    type F = { el: HTMLElement; words: HTMLElement[]; hero: boolean; loadP?: number };
    const fills: F[] = Array.from(
      document.querySelectorAll<HTMLElement>("[data-fill]"),
    ).map((el) => ({
      el,
      words: Array.from(el.querySelectorAll<HTMLElement>(".w")),
      hero: el.hasAttribute("data-fill-hero"),
    }));

    let raf = 0;
    let alive = true;

    const update = () => {
      const vh = window.innerHeight;
      fills.forEach((f) => {
        let p: number;
        if (f.hero) {
          p = f.loadP !== undefined ? f.loadP : 0;
        } else {
          const r = f.el.getBoundingClientRect();
          const start = vh * 0.92, end = vh * 0.38;
          p = clamp((start - r.top) / (start - end), 0, 1);
        }
        const lit = Math.round(p * f.words.length);
        f.words.forEach((w, i) => w.classList.toggle("lit", i < lit));
      });
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    const hero = fills.find((f) => f.hero);
    if (hero) {
      let t = 0;
      const grow = () => {
        if (!alive) return;
        t += 0.035;
        hero.loadP = Math.min(t, 1);
        update();
        if (t < 1) requestAnimationFrame(grow);
      };
      requestAnimationFrame(grow);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      alive = false;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [dep]);
}
