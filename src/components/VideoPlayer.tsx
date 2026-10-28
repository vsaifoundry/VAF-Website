import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ShowcaseVideo } from "@/data/media";
import { useLang } from "@/lib/i18n";
import { reduceMotion } from "@/lib/scroll";

const isYouTube = (v: ShowcaseVideo): v is { youtube: string; poster?: string } => "youtube" in v;
const posterOf = (v: ShowcaseVideo) =>
  v.poster ?? (isYouTube(v) ? `https://i.ytimg.com/vi/${v.youtube}/hqdefault.jpg` : undefined);

export const PlayIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden><path d="M8 5.5v13l10.5-6.5L8 5.5Z" fill="currentColor" /></svg>
);

/** Full-screen player. Esc, the close button or a click on the dimmed
 *  backdrop closes it; focus returns to whatever opened it. */
export function VideoLightbox({
  video, title, onClose,
}: { video: ShowcaseVideo; title: string; onClose: () => void }) {
  const { t } = useLang();
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onCloseRef.current(); };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, []);

  return createPortal(
    <div className="vlb" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <div className="vlb-frame" onClick={(e) => e.stopPropagation()}>
        {isYouTube(video) ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtube}?autoplay=1&rel=0&playsinline=1`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <video src={video.src} poster={video.poster} controls autoPlay playsInline />
        )}
      </div>
      <button ref={closeRef} type="button" className="vlb-close" onClick={onClose} aria-label={t.showcase.close}>
        <svg viewBox="0 0 24 24" aria-hidden>
          <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>,
    document.body,
  );
}

/** In-page video tile: a silent looping preview (only while on screen)
 *  with a big play button that opens the full player with sound. */
export function VideoTile({ video, title }: { video: ShowcaseVideo; title: string }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  const poster = posterOf(video);

  // play the silent preview only while it's visible, to save data and battery
  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting) el.play().catch(() => { /* autoplay blocked: poster stays */ });
      else el.pause();
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="vtile">
      {isYouTube(video) ? (
        poster && <img className="vtile-media" src={poster} alt="" loading="lazy" />
      ) : (
        <video
          ref={ref}
          className="vtile-media"
          src={video.src}
          poster={poster}
          muted loop playsInline preload="metadata"
          aria-hidden
        />
      )}
      <button type="button" className="vtile-play" onClick={() => setOpen(true)} aria-label={`${t.showcase.play}: ${title}`}>
        <span className="vtile-btn"><PlayIcon /></span>
        <span className="vtile-label">{t.showcase.watch}</span>
      </button>
      {open && <VideoLightbox video={video} title={title} onClose={() => setOpen(false)} />}
    </div>
  );
}
