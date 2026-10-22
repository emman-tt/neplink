import { CHANNELS } from "./contact-data";

// Contact channels as a formal register on cream: label, value, action —
// aligned columns, hairline rules, no tiles or codes in the reading path.
// Every row with a real destination is one tap; the PO Box row is postal,
// not a link. The minmax(0,1fr) column keeps long values (the yandex email)
// wrapping inside the row on mobile.
export default function ChannelRows() {
  return (
    <section
      aria-label="Contact details"
      className="w-full bg-cloud px-5 pb-16 pt-2 md:px-14 md:pb-24 md:pt-4"
    >
      <div className="mx-auto max-w-[1180px]">
        <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-navy/45">
          Contact details
        </p>
        <h2 className="mt-2 font-display text-[clamp(22px,2vw,26px)] font-extrabold leading-[1.2] text-navy">
          Reach the office
        </h2>

        <ul className="mt-8 flex flex-col border-t border-navy/10">
          {CHANNELS.map((c) => {
            const inner = (
              <span className="flex flex-col gap-1.5 border-b border-navy/10 py-5 transition-colors duration-200 group-hover:bg-navy/[0.02] md:grid md:grid-cols-[190px_minmax(0,1fr)_auto] md:items-baseline md:gap-8 md:py-5">
                <span className="text-[11px] font-semibold uppercase tracking-[1.5px] text-navy/45">
                  {c.label}
                </span>
                <span className="min-w-0 text-[15px] font-semibold leading-[1.55] text-navy [overflow-wrap:anywhere] md:text-[16px]">
                  {c.value}
                </span>
                {c.href ? (
                  <span className="text-xs font-semibold text-azure group-hover:underline md:text-right md:text-[13px]">
                    {c.action} ↗
                  </span>
                ) : (
                  <span className="text-xs text-navy/35 md:text-right md:text-[13px]">
                    Postal only
                  </span>
                )}
              </span>
            );

            return (
              <li key={c.code}>
                {c.href ? (
                  <a href={c.href} className="group block">
                    {inner}
                  </a>
                ) : (
                  <div className="group block cursor-default">{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
