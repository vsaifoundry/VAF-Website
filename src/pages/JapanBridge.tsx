import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { LangSelector } from "@/components/Header";
import { ArrowIcon } from "@/components/ui";
import { postSupabase } from "@/lib/supabase";
import { field } from "@/lib/forms";
import { useLang } from "@/lib/i18n";
import { JAPAN_BRIDGE } from "@/data/translations";

function ThemeToggle() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute("data-theme") || "light",
  );
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("vaf-theme", next); } catch { /* private mode */ }
    setTheme(next);
  };
  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle dark mode">
      <svg className="tt-moon" viewBox="0 0 24 24" aria-hidden>
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" fill="currentColor" />
      </svg>
      <svg className="tt-sun" viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="4" fill="currentColor" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"
          stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    </button>
  );
}

/** Malaysia-Japan interest page. Early lead capture only: saves to the
 *  japan_bridge_leads table in Supabase. Spam protection is a honeypot
 *  field plus a minimum-time check (both invisible to real users). */
const JapanBridge = () => {
  const { lang } = useLang();
  const jb = JAPAN_BRIDGE[lang];
  const { t } = useLang();
  const [note, setNote] = useState("");
  const openedAt = useRef(Date.now());

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    // --- invisible spam protection ---------------------------------
    // 1) honeypot: real users never see or fill this field
    if (field(form, "website")) { setNote(jb.success); form.reset(); return; }
    // 2) submissions faster than 3 seconds are almost certainly bots
    if (Date.now() - openedAt.current < 3000) { setNote(jb.success); form.reset(); return; }

    // --- required fields + consent ---------------------------------
    let ok = true;
    form.querySelectorAll<HTMLInputElement>("[required]").forEach((f) => {
      if (f.type === "checkbox") {
        f.parentElement!.style.outline = f.checked ? "" : "2px solid #FF0033";
        if (!f.checked) ok = false;
      } else if (!f.value.trim()) {
        ok = false; f.style.borderColor = "#FF0033";
      } else {
        f.style.borderColor = "";
      }
    });
    if (!ok) { setNote(t.forms.required); return; }

    setNote(t.forms.sending);
    const res = await postSupabase("japan_bridge_leads", {
      name: field(form, "name"),
      email: field(form, "email"),
      based_in: field(form, "based_in"),
      help_with: field(form, "help_with"),
      message: field(form, "message"),
      company: field(form, "company") || null,
      whatsapp: field(form, "whatsapp") || null,
      line_id: field(form, "line_id") || null,
      contact_method: field(form, "contact_method") || null,
      consent: true,
      source: "japan_bridge",
      status: "new",
    });
    if (res.ok) {
      setNote(jb.success);
      form.reset();
    } else {
      const key = res.code === "no_key" ? "noKey" : res.code ?? "fail";
      setNote(t.forms[key]);
    }
  };

  return (
    <div className="frame jb-frame">
      <header className="site-head">
        <Link to="/" className="logo">
          <img src="/img/logo.png" alt="" />
          V's AI Foundry<sup>®</sup>
        </Link>
        <div className="head-actions">
          <LangSelector />
          <ThemeToggle />
        </div>
      </header>

      <main className="jb-main">
        <span className="jb-kicker">{jb.kicker} · MY ⇄ JP</span>
        <h1 className="jb-title">{jb.title}</h1>
        <p className="jb-intro">{jb.intro1}</p>
        <p className="jb-intro strong">{jb.intro2}</p>

        <div className="card foot-form jb-form reveal in">
          <h3>{jb.formTitle}</h3>
          <form noValidate onSubmit={submit}>
            {/* honeypot: hidden from humans, tempting for bots */}
            <input className="jb-hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <input type="text" name="name" placeholder={jb.name} required />
            <input type="email" name="email" placeholder={jb.email} required />
            <select name="based_in" required defaultValue="">
              <option value="" disabled>{jb.basedLabel}</option>
              {jb.based.map((o) => <option key={o}>{o}</option>)}
            </select>
            <select name="help_with" required defaultValue="">
              <option value="" disabled>{jb.helpLabel}</option>
              {jb.help.map((o) => <option key={o}>{o}</option>)}
            </select>
            <textarea name="message" rows={4} placeholder={jb.message} required />
            <input type="text" name="company" placeholder={jb.company} />
            <input type="text" name="whatsapp" placeholder={jb.whatsapp} />
            <input type="text" name="line_id" placeholder={jb.lineId} />
            <select name="contact_method" defaultValue="">
              <option value="" disabled>{jb.contactLabel}</option>
              {jb.contact.map((o) => <option key={o}>{o}</option>)}
            </select>

            <label className="jb-consent">
              <input type="checkbox" name="consent" required />
              <span>{jb.consent}</span>
            </label>

            <button className="btn btn-solid" type="submit">
              <ArrowIcon />{jb.submit}
            </button>
            <span className="form-note">{note}</span>
          </form>
        </div>

        <Link to="/" className="jb-back">← {jb.back}</Link>
      </main>
    </div>
  );
};

export default JapanBridge;
