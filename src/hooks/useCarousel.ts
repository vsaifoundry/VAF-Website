import { useState } from "react";
import { reduceMotion } from "@/lib/scroll";

/** Shared fade-swap carousel state (380ms, matches the CSS .fade timing). */
export function useCarousel(len: number) {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const go = (n: number) => {
    const t = ((n % len) + len) % len;
    if (t === idx) return;
    if (reduceMotion) { setIdx(t); return; }
    setFading(true);
    setTimeout(() => { setIdx(t); setFading(false); }, 380);
  };
  return { idx, go, fading };
}
