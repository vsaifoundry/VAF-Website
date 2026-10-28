import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { reduceMotion } from "@/lib/scroll";
import { useTimers, useResetOnLang, formatRM } from "./shared";

/* Invented example suppliers, so no real company's receipt is shown. */
const RECEIPTS = [
  { supplier: "Borong Jaya Wholesale", date: "02/10", cat: 0, total: 486.5,
    lines: [["Cooking oil 5kg × 4", 118], ["Rice 10kg × 6", 252], ["Sugar 1kg × 20", 116.5]] },
  { supplier: "Electricity Bill", date: "05/10", cat: 1, total: 734.2,
    lines: [["Usage · Sep 2026", 734.2]] },
  { supplier: "Kilat Express Delivery", date: "09/10", cat: 2, total: 58,
    lines: [["Delivery × 6 trips", 58]] },
  { supplier: "PackRight Supplies", date: "12/10", cat: 3, total: 129.9,
    lines: [["Food boxes × 500", 99.9], ["Paper bags × 300", 30]] },
] as const;

function useCountTo(target: number) {
  const [v, setV] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    if (reduceMotion) { setV(target); from.current = target; return; }
    const start = from.current, t0 = performance.now(), dur = 700;
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setV(start + (target - start) * e);
      if (p < 1) raf = requestAnimationFrame(step); else from.current = target;
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return v;
}

/** Receipts to spreadsheet: "scan" a receipt and watch it land as a row. */
export function ReceiptDemo() {
  const { t, lang } = useLang();
  const d = t.demos.receipts;
  const { after, clear } = useTimers();
  const [count, setCount] = useState(0);      // rows saved
  const [scanning, setScanning] = useState(false);

  const reset = () => { clear(); setCount(0); setScanning(false); };
  useResetOnLang(reset);

  const total = RECEIPTS.slice(0, count).reduce((s, r) => s + r.total, 0);
  const shownTotal = useCountTo(total);
  const allDone = count === RECEIPTS.length;
  const current = RECEIPTS[Math.min(count, RECEIPTS.length - 1)];

  const scan = () => {
    if (allDone) { reset(); return; }
    setScanning(true);
    after(1300, () => { setScanning(false); setCount((c) => c + 1); });
  };

  return (
    <div className="dm dm-receipts">
      <div className="rc-left">
        <div className={`rc-paper${scanning ? " scanning" : ""}${allDone ? " done" : ""}`} key={allDone ? "done" : count}>
          {allDone ? (
            <div className="rc-saved">
              <svg viewBox="0 0 24 24" aria-hidden><path d="M5 12.5 10 17l9-10" /></svg>
              {d.saved}
            </div>
          ) : (
            <>
              <b className="rc-sup">{current.supplier}</b>
              <span className="rc-date">{current.date}/2026</span>
              <ul>
                {current.lines.map(([item, amt]) => (
                  <li key={item}><span>{item}</span><span>{amt.toFixed(2)}</span></li>
                ))}
              </ul>
              <div className="rc-tot"><span>TOTAL</span><span>RM {current.total.toFixed(2)}</span></div>
              <span className="rc-scanline" aria-hidden />
            </>
          )}
        </div>
        <button type="button" className="btn btn-solid dm-btn" onClick={scan} disabled={scanning}>
          {allDone ? d.restart : scanning ? d.scanning : d.scan}
          <span className="rc-count">{Math.min(count + (allDone ? 0 : 1), RECEIPTS.length)}/{RECEIPTS.length}</span>
        </button>
      </div>

      <div className="rc-sheet" aria-live="polite">
        <div className="rc-sheet-bar"><i /><i /><i /><span>receipts-2026.xlsx</span></div>
        <table>
          <thead><tr>{d.cols.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
          <tbody>
            {RECEIPTS.slice(0, count).map((r) => (
              <tr key={r.supplier} className="rc-row">
                <td>{r.date}</td>
                <td>{r.supplier}</td>
                <td><span className={`rc-cat c${r.cat}`}>{d.cats[r.cat]}</span></td>
                <td className="num">{formatRM(r.total, lang)}</td>
              </tr>
            ))}
            {count === 0 && (
              <tr><td colSpan={4} className="rc-empty">{d.empty}</td></tr>
            )}
          </tbody>
          <tfoot>
            <tr><td colSpan={3}>{d.total}</td><td className="num">{formatRM(shownTotal, lang)}</td></tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
