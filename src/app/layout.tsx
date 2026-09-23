import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  title: "Hott Minds | Custom DTF Apparel & H.M.I Catering",
  description:
    "Chicago's premier custom DTF apparel studio and celebration catering. Custom tees, hoodies, caps, plus Hott Meals Instantly catering & gourmet infusion cakes.",
  keywords: [
    "Hott Minds",
    "DTF Printing",
    "Custom T-Shirts",
    "Custom Hoodies",
    "Snapback Caps",
    "Hott Meals Instantly",
    "Catering",
    "Rum Infusion Cakes",
    "Chicago Apparel",
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
      className={`${inter.variable} ${anton.variable} h-full scroll-smooth antialiased`}
    >
      <body className="bg-bone text-ink selection:bg-blaze flex min-h-full flex-col font-sans selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
