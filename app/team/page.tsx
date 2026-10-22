import TopBar from "../TopBar";
import SmoothScroll from "../SmoothScroll";
import MarqueeBand from "../MarqueeBand";
import CrewGrid from "./CrewGrid";
import TeamCta from "./TeamCta";
import Footer from "../Footer";
import WhatsAppSticky from "../WhatsAppSticky";
import { DIRECTOR } from "./team-data";
import Monogram from "./Monogram";

export const metadata = {
  title: "Team — Neplink Travel Hub, Accra",
  description:
    "The Neplink Travel Hub crew: director, administrative affairs, tour operations, resource and training, accounts. Santa Maria, Accra — the visa doctors.",
};

// Team — the crew register. Dossier header with the director's card, the
// filterable crew grid, a quiet record band, one navy closing band. Server
// components throughout except the grid; no member stories exist in the
// client material, so nothing is invented.
export default function Team() {
  return (
    <>
      <SmoothScroll />
      <main id="main">
        <TopBar />
        <TeamHero />
        <CrewGrid />
        <MarqueeBand variant="quiet" />
        <TeamCta />
        <Footer />
      </main>
      <WhatsAppSticky />
    </>
  );
}

function TeamHero() {
  return (
    <section
      id="top"
      aria-label="The Neplink team"
      className="relative w-full overflow-hidden bg-cloud px-5 pb-12 pt-28 md:px-14 md:pb-16 md:pt-36"
    >
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-14">
        <div className="flex max-w-[720px] flex-col gap-5">
          <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-navy/45">
            Neplink Travel Hub · The team
          </p>
          <h1 className="font-display text-[clamp(40px,5vw,64px)] leading-[1.02] font-extrabold text-navy">
            The crew.
          </h1>
          <p className="max-w-[560px] text-[15px] leading-[1.7] text-navy/80 md:text-[17px]">
            A multi-cultural workforce built on the expertise of our executive
            directors and management team — student recruitment, visa
            consultancy, tour-abroad programs, flight ticketing and
            reservation.
          </p>
          <p className="text-[12px] font-medium text-navy/55">
            Five people · four desks · Administrative Affairs, Tour Operations,
            Training + Development, Accounts
          </p>
        </div>

        {/* the director's card */}
        <div className="flex-none rounded-lg border border-navy/10 bg-white p-7 shadow-[0_1px_2px_rgba(20,40,62,0.06)] md:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-navy/45">
            Director
          </p>
          <div className="mt-5 flex items-center gap-5">
            <Monogram initials={DIRECTOR.initials} big />
            <div className="flex flex-col gap-1.5">
              <p className="font-display text-[clamp(18px,1.6vw,22px)] font-extrabold leading-[1.2] text-navy">
                {DIRECTOR.name}
              </p>
              <p className="text-[13px] font-medium text-navy/65">
                {DIRECTOR.role} · {DIRECTOR.dept}
              </p>
            </div>
          </div>
          <p className="mt-6 border-t border-navy/10 pt-4 text-[12px] leading-[18px] text-navy/55">
            Officially registered practice in Santa Maria, Accra · Mon–Sat
            8:00–16:00
          </p>
        </div>
      </div>
    </section>
  );
}
