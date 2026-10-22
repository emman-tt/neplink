"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP = "https://wa.me/233247405685";

// Navy closing band — headline, proof promise, WhatsApp-first actions with
// a slow-breathing primary button (short calls only).
export default function CtaBand() {
  const rootRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (
      !root ||
      !buttonRef.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      // Scroll-triggered timeline:
      //
      //  0.0 — headline rises
      //  0.15 — proof line
      //  0.3 — WhatsApp button,  0.45 — call pill + gold notes
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: root, start: "top 72%" },
      });
      tl
        .from(".cta-title", { y: 34, opacity: 0, duration: 0.8 }, 0)
        .from(".cta-sub", { y: 18, opacity: 0, duration: 0.6 }, 0.15)
        .from(buttonRef.current, { y: 24, opacity: 0, duration: 0.6 }, 0.3)
        .from(".cta-rest", { y: 18, opacity: 0, duration: 0.5, stagger: 0.1 }, 0.45);

      // Idle loop: the button breathes while the band is in view.
      gsap.to(buttonRef.current, {
        scale: 1.035,
        duration: 1.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        transformOrigin: "center",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={rootRef}
      className="flex w-full flex-col gap-[14px] bg-navy px-5 py-[34px] md:flex-row md:items-center md:gap-10 md:px-14 md:py-[60px]"
    >
      <div className="md:flex-1">
        <div className="flex flex-col gap-[14px] md:gap-[18px]">
          <h2 className="cta-title max-w-[760px] font-display text-[clamp(30px,4.6vw,66px)] leading-[1.04] font-extrabold text-cloud will-change-transform">
            TAKE THE WINDOW SEAT.
          </h2>
          <p className="cta-sub max-w-[690px] text-xs leading-[18px] text-skypale md:text-[15px] md:leading-[23px]">
            PROOF, NOT PARAGRAPHS — message the hub and we send sample routes,
            files and fares on WhatsApp before you talk to anyone.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-start gap-3 md:w-[330px] md:flex-none">
        <a
          ref={buttonRef}
          href={`${WHATSAPP}?text=${encodeURIComponent(
            "Hello Neplink — sending you my travel dream. What do your sample routes look like for me?",
          )}`}
          className="block flex-none whitespace-nowrap rounded-[26px] bg-coral px-[22px] py-[13px] font-display text-[10px] font-bold text-white will-change-transform md:rounded-[34px] md:px-[26px] md:py-4 md:text-[13px]"
        >
          WHATSAPP +233 24 740 5685
        </a>
        <a
          href="tel:+233247405685"
          className="cta-rest hidden whitespace-nowrap rounded-[34px] border-[1.5px] border-skypale px-[26px] py-4 text-xs font-medium text-skypale hover:bg-white/5 md:block"
        >
          or call — short calls only
        </a>
        <p className="cta-rest whitespace-nowrap text-[9px] font-medium tracking-[1.5px] text-gold md:text-[10px] md:tracking-[2px]">
          STUDY FILES · VISAS · TOURS · EST. 2017
        </p>
      </div>
    </section>
  );
}
