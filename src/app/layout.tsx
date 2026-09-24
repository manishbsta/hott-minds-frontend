import type { Metadata, Viewport } from "next";
import { Inter, Anton } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { COMPANY } from "@/constants/company";
import { PAGES, SITE } from "@/constants/site";
import { siteJsonLd } from "@/lib/structured-data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: PAGES.home.title,
    template: `%s | ${COMPANY.name}`,
  },
  description: PAGES.home.description,
  applicationName: COMPANY.name,
  keywords: [
    COMPANY.name,
    COMPANY.divisions.apparel,
    "DTF Printing",
    `${COMPANY.contacts.location.city} DTF Printing`,
    "Custom T-Shirts",
    "Custom Hoodies",
    "Snapback Caps",
    "Family Reunion Shirts",
    COMPANY.divisions.catering,
    `${COMPANY.contacts.location.city} Catering`,
    "Pound Cakes",
    "Rum Infusion Cakes",
  ],
  authors: [{ name: COMPANY.legalName, url: SITE.url }],
  creator: COMPANY.legalName,
  publisher: COMPANY.legalName,
  category: "Custom apparel printing and catering",
  // No `alternates.canonical` here: it would be inherited by every page that forgot its own.
  openGraph: {
    type: "website",
    siteName: COMPANY.name,
    locale: SITE.locale,
    title: PAGES.home.title,
    description: PAGES.home.description,
  },
  twitter: {
    card: "summary_large_image",
    title: PAGES.home.title,
    description: PAGES.home.description,
  },
  robots: SITE.isIndexable
    ? {
        index: true,
        follow: true,
        // Let Google (incl. AI Overviews / AI Mode) show full-length snippets and large images.
        googleBot: {
          index: true,
          follow: true,
          "max-snippet": -1,
          "max-image-preview": "large",
          "max-video-preview": -1,
        },
      }
    : { index: false, follow: false },
  verification: {
    google: SITE.verification.google,
    other: SITE.verification.bing ? { "msvalidate.01": SITE.verification.bing } : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: SITE.themeColor,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-US"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${anton.variable} h-full scroll-smooth antialiased`}
    >
      <body
        suppressHydrationWarning
        className="bg-bone text-ink selection:bg-blaze flex min-h-full flex-col font-sans selection:text-white"
      >
        <JsonLd data={siteJsonLd()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
