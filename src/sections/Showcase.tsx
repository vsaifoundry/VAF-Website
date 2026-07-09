import { SectionIntro } from "@/components/ui";
import { SecFoot } from "@/components/SecFoot";
import { VideoSlot } from "@/components/visuals";
import { useLang } from "@/lib/i18n";

/** Product demo reel. Drop a .mp4 or .gif into /public and pass it as
 *  `src` on any slot below to replace the placeholder. */
export function Showcase() {
  const { t } = useLang();
  return (
    <section className="section" id="showcase">
      <div className="container">
        <h2 className="sec-title reveal">{t.showcase.secTitle}</h2>
        <SectionIntro num="002" statement={t.showcase.statement} aside={t.showcase.aside} />

        <div className="show-grid">
          <div className="show-main">
            <VideoSlot wide name={t.showcase.slots[0]} />
          </div>
          <VideoSlot name={t.showcase.slots[1]} />
          <VideoSlot name={t.showcase.slots[2]} />
        </div>

        <SecFoot active={1} text={t.showcase.cta} to="contact" />
      </div>
    </section>
  );
}
