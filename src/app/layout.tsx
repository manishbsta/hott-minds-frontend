import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { COMPANY } from "@/constants/company";

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
  title: `${COMPANY.name} | Custom DTF Apparel & ${COMPANY.divisions.catering}`,
  description: `${COMPANY.contacts.location.city}'s premier custom DTF apparel studio and celebration catering. Custom tees, hoodies, caps, plus ${COMPANY.divisions.catering} & gourmet infusion cakes.`,
  keywords: [
    COMPANY.name,
    "DTF Printing",
    "Custom T-Shirts",
    "Custom Hoodies",
    "Snapback Caps",
    COMPANY.divisions.catering,
    "Catering",
    "Rum Infusion Cakes",
    `${COMPANY.contacts.location.city} Apparel`,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${anton.variable} h-full scroll-smooth antialiased`}
    >
      <body
        suppressHydrationWarning
        className="bg-bone text-ink selection:bg-blaze flex min-h-full flex-col font-sans selection:text-white"
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
