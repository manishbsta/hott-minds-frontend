"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { COMPANY, getSmsLink } from "@/constants/company";
import type { CakeFilterCategory, CakeItem, SavoryFeastItem } from "@/types";

const CAKES: CakeItem[] = [
  // Pound Cakes
  {
    name: "Classic Lemon Pound Cake",
    type: "pound",
    flavor: "Lemon",
    description:
      "Tender, moist crumb bursting with fresh lemon zest and coated in our signature sweet citrus glaze.",
    tag: "Customer Favorite",
  },
  {
    name: "Rich Vanilla Bean Pound Cake",
    type: "pound",
    flavor: "Vanilla",
    description:
      "Old-fashioned golden crust with a fragrant, velvety vanilla crumb that melts in your mouth.",
    tag: "Traditional Classic",
  },
  {
    name: "Southern Golden Butter Pound Cake",
    type: "pound",
    flavor: "Butter",
    description:
      "Rich, dense, and baked with pure sweet cream butter. Perfectly crisp outer crust and buttery interior.",
  },
  {
    name: "Sweet Potato Pound Cake",
    type: "pound",
    flavor: "Sweet Potato",
    description:
      "Infused with roasted sweet potatoes, warm cinnamon, nutmeg, and drizzled with a light spiced glaze.",
    tag: "Soul Food Specialty",
  },
  // Infusion Cakes
  {
    name: "Hennessy Rum Infusion Cake",
    type: "infusion",
    flavor: "Hennessy & Aged Rum",
    description:
      "Slow-baked bundt soaked with a premium Hennessy reduction, aged rum syrup, and caramelized pecan crumb.",
    tag: "Adult Signature",
    notes: "Infusion Cake",
  },
  {
    name: "Caribbean Coffee Rum Cake",
    type: "infusion",
    flavor: "Caribbean Coffee Rum",
    description:
      "Deep espresso and Jamaican dark rum fusion, glazed with dark sugar and coffee liqueur drizzle.",
    tag: "Deep & Bold",
    notes: "Infusion Cake",
  },
  {
    name: "Midnight Mocha Rum Cake",
    type: "infusion",
    flavor: "Midnight Mocha Rum",
    description:
      "Dutch cocoa fudge crumb soaked in dark mocha rum syrup, finished with chocolate ganache drops.",
    tag: "Decadent Chocolate",
    notes: "Infusion Cake",
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
      <section className="relative overflow-hidden border-b border-[#2e2a27] bg-[#141210] pt-12 pb-20 text-[#faf6ef] lg:pt-20 lg:pb-28">
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute top-0 right-0 -mt-20 -mr-32 h-[550px] w-[550px] rounded-full bg-[#8c2f1b]/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 -mb-20 -ml-32 h-[450px] w-[450px] rounded-full bg-[#ff5c1a]/15 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Left Column */}
            <div className="space-y-6 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ff5c1a]/40 bg-[#ff5c1a]/15 px-3 py-1 text-xs font-bold tracking-widest text-[#ff5c1a] uppercase">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#ff5c1a]" />
                <span>{COMPANY.divisions.catering.toUpperCase()}</span>
              </div>

              <h1 className="font-[family-name:var(--font-anton)] text-4xl leading-[0.95] font-black tracking-tight text-white uppercase sm:text-6xl xl:text-7xl">
                WE COOK, <br />
                <span className="bg-gradient-to-r from-[#ff5c1a] via-[#ff9900] to-[#ffd24d] bg-clip-text text-transparent">
                  YOU CELEBRATE.
                </span>
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-[#faf6ef]/85 sm:text-lg">
                Catering for your day made easy — whether you need full savory celebration feast
                trays or homemade desserts and rum infusion cakes. For birthdays, reunions, parties,
                repasts, and celebrations.
              </p>

              {/* Special Promotion Highlight Callout */}
              <div className="space-y-2 rounded-2xl border-2 border-[#ff5c1a]/50 bg-gradient-to-r from-[#ff5c1a]/20 via-[#8c2f1b]/30 to-[#1e1c1a] p-5 shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎉</span>
                  <span className="font-[family-name:var(--font-anton)] text-base font-bold tracking-wide text-white uppercase sm:text-lg">
                    SPECIAL OFFER: ORDERS OVER {COMPANY.pricing.cateringCakePromoThreshold} GET A
                    FREE CAKE!
                  </span>
                </div>
                <p className="text-xs text-[#faf6ef]/80">
                  Qualifying catering orders receive a free whole homemade Pound Cake of your
                  choice!{" "}
                  <strong className="font-bold text-[#ff5c1a] uppercase">
                    (Excludes Infusion Cakes)
                  </strong>
                  .
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={getSmsLink(
                    `Hi ${COMPANY.owners.combined}, I would like to inquire about ${COMPANY.divisions.catering} services`
                  )}
                  className="flex items-center gap-2 rounded-xl bg-[#ff5c1a] px-7 py-4 text-sm font-bold tracking-wider text-white uppercase shadow-xl shadow-[#ff5c1a]/30 transition-all duration-200 hover:bg-[#ff7538]"
                >
                  <span>💬 Text to Order: {COMPANY.contacts.phone.display}</span>
                </a>
                <Link
                  href="/contact"
                  className="rounded-xl border border-white/20 bg-white/10 px-7 py-4 text-sm font-bold tracking-wider text-white uppercase transition-all duration-200 hover:bg-white/15"
                >
                  Book Event Catering
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative space-y-4 rounded-3xl border border-[#2e2a27] bg-[#1e1c1a] p-5 shadow-2xl">
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-black/40">
                  <Image
                    src="/images/infusion-cake.jpg"
                    alt="H.M.I Gourmet Caribbean Rum Infusion Cake"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />

                  <div className="absolute right-4 bottom-4 left-4 rounded-xl border border-white/15 bg-[#141210]/85 p-3 text-white backdrop-blur-md">
                    <span className="block text-[10px] font-bold tracking-wider text-[#ff5c1a] uppercase">
                      Signature Dessert
                    </span>
                    <span className="font-[family-name:var(--font-anton)] text-sm font-bold uppercase">
                      Gourmet Hennessy & Rum Infusion Cakes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLYER MENU DISPLAY & DESSERT SHOWCASE */}
      <section className="border-b border-[#e7ddd0] bg-[#f0e9dd] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Authentic Flyer Plate Image */}
            <div className="flex flex-col items-center lg:col-span-5">
              <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-3xl border border-[#e7ddd0] bg-white p-4 shadow-2xl">
                <Image
                  src="/images/catering-flyer.jpg"
                  alt="Hott Meals Instantly Catering Plate Flyer"
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-contain"
                />
              </div>
              <p className="mt-3 text-center text-xs text-neutral-500">
                Original Hott Meals Instantly (H.M.I) Plate Flyer
              </p>
            </div>

            {/* Flyer Details & Menu Breakdown */}
            <div className="space-y-6 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded bg-[#ff5c1a]/15 px-3 py-1 text-xs font-bold tracking-wider text-[#8c2f1b] uppercase">
                Homemade From Scratch With Love
              </div>

              <h2 className="text-ink font-[family-name:var(--font-anton)] text-3xl leading-none font-black uppercase sm:text-5xl">
                POUND CAKES & INFUSION CAKES
              </h2>

              <p className="text-sm leading-relaxed text-neutral-700 sm:text-base">
                Every cake is made fresh to order with pure butter, real eggs, and premium
                ingredients. Perfect as centerpiece desserts for family dinners, birthdays,
                holidays, or bundled with our party catering pans.
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Pound Cakes Box */}
                <div className="space-y-3 rounded-2xl border border-[#e7ddd0] bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-ink font-[family-name:var(--font-anton)] text-lg font-bold uppercase">
                      Pound Cakes
                    </span>
                    <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
                      Eligible for {COMPANY.pricing.cateringCakePromoThreshold}+ Deal
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-xs font-medium text-neutral-600">
                    <li className="flex items-center gap-2">
                      <span className="text-[#ff5c1a]">●</span> Lemon Pound Cake
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#ff5c1a]">●</span> Rich Vanilla Pound Cake
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#ff5c1a]">●</span> Southern Butter Pound Cake
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#ff5c1a]">●</span> Spiced Sweet Potato Pound Cake
                    </li>
                  </ul>
                </div>

                {/* Infusion Cakes Box */}
                <div className="space-y-3 rounded-2xl border border-[#e7ddd0] bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-[family-name:var(--font-anton)] text-lg font-bold text-[#8c2f1b] uppercase">
                      Infusion Cakes
                    </span>
                    <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-900">
                      Adult Specialty
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-xs font-medium text-neutral-600">
                    <li className="flex items-center gap-2">
                      <span className="text-[#8c2f1b]">●</span> Hennessy Rum Infusion
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#8c2f1b]">●</span> Caribbean Coffee Rum Infusion
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#8c2f1b]">●</span> Midnight Mocha Rum Infusion
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-neutral-400">●</span> Plus Cookies & Fudge Brownies
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={getSmsLink(
                    `Hi, I would like to order a cake from ${COMPANY.divisions.catering}`
                  )}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#8c2f1b] transition-colors hover:text-[#ff5c1a]"
                >
                  <span>Text {COMPANY.contacts.phone.display} to order your cakes</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED CAKE FLAVOR CARDS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mb-2 block text-xs font-bold tracking-widest text-[#ff5c1a] uppercase">
              Baked Fresh to Order
            </span>
            <h2 className="text-ink font-[family-name:var(--font-anton)] text-3xl leading-none font-black uppercase sm:text-5xl">
              DESSERT & CAKE MENU
            </h2>
            <p className="mt-2 max-w-xl text-sm text-neutral-600">
              Freshly baked in bundt molds and individually packaged. Order one for family dessert
              or multiple for events.
            </p>
          </div>

          {/* Filter Tabs */}
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCakes.map((cake, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-between space-y-4 rounded-2xl border bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-lg ${
                cake.type === "infusion" ? "border-amber-300/80 bg-amber-50/20" : "border-[#e7ddd0]"
              }`}
            >
              <div>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span
                    className={`rounded px-2.5 py-0.5 text-[11px] font-bold tracking-wider uppercase ${
                      cake.type === "infusion"
                        ? "bg-[#8c2f1b] text-white"
                        : "bg-[#ff5c1a]/15 text-[#ff5c1a]"
                    }`}
                  >
                    {cake.type === "infusion" ? "Gourmet Infusion" : "Classic Pound Cake"}
                  </span>
                  {cake.tag && (
                    <span className="text-[10px] font-semibold text-neutral-500 uppercase">
                      {cake.tag}
                    </span>
                  )}
                </div>

                <h3 className="text-ink mt-2 font-[family-name:var(--font-anton)] text-xl font-bold uppercase">
                  {cake.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-600">{cake.description}</p>
              </div>

              <div className="flex items-center justify-between border-t border-neutral-100 pt-4">
                <span className="text-xs font-medium text-neutral-500">Whole Cake</span>
                <a
                  href={getSmsLink(`Hi, I would like to order the ${cake.name}`)}
                  className="rounded-lg bg-[#141210] px-4 py-2 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#ff5c1a]"
                >
                  Text to Order
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SAVORY CELEBRATION FEAST CATERING */}
      <section className="border-t border-[#2e2a27] bg-[#141210] py-20 text-[#faf6ef]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Visual Buffet Feast Photo */}
            <div className="order-2 lg:order-1 lg:col-span-5">
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-[#2e2a27] bg-[#1e1c1a] shadow-2xl">
                <Image
                  src="/images/catering-buffet.jpg"
                  alt="H.M.I Savory Event Catering Buffet Feast"
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute right-6 bottom-6 left-6">
                  <span className="mb-1 block text-xs font-bold text-[#ff5c1a] uppercase">
                    Hot Party Pans
                  </span>
                  <h4 className="font-[family-name:var(--font-anton)] text-2xl font-bold text-white uppercase">
                    SAVORY CELEBRATION MEALS
                  </h4>
                  <p className="mt-1 text-xs text-[#faf6ef]/80">
                    Delivered piping hot and ready to serve your guests.
                  </p>
                </div>
              </div>
            </div>

            {/* Menu List */}
            <div className="order-1 space-y-6 lg:order-2 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded bg-[#ff5c1a]/20 px-3 py-1 text-xs font-bold tracking-wider text-[#ff5c1a] uppercase">
                Full-Service Event Catering
              </div>

              <h2 className="font-[family-name:var(--font-anton)] text-3xl leading-none font-black text-white uppercase sm:text-5xl">
                HOT MEALS FOR REUNIONS & PARTIES
              </h2>

              <p className="text-sm leading-relaxed text-[#faf6ef]/75 sm:text-base">
                Take the stress out of hosting. We prepare hearty, flavorful party pans seasoned to
                perfection. Combine your custom event t-shirts and meal catering in one seamless
                package.
              </p>

              <div className="space-y-3">
                {SAVORY_FEASTS.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col justify-between gap-3 rounded-xl border border-[#2e2a27] bg-[#1e1c1a] p-4 sm:flex-row sm:items-center"
                  >
                    <div>
                      <h4 className="font-[family-name:var(--font-anton)] text-base font-bold text-white uppercase">
                        {item.title}
                      </h4>
                      <p className="mt-0.5 text-xs text-[#faf6ef]/70">{item.desc}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#ff5c1a]">
                      {item.serves}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href={COMPANY.contacts.phone.tel}
                  className="rounded-xl bg-[#ff5c1a] px-6 py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-[#ff5c1a]/25 transition-all duration-200 hover:bg-[#ff7538]"
                >
                  Call {COMPANY.contacts.phone.display} for Menu Customization
                </a>
                <Link
                  href="/contact"
                  className="rounded-xl border border-white/15 bg-white/10 px-6 py-3.5 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-white/20"
                >
                  Request Catering Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMBINED EVENT PACKAGES (SHIRTS + CATERING) */}
      <section className="bg-bone border-t border-[#e7ddd0] py-20">
        <div className="mx-auto max-w-7xl space-y-6 px-4 text-center sm:px-6 lg:px-8">
          <span className="block text-xs font-bold tracking-widest text-[#ff5c1a] uppercase">
            The Ultimate Event Solution
          </span>
          <h2 className="text-ink font-[family-name:var(--font-anton)] text-3xl font-black uppercase sm:text-5xl">
            CUSTOM SHIRTS + CATERING FEAST BUNDLE
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-neutral-600 sm:text-base">
            Hosting a family reunion, birthday milestone, graduation, or corporate gathering? Get
            matching custom front-and-back t-shirts plus hot buffet catering all under one roof.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/"
              className="rounded-xl bg-[#141210] px-6 py-3 text-xs font-bold tracking-wider text-white uppercase hover:bg-black"
            >
              Browse T-Shirt Catalog ({COMPANY.pricing.adultTee} / {COMPANY.pricing.youthTee})
            </Link>
            <Link
              href="/contact"
              className="rounded-xl bg-[#ff5c1a] px-6 py-3 text-xs font-bold tracking-wider text-white uppercase hover:bg-[#ff7538]"
            >
              Get Custom Event Package Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
