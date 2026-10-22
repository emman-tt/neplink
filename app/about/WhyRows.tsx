import { waReply } from "../site-data";
import { ABOUT } from "./about-data";

// "Why Neplink Consult?" — three numbered editorial rows on cream, each
// ending in a WhatsApp hand-off. Server component; the rows are not cards and
// not a grid on purpose.
export default function WhyRows() {
  return (
    <section aria-label="Why Neplink consult" className="w-full bg-cloud px-5 pb-16 md:px-14 md:pb-24">
      <div className="mx-auto max-w-[1180px]">
        <div className="pt-12 md:pt-16">
          <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-navy/45">
            Why Neplink Consult
          </p>
          <h2 className="mt-2 font-display text-[clamp(22px,2vw,26px)] font-extrabold leading-[1.2] text-navy">
            Three answers, on the record
          </h2>
        </div>

        <div className="mt-8 flex flex-col border-t border-navy/10">
          {ABOUT.why.map((row) => (
            <div
              key={row.n}
              className="group grid gap-3 border-b border-navy/10 py-8 md:grid-cols-[64px_240px_1fr] md:gap-10 md:py-10"
            >
              <span className="text-[13px] font-semibold tabular-nums text-navy/40">
                {row.n}
              </span>
              <h3 className="font-display text-[clamp(20px,1.9vw,24px)] font-extrabold leading-[1.2] text-navy">
                {row.title}
              </h3>
              <div className="flex flex-col items-start gap-4">
                <p className="max-w-[640px] text-[15px] leading-[1.7] text-navy/80 md:text-[16px]">
                  {row.body}
                </p>
                <a
                  href={waReply(row.ct)}
                  className="text-xs font-semibold text-azure hover:underline md:text-[13px]"
                >
                  Ask the visa doctors ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
