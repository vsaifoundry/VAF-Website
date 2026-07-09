/** Inertial wheel scroll + smooth anchor scrolling (ported 1:1 from the
 *  original site engine). Import `initSmoothScroll` once; use `scrollToId`
 *  for anchors. */
const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

const smooth = {
  target: 0,
  current: 0,
  running: false,
  enabled: false,
};

function maxScroll() {
  return document.documentElement.scrollHeight - window.innerHeight;
}

function smoothLoop() {
  smooth.current += (smooth.target - smooth.current) * 0.085;
  if (Math.abs(smooth.target - smooth.current) < 0.4) {
    smooth.current = smooth.target;
    smooth.running = false;
    window.scrollTo(0, smooth.current);
    return;
  }
  window.scrollTo(0, smooth.current);
  requestAnimationFrame(smoothLoop);
}

function startSmooth() {
  if (!smooth.running) {
    smooth.running = true;
    requestAnimationFrame(smoothLoop);
  }
}

let initialized = false;

export function initSmoothScroll(isMenuOpen: () => boolean) {
  if (initialized) return;
  initialized = true;
  smooth.enabled = !reduceMotion && !("ontouchstart" in window);
  smooth.target = window.scrollY;
  smooth.current = window.scrollY;
  if (!smooth.enabled) return;

  window.addEventListener(
    "wheel",
    (e: WheelEvent) => {
      if (isMenuOpen()) return;
      if (e.ctrlKey) return; // let pinch-zoom through
      e.preventDefault();
      smooth.target = clamp(smooth.target + e.deltaY, 0, maxScroll());
      startSmooth();
    },
    { passive: false },
  );
  // keep in sync when the user scrolls by other means
  window.addEventListener(
    "scroll",
    () => {
      if (!smooth.running) {
        smooth.target = window.scrollY;
        smooth.current = window.scrollY;
      }
    },
    { passive: true },
  );
}

export function scrollToId(id: string) {
  const el = document.getElementById(id.replace(/^#/, ""));
  if (!el) return;
  const y = clamp(el.getBoundingClientRect().top + window.scrollY - 8, 0, maxScroll());
  if (!smooth.enabled) {
    window.scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" });
    return;
  }
  smooth.target = y;
  startSmooth();
}

export { reduceMotion, clamp };
