import { MAP } from "./contact-data";

// The map — OpenStreetMap embed (free, no key) on a deeper cream band, one
// hairline frame, quiet attribution. Marker sits where the client's own site
// map points: Santa Maria, Accra. Get-directions uses the client's own
// Google Maps link.
export default function MapBand() {
  return (
    <section
      aria-label="Office location"
      className="w-full bg-clouddeep px-5 py-16 md:px-14 md:py-24"
    >
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-navy/45">
              Location
            </p>
            <h2 className="mt-2 font-display text-[clamp(22px,2vw,26px)] font-extrabold leading-[1.2] text-navy">
              Find the office
            </h2>
          </div>
          <a
            href={MAP.directions}
            className="self-start text-[13px] font-semibold text-azure hover:underline md:self-auto"
          >
            Get directions on Google Maps ↗
          </a>
        </div>

        <div className="overflow-hidden rounded-lg border border-navy/15 bg-white shadow-[0_1px_2px_rgba(20,40,62,0.06)]">
          <iframe
            src={MAP.src}
            title="Map — Neplink Travel Hub, Santa Maria, Accra"
            loading="lazy"
            className="h-[380px] w-full border-0 md:h-[520px]"
          />
        </div>

        <p className="text-[11px] leading-[17px] text-navy/50">
          Map © OpenStreetMap contributors · marker at Santa Maria, Accra —
          office access via the address row above.
        </p>
      </div>
    </section>
  );
}
