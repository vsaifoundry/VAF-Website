import { useState } from "react";
import { StarsCanvas } from "@/components/StarsCanvas";
import { ScrollLink, ArrowIcon, InstagramIcon, SpinBadge } from "@/components/ui";
import { makeSubmitHandler, field } from "@/lib/forms";
import { INSTAGRAM } from "@/lib/config";
import { useLang } from "@/lib/i18n";
import type { Dict } from "@/data/translations";

const LINK_IDS = [
  "work", "showcase", "services", "process", "statistics", "pricing",
  "faq", "advisors", "team", "founding", "reviews", "labs", "audit",
] as const;

export function BrandBand() {
  return (
    <div className="brand-band" aria-hidden>
      <div className="brand-track">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i}>V's AI Foundry<sup>®</sup></span>
        ))}
      </div>
    </div>
  );
}

export function Footer() {
  const { t } = useLang();
  const ft = t.footer;
  const [note, setNote] = useState("");
  const submit = makeSubmitHandler(
    "leads",
    (f) => ({
      name: field(f, "name"),
      email: field(f, "email"),
      phone: field(f, "phone") || null,
      business_name: field(f, "company") || null,
      business_type: field(f, "business_type"),
      budget_range: field(f, "budget_range"),
      challenge: field(f, "message"),
      source: "landing_contact",
    }),
    { ...t.forms, success: ft.success },
    setNote,
  );

  return (
    <footer className="footer" id="contact">
      <StarsCanvas className="stars" />
      <div className="container">
        <h2 className="lets-talk reveal">{ft.lets}</h2>

        <div className="foot-grid">
          <div className="card foot-follow reveal">
            <h3>{ft.follow}</h3>
            <div className="foot-socials">
              <a href={INSTAGRAM} target="_blank" rel="noopener" aria-label="Instagram">
                <InstagramIcon />
              </a>
            </div>
          </div>

          <div className="card foot-form reveal">
            <h3>{ft.formTitle}</h3>
            <p>{ft.formSub}</p>
            <form noValidate onSubmit={submit}>
              <input type="text" name="name" placeholder={ft.name} required />
              <input type="email" name="email" placeholder={ft.email} required />
              <input type="text" name="phone" placeholder={ft.phone} />
              <input type="text" name="company" placeholder={ft.company} />
              <select name="business_type" required defaultValue="">
                <option value="" disabled>{ft.typeLabel}</option>
                {ft.types.map((o) => <option key={o}>{o}</option>)}
              </select>
              <select name="budget_range" required defaultValue="">
                <option value="" disabled>{ft.budgetLabel}</option>
                {ft.budgets.map((o) => <option key={o}>{o}</option>)}
              </select>
              <textarea name="message" rows={4} placeholder={ft.message} required />
              <button className="btn btn-solid" type="submit">
                <ArrowIcon />{ft.btn}
              </button>
              <span className="form-note">{note}</span>
            </form>
          </div>

          <div className="card foot-offer reveal">
            <h3>{ft.offerTitle}</h3>
            <ul>
              {ft.offer.map((o) => <li key={o}>{o}</li>)}
            </ul>
          </div>

          <div className="card foot-tag reveal">
            <SpinBadge inline />
            <p>{ft.tagline}</p>
            <a className="foot-mail" href={INSTAGRAM} target="_blank" rel="noopener">@vsaifoundry</a>
          </div>
        </div>

        <div className="foot-bottom reveal">
          <nav className="foot-links">
            {LINK_IDS.map((to) => (
              <ScrollLink key={to} to={to}>{t.nav[to as keyof Dict["nav"]]}</ScrollLink>
            ))}
          </nav>
          <div className="foot-legal">
            <span>{t.common.legal}</span>
            <ScrollLink to="home" className="to-top">
              {t.common.backToTop}
              <svg viewBox="0 0 16 16" className="ic">
                <path d="M8 14V3M3.5 7.2 8 2.7l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </ScrollLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
