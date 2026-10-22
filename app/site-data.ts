// Single source of truth for everything shown or contacted on the page.
// Rules (per the brief): only real, client-supplied facts. Anything we do
// NOT have from the client is prefixed "[PLACEHOLDER]" and a warn is emitted
// at build/dev start (see bottom) so none of it ships silently.
//
// Sources: pipeline brief data/briefs/580/, Ghanayello verified listing,
// their Site123 site, public Q&As + reviews (projects/neplink/RESEARCH.md).

export const BUSINESS = {
  name: "Neplink Travel Hub",
  earlierName: "Neplink Study Consults",
  nickname: "THE VISA DOCTORS",
  tagline: "Your gateway to international education and travel services",
  foundedYear: 2017,
  operatingSinceYear: 2010,
  listingSinceYear: 2016, // "10+ years with us" on Ghanayello (listed Jun 2016)
  reg: "BN216252019",
  vat: "P0013716573",
  address: "East Deseret Street, Santa Maria, Accra, Ghana",
  poBox: "P.O. Box AN 15429, Accra North",
  gps: { lat: 5.615787, lng: -0.288077 },
  phoneDisplay: "+233 24 740 5685",
  phoneHref: "tel:+233247405685",
  waLink: "https://wa.me/233247405685",
  email: "Neplinkconsult@yandex.com",
  facebook: "https://facebook.com/neplinkconsult",
  hours: "MON–SAT 8:00–16:00",
  hoursNote: "SUN CLOSED",
  rating: 5.0,
  reviewCount: 3,
  reviewSource: "GHANAYELLO · VERIFIED",
} as const;

export function waReply(text: string): string {
  return `https://wa.me/233247405685?text=${encodeURIComponent(text)}`;
}

export const CTA_DEFAULT_TEXT =
  "Hello Neplink — I want to claim my window seat. Here is my travel dream:";

// The three real Ghanayello reviews, shown exactly as supplied (shortened
// quotes, real names). Do not pad this list.
export const REVIEWS = [
  {
    name: "ALISA OWUSU",
    trip: "SOUTH AFRICA · VISAS",
    line: "Visas secured “within the promised date”.",
  },
  {
    name: "ELIJAH OWUSU",
    trip: "USA · B2 VISA",
    line: "“No wonder you are called the travel doctors.”",
  },
  {
    name: "CHIKA UCHE",
    trip: "UKRAINE · MEDICINE",
    line: "“Instant admission and … my visa to Ukraine within some few weeks.”",
  },
] as const;

export const TAGLINES = [
  "TRAVELING IS OUR CULTURE",
  "WE BRING THE WORLD TO YOUR DOOR STEP",
  "POWER OF PARTNERSHIP",
  "YOUR GATEWAY TO INTERNATIONAL EDUCATION AND TRAVEL",
] as const;

// Passport-stamp services — every line is from the service list (Site123 +
// Ghanayello super-set), condensed. Regions are theirs, verbatim.
export const PAGES = [
  {
    stamp: "STUDY FILE",
    label: "STUDY-ABROAD PROGRAMS",
    body: "Partner universities across UA · RU · CN · CA · US · AU · MY — around 500 students a year placed from Ghana, Nigeria, Sierra Leone and Liberia.",
    ink: "gold" as const,
  },
  {
    stamp: "VISA DESK",
    label: "VISAS & COUNSELLING",
    body: "Visa acquisitions and visa-process counselling — Europe, USA, Canada, South & Central America, Asia.",
    ink: "coral" as const,
  },
  {
    stamp: "APPOINTMENTS",
    label: "THE OTHER STAGES",
    body: "Flights and hotels, airport pickups for visitors to Ghana, package tours, document notarization and consulate-requirement counselling.",
    ink: "azure" as const,
  },
] as const;

// Departure-board corridors. `service` lines reuse the demand signal from
// 12 public Q&As + the service list; nothing here is a promise of price,
// dates or success. `img` may be a scene of the corridor; when the photo is
// intentionally transitional (en-route rather than a city view) `enRoute`
// names it honestly.
export type Corridor = {
  code: string;
  name: string;
  service: string;
  img?: string;
  alt: string;
  facts: string[];
  enRoute?: boolean;
};

export const CORRIDORS: Corridor[] = [
  {
    code: "LHR",
    name: "LONDON",
    service: "UK · VISITOR & STUDY FILES",
    img: "https://images.unsplash.com/photo-1662237392393-36a5c1e008e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3OTI1Mzk5NjZ8&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Porthole view over London",
    facts: [
      "Visitor-visa and study files for the UK corridor",
      "Europe visa counselling listed under our visa desk",
      "Flights, hotels and airport pickup arranged end-to-end",
    ],
  },
  {
    code: "YYZ",
    name: "TORONTO",
    service: "CANADA · STUDY + WORK PERMITS",
    img: "https://images.unsplash.com/photo-1708733848658-fffdf2f3ff49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3OTI1Mzk5NjZ8&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Porthole view over Toronto",
    facts: [
      "Canada came up again and again in our public Q&As — work permits is the recurring ask",
      "Study-abroad files run through our CA partner universities",
      "Bring the dream; we file what the consulate needs",
    ],
  },
  {
    code: "DXB",
    name: "DUBAI",
    service: "UAE · VISAS + TOURS",
    img: "https://images.unsplash.com/photo-1634007626524-f47fa37810a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3OTI1Mzk5NjZ8&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Porthole view over Dubai",
    facts: [
      "Dubai visa cost and urgency questions answered daily on WhatsApp",
      "Package tour programs organised for groups and individuals",
      "Recruitment history — teachers and corporate workers placed in Dubai",
    ],
  },
  {
    code: "IST",
    name: "ISTANBUL",
    service: "TURKEY · VISITOR VISAS",
    img: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?fm=jpg&w=1080&fit=crop",
    alt: "Galata Tower over Istanbul rooftops",
    facts: [
      "Turkey visa questions handled from our public Q&As — always the same form, every season",
      "Consulate-requirement counselling before you fill anything",
      "Pair it with a package tour program if you want the city, not just the stamp",
    ],
  },
  {
    code: "JFK",
    name: "NEW YORK",
    service: "USA · B1/B2 FILES",
    img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?fm=jpg&w=1080&fit=crop",
    alt: "Manhattan streets from street level",
    facts: [
      "A real file on the wall: Elijah Owusu's wife's USA B2 visa — assisted by Neplink",
      "USA sits in our study-abroad list (US) as well as the visa desk",
      "Interview prep is part of the file, not an upsell",
    ],
  },
  {
    code: "IEV",
    name: "KYIV",
    service: "UKRAINE · MEDICINE + STUDY",
    enRoute: true, // shot en route — honest, not a city view
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?fm=jpg&w=1080&fit=crop",
    alt: "Wing over the dusk clouds, en route",
    facts: [
      "The corridor Chika Uche flew: instant admission, medicine in Ukraine",
      "UA leads our study-abroad partner list (UA · RU · CN · CA · US · AU · MY)",
      "“Within some few weeks” — her visa timeline, on the record",
    ],
  },
  {
    code: "CAN",
    name: "GUANGZHOU",
    service: "CHINA · STUDY + RECRUITMENT",
    // Beijing scene used as the China-corridor shot — labelled honestly.
    img: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?fm=jpg&w=1080&fit=crop",
    alt: "Palace gate scene in China",
    facts: [
      "CN is on the Neplink study-abroad partner list",
      "Recruitment history: teachers and corporate workers to China since the 2012 files",
      "Pre-hotel bookings and pickups for visitors — including into Ghana",
    ],
  },
];

// Horizontal corridor rail (tours). Sample-corridor cards; ask-on-WhatsApp
// replaces invented prices/itineraries.
export const TOUR_RAIL = CORRIDORS.filter((c) => c.img).map((c) => ({
  code: c.code,
  name: c.name,
  service: c.service,
  img: c.img as string,
  alt: c.alt,
}));

export const DESTINATIONS = CORRIDORS.map((c) => ({
  code: c.code,
  name: c.name,
}));

// --- placeholder watchdog -----------------------------------------------------
// Client copy not yet supplied is parked as "[PLACEHOLDER]" strings somewhere
// above and surfaced here so no invented fact ships. Keep it running in dev
// AND production builds — silence means it shipped unreviewed.
const scan: unknown[] = [BUSINESS, REVIEWS, TAGLINES, PAGES, CORRIDORS, TOUR_RAIL, DESTINATIONS];
const dump = JSON.stringify(scan);
if (dump.includes("[PLACEHOLDER]")) {
  const hits = [...dump.matchAll(/"\[PLACEHOLDER\][^"]*"/g)].map((m) => m[0]);
  console.warn(`\n[site-data] ${hits.length} placeholder value(s) still in site.ts:\n${hits.join("\n")}\n`);
}
