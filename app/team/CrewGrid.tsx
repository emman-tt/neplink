"use client";

import { useState } from "react";
import { waReply } from "../site-data";
import { DEPARTMENTS, FILTERS } from "./team-data";
import Monogram from "./Monogram";

// CrewGrid — the crew as a formal register: filter chips, then one white card
// per person (name, role, desk, monogram portrait placeholder). No photos sit
// on the public record, so each card carries initials rather than a stock
// face. Filter state is local; hover is pure CSS.
export default function CrewGrid() {
  const [active, setActive] = useState<string>("ALL");

  const shown = DEPARTMENTS.flatMap((block) =>
    active === "ALL" || active === block.code
      ? block.members.map((m) => ({ ...m, dept: block.dept, code: block.code }))
      : []
  );

  return (
    <section
      aria-label="Departments and crew"
      className="w-full bg-cloud px-5 pb-16 pt-6 md:px-14 md:pb-24 md:pt-8"
    >
      <div className="mx-auto max-w-[1000px]">
        <div className="flex flex-col gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-navy/45">
            The crew
          </p>
          <h2 className="font-display text-[clamp(22px,2vw,26px)] font-extrabold leading-[1.2] text-navy">
            Five people, four desks
          </h2>
          <p className="max-w-[560px] text-[15px] leading-[1.7] text-navy/80 md:text-[16px]">
            The people behind every file, visa and ticket. Choose a desk to
            filter the register.
          </p>
          <p className="max-w-[560px] text-[13px] leading-[1.65] text-navy/55">
            No crew photos sit on the public record yet — official portraits
            stay on file at the desk, so each card carries its initials until
            then.
          </p>
        </div>

        {/* filter chips */}
        <div
          role="group"
          aria-label="Filter crew by department"
          className="mt-8 flex flex-wrap gap-2"
        >
          {FILTERS.map((f) => {
            const on = active === f.key;
            return (
              <button
                key={f.key}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(f.key)}
                className={`rounded-full px-4 py-2 text-[12px] font-semibold transition-colors duration-200 md:text-[13px] ${
                  on
                    ? "bg-navy text-cloud"
                    : "border border-navy/20 text-navy/70 hover:border-navy/40 hover:text-navy"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* cards */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:mt-10 md:grid-cols-3 md:gap-6">
          {shown.map((m) => (
            <a
              key={m.seat}
              href={waReply(
                `Hello Neplink — my question is for ${m.dept.toLowerCase()} (to ${m.role.toLowerCase()}): `
              )}
              className="group flex flex-col overflow-hidden rounded-lg border border-navy/10 bg-white transition-colors duration-200 hover:border-navy/30"
            >
              {/* portrait tile — monogram placeholder */}
              <div className="relative flex aspect-[4/3.4] items-center justify-center bg-clouddeep">
                <span className="absolute left-4 top-3.5 text-[11px] font-medium tracking-[0.5px] text-navy/35">
                  {m.seat}
                </span>
                <Monogram initials={m.initials} />
                <span className="absolute bottom-3 right-4 text-[10px] font-semibold uppercase tracking-[1.2px] text-navy/35">
                  Portrait pending
                </span>
              </div>

              {/* name strip */}
              <div className="flex flex-col gap-1.5 px-4 py-4 md:px-5 md:py-5">
                <p className="font-display text-[16px] font-extrabold leading-[1.25] text-navy md:text-[17px]">
                  {m.name}
                </p>
                <p className="text-[13px] font-medium text-navy/65">{m.role}</p>
                <p className="text-[11px] font-semibold uppercase tracking-[1.2px] text-navy/40">
                  {m.dept}
                </p>
                <p className="pt-2 text-xs font-semibold text-azure group-hover:underline md:text-[13px]">
                  Ask this desk ↗
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
