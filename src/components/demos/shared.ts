import { useCallback, useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";
import { reduceMotion } from "@/lib/scroll";

/** setTimeout that is cleaned up automatically, plus a way to cancel
 *  everything pending (used by "Start over" and language switches). */
export function useTimers() {
  const ids = useRef<number[]>([]);
  const clear = useCallback(() => { ids.current.forEach(clearTimeout); ids.current = []; }, []);
  const after = useCallback((ms: number, fn: () => void) => {
    ids.current.push(window.setTimeout(fn, reduceMotion ? Math.min(ms, 120) : ms));
  }, []);
  useEffect(() => clear, [clear]);
  return { after, clear };
}

/** Runs `reset` whenever the site language changes, so a half-played
 *  demo never mixes two languages. */
export function useResetOnLang(reset: () => void) {
  const { lang } = useLang();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);
}

const LOCALE: Record<string, string> = { en: "en-MY", ms: "ms-MY", zh: "zh-CN", ja: "ja-JP", fr: "fr-FR" };
export const localeOf = (lang: string) => LOCALE[lang] ?? "en-MY";

export const formatRM = (n: number, lang: string, decimals = 2) =>
  "RM " + n.toLocaleString(localeOf(lang), { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
