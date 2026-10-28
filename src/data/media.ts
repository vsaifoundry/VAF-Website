/* ====================================================================
   Showcase videos — the one place to add or swap a video.

   Each showcase tab can show a video. Leave `video` empty and the tab
   shows its built-in animation instead, so the site always looks
   complete, with or without footage.

   Two ways to add a video:
   1. A file in the repo (short clips, ideally under ~20 MB):
        put demo.mp4 (and a poster image) in /public/video/, then
        video: { src: "/video/demo.mp4", poster: "/video/demo.jpg" }
   2. A YouTube video (best for anything longer):
        video: { youtube: "dQw4w9WgXcQ" }   ← the ID from the YouTube link
   ==================================================================== */

export type ShowcaseVideo =
  | { src: string; poster?: string }
  | { youtube: string; poster?: string };

export type ShowcaseTab = {
  id: "chat" | "missed" | "captions" | "receipts" | "report" | "web" | "flow";
  video?: ShowcaseVideo;
};

/* The order here is the order of the tabs. Their labels and one-line
   descriptions are in src/data/translations.ts (showcase.tabs), in the
   same order, so move both together. */
export const SHOWCASE_TABS: ShowcaseTab[] = [
  { id: "chat" /* , video: { src: "/video/whatsapp-demo.mp4", poster: "/video/whatsapp-demo.jpg" } */ },
  { id: "missed" },
  { id: "captions" },
  { id: "receipts" },
  { id: "report" },
  { id: "web" },
  { id: "flow" },
];
