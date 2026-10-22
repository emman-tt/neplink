import { BUSINESS } from "./site-data";

// Static contact strip — every channel on the record. Server component.
export default function Footer() {
  return (
    <footer className="w-full bg-navydeep px-5 py-12 md:px-14 md:py-16">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-2">
          <p className="font-display text-lg font-extrabold text-cloud md:text-xl">
            NEPLINK TRAVEL HUB ✈
          </p>
          <p className="max-w-[340px] text-xs leading-[19px] text-skypale">
            {BUSINESS.tagline}. Operating since {BUSINESS.operatingSinceYear} ·
            est. {BUSINESS.foundedYear} · Santa Maria, Accra.
          </p>
        </div>

        <div className="flex flex-col gap-1.5 text-[11px] leading-[20px] text-skypale md:text-right">
          <p>{BUSINESS.address.toUpperCase()}</p>
          <p>{BUSINESS.poBox.toUpperCase()}</p>
          <a href={BUSINESS.phoneHref} className="font-bold text-cloud hover:text-gold">
            {BUSINESS.phoneDisplay} · MON–SAT
          </a>
          <p>{BUSINESS.hours} · {BUSINESS.hoursNote}</p>
          <a href={`mailto:${BUSINESS.email}`} className="hover:text-gold">
            {BUSINESS.email.toUpperCase()}
          </a>
          <a href={BUSINESS.facebook} className="hover:text-gold">
            FACEBOOK.COM/NEPLINKCONSULT
          </a>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-1.5 border-t border-[#22394C] pt-5 text-[9px] tracking-[1.5px] text-skypale/60 md:flex-row md:justify-between">
        <p>
          REG {BUSINESS.reg} · VAT {BUSINESS.vat} · LISTED {BUSINESS.listingSinceYear}
        </p>
        <p>
          5.615787, -0.288077 · THE WINDOW SEAT CONCEPT — {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
