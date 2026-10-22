import Link from "next/link";
import { BUSINESS } from "./site-data";

const NAV = [
  { label: "ABOUT", href: "/about" },
  { label: "TEAM", href: "/team" },
  { label: "CONTACT", href: "/contact" },
] as const;

// Static chrome — all nav links are page routes. Stays a server component.
export default function TopBar() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 flex h-16 w-full flex-none items-center justify-between px-5 md:pl-10 md:pr-14">
      <Link href="/" className="whitespace-nowrap" aria-label="Neplink Travel Hub — home">
        <span className="font-display text-sm font-bold text-navy md:hidden">
          NEPLINK ✈
        </span>
        <span className="hidden font-display text-[15px] font-bold tracking-[1px] text-navy md:inline">
          NEPLINK TRAVEL HUB ✈
        </span>
      </Link>

      <nav className="hidden items-center gap-[18px] xl:gap-[26px] md:flex">
        {NAV.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="text-xs font-medium tracking-[1.5px] text-navy hover:text-azure"
          >
            {label}
          </a>
        ))}
      </nav>

      <a
        href={BUSINESS.phoneHref}
        className="flex flex-none items-center rounded-full bg-azure px-3 py-[6px] md:px-4 md:py-2"
      >
        <span className="whitespace-nowrap text-[10px] font-bold text-white md:text-xs">
          {BUSINESS.phoneDisplay}
        </span>
      </a>
    </header>
  );
}
