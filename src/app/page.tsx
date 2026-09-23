"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProductModal, { type Product } from "@/components/ProductModal";
import { COMPANY } from "@/constants/company";

const PRODUCTS: Product[] = [
  {
    id: "tee-flame",
    name: `${COMPANY.divisions.apparel} Signature Flame Tee`,
    category: "tees",
    categoryLabel: "T-Shirts",
    price: COMPANY.pricing.adultTee,
    youthPrice: COMPANY.pricing.youthTee,
    image: "/images/tshirt-flame.jpg",
    badge: "Most Popular",
    description:
      "Heavyweight 100% ring-spun cotton with ultra-crisp DTF flame graphics. Breathable, vibrant, and soft to the touch.",
    specs: [
      `Adult: ${COMPANY.pricing.adultTee}`,
      `Youth: ${COMPANY.pricing.youthTee}`,
      `Full-back print: ${COMPANY.pricing.fullBackAddon}`,
      "60+ wash durability",
    ],
  },
  {
    id: "hoodie-urban",
    name: "Urban Vanguard Heavyweight Hoodie",
    category: "hoodies",
    categoryLabel: "Hoodies",
    price: "$42.00",
    image: "/images/hoodie-urban.jpg",
    badge: "Streetwear Essential",
    description:
      "Ultra-thick 450 GSM fleece hoodie with double-needle stitching, metal eyelets, and premium full-color chest transfer.",
    specs: [
      "Oversized streetwear drape",
      "Full front pouch pocket",
      "Resists cracking & fading",
      "Sizes S to 4XL",
    ],
  },
  {
    id: "cap-flame",
    name: "Flame Crest Structured Snapback Cap",
    category: "caps",
    categoryLabel: "Caps & Hats",
    price: "$18.00",
    image: "/images/cap-flame.jpg",
    badge: "Classic Fit",
    description:
      "Structured 6-panel high-crown snapback cap featuring bold fiery heat-pressed emblem. Adjustable snap closure.",
    specs: ["One size fits all", "Reinforced crown", "Vibrant colors", "Matches signature tees"],
  },
  {
    id: "tee-reunion",
    name: "Custom Family Reunion & Party Event Shirts",
    category: "tees",
    categoryLabel: "T-Shirts",
    price: COMPANY.pricing.adultTee,
    youthPrice: COMPANY.pricing.youthTee,
    image: "/images/tshirt-price-list.jpg",
    badge: "Event Special",
    description:
      "Full custom group printing for family reunions, birthdays, team trips, and memorial celebrations with front & back options.",
    specs: [
      "Discount on 12+ pieces",
      "Photo collages & names",
      `Adult (${COMPANY.pricing.adultTee}) & Youth (${COMPANY.pricing.youthTee})`,
      "24hr art proof",
    ],
  },
  {
    id: "transfers-gang",
    name: "Custom DTF Gang Sheets & Transfers",
    category: "other",
    categoryLabel: "Transfers & Mugs",
    price: "$12.00 / ft",
    image: "/images/tshirt-flame.jpg",
    badge: "DIY Ready",
    description:
      "Ready-to-press Direct-to-Film transfer rolls. High ink density, cold or hot peel, ready for home heat press or iron.",
    specs: [
      "Commercial grade film",
      "No minimum size",
      "Stretchable soft-feel",
      "Same-day output available",
    ],
  },
  {
    id: "drinkware-mugs",
    name: "Custom UV-DTF Tumblers & Coffee Mugs",
    category: "other",
    categoryLabel: "Transfers & Mugs",
    price: "$16.00",
    image: "/images/cap-flame.jpg",
    badge: "Custom Gift",
    description:
      "Vibrant high-gloss UV-DTF transfers applied onto stainless steel tumblers or ceramic mugs. Water and fade resistant.",
    specs: [
      "Scratch resistant finish",
      "Full-wrap design support",
      "Custom names & logos",
      "Ideal party favor",
    ],
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<
    "all" | "tees" | "hoodies" | "caps" | "other"
  >("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts =
    activeCategory === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-bone text-ink">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-[#2e2a27] bg-[#141210] pt-12 pb-20 text-[#faf6ef] lg:pt-20 lg:pb-28">
        {/* Ambient Glow Effects */}
        <div className="pointer-events-none absolute top-0 right-0 -mt-20 -mr-40 h-[500px] w-[500px] rounded-full bg-[#ff5c1a]/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 -mb-20 -ml-32 h-[450px] w-[450px] rounded-full bg-[#8c2f1b]/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Left Column: Headlines & Value Props */}
            <div className="space-y-6 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ff5c1a]/40 bg-[#ff5c1a]/15 px-3 py-1 text-xs font-bold tracking-widest text-[#ff5c1a] uppercase">
                <span className="h-2 w-2 animate-ping rounded-full bg-[#ff5c1a]" />
                <span>{COMPANY.divisions.apparel.toUpperCase()} • DTF STUDIO</span>
              </div>

              <h1 className="font-[family-name:var(--font-anton)] text-4xl leading-[0.95] font-black tracking-tight text-white uppercase sm:text-6xl xl:text-7xl">
                YOUR ART, <br />
                <span className="bg-gradient-to-r from-[#ff5c1a] via-[#ff884d] to-[#ffa31a] bg-clip-text text-transparent">
                  PRESSED PERFECT.
                </span>
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-[#faf6ef]/80 sm:text-lg">
                Full-color custom DTF apparel printing on premium tees, hoodies, caps, bags, and
                drinkware. Local hand-pressed quality in Chicago with nationwide shipping. Soft-hand
                transfers that stretch, survive <strong className="text-white">60+ washes</strong>{" "}
                and never crack.
              </p>

              {/* Price Badges Pill */}
              <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
                  <span className="block text-xs tracking-wider text-[#faf6ef]/60 uppercase">
                    Adult Tees
                  </span>
                  <span className="font-[family-name:var(--font-anton)] text-2xl font-black text-[#ff5c1a]">
                    {COMPANY.pricing.adultTee}
                  </span>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
                  <span className="block text-xs tracking-wider text-[#faf6ef]/60 uppercase">
                    Youth Tees
                  </span>
                  <span className="font-[family-name:var(--font-anton)] text-2xl font-black text-[#ff5c1a]">
                    {COMPANY.pricing.youthTee}
                  </span>
                </div>
                <div className="col-span-2 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:col-span-1">
                  <span className="block text-xs tracking-wider text-[#faf6ef]/60 uppercase">
                    Full-Back Print
                  </span>
                  <span className="font-[family-name:var(--font-anton)] text-2xl font-black text-white">
                    {COMPANY.pricing.fullBackAddon}
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <a
                  href={COMPANY.contacts.phone.sms}
                  className="group flex items-center gap-2 rounded-xl bg-[#ff5c1a] px-7 py-4 text-sm font-bold tracking-wider text-white uppercase shadow-xl shadow-[#ff5c1a]/30 transition-all duration-200 hover:bg-[#ff7538]"
                >
                  <span>💬 Text Your Art to Order</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
                <Link
                  href="/contact"
                  className="rounded-xl border border-white/20 bg-white/10 px-7 py-4 text-sm font-bold tracking-wider text-white uppercase transition-all duration-200 hover:bg-white/15"
                >
                  Request Bulk Quote
                </Link>
              </div>

              {/* 4 Guarantees */}
              <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-6 text-xs text-[#faf6ef]/70 sm:grid-cols-4">
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-[#ff5c1a]">✦</span>
                  <span>No Minimums</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-[#ff5c1a]">✦</span>
                  <span>24-Hour Proofs</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-[#ff5c1a]">✦</span>
                  <span>60+ Wash Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-[#ff5c1a]">✦</span>
                  <span>Direct-To-Film (DTF)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="group relative rounded-3xl border border-[#2e2a27] bg-[#1e1c1a] p-5 shadow-2xl shadow-black/60">
                <div className="absolute top-8 left-8 z-10">
                  <span className="rounded-full bg-[#ff5c1a] px-3 py-1 text-xs font-bold tracking-wider text-white uppercase shadow">
                    Fresh Heat-Press Drop
                  </span>
                </div>
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-black/40">
                  <Image
                    src="/images/tshirt-flame.jpg"
                    alt="Designs by Hott Minds Signature Flame T-Shirt"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-[family-name:var(--font-anton)] text-xl font-bold text-white uppercase">
                      Signature Flame T-Shirt
                    </h3>
                    <p className="text-xs text-[#faf6ef]/70">
                      Adult {COMPANY.pricing.adultTee} • Youth {COMPANY.pricing.youthTee} • 100%
                      Heavy Cotton
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(PRODUCTS[0])}
                    className="rounded-lg bg-white/10 px-4 py-2 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#ff5c1a]"
                  >
                    Quick View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTINUOUS MARQUEE TICKER */}
      <div className="overflow-hidden border-y border-[#ff5c1a] bg-[#ff5c1a] py-3 text-white select-none">
        <div className="animate-marquee flex items-center gap-8 font-[family-name:var(--font-anton)] text-sm font-black tracking-widest whitespace-nowrap uppercase">
          <span>★ NO MINIMUMS ON APPAREL</span>
          <span>★ ADULT TEES {COMPANY.pricing.adultTee}</span>
          <span>★ YOUTH TEES {COMPANY.pricing.youthTee}</span>
          <span>★ FULL-BACK PRINTING {COMPANY.pricing.fullBackAddon}</span>
          <span>★ 24-HOUR ART PROOF</span>
          <span>★ 60+ WASH DURABILITY</span>
          <span>★ FAMILY REUNIONS & PARTIES</span>
          <span>★ HOODIES & CAPS</span>
          <span>★ TEXT {COMPANY.contacts.phone.display}</span>
          <span>★ {COMPANY.divisions.apparel.toUpperCase()}</span>
          <span>★ NO MINIMUMS ON APPAREL</span>
          <span>★ ADULT TEES {COMPANY.pricing.adultTee}</span>
          <span>★ YOUTH TEES {COMPANY.pricing.youthTee}</span>
          <span>★ FULL-BACK PRINTING {COMPANY.pricing.fullBackAddon}</span>
          <span>★ 24-HOUR ART PROOF</span>
          <span>★ 60+ WASH DURABILITY</span>
          <span>★ FAMILY REUNIONS & PARTIES</span>
          <span>★ HOODIES & CAPS</span>
          <span>★ TEXT {COMPANY.contacts.phone.display}</span>
          <span>★ {COMPANY.divisions.apparel.toUpperCase()}</span>
        </div>
      </div>

      {/* OFFICIAL PRICE LIST & FLYER HIGHLIGHT SECTION */}
      <section className="border-b border-[#e7ddd0] bg-[#f0e9dd] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#2e2a27] bg-[#141210] p-8 text-[#faf6ef] shadow-xl sm:p-12">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              {/* Left Column: Official Price Sheet Copy */}
              <div className="space-y-6 lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded bg-[#ff5c1a]/20 px-3 py-1 text-xs font-bold tracking-wider text-[#ff5c1a] uppercase">
                  Official Standard Price Sheet
                </div>
                <h2 className="font-[family-name:var(--font-anton)] text-3xl font-black text-white uppercase sm:text-5xl">
                  CLEAR PRICING. <br />
                  <span className="text-[#ff5c1a]">ZERO HIDDEN SETUP FEES.</span>
                </h2>
                <p className="text-sm leading-relaxed text-[#faf6ef]/75 sm:text-base">
                  We specialize in custom DTF heat-press printing for parties, family reunions,
                  school events, sports teams, and personal brands. DTF your shirts, bags, mugs, and
                  more!
                </p>

                {/* Price Table Card */}
                <div className="divide-y divide-[#2e2a27] rounded-2xl border border-[#2e2a27] bg-[#1e1c1a] p-5">
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <span className="font-[family-name:var(--font-anton)] text-base font-bold text-white uppercase sm:text-lg">
                        Adult T-Shirt
                      </span>
                      <p className="text-xs text-[#faf6ef]/60">
                        Heavyweight cotton, front print included
                      </p>
                    </div>
                    <span className="font-[family-name:var(--font-anton)] text-2xl font-black text-[#ff5c1a]">
                      {COMPANY.pricing.adultTee}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <span className="font-[family-name:var(--font-anton)] text-base font-bold text-white uppercase sm:text-lg">
                        Youth T-Shirt
                      </span>
                      <p className="text-xs text-[#faf6ef]/60">
                        Comfort-fit cotton for kids & youth sizes
                      </p>
                    </div>
                    <span className="font-[family-name:var(--font-anton)] text-2xl font-black text-[#ff5c1a]">
                      {COMPANY.pricing.youthTee}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <span className="font-[family-name:var(--font-anton)] text-base font-bold text-white uppercase sm:text-lg">
                        Full-Back Printing
                      </span>
                      <p className="text-xs text-[#faf6ef]/60">
                        Large rear graphic (price varies with image size)
                      </p>
                    </div>
                    <span className="font-[family-name:var(--font-anton)] text-2xl font-black text-[#ff884d]">
                      {COMPANY.pricing.fullBackAddon}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <span className="font-[family-name:var(--font-anton)] text-base font-bold text-white uppercase sm:text-lg">
                        Hoodies, Caps & Drinkware
                      </span>
                      <p className="text-xs text-[#faf6ef]/60">
                        Custom apparel & UV-DTF hard goods
                      </p>
                    </div>
                    <span className="text-sm font-bold text-white/80">Available by order</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-300">
                  <span>
                    📌 <strong>Important:</strong> Text orders and all pictures must be clear.{" "}
                    {COMPANY.operations.salesPolicyNotice}
                  </span>
                  <span className="font-bold text-white">{COMPANY.owners.combined}</span>
                </div>
              </div>

              {/* Right Column: Visual Mockup Card */}
              <div className="space-y-4 lg:col-span-5">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#2e2a27] bg-black/60 shadow-2xl">
                  <Image
                    src="/images/tshirt-price-list.jpg"
                    alt="Designs by Hott Minds Original T-Shirt Price List"
                    fill
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-contain p-4"
                  />
                </div>
                <p className="text-center text-xs text-[#faf6ef]/60">
                  Direct from our workshop flyer: DTF your shirts, bags, mugs & more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT CATALOG WITH FILTER TABS */}
      <section id="catalog" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mb-2 block text-xs font-bold tracking-widest text-[#ff5c1a] uppercase">
              Catalog & Apparel Showcase
            </span>
            <h2 className="text-ink font-[family-name:var(--font-anton)] text-3xl leading-none font-black uppercase sm:text-5xl">
              FEATURED APPAREL & GOODS
            </h2>
            <p className="mt-2 max-w-xl text-sm text-neutral-600">
              Order individual pieces with your custom artwork, or choose from our signature drops.
              We handle single prints and high-volume event orders.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[#e7ddd0] bg-[#e7ddd0]/60 p-1.5">
            {(
              [
                { key: "all", label: "All Items" },
                { key: "tees", label: "T-Shirts" },
                { key: "hoodies", label: "Hoodies" },
                { key: "caps", label: "Caps & Hats" },
                { key: "other", label: "Mugs & Transfers" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveCategory(tab.key)}
                className={`rounded-lg px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all duration-150 ${
                  activeCategory === tab.key
                    ? "bg-[#141210] text-white shadow-sm"
                    : "text-neutral-700 hover:bg-white/50 hover:text-black"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#e7ddd0] bg-white shadow-sm transition-all duration-300 hover:border-[#ff5c1a]/50 hover:shadow-xl"
            >
              {/* Product Image */}
              <div className="relative aspect-square w-full overflow-hidden bg-[#f6f2ea]">
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="rounded-full bg-[#141210] px-3 py-1 text-[11px] font-bold tracking-wider text-[#faf6ef] uppercase">
                      {product.badge}
                    </span>
                  </div>
                )}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Product Content */}
              <div className="flex flex-1 flex-col justify-between space-y-4 p-6">
                <div>
                  <span className="text-[11px] font-bold tracking-widest text-[#ff5c1a] uppercase">
                    {product.categoryLabel}
                  </span>
                  <h3 className="text-ink mt-1 font-[family-name:var(--font-anton)] text-xl font-bold uppercase transition-colors group-hover:text-[#ff5c1a]">
                    {product.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-neutral-600">
                    {product.description}
                  </p>
                </div>

                {/* Specs List */}
                <div className="space-y-1 border-t border-neutral-100 pt-2">
                  {product.specs.slice(0, 2).map((spec, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                      <span className="text-[#ff5c1a]">✓</span>
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between border-t border-neutral-100 pt-3">
                  <div>
                    <span className="block text-xs tracking-wider text-neutral-400 uppercase">
                      Price
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-ink font-[family-name:var(--font-anton)] text-2xl font-black">
                        {product.price}
                      </span>
                      {product.youthPrice && (
                        <span className="text-xs font-semibold text-neutral-500">
                          (Youth: {product.youthPrice})
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="rounded-lg bg-[#141210] px-4 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-sm transition-colors group-hover:bg-[#ff5c1a]"
                  >
                    Quick Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY DTF PRINTING SECTION */}
      <section className="border-t border-[#2e2a27] bg-[#141210] py-20 text-[#faf6ef]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="mb-2 block text-xs font-bold tracking-widest text-[#ff5c1a] uppercase">
              Next-Generation Print Technology
            </span>
            <h2 className="font-[family-name:var(--font-anton)] text-3xl font-black text-white uppercase sm:text-5xl">
              WHY DIRECT-TO-FILM (DTF) WINS
            </h2>
            <p className="mt-3 text-sm text-[#faf6ef]/70 sm:text-base">
              Traditional screen printing charges for every single color screen. Vinyl peels after
              two washes. DTF gives you photorealistic unlimited colors with lasting flexibility.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3 rounded-2xl border border-[#2e2a27] bg-[#1e1c1a] p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff5c1a]/20 text-xl font-black text-[#ff5c1a]">
                🎨
              </div>
              <h3 className="font-[family-name:var(--font-anton)] text-lg font-bold text-white uppercase">
                Unlimited Colors & Gradients
              </h3>
              <p className="text-xs leading-relaxed text-[#faf6ef]/70">
                Print photographs, neon highlights, complex flame gradients and detailed artwork
                without extra screen fees.
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-[#2e2a27] bg-[#1e1c1a] p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff5c1a]/20 text-xl font-black text-[#ff5c1a]">
                🛡️
              </div>
              <h3 className="font-[family-name:var(--font-anton)] text-lg font-bold text-white uppercase">
                60+ Wash Guarantee
              </h3>
              <p className="text-xs leading-relaxed text-[#faf6ef]/70">
                Industrial adhesive powder binds deep into fabric fibers. Does not crack, peel, or
                fade through heavy weekly laundry.
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-[#2e2a27] bg-[#1e1c1a] p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff5c1a]/20 text-xl font-black text-[#ff5c1a]">
                ✨
              </div>
              <h3 className="font-[family-name:var(--font-anton)] text-lg font-bold text-white uppercase">
                Soft-Hand Stretch Feel
              </h3>
              <p className="text-xs leading-relaxed text-[#faf6ef]/70">
                No stiff plastic bulletproof shields on your chest. Our transfers stretch with the
                fabric for breathable comfort.
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-[#2e2a27] bg-[#1e1c1a] p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff5c1a]/20 text-xl font-black text-[#ff5c1a]">
                ⚡
              </div>
              <h3 className="font-[family-name:var(--font-anton)] text-lg font-bold text-white uppercase">
                No Minimums Required
              </h3>
              <p className="text-xs leading-relaxed text-[#faf6ef]/70">
                Need just 1 birthday shirt or 100 reunion hoodies? You get the exact same premium
                attention and rapid turnaround.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4-STEP HOW IT WORKS */}
      <section className="bg-bone border-t border-[#e7ddd0] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="mb-2 block text-xs font-bold tracking-widest text-[#ff5c1a] uppercase">
              Simple & Straightforward
            </span>
            <h2 className="text-ink font-[family-name:var(--font-anton)] text-3xl font-black uppercase sm:text-5xl">
              HOW TO ORDER IN 4 STEPS
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              We make custom printing fast, accurate, and completely stress-free.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative rounded-2xl border border-[#e7ddd0] bg-white p-6 shadow-sm">
              <span className="mb-2 block font-[family-name:var(--font-anton)] text-4xl font-black text-[#ff5c1a]/30">
                01
              </span>
              <h3 className="text-ink mb-2 font-[family-name:var(--font-anton)] text-lg font-bold uppercase">
                Send Your Picture
              </h3>
              <p className="text-xs leading-relaxed text-neutral-600">
                Text your high-resolution picture, artwork, or sketch to{" "}
                <strong className="text-ink">{COMPANY.contacts.phone.plain}</strong> or email us.
                All pictures must be clear!
              </p>
            </div>

            <div className="relative rounded-2xl border border-[#e7ddd0] bg-white p-6 shadow-sm">
              <span className="mb-2 block font-[family-name:var(--font-anton)] text-4xl font-black text-[#ff5c1a]/30">
                02
              </span>
              <h3 className="text-ink mb-2 font-[family-name:var(--font-anton)] text-lg font-bold uppercase">
                Review Free Proof
              </h3>
              <p className="text-xs leading-relaxed text-neutral-600">
                We prepare a digital visual mockup showing exact sizing, print placement, and colors
                for your approval.
              </p>
            </div>

            <div className="relative rounded-2xl border border-[#e7ddd0] bg-white p-6 shadow-sm">
              <span className="mb-2 block font-[family-name:var(--font-anton)] text-4xl font-black text-[#ff5c1a]/30">
                03
              </span>
              <h3 className="text-ink mb-2 font-[family-name:var(--font-anton)] text-lg font-bold uppercase">
                Precision Heat-Press
              </h3>
              <p className="text-xs leading-relaxed text-neutral-600">
                Your garments are printed using high-density DTF inks and fused under commercial
                pneumatic heat-presses.
              </p>
            </div>

            <div className="relative rounded-2xl border border-[#e7ddd0] bg-white p-6 shadow-sm">
              <span className="mb-2 block font-[family-name:var(--font-anton)] text-4xl font-black text-[#ff5c1a]/30">
                04
              </span>
              <h3 className="text-ink mb-2 font-[family-name:var(--font-anton)] text-lg font-bold uppercase">
                Pickup or Delivery
              </h3>
              <p className="text-xs leading-relaxed text-neutral-600">
                Fast local Chicago pickup or doorstep shipment nationwide in time for your big event
                or reunion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CATERING CROSS-PROMO TEASER BANNER */}
      <section className="border-t border-[#2e2a27] bg-gradient-to-r from-[#1c4e4c] via-[#141210] to-[#8c2f1b] py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded bg-white/10 px-3 py-1 text-xs font-bold tracking-wider text-[#ffa31a] uppercase">
                🍰 {COMPANY.divisions.catering.toUpperCase()}
              </div>
              <h2 className="font-[family-name:var(--font-anton)] text-3xl font-black text-white uppercase sm:text-4xl">
                PLANNING A PARTY OR CELEBRATION? <br />
                <span className="text-[#ff9900]">WE COOK, YOU CELEBRATE.</span>
              </h2>
              <p className="text-sm leading-relaxed text-white/80">
                Pair your custom shirts with hot savory celebration food trays and our famous
                homemade Pound Cakes or gourmet Rum Infusion Cakes.{" "}
                <strong>
                  Orders over {COMPANY.pricing.cateringCakePromoThreshold} get a FREE cake!
                </strong>
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-4">
              <Link
                href="/services"
                className="rounded-xl bg-[#ff5c1a] px-7 py-4 text-sm font-bold tracking-wider text-white uppercase shadow-xl shadow-[#ff5c1a]/30 transition-all duration-200 hover:bg-[#ff7538]"
              >
                Explore Catering & Cake Menu →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK VIEW / ORDER MODAL (RADIX UI DIALOG) */}
      <ProductModal
        product={selectedProduct}
        open={Boolean(selectedProduct)}
        onOpenChange={(open) => {
          if (!open) setSelectedProduct(null);
        }}
      />
    </div>
  );
}
