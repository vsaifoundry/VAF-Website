import { useState } from "react";
import { SectionIntro, ArrowIcon } from "@/components/ui";
import { SecFoot } from "@/components/SecFoot";
import { makeSubmitHandler, field } from "@/lib/forms";
import { INSTAGRAM } from "@/lib/config";
import { useLang } from "@/lib/i18n";

const Opt = ({ items }: { items: string[] }) => (
  <>{items.map((o) => <option key={o}>{o}</option>)}</>
);

export function Audit() {
  const { t } = useLang();
  const a = t.audit;
  const [tab, setTab] = useState<"simple" | "detailed">("simple");
  const [noteS, setNoteS] = useState("");
  const [noteD, setNoteD] = useState("");
  const msgs = { ...t.forms, success: a.success };

  const submitSimple = makeSubmitHandler(
    "audit_requests",
    (f) => ({
      form_type: "simple",
      name: field(f, "name"),
      whatsapp: field(f, "whatsapp"),
      email: null,
      business_name: field(f, "business_name"),
      industry: field(f, "business_type"),
      company_size: null,
      tech_stack: null,
      problem_category: null,
      problem_detail: field(f, "problem_detail"),
      budget_range: null,
      contact_time: field(f, "contact_time"),
      language_pref: field(f, "language_pref") || null,
      referral_source: null,
      timeline: null,
      status: "new",
    }),
    msgs,
    setNoteS,
  );

  const submitDetailed = makeSubmitHandler(
    "audit_requests",
    (f) => ({
      form_type: "detailed",
      name: field(f, "name"),
      whatsapp: field(f, "whatsapp"),
      email: field(f, "email"),
      business_name: field(f, "business_name"),
      industry: field(f, "industry"),
      company_size: field(f, "company_size"),
      tech_stack: field(f, "tech_stack") || null,
      problem_category: field(f, "problem_category"),
      problem_detail: field(f, "problem_detail"),
      budget_range: field(f, "budget_range"),
      contact_time: field(f, "contact_time"),
      language_pref: null,
      referral_source: field(f, "referral_source"),
      timeline: field(f, "timeline"),
      status: "new",
    }),
    msgs,
    setNoteD,
  );

  return (
    <section className="section" id="audit">
      <div className="container">
        <h2 className="sec-title reveal">{a.secTitle}</h2>
        <SectionIntro num="014" statement={a.statement} aside={a.aside} />

        <div className="audit-grid reveal">
          <div className="audit-side">
            <div className="card audit-info">
              <h3>{a.getTitle}</h3>
              <ul>
                {a.getItems.map((it) => <li key={it}>{it}</li>)}
              </ul>
              <p className="audit-price">{a.price}</p>
            </div>
            <div className="card audit-info">
              <h3>{a.igTitle}</h3>
              <p className="audit-dm">
                {a.igPre}<b>{a.igWord}</b>{a.igPost}
              </p>
              <a className="btn btn-solid" href={INSTAGRAM} target="_blank" rel="noopener">
                <svg viewBox="0 0 16 16" className="ic">
                  <path d="M3 2h10v10" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M13 2 2.6 12.4" stroke="currentColor" strokeWidth="1.6" />
                </svg>
                {a.igBtn}
              </a>
            </div>
          </div>

          <div className="card foot-form audit-form">
            <h3>{a.formTitle}</h3>
            <p>{a.formSub}</p>
            <div className="audit-tabs" role="tablist">
              <button type="button" className={`audit-tab${tab === "simple" ? " on" : ""}`}
                role="tab" aria-selected={tab === "simple"} onClick={() => setTab("simple")}>
                {a.tabSimple}<em>{a.tabSimpleSub}</em>
              </button>
              <button type="button" className={`audit-tab${tab === "detailed" ? " on" : ""}`}
                role="tab" aria-selected={tab === "detailed"} onClick={() => setTab("detailed")}>
                {a.tabDetailed}<em>{a.tabDetailedSub}</em>
              </button>
            </div>

            <form noValidate hidden={tab !== "simple"} onSubmit={submitSimple}>
              <input type="text" name="name" placeholder={a.s.name} required />
              <input type="text" name="whatsapp" placeholder={a.s.whatsapp} required />
              <input type="text" name="business_name" placeholder={a.s.business} required />
              <select name="business_type" required defaultValue="">
                <option value="" disabled>{a.s.typeLabel}</option>
                <Opt items={a.s.types} />
              </select>
              <select name="contact_time" required defaultValue="">
                <option value="" disabled>{a.s.timeLabel}</option>
                <Opt items={a.s.times} />
              </select>
              <select name="language_pref" defaultValue="">
                <option value="" disabled>{a.s.langLabel}</option>
                <Opt items={a.s.langs} />
              </select>
              <textarea name="problem_detail" rows={4} placeholder={a.s.problem} required />
              <button className="btn btn-solid" type="submit">
                <ArrowIcon />{a.s.submit}
              </button>
              <span className="form-note">{noteS}</span>
            </form>

            <form noValidate hidden={tab !== "detailed"} onSubmit={submitDetailed}>
              <input type="text" name="name" placeholder={a.d.name} required />
              <input type="email" name="email" placeholder={a.d.email} required />
              <input type="text" name="whatsapp" placeholder={a.d.whatsapp} required />
              <input type="text" name="business_name" placeholder={a.d.company} required />
              <select name="industry" required defaultValue="">
                <option value="" disabled>{a.d.industryLabel}</option>
                <Opt items={a.d.industries} />
              </select>
              <select name="company_size" required defaultValue="">
                <option value="" disabled>{a.d.sizeLabel}</option>
                <Opt items={a.d.sizes} />
              </select>
              <input type="text" name="tech_stack" placeholder={a.d.tools} />
              <select name="problem_category" required defaultValue="">
                <option value="" disabled>{a.d.problemLabel}</option>
                <Opt items={a.d.problems} />
              </select>
              <select name="budget_range" required defaultValue="">
                <option value="" disabled>{a.d.budgetLabel}</option>
                <Opt items={a.d.budgets} />
              </select>
              <select name="timeline" required defaultValue="">
                <option value="" disabled>{a.d.timelineLabel}</option>
                <Opt items={a.d.timelines} />
              </select>
              <select name="referral_source" required defaultValue="">
                <option value="" disabled>{a.d.referralLabel}</option>
                <Opt items={a.d.referrals} />
              </select>
              <select name="contact_time" required defaultValue="">
                <option value="" disabled>{a.d.timeLabel}</option>
                <Opt items={a.d.times} />
              </select>
              <textarea name="problem_detail" rows={4} placeholder={a.d.problem} required />
              <button className="btn btn-solid" type="submit">
                <ArrowIcon />{a.d.submit}
              </button>
              <span className="form-note">{noteD}</span>
            </form>
          </div>
        </div>

        <SecFoot active={13} text={a.cta} to="contact" />
      </div>
    </section>
  );
}
