import { BUSINESS } from "./site-data";

// Static mobile dock — a 44px+ tap target that never goes away on phones.
export default function WhatsAppSticky() {
  return (
    <a
      href={BUSINESS.waLink}
      aria-label={`WhatsApp ${BUSINESS.name} — ${BUSINESS.phoneDisplay}`}
      className="fixed right-4 bottom-4 z-50 flex h-13 w-13 items-center justify-center rounded-full bg-coral shadow-[0_8px_30px_rgba(13,27,43,0.35)] md:hidden"
    >
      {/* glyph: speech-bubble WhatsApp mark, drawn not emoji */}
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
        <path d="M12 2.4A9.6 9.6 0 0 0 3.6 16.4L2.4 21.6l5.3-1.2A9.6 9.6 0 1 0 12 2.4Zm0 17.3a7.7 7.7 0 0 1-3.9-1.07l-.28-.16-3.1.7.7-3-.18-.3A7.7 7.7 0 1 1 12 19.7Zm4.36-5.66c-.24-.12-1.4-.69-1.62-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06a6.34 6.34 0 0 1-1.86-1.15 6.9 6.9 0 0 1-1.28-1.6c-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.19 1.1.16 1.52.1.46-.07 1.4-.57 1.6-1.13.2-.54.2-1.01.14-1.11-.06-.1-.22-.16-.46-.28Z" />
      </svg>
    </a>
  );
}
