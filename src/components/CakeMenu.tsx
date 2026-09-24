"use client";

import { useState } from "react";
import { Check, MessageSquare, Sparkles } from "lucide-react";
import { getSmsLink } from "@/constants/company";
import { CAKES } from "@/constants/catering";
import type { CakeFilterCategory } from "@/types";

/** Dessert & cake menu with pound/infusion filter tabs. Prerenders with every cake visible. */
export default function CakeMenu() {
  const [selectedCakeCategory, setSelectedCakeCategory] = useState<CakeFilterCategory>("all");

  const filteredCakes =
    selectedCakeCategory === "all" ? CAKES : CAKES.filter((c) => c.type === selectedCakeCategory);

  return (
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
            Freshly baked in bundt molds and individually packaged. Order one for family dessert or
            multiple for events.
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
              type="button"
              aria-pressed={selectedCakeCategory === tab.key}
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
        {filteredCakes.map((cake) => (
          <article
            key={cake.name}
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
                <p className="mt-2 text-xs leading-relaxed text-neutral-600">{cake.description}</p>
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
          </article>
        ))}
      </div>
    </section>
  );
}
