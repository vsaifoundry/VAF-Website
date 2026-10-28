import { useEffect } from "react";
import { reduceMotion } from "@/lib/scroll";

/** Cards that gently tilt toward the pointer and catch a soft spotlight. */
const TILT = ".card-featured, .card-suite, .card-product, .labs-card, .cb-card, .show-stage";
/** Primary buttons that lean a few pixels toward the pointer. */
const MAGNET = ".btn-solid, .btn-arrow.solid, .hero-cta .btn";

const MAX_TILT = 5;   // degrees
const MAX_PULL = 6;   // pixels

/** Page-level pointer interactions. Desktop (fine pointer + hover) only,
 *  and switched off entirely for people who prefer reduced motion.
 *  Uses event delegation, so cards rendered later (tabs, carousels)
 *  pick it up without extra wiring. */
export function useInteractions() {
  useEffect(() => {
    if (reduceMotion) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let tiltEl: HTMLElement | null = null;
    let magnetEl: HTMLElement | null = null;
    let raf = 0;
    let last: PointerEvent | null = null;

    // a card still sliding in on reveal owns its transform until it lands
    const ready = (el: HTMLElement) => !el.classList.contains("reveal") || el.classList.contains("in");

    const release = (el: HTMLElement | null) => {
      if (!el) return;
      el.style.transition = "";
      el.style.transform = "";
      el.classList.remove("is-tilting");
    };

    const paint = () => {
      raf = 0;
      const e = last;
      if (!e) return;
      const target = e.target as Element | null;

      const card = target?.closest<HTMLElement>(TILT) ?? null;
      if (card !== tiltEl) { release(tiltEl); tiltEl = card; }
      if (card && ready(card)) {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;   // 0..1
        const py = (e.clientY - r.top) / r.height;   // 0..1
        card.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
        card.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
        // big cards tilt less so they don't feel like they're falling over
        const scale = Math.min(1, 420 / Math.max(r.width, r.height));
        const ry = (px - 0.5) * 2 * MAX_TILT * scale;
        const rx = (0.5 - py) * 2 * MAX_TILT * scale;
        card.style.transition = "transform .18s ease-out";
        card.style.transform = `perspective(1100px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
        card.classList.add("is-tilting");
      }

      const btn = target?.closest<HTMLElement>(MAGNET) ?? null;
      if (btn !== magnetEl) { release(magnetEl); magnetEl = btn; }
      if (btn) {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        btn.style.transition = "transform .15s ease-out";
        btn.style.transform = `translate(${(dx * MAX_PULL).toFixed(1)}px, ${(dy * MAX_PULL * 0.6).toFixed(1)}px)`;
      }
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onLeave = () => { release(tiltEl); release(magnetEl); tiltEl = magnetEl = null; };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      if (raf) cancelAnimationFrame(raf);
      onLeave();
    };
  }, []);
}
