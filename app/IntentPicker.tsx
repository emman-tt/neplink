"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { DESTINATIONS, BUSINESS, waReply } from "./site-data";
import { setIntent, type Intent } from "./intent-store";

// The functional signature: pick service + destination, the boarding pass
// "prints" your file details (the ticket rises out of the counter slot) and
// the CTA opens a pre-filled WhatsApp chat. No backend — the picker's
// output is the wa.me URL.
const SERVICES = [
  { key: "STUDY", label: "STUDY FILE", note: "UA · RU · CN · CA · US · AU · MY" },
  { key: "VISA", label: "VISA", note: "Europe · USA · Canada · the Americas · Asia" },
  { key: "TOUR", label: "TOUR", note: "Packages · flights · hotels · pickups" },
] as const;

export default function IntentPicker() {
  const [intent, setLocal] = useState<Intent>({ service: null, destination: null });
  const passRef = useRef<HTMLDivElement>(null);
  const pick = (patch: Partial<Intent>) => {
    const next = { ...intent, ...patch };
    setLocal(next);
    setIntent(next);
  };

  const ready = Boolean(intent.service && intent.destination);

  // the print: pass slides out of the counter slot when the file completes
  useEffect(() => {
    const pass = passRef.current;
    if (!pass || !ready) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tl = gsap.timeline();
    tl.fromTo(
      pass,
      { y: 90, rotate: 2, opacity: 0.4 },
      { y: 0, rotate: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
    );
    return () => {
      tl.kill();
    };
  }, [ready]);

  return (
    <section
      id="intent"
      aria-label="Plan your trip"
      className="w-full bg-navydeep px-5 py-14 md:px-14 md:py-20"
    >
      <div className="mx-auto grid max-w-[1180px] gap-10 md:grid-cols-[1fr_360px] md:items-center">
        <div className="flex flex-col gap-5">
          <p className="text-[10px] font-semibold tracking-[2.5px] text-gold">
            THE TICKET COUNTER
          </p>
          <h2 className="font-display text-[clamp(30px,4.6vw,56px)] font-extrabold text-cloud">
            PACK YOUR FILE
          </h2>
          <p className="max-w-[520px] text-xs leading-[18px] text-skypale md:text-[13px] md:leading-[21px]">
            Two choices and we print your boarding pass. WhatsApp opens with
            your picks already typed in — the visa doctors read it and reply
            with the next step.
          </p>

          {/* step 1: service */}
          <div className="flex flex-col gap-2">
            <p className="text-[9px] font-bold tracking-[2px] text-skypale/70">01 · SERVICE</p>
            <div className="flex flex-wrap gap-2">
              {SERVICES.map((s) => (
                <button
                  key={s.key}
                  onClick={() => pick({ service: s.key })}
                  aria-pressed={intent.service === s.key}
                  className={`rounded-full border px-4 py-2.5 text-[10px] font-bold tracking-[1.5px] transition-colors ${
                    intent.service === s.key
                      ? "border-coral bg-coral text-white"
                      : "border-[#22394C] bg-[#1B3040] text-skypale hover:border-gold"
                  }`}
                >
                  {s.label}{" "}
                  <span className="hidden text-[8px] text-skypale/60 md:inline">· {s.note}</span>
                </button>
              ))}
            </div>
          </div>

          {/* step 2: destination */}
          <div className="flex flex-col gap-2">
            <p className="text-[9px] font-bold tracking-[2px] text-skypale/70">02 · DESTINATION</p>
            <select
              aria-label="Choose your destination"
              value={intent.destination ?? ""}
              onChange={(e) => pick({ destination: e.target.value || null })}
              className="h-11 w-full max-w-[320px] rounded-full border border-[#22394C] bg-[#1B3040] px-5 text-[11px] font-bold tracking-[1px] text-skypale focus:border-gold"
            >
              <option value="">— pick a corridor —</option>
              {DESTINATIONS.map((d) => (
                <option key={d.code} value={d.name}>
                  {d.name} · {d.code}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* the printed boarding pass */}
        <div className="relative">
          {/* counter slot */}
          <div aria-hidden className="mx-auto h-3 w-[70%] rounded-t-md bg-[#22394C] max-md:hidden" />

          <div
            ref={passRef}
            className="relative mt-1 rounded-xl bg-cloud p-6 shadow-[0_18px_60px_rgba(13,27,43,0.35)] max-md:mt-3"
          >
            {/* stub perforation */}
            <div className="absolute left-[54%] top-0 h-full w-0 border-r-2 border-dashed border-navy/20 max-md:hidden" />

            <div className="flex items-baseline justify-between">
              <span className="font-display text-[13px] font-extrabold text-navy">
                NEPLINK · {BUSINESS.foundedYear}
              </span>
              <span className="text-[9px] font-bold tracking-[2px] text-navy/50">
                BP · ACC→{intent.destination ? intent.destination.slice(0, 3) : "···"}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-[1fr_auto] gap-4 max-md:grid-cols-1">
              <div className="flex flex-col gap-3">
                <Row label="SERVICE" value={intent.service ?? "—"} />
                <Row label="DESTINATION" value={intent.destination ?? "—"} />
                <Row label="EXIT" value="SANTA MARIA DESK" />
              </div>
              <div className="barcode hidden md:block" aria-hidden />
            </div>

            <a
              href={
                ready
                  ? waReply(
                      `Hi Neplink — I'm interested in ${intent.service} for ${intent.destination?.charAt(0)}${intent.destination?.slice(1).toLowerCase()}. Please send me the next step.`,
                    )
                  : "#intent"
              }
              onClick={(e) => {
                if (!ready) e.preventDefault();
              }}
              className={`mt-5 flex h-12 items-center justify-center rounded-full font-display text-[11px] font-bold tracking-[1px] transition-colors ${
                ready
                  ? "bg-coral text-white hover:bg-[#d4583d]"
                  : "cursor-not-allowed bg-clouddeep text-navy/40"
              }`}
              aria-disabled={!ready}
            >
              {ready ? "CLAIM MY WINDOW SEAT →" : "PICK SERVICE + DESTINATION"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[8px] font-bold tracking-[2px] text-navy/50">{label}</p>
      <p className="font-display text-[15px] font-extrabold text-navy">{value}</p>
    </div>
  );
}
