# V's AI Foundry — Website (React / Vite / Lovable-ready)

The full VAF marketing site rebuilt as a React + Vite + TypeScript + Tailwind
project using Lovable's conventions (`lovable-tagger`, `@` alias, port 8080),
so it drops straight into the Lovable ecosystem for prompt-based edits.

## Run locally
```bash
npm install
npm run dev        # http://localhost:8080
npm run build      # production build → dist/
```

## Connect the forms (Supabase)
Both audit forms and the contact form post to Supabase REST.
Either paste your anon key in `src/lib/config.ts`, or copy `.env.example`
to `.env` and set `VITE_SUPABASE_ANON_KEY`. Until then, forms show a friendly
"not connected yet" note instead of failing.

## Import into Lovable (GitHub sync)
1. Push this folder to a **new GitHub repo** (keep your old Lovable repo untouched):
   ```bash
   git init && git add . && git commit -m "VAF site v1"
   git branch -M main
   git remote add origin https://github.com/YOURNAME/vaf-website.git
   git push -u origin main
   ```
2. In Lovable: create a blank project → Settings → Connectors → GitHub →
   connect your account and link the project to a repo.
3. Easiest path: after Lovable creates its repo, clone it, delete everything
   except `.git`, copy this project's files in, commit and push — Lovable
   syncs the code back automatically and you can start prompt-editing.
4. Publish inside Lovable, then move the `vsaifoundry.com` custom domain from
   the old project (Settings → Domains → disconnect) to this one.

## Adding real showcase videos
`src/sections/Showcase.tsx` renders three `<VideoSlot>` placeholders. Drop an
`.mp4` or `.gif` into `public/` and pass it in:
```tsx
<VideoSlot wide name="Client WhatsApp AI System — live demo" src="/demo.mp4" />
```

## Structure
- `src/sections/` — one file per page section (Hero → Footer)
- `src/components/` — header/menu, shared UI, all animated visuals
- `src/hooks/` + `src/lib/` — inertial scroll, word-fill titles, reveals,
  counters, carousels, Supabase form pipeline
- `src/styles/site.css` — the complete design system (light + dark themes)

## VAF Chatbot

The site ships with a themed chatbot (bottom-right) that only answers
questions about V's AI Foundry, with guardrails against off-topic and
prompt-injection attempts. It works out of the box with built-in quick
answers.

To make it fully AI-powered (secure, key never reaches the browser):

1. Deploy the Supabase Edge Function in `supabase/functions/vaf-chat/index.ts`
   (Supabase Dashboard -> Edge Functions -> Deploy new function -> name it
   `vaf-chat` -> paste the file -> Deploy).
2. Add your OpenAI key as a Supabase secret named `OPENAI_API_KEY`
   (Edge Functions -> Secrets). Optional: `CHAT_MODEL` secret to change
   the model (default gpt-4o-mini).
3. Make sure `VITE_SUPABASE_ANON_KEY` is set (Vercel env or
   src/lib/config.ts); the widget uses it to authenticate the call.

The widget already points at `<SUPABASE_URL>/functions/v1/vaf-chat` by
default and falls back to built-in answers until the function is live.
`VITE_OPENAI_API_KEY` remains as a browser-side quick-test option only:
any key shipped to the browser is visible to visitors.
