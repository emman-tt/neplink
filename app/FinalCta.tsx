"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BUSINESS, REVIEWS, waReply } from "./site-data";
import { useIntent } from "./intent-store";

gsap.registerPlugin(ScrollTrigger);

// Final CTA — the giant boarding pass. Passenger = the visitor; service and
// destination read live from the intent picker. Magnetic WhatsApp button.
function Barcode() {
  // deterministic stripes — no invented data encoded, just the motif
  const widths = [3, 1, 2, 1, 4, 1, 2, 2, 1, 3, 1, 1, 2, 4, 1, 2, 1, 3, 2, 1, 1, 4, 2, 1, 3, 1];
  return (
    <div className="flex h-[52px] items-end gap-[3px]" aria-hidden>
      {widths.map((w, i) => (
        <span
          key={i}
          className="block h-full bg-navy"
          style={{ width: `${w}px`, opacity: i % 3 === 1 ? 0.55 : 1 }}
        />
      ))}
    </div>
  );
}

export default function FinalCta() {
  const rootRef = useRef<HTMLElement>(null);
  const magRef = useRef<HTMLAnchorElement>(null);
  const intent = useIntent();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Scroll-triggered timeline:
      //
      //  0.0 — the giant pass slides up out of the fold
      //  0.2 — headline + passenger rows
      //  0.4 — magnetic button + on-the-record strip
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: root, start: "top 65%" },
      });
      tl.fromTo(
        ".final-pass",
        { y: 110, rotate: 1.5 },
        { y: 0, rotate: 0, duration: 0.9 },
        0,
      )
        .from(".final-copy > *", { y: 26, opacity: 0, duration: 0.6, stagger: 0.1 }, 0.2)
        .from(".final-rest", { y: 20, opacity: 0, duration: 0.5, stagger: 0.09 }, 0.4);
    }, root);

    // magnetic pull (desktop)
    let removeMag = () => {};
    const mag = magRef.current;
    if (mag && !window.matchMedia("(hover: none)").matches) {
      const xTo = gsap.quickTo(mag, "x", { duration: 0.4, ease: "power3" });
      const yTo = gsap.quickTo(mag, "y", { duration: 0.4, ease: "power3" });
      const onMove = (e: PointerEvent) => {
        const rect = mag.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const dist = Math.hypot(dx, dy);
        if (dist < 140) {
          xTo(dx * 0.25);
          yTo(dy * 0.25);
        } else {
          xTo(0);
          yTo(0);
        }
      };
      window.addEventListener("pointermove", onMove);
      removeMag = () => window.removeEventListener("pointermove", onMove);
    }

    return () => {
      ctx.revert();
      removeMag();
    };
  }, []);

  const svc = intent.service ?? "STUDY";
  const dst = intent.destination ?? "TORONTO";

  return (
    <section
      id="cta"
      ref={rootRef}
      aria-label="Claim your window seat"
      className="w-full bg-navy px-5 py-16 md:px-14 md:py-24"
    >
      <div className="final-copy flex flex-col gap-3">
        <p className="text-[10px] font-semibold tracking-[2.5px] text-gold">
          FINAL CALL · {BUSINESS.hours}
        </p>
        <h2 className="font-display text-[clamp(40px,6.4vw,92px)] leading-[0.98] font-extrabold text-cloud">
          YOUR SEAT IS
          <br />
          WAITING.
        </h2>
      </div>

      {/* the giant boarding pass */}
      <div className="final-pass relative mt-10 overflow-hidden rounded-2xl bg-cloud p-7 shadow-[0_30px_90px_rgba(13,27,43,0.45)] md:mt-14 md:p-10">
        <div className="absolute left-[58%] top-0 h-full w-0 border-r-2 border-dashed border-navy/20 max-md:hidden" />

        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col justify-between gap-6">
            <div>
              <p className="text-[9px] font-bold tracking-[2.5px] text-navy/50">
                NEPLINK TRAVEL HUB · BOARDING PASS
              </p>
              <p className="mt-2 font-display text-[clamp(30px,3.4vw,54px)] font-extrabold text-navy">
                PASSENGER: YOU
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              <Cell label="SERVICE" value={svc} />
              <Cell label="DESTINATION" value={dst} />
              <Cell label="ORIGIN" value="ACC · SANTA MARIA" />
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-5 max-md:border-t-2 max-md:border-dashed max-md:border-navy/20 max-md:pt-6 md:items-end md:border-l-2 md:border-dashed md:border-navy/20 md:pl-8">
            <Barcode />
            <a
              ref={magRef}
              href={waReply(
                `Hi Neplink — my boarding pass says ${svc} for ${dst.charAt(0)}${dst.slice(1).toLowerCase()}. Let's make it real: `,
              )}
              className="block flex-none whitespace-nowrap rounded-full bg-coral px-7 py-4 font-display text-[12px] font-bold text-white transition-colors hover:bg-[#d4583d] md:text-[13px]"
            >
              SEND IT ON WHATSAPP →
            </a>
            <p className="text-[9px] font-bold tracking-[1.5px] text-navy/50">
              {BUSINESS.phoneDisplay} · {BUSINESS.email.toUpperCase()}
            </p>
          </div>
        </div>
      </div>

      {/* on the record */}
      <div className="final-rest mt-10 grid gap-4 md:grid-cols-[auto_1fr] md:gap-10">
        <p className="font-display text-lg font-extrabold text-gold">
          ★ {BUSINESS.rating.toFixed(1)}
          <span className="text-[11px] text-skypale"> · {BUSINESS.reviewCount} REVIEWS · {BUSINESS.reviewSource}</span>
        </p>
        <ul className="flex flex-col gap-1.5">
          {REVIEWS.map((r) => (
            <li key={r.name} className="text-xs text-skypale md:text-[13px]">
              <span className="font-bold text-cloud">{r.name}</span>
              <span className="text-skypale/70"> · {r.trip} — </span>
              {r.line}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[8px] font-bold tracking-[2px] text-navy/50">{label}</p>
      <p className="font-display text-[16px] font-extrabold text-navy">{value}</p>
    </div>
  );
}
