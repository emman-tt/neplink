import TopBar from "../TopBar";
import SmoothScroll from "../SmoothScroll";
import Story from "./Story";
import FactsRow from "./FactsRow";
import WhyRows from "./WhyRows";
import Timeline from "./Timeline";
import AboutCta from "./AboutCta";
import Footer from "../Footer";
import WhatsAppSticky from "../WhatsAppSticky";
import { ABOUT } from "./about-data";

export const metadata = {
  title: "About Neplink Travel Hub — the visa doctors of Santa Maria, Accra",
  description:
    "Neplink Travel Hub is a legally registered educational consultancy in Accra — 100+ partner universities, circa 500 students placed a year, visa files since 2012. The visa doctors.",
};

// About — the company dossier. One cream register (dossier header, story,
// facts, answers, history) with a single navy closing band, matching the
// formal treatment of the contact page.
export default function About() {
  return (
    <>
      <SmoothScroll />
      <main id="main">
        <TopBar />
        <AboutHero />
        <Story />
        <FactsRow />
        <WhyRows />
        <Timeline />
        <AboutCta />
        <Footer />
      </main>
      <WhatsAppSticky />
    </>
  );
}

// Hero — dossier header: cream band, registration card on the right.
function AboutHero() {
  return (
    <section
      id="top"
      aria-label="About Neplink Travel Hub"
      className="relative w-full overflow-hidden bg-cloud px-5 pb-12 pt-28 md:px-14 md:pb-16 md:pt-36"
    >
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-14">
        <div className="flex max-w-[720px] flex-col gap-5">
          <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-navy/45">
            {ABOUT.eyebrow}
          </p>
          <h1 className="font-display text-[clamp(40px,5vw,64px)] leading-[1.02] font-extrabold text-navy">
            {ABOUT.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="max-w-[580px] text-[15px] leading-[1.7] text-navy/80 md:text-[17px]">
            {ABOUT.intro}
          </p>
          <p className="text-[12px] font-medium text-navy/55">
            Est. 2017 · Reg. BN216252019 · ★ 5.0 (3 reviews)
          </p>
        </div>

        {/* registration card — client facts only, no invented imagery */}
        <div className="flex-none rounded-lg border border-navy/10 bg-white p-7 shadow-[0_1px_2px_rgba(20,40,62,0.06)] md:p-9">
          <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-navy/45">
            Company registration
          </p>
          <p className="mt-4 font-display text-[clamp(22px,2vw,28px)] font-extrabold leading-[1.15] text-navy">
            Neplink
            <br />
            Travel Hub
          </p>
          <dl className="mt-6 flex flex-col">
            {[
              ["Formerly", "Neplink Study Consults"],
              ["Registered", "BN216252019"],
              ["VAT", "P0013716573"],
              ["Ghanayello", "Since June 2016 · verified"],
              ["GPS", "5.615787, -0.288077"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-8 border-b border-navy/10 pb-2.5 pt-2.5 last:border-b-0 last:pb-0"
              >
                <dt className="text-[11px] font-semibold uppercase tracking-[1.5px] text-navy/45">
                  {k}
                </dt>
                <dd className="text-right text-[12px] font-semibold text-navy md:text-[13px]">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
