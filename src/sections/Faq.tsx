import { useRef } from "react";
import { SectionIntro, ScrollLink, ArrowIcon, SpinBadge } from "@/components/ui";
import { SecFoot } from "@/components/SecFoot";
import { ConvoVis } from "@/components/visuals";
import { reduceMotion } from "@/lib/scroll";
import { useLang } from "@/lib/i18n";

const EASE = "cubic-bezier(.23,1,.32,1)";

function FaqItem({ q, a }: { q: string; a: string }) {
  const itemRef = useRef<HTMLDetailsElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const animating = useRef(false);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const item = itemRef.current!, body = bodyRef.current!;
    if (animating.current) return;
    if (reduceMotion || !body.animate) { item.open = !item.open; return; }
    animating.current = true;
    body.style.overflow = "hidden";
    if (item.open) {
      const h = body.offsetHeight;
      const anim = body.animate(
        [{ height: `${h}px`, opacity: 1 }, { height: "0px", opacity: 0 }],
        { duration: 420, easing: EASE },
      );
      anim.onfinish = anim.oncancel = () => {
        item.open = false; body.style.overflow = ""; animating.current = false;
      };
    } else {
      item.open = true;
      const h = body.offsetHeight;
      const anim = body.animate(
        [{ height: "0px", opacity: 0 }, { height: `${h}px`, opacity: 1 }],
        { duration: 420, easing: EASE },
      );
      anim.onfinish = anim.oncancel = () => {
        body.style.overflow = ""; animating.current = false;
      };
    }
    setTimeout(() => { animating.current = false; }, 700);
  };

  return (
    <details className="faq-item" ref={itemRef}>
      <summary onClick={onClick}>
        {q}
        <span className="faq-ic"><i /><i /></span>
      </summary>
      <div className="faq-a" ref={bodyRef}><p>{a}</p></div>
    </details>
  );
}

export function Faq() {
  const { t } = useLang();
  return (
    <section className="section" id="faq">
      <div className="container">
        <h2 className="sec-title reveal">{t.faq.secTitle}</h2>
        <SectionIntro num="007" statement={t.faq.statement} aside={t.faq.aside} />

        <div className="faq-grid reveal">
          <div className="faq-list">
            {t.faq.items.map(([q, a]) => <FaqItem key={q} q={q} a={a} />)}
          </div>

          <div className="faq-side">
            <div className="card faq-photo reveal">
              <ConvoVis />
              <SpinBadge />
            </div>
            <div className="card faq-chat reveal">
              <h3>{t.faq.chatTitle}</h3>
              <p>{t.faq.chatCopy}</p>
              <div className="chat-cta">
                <span>{t.faq.chatCta}</span>
                <ScrollLink to="contact" className="btn-arrow solid" aria-label={t.faq.chatCta}>
                  <ArrowIcon />
                </ScrollLink>
              </div>
            </div>
          </div>
        </div>

        <SecFoot active={6} text={t.faq.cta} to="audit" />
      </div>
    </section>
  );
}
