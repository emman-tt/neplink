import { HOURS } from "./contact-data";

// Opening hours — the client's official table (Mon–Sat 8:00–16:00, Sunday
// closed) set as a plain register: day left, time right, Sunday marked in
// coral as the one exception. Server component.
export default function HoursBoard() {
  return (
    <section
      aria-label="Opening hours"
      className="w-full bg-cloud px-5 pb-16 pt-2 md:px-14 md:pb-24 md:pt-4"
    >
      <div className="mx-auto flex max-w-[860px] flex-col">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-navy/45">
              Opening hours
            </p>
            <h2 className="mt-2 font-display text-[clamp(22px,2vw,26px)] font-extrabold leading-[1.2] text-navy">
              When the desk is open
            </h2>
          </div>
          <p className="text-[13px] leading-[19px] text-navy/60">
            Accra local time · {HOURS.length - 1} days a week
          </p>
        </div>

        <div className="mt-8 rounded-lg border border-navy/10 bg-white px-5 py-2 md:px-9 md:py-3">
          <dl className="flex flex-col">
            {HOURS.map(([day, time], i) => (
              <div
                key={day}
                className={`flex items-baseline justify-between gap-6 py-3.5 ${
                  i > 0 ? "border-t border-navy/10" : ""
                }`}
              >
                <dt className="text-[14px] font-semibold text-navy md:text-[15px]">
                  {day.charAt(0) + day.slice(1).toLowerCase()}
                </dt>
                {time === "CLOSED" ? (
                  <dd className="text-[14px] font-semibold text-coral md:text-[15px]">
                    Closed
                  </dd>
                ) : (
                  <dd className="tabular-nums text-[14px] font-medium text-navy/70 md:text-[15px]">
                    {time}
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
