import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { N8nFlowVis } from "@/components/visuals";
import { EnquiryDemo } from "./EnquiryDemo";
import { ReviewDemo } from "./ReviewDemo";

/** The Automations tab: two hands-on automations plus the workflow
 *  animation, picked with a small switcher. */
export function AutomationsDemo() {
  const { t } = useLang();
  const a = t.demos.autos;
  const [sub, setSub] = useState(0);
  const rowRef = useRef<HTMLDivElement>(null);

  // on phones the switcher scrolls sideways: keep the chosen option fully in view
  useEffect(() => {
    const row = rowRef.current;
    const btn = row?.children[sub] as HTMLElement | undefined;
    if (!row || !btn || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({ left: btn.offsetLeft - (row.clientWidth - btn.offsetWidth) / 2, behavior: "smooth" });
  }, [sub]);

  return (
    <div className="autos">
      <div className="auto-tabs" ref={rowRef} role="group" aria-label={t.showcase.secTitle}>
        {a.tabs.map((label, i) => (
          <button key={label} type="button" className={sub === i ? "on" : ""} aria-pressed={sub === i}
            onClick={() => setSub(i)}>
            <span className={`auto-dot d${i}`} aria-hidden />{label}
          </button>
        ))}
      </div>
      <p className="auto-copy">{a.copy[sub]}</p>

      <div key={sub} className="auto-body">
        {sub === 0 && <div className="card show-stage show-stage--demo stage-enquiry"><EnquiryDemo /></div>}
        {sub === 1 && <div className="card show-stage show-stage--demo stage-review"><ReviewDemo /></div>}
        {sub === 2 && <N8nFlowVis name={t.showcase.slots[1]} />}
      </div>
    </div>
  );
}
