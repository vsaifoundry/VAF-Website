import { ScrollLink, ArrowIcon, Ticks } from "./ui";

export const TICKS_TOTAL = 12;

export function SecFoot({
  active, text, to, external,
}: { active: number; text: string; to: string; external?: boolean }) {
  return (
    <div className="sec-foot reveal">
      <Ticks count={TICKS_TOTAL} active={active} />
      <div className="sec-cta">
        <span>{text}</span>
        {external ? (
          <a className="btn-arrow solid" href={to} target="_blank" rel="noopener" aria-label={text}>
            <ArrowIcon />
          </a>
        ) : (
          <ScrollLink to={to} className="btn-arrow solid" aria-label={text}>
            <ArrowIcon />
          </ScrollLink>
        )}
      </div>
    </div>
  );
}
