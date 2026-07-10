/** Scroll utilities.
 *  Everyday scrolling (wheel/trackpad/touch) is fully native.
 *  Anchor jumps use a short fixed-duration ease (250-550ms) written
 *  with behavior:"instant" so no CSS/browser smoothing can stack on
 *  top of it, which keeps navigation snappy on any page length. */
const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

function maxScroll() {
  return document.documentElement.scrollHeight - window.innerHeight;
}

/** Kept as a no-op so existing call sites don't need to change. */
export function initSmoothScroll(_isMenuOpen: () => boolean) {
  void _isMenuOpen;
}

let animToken = 0;

export function scrollToId(id: string) {
  const el = document.getElementById(id.replace(/^#/, ""));
  if (!el) return;
  const y = clamp(el.getBoundingClientRect().top + window.scrollY - 8, 0, maxScroll());

  if (reduceMotion) {
    window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
    return;
  }

  const startY = window.scrollY;
  const dist = y - startY;
  if (Math.abs(dist) < 2) return;

  // short and distance-aware: nearby sections snap fast, far ones cap at 550ms
  const duration = clamp(Math.abs(dist) * 0.06, 250, 550);
  const t0 = performance.now();
  const token = ++animToken; // a newer click cancels the previous animation
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  const step = (now: number) => {
    if (token !== animToken) return;
    const p = clamp((now - t0) / duration, 0, 1);
    window.scrollTo({ top: startY + dist * ease(p), behavior: "instant" as ScrollBehavior });
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export { reduceMotion, clamp };
