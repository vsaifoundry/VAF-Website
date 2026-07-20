import { useState } from "react";
import { SectionIntro, ScrollLink, Pillbar, PrevIcon, ArrowIcon } from "@/components/ui";
import { SecFoot } from "@/components/SecFoot";
import { Proc2D } from "@/components/visuals";
import { reduceMotion } from "@/lib/scroll";
import { useLang } from "@/lib/i18n";

const TONES = ["blue", "yellow", "red", "ink"] as const;

export function Process() {
  const { t } = useLang();
  const steps = t.process.steps;
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  const go = (next: number) => {
    const target = ((next % steps.length) + steps.length) % steps.length;
    if (target === idx) return;
    if (reduceMotion) { setIdx(target); return; }
    setFading(true);
    setTimeout(() => { setIdx(target); setFading(false); }, 380);
  };

  const s = steps[idx];

  return (
    <section className="section" id="process">
      <div className="container">
        <h2 className="sec-title reveal">{t.process.secTitle}</h2>
        <SectionIntro num="005" statement={t.process.statement} aside={t.process.aside} />

        <div className="process-grid reveal">
          <div className="proc-vis card" data-tone={TONES[idx]} data-step={idx + 1}>
            <Proc2D num={String(idx + 1).padStart(2, "0")} onAdvance={() => go(idx + 1)} />
          </div>

          <div className="proc-main">
            <div className="card proc-bar">
              <span className="proc-label">{t.process.label}</span>
              <Pillbar count={steps.length} active={idx} onSelect={go} />
            </div>
            <div className={`proc-step card${fading ? " fade" : ""}`}>
              <h3 className="proc-title">{s.title}</h3>
              <p className="proc-copy">{s.copy}</p>
              <div className="proc-stat">
                <span className="stat-big">{s.stat}</span>
                <span className="stat-unit">{s.unit}</span>
                <span className="stat-cap">{s.cap}</span>
              </div>
            </div>
          </div>

          <div className="proc-side">
            <div className="proc-nav card">
              <button className="nav-arrow" onClick={() => go(idx - 1)} aria-label="Previous step"><PrevIcon /></button>
              <button className="nav-arrow" onClick={() => go(idx + 1)} aria-label="Next step"><ArrowIcon /></button>
            </div>
            <div className="proc-demo card">
              <ScrollLink to="contact" className="btn btn-solid">
                <svg viewBox="0 0 16 16" className="ic">
                  <rect x="2" y="3" width="12" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M2 6.5h12M5.5 1.8v2.4M10.5 1.8v2.4M5.6 10.2l1.7 1.7 3.2-3.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
                {t.common.bookCall}
              </ScrollLink>
              <p>{t.process.demo}</p>
            </div>
          </div>
        </div>

        <SecFoot active={4} text={t.process.cta} to="faq" />
      </div>
    </section>
  );
}
