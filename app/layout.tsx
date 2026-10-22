import type { Metadata } from "next";
import { Schibsted_Grotesk, Unbounded } from "next/font/google";
import "./globals.css";
import { BUSINESS } from "./site-data";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  display: "swap",
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Neplink Travel Hub — Study abroad, visas and tours in Accra",
  description:
    "Neplink Travel Hub, Santa Maria, Accra — study-abroad files, visa counselling, tours, flights and airport pickups. The visa doctors. Rated 5.0 (3 reviews) on Ghanayello.",
  openGraph: {
    title: "Neplink Travel Hub — Take the window seat",
    description:
      "Your gateway to international education and travel services — from Santa Maria, Accra. Study files, visas, tours. WhatsApp-first.",
    type: "website",
    siteName: BUSINESS.name,
  },
};

// Real facts only — reg, VAT, GPS, hours as supplied by the brief.
function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS.name,
    alternateName: BUSINESS.earlierName,
    description: BUSINESS.tagline,
    telephone: "+233247405685",
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "East Deseret Street",
      addressLocality: "Santa Maria, Accra",
      addressRegion: "Greater Accra",
      addressCountry: "GH",
      postOfficeBoxNumber: "AN 15429",
    },
    geo: { "@type": "GeoCoordinates", latitude: BUSINESS.gps.lat, longitude: BUSINESS.gps.lng },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    foundingDate: `${BUSINESS.foundedYear}`,
    identifier: [{ "@type": "PropertyValue", name: "Registration", value: BUSINESS.reg }],
    sameAs: [BUSINESS.facebook],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: BUSINESS.rating,
      reviewCount: BUSINESS.reviewCount,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} ${schibsted.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a href="#main" className="skip-link">
          SKIP TO BOARDING →
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
      </body>
    </html>
  );
}
