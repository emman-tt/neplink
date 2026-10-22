import TopBar from "../TopBar";
import SmoothScroll from "../SmoothScroll";
import ChannelRows from "./ChannelRows";
import HoursBoard from "./HoursBoard";
import MapBand from "./MapBand";
import ContactCta from "./ContactCta";
import Footer from "../Footer";
import WhatsAppSticky from "../WhatsAppSticky";
import { CONTACT } from "./contact-data";

export const metadata = {
  title: "Contact — Neplink Travel Hub, Santa Maria, Accra",
  description:
    "Reach the visa doctors: East Deseret Street, Santa Maria, Accra · P.O. Box AN 15429 Accra North · +233 24 740 5685 · Neplinkconsult@yandex.com. Mon–Sat 8:00–16:00, Sunday closed.",
};

// Contact — formal correspondence: one cream register (hero, channels,
// hours), a deeper cream map band, one navy closing band. All values come
// verbatim from the client's own CONTACT page.
export default function Contact() {
  return (
    <>
      <SmoothScroll />
      <main id="main">
        <TopBar />
        <ContactHero />
        <ChannelRows />
        <HoursBoard />
        <MapBand />
        <ContactCta />
        <Footer />
      </main>
      <WhatsAppSticky />
    </>
  );
}

// Hero — cream band; the right card is the quick-dial panel so the first
// screen already serves the primary actions.
function ContactHero() {
  return (
    <section
      id="top"
      aria-label="Contact Neplink Travel Hub"
      className="relative w-full overflow-hidden bg-cloud px-5 pb-12 pt-28 md:px-14 md:pb-16 md:pt-36"
    >
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-14">
        <div className="flex max-w-[720px] flex-col gap-5">
          <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-navy/45">
            {CONTACT.eyebrow}
          </p>
          <h1 className="font-display text-[clamp(40px,5vw,64px)] leading-[1.02] font-extrabold text-navy">
            {CONTACT.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="max-w-[560px] text-[15px] leading-[1.7] text-navy/80 md:text-[17px]">
            {CONTACT.intro}
          </p>
        </div>

        {/* quick dial */}
        <div className="flex-none rounded-lg border border-navy/10 bg-white p-7 shadow-[0_1px_2px_rgba(20,40,62,0.06)] md:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-navy/45">
            Direct lines
          </p>
          <div className="mt-5 flex flex-col gap-3">
            <a
              href="https://wa.me/233247405685"
              className="flex items-center justify-center gap-2 rounded-full bg-coral px-6 py-3 text-[13px] font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              Message on WhatsApp →
            </a>
            <a
              href="tel:+233247405685"
              className="text-center text-[13px] font-medium text-navy/70 hover:text-azure"
            >
              or call +233 24 740 5685
            </a>
          </div>
          <p className="mt-5 border-t border-navy/10 pt-4 text-[12px] leading-[18px] text-navy/55">
            Mon–Sat 8:00–16:00 · Sun closed
          </p>
        </div>
      </div>
    </section>
  );
}
