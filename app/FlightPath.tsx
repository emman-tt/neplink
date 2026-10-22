"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { BUSINESS, waReply } from "./site-data";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Route map: Accra (ACC) drawn outward to the corridor pins. Arcs draw via
// stroke-dashoffset on a scrubbing timeline; pins pop as their arc lands;
// the plane rides the Canada arc with MotionPathPlugin.
const PINS = [
  { x: 250, y: 96, code: "LHR" },
  { x: 470, y: 176, code: "YYZ" },
  { x: 356, y: 236, code: "IEV" },
  { x: 236, y: 336, code: "DXB" },
  { x: 470, y: 330, code: "CAN" },
  { x: 596, y: 210, code: "JFK" },
];

function corridorPath(px: number, py: number) {
  const x0 = 110;
  const y0 = 250;
  const cpx = (x0 + px) / 2;
  const cpy = Math.min(y0, py) - 70;
  return `M ${x0} ${y0} Q ${cpx} ${cpy} ${px} ${py}`;
}

export default function FlightPath() {
  const rootRef = useRef<HTMLElement>(null);
  const planeRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const paths = Array.from(root.querySelectorAll<SVGPathElement>(".route-arc"));

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
          end: "bottom 55%",
          scrub: 0.5,
        },
      });

      // arcs draw out one after another
      paths.forEach((p, i) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        tl.to(p, { strokeDashoffset: 0, duration: 1 }, i * 0.5);
        // pin pops as its arc lands
        tl.fromTo(
          root.querySelector<SVGCircleElement>(`.route-pin[data-i="${i}"]`),
          { scale: 0, opacity: 0, transformOrigin: "center" },
          { scale: 1, opacity: 1, duration: 0.08, ease: "back.out(2.4)" },
          i * 0.5 + 0.9,
        );
      });

      // plane rides the Canada arc (index 1)
      const ride = paths[1];
      tl.to(
        planeRef.current,
        {
          motionPath: {
            path: ride,
            align: ride,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          duration: 2.4,
        },
        0.5,
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="flightpath"
      ref={rootRef}
      aria-label="Where we file from Accra"
      className="w-full bg-navydeep px-5 pb-20 pt-14 md:px-14 md:pb-24 md:pt-20"
    >
      <div className="mb-8 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[10px] font-semibold tracking-[2.5px] text-gold">
            DEPARTING ACC · 5.6158° N, 0.2881° W
          </p>
          <h2 className="font-display text-[clamp(30px,4.6vw,56px)] font-extrabold text-cloud">
            THE ROUTE MAP
          </h2>
        </div>
        <p className="max-w-[420px] text-xs leading-[18px] text-skypale md:text-[13px] md:leading-[21px]">
          Every arc is an active file type — study partners, visa regions and
          the corridors that keep coming back in our Q&As.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl bg-[#10233A] p-2 md:p-4">
        <svg viewBox="0 0 720 420" className="h-auto w-full" aria-hidden="true">
          {/* graticule */}
          <g stroke="#1B3040" strokeWidth="1">
            {[60, 140, 220, 300, 380].map((y) => (
              <line key={y} x1="0" y1={y} x2="720" y2={y} />
            ))}
            {[90, 180, 270, 360, 450, 540, 630].map((x) => (
              <line key={x} x1={x} y1="0" x2={x} y2="420" />
            ))}
          </g>

          {/* corridor arcs — drawn on scroll */}
          {PINS.map((pin, i) => (
            <path
              key={`${pin.code}-arc`}
              className="route-arc"
              data-i={i}
              d={corridorPath(pin.x, pin.y)}
              fill="none"
              stroke="#3D7BC0"
              strokeWidth="2.5"
            />
          ))}

          {/* origin */}
          <g>
            <circle cx="110" cy="250" r="9" fill="#E86A4E" />
            <circle cx="110" cy="250" r="16" fill="none" stroke="#E86A4E" strokeOpacity="0.4" strokeWidth="2" />
            <text x="128" y="255" fill="#F7F4EE" fontSize="15" fontWeight="800">
              ACC · ACCRA
            </text>
          </g>

          {/* pins */}
          {PINS.map((pin, i) => (
            <g key={`${pin.code}-pin`} className="route-pin" data-i={i}>
              <circle cx={pin.x} cy={pin.y} r="6.5" fill="#C9E3F6" />
              <circle cx={pin.x} cy={pin.y} r="12" fill="none" stroke="#C9E3F6" strokeOpacity="0.35" strokeWidth="1.5" />
              <text x={pin.x + 16} y={pin.y + 5} fill="#C9E3F6" fontSize="12" fontWeight="700" letterSpacing="1">
                {pin.code}
              </text>
            </g>
          ))}

          {/* the plane */}
          <g ref={planeRef} transform="translate(110 250)">
            <svg width="30" height="30" viewBox="0 0 24 24" x="-15" y="-15">
              <path
                fill="#E4B54B"
                d="M21.9 11.6l-9.6-.4-5.7-8.4-1.9.4 3.8 8-6.5.5L.6 8.9l-1.5.4 1.9 3.9-1.9 3.9 1.5.4 1.4-3.8 6.5.5-3.8 8 1.9.4 5.7-8.4 9.6-.4a1.6 1.6 0 0 0 0-3.2z"
                transform="scale(0.92) rotate(-45 12 12)"
              />
            </svg>
          </g>
        </svg>
      </div>

      {/* corridor legend as manifest chips */}
      <div className="mt-6 flex flex-wrap gap-2">
        {[
          "STUDY: UA · RU · CN · CA · US · AU · MY",
          "VISAS: EUROPE · USA · CANADA · THE AMERICAS · ASIA",
          "TOURS · FLIGHTS · HOTELS · PICKUPS",
        ].map((chip) => (
          <a
            key={chip}
            href={waReply(`Hello Neplink — about ${chip.split(":")[0].toLowerCase()}: `)}
            className="rounded-full border border-[#22394C] bg-[#1B3040] px-4 py-2.5 text-[10px] font-bold tracking-[1px] text-skypale transition-colors hover:border-gold hover:text-gold md:text-[11px]"
          >
            {chip}
          </a>
        ))}
      </div>
      <p className="mt-4 text-[10px] tracking-[1px] text-skypale/70">
        TALK TO {BUSINESS.phoneDisplay} · {BUSINESS.hours}
      </p>
    </section>
  );
}
