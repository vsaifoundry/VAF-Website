/** Supabase connection. Paste your anon key to activate the forms.
 *  In Lovable, you can also set these via environment variables. */
export const VAF_CONFIG = {
  SUPABASE_URL:
    import.meta.env.VITE_SUPABASE_URL || "https://bnubhycpgjgnvvtlbouh.supabase.co",
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY || "",

  /** VAF chatbot — pick ONE of the two options below:
   *  1) CHAT_ENDPOINT (recommended for production): a backend proxy
   *     (e.g. a Supabase Edge Function) that holds your OpenAI key
   *     server-side. It receives POST {messages:[{role,content},...]}
   *     and must return JSON {reply:"..."}.
   *  2) OPENAI_API_KEY (quick start / testing): calls OpenAI directly
   *     from the browser. Note: any key shipped to the browser is
   *     visible to visitors — use a spending limit, or switch to
   *     CHAT_ENDPOINT before heavy traffic.
   *  With neither set, the bot still works with built-in quick answers. */
  CHAT_ENDPOINT: import.meta.env.VITE_CHAT_ENDPOINT || "",
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY || "",
  CHAT_MODEL: import.meta.env.VITE_CHAT_MODEL || "gpt-4o-mini",
};

export const INSTAGRAM = "https://instagram.com/vsaifoundry";
