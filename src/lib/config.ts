/** Supabase connection. Paste your anon key to activate the forms and
 *  the chatbot's secure endpoint. In Vercel, set these as environment
 *  variables instead. */
export const VAF_CONFIG = {
  SUPABASE_URL:
    import.meta.env.VITE_SUPABASE_URL || "https://bnubhycpgjgnvvtlbouh.supabase.co",
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY || "",

  /** VAF chatbot.
   *  Default: a Supabase Edge Function (deploy supabase/functions/vaf-chat)
   *  that keeps the OpenAI key server-side, reading it from Supabase
   *  secrets. The anon key above is attached automatically when calling it.
   *  Until the function is deployed, the bot gracefully falls back to its
   *  built-in answers.
   *  VITE_OPENAI_API_KEY remains as a browser-side quick-test option only:
   *  any key shipped to the browser is visible to visitors. */
  CHAT_ENDPOINT:
    import.meta.env.VITE_CHAT_ENDPOINT ||
    `${import.meta.env.VITE_SUPABASE_URL || "https://bnubhycpgjgnvvtlbouh.supabase.co"}/functions/v1/vaf-chat`,
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY || "",
  CHAT_MODEL: import.meta.env.VITE_CHAT_MODEL || "gpt-4o-mini",
};

export const INSTAGRAM = "https://instagram.com/vsaifoundry";
export const CONTACTS = {
  instagram: INSTAGRAM,
  whatsapp: "https://wa.me/601133006972",
  telegram: "https://t.me/+601133006972",
  email: "mailto:forge@vsaifoundry.com",
  phoneDisplay: "+60 11-3300 6972",
  emailDisplay: "forge@vsaifoundry.com",
};
