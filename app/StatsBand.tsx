"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// The four numbers under the quote. Desktop: one row of four; mobile: two
// rows of two, like the 390 artboard. Both DOM variants share the
// `.band-stat` class so the same stagger hits whichever is on screen.
const STATS = [
  { num: "2017", label: "EST. — EIGHT YEARS OF GATEWAY WORK", sep: true },
  { num: "★5.0", label: "3 REVIEWS ON RECORD", sep: false },
  { num: "SANTA MARIA", label: "EAST DESERET ST — ACCRA", sep: true },
  { num: "+233 24", label: "740 5685 — THE HUB", sep: false },
];

function Stat({ stat, mobile }: { stat: (typeof STATS)[number]; mobile?: boolean }) {
  return (
    <div
      className={`band-stat flex flex-col gap-[5px] will-change-transform md:gap-[7px] ${
        !mobile && stat.sep ? "md:border-r md:border-clouddeep md:pr-8" : ""
      }`}
    >
      <p className="whitespace-nowrap font-display text-[22px] font-extrabold text-navy md:text-[36px]">
        {stat.num}
      </p>
      <p
        className={`text-[8px] tracking-[1px] text-azure md:text-[10px] md:tracking-[1.5px] ${
          mobile ? "w-[160px]" : "md:max-w-none"
        }`}
      >
        {stat.label}
      </p>
    </div>
  );
}

export default function StatsBand() {
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
      gsap.from(".band-stat", {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root, start: "top 78%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="w-full bg-cloud px-5 py-[26px] md:px-14 md:py-11"
    >
      {/* desktop: one row, four stats */}
      <div className="hidden w-full justify-between md:flex">
        {STATS.map((stat) => (
          <Stat key={stat.num} stat={stat} />
        ))}
      </div>

      {/* mobile: two rows of two, like the 390 artboard */}
      <div className="flex w-full flex-col gap-[14px] md:hidden">
        <div className="flex w-full justify-between">
          <Stat stat={STATS[0]} mobile />
          <Stat stat={STATS[1]} mobile />
        </div>
        <div className="flex w-full justify-between">
          <Stat stat={STATS[2]} mobile />
          <Stat stat={STATS[3]} mobile />
        </div>
      </div>
    </section>
  );
}
