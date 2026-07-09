import { SectionIntro, Pillbar, PrevIcon, ArrowIcon } from "@/components/ui";
import { SecFoot } from "@/components/SecFoot";
import { useCarousel } from "@/hooks/useCarousel";
import { useLang } from "@/lib/i18n";

export function Reviews() {
  const { t } = useLang();
  const reviews = t.reviews.items;
  const { idx, go, fading } = useCarousel(reviews.length);
  const r = reviews[idx];
  return (
    <section className="section" id="reviews">
      <div className="container">
        <h2 className="sec-title reveal">{t.reviews.secTitle}</h2>
        <SectionIntro num="010" statement={t.reviews.statement} aside={t.reviews.aside} />

        <div className="review-grid reveal">
          <div className="card review-main">
            <div className={`review-quote${fading ? " fade" : ""}`}>
              <span className="qmark">“</span>
              <blockquote>{r.quote}</blockquote>
              <div className="review-nav">
                <button className="nav-arrow ghost" onClick={() => go(idx - 1)} aria-label="Previous review"><PrevIcon /></button>
                <button className="nav-arrow ghost" onClick={() => go(idx + 1)} aria-label="Next review"><ArrowIcon /></button>
              </div>
            </div>
          </div>

          <div className={`card review-id${fading ? " fade" : ""}`}>
            <div>
              <h3 className="team-name sm">{r.name}</h3>
              <span className="team-role">★★★★★</span>
            </div>
            <span className="review-company">{r.company}</span>
          </div>

          <div className="card review-bar">
            <span className="proc-label">{t.reviews.label}</span>
            <Pillbar count={reviews.length} active={idx} onSelect={go} />
          </div>
        </div>

        <SecFoot active={9} text={t.reviews.cta} to="contact" />
      </div>
    </section>
  );
}
