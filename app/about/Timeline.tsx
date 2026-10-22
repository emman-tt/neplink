"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ABOUT } from "./about-data";
import { waReply } from "../site-data";

gsap.registerPlugin(ScrollTrigger);

// Company history — a quiet register on the deeper cream band: year on the
// left, what happened on the right, one hairline rail drawn down the band as
// the section enters. Reduced motion: everything is visible statically.
export default function Timeline() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      //
      // docTimeline — scrub across the band:
      //   the rail line draws (scaleY 0 -> 1),
      //   rows settle in as the line reaches them.
      const rows = Array.from(root.querySelectorAll<HTMLElement>(".manifest-row"));
      gsap.set(".manifest-line", { scaleY: 0, transformOrigin: "top center" });
      rows.forEach((r) => gsap.set(r, { y: 22, opacity: 0 }));

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root, start: "top 72%", end: "bottom 60%", scrub: 0.45 },
      });

      tl.to(".manifest-line", { scaleY: 1, duration: rows.length }, 0);
      rows.forEach((r, i) => {
        tl.to(r, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, i);
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="manifest"
      ref={rootRef}
      aria-label="Company history"
      className="w-full bg-clouddeep px-5 py-16 md:px-14 md:py-24"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-10 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-navy/45">
              Company history
            </p>
            <h2 className="mt-2 font-display text-[clamp(22px,2vw,26px)] font-extrabold leading-[1.2] text-navy">
              From 2010 to now
            </h2>
          </div>
          <p className="max-w-[380px] text-[13px] leading-[1.6] text-navy/60">
            {ABOUT.quoteOrigin}
            <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[1.2px] text-navy/40">
              {ABOUT.quoteName}
            </span>
          </p>
        </div>

        <div className="relative">
          {/* the drawn rail */}
          <div
            aria-hidden="true"
            className="manifest-line absolute bottom-1 left-[3px] top-3 w-px bg-navy/20 md:left-[5px]"
          />

          <ol className="flex flex-col">
            {ABOUT.history.map((h) => (
              <li
                key={h.year}
                className="manifest-row relative grid grid-cols-[100px_1fr] items-baseline gap-5 border-b border-navy/10 py-7 pl-7 md:grid-cols-[150px_1fr] md:gap-10 md:pl-10"
              >
                {/* node on the rail */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[38px] h-[7px] w-[7px] rounded-full bg-navy/45 md:left-[2px]"
                />
                <span className="font-display text-[clamp(22px,2.2vw,28px)] font-extrabold leading-none text-navy">
                  {h.year}
                </span>
                <p className="max-w-[720px] text-[15px] leading-[1.7] text-navy/80 md:text-[16px]">
                  {h.event}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <a
          href={waReply("Hello Neplink — I read the company file. I want to add my travel dreams to it: ")}
          className="mt-10 inline-flex rounded-full bg-coral px-6 py-3.5 text-[13px] font-semibold text-white transition-transform hover:scale-[1.02]"
        >
          Add your file →
        </a>
      </div>
    </section>
  );
}
