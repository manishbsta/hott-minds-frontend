import type { Metadata } from "next";
import { COMPANY } from "@/constants/company";
import { SITE, type PageSeo } from "@/constants/site";

/**
 * Metadata for a page: title, description, canonical URL, and social cards.
 * Next.js merges metadata shallowly, so a page's `openGraph` replaces the root layout's entirely —
 * every shared Open Graph field is repeated here. Share images come from each route's
 * `opengraph-image.tsx`.
 */
export function pageMetadata({ path, title, description }: PageSeo): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: COMPANY.name,
      locale: SITE.locale,
      url: path,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
