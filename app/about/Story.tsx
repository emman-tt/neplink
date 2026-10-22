import { ABOUT } from "./about-data";

// The story — editorial two-column on cream with the philosophy pull-quote
// set as a quiet line on the deeper cream band. Server component: no motion,
// all text is the client's own copy.
export default function Story() {
  return (
    <section aria-label="Our story" className="w-full bg-cloud px-5 pt-6 md:px-14 md:pt-8">
      <div className="mx-auto grid max-w-[1180px] gap-8 pb-14 md:grid-cols-[1fr_1.3fr] md:gap-16 md:pb-20">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-navy/45">
            The story so far
          </p>
          <h2 className="mt-2 font-display text-[clamp(22px,2vw,26px)] font-extrabold leading-[1.2] text-navy">
            From Santa Maria to
            <br />
            first-class universities
          </h2>
        </div>
        <div className="flex flex-col gap-5 text-[15px] leading-[1.7] text-navy/80 md:text-[16px]">
          {ABOUT.story.map((p) => (
            <p key={p.slice(0, 18)}>{p}</p>
          ))}
          <p className="text-[13px] leading-[1.65] text-navy/55">
            Lookup “Neplink study consults” — same company, earlier name. The
            practice has answered visa and study questions in public for years,
            which is where every corridor on the home page comes from.
          </p>
        </div>
      </div>

      {/* philosophy band */}
      <div className="w-full border-y border-navy/10 bg-clouddeep">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-2 px-5 py-10 md:px-14 md:py-12">
          <p className="font-display text-[clamp(22px,2.2vw,26px)] font-extrabold leading-[1.15] text-navy">
            “{ABOUT.pullQuote}”
          </p>
          <p className="text-[13px] leading-[1.6] text-navy/60">
            {ABOUT.pullNote}
          </p>
        </div>
      </div>
    </section>
  );
}
