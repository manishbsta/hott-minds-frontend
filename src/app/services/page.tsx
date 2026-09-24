"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Gift,
  Sparkles,
  Utensils,
  Phone,
  MessageSquare,
  FileText,
  Check,
  Award,
  Layers,
  Flame,
  Shirt,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import Testimonials from "@/components/Testimonials";
import { COMPANY, getSmsLink } from "@/constants/company";
import { CATERING_TESTIMONIALS } from "@/constants/testimonials";
import type { CakeFilterCategory, CakeItem, SavoryFeastItem } from "@/types";

const CAKES: CakeItem[] = [
  // Pound Cakes
  {
    name: "Classic Lemon Pound Cake",
    type: "pound",
    description:
      "Tender, moist crumb bursting with fresh lemon zest and coated in our signature sweet citrus glaze.",
  },
  {
    name: "Rich Vanilla Bean Pound Cake",
    type: "pound",
    description:
      "Old-fashioned golden crust with a fragrant, velvety vanilla crumb that melts in your mouth.",
  },
  {
    name: "Southern Golden Butter Pound Cake",
    type: "pound",
    description:
      "Rich, dense, and baked with pure sweet cream butter. Perfectly crisp outer crust and buttery interior.",
  },
  {
    name: "Sweet Potato Pound Cake",
    type: "pound",
    description:
      "Infused with roasted sweet potatoes, warm cinnamon, nutmeg, and drizzled with a light spiced glaze.",
  },
  // Infusion Cakes
  {
    name: "Hennessy Rum Infusion Cake",
    type: "infusion",
    description:
      "Slow-baked bundt soaked with a premium Hennessy reduction, aged rum syrup, and caramelized pecan crumb.",
  },
  {
    name: "Caribbean Coffee Rum Cake",
    type: "infusion",
    description:
      "Deep espresso and Jamaican dark rum fusion, glazed with dark sugar and coffee liqueur drizzle.",
  },
  {
    name: "Midnight Mocha Rum Cake",
    type: "infusion",
    description:
      "Dutch cocoa fudge crumb soaked in dark mocha rum syrup, finished with chocolate ganache drops.",
  },
];

const SAVORY_FEASTS: SavoryFeastItem[] = [
  {
    title: "Savory Grilled & BBQ Chicken",
    desc: "Slow-marinated chicken quarters or wings fire-grilled and brushed with house sweet & tangy barbecue glaze.",
    serves: "Half Pan (10-12 guests) / Full Pan (20-25 guests)",
  },
  {
    title: "Smoked Tender Barbecue Ribs",
    desc: "Fall-off-the-bone smoked pork ribs seasoned with our secret dry rub and caramelized under open flame.",
    serves: "Half Pan / Full Pan",
  },
  {
    title: "Southern Baked Mac & Cheese",
    desc: "Four cheeses melted into creamy elbow pasta with a golden baked cheddar crust on top.",
    serves: "Half Pan / Full Pan",
  },
  {
    title: "Country Green Beans & Collard Greens",
    desc: "Slow-simmered greens seasoned with smoked turkey, garlic, onions, and flavorful broth.",
    serves: "Half Pan / Full Pan",
  },
  {
    title: "Golden Sweet Cornbread & Potato Salad",
    desc: "Fresh baked honey-butter cornbread squares served alongside our homemade creamy mustard-potato salad.",
    serves: "By the dozen / Pan",
  },
];

export default function ServicesPage() {
  const [selectedCakeCategory, setSelectedCakeCategory] = useState<CakeFilterCategory>("all");

  const filteredCakes =
    selectedCakeCategory === "all" ? CAKES : CAKES.filter((c) => c.type === selectedCakeCategory);

  return (
    <div className="bg-bone text-ink">
      {/* HERO SECTION */}
      <PageHero
        eyebrow={`${COMPANY.divisions.catering} · Catering`}
        titleLine1="We cook,"
        titleLine2="You"
        titleAccent="Celebrate."
        intro="Catering for your day made easy — whether you need full savory celebration feast trays or homemade desserts and rum infusion cakes. For birthdays, reunions, parties, repasts, and celebrations."
        note={{
          label: "Special offer",
          text: `Orders over ${COMPANY.pricing.cateringCakePromoThreshold} get a free whole pound cake ($25+ value) — Lemon, Vanilla, Butter, or Sweet Potato. Excludes infusion cakes.`,
        }}
        primaryCta={{
          label: "Text to Order",
          href: getSmsLink(
            `Hi ${COMPANY.owners.combined}, I would like to inquire about ${COMPANY.divisions.catering} services`
          ),
        }}
        secondaryCta={{ label: "Book Event Catering", href: "/contact?service=catering" }}
        stats={[
          { label: "Made to order", value: "Fresh" },
          { label: "Pure butter", value: "100%" },
          { label: "Pan sizes", value: "Half & Full" },
          { label: "Guests per pan", value: "10-25" },
        ]}
        showcase={{
          image: "/images/infusion-cake.jpg",
          alt: "H.M.I Gourmet Caribbean Rum Infusion Cake",
          title: "Rum Infusion Cakes",
          subtitle: "Hennessy & Aged Rum Reduction · Bundt Pans",
          action: {
            label: "Order",
            href: getSmsLink("Hi, I would like to order a Rum Infusion Cake"),
          },
        }}
      />

      {/* CONTINUOUS MARQUEE TICKER - exact parity with Home Page */}
      <div className="overflow-hidden border-y border-[#ff5c1a] bg-[#ff5c1a] py-3 text-white select-none">
        <div className="animate-marquee font-display flex items-center gap-8 text-sm tracking-widest whitespace-nowrap uppercase">
          <span>HOMEMADE POUND CAKES</span>
          <span>/</span>
          <span>RUM INFUSION CAKES</span>
          <span>/</span>
          <span>HOT PARTY BUFFET PANS</span>
          <span>/</span>
          <span>FREE CAKE ON $200+ ORDERS</span>
          <span>/</span>
          <span>BBQ CHICKEN &amp; RIBS</span>
          <span>/</span>
          <span>HOMEMADE POUND CAKES</span>
          <span>/</span>
          <span>RUM INFUSION CAKES</span>
          <span>/</span>
          <span>HOT PARTY BUFFET PANS</span>
          <span>/</span>
          <span>FREE CAKE ON $200+ ORDERS</span>
          <span>/</span>
          <span>BBQ CHICKEN &amp; RIBS</span>
          <span>/</span>
        </div>
      </div>

      {/* CATERING MENU & FLYER HIGHLIGHT SECTION - exact parity with Home Page Price Sheet */}
      <section
        id="catering-menu"
        className="scroll-mt-(--header-height) border-b border-[#e7ddd0] bg-[#f0e9dd] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#2e2a27] bg-[#141210] p-8 text-[#faf6ef] sm:p-12">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              {/* Left Column: Menu Copy & Table */}
              <div className="space-y-6 lg:col-span-7">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#ff5c1a]/30 bg-[#ff5c1a]/10 px-3.5 py-1 text-xs font-bold tracking-wider text-[#ff5c1a] uppercase">
                  <FileText className="h-3.5 w-3.5 text-[#ff5c1a]" />
                  <span>Official Catering Menu &amp; Terms</span>
                </span>
                <h2 className="font-display text-3xl leading-none text-white uppercase sm:text-5xl">
                  HOMEMADE MEALS. <br />
                  <span className="text-[#ff5c1a]">SCRATCH-BAKED CAKES.</span>
                </h2>
                <p className="text-sm leading-relaxed text-[#faf6ef]/75 sm:text-base">
                  Authentic Southern recipes, pure sweet cream butter, and generous party portions
                  prepared fresh to order for family dinners, reunions, birthdays, and celebrations.
                </p>

                {/* Menu Table Card - matches Home Page price table */}
                <div className="divide-y divide-[#2e2a27] rounded-2xl border border-[#2e2a27] bg-[#1e1c1a] p-5">
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <span className="font-display text-base text-white uppercase sm:text-lg">
                        Homemade Pound Cakes
                      </span>
                      <p className="text-xs text-[#faf6ef]/60">
                        Lemon, Vanilla, Butter, or Sweet Potato bundt cakes
                      </p>
                    </div>
                    <span className="text-xs font-bold text-white/80">
                      Free on {COMPANY.pricing.cateringCakePromoThreshold}+ Orders
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <span className="font-display text-base text-white uppercase sm:text-lg">
                        Gourmet Infusion Cakes
                      </span>
                      <p className="text-xs text-[#faf6ef]/60">
                        Hennessy, Caribbean Coffee, or Midnight Mocha Rum bundt
                      </p>
                    </div>
                    <span className="text-xs font-bold text-white/80">Available by order</span>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <span className="font-display text-base text-white uppercase sm:text-lg">
                        Savory BBQ Chicken &amp; Ribs
                      </span>
                      <p className="text-xs text-[#faf6ef]/60">
                        Slow-smoked fire-grilled chicken quarters &amp; tender ribs
                      </p>
                    </div>
                    <span className="text-xs font-bold text-white/80">Half &amp; Full Pans</span>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <span className="font-display text-base text-white uppercase sm:text-lg">
                        Southern Sides &amp; Breads
                      </span>
                      <p className="text-xs text-[#faf6ef]/60">
                        Baked Mac &amp; Cheese, Country Greens, Cornbread &amp; Potato Salad
                      </p>
                    </div>
                    <span className="text-xs font-bold text-white/80">Half &amp; Full Pans</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#ff5c1a]/40 bg-gradient-to-r from-[#ff5c1a]/15 via-amber-500/10 to-transparent p-4 text-xs text-amber-200">
                  <div className="flex items-center gap-2.5">
                    <Gift className="h-5 w-5 shrink-0 text-[#ff5c1a]" />
                    <span>
                      <strong className="text-white">Catering Perk:</strong> Spend{" "}
                      <span className="font-bold text-[#ff5c1a]">
                        {COMPANY.pricing.cateringCakePromoThreshold}
                      </span>{" "}
                      or more on catering party pans and receive 1 FREE whole homemade Pound Cake!
                      (Excludes infusion cakes).
                    </span>
                  </div>
                  <span className="font-bold text-white/90">{COMPANY.owners.combined}</span>
                </div>
              </div>

              {/* Right Column: Visual Flyer Card - matches Home Page official price sheet card */}
              <div className="space-y-4 lg:col-span-5">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[#2e2a27] bg-[#1e1c1a]">
                  <Image
                    src="/images/catering-flyer.jpg"
                    alt="Hott Meals Instantly (H.M.I) Catering Plate Flyer"
                    fill
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-contain"
                  />
                </div>
                <p className="text-center text-xs text-[#faf6ef]/60">
                  Original Hott Meals Instantly (H.M.I) Plate Flyer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DESSERT & CAKE MENU - exact parity with Home Page Catalog */}
      <section
        id="cakes"
        className="mx-auto max-w-7xl scroll-mt-(--header-height) px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-neutral-300 bg-neutral-100 px-3 py-1 text-[11px] font-bold tracking-wider text-neutral-700 uppercase">
              <Sparkles className="h-3.5 w-3.5 text-[#ff5c1a]" />
              <span>Scratch Bakery &amp; Infusions</span>
            </span>
            <h2 className="text-ink font-display mt-2 text-3xl leading-none uppercase sm:text-5xl">
              DESSERT &amp; CAKE MENU
            </h2>
            <p className="mt-2 max-w-xl text-sm text-neutral-600">
              Freshly baked in bundt molds and individually packaged. Order one for family dessert
              or multiple for events.
            </p>
          </div>

          {/* Filter Tabs - exact parity with Home Page filter tabs */}
          <div className="flex items-center gap-2 rounded-xl border border-[#e7ddd0] bg-[#e7ddd0]/60 p-1.5">
            {(
              [
                { key: "all", label: "All Cakes" },
                { key: "pound", label: "Pound Cakes" },
                { key: "infusion", label: "Infusion Cakes" },
              ] as const satisfies readonly { key: CakeFilterCategory; label: string }[]
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedCakeCategory(tab.key)}
                className={`rounded-lg px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all duration-150 ${
                  selectedCakeCategory === tab.key
                    ? "bg-[#141210] text-white shadow-sm"
                    : "text-neutral-700 hover:bg-white/50 hover:text-black"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cake Cards Grid - matches Home Page product card architecture */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCakes.map((cake, idx) => (
            <div
              key={idx}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#e7ddd0] bg-white transition-colors duration-200 hover:border-neutral-400"
            >
              <div className="flex flex-1 flex-col justify-between space-y-4 p-6">
                <div>
                  <div className="mb-2.5 flex items-center justify-between">
                    <span
                      className={`inline-flex w-fit items-center rounded-md px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase ${
                        cake.type === "infusion"
                          ? "border border-amber-900/20 bg-amber-900/10 text-amber-900"
                          : "border border-neutral-200 bg-neutral-100 text-neutral-700"
                      }`}
                    >
                      {cake.type === "infusion" ? "Gourmet Rum Infusion" : "Classic Pound Cake"}
                    </span>
                  </div>
                  <h3 className="text-ink font-display text-xl uppercase">{cake.name}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                    {cake.description}
                  </p>
                </div>

                {/* Specs List with checkmarks - matches Home Page */}
                <div className="space-y-1.5 border-t border-neutral-100 pt-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                    <Check className="h-3.5 w-3.5 shrink-0 text-[#ff5c1a]" />
                    <span>100% pure sweet cream butter &amp; real eggs</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                    <Check className="h-3.5 w-3.5 shrink-0 text-[#ff5c1a]" />
                    <span>
                      {cake.type === "infusion"
                        ? "Gourmet slow-soaked rum infusion"
                        : "Eligible for free cake on $200+ catering"}
                    </span>
                  </div>
                </div>

                {/* Footer with Serving & Action Button - matches Home Page */}
                <div className="flex items-center justify-between border-t border-neutral-100 pt-3">
                  <div>
                    <span className="block text-xs tracking-wider text-neutral-400 uppercase">
                      Serving
                    </span>
                    <span className="text-ink font-display text-xl">Whole Cake</span>
                  </div>

                  <a
                    href={getSmsLink(`Hi, I would like to order the ${cake.name}`)}
                    className="flex items-center gap-1.5 rounded-lg bg-[#141210] px-4 py-2.5 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#ff5c1a]"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>Text to Order</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SAVORY CELEBRATION FEAST CATERING - matches Why DTF dark cards on Home Page */}
      <section className="border-t border-[#2e2a27] bg-[#141210] py-20 text-[#faf6ef]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-bold tracking-wider text-[#ff5c1a] uppercase">
              <Utensils className="h-3.5 w-3.5 text-[#ff5c1a]" />
              <span>Hot Party Buffet Pans</span>
            </span>
            <h2 className="font-display mt-3 text-3xl leading-none text-white uppercase sm:text-5xl">
              HOT MEALS FOR <span className="text-[#ff5c1a]">REUNIONS &amp; PARTIES</span>
            </h2>
            <p className="mt-3 text-sm text-[#faf6ef]/70 sm:text-base">
              Take the stress out of hosting. We prepare hearty, flavorful party pans seasoned to
              perfection and delivered piping hot for your guests.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SAVORY_FEASTS.map((item, i) => (
              <div
                key={i}
                className="flex flex-col justify-between space-y-3 rounded-2xl border border-[#2e2a27] bg-[#1e1c1a] p-6"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#ff5c1a]/30 bg-[#ff5c1a]/15 text-[#ff5c1a]">
                      {i === 0 ? (
                        <Flame className="h-5 w-5" />
                      ) : i === 1 ? (
                        <Utensils className="h-5 w-5" />
                      ) : i === 2 ? (
                        <Award className="h-5 w-5" />
                      ) : i === 3 ? (
                        <Layers className="h-5 w-5" />
                      ) : (
                        <Sparkles className="h-5 w-5" />
                      )}
                    </div>
                    <span className="inline-flex w-fit items-center rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-bold tracking-wider text-white/80 uppercase">
                      Party Pan
                    </span>
                  </div>
                  <h3 className="font-display mt-3 text-lg text-white uppercase">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#faf6ef]/70">{item.desc}</p>
                </div>
                <div className="border-t border-[#2e2a27] pt-2 text-xs font-semibold text-[#ff5c1a]">
                  {item.serves}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a
              href={COMPANY.contacts.phone.tel}
              className="flex items-center gap-2 rounded-xl bg-[#ff5c1a] px-6 py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-[#ff5c1a]/20 transition-all duration-200 hover:bg-[#ff7538] hover:shadow-[#ff5c1a]/35"
            >
              <Phone className="h-4 w-4" />
              <span>Call {COMPANY.contacts.phone.display} for Menu Customization</span>
            </a>
            <Link
              href="/contact?service=catering"
              className="flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-white/10"
            >
              <FileText className="h-4 w-4 text-white/70" />
              <span>Request Catering Quote</span>
            </Link>
          </div>
        </div>
      </section>

      {/* COMBINED EVENT PACKAGES (SHIRTS + CATERING) - matches Home Page bottom CTA */}
      <section className="bg-bone border-t border-[#e7ddd0] py-20">
        <div className="mx-auto max-w-7xl space-y-6 px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-neutral-300 bg-neutral-100 px-3 py-1 text-[11px] font-bold tracking-wider text-neutral-700 uppercase">
            <Sparkles className="h-3.5 w-3.5 text-[#ff5c1a]" />
            <span>Complete Event Solutions</span>
          </span>
          <h2 className="text-ink font-display text-3xl leading-none uppercase sm:text-5xl">
            CUSTOM SHIRTS + CATERING FEAST BUNDLE
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-neutral-600 sm:text-base">
            Hosting a family reunion, birthday milestone, graduation, or corporate gathering? Get
            matching custom front-and-back shirts plus hot buffet catering all under one roof.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-xl bg-[#141210] px-6 py-3 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-black"
            >
              <Shirt className="h-4 w-4" />
              <span>Browse Shirts Catalog</span>
            </Link>
            <Link
              href="/contact?service=both"
              className="flex items-center gap-2 rounded-xl bg-[#ff5c1a] px-6 py-3 text-xs font-bold tracking-wider text-white uppercase shadow-md shadow-[#ff5c1a]/20 transition-colors hover:bg-[#ff7538]"
            >
              <Sparkles className="h-4 w-4" />
              <span>Get Custom Event Package Quote</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CUSTOMER TESTIMONIALS */}
      <Testimonials
        eyebrow="Customer reviews"
        titleLine1="Straight from"
        titleLine2="our customers."
        testimonials={CATERING_TESTIMONIALS}
      />
    </div>
  );
}
