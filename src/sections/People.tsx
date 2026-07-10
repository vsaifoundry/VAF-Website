import { SectionIntro, Pillbar, PrevIcon, ArrowIcon, InstagramIcon } from "@/components/ui";
import { SecFoot } from "@/components/SecFoot";
import { useCarousel } from "@/hooks/useCarousel";
import { INSTAGRAM } from "@/lib/config";
import { useLang } from "@/lib/i18n";

/* Photos and portrait variants stay constant across languages. */
const TEAM_META: { photo: string | null; variant: number }[] = [
  { photo: "/img/vincent.png", variant: 0 },
  { photo: "/img/trisha.png", variant: 1 },
  { photo: "/img/shaktheish.jpg", variant: 2 },
  { photo: "/img/kaviraj.jpg", variant: 3 },
];

const ADVISOR_META: { photo: string | null; variant: number }[] = [
  { photo: "/img/fong.jpg", variant: 0 },
  { photo: "/img/victoria.jpg", variant: 1 },
  { photo: "/img/rakesh.jpg", variant: 2 },
];

const PARTNER_LOGOS = [
  "/img/sm-broilers.jpg",
  "https://bnubhycpgjgnvvtlbouh.supabase.co/storage/v1/object/public/assets/Farms_Best_Logo.jpg",
];

function Bust({ variant }: { variant: number }) {
  return (
    <svg viewBox="0 0 200 260" className="bust">
      <defs>
        <linearGradient id={`skin${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9d5cf" /><stop offset="1" stopColor="#8e8a85" />
        </linearGradient>
        <radialGradient id={`bgGlow${variant}`} cx="0.5" cy="0.32" r="0.75">
          <stop offset="0" stopColor="#3a3a3c" /><stop offset="1" stopColor="#161617" />
        </radialGradient>
      </defs>
      <rect width="200" height="260" fill={`url(#bgGlow${variant})`} />
      <g className="bust-g">
        <path className="hair" d="M64 74c0-26 16-42 36-42s36 16 36 42c0 6-2 12-4 16-2-14-12-24-32-24s-30 10-32 24c-2-4-4-10-4-16z" />
        <ellipse className="face" cx="100" cy="88" rx="30" ry="36" fill={`url(#skin${variant})`} />
        <path className="neck" d="M88 118h24v22H88z" fill={`url(#skin${variant})`} />
        <path className="body" d="M40 260c2-64 26-92 60-92s58 28 60 92z" />
      </g>
    </svg>
  );
}

type Person = { name: string; role: string; bio: string; photo: string | null; variant: number };

function PersonCarousel({
  label, people, fallbackBust,
}: { label: string; people: Person[]; fallbackBust?: boolean }) {
  const { idx, go, fading } = useCarousel(people.length);
  const p = people[idx];
  return (
    <div className="team-grid reveal">
      <div className="team-main">
        <div className="card team-bar">
          <span className="proc-label">{label}</span>
          <Pillbar count={people.length} active={idx} onSelect={go} />
        </div>
        <div className={`card team-id${fading ? " fade" : ""}`}>
          <div>
            <h3 className="team-name">{p.name}</h3>
            <span className="team-role">{p.role}</span>
          </div>
          <p className="team-bio">{p.bio}</p>
        </div>
      </div>
      <div className="card team-photo">
        <div className={`portrait${fading ? " fade" : ""}`} data-variant={p.variant}>
          {p.photo ? (
            <img className="tm-img" src={p.photo} alt={p.name} style={{ display: "block" }} />
          ) : fallbackBust ? (
            <Bust variant={p.variant} />
          ) : null}
        </div>
      </div>
      <div className="team-side">
        <div className="card team-nav">
          <button className="nav-arrow" onClick={() => go(idx - 1)} aria-label="Previous"><PrevIcon /></button>
          <button className="nav-arrow" onClick={() => go(idx + 1)} aria-label="Next"><ArrowIcon /></button>
        </div>
        <div className="card team-socials">
          <a href={INSTAGRAM} target="_blank" rel="noopener" aria-label="Instagram"><InstagramIcon /></a>
        </div>
      </div>
    </div>
  );
}

export function Team() {
  const { t } = useLang();
  const people: Person[] = t.team.people.map((p, i) => ({ ...p, ...TEAM_META[i] }));
  return (
    <section className="section" id="team">
      <div className="container">
        <h2 className="sec-title reveal">{t.team.secTitle}</h2>
        <SectionIntro num="008" statement={t.team.statement} aside={t.team.aside} />
        <PersonCarousel label={t.team.label} people={people} fallbackBust />
        <SecFoot active={7} text={t.team.cta} to={INSTAGRAM} external />
      </div>
    </section>
  );
}

export function Advisors() {
  const { t } = useLang();
  const people: Person[] = t.advisors.people.map((p, i) => ({ ...p, ...ADVISOR_META[i] }));
  return (
    <section className="section" id="advisors">
      <div className="container">
        <h2 className="sec-title reveal">{t.advisors.secTitle}</h2>
        <SectionIntro num="009" statement={t.advisors.statement} aside={t.advisors.aside} />
        <PersonCarousel label={t.advisors.label} people={people} />

        <div className="partners-row reveal">
          {t.advisors.partners.map((pt, i) => (
            <div className="card partner-card" key={pt.name}>
              <img src={PARTNER_LOGOS[i]} alt={`${pt.name} logo`} loading="lazy" />
              <div>
                <h4>{pt.name}</h4>
                <span>{pt.role}</span>
                <p>{pt.copy}</p>
              </div>
            </div>
          ))}
        </div>

        <SecFoot active={8} text={t.advisors.cta} to="contact" />
      </div>
    </section>
  );
}
