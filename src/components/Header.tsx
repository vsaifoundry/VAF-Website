import { useEffect, useState } from "react";
import { ScrollLink, InstagramIcon } from "./ui";
import { INSTAGRAM } from "@/lib/config";
import { useLang, LANGS } from "@/lib/i18n";
import type { Dict } from "@/data/translations";

const NAV_IDS = [
  "home", "work", "showcase", "services", "process", "statistics", "pricing",
  "faq", "advisors", "team", "founding", "reviews", "labs", "audit", "contact",
] as const;

function useScrollSpy() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) setActive(en.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    document
      .querySelectorAll("main section[id], footer[id], .hero[id]")
      .forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  return active;
}

export function ScrollProgress() {
  useEffect(() => {
    const bar = document.querySelector<HTMLElement>("[data-scroll-progress]");
    if (!bar) return;
    let ticking = false;
    const paint = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${(max > 0 ? window.scrollY / max : 0).toFixed(4)})`;
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(paint); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    paint();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="scroll-progress" aria-hidden>
      <i data-scroll-progress />
    </div>
  );
}

function LangSelector() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [open]);

  const current = LANGS.find((l) => l.code === lang)!;

  return (
    <div className="lang-wrap">
      <button
        className="lang-btn"
        aria-label="Language"
        aria-expanded={open}
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
      >
        <svg viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.7" />
          <path d="M3 12h18M12 3c2.6 2.4 3.9 5.4 3.9 9S14.6 18.6 12 21c-2.6-2.4-3.9-5.4-3.9-9S9.4 5.4 12 3Z"
            fill="none" stroke="currentColor" strokeWidth="1.7" />
        </svg>
        {current.short}
      </button>
      {open && (
        <div className="lang-menu" onClick={(e) => e.stopPropagation()}>
          {LANGS.map((l) => (
            <button
              key={l.code}
              className={l.code === lang ? "on" : ""}
              onClick={() => { setLang(l.code); setOpen(false); }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header({
  menuOpen, setMenuOpen,
}: { menuOpen: boolean; setMenuOpen: (v: boolean) => void }) {
  const { t } = useLang();
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute("data-theme") || "light",
  );
  const active = useScrollSpy();

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("vaf-theme", next); } catch { /* private mode */ }
    setTheme(next);
  };

  return (
    <>
      <header className="site-head">
        <ScrollLink to="home" className="logo">
          <img src="/img/logo.png" alt="" />
          V's AI Foundry<sup>®</sup>
        </ScrollLink>
        <div className="head-actions">
          <LangSelector />
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
            <svg className="tt-moon" viewBox="0 0 24 24" aria-hidden>
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" fill="currentColor" />
            </svg>
            <svg className="tt-sun" viewBox="0 0 24 24" aria-hidden>
              <circle cx="12" cy="12" r="4" fill="currentColor" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"
                stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </button>
          <button
            className={`burger${menuOpen ? " open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /><span />
          </button>
        </div>
      </header>

      {/* half-page drawer: clicking the dimmed page closes it */}
      <nav
        className={`menu${menuOpen ? " open" : ""}`}
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      >
        <div className="menu-inner" onClick={(e) => e.stopPropagation()}>
          <div className="menu-links">
            {NAV_IDS.map((id, i) => (
              <ScrollLink
                key={id}
                to={id}
                className={active === id ? "active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                <em>{String(i + 1).padStart(2, "0")}</em>
                {t.nav[id as keyof Dict["nav"]]}
              </ScrollLink>
            ))}
          </div>
          <div className="menu-side">
            <p className="menu-tag">{t.common.menuTag}</p>
            <ScrollLink to="contact" className="btn btn-solid" onClick={() => setMenuOpen(false)}>
              <svg viewBox="0 0 16 16" className="ic">
                <path d="M3 2h10v10" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path d="M13 2 2.6 12.4" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              {t.common.bookCall}
            </ScrollLink>
            <div className="menu-socials">
              <a href={INSTAGRAM} target="_blank" rel="noopener" aria-label="Instagram">
                <InstagramIcon />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
