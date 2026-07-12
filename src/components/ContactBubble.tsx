import { useEffect, useState } from "react";
import { CONTACTS } from "@/lib/config";
import { InstagramIcon } from "./ui";

const ITEMS = [
  {
    label: "Instagram", href: CONTACTS.instagram, cls: "ig",
    icon: <InstagramIcon />,
  },
  {
    label: "WhatsApp", href: CONTACTS.whatsapp, cls: "wa",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 2.5A9.4 9.4 0 0 0 3.9 16.7L2.6 21.4l4.8-1.3A9.4 9.4 0 1 0 12 2.5Z"
          fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M8.6 8.4c0 4 3 7 7 7l1.2-1.7-2.2-1.3-1 .8c-1.3-.6-2.2-1.5-2.8-2.8l.8-1-1.3-2.2Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Telegram", href: CONTACTS.telegram, cls: "tg",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3.5 11.3 20.2 4.9c.8-.3 1.5.4 1.3 1.2l-2.9 12.6c-.2.8-1.1 1.1-1.7.6l-4-3-2 2c-.5.5-1.3.3-1.5-.4l-1.3-4-4.4-1.4c-.8-.2-.8-1.4-.2-1.7Z"
          fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Email", href: CONTACTS.email, cls: "gm",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="5.5" width="18" height="13" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 7.5 12 13.5 20 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/** Floating speed-dial (bottom-left) with the company's contact
 *  channels. Counterpart to the chatbot bubble on the right. */
export function ContactBubble() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [open]);

  return (
    <div className={`contact-dial${open ? " open" : ""}`} onClick={(e) => e.stopPropagation()}>
      <div className="cd-items" aria-hidden={!open}>
        {ITEMS.map((it, i) => (
          <a
            key={it.label}
            className={`cd-item ${it.cls}`}
            href={it.href}
            target={it.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener"
            aria-label={it.label}
            tabIndex={open ? 0 : -1}
            style={{ transitionDelay: open ? `${i * 45}ms` : `${(ITEMS.length - 1 - i) * 30}ms` }}
          >
            <span className="cd-ic">{it.icon}</span>
            <span className="cd-label">{it.label}</span>
          </a>
        ))}
      </div>
      <button
        type="button"
        className="cd-fab"
        aria-label="Contact us"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <svg className="cd-open-ic" viewBox="0 0 24 24">
          <path d="M6.8 3.6c.7-.4 1.5-.2 1.9.5l1.4 2.4c.4.6.2 1.4-.3 1.9l-1.1 1c.8 1.9 2.1 3.2 3.9 4l1-1.1c.5-.6 1.3-.7 1.9-.3l2.4 1.4c.7.4.9 1.2.5 1.9l-1 1.8c-.5.8-1.3 1.3-2.2 1.2C9.7 17.7 6.3 14.3 5.7 8.8c-.1-.9.4-1.8 1.1-2.2l0 0Z"
            transform="translate(1.2 1.2) scale(.92)" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
        </svg>
        <svg className="cd-close-ic" viewBox="0 0 24 24">
          <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
