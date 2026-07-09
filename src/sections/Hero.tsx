import { useEffect, useRef } from "react";
import { StarsCanvas } from "@/components/StarsCanvas";
import { reduceMotion } from "@/lib/scroll";
import { useLang } from "@/lib/i18n";
import { FillWords } from "@/components/ui";

export function Hero() {
  const { t } = useLang();
  const logoRef = useRef<HTMLDivElement>(null);

  // gentle parallax on the logo scene
  useEffect(() => {
    if (reduceMotion) return;
    const el = logoRef.current;
    if (!el) return;
    let raf = 0;
    const paint = () => {
      el.style.transform = `translateY(calc(-50% + ${(window.scrollY * 0.12).toFixed(1)}px))`;
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(paint); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="hero" id="home">
      <StarsCanvas className="stars" />
      <div className="hero-blobs">
        <span className="blob b1" /><span className="blob b2" />
      </div>

      <div className="hero-logo" ref={logoRef}>
        <span className="hl-glow g1" /><span className="hl-glow g2" /><span className="hl-glow g3" />
        <span className="hl-ring r1"><i className="hl-sat" /><i className="hl-sat s2" /></span>
        <span className="hl-ring r2"><i className="hl-sat sa" /><i className="hl-sat sb" /><i className="hl-sat sc" /></span>
        <span className="hl-ring r3"><i className="hl-sat sd" /></span>
        <span className="hl-spark k1" /><span className="hl-spark k2" /><span className="hl-spark k3" />
        <span className="hl-spark k4" /><span className="hl-spark k5" /><span className="hl-spark k6" />
        <img src="/img/logo.png" alt="V's AI Foundry logo" />
      </div>

      <div className="container hero-inner">
        <h1 className="hero-title" data-fill data-fill-hero>
          <FillWords text={t.hero.title} />
        </h1>
      </div>

      <div className="hero-hint">
        <span>{t.common.heroHint}</span>
        <svg viewBox="0 0 16 16" className="ic">
          <path d="M8 2v11M3.5 8.8 8 13.3l4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </div>
    </section>
  );
}
