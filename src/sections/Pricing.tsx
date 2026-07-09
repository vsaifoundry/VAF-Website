import { useState } from "react";
import { SectionIntro, ScrollLink, CheckIcon } from "@/components/ui";
import { SecFoot } from "@/components/SecFoot";
import { StackVis } from "@/components/visuals";
import { useLang } from "@/lib/i18n";
import type { Dict } from "@/data/translations";

/* Prices, tones and layout metadata stay constant across languages. */
const PRICE_META = [
  { tone: "blue", layers: 2, oneTime: "3,000-8,000", retainer: "800/mo", to: "audit", strongFirst: false },
  { tone: "yellow", layers: 3, oneTime: "8,000-25,000", retainer: "1,800/mo", to: "audit", strongFirst: true },
  { tone: "red", layers: 4, oneTime: "25,000+", retainer: "3,500/mo", to: "contact", strongFirst: true },
];

function PriceRow({
  meta, plan,
}: { meta: (typeof PRICE_META)[number]; plan: Dict["pricing"]["plans"][number] }) {
  const { t } = useLang();
  const [retainer, setRetainer] = useState(false);
  return (
    <div className="price-row reveal" data-tone={meta.tone}>
      <div className="card p-img">
        <span className="p-name">{plan.name}</span>
        <span className="p-for">{plan.forWho}</span>
        <StackVis layers={meta.layers} />
      </div>
      <div className="card p-price">
        <span className="cell-label">{t.pricing.price}</span>
        <span className="p-amount">RM&nbsp;<b>{retainer ? meta.retainer : meta.oneTime}</b></span>
        <label className="switch">
          <span>{t.pricing.oneTime}</span>
          <input type="checkbox" checked={retainer} onChange={(e) => setRetainer(e.target.checked)} />
          <i /><span>{t.pricing.retainer}</span>
        </label>
      </div>
      <div className="p-mid">
        <div className="card p-plan"><span className="cell-label">{t.pricing.plan}</span><span className="p-tier">{plan.plan}</span></div>
        <div className="card p-seats"><span className="cell-label">{t.pricing.support}</span><span className="p-tier">{plan.support}</span></div>
      </div>
      <div className="card p-features">
        <ul>
          {plan.features.map((f, i) => (
            <li key={f} className={meta.strongFirst && i === 0 ? "strong" : ""}>{f}</li>
          ))}
        </ul>
      </div>
      <div className="card p-cta">
        <ScrollLink to={meta.to} className="btn btn-solid"><CheckIcon />{plan.cta}</ScrollLink>
      </div>
    </div>
  );
}

export function Pricing() {
  const { t } = useLang();
  return (
    <section className="section" id="pricing">
      <div className="container">
        <h2 className="sec-title reveal">{t.pricing.secTitle}</h2>
        <SectionIntro num="006" statement={t.pricing.statement} aside={t.pricing.aside} />
        <div className="price-rows">
          {PRICE_META.map((meta, i) => (
            <PriceRow key={meta.tone} meta={meta} plan={t.pricing.plans[i]} />
          ))}
        </div>
        <SecFoot active={5} text={t.pricing.cta} to="contact" />
      </div>
    </section>
  );
}
