import { useRef, useState, type KeyboardEvent } from "react";
import { SectionIntro } from "@/components/ui";
import { SecFoot } from "@/components/SecFoot";
import { WebShowcaseVis, N8nFlowVis } from "@/components/visuals";
import { ChatDemo } from "@/components/ChatDemo";
import { VideoTile } from "@/components/VideoPlayer";
import { SHOWCASE_TABS } from "@/data/media";
import { useLang } from "@/lib/i18n";

/** "See it in action": three tabs (chat assistant, websites, automations).
 *  Each tab plays its video when one is set in src/data/media.ts, and
 *  otherwise shows its interactive demo or animation. */
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

  const tab = SHOWCASE_TABS[active];
  const label = t.showcase.tabs[active].label;

  const fallback = () => {
    if (tab.id === "chat") return <ChatDemo />;
    if (tab.id === "web") return <WebShowcaseVis name={t.showcase.slots[0]} />;
    return <N8nFlowVis name={t.showcase.slots[1]} />;
  };

  return (
    <section className="section" id="showcase">
      <div className="container">
        <h2 className="sec-title reveal">{t.showcase.secTitle}</h2>
        <SectionIntro num="002" statement={t.showcase.statement} aside={t.showcase.aside} />

        <div className="show-tabs reveal" role="tablist" aria-label={t.showcase.secTitle} onKeyDown={onKey}>
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
        </div>

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
          ) : tab.id === "chat" ? (
            <div className="card show-stage show-stage--chat">{fallback()}</div>
          ) : (
            fallback()
          )}
        </div>

        <SecFoot active={1} text={t.showcase.cta} to="contact" />
      </div>
    </section>
  );
}
