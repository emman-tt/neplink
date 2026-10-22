import { FACTS } from "./about-data";

// Facts band — capacities exactly as the client states them (100+ partner
// universities, circa 500 students a year, 4 home countries, visas since
// 2012), set as a quiet four-column register on cream. Server component.
export default function FactsRow() {
  return (
    <section aria-label="The numbers" className="w-full bg-cloud px-5 md:px-14">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid grid-cols-2 gap-px border-y border-navy/10 bg-navy/10 md:grid-cols-4">
          {FACTS.map((f) => (
            <div
              key={f.k}
              className="flex flex-col gap-1.5 bg-cloud px-5 py-8 md:px-8 md:py-10"
            >
              <p className="font-display text-[clamp(24px,2.2vw,30px)] font-extrabold leading-none text-navy">
                {f.k}
              </p>
              <p className="text-[11px] font-semibold uppercase leading-[1.5] tracking-[1.2px] text-navy/50">
                {f.v}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
