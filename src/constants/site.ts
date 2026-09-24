import { COMPANY } from "@/constants/company";

/**
 * Site-level SEO configuration: canonical origin, per-page titles/descriptions, and crawler settings.
 * Single source for page metadata, the sitemap, structured data, and /llms.txt.
 */

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProduction) return `https://${vercelProduction}`;
  return "http://localhost:3000";
}

export const SITE = {
  /** Canonical origin without a trailing slash. Set NEXT_PUBLIC_SITE_URL in production. */
  url: resolveSiteUrl(),
  locale: "en_US",
  language: "en-US",
  themeColor: "#141210",
  backgroundColor: "#faf6ef",
  description: `${COMPANY.name} (${COMPANY.legalName}) is a ${COMPANY.contacts.location.city}, ${COMPANY.contacts.location.region} small business run by ${COMPANY.owners.combined}. ${COMPANY.divisions.apparel} is a custom DTF (direct-to-film) apparel print studio for tees, hoodies, caps, and mugs; ${COMPANY.divisions.catering} caters parties with hot buffet pans, homemade pound cakes, and rum infusion cakes.`,
  /** Only production deployments may be indexed; Vercel preview deployments stay out of search. */
  isIndexable: (process.env.VERCEL_ENV ?? "production") === "production",
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    bing: process.env.BING_SITE_VERIFICATION,
  },
} as const;

export interface PageSeo {
  path: string;
  /** Short name used in breadcrumbs and link lists */
  name: string;
  /** Full <title>, kept under ~60 characters */
  title: string;
  /** Meta description, kept under ~155 characters */
  description: string;
}

export const PAGES = {
  home: {
    path: "/",
    name: "Custom Apparel",
    title: `Custom DTF Shirts, Hoodies & Caps in ${COMPANY.contacts.location.city} | ${COMPANY.name}`,
    description: `Custom DTF printing in ${COMPANY.contacts.location.city} on tees, hoodies, caps & mugs. Adult tees ${COMPANY.pricing.adultTee}, youth ${COMPANY.pricing.youthTee}. No minimums, 24-hour proofs, ships nationwide.`,
  },
  services: {
    path: "/services",
    name: "Catering & Cakes",
    title: `${COMPANY.contacts.location.city} Party Catering, Pound Cakes & Rum Cakes | ${COMPANY.name}`,
    description: `${COMPANY.contacts.location.city} party catering: BBQ chicken, ribs, mac & cheese pans, homemade pound cakes & rum infusion cakes. Free pound cake on orders over ${COMPANY.pricing.cateringCakePromoThreshold}.`,
  },
  contact: {
    path: "/contact",
    name: "Contact",
    title: `Text or Call to Order: Custom Shirts & Event Catering | ${COMPANY.name}`,
    description: `Order custom DTF apparel or event catering in ${COMPANY.contacts.location.city} by text or phone. Text or call ${COMPANY.contacts.phone.display} — we reply within 24 hours.`,
  },
} as const satisfies Record<string, PageSeo>;

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE.url).toString();
}
