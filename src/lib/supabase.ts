import { VAF_CONFIG } from "./config";

export type PostResult = { ok: boolean; code?: "no_key" | "fail" | "network" };

export async function postSupabase(
  table: string,
  payload: Record<string, unknown>,
): Promise<PostResult> {
  if (!VAF_CONFIG.SUPABASE_ANON_KEY) return { ok: false, code: "no_key" };
  try {
    const res = await fetch(`${VAF_CONFIG.SUPABASE_URL}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        apikey: VAF_CONFIG.SUPABASE_ANON_KEY,
        Authorization: `Bearer ${VAF_CONFIG.SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
    });
    if (res.ok) return { ok: true };
    return { ok: false, code: "fail" };
  } catch {
    return { ok: false, code: "network" };
  }
}
