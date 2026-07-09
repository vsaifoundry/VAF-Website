import { Fragment, useMemo, type ReactNode, type MouseEvent } from "react";
import { useLang } from "@/lib/i18n";
import { scrollToId } from "@/lib/scroll";
import { useCountUp } from "@/hooks/useCountUp";

/** Anchor that uses the inertial scroller. */
export function ScrollLink({
  to, className, children, ...rest
}: { to: string; className?: string; children: ReactNode } & Record<string, unknown>) {
  const onClick = (e: MouseEvent) => { e.preventDefault(); scrollToId(to); };
  return (
    <a href={`#${to.replace(/^#/, "")}`} className={className} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}

export const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" className="ic">
    <path d="M2 8h11M9 3.5 13.5 8 9 12.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);
export const PrevIcon = () => (
  <svg viewBox="0 0 16 16" className="ic">
    <path d="M14 8H3M7 3.5 2.5 8 7 12.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);
export const CheckIcon = () => (
  <svg viewBox="0 0 16 16" className="ic">
    <path d="M2.5 8.5 6 12l7.5-7.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);
export const InstagramIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.6 4.8-4.9 4.9-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8C2.4 4 3.9 2.4 7.2 2.3c1.2 0 1.6-.1 4.8-.1Zm0 3.6a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4Zm0 2.2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm6.4-2.7a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9Z" />
  </svg>
);
export const DotsIc = ({ light }: { light?: boolean }) => (
  <span className={`dots-ic${light ? " light" : ""}`} aria-hidden />
);

/** Word spans for the scroll-fill effect — rendered by React so the
 *  text swaps cleanly when the language changes. */
export function FillWords({ text }: { text: string }) {
  const words = text.split(/\s+/);
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={`${i}-${w}`}>
          <span className="w">{w}</span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

export function SectionIntro({
  num, statement, aside,
}: { num: string; statement: string; aside: string }) {
  return (
    <div className="sec-intro">
      <div className="sec-num reveal">
        <span className="num">{num}</span>
        <span className="brand">V's AI Foundry®</span>
      </div>
      <p className="sec-statement" data-fill><FillWords text={statement} /></p>
      <p className="sec-aside reveal">{aside}</p>
    </div>
  );
}

export function Ticks({ count, active }: { count: number; active: number }) {
  return (
    <div className="ticks">
      {Array.from({ length: count }, (_, i) => (
        <i key={i} className={i === active ? "on" : ""} />
      ))}
    </div>
  );
}

export function Pillbar({
  count, active, onSelect,
}: { count: number; active: number; onSelect?: (i: number) => void }) {
  return (
    <div className="pillbar">
      {Array.from({ length: count }, (_, i) => (
        <i key={i} className={i === active ? "on" : ""} role="button"
           onClick={onSelect ? () => onSelect(i) : undefined} />
      ))}
    </div>
  );
}

export function DotGrid({ rows = 4, cols = 5, subtle }: { rows?: number; cols?: number; subtle?: boolean }) {
  const dots = useMemo(() => Array.from({ length: rows * cols }, () => Math.random()), [rows, cols]);
  return (
    <div className={`dotgrid${subtle ? " subtle" : ""}`}
         style={{ gridTemplateColumns: `repeat(${cols},1fr)` }} aria-hidden>
      {dots.map((r, i) => (
        <i key={i} style={{ animationDelay: `${(r * 3).toFixed(2)}s` }} />
      ))}
    </div>
  );
}

export function Count({
  to, suffix, prefix, decimals, initial,
}: { to: number; suffix?: string; prefix?: string; decimals?: number; initial?: string }) {
  const ref = useCountUp(to, { suffix, prefix, decimals });
  return <b ref={ref as React.RefObject<HTMLElement>}>{initial ?? "0"}</b>;
}

export function SpinBadge({ inline }: { inline?: boolean }) {
  const { t } = useLang();
  return (
    <div className={`spin-badge${inline ? " inline" : ""}`} aria-hidden>
      <svg viewBox="0 0 120 120">
        <defs>
          <path id={inline ? "circ-i" : "circ"} d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <text>
          <textPath href={`#${inline ? "circ-i" : "circ"}`}>{t.common.badge}</textPath>
        </text>
      </svg>
      <i />
    </div>
  );
}
