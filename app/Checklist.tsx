"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    n: "1",
    title: "TELL US THE DREAM",
    desc: "Country, course or tour — said plainly over WhatsApp.",
  },
  {
    n: "2",
    title: "WE FILE THE PAPER",
    desc: "School forms, invitations, bookings, insurance.",
  },
  {
    n: "3",
    title: "VISA & APPOINTMENTS",
    desc: "Dates, fees, biometrics — scheduled and reminded.",
  },
  {
    n: "4",
    title: "TICKET & BOARD",
    desc: "Flight issued. You take the window seat.",
  },
];

// Navy-deep checklist band. Steps stagger up when the band scrolls in.
export default function Checklist() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (
      !root ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      // Scroll-triggered timeline:
      //
      //  0.0 — band title rises out
      //  0.15 — small counter line follows
      //  0.3 — the four steps stagger up
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: root, start: "top 72%" },
      });
      tl
        .from(".check-title", { yPercent: 130, opacity: 0, duration: 0.8 }, 0)
        .from(".check-sub", { y: 14, opacity: 0, duration: 0.5 }, 0.15)
        .from(".check-step", { y: 30, opacity: 0, duration: 0.6, stagger: 0.13 }, 0.3);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="checklist"
      ref={rootRef}
      className="flex w-full flex-col gap-4 bg-navydeep px-5 py-[34px] md:gap-[26px] md:px-14 md:py-[52px]"
    >
      <div className="flex flex-col items-start gap-1 md:flex-row md:items-end md:justify-between">
        <h2 className="check-title font-display text-[22px] font-extrabold text-cloud md:text-[34px]">
          PRE-FLIGHT CHECKLIST
        </h2>
        <p className="check-sub text-[10px] font-medium tracking-[2px] text-skypale md:text-xs">
          FOUR TICKS TO BOARDING
          <span className="hidden md:inline"> BETWEEN YOU AND BOARDING</span>
        </p>
      </div>

      <div className="flex w-full flex-col gap-[14px] md:flex-row md:gap-[14px]">
        {STEPS.map((step) => (
          <div
            key={step.n}
            className="check-step flex flex-1 flex-row items-center gap-3 rounded-lg bg-navy p-[12px_14px] will-change-transform md:flex-col md:items-start md:rounded-[10px] md:p-[22px_20px]"
          >
            <div className="flex h-6 w-6 flex-none items-center justify-center rounded-md border-2 border-gold md:h-[26px] md:w-[26px]">
              <span className="font-display text-xs font-extrabold text-gold md:text-[13px]">
                {step.n}
              </span>
            </div>
            <div className="flex flex-col gap-3 md:gap-3">
              <h3 className="whitespace-nowrap font-display text-[13px] font-bold text-cloud md:text-[15px]">
                {step.title}
              </h3>
              <p className="hidden leading-5 text-skypale md:block md:max-w-[240px] md:text-[13px]">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
