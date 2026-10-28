import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { reduceMotion } from "@/lib/scroll";
import { useTimers, useResetOnLang, localeOf, formatRM } from "./shared";

/* Example café numbers for three evenings. Item names stay as they would
   appear on a Malaysian menu. */
const DAYS = [
  { date: new Date(2026, 9, 27), sales: 4820, change: 12, orders: 63, best: "Iced Milo × 41", low: "Oat milk",
    hours: [2, 4, 6, 9, 12, 8, 5, 4, 6, 9, 7, 3] },
  { date: new Date(2026, 9, 26), sales: 6150, change: 18, orders: 81, best: "Nasi Lemak Set × 57", low: "Eggs",
    hours: [3, 5, 8, 11, 14, 10, 6, 5, 7, 11, 9, 4] },
  { date: new Date(2026, 9, 25), sales: 3940, change: -4, orders: 52, best: "Kaya Toast Set × 33", low: "Condensed milk",
    hours: [2, 3, 5, 7, 9, 7, 4, 3, 5, 8, 6, 2] },
];

type Shown = { day: number; time: string };

/** Daily sales report: the WhatsApp message an owner gets every evening. */
export function ReportDemo() {
  const { t, lang } = useLang();
  const d = t.demos.report;
  const { after, clear } = useTimers();
  const [msgs, setMsgs] = useState<Shown[]>([]);
  const [typing, setTyping] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  const reset = () => { clear(); setMsgs([]); setTyping(false); };
  useResetOnLang(reset);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduceMotion ? "auto" : "smooth" });
  }, [msgs, typing]);

  const next = () => {
    if (typing) return;
    const day = msgs.length % DAYS.length;
    setTyping(true);
    after(1000, () => {
      setTyping(false);
      setMsgs((m) => [...m, { day, time: lang === "en" ? "9:00 PM" : "21:00" }]);
    });
  };

  const loc = localeOf(lang);
  const fmtDate = (dt: Date) => dt.toLocaleDateString(loc, { weekday: "short", day: "numeric", month: "short" });

  return (
    <div className="dm dm-report">
      <div className="rp-phone">
        <div className="cd-head">
          <span className="cd-avatar rp-ava" aria-hidden>
            <svg viewBox="0 0 24 24"><path d="M5 19V11M10 19V5M15 19v-6M20 19V8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none" /></svg>
          </span>
          <span className="cd-who"><b>{d.from}</b><small><i aria-hidden />WhatsApp</small></span>
        </div>
        <div className="rp-log" ref={logRef} aria-live="polite">
          {msgs.length === 0 && !typing && <p className="cd-empty">{d.empty}</p>}
          {msgs.map((m, i) => {
            const day = DAYS[m.day];
            const max = Math.max(...day.hours);
            return (
              <div key={i} className="rp-msg">
                <b className="rp-title">📊 {d.title} · {fmtDate(day.date)}</b>
                <div className="rp-big">
                  <span>{d.sales}</span>
                  <strong>{formatRM(day.sales, lang, 0)}</strong>
                  <em className={day.change >= 0 ? "up" : "down"}>
                    {day.change >= 0 ? "▲" : "▼"} {Math.abs(day.change)}% {d.change}
                  </em>
                </div>
                <dl>
                  <div><dt>{d.orders}</dt><dd>{day.orders}</dd></div>
                  <div><dt>{d.best}</dt><dd>{day.best}</dd></div>
                  <div><dt>{d.low}</dt><dd className="warn">⚠ {day.low}</dd></div>
                </dl>
                <span className="rp-hours-label">{d.hours}</span>
                <div className="rp-bars" aria-hidden>
                  {day.hours.map((h, j) => (
                    <i key={j} style={{ height: `${(h / max) * 100}%`, animationDelay: `${j * 40}ms` }}
                       className={h === max ? "peak" : ""} />
                  ))}
                </div>
                <span className="rp-axis" aria-hidden>{(lang === "en" ? ["8am", "2pm", "8pm"] : ["08:00", "14:00", "20:00"]).map((a) => <span key={a}>{a}</span>)}</span>
                <time>{m.time}</time>
              </div>
            );
          })}
          {typing && <div className="cd-msg bot cd-typing"><i /><i /><i /></div>}
        </div>
        <div className="cd-chips">
          <button type="button" className="cd-chip rp-btn" onClick={next} disabled={typing}>
            {msgs.length === 0 ? d.get : d.another}
          </button>
        </div>
      </div>
    </div>
  );
}
