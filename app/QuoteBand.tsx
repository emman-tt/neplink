"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Clouddeep quote band — the real line from the Ghanayello listing.
export default function QuoteBand() {
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
      //  0.0 — eyebrow
      //  0.12 — the quote rises
      //  0.3 — source line
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: root, start: "top 74%" },
      });
      tl
        .from(".quote-eyebrow", { y: 14, opacity: 0, duration: 0.5 }, 0)
        .from(".quote-main", { y: 26, opacity: 0, duration: 0.8 }, 0.12)
        .from(".quote-source", { y: 12, opacity: 0, duration: 0.5 }, 0.3);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="flex w-full flex-col items-start gap-2.5 bg-clouddeep px-5 py-[30px] md:gap-[14px] md:px-[72px] md:py-[52px]"
    >
      <p className="quote-eyebrow whitespace-nowrap text-[9px] font-semibold tracking-[2px] text-coral md:text-[11px] md:tracking-[2.5px]">
        FROM THE GHANAYELLO LISTING —
      </p>
      <blockquote className="quote-main max-w-[940px] font-display text-[22px] leading-[26px] font-extrabold text-navy md:text-[40px] md:leading-[46px]">
        “Your gateway to international education and travel services.”
      </blockquote>
      <p className="quote-source whitespace-nowrap text-[9px] font-medium tracking-[1px] text-azure md:text-[11px] md:tracking-[1.5px]">
        NEPLINK TRAVEL HUB · SANTA MARIA, ACCRA
      </p>
    </section>
  );
}
