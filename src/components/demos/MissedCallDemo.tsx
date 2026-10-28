import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { useTimers, useResetOnLang } from "./shared";

/* one icon per step: missed call, WhatsApp sent, reply, details saved, morning summary */
const ICONS = [
  <path key="0" d="M3 5.5c0-.8.7-1.5 1.5-1.5h2l1.5 4-2 1.3a10 10 0 0 0 4.7 4.7L12 12l4 1.5v2c0 .8-.7 1.5-1.5 1.5A13.5 13.5 0 0 1 3 5.5ZM14 3l6 6M20 3l-6 6" />,
  <path key="1" d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.2A8.5 8.5 0 1 0 12 3.5ZM8.5 12l2.4 2.4 4.6-4.8" />,
  <path key="2" d="M4 5.5h16v10H9l-5 4v-14ZM8 9.5h8M8 12.5h5" />,
  <path key="3" d="M8 4h8M6 7h12v13H6V7Zm3 5 2 2 4-4M9 17h6" />,
  <path key="4" d="M12 3v2M4.9 6.9l1.4 1.4M3 14h2M19 14h2M17.7 8.3l1.4-1.4M7 14a5 5 0 0 1 10 0M3 18h18" />,
];

/** Missed-call rescue: lights up the after-hours follow-up step by step. */
export function MissedCallDemo() {
  const { t } = useLang();
  const d = t.demos.missed;
  const { after, clear } = useTimers();
  const [lit, setLit] = useState(0);        // how many steps are done
  const [running, setRunning] = useState(false);

  const reset = () => { clear(); setLit(0); setRunning(false); };
  useResetOnLang(reset);

  const play = () => {
    clear();
    setLit(0);
    setRunning(true);
    d.steps.forEach((_, i) => after(350 + i * 1100, () => setLit(i + 1)));
    after(350 + d.steps.length * 1100, () => setRunning(false));
  };

  const done = lit === d.steps.length;
  const clock = lit > 0 ? d.steps[lit - 1][0] : d.steps[0][0];

  return (
    <div className="dm dm-missed">
      <div className="dm-panel">
        <div className="mc-head">
          <span className={`mc-clock${lit > 0 ? " on" : ""}`} aria-hidden>
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
            {clock}
          </span>
          <button type="button" className="btn btn-solid dm-btn" onClick={play} disabled={running}>
            <svg viewBox="0 0 24 24" className="ic" aria-hidden><path d="M8 5.5v13l10.5-6.5L8 5.5Z" fill="currentColor" /></svg>
            {lit === 0 ? d.start : d.replay}
          </button>
        </div>

        <ol className="mc-steps" aria-live="polite">
          {d.steps.map(([time, title, text], i) => (
            <li key={i} className={`mc-step s${i}${i < lit ? " on" : ""}${i === lit - 1 ? " now" : ""}`}>
              <span className="mc-ic" aria-hidden>
                <svg viewBox="0 0 24 24">{ICONS[i]}</svg>
              </span>
              <div className="mc-body">
                <span className="mc-time">{time}</span>
                <b>{title}</b>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className={`dm-result${done ? " show" : ""}`} aria-hidden={!done}>
          <svg viewBox="0 0 24 24" aria-hidden><path d="M5 12.5 10 17l9-10" /></svg>
          {d.result}
        </div>
      </div>
    </div>
  );
}
