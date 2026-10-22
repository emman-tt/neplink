import { waReply } from "../site-data";

// Single source of truth for the Contact page. Every value is verbatim from
// the client's own CONTACT page on their Site123 site — address, box, phones,
// email and the day-by-day hours (which are also why site-data BUSINESS.hours
// now reads MON–SAT 8:00–16:00). The map embed centers on the coordinates in
// the client's own site map link (Santa Maria, Accra).

export const CONTACT = {
  eyebrow: "NEPLINK TRAVEL HUB · SANTA MARIA, ACCRA",
  title: ["Contact."],
  intro:
    "Talk to a human — call, message, or visit the office in Santa Maria, Accra. The line that answers is the desk that files.",
  note: "Do not hesitate to contact us in case you need further clarification — email or call us. Neplink is always at your service.",
} as const;

// Contact channels — one register row each: label, value, action. `code` is
// a stable row key (not shown); href null where no real destination exists
// (the PO Box is postal, not a link).
export const CHANNELS = [
  {
    code: "OFZ",
    label: "Office",
    value: "East Deseret Street, Santa Maria — Accra, GHANA",
    action: "View on map",
    href: "https://maps.google.com?q=East+Deseret+Street+%2CSanta+Maria+-Accra%2CGHANA",
  },
  {
    code: "BOX",
    label: "Postal address",
    value: "P.O. BOX AN 15429, ACCRA NORTH — GHANA",
    action: null,
    href: null,
  },
  {
    code: "DIA",
    label: "Telephone",
    value: "+233 24 740 5685",
    action: "Call",
    href: "tel:+233247405685",
  },
  {
    code: "WAP",
    label: "WhatsApp",
    value: "+233 24 740 5685",
    action: "Message",
    href: waReply("Hello Neplink — from the contact page. I need a clarification: "),
  },
  {
    code: "NET",
    label: "Email",
    value: "Neplinkconsult@yandex.com",
    action: "Write",
    href: "mailto:Neplinkconsult@yandex.com",
  },
] as const;

export const HOURS = [
  ["MONDAY", "8:00 – 16:00"],
  ["TUESDAY", "8:00 – 16:00"],
  ["WEDNESDAY", "8:00 – 16:00"],
  ["THURSDAY", "8:00 – 16:00"],
  ["FRIDAY", "8:00 – 16:00"],
  ["SATURDAY", "8:00 – 16:00"],
  ["SUNDAY", "CLOSED"],
] as const;

// Map — OpenStreetMap embed (free, attribution-required below the frame),
// marker dropped on the coordinates the client's own site map uses.
export const MAP = {
  lat: 5.6118859,
  lng: -0.2797333,
  src: "https://www.openstreetmap.org/export/embed.html?bbox=-0.2866%2C5.6034%2C-0.2729%2C5.6204&layer=mapnik&marker=5.6118859%2C-0.2797333",
  directions:
    "https://maps.google.com?q=East+Deseret+Street+%2CSanta+Maria+-Accra%2CGHANA",
} as const;
