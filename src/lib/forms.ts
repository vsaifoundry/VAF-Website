import type { FormEvent } from "react";
import { postSupabase } from "./supabase";

export type FormMsgs = {
  required: string; sending: string; success: string;
  noKey: string; fail: string; network: string;
};

/** Shared submit pipeline: validate required fields (red border on miss),
 *  post to Supabase, surface a translated status note. */
export function makeSubmitHandler(
  table: string,
  build: (form: HTMLFormElement) => Record<string, unknown>,
  msgs: FormMsgs,
  setNote: (s: string) => void,
) {
  return async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    let ok = true;
    form.querySelectorAll<HTMLInputElement>("[required]").forEach((f) => {
      if (!f.value.trim()) { ok = false; f.style.borderColor = "#FF0033"; }
      else { f.style.borderColor = ""; }
    });
    if (!ok) { setNote(msgs.required); return; }
    setNote(msgs.sending);
    const res = await postSupabase(table, build(form));
    if (res.ok) {
      setNote(msgs.success);
      form.reset();
      setTimeout(() => setNote(""), 8000);
    } else {
      const key = res.code === "no_key" ? "noKey" : res.code ?? "fail";
      setNote(msgs[key]);
    }
  };
}

export const field = (form: HTMLFormElement, name: string) =>
  (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)
    ?.value.trim() ?? "";
