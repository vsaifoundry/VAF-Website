import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { useTimers, useResetOnLang } from "./shared";

const fill = (tpl: string, v: Record<string, string>) =>
  tpl.replace(/\{(\w+)\}/g, (_, k: string) => v[k] ?? "");

const NAME = "Aisyah";

const Star = () => (
  <svg viewBox="0 0 24 24" aria-hidden>
    <path d="M12 3.2l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 17l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8L12 3.2Z" />
  </svg>
);

/** Review booster: tap a rating and see both sides of the automation.
 *  Everyone gets the same review link (Google forbids asking only happy
 *  customers); low ratings also alert the owner to follow up. */
export function ReviewDemo() {
  const { t } = useLang();
  const d = t.demos.autos.review;
  const { after, clear } = useTimers();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [stage, setStage] = useState(0); // 0 waiting, 1 customer reply, 2 owner alert, 3 result

  const reset = () => { clear(); setRating(0); setHover(0); setStage(0); };
  useResetOnLang(reset);

  const rate = (n: number) => {
    if (rating) return;
    setRating(n);
    setHover(0);
    after(700, () => setStage(1));
    after(1500, () => setStage(2));
    after(2200, () => setStage(3));
  };

  const good = rating >= 4;
  const shown = hover || rating;
  const vars = { name: NAME, stars: String(rating) };

  return (
    <div className="dm dm-review">
      <div className="dm-panel rv-panel">
        <span className="rv-intro">
          <svg viewBox="0 0 24 24" aria-hidden><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
          {d.intro}
        </span>

        <div className="rv-chat">
          <div className="rv-bubble biz">
            <p>{fill(d.ask, vars)}</p>
            <div className="rv-stars" role="group" aria-label={d.tap} onMouseLeave={() => setHover(0)}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n} type="button" disabled={rating > 0}
                  className={`${n <= shown ? "on" : ""}${rating && n <= rating ? " set" : ""}`}
                  aria-label={fill(d.star, { n: String(n) })}
                  aria-pressed={rating === n}
                  onMouseEnter={() => !rating && setHover(n)}
                  onFocus={() => !rating && setHover(n)}
                  onClick={() => rate(n)}
                >
                  <Star />
                </button>
              ))}
            </div>
            {!rating && <span className="rv-tap">{d.tap}</span>}
          </div>
          {rating > 0 && (
            <div className="rv-bubble me" aria-label={fill(d.star, { n: String(rating) })}>
              {"★".repeat(rating)}<span className="rv-dim">{"★".repeat(5 - rating)}</span>
            </div>
          )}
        </div>

        <div className={`rv-lanes${rating ? " open" : ""}`} aria-live="polite">
          <section className={`rv-lane${stage >= 1 ? " on" : ""}`}>
            <span className="rv-lane-label">{d.lanes[0]}</span>
            {stage >= 1 && (
              <div className="rv-bubble biz small">
                <p>{good ? d.custGood : d.custBad}</p>
                <span className="rv-link">
                  <svg viewBox="0 0 24 24" aria-hidden><path d="M12 3.2l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 17l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8L12 3.2Z" /></svg>
                  {d.link}
                </span>
              </div>
            )}
          </section>
          <section className={`rv-lane${stage >= 2 ? " on" : ""}`}>
            <span className="rv-lane-label">{d.lanes[1]}</span>
            {stage >= 2 && (
              <div className={`rv-alert ${good ? "good" : "bad"}`}>
                {fill(good ? d.ownerGood : d.ownerBad, vars)}
              </div>
            )}
          </section>
        </div>

        <div className={`dm-result${stage >= 3 ? " show" : ""}${stage >= 3 && !good ? " warn" : ""}`} aria-hidden={stage < 3}>
          <svg viewBox="0 0 24 24" aria-hidden><path d="M5 12.5 10 17l9-10" /></svg>
          {good ? d.resultGood : d.resultBad}
        </div>

        <div className="rv-foot">
          <small>{d.note}</small>
          {stage >= 3 && (
            <button type="button" className="btn btn-solid dm-btn" onClick={reset}>{d.again}</button>
          )}
        </div>
      </div>
    </div>
  );
}
