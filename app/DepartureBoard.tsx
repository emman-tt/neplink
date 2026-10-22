"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BUSINESS, CORRIDORS, waReply, type Corridor } from "./site-data";

gsap.registerPlugin(ScrollTrigger);

// Split-flap mechanics: every letter is a tile; while `flipping` it cycles
// through the charset and settles on its target char, staggered left→right.
// Runs once when the row scrolls in; hover replays it.
const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·— ";

function FlapWord({ text, className }: { text: string; className?: string }) {
  return (
    <span className={`flex gap-[2px] ${className ?? ""}`} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          data-flap
          data-final={ch}
          className="flap-tile flex h-[1.42em] w-[1.02em] items-center justify-center overflow-hidden rounded-[3px] bg-[#1B3040] font-display text-[0.82em] font-bold leading-none text-cloud shadow-[inset_0_-1px_0_rgba(0,0,0,0.4)]"
          style={{ height: "1.42em", width: "1.06em" }}
        >
          <span className="flap-face">{ch === " " ? "\u00A0" : ch}</span>
        </span>
      ))}
    </span>
  );
}

// cycles one row of tiles once; returns cancel fn
function flipRow(row: HTMLElement, onCancel?: () => void) {
  const tiles = Array.from(row.querySelectorAll<HTMLElement>("[data-flap]"));
  const timers: number[] = [];
  tiles.forEach((tile, i) => {
    const face = tile.querySelector<HTMLElement>(".flap-face")!;
    const final = tile.dataset.final ?? " ";
    let ticks = 0;
    const maxTicks = 6 + i; // wave left to right
    const flip = () => {
      ticks += 1;
      if (ticks >= maxTicks) {
        face.textContent = final === " " ? "\u00A0" : final;
        gsap.fromTo(
          tile,
          { rotateX: -70 },
          { rotateX: 0, duration: 0.28, ease: "power3.out", transformOrigin: "top center" },
        );
        return;
      }
      if (ticks % 2 === 0) {
        gsap.fromTo(
          tile,
          { rotateX: -70 },
          { rotateX: 0, duration: 0.16, ease: "power1.out", transformOrigin: "top center" },
        );
      }
      face.textContent = CHARSET[Math.floor(Math.random() * CHARSET.length)];
      timers.push(window.setTimeout(flip, 42 + (i % 3) * 12));
    };
    flip();
  });
  const t = window.setTimeout(() => timers.forEach(clearTimeout), 6 + tiles.length + 6 * 60 + 900);
  return () => {
    timers.forEach(clearTimeout);
    clearTimeout(t);
    onCancel?.();
  };
}

export default function DepartureBoard() {
  const rootRef = useRef<HTMLElement>(null);
  const takeoverRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<Corridor | null>(null);
  const focusRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Scroll-triggered timeline:
      //
      //  0.0 — board title + GATE strip
      //  0.2 — board rows flap in, row by row (each row flips itself)
      gsap.from(".board-head > *", {
        y: 18,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 70%" },
      });
      root.querySelectorAll<HTMLElement>(".board-row").forEach((row) => {
        gsap.from(row, {
          y: 30,
          opacity: 0,
          duration: 0.55,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 88%",
            once: true,
            onEnter: () => flipRow(row),
          },
        });
        // hover replays the flap
        row.addEventListener("pointerenter", () => {
          if (!window.matchMedia("(hover: none)").matches) flipRow(row);
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  // takeover open/close — clip-path circle wipe from the clicked row
  useEffect(() => {
    const takeover = takeoverRef.current;
    if (!takeover) return;
    if (open) {
      takeover.style.pointerEvents = "auto";
      focusRef.current?.focus();
      gsap.fromTo(
        takeover,
        { clipPath: "circle(0% at var(--cx) var(--cy))" },
        {
          clipPath: "circle(150% at var(--cx) var(--cy))",
          duration: 0.85,
          ease: "power3.inOut",
        },
      );
      gsap.fromTo(
        takeover.querySelectorAll("[data-takeover-in]"),
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.09, ease: "power3.out", delay: 0.4 },
      );
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeTakeover = () => {
    const takeover = takeoverRef.current;
    if (!takeover || !open) return;
    gsap.to(takeover, {
      clipPath: "circle(0% at var(--cx) var(--cy))",
      duration: 0.6,
      ease: "power3.inOut",
      onComplete: () => setOpen(null),
    });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeTakeover();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <section
      id="board"
      ref={rootRef}
      aria-label="Departure board — destinations Neplink files"
      className="relative z-10 flex w-full flex-col gap-5 bg-navydeep px-5 pb-16 pt-14 md:gap-7 md:px-14 md:pb-24 md:pt-20"
    >
      <div className="board-head flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[10px] font-semibold tracking-[2.5px] text-gold">
            ACC · SANTA MARIA, ACCRA — GATE 5
          </p>
          <h2 className="font-display text-[clamp(30px,4.6vw,56px)] font-extrabold text-cloud">
            DEPARTURE BOARD
          </h2>
        </div>
        <p className="max-w-[380px] text-xs leading-[18px] text-skypale md:text-[13px] md:leading-[21px]">
          The corridors we file every day — built from real demand in our
          public Q&As. Tap a destination for what goes in its file.
        </p>
      </div>

      {/* board face */}
      <div className="flex flex-col gap-1.5">
        {CORRIDORS.map((c) => (
          <button
            key={c.code}
            className="board-row group grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 rounded-lg bg-[#1B3040] px-3 py-3 text-left transition-colors hover:bg-[#22394c] md:grid-cols-[auto_1fr_auto_auto] md:gap-6 md:px-5 md:py-4"
            onClick={(e) => {
              const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
              takeoverRef.current?.style.setProperty("--cx", `${r.left + r.width / 2}px`);
              takeoverRef.current?.style.setProperty("--cy", `${r.top + r.height / 2}px`);
              setOpen(c);
            }}
            aria-haspopup="dialog"
          >
            <span className="w-12 flex-none font-display text-[15px] font-extrabold text-gold md:w-16 md:text-lg">
              {c.code}
            </span>
            <FlapWord
              text={c.name}
              className="text-xl md:text-[34px]"
            />
            <span className="hidden text-[10px] font-medium tracking-[1.5px] text-skypale md:block md:text-[11px]">
              {c.service}
            </span>
            <span className="flex items-center gap-2 whitespace-nowrap text-[9px] font-bold tracking-[1.5px] text-coral md:text-[10px]">
              VIEW FILES
              <span className="inline-block h-2 w-2 rounded-full bg-coral transition-transform group-hover:scale-125" />
            </span>
          </button>
        ))}
      </div>

      {/* destination takeover */}
      <div
        ref={takeoverRef}
        role="dialog"
        aria-modal="true"
        aria-label={open ? `${open.name} details` : undefined}
        className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`}
        style={{ clipPath: open ? undefined : "circle(0% at 50% 50%)" }}
      >
        {!open ? null : (
          <>
            <Image
              src={open.img as string}
              alt={open.alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navydeep via-navydeep/60 to-navydeep/15" />

            <button
              ref={focusRef}
              onClick={closeTakeover}
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-clouddeep/90 font-display text-sm font-bold text-navy transition-transform hover:scale-110"
              aria-label="Close destination details"
            >
              ✕
            </button>

            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 pb-10 md:p-14">
              <div data-takeover-in className="flex items-baseline gap-4">
                <span className="font-display text-lg font-extrabold text-gold md:text-2xl">
                  {open.code}
                </span>
                <h3 className="font-display text-[clamp(40px,7vw,92px)] font-extrabold text-cloud">
                  {open.name}
                </h3>
              </div>
              <p
                data-takeover-in
                className="text-[10px] font-semibold tracking-[2px] text-gold md:text-xs"
              >
                {open.service}
                {open.enRoute ? " · VIEW EN ROUTE" : ""}
              </p>
              <ul data-takeover-in className="flex max-w-[720px] flex-col gap-2">
                {open.facts.map((fact) => (
                  <li
                    key={fact}
                    className="text-sm leading-[21px] text-cloud md:text-[15px] md:leading-[24px]"
                  >
                    — {fact}
                  </li>
                ))}
              </ul>
              <div data-takeover-in className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={waReply(
                    `Hello Neplink — I'm interested in ${open.service.toLowerCase().replace(/[·—]/g, " ").trim()} for ${open.name.charAt(0) + open.name.slice(1).toLowerCase()}. What should my file look like?`,
                  )}
                  className="flex-none whitespace-nowrap rounded-full bg-coral px-6 py-[14px] font-display text-[11px] font-bold text-white transition-transform hover:scale-[1.03] md:text-[13px]"
                >
                  PLAN THIS TRIP ON WHATSAPP →
                </a>
                <a
                  href={BUSINESS.phoneHref}
                  className="hidden whitespace-nowrap rounded-full border-[1.5px] border-skypale px-6 py-[13px] text-xs font-medium text-skypale hover:bg-white/5 md:block"
                >
                  or call — short calls only
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
