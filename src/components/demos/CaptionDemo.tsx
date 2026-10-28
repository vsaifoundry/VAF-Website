import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { reduceMotion } from "@/lib/scroll";
import { useTimers, useResetOnLang } from "./shared";

/* The captions are the product being shown off, so they are always the same
   three languages (English, Bahasa Melayu, Chinese) whatever the site language. */
const PRODUCTS = [
  {
    icon: "🍛", name: "Nasi Lemak Special",
    en: "Our Nasi Lemak Special is back! 🍛 Fragrant coconut rice, crispy ayam goreng and our famous homemade sambal. Only RM12.90 this week. WhatsApp us to order!",
    ms: "Nasi Lemak Special kami kembali! 🍛 Nasi lemak wangi, ayam goreng rangup dan sambal air tangan kami. Hanya RM12.90 minggu ini. WhatsApp kami untuk tempah!",
    zh: "招牌椰浆饭回来啦！🍛 香喷喷的椰浆饭、酥脆炸鸡，再配上我们自家秘制参巴。本周只需 RM12.90，WhatsApp 我们即可下单！",
  },
  {
    icon: "✨", name: "Keratin Hair Treatment",
    en: "Frizzy hair? ✨ Our Keratin Treatment leaves hair smooth and shiny for up to 3 months. RM50 off this month only. Book your slot on WhatsApp today!",
    ms: "Rambut kusut? ✨ Rawatan Keratin kami menjadikan rambut licin dan berkilat sehingga 3 bulan. Diskaun RM50 bulan ini sahaja. Tempah slot anda di WhatsApp hari ini!",
    zh: "头发毛躁？✨ 我们的角蛋白护理让秀发柔顺亮泽长达 3 个月。本月限定立减 RM50，今天就 WhatsApp 预约吧！",
  },
  {
    icon: "🌿", name: "Durian Weekend Sale",
    en: "Durian weekend is here! 🌿 Fresh Musang King and D24 straight from Raub. Buy 2kg, get 500g free. Saturday & Sunday only. Come early!",
    ms: "Hujung minggu durian dah tiba! 🌿 Musang King dan D24 segar terus dari Raub. Beli 2kg, percuma 500g. Sabtu & Ahad sahaja. Datang awal!",
    zh: "榴莲周末来啦！🌿 新鲜猫山王和 D24 直送自劳勿。买 2 公斤送 500 克，仅限周六周日，早来早得！",
  },
];
const LANGS = [
  { key: "en", label: "English" },
  { key: "ms", label: "Bahasa Melayu" },
  { key: "zh", label: "中文" },
] as const;

const STEPS = 28; // typewriter frames

export function CaptionDemo() {
  const { t } = useLang();
  const d = t.demos.captions;
  const { after, clear } = useTimers();
  const [pick, setPick] = useState<number | null>(null);
  const [frame, setFrame] = useState(STEPS);
  const [copied, setCopied] = useState<string | null>(null);

  const reset = () => { clear(); setPick(null); setFrame(STEPS); setCopied(null); };
  useResetOnLang(reset);

  const choose = (i: number) => {
    clear();
    setPick(i);
    setCopied(null);
    if (reduceMotion) { setFrame(STEPS); return; }
    setFrame(0);
    for (let f = 1; f <= STEPS; f++) after(260 + f * 45, () => setFrame(f));
  };

  const copy = async (key: string, text: string) => {
    try { await navigator.clipboard.writeText(text); } catch { /* clipboard blocked: still show the text */ }
    setCopied(key);
    after(1600, () => setCopied(null));
  };

  const writing = pick !== null && frame < STEPS;
  const p = pick !== null ? PRODUCTS[pick] : null;

  return (
    <div className="dm dm-captions">
      <div className="dm-panel">
        <span className="dm-label">{d.pick}</span>
        <div className="cap-products" role="group" aria-label={d.pick}>
          {PRODUCTS.map((pr, i) => (
            <button key={pr.name} type="button" className={`cap-prod${pick === i ? " on" : ""}`}
              onClick={() => choose(i)} aria-pressed={pick === i}>
              <span className="cap-emoji" aria-hidden>{pr.icon}</span>{pr.name}
            </button>
          ))}
        </div>

        <div className="cap-grid" aria-live="polite" aria-busy={writing}>
          {LANGS.map((l, li) => {
            const full = p ? p[l.key] : "";
            // the three captions type out together; Chinese is shorter, so it scales by its own length
            const chars = Array.from(full); // by character, so emoji never split mid-typing
            const shown = chars.slice(0, Math.ceil((chars.length * frame) / STEPS)).join("");
            return (
              <article key={l.key} className={`cap-card${p ? " has" : ""}`} style={{ animationDelay: `${li * 70}ms` }}>
                <header>
                  <span className={`cap-lang l-${l.key}`}>{l.label}</span>
                  {p && !writing && (
                    <button type="button" className="cap-copy" onClick={() => copy(l.key, full)}>
                      {copied === l.key ? d.copied : d.copy}
                    </button>
                  )}
                </header>
                {p ? (
                  <p>{shown}{writing && <i className="cap-caret" aria-hidden />}</p>
                ) : (
                  <p className="cap-empty">{d.empty}</p>
                )}
              </article>
            );
          })}
        </div>
        {writing && <span className="dm-status">{d.writing}</span>}
      </div>
    </div>
  );
}
