"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { waReply } from "./site-data";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    n: "01",
    title: "TELL US THE DREAM",
    body: "Country, course or tour — said plainly over WhatsApp.",
    stamp: "FILE OPENED",
  },
  {
    n: "02",
    title: "WE FILE THE PAPER",
    body: "School forms, invitations, bookings, insurance, notarization.",
    stamp: "DOCUMENTED",
  },
  {
    n: "03",
    title: "VISA & APPOINTMENTS",
    body: "Dates, fees, biometrics — scheduled and reminded.",
    stamp: "STAMPED",
  },
  {
    n: "04",
    title: "TICKET & BOARD",
    body: "Flight issued. You take the window seat.",
    stamp: "BOARDED",
  },
];

// Pre-flight checklist as a horizontally pinned boarding-pass strip
// (desktop). Each segment is a ticket: perforated edges, a stamp tick
// lands as the pass advances past it. Mobile: the same tickets stack
// vertically — the strip is not squeezed, it's re-seated.
export default function BoardingChecklist() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const strip = root.querySelector<HTMLElement>("[data-pass-strip]")!;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
        },
      });
      // the pass travels right→left; last segment ends centered
      tl.fromTo(
        strip,
        { x: "8vw" },
        { x: "-58vw", duration: 1 },
      );
      // stamps land as each segment reaches the middle of the viewport
      root.querySelectorAll<HTMLElement>(".pass-stamp").forEach((stamp, i, all) => {
        const at = 0.14 + (i + 0.35) / (all.length + 0.6);
        tl.fromTo(
          stamp,
          { scale: 2.4, opacity: 0, rotate: -18 },
          { scale: 1, opacity: 1, rotate: -8, duration: 0.05, ease: "power3.in" },
          at,
        );
      });
    });

    mm.add("(max-width: 767px)", () => {
      root.querySelectorAll<HTMLElement>(".pass-card").forEach((card) => {
        gsap.fromTo(
          card.querySelector(".pass-stamp"),
          { scale: 2.2, opacity: 0, rotate: -16 },
          {
            scale: 1,
            opacity: 1,
            rotate: -8,
            duration: 0.5,
            ease: "power3.in",
            scrollTrigger: { trigger: card, start: "top 65%", once: true },
          },
        );
        gsap.from(card, {
          y: 34,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 80%", once: true },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="boarding"
      ref={rootRef}
      aria-label="Pre-flight checklist"
      className="w-full overflow-hidden bg-clouddeep py-14 md:py-0"
    >
      <div className="px-5 md:px-14 md:pt-16">
        <p className="text-[10px] font-semibold tracking-[2.5px] text-coral">
          THE PRE-FLIGHT CHECKLIST
        </p>
        <h2 className="mt-1 font-display text-[clamp(30px,4.6vw,56px)] font-extrabold text-navy">
          FOUR TICKS TO BOARDING
        </h2>
      </div>

      {/* mobile stacked tickets */}
      <div className="no-sb flex flex-col gap-5 px-5 py-10 md:hidden">
        {STEPS.map((s) => (
          <div
            key={s.n}
            className="pass-card relative rounded-t-xl rounded-b-xl bg-cloud p-5 shadow-[8px_8px_0_rgba(20,40,62,0.12)]"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-display text-2xl font-extrabold text-azure">{s.n}</span>
              <span className="text-[8px] font-bold tracking-[2px] text-azure/70">
                NEPLINK · {s.n}/04 · ACC
              </span>
            </div>
            <div className="mt-3 border-t border-dashed border-navy/25 pt-3">
              <h3 className="font-display text-[15px] font-extrabold text-navy">{s.title}</h3>
              <p className="mt-1 text-sm leading-[21px] text-navy/80">{s.body}</p>
            </div>
            <span className="pass-stamp absolute -top-3 right-6 inline-block rounded-md border-[3px] border-coral px-2.5 py-1 font-display text-[10px] font-extrabold tracking-[1px] text-coral" data-stamp={s.stamp}>
              {s.stamp}
            </span>
          </div>
        ))}
      </div>

      {/* desktop pinned strip */}
      <div className="relative hidden h-svh items-center overflow-hidden md:flex">
        <div
          data-pass-strip
          className="flex flex-none gap-8 will-change-transform pl-[30vw] pr-[10vw]"
        >
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="pass-card relative h-[380px] w-[560px] flex-none rotate-[-1.2deg] rounded-2xl bg-cloud p-8 shadow-[14px_14px_0_rgba(20,40,62,0.14)] even:rotate-[1deg]"
            >
              {/* stub perforation */}
              <div className="absolute right-[70px] top-0 h-full w-0 border-r-2 border-dashed border-navy/20" />
              <div className="absolute right-[70px] top-0 h-3 w-3 -translate-x-[7px] rounded-full bg-clouddeep" />
              <div className="absolute bottom-0 right-[70px] h-3 w-3 -translate-x-[7px] rounded-full bg-clouddeep" />
              {/* stamp lands in the stub */}
              <span className="pass-stamp absolute right-[86px] top-9 inline-block rounded-md border-[3px] border-coral px-3 py-1.5 font-display text-[11px] font-extrabold tracking-[1px] text-coral">
                {s.stamp}
              </span>

              <div className="flex h-full flex-col">
                <div className="flex items-start justify-between">
                  <span className="font-display text-[64px] font-extrabold leading-none text-azure">
                    {s.n}
                  </span>
                  <div className="text-right">
                    <p className="text-[9px] font-bold tracking-[2px] text-navy/60">
                      NEPLINK TRAVEL HUB · BOARDING PASS
                    </p>
                    <p className="text-[9px] font-bold tracking-[2px] text-navy/60">
                      SEGMENT {s.n}/04 · ACC
                    </p>
                  </div>
                </div>
                <div className="mt-6 border-t border-dashed border-navy/25 pt-6">
                  <h3 className="max-w-[380px] font-display text-[clamp(22px,1.8vw,30px)] font-extrabold text-navy">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-[360px] text-[15px] leading-[23px] text-navy/85">
                    {s.body}
                  </p>
                </div>
                <div className="mt-auto flex items-end justify-between border-t border-dashed border-navy/25 pt-4">
                  <a
                    href={waReply("Hello Neplink — my pre-flight step: " + s.title.charAt(0) + s.title.slice(1).toLowerCase() + ". ")}
                    className="text-[11px] font-bold tracking-[1px] text-azure hover:text-coral"
                  >
                    START THIS STEP ↗
                  </a>
                  <span className="font-display text-sm font-bold text-navy/40">✓</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="px-5 pb-2 text-[10px] tracking-[1px] text-navy/50 md:px-14 md:pb-10">
        STEP DONE = TICKET STAMPED. THE LAST STAMP IS ALWAYS THE WINDOW SEAT.
      </p>
    </section>
  );
}
