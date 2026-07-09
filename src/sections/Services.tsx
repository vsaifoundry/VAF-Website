import { useState, type ReactNode } from "react";
import { SectionIntro } from "@/components/ui";
import { SecFoot } from "@/components/SecFoot";
import { BlueprintVis, ChatVisMini, BrowserVis, CreativeVis } from "@/components/visuals";
import { useLang } from "@/lib/i18n";

const SVC_VIS: { vis: ReactNode; ic: string }[] = [
  { vis: <BlueprintVis mini />, ic: "≈" },
  { vis: <ChatVisMini />, ic: "⌘" },
  { vis: <BrowserVis mini />, ic: "◍" },
  { vis: <CreativeVis mini />, ic: "↗" },
];

export function Services() {
  const { t } = useLang();
  const [open, setOpen] = useState(0);
  return (
    <section className="section" id="services">
      <div className="container">
        <h2 className="sec-title reveal">{t.services.secTitle}</h2>
        <SectionIntro num="003" statement={t.services.statement} aside={t.services.aside} />

        <div className="services-row reveal">
          {t.services.items.map((s, i) => (
            <article
              key={i}
              className={`svc${open === i ? " open" : ""}`}
              onClick={() => setOpen(i)}
            >
              <div className="svc-head">
                <span className="svc-arrow">
                  {open === i ? (
                    <svg viewBox="0 0 16 16" className="ic"><path d="M2 8h11M9 3.5 13.5 8 9 12.5" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
                  ) : (
                    <svg viewBox="0 0 16 16" className="ic"><path d="M8 2v11M3.5 8.8 8 13.3l4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
                  )}
                </span>
                <span className="svc-no">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="svc-body">
                <h3>{s.title}</h3>
                <p>{s.copy}</p>
                <div className="svc-vis">{SVC_VIS[i].vis}</div>
              </div>
              <div className="svc-foot">
                <span className="svc-ic">{SVC_VIS[i].ic}</span>
                <span className="svc-key">{s.key}</span>
              </div>
            </article>
          ))}

          <aside className="svc-info reveal">
            <h3 className="svc-info-title">{t.services.infoTitle}</h3>
            <p className="svc-info-copy">{t.services.infoCopy}</p>
            <p className="svc-info-foot">{t.services.infoFoot}</p>
          </aside>
        </div>

        <SecFoot active={2} text={t.services.cta} to="pricing" />
      </div>
    </section>
  );
}
