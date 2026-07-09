import type { ReactNode } from "react";
import { SectionIntro, ScrollLink, ArrowIcon, DotsIc, DotGrid, Count } from "@/components/ui";
import { SecFoot } from "@/components/SecFoot";
import { ChatVis, BlueprintVis, BrowserVis, CreativeVis } from "@/components/visuals";
import { useLang } from "@/lib/i18n";

const PRODUCT_VIS: { vis: ReactNode; light: boolean; onlight?: boolean }[] = [
  { vis: <BlueprintVis />, light: true },
  { vis: <BrowserVis />, light: false, onlight: true },
  { vis: <CreativeVis />, light: true },
];

export function Work() {
  const { t } = useLang();
  return (
    <section className="section" id="work">
      <div className="container">
        <h2 className="sec-title reveal">{t.work.secTitle}</h2>
        <SectionIntro num="001" statement={t.work.statement} aside={t.work.aside} />

        <div className="work-grid">
          <article className="card card-featured reveal">
            <ChatVis />
            <div className="card-top">
              <div>
                <span className="card-kicker light">{t.work.kicker}</span>
                <h3 className="card-title light">{t.work.featuredTitle}</h3>
              </div>
              <DotsIc light />
            </div>
            <p className="card-note light">{t.work.featuredNote}</p>
            <ScrollLink to="services" className="btn-arrow bottom-left" aria-label={t.work.featuredTitle}>
              <ArrowIcon />
            </ScrollLink>
          </article>

          <aside className="card card-suite reveal">
            <div className="suite-head">
              <span>{t.work.lineup}</span><i className="rule" />
              <span className="count"><Count to={4} />/4</span>
            </div>
            <h3 className="suite-title">{t.work.suiteTitle}</h3>
            <p className="suite-copy">{t.work.suiteCopy}</p>
            <DotGrid rows={4} cols={5} />
            <div className="suite-foot">
              <span className="toggle-ic"><i /></span> {t.work.suiteFoot}
            </div>
          </aside>

          {PRODUCT_VIS.map((p, i) => (
            <article key={i} className={`card card-product${p.onlight ? " card-onlight" : ""} reveal`}>
              {p.vis}
              <div className="card-top">
                <h3 className={`card-title${p.light ? " light" : ""}`}>{t.work.products[i]}</h3>
                <DotsIc light={p.light} />
              </div>
              <ScrollLink to="services" className="btn-arrow bottom-left" aria-label={t.work.products[i]}>
                <ArrowIcon />
              </ScrollLink>
            </article>
          ))}
        </div>

        <SecFoot active={0} text={t.work.cta} to="services" />
      </div>
    </section>
  );
}
