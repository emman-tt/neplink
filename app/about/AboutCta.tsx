import Link from "next/link";
import { BUSINESS, waReply } from "../site-data";

// Closing band for the About page — the client's invitation over the single
// navy band, one WhatsApp-first action, one link back to the home ticket
// counter. Server component.
export default function AboutCta() {
  return (
    <section
      aria-label="Start your file"
      className="w-full bg-navy px-5 py-16 md:px-14 md:py-24"
    >
      <div className="mx-auto flex max-w-[1180px] flex-col gap-4">
        <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-skypale/70">
          Start your file · {BUSINESS.hours}
        </p>
        <h2 className="font-display text-[clamp(28px,4vw,48px)] leading-[1.08] font-extrabold text-cloud">
          Get your file
          <br />
          started today.
        </h2>
        <div className="flex flex-wrap items-center gap-3 pt-4">
          <a
            href={waReply("Hello Neplink — I read the About page. I want to start my study/visa/tour file: ")}
            className="block flex-none whitespace-nowrap rounded-full bg-coral px-7 py-3.5 text-[13px] font-semibold text-white transition-transform hover:scale-[1.02]"
          >
            Message on WhatsApp →
          </a>
          <Link
            href="/#intent"
            className="whitespace-nowrap rounded-full border-[1.5px] border-skypale/50 px-6 py-[13px] text-[13px] font-medium text-cloud hover:bg-white/10"
          >
            or pack your file at the ticket counter ↓
          </Link>
        </div>
      </div>
    </section>
  );
}
