import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { STRINGS, type Lang, type Dict } from "@/data/translations";

const HTML_LANG: Record<Lang, string> = { en: "en", ms: "ms", zh: "zh-CN", ja: "ja", fr: "fr" };

export const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "ms", label: "Bahasa Malaysia", short: "BM" },
  { code: "zh", label: "中文", short: "中文" },
  { code: "ja", label: "日本語", short: "日本語" },
  { code: "fr", label: "Français", short: "FR" },
];

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const LangContext = createContext<Ctx>({ lang: "en", setLang: () => {}, t: STRINGS.en });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem("vaf-lang") as Lang | null;
      if (saved && saved in STRINGS) return saved;
    } catch { /* private mode */ }
    return "en";
  });

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
    try { localStorage.setItem("vaf-lang", lang); } catch { /* private mode */ }
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t: STRINGS[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
