/** Scroll utilities.
 *
 *  Normal scrolling (wheel/trackpad/touch) is left entirely native —
 *  the browser's own scroll handling is far smoother and more
 *  responsive than any JS re-implementation. A lightweight lerp
 *  animation is used only for programmatic jumps (nav links, "back to
 *  top", step arrows) via `scrollToId`, so those still feel smooth
 *  without touching everyday scrolling at all. */
const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

function maxScroll() {
  return document.documentElement.scrollHeight - window.innerHeight;
}

const anim = { running: false, target: 0 };

function animLoop() {
  const current = window.scrollY;
  const next = current + (anim.target - current) * 0.18;
  if (Math.abs(anim.target - next) < 0.5) {
    window.scrollTo(0, anim.target);
    anim.running = false;
    return;
  }
  window.scrollTo(0, next);
  requestAnimationFrame(animLoop);
}

/** No-op kept so existing call sites don't need to change; normal
 *  scrolling is native now, so there is nothing to initialize. */
export function initSmoothScroll(_isMenuOpen: () => boolean) {
  void _isMenuOpen;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id.replace(/^#/, ""));
  if (!el) return;
  const y = clamp(el.getBoundingClientRect().top + window.scrollY - 8, 0, maxScroll());
  if (reduceMotion) {
    window.scrollTo(0, y);
    return;
  }
  anim.target = y;
  if (!anim.running) {
    anim.running = true;
    requestAnimationFrame(animLoop);
  }
}

export { reduceMotion, clamp };
