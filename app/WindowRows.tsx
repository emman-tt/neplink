"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// The four city portholes — same Unsplash assets as the pen artboards.
// Per the design log the gallery stays static: only the cards' entrance
// staggers, and the images never drift.
const CITIES = [
  {
    name: "LONDON",
    img: "https://images.unsplash.com/photo-1662237392393-36a5c1e008e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3OTI1Mzk5NjZ8&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "TORONTO",
    img: "https://images.unsplash.com/photo-1708733848658-fffdf2f3ff49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3OTI1Mzk5NjZ8&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "DUBAI",
    img: "https://images.unsplash.com/photo-1634007626524-f47fa37810a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3OTI1Mzk5NjZ8&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "ACCRA",
    img: "https://images.unsplash.com/photo-1568025848823-86404cd04ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3OTI1Mzk5NjZ8&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

// Cloud band — heading in, then the four destination cards stagger up.
export default function WindowRows() {
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
      //  0.0 — title + counter
      //  0.25 — four porthole cards stagger up
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: root, start: "top 72%" },
      });
      tl
        .from(".rows-head > *", { y: 18, opacity: 0, duration: 0.6, stagger: 0.1 }, 0)
        .from(".window-card", { y: 34, opacity: 0, duration: 0.7, stagger: 0.12 }, 0.25);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="routes"
      ref={rootRef}
      className="flex w-full flex-col gap-4 bg-cloud px-5 py-[34px] md:gap-7 md:px-14 md:py-14"
    >
      <div className="rows-head flex flex-col items-start gap-1 md:flex-row md:items-end md:justify-between">
        <h2 className="font-display text-[22px] font-extrabold text-navy md:text-[34px]">
          WINDOW ROWS
        </h2>
        <p className="text-[10px] font-medium tracking-[2px] text-coral md:text-xs">
          WHERE OUR TRAVELERS FLY
          <span className="hidden md:inline"> — ONE SEAT AWAY</span>
        </p>
      </div>

      <div className="flex w-full gap-2.5 md:gap-5">
        {CITIES.map((city) => (
          <div
            key={city.name}
            className="window-card flex min-w-0 flex-1 flex-col items-center gap-2 will-change-transform md:gap-3"
          >
            <div className="relative h-[130px] w-full overflow-hidden rounded-full md:h-[250px]">
              <Image
                src={city.img}
                alt={`Porthole view over ${city.name}`}
                fill
                sizes="(min-width: 768px) 320px, 24vw"
                className="object-cover"
              />
            </div>
            <p className="whitespace-nowrap font-display text-[10px] font-bold text-navy md:text-[15px]">
              {city.name}
            </p>
            <p className="hidden text-[11px] text-azure md:block">
              window seat available
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
