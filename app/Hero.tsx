"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BUSINESS, CORRIDORS, CTA_DEFAULT_TEXT, waReply } from "./site-data";

gsap.registerPlugin(ScrollTrigger);

const PORTAL = CORRIDORS[0]; // LHR — the first destination through the window

// Porthole pieces. ringFill sits under the copy; the rim + latch live in a
// mirrored wrapper that scales in lockstep, so headline letters cross in
// front of the fill but behind the rim (real depth).
function Porthole({
  fillRef,
  portalRef,
}: {
  fillRef: React.RefObject<HTMLDivElement | null>;
  portalRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={fillRef}
      className="absolute right-[-70px] top-[120px] h-[300px] w-[300px] will-change-transform md:right-[36px] md:top-1/2 md:h-[580px] md:w-[580px] md:-translate-y-1/2"
    >
      <div className="relative z-0 h-full w-full overflow-hidden rounded-full bg-clouddeep">
        {/* the crew's own window video (public/hero-window.mp4) — plays
            immediately, muted loop. The poster image under it gives an
            instant render and a fallback once the loop is paused for
            reduced-motion visitors. */}
        <div ref={portalRef} className="absolute inset-0 z-0 overflow-hidden rounded-full">
          <Image
            src={PORTAL.img as string}
            alt={PORTAL.alt}
            fill
            sizes="(min-width: 768px) 580px, 340px"
            className="scale-[1.04] object-cover"
          />
          <video
            src="/hero-window.mp4"
            className="absolute inset-0 z-[1] h-full w-full scale-[1.04] object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
        {/* boarding shade — slides up on load */}
        <div className="absolute inset-0 rounded-full bg-clouddeep" data-shade />
      </div>
    </div>
  );
}

function PortholeRim({
  rimRef,
}: {
  rimRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={rimRef}
      aria-hidden="true"
      className="pointer-events-none absolute right-[-70px] top-[120px] z-30 h-[300px] w-[300px] will-change-transform md:right-[36px] md:top-1/2 md:h-[580px] md:w-[580px] md:-translate-y-1/2"
    >
      <div className="absolute inset-0 rounded-full border-[10px] border-navydeep md:border-[16px]" />
      {/* gold pinstripe on the rim's inner edge — makes headline/rim depth legible */}
      <div className="absolute inset-0 rounded-full ring-[3px] ring-gold/80 ring-inset" />
      {/* latch on the rim, in front of everything */}
      <div className="absolute left-[79%] top-[48%] h-2.5 w-14 rounded-[5px] bg-gold md:h-3 md:w-16" />
    </div>
  );
}
export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const rimRef = useRef<HTMLDivElement>(null);
  const portalImgRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (
      !root ||
      !fillRef.current ||
      !rimRef.current ||
      !portalImgRef.current ||
      !ctaRef.current
    ) {
      return;
    }
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const shade = root.querySelector<HTMLElement>("[data-shade]");
    const portalImg = portalImgRef.current.querySelector<HTMLImageElement>("img");
    if (!shade || !portalImg) return;

    // the window video is ambient motion: hold it on its first frame for
    // visitors who ask for reduced motion — loop it otherwise (muted
    // autoplay is allowed everywhere, but not every engine fires it on its own)
    const portalVideo = portalImgRef.current.querySelector<HTMLVideoElement>("video");
    if (reduceQuery.matches) {
      if (portalVideo) portalVideo.loop = false;
      portalVideo?.pause();
    } else {
      portalVideo?.play().catch(() => {});
    }

    const ctx = gsap.context(() => {
      if (reduceQuery.matches) return;

      const copy = root.querySelector<HTMLElement>("[data-copy]")!;

      // ------------------------------------------------ Load sequence
      // Intro timeline. The last argument of each .to() is the START TIME
      // in seconds (absolute) — edit numbers by hand to retune.
      //
      //   0.00 — window shade slides up (video already playing beneath it)
      //   0.62 — eyebrow fades
      //   0.72 — headline lines rise through their masks (80ms stagger)
      //   1.55 — subhead
      //   1.75 — CTA row + "now boarding" chip + scroll cue
      //
      // Idle loop: CTA breathe.
      gsap.set(shade, { yPercent: 0 });
      gsap.set(root.querySelectorAll(".hero-line"), { yPercent: 118 });
      gsap.set(".hero-eyebrow, .hero-sub, .hero-cta-row, .hero-chip, .hero-cue", {
        y: 18,
        opacity: 0,
      });

      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .to(shade, { yPercent: -104, duration: 0.9 }, 0.0)
        .to(".hero-eyebrow", { y: 0, opacity: 1, duration: 0.5 }, 0.62)
        .to(".hero-line", { yPercent: 0, duration: 0.95, stagger: 0.08 }, 0.72)
        .to(".hero-sub", { y: 0, opacity: 1, duration: 0.65 }, 1.55)
        .to(".hero-cta-row, .hero-chip, .hero-cue", {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
        }, 1.75);

      // idle: CTA breathe
      gsap.to(ctaRef.current, {
        scale: 1.035,
        duration: 1.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        transformOrigin: "center",
      });

      // ------------------------------------------------ Scroll portal
      // Pinned: the window scales up until it fills the viewport and the
      // wing view pours out full-bleed.
      const mm = gsap.matchMedia();
      const buildPortal = (scaleTo: number) => {
        gsap.set(fillRef.current, { transformOrigin: "50% 50%" });
        gsap.set(rimRef.current, { transformOrigin: "50% 50%" });
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 0.4,
            anticipatePin: 1,
          },
        });
        tl
          .to(copy, { y: -90, opacity: 0.06, ease: "power1.in" }, 0)
          .to(fillRef.current, { scale: scaleTo }, 0)
          .to(rimRef.current, { scale: scaleTo }, 0);
      };

      mm.add("(min-width: 768px)", () => buildPortal(3.2));
      mm.add("(max-width: 767px)", () => buildPortal(3.35));
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex h-svh w-full flex-col justify-center overflow-hidden bg-cloud px-5 pb-[54px] pt-[96px] md:px-14"
    >
      {/* window fill stack: the crew's wing view, looping */}
      <Porthole fillRef={fillRef} portalRef={portalImgRef} />

      {/* copy — z above the ring fill, under the rim overlay */}
      <div
        data-copy
        className="relative z-20 flex w-full max-w-[900px] flex-col items-start gap-[14px] md:gap-[22px]"
      >
        <p className="hero-eyebrow whitespace-nowrap text-[10px] font-semibold tracking-[1.5px] text-coral md:text-xs md:tracking-[2.5px]">
          SANTA MARIA · ACCRA · EST. 2017 · ★ 5.0
          <span className="hidden md:inline"> (3 REVIEWS)</span>
        </p>

        <h1 className="font-display text-[clamp(44px,7.6vw,110px)] leading-[0.98] font-extrabold text-navy">
          {["THE WINDOW", "SEAT IS", "YOURS."].map((line) => (
            <span key={line} className="block overflow-hidden">
              <span className="hero-line block whitespace-nowrap will-change-transform">
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p className="hero-sub max-w-[560px] text-sm leading-[1.5] text-navy md:text-lg md:leading-[27px]">
          International education and travel services from Santa Maria, Accra.
          We take you from “thinking about it” to holding your ticket —
          school files, visas, flights.
        </p>

        <div className="hero-cta-row flex flex-col items-start gap-2.5 md:flex-row md:items-center md:gap-[14px]">
          <a
            ref={ctaRef}
            href={waReply(CTA_DEFAULT_TEXT)}
            className="block flex-none whitespace-nowrap rounded-full bg-coral px-6 py-[13px] font-display text-[11px] font-bold text-white will-change-transform md:px-7 md:py-[15px] md:text-[13px]"
          >
            CLAIM MY WINDOW SEAT →
          </a>
          <a
            href="#intent"
            className="whitespace-nowrap text-xs font-medium text-navy hover:text-azure md:text-[13px]"
          >
            or pack your file below ↓
          </a>
        </div>

        {/* now-boarding chip */}
        <div className="hero-chip flex items-center gap-2 rounded-full bg-navy px-3.5 py-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-coral" />
          <span className="text-[9px] font-bold tracking-[2px] text-cloud md:text-[10px]">
            NOW BOARDING · {BUSINESS.hours}
          </span>
        </div>
      </div>

      {/* rim + latch — mirrored wrapper, scales with the fill, sits over the copy */}
      <PortholeRim rimRef={rimRef} />

      {/* scroll cue */}
      <div className="hero-cue pointer-events-none absolute inset-x-0 bottom-5 z-20 flex justify-center">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-navy" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
