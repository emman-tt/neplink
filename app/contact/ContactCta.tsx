import { waReply } from "../site-data";
import { CONTACT } from "./contact-data";

// Closing band — the client's own invitation line, verbatim, over the navy
// board with the three direct actions. Server component.
export default function ContactCta() {
  return (
    <section
      aria-label="Closing invitation"
      className="w-full bg-navy px-5 py-16 md:px-14 md:py-24"
    >
      <div className="mx-auto flex max-w-[1180px] flex-col gap-4">
        <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-skypale/70">
          Enquiries
        </p>
        <h2 className="font-display text-[clamp(28px,4vw,48px)] leading-[1.08] font-extrabold text-cloud">
          Always at
          <br />
          your service.
        </h2>
        <p className="max-w-[620px] text-[15px] leading-[24px] text-skypale md:text-[16px] md:leading-[26px]">
          {CONTACT.note}
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-4">
          <a
            href={waReply("Hello Neplink — I am reaching out from your contact page. I need a clarification: ")}
            className="block flex-none whitespace-nowrap rounded-full bg-coral px-7 py-3.5 text-[13px] font-semibold text-white transition-transform hover:scale-[1.02]"
          >
            Message on WhatsApp →
          </a>
          <a
            href="tel:+233247405685"
            className="whitespace-nowrap rounded-full border-[1.5px] border-skypale/50 px-6 py-[13px] text-[13px] font-medium text-cloud hover:bg-white/10"
          >
            Call +233 24 740 5685
          </a>
          <a
            href="mailto:Neplinkconsult@yandex.com"
            className="whitespace-nowrap rounded-full border-[1.5px] border-skypale/50 px-6 py-[13px] text-[13px] font-medium text-cloud hover:bg-white/10"
          >
            Email the office
          </a>
        </div>
      </div>
    </section>
  );
}
