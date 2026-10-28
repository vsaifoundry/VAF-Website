import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { SectionIntro } from "@/components/ui";
import { SecFoot } from "@/components/SecFoot";
import { WebShowcaseVis, N8nFlowVis } from "@/components/visuals";
import { ChatDemo } from "@/components/ChatDemo";
import { MissedCallDemo } from "@/components/demos/MissedCallDemo";
import { CaptionDemo } from "@/components/demos/CaptionDemo";
import { ReceiptDemo } from "@/components/demos/ReceiptDemo";
import { ReportDemo } from "@/components/demos/ReportDemo";
import { VideoTile } from "@/components/VideoPlayer";
import { SHOWCASE_TABS } from "@/data/media";
import { useLang } from "@/lib/i18n";

/** "See it in action": quick demos, one per tab (order set in src/data/media.ts).
 *  Each tab plays its video when one is set there, and otherwise shows its
 *  interactive demo or animation. */
export function Showcase() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent) => {
    const n = SHOWCASE_TABS.length;
    let next = active;
    if (e.key === "ArrowRight") next = (active + 1) % n;
    else if (e.key === "ArrowLeft") next = (active - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  // on phones the tab row scrolls sideways: keep the chosen tab in view (never scrolls the page)
  useEffect(() => {
    const btn = tabRefs.current[active];
    const row = btn?.parentElement;
    if (!btn || !row || row.scrollWidth <= row.clientWidth) return;
    const left = btn.offsetLeft - (row.clientWidth - btn.offsetWidth) / 2;
    row.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  const tab = SHOWCASE_TABS[active];
  const label = t.showcase.tabs[active].label;

  /* interactive demos sit on the dark stage; the two animations bring their own frame */
  const DEMOS = { chat: ChatDemo, missed: MissedCallDemo, captions: CaptionDemo, receipts: ReceiptDemo, report: ReportDemo };
  const Demo = tab.id in DEMOS ? DEMOS[tab.id as keyof typeof DEMOS] : null;
  const fallback = () => {
    if (Demo) return <div className={`card show-stage show-stage--demo stage-${tab.id}`}><Demo /></div>;
    if (tab.id === "web") return <WebShowcaseVis name={t.showcase.slots[0]} />;
    return <N8nFlowVis name={t.showcase.slots[1]} />;
  };

  return (
    <section className="section" id="showcase">
      <div className="container">
        <h2 className="sec-title reveal">{t.showcase.secTitle}</h2>
        <SectionIntro num="002" statement={t.showcase.statement} aside={t.showcase.aside} />

        <div className="show-tabs-wrap reveal"><div className="show-tabs" role="tablist" aria-label={t.showcase.secTitle} onKeyDown={onKey}>
          {SHOWCASE_TABS.map((tb, i) => (
            <button
              key={tb.id}
              ref={(el) => { tabRefs.current[i] = el; }}
              type="button"
              role="tab"
              id={`show-tab-${tb.id}`}
              aria-selected={i === active}
              aria-controls={`show-panel-${tb.id}`}
              tabIndex={i === active ? 0 : -1}
              className={i === active ? "on" : ""}
              onClick={() => setActive(i)}
            >
              <span className="st-num">{String(i + 1).padStart(2, "0")}</span>
              {t.showcase.tabs[i].label}
            </button>
          ))}
        </div></div>

        <div
          key={tab.id}
          className={`show-panel show-panel--${tab.id}`}
          role="tabpanel"
          id={`show-panel-${tab.id}`}
          aria-labelledby={`show-tab-${tab.id}`}
        >
          <p className="show-copy">{t.showcase.tabs[active].copy}</p>
          {tab.video ? (
            <div className="card show-stage show-stage--video"><VideoTile video={tab.video} title={label} /></div>
          ) : (
            fallback()
          )}
        </div>

        <SecFoot active={1} text={t.showcase.cta} to="contact" />
      </div>
    </section>
  );
}
