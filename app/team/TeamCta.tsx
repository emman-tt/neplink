import Link from "next/link";
import { BUSINESS, waReply } from "../site-data";

// Closing band — the crew on duty, one action, one link to the home ticket
// counter. Server component.
export default function TeamCta() {
  return (
    <section
      aria-label="Talk to the crew"
      className="w-full bg-navy px-5 py-16 md:px-14 md:py-24"
    >
      <div className="mx-auto flex max-w-[1180px] flex-col gap-4">
        <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-skypale/70">
          The crew is on duty · {BUSINESS.hours}
        </p>
        <h2 className="font-display text-[clamp(28px,4vw,48px)] leading-[1.08] font-extrabold text-cloud">
          Talk to a human,
          <br />
          not a form.
        </h2>
        <div className="flex flex-wrap items-center gap-3 pt-4">
          <a
            href={waReply("Hello Neplink — which desk handles my study/visa/tour question? ")}
            className="block flex-none whitespace-nowrap rounded-full bg-coral px-7 py-3.5 text-[13px] font-semibold text-white transition-transform hover:scale-[1.02]"
          >
            Message on WhatsApp →
          </a>
          <Link
            href="/#passport"
            className="whitespace-nowrap rounded-full border-[1.5px] border-skypale/50 px-6 py-[13px] text-[13px] font-medium text-cloud hover:bg-white/10"
          >
            or see what each desk stamps ↓
          </Link>
        </div>
      </div>
    </section>
  );
}
