import { Link } from "react-router-dom";
import { SectionIntro, ArrowIcon } from "@/components/ui";
import { SecFoot } from "@/components/SecFoot";
import { useLang } from "@/lib/i18n";
import { JAPAN_BRIDGE } from "@/data/translations";

/** Flagship Crossborder Services teaser. No form here: the whole card
 *  links to /japan-bridge where the interest form lives. */
export function Crossborder() {
  const { lang } = useLang();
  const jb = JAPAN_BRIDGE[lang];
  return (
    <section className="section" id="crossborder">
      <div className="container">
        <h2 className="sec-title reveal">{jb.secTitle}</h2>
        <SectionIntro num="003" statement={jb.statement} aside={jb.aside} />

        <Link to="/japan-bridge" className="card cb-card reveal">
          <div className="cb-copy">
            <span className="cb-kicker">{jb.kicker} · MY ⇄ JP</span>
            <h3 className="cb-title">{jb.title}</h3>
            <p className="cb-desc">{jb.intro1}</p>
            <span className="btn btn-solid cb-btn">
              <ArrowIcon />{jb.formTitle}
            </span>
          </div>
          <div className="cb-vis" aria-hidden>
            <svg viewBox="0 0 340 220" preserveAspectRatio="xMidYMid meet">
              <path id="cbRoute" d="M60,150 C120,40 220,40 280,120" fill="none" />
              <use href="#cbRoute" stroke="var(--line-2)" strokeWidth="2" />
              <use href="#cbRoute" className="cb-route" stroke="var(--orange)" strokeWidth="2" />
              <circle r="4.5" fill="#FFCC00">
                <animateMotion dur="3.2s" repeatCount="indefinite"><mpath href="#cbRoute" /></animateMotion>
              </circle>
              <g className="cb-node">
                <circle cx="60" cy="150" r="26" fill="var(--panel-2)" stroke="var(--line-2)" strokeWidth="1.5" />
                <text x="60" y="156" fontSize="14" fontWeight="700" textAnchor="middle" fill="var(--text)">MY</text>
              </g>
              <g className="cb-node">
                <circle cx="280" cy="120" r="26" fill="var(--panel-2)" stroke="var(--line-2)" strokeWidth="1.5" />
                <text x="280" y="126" fontSize="14" fontWeight="700" textAnchor="middle" fill="var(--text)">JP</text>
              </g>
              <text x="170" y="200" fontSize="11" textAnchor="middle" fill="var(--dim)" letterSpacing="2">+ MORE</text>
            </svg>
          </div>
        </Link>

        <SecFoot active={2} text={jb.cta} to="/japan-bridge" />
      </div>
    </section>
  );
}
