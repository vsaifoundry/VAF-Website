import { SectionIntro, Count } from "@/components/ui";
import { SecFoot } from "@/components/SecFoot";
import { OpsVis, Donut, Barfield, TClock } from "@/components/visuals";
import { useLang } from "@/lib/i18n";

const CLOCK_META = [
  { off: 8, dots: ["on", "on", "on", ""] },
  { off: 9, dots: ["on", "on", "on", "on"] },
  { off: -5, dots: ["ring", "ring", "ring", "ring"] },
];

const EVO_META = [
  { v: "88%", val: "<30s" },
  { v: "100%", val: "24/7" },
  { v: "98%", val: "98%" },
  { v: "90%", val: "<10%" },
];

export function Numbers() {
  const { t } = useLang();
  const n = t.numbers;
  return (
    <section className="section" id="statistics">
      <div className="container">
        <h2 className="sec-title reveal">{n.secTitle}</h2>
        <SectionIntro num="005" statement={n.statement} aside={n.aside} />

        <div className="ana-grid">
          <article className="card ana-visual reveal">
            <OpsVis />
            <div className="card-top">
              <h3 className="card-title light">{n.ops.pre}<b className="ai">{n.ops.ai}</b>{n.ops.post}</h3>
            </div>
          </article>

          <article className="card ana-health reveal">
            <h3 className="ana-h">{n.leadTitle}</h3>
            <p className="ana-sub">{n.leadSub}</p>
            <Donut segs={[85, 15]} />
            <div className="donut-legend">
              <div><Count to={85} suffix="%" initial="0%" /><span>{n.captured}</span></div>
              <div><Count to={15} suffix="%" initial="0%" /><span>{n.missed}</span></div>
            </div>
            <p className="ana-foot">{n.forgeTested}</p>
          </article>

          <article className="card ana-clocks reveal">
            <div className="clock-row">
              {n.clocks.map((c, ci) => (
                <div className="clock-cell" key={ci}>
                  <h4>{c.city}</h4><span className="tz">{c.tz}</span>
                  <TClock offset={CLOCK_META[ci].off} />
                  <div className="clock-dots">{CLOCK_META[ci].dots.map((d, i) => <i key={i} className={d} />)}</div>
                  <b>{n.online}</b><span className="lat">{n.alwaysOn}</span>
                </div>
              ))}
            </div>
            <p className="ana-foot pill">{n.coverage}</p>
          </article>
        </div>

        <div className="stats-grid">
          <article className="card stat-uptime reveal">
            <Barfield />
            <p className="stat-cap-top">{n.monitoring}</p>
            <div className="stat-bottom">
              <span className="huge"><Count to={100} /><sup>%</sup></span>
              <span className="stat-name">{n.tested}</span>
            </div>
          </article>

          <article className="card stat-perf reveal">
            <h3 className="ana-h center">{n.perfTitle}</h3>
            <p className="ana-sub center">{n.perfSub}</p>
            <div className="linechart">
              <svg viewBox="0 0 320 170" preserveAspectRatio="none">
                <g className="grid-lines">
                  <line x1="34" y1="20" x2="312" y2="20" /><line x1="34" y1="55" x2="312" y2="55" />
                  <line x1="34" y1="90" x2="312" y2="90" /><line x1="34" y1="125" x2="312" y2="125" />
                  <line x1="34" y1="150" x2="312" y2="150" />
                </g>
                <g className="axis">
                  <text x="28" y="24">100%</text><text x="28" y="59">75%</text>
                  <text x="28" y="94">50%</text><text x="28" y="129">25%</text><text x="28" y="154">0</text>
                  <text x="70" y="166" className="xl">Q1</text><text x="150" y="166" className="xl">Q2</text>
                  <text x="228" y="166" className="xl">Q3</text><text x="306" y="166" className="xl">Q4</text>
                </g>
                <polyline className="line line-std" points="40,142 70,118 110,112 150,104 190,98 228,110 268,92 306,118" pathLength={100} />
                <polyline className="line line-opt" points="40,138 70,92 110,78 150,74 190,28 228,96 268,42 306,38" pathLength={100} />
                <circle className="pt" cx="190" cy="28" r="4" />
                <circle className="pt pt2" cx="228" cy="96" r="4" />
              </svg>
              <div className="tip" style={{ left: "64%", top: "44%" }}>&lt;5s <i /></div>
            </div>
            <div className="perf-legend">
              <div><Count to={98} suffix="%" initial="0%" /><span>{n.withAI}</span><i className="dot orange" /></div>
              <div><Count to={40} suffix="%" initial="0%" /><span>{n.manual}</span><i className="dot" /></div>
            </div>
          </article>

          <article className="card stat-evo reveal">
            <div className="evo-head">
              <div>
                <h3 className="ana-h">{n.beforeAfter}</h3>
                <p className="ana-sub">{n.evoSub}</p>
              </div>
              <div className="evo-score"><span>{n.tested}</span><b><Count to={100} />%</b></div>
            </div>
            <div className="evo-bars">
              {n.evoLabels.map((label, ei) => (
                <div className="evo-col" key={ei}>
                  <div className="evo-track">
                    <div className="evo-fill" style={{ "--v": EVO_META[ei].v } as React.CSSProperties}>
                      <span>{EVO_META[ei].val}</span>
                    </div>
                  </div>
                  <label>{label}</label>
                </div>
              ))}
            </div>
          </article>

          <div className="stat-side">
            <article className="card stat-model reveal">
              <span className="pill-tag">{n.alwaysOnPill}</span>
              <div className="battery"><i /><i /><i /><i /><i /><i className="low" /></div>
              <span className="huge sm"><Count to={24} />/7</span>
            </article>
            <article className="card stat-partners reveal">
              <span>{n.partners}</span>
              <span className="ip-list">ManyChat · n8n · Sakana AI · Airtable · Notion</span>
              <svg className="git-ic" viewBox="0 0 24 24">
                <circle cx="6" cy="6" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="6" cy="18" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="18" cy="9" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path d="M6 8.6v6.8M18 11.6c0 3.4-4.6 3-8.4 4.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </article>
          </div>
        </div>

        <div className="marquee reveal">
          <div className="marquee-track">
            {[...n.marquee, ...n.marquee].map((m, i) => <span key={i}>{m}</span>)}
          </div>
        </div>

        <SecFoot active={4} text={n.cta} to="contact" />
      </div>
    </section>
  );
}
