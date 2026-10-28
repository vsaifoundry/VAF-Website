import { useState, type FormEvent } from "react";
import { useLang } from "@/lib/i18n";
import { useTimers, useResetOnLang } from "./shared";

const fill = (tpl: string, v: Record<string, string>) =>
  tpl.replace(/\{(\w+)\}/g, (_, k: string) => v[k] ?? "");

/* customer list, WhatsApp reply, team alert, scheduled follow-up */
const ICONS = [
  <path key="0" d="M4 5h16v14H4V5Zm0 5h16M4 14.5h16M10 5v14" />,
  <path key="1" d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.2A8.5 8.5 0 1 0 12 3.5ZM8.5 12l2.4 2.4 4.6-4.8" />,
  <path key="2" d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15L6 16Zm4 4a2 2 0 0 0 4 0" />,
  <path key="3" d="M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM12 7.5V12l3 2" />,
];

const STEP = 900;     // ms between steps lighting up
const TOTAL = 3.6;    // seconds shown on the timer

/** Enquiry autopilot: the visitor fills in a real (pretend) enquiry form
 *  and watches it saved, answered, flagged and scheduled, using what they typed. */
export function EnquiryDemo() {
  const { t } = useLang();
  const d = t.demos.autos.enquiry;
  const { after, clear } = useTimers();
  const [name, setName] = useState("");
  const [svc, setSvc] = useState(1);
  const [day, setDay] = useState(1);
  const [lit, setLit] = useState(0);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const reset = () => { clear(); setLit(0); setRunning(false); setElapsed(0); };
  useResetOnLang(reset);

  // editing the form after a run clears the old result, so it never shows stale details
  const edited = () => { if (!running && lit > 0) reset(); };

  const who = name.trim() || d.defaultName;
  const vars = { name: who, service: d.services[svc], day: d.days[day][1], dayLabel: d.days[day][0] };

  const send = (e: FormEvent) => {
    e.preventDefault();
    if (running) return;
    clear();
    setLit(0);
    setElapsed(0);
    setRunning(true);
    for (let i = 1; i <= 4; i++) after(300 + i * STEP - STEP / 2, () => setLit(i));
    for (let ms = 100; ms <= TOTAL * 1000; ms += 100) after(ms, () => setElapsed(ms / 1000));
    after(300 + 4 * STEP, () => setRunning(false));
  };

  const done = lit === 4 && !running;

  return (
    <div className="dm dm-enquiry">
      <form className="eq-form" onSubmit={send}>
        <header className="eq-form-head">
          <span className="eq-logo" aria-hidden>G</span>
          <span><b>Glow Beauty Studio</b><small>{d.formTitle}</small></span>
        </header>

        <label className="eq-field">
          <span>{d.name}</span>
          <input
            type="text" value={name} placeholder={d.namePh} maxLength={20} disabled={running}
            onChange={(e) => { setName(e.target.value); edited(); }}
          />
        </label>

        <fieldset className="eq-field" disabled={running}>
          <legend>{d.service}</legend>
          <div className="eq-pills">
            {d.services.map((s, i) => (
              <button key={s} type="button" className={svc === i ? "on" : ""} aria-pressed={svc === i}
                onClick={() => { setSvc(i); edited(); }}>{s}</button>
            ))}
          </div>
        </fieldset>

        <fieldset className="eq-field" disabled={running}>
          <legend>{d.day}</legend>
          <div className="eq-pills">
            {d.days.map(([label], i) => (
              <button key={label} type="button" className={day === i ? "on" : ""} aria-pressed={day === i}
                onClick={() => { setDay(i); edited(); }}>{label}</button>
            ))}
          </div>
        </fieldset>

        <button type="submit" className="btn btn-solid dm-btn eq-send" disabled={running}>
          <svg viewBox="0 0 24 24" className="ic" aria-hidden><path d="M3.5 11.5 20.5 4l-7 16.5-2.5-6.5-7.5-2.5Z" fill="currentColor" /></svg>
          {running ? d.running : done ? d.again : d.send}
        </button>
      </form>

      <div className="eq-flow" aria-live="polite">
        <div className="eq-flow-head">
          <span className={`eq-timer${running ? " run" : ""}${done ? " done" : ""}`}>
            <svg viewBox="0 0 24 24" aria-hidden><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.5 1.5M10 2.5h4" /></svg>
            {elapsed.toFixed(1)}s
          </span>
          {lit === 0 && !running && <span className="eq-wait">{d.waiting}</span>}
        </div>

        <ol className="eq-steps">
          {d.steps.map(([title, tpl], i) => (
            <li key={i} className={`eq-step s${i}${i < lit ? " on" : ""}`}>
              <span className="eq-ic" aria-hidden><svg viewBox="0 0 24 24">{ICONS[i]}</svg></span>
              <div className="eq-body">
                <b>{title}</b>
                {i < lit && (i === 0 ? (
                  <span className="eq-row">
                    <span>{vars.name}</span><span>{vars.service}</span><span>{vars.dayLabel}</span>
                  </span>
                ) : (
                  <p className={`eq-msg m${i}`}>{fill(tpl, vars)}</p>
                ))}
              </div>
              {i < lit && (
                <span className="eq-check" aria-hidden>
                  <svg viewBox="0 0 24 24"><path d="M5 12.5 10 17l9-10" /></svg>
                </span>
              )}
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
