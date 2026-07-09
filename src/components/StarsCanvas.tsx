import { useEffect, useRef } from "react";
import { reduceMotion } from "@/lib/scroll";

/** Ambient drifting specks (theme-aware), ported from the site engine. */
export function StarsCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let stars: { x: number; y: number; r: number; s: number; p: number }[] = [];
    let W = 0, H = 0, raf = 0;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      stars = Array.from({ length: Math.round((W * H) / 16000) }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        r: 0.6 + Math.random() * 1.4,
        s: 0.05 + Math.random() * 0.2,
        p: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      const dark = document.documentElement.getAttribute("data-theme") === "dark";
      for (const st of stars) {
        const alpha = 0.25 + 0.6 * Math.abs(Math.sin(st.p + t * 0.0006 * st.s * 10));
        ctx.fillStyle = (dark ? "rgba(235,236,240," : "rgba(17,19,24,") + (alpha * 0.45).toFixed(2) + ")";
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fill();
        st.y -= st.s;
        if (st.y < -2) st.y = H + 2;
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reduceMotion) raf = requestAnimationFrame(draw);
    else draw(0);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className={className} aria-hidden />;
}
