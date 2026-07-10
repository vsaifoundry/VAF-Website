import { useEffect, useMemo, useRef } from "react";
import { useInView } from "@/hooks/useInView";
import { useLang } from "@/lib/i18n";

/* ---------- animated chat (Chat & Messaging) ---------- */
export const ChatVis = () => {
  const { t } = useLang();
  return (
    <div className="vis vis-chat">
      <div className="chatflow">
        <span className="cb in b1">{t.vis.chat[0]}</span>
        <span className="cb out b2">{t.vis.chat[1]}</span>
        <span className="cb in b3">{t.vis.chat[2]}</span>
        <span className="cb out b4 ok">{t.vis.chat[3]}</span>
        <span className="ct"><i /><i /><i /></span>
      </div>
      <span className="shine" />
    </div>
  );
};

/* ---------- animated blueprint (Consulting) ---------- */
export const BlueprintVis = ({ mini }: { mini?: boolean }) => (
  <div className={`vis vis-blueprint${mini ? " mini" : ""}`}>
    <div className="bp">
      <span className="bp-node n1" /><span className="bp-node n2" />
      <span className="bp-node n3" /><span className="bp-node n4" />
      <span className="bp-line l1" /><span className="bp-line l2" /><span className="bp-line l3" />
    </div>
  </div>
);

/* ---------- animated browser (AI Websites) ---------- */
export const BrowserVis = ({ mini }: { mini?: boolean }) => (
  <div className={`vis vis-browser${mini ? " mini" : ""}`}>
    <div className="bw">
      <span className="bw-bar"><i className="r" /><i className="y" /><i className="b" /></span>
      <span className="bw-hero" /><span className="bw-row w1" /><span className="bw-row w2" />
      <span className="bw-btn" /><span className="bw-cursor" />
    </div>
  </div>
);

/* ---------- animated equalizer (Creative AI) ---------- */
export const CreativeVis = ({ mini }: { mini?: boolean }) => (
  <div className={`vis vis-creative${mini ? " mini" : ""}`}>
    <div className="eq"><i /><i /><i /><i /><i /></div>
    <span className="eq-play" />
  </div>
);

export const ChatVisMini = () => {
  const { t } = useLang();
  return (
    <div className="vis vis-chat mini">
      <div className="chatflow">
        <span className="cb in b1">{t.vis.chat[0]}</span>
        <span className="cb out b2">{t.vis.chat[1]}</span>
        <span className="cb in b3">{t.vis.chat[2]}</span>
        <span className="cb out b4 ok">{t.vis.chat[3]}</span>
        <span className="ct"><i /><i /><i /></span>
      </div>
    </div>
  );
};

/* ---------- 2D process stage ---------- */
export const Proc2D = ({
  num, onAdvance,
}: { num: string; onAdvance: () => void }) => {
  const { t } = useLang();
  return (
    <div className="vis vis-proc2d">
      <span className="glow3d" />
      <span className="p2d-ring" />
      <span className="p2d-mark m1" /><span className="p2d-mark m2" />
      <span className="p2d-mark m3" /><span className="p2d-mark m4" />
      <button type="button" className="p2d-badge" onClick={onAdvance} aria-label="Next step">
        <span>{num}</span>
      </button>
      <span className="p3d-hint">{t.vis.procHint}</span>
    </div>
  );
};

/* ---------- pricing layer stacks ---------- */
export const StackVis = ({ layers }: { layers: number }) => (
  <div className="vis vis-stack">
    <span className="glow3d" />
    <div className="stack">{Array.from({ length: layers }, (_, i) => <i key={i} />)}</div>
  </div>
);

/* ---------- Forge: live code editor ---------- */
export const CodeVis = () => (
  <div className="vis vis-code">
    <div className="code">
      <span className="code-bar">
        <i className="r" /><i className="y" /><i className="b" />
        <span className="code-live"><i />LIVE</span>
      </span>
      <span className="cl c1" /><span className="cl c2" /><span className="cl c3" />
      <span className="cl c4" /><span className="cl c5" />
      <span className="code-caret" />
    </div>
  </div>
);

/* ---------- Forge: bubbling beaker ---------- */
export const LabVis = () => (
  <div className="vis vis-lab">
    <div className="beaker">
      <span className="bk-glass" /><span className="bk-liquid" />
      <span className="bk-bub b1" /><span className="bk-bub b2" /><span className="bk-bub b3" />
      <span className="bk-tick t1" /><span className="bk-tick t2" />
    </div>
  </div>
);

/* ---------- Forge: scanned chip ---------- */
export const ChipVis = () => (
  <div className="vis vis-chip">
    <div className="chip">
      <span className="chip-pins px1" /><span className="chip-pins px2" />
      <span className="chip-pins py1" /><span className="chip-pins py2" />
      <span className="chip-core"><span className="chip-scan" /></span>
      <span className="chip-dot cd1" /><span className="chip-dot cd2" /><span className="chip-dot cd3" />
    </div>
  </div>
);

/* ---------- Forge: signal ripple ---------- */
export const SignalVis = () => (
  <div className="vis vis-signal">
    <div className="sig">
      <span className="sig-ring sr1" /><span className="sig-ring sr2" /><span className="sig-ring sr3" />
      <span className="sig-core" />
      <span className="sig-label">24/7</span>
    </div>
  </div>
);

/* ---------- Q&A: two-person conversation ---------- */
export const ConvoVis = () => {
  const { t } = useLang();
  return (
    <div className="vis vis-convo">
      <div className="convo">
        <span className="pv p1"><i className="head" /><i className="body" /></span>
        <span className="pv p2"><i className="head" /><i className="body" /></span>
        <span className="cvb q">{t.vis.convoQ}</span>
        <span className="cvt"><i /><i /><i /></span>
        <span className="cvb a">{t.vis.convoA}</span>
      </div>
    </div>
  );
};

/* ---------- Numbers: operations dashboard ---------- */
export const OpsVis = () => (
  <div className="vis vis-ops">
    <div className="ops">
      <span className="ops-bar"><i className="r" /><i className="y" /><i className="b" /></span>
      <div className="ops-tiles">
        <span className="ot"><i className="ot-fill f1" /></span>
        <span className="ot"><i className="ot-fill f2" /></span>
        <span className="ot"><i className="ot-fill f3" /></span>
      </div>
      <svg className="ops-spark" viewBox="0 0 100 34" preserveAspectRatio="none" aria-hidden>
        <polyline points="0,28 14,22 28,24 42,14 56,18 70,8 84,12 100,4" pathLength={100} />
      </svg>
      <div className="ops-rows">
        <span className="orow"><i className="od b" /><b /></span>
        <span className="orow"><i className="od y" /><b /></span>
        <span className="orow"><i className="od rd" /><b /></span>
      </div>
    </div>
  </div>
);

/* ---------- Numbers: donut (animates in view) ---------- */
export const Donut = ({ segs }: { segs: number[] }) => {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const C = 2 * Math.PI * 44;
  let offset = 0;
  return (
    <div ref={ref} className="donut-wrap">
      <svg viewBox="0 0 120 120" className="donut">
        <circle cx="60" cy="60" r="44" className="donut-track" />
        {segs.map((pct, i) => {
          const len = Math.max((pct / 100) * C - 3, 0);
          const o = offset; offset += (pct / 100) * C;
          return (
            <circle key={i} cx="60" cy="60" r="44" className={`donut-seg seg-${"abc"[i]}`}
              style={{
                strokeDasharray: inView ? `${len} ${C}` : `0 ${C}`,
                strokeDashoffset: -o,
              }} />
          );
        })}
      </svg>
    </div>
  );
};

/* ---------- Numbers: 30-day barfield ---------- */
export const Barfield = () => {
  const bars = useMemo(() => Array.from({ length: 30 }, () => ({
    h: 25 + Math.round(Math.random() * 75),
    o: (0.55 + Math.random() * 0.45).toFixed(2),
  })), []);
  return (
    <div className="barfield" aria-hidden>
      {bars.map((b, i) => (
        <i key={i}
           style={{ "--h": b.h, opacity: b.o, transitionDelay: `${i * 18}ms` } as React.CSSProperties} />
      ))}
    </div>
  );
};

/* ---------- Numbers: live digital ring clock ---------- */
export const TClock = ({ offset }: { offset: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const tick = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const d = new Date(utc + offset * 3600000);
      el.querySelector("[data-h]")!.textContent = ("0" + d.getHours()).slice(-2);
      el.querySelector("[data-m]")!.textContent = ("0" + d.getMinutes()).slice(-2);
      el.style.setProperty("--p", ((d.getSeconds() / 60) * 100).toFixed(1) + "%");
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [offset]);
  return (
    <div ref={ref} className="tclock">
      <span className="tc-time"><b data-h>00</b><i>:</i><b data-m>00</b></span>
    </div>
  );
};

/* ---------- Showcase: video / gif placeholder slot ---------- */
export const VideoSlot = ({
  name, wide, src, poster,
}: { name: string; wide?: boolean; src?: string; poster?: string }) => {
  const { t } = useLang();
  return (
    <div className={`vslot ${wide ? "wide" : "half"} reveal`}>
      {src ? (
        src.endsWith(".gif") ? (
          <img className="demo" src={src} alt={name} />
        ) : (
          <video src={src} poster={poster} autoPlay muted loop playsInline />
        )
      ) : (
        <>
          <span className="vs-grid" />
          <span className="vs-scan" />
          <span className="vs-play" />
          <span className="vs-tag"><i />{t.showcase.tag}</span>
          <span className="vs-note">{t.showcase.note}</span>
        </>
      )}
      <span className="vs-name">{name}</span>
    </div>
  );
};

/** Animated n8n-style automation flow for the Showcase:
 *  Website -> Supabase -> WhatsApp + Telegram -> Gmail, with flowing
 *  connectors and traveling data packets. Pure inline SVG, no assets. */
export const N8nFlowVis = ({ name }: { name: string }) => (
  <div className="vslot wide n8n reveal">
    <span className="vs-grid" />
    <svg className="n8n-svg" viewBox="0 0 680 320" preserveAspectRatio="xMidYMid meet" aria-hidden>
      {/* editor chrome */}
      <circle cx="28" cy="30" r="4.5" fill="#FF5F57" />
      <circle cx="46" cy="30" r="4.5" fill="#FEBC2E" />
      <circle cx="64" cy="30" r="4.5" fill="#28C840" />
      <text x="86" y="35" fontSize="13" fontWeight="700" fill="#EA4B71" fontFamily="inherit">n8n</text>
      <text x="118" y="35" fontSize="12" fill="rgba(255,255,255,.45)" fontFamily="inherit">workflow</text>
      <g className="n8n-live">
        <circle cx="632" cy="30" r="4" fill="#28C840" />
        <text x="644" y="34" fontSize="11" fontWeight="600" fill="rgba(255,255,255,.6)" fontFamily="inherit">24/7</text>
      </g>

      {/* connectors: base + animated flow + ports */}
      <path id="n8nA" d="M140,160 C168,160 168,160 196,160" fill="none" />
      <path id="n8nB" d="M308,160 C340,160 340,96 372,96" fill="none" />
      <path id="n8nC" d="M308,160 C340,160 340,228 372,228" fill="none" />
      <path id="n8nD" d="M484,96 C516,96 516,160 544,160" fill="none" />
      <path id="n8nE" d="M484,228 C516,228 516,160 544,160" fill="none" />
      {["n8nA", "n8nB", "n8nC", "n8nD", "n8nE"].map((id) => (
        <g key={id}>
          <use href={`#${id}`} stroke="rgba(122,160,255,.16)" strokeWidth="2.5" />
          <use href={`#${id}`} className="n8n-link" stroke="#5B8CFF" strokeWidth="2" />
        </g>
      ))}
      {[[140, 160], [196, 160], [308, 160], [372, 96], [372, 228], [484, 96], [484, 228], [544, 160]].map(([x, y], i) => (
        <circle key={i} className="n8n-port" cx={x} cy={y} r="3.2" fill="#5B8CFF" />
      ))}

      {/* traveling packets */}
      <circle r="4" fill="#FFCC00">
        <animateMotion dur="2.6s" repeatCount="indefinite" begin="0s"><mpath href="#n8nA" /></animateMotion>
      </circle>
      <circle r="4" fill="#FFCC00">
        <animateMotion dur="2.6s" repeatCount="indefinite" begin="0.85s"><mpath href="#n8nB" /></animateMotion>
      </circle>
      <circle r="4" fill="#FFCC00">
        <animateMotion dur="2.6s" repeatCount="indefinite" begin="1.05s"><mpath href="#n8nC" /></animateMotion>
      </circle>
      <circle r="4" fill="#FFCC00">
        <animateMotion dur="2.6s" repeatCount="indefinite" begin="1.75s"><mpath href="#n8nD" /></animateMotion>
      </circle>
      <circle r="4" fill="#FFCC00">
        <animateMotion dur="2.6s" repeatCount="indefinite" begin="1.95s"><mpath href="#n8nE" /></animateMotion>
      </circle>

      {/* nodes */}
      {[
        { x: 28, y: 128, label: "Website" },
        { x: 196, y: 128, label: "Supabase" },
        { x: 372, y: 64, label: "WhatsApp" },
        { x: 372, y: 196, label: "Telegram" },
        { x: 544, y: 128, label: "Gmail" },
      ].map((n) => (
        <g key={n.label}>
          <rect x={n.x} y={n.y} width="112" height="64" rx="14"
            fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.16)" strokeWidth="1.2" />
          <text x={n.x + 66} y={n.y + 37} fontSize="13" fontWeight="600"
            fill="#E8ECF4" textAnchor="middle" fontFamily="inherit">{n.label}</text>
        </g>
      ))}

      {/* icons */}
      <g transform="translate(50,160)">{/* globe */}
        <circle r="10" fill="none" stroke="#7AA2FF" strokeWidth="1.7" />
        <path d="M-10,0 H10 M0,-10 C4,-6 4,6 0,10 C-4,6 -4,-6 0,-10Z" fill="none" stroke="#7AA2FF" strokeWidth="1.4" />
      </g>
      <g transform="translate(218,160)">{/* supabase bolt */}
        <path d="M2,-11 L-7,2 H-1 L-2,11 L7,-2 H1 Z" fill="#3ECF8E" />
      </g>
      <g transform="translate(394,96)">{/* whatsapp */}
        <circle r="10.5" fill="#25D366" />
        <path d="M-4.5,-3.5 c0,5 3,8 8,8 l1.4-2 -2.6-1.6 -1.2,1 c-1.6-.8-2.6-1.8-3.4-3.4 l1-1.2 -1.6-2.6 Z" fill="#fff" />
      </g>
      <g transform="translate(394,228)">{/* telegram */}
        <circle r="10.5" fill="#2AA9EB" />
        <path d="M-5.5,-0.5 L5.5,-4.5 L3.2,5 L0.4,2.4 L-1.4,4 L-1.6,1 Z" fill="#fff" />
      </g>
      <g transform="translate(566,160)">{/* gmail */}
        <rect x="-10" y="-7.5" width="20" height="15" rx="2.5" fill="#fff" />
        <path d="M-9,-5.5 L0,2 L9,-5.5" fill="none" stroke="#EA4335" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
    <span className="vs-name">{name}</span>
  </div>
);
