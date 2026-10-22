"use client";

import { REVIEWS, TAGLINES } from "./site-data";

// Seamless marquee — real taglines on top, real review fragments below.
// CSS animation (loops); stops dead under prefers-reduced-motion via the
// global rule in globals.css.
//
// variant "tilted" (default, home) keeps the two angled bands. variant
// "quiet" (team) sets the same record straight: hairline rules, muted ink,
// no accent marks.
const ROW_A = [...TAGLINES];
const ROW_B = REVIEWS.map((r) => `${r.name} · ${r.trip} — ${r.line}`);

function ItemTypeA({ children, quiet }: { children: string; quiet: boolean }) {
  return (
    <span
      className={
        quiet
          ? "font-display text-[15px] font-extrabold text-navy/75 md:text-[17px]"
          : "font-display text-[15px] font-extrabold text-navy md:text-[19px]"
      }
    >
      {children}
      <em className={quiet ? "not-italic text-navy/25" : "not-italic text-coral"}>
        {quiet ? " · " : " ✦ "}
      </em>
    </span>
  );
}

function ItemTypeB({ children, quiet }: { children: string; quiet: boolean }) {
  return (
    <span
      className={
        quiet
          ? "font-body text-[13px] font-medium italic text-navy/65 md:text-[15px]"
          : "font-body text-[13px] font-medium italic text-navy md:text-[15px]"
      }
    >
      {children}
      <em className={quiet ? "not-italic text-navy/25" : "not-italic text-azure"}>
        {" · "}
      </em>
    </span>
  );
}

export default function MarqueeBand({
  variant = "tilted",
}: {
  variant?: "tilted" | "quiet";
}) {
  const quiet = variant === "quiet";
  return (
    <section
      aria-label="Neplink on the record"
      className="w-full overflow-hidden bg-cloud py-8 md:py-10"
    >
      <div className="flex flex-col gap-4">
        {/* top row: taglines */}
        <div
          className={
            quiet
              ? "marquee-row whitespace-nowrap border-y border-navy/10 py-3"
              : "marquee-row -rotate-1 whitespace-nowrap bg-clouddeep py-3"
          }
        >
          <div className="marquee flex w-max animate-[neplink-marquee_28s_linear_infinite] items-center">
            {[0, 1].map((dup) => (
              <span key={dup} aria-hidden={dup === 1} className="flex items-center">
                {ROW_A.map((t) => (
                  <span key={t} className="px-6">
                    <ItemTypeA quiet={quiet}>{t}</ItemTypeA>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
        {/* bottom row: the three real reviews */}
        <div
          className={
            quiet
              ? "marquee-row whitespace-nowrap border-b border-navy/10 py-3"
              : "marquee-row rotate-1 whitespace-nowrap bg-navy py-3"
          }
        >
          <div className="marquee flex w-max animate-[neplink-marquee_38s_linear_infinite] items-center">
            {[0, 1].map((dup) => (
              <span key={dup} aria-hidden={dup === 1} className="flex items-center">
                {ROW_B.map((t) => (
                  <span key={t} className="px-6">
                    <ItemTypeB quiet={quiet}>{t}</ItemTypeB>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
