"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BUSINESS, PAGES, waReply } from "./site-data";

gsap.registerPlugin(ScrollTrigger);

// Visa desk as a passport: three service pages fan out, each takes its
// stamp as it scrolls in — scale + rotate + ink fade, like a real landing.
const INK = {
  gold: "border-gold text-gold",
  coral: "border-coral text-coral",
  azure: "border-azure text-azure",
} as const;

export default function PassportVisas() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      //  pages fan in from a small stack, then stamps land one by one:
      //
      //  page rotation dealt by CSS (isometric fan); GSAP handles entrance
      //  + stamps.
      gsap.from(".passport-page", {
        y: 70,
        opacity: 0,
        duration: 0.9,
        stagger: 0.16,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 68%" },
      });

      root.querySelectorAll<HTMLElement>(".visa-stamp").forEach((stamp) => {
        gsap.fromTo(
          stamp,
          { scale: 2.5, rotate: 14, opacity: 0 },
          {
            scale: 1,
            rotate: -7,
            opacity: 0.92,
            duration: 0.55,
            ease: "power4.in",
            scrollTrigger: {
              trigger: stamp.closest(".passport-page"),
              start: "top 42%",
              once: true,
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="passport"
      ref={rootRef}
      aria-label="Services at the visa desk"
      className="w-full overflow-hidden bg-navy px-5 py-14 md:px-14 md:py-24"
    >
      <div className="mb-10 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[10px] font-semibold tracking-[2.5px] text-gold">
            {BUSINESS.nickname} · AT THE VISA DESK
          </p>
          <h2 className="font-display text-[clamp(30px,4.6vw,56px)] font-extrabold text-cloud">
            GET THE PAPER STAMPED
          </h2>
        </div>
        <p className="max-w-[400px] text-xs leading-[18px] text-skypale md:text-[13px] md:leading-[21px]">
          Three stamps and you travel. Every stamp below is a service
          Neplink has run since 2010 — reg {BUSINESS.reg}, VAT {BUSINESS.vat}.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 md:gap-5">
        {PAGES.map((page, i) => (
          <article
            key={page.stamp}
            className="passport-page relative flex flex-col rounded-lg bg-cloud p-6 md:rotate-[-1deg] md:p-7 even:md:rotate-[0.8deg]"
            style={{ ["--i" as string]: i }}
          >
            {/* page header rows */}
            <div className="flex items-baseline justify-between border-b-2 border-dashed border-navy/20 pb-3">
              <span className="font-display text-[13px] font-extrabold tracking-[1px] text-navy">
                NEPLINK · SERVICE PASSPORT
              </span>
              <span className="text-[9px] font-bold tracking-[1.5px] text-navy/50">
                PAGE 0{i + 1}/03
              </span>
            </div>

            {/* stamp lands here */}
            <span
              className={`visa-stamp pointer-events-none absolute right-5 top-16 inline-block rounded-full border-[3px] px-4 py-3 text-center font-display text-[11px] font-extrabold leading-[1.3] tracking-[1px] ${INK[page.ink]}`}
            >
              {page.stamp}
              <br />
              <span className="text-[8px] tracking-[2px]">ACC · {BUSINESS.foundedYear}</span>
            </span>

            <h3 className="mt-5 font-display text-[clamp(22px,2vw,30px)] font-extrabold text-navy">
              {page.label}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-[22px] text-navy/80">
              {page.body}
            </p>

            <a
              href={waReply(`Hello Neplink — I want my ${page.stamp.toLowerCase()} stamped: `)}
              className="mt-6 inline-flex w-max items-center rounded-full bg-navy px-5 py-3 text-[10px] font-bold tracking-[1.5px] text-cloud transition-colors hover:bg-coral"
            >
              OPEN THIS FILE →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
