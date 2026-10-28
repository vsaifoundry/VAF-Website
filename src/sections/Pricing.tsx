import { SectionIntro, ScrollLink, CheckIcon, ArrowIcon } from "@/components/ui";
import { SecFoot } from "@/components/SecFoot";
import { StackVis } from "@/components/visuals";
import { useLang } from "@/lib/i18n";
import type { Dict } from "@/data/translations";

/* October 2026 service menu. Prices and tones stay the same in every
   language; all wording lives in src/data/translations.ts (pricing). */
const PACKAGES = [
  { tone: "blue", layers: 1, amount: "349", unit: "month" },
  { tone: "yellow", layers: 2, amount: "799", unit: "month" },
  { tone: "red", layers: 3, amount: "1,799", unit: "month" },
  { tone: "brand", layers: 4, amount: "3,999", unit: "project" },
] as const;

function PackageRow({
  meta, plan,
}: { meta: (typeof PACKAGES)[number]; plan: Dict["pricing"]["plans"][number] }) {
  const { t } = useLang();
  return (
    <div className="price-row pkg-row reveal" data-tone={meta.tone}>
      <div className="card p-img">
        <span className="p-kicker">{plan.kicker}</span>
        <span className="p-name">{plan.name}</span>
        <span className="p-for">{plan.forWho}</span>
        <StackVis layers={meta.layers} />
      </div>
      <div className="card p-price">
        <span className="cell-label">{t.pricing.price}</span>
        <span className="p-amount">RM&nbsp;<b>{meta.amount}</b></span>
        <span className="p-unit">{meta.unit === "month" ? t.pricing.perMonth : t.pricing.perProject}</span>
      </div>
      <div className="card p-deliver">
        <span className="cell-label">{t.pricing.deliver}</span>
        <span className="p-get">{plan.deliverable}</span>
      </div>
      <div className="card p-features">
        <ul>
          {plan.features.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </div>
      <div className="card p-cta">
        <ScrollLink to="contact" className="btn btn-solid"><CheckIcon />{plan.cta}</ScrollLink>
      </div>
    </div>
  );
}

export function Pricing() {
  const { t } = useLang();
  const p = t.pricing;
  return (
    <section className="section" id="pricing">
      <div className="container">
        <h2 className="sec-title reveal">{p.secTitle}</h2>
        <SectionIntro num="006" statement={p.statement} aside={p.aside} />

        <div className="price-rows">
          {PACKAGES.map((meta, i) => (
            <PackageRow key={meta.tone} meta={meta} plan={p.plans[i]} />
          ))}
        </div>

        <div className="pkg-extra">
          <div className="card pkg-compare reveal">
            <h3>{p.compareTitle}</h3>
            <table>
              <thead>
                <tr>{p.compareHead.map((h) => <th key={h} scope="col">{h}</th>)}</tr>
              </thead>
              <tbody>
                {p.compare.map(([name, price, get], i) => (
                  <tr key={name} data-tone={PACKAGES[i].tone}>
                    <th scope="row"><i aria-hidden />{name}</th>
                    <td>{price}</td>
                    <td>{get}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pkg-addons">
            <div className="pkg-addons-head reveal">
              <h3>{p.addonsTitle}</h3>
              <p>{p.addonsSub}</p>
            </div>
            <div className="pkg-addons-grid">
              {p.addons.map((a) => (
                <article key={a.title} className="card pkg-addon reveal">
                  <h4>{a.title}</h4>
                  <p>{a.copy}</p>
                  <ScrollLink to="contact" className="pkg-addon-link">{p.addonCta}<ArrowIcon /></ScrollLink>
                </article>
              ))}
            </div>
          </div>

          <p className="pkg-fine reveal">{p.fine}</p>
        </div>

        <SecFoot active={5} text={p.cta} to="contact" />
      </div>
    </section>
  );
}
