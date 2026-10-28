import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { reduceMotion } from "@/lib/scroll";

type Msg = { from: "me" | "bot"; text: string; time: string };

const now = () =>
  new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

/** "Try it yourself" WhatsApp-style demo. Visitors tap a sample customer
 *  question and watch the assistant reply. Scripted on purpose: it shows
 *  what the product does without needing a live AI behind it. */
export function ChatDemo() {
  const { t, lang } = useLang();
  const d = t.demo;
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [asked, setAsked] = useState<number[]>([]);
  const [typing, setTyping] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  // a language switch restarts the conversation in the new language
  useEffect(() => { clearTimers(); setMsgs([]); setAsked([]); setTyping(false); }, [lang]);
  useEffect(() => clearTimers, []);

  // keep the newest message in view, inside the phone only (never scrolls the page)
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduceMotion ? "auto" : "smooth" });
  }, [msgs, typing]);

  const ask = (i: number) => {
    if (typing || asked.includes(i)) return;
    const [q, a] = d.qa[i];
    setAsked((s) => [...s, i]);
    setMsgs((m) => [...m, { from: "me", text: q, time: now() }]);
    const wait = reduceMotion ? 150 : 450;
    const think = reduceMotion ? 300 : 900 + Math.min(a.length * 6, 700);
    timers.current.push(window.setTimeout(() => setTyping(true), wait));
    timers.current.push(window.setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: "bot", text: a, time: now() }]);
    }, wait + think));
  };

  const reset = () => { clearTimers(); setMsgs([]); setAsked([]); setTyping(false); };
  const left = d.qa.map((_, i) => i).filter((i) => !asked.includes(i));

  return (
    <div className="cdemo">
      <div className="cd-phone">
        <div className="cd-head">
          <span className="cd-avatar" aria-hidden>
            <svg viewBox="0 0 24 24"><path d="M12 3.2c-3.6 0-6.4 2.4-6.4 5.6 0 2.5 1 4.7 1.7 7.2.5 1.8 1 4.8 2.2 4.8 1.3 0 1.2-3.6 2.5-3.6s1.2 3.6 2.5 3.6c1.2 0 1.7-3 2.2-4.8.7-2.5 1.7-4.7 1.7-7.2 0-3.2-2.8-5.6-6.4-5.6Z" fill="currentColor" /></svg>
          </span>
          <span className="cd-who">
            <b>{d.biz}</b>
            <small><i aria-hidden />{d.status}</small>
          </span>
        </div>

        <div className="cd-log" ref={logRef} role="log" aria-live="polite">
          {msgs.length === 0 && <p className="cd-empty">{d.hint}</p>}
          {msgs.map((m, i) => (
            <div key={i} className={`cd-msg ${m.from}`}>
              <span>{m.text}</span>
              <time>{m.time}{m.from === "me" && <em aria-hidden>✓✓</em>}</time>
            </div>
          ))}
          {typing && (
            <div className="cd-msg bot cd-typing" aria-label={d.typing}>
              <i /><i /><i />
            </div>
          )}
        </div>

        <div className="cd-chips">
          {left.length > 0 ? (
            left.map((i) => (
              <button key={i} type="button" className="cd-chip" onClick={() => ask(i)} disabled={typing}>
                {d.qa[i][0]}
              </button>
            ))
          ) : (
            <button type="button" className="cd-chip cd-reset" onClick={reset} disabled={typing}>
              <svg viewBox="0 0 16 16" aria-hidden><path d="M3 8a5 5 0 1 0 1.6-3.7M3 2.5v3h3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {d.reset}
            </button>
          )}
        </div>
      </div>
      <p className="cd-note">{d.note}</p>
    </div>
  );
}
