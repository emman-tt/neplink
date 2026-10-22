"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TOUR_RAIL, waReply } from "./site-data";

gsap.registerPlugin(ScrollTrigger);

// Corridor rail — horizontal drag gallery. Images reveal through curtain
// wipes; the desktop cursor becomes a "DRAG / VIEW" tile; every card ends
// in a WhatsApp ask (no invented prices or itineraries).
export default function ToursGallery() {
  const rootRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const rail = railRef.current;
    const cursor = cursorRef.current;
    if (!root || !rail) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".rail-head > *", {
        y: 18,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 72%" },
      });

      // curtain reveal on each card (clip wipes up, image settles)
      rail.querySelectorAll<HTMLElement>(".rail-card").forEach((card) => {
        gsap.fromTo(
          card.querySelector(".rail-curtain"),
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.9,
            ease: "power3.inOut",
            scrollTrigger: { trigger: card, start: "top 85%", once: true },
          },
        );
      });
    }, root);

    // custom cursor: DRAG over empty rail, VIEW over a card (desktop only)
    let removeCursor = () => {};
    if (cursor && !window.matchMedia("(hover: none)").matches) {
      const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });
      const onMove = (e: PointerEvent) => {
        const rect = rail.getBoundingClientRect();
        const inside =
          e.clientY > rect.top && e.clientY < rect.bottom && e.clientX > rect.left && e.clientX < rect.right;
        cursor.style.opacity = inside ? "1" : "0";
        if (inside) {
          xTo(e.clientX);
          yTo(e.clientY);
          const card = (e.target as HTMLElement).closest(".rail-card");
          gsap.to(cursor, { scale: card ? 1.25 : 1, duration: 0.25 });
          cursor.querySelector("[data-cursor-text]")!.textContent = card ? "VIEW" : "DRAG";
        }
      };
      root.addEventListener("pointermove", onMove);
      removeCursor = () => root.removeEventListener("pointermove", onMove);
    }

    return () => {
      ctx.revert();
      removeCursor();
    };
  }, []);

  return (
    <section
      id="rail"
      ref={rootRef}
      aria-label="Corridor gallery"
      className="relative w-full overflow-hidden bg-navydeep py-14 md:py-20"
    >
      <div className="rail-head mb-8 flex flex-col gap-1 px-5 md:flex-row md:items-end md:justify-between md:px-14">
        <div>
          <p className="text-[10px] font-semibold tracking-[2.5px] text-gold">
            PACKAGE TOURS · FLIGHTS · HOTELS
          </p>
          <h2 className="font-display text-[clamp(30px,4.6vw,56px)] font-extrabold text-cloud">
            THE CORRIDOR RAIL
          </h2>
        </div>
        <p className="max-w-[380px] text-xs leading-[18px] text-skypale md:text-[13px] md:leading-[21px]">
          Sample corridors — ask for the current tour programs and fares on
          WhatsApp rather than trusting a static price list.
        </p>
      </div>

      <div
        ref={railRef}
        className="no-sb flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:gap-6 md:px-14"
      >
        {TOUR_RAIL.map((c) => (
          <a
            key={c.code}
            href={waReply(`Hello Neplink — the ${c.name.toLowerCase()} corridor caught my eye. Send me today's options: `)}
            className="rail-card group relative h-[300px] w-[240px] flex-none snap-start overflow-hidden rounded-xl md:h-[440px] md:w-[340px]"
          >
            <div className="rail-curtain absolute inset-0 overflow-hidden rounded-xl">
              <Image
                src={c.img}
                alt={c.alt}
                fill
                sizes="(min-width: 768px) 340px, 240px"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-navydeep/85 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <p className="font-display text-lg font-extrabold text-cloud">{c.name}</p>
                <p className="text-[9px] font-bold tracking-[1.5px] text-skypale">{c.service}</p>
              </div>
              <span className="font-display text-sm font-extrabold text-gold">{c.code}</span>
            </div>
          </a>
        ))}

        {/* end card — ask on WhatsApp */}
        <a
          href={waReply("Hello Neplink — I want to talk tour programs: ")}
          className="flex h-[300px] w-[240px] flex-none snap-start flex-col items-start justify-between rounded-xl bg-coral p-6 transition-colors hover:bg-[#d4583d] md:h-[440px] md:w-[300px]"
        >
          <span className="font-display text-xs font-extrabold tracking-[2px] text-white/80">
            YOUR CORRIDOR
          </span>
          <span className="font-display text-[clamp(26px,2.4vw,40px)] font-extrabold leading-[1.05] text-white">
            ASK FOR
            <br />
            TODAY&apos;S
            <br />
            PROGRAMS →
          </span>
          <span className="text-[10px] font-bold tracking-[1.5px] text-white/70">
            {`wa.me/233247405685`}
          </span>
        </a>
      </div>

      {/* cursor tile (desktop) */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        data-cursor
        className="pointer-events-none fixed left-0 top-0 z-[70] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold font-display text-[9px] font-extrabold tracking-[1px] text-navy opacity-0"
      >
        <span data-cursor-text>DRAG</span>
      </div>
    </section>
  );
}
