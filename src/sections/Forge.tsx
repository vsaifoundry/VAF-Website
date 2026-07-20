import type { ReactNode } from "react";
import { SectionIntro, ScrollLink, ArrowIcon } from "@/components/ui";
import { SecFoot } from "@/components/SecFoot";
import { CodeVis, LabVis, ChipVis, SignalVis } from "@/components/visuals";
import { useLang } from "@/lib/i18n";

const LAB_VIS: ReactNode[] = [<CodeVis />, <LabVis />, <ChipVis />, <SignalVis />];

export function Forge() {
  const { t } = useLang();
  return (
    <section className="section" id="labs">
      <div className="container">
        <h2 className="sec-title reveal">{t.forge.secTitle}</h2>
        <SectionIntro num="013" statement={t.forge.statement} aside={t.forge.aside} />

        <div className="labs-grid">
          {t.forge.items.map((l, i) => (
            <article className="card labs-card reveal" key={i}>
              {LAB_VIS[i]}
              <div className="labs-meta"><span>{l.tag}</span><span>{l.price}</span></div>
              <h3 className="labs-title">{l.title}</h3>
              <ScrollLink to="contact" className="btn-arrow solid bottom-left" aria-label={l.title}>
                <ArrowIcon />
              </ScrollLink>
            </article>
          ))}
        </div>

        <SecFoot active={12} text={t.forge.cta} to="audit" />
      </div>
    </section>
  );
}
