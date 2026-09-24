"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Check, ShoppingBag, Sparkles } from "lucide-react";
import { QuickViewButton } from "@/components/QuickView";
import { PRODUCTS } from "@/constants/products";
import type { ProductFilterCategory } from "@/types";

const CATALOG_TABS = [
  { key: "all", label: "All Items" },
  { key: "shirts", label: "Shirts" },
  { key: "hoodies", label: "Hoodies" },
  { key: "caps", label: "Caps" },
  { key: "mugs", label: "Mugs" },
] as const satisfies readonly { key: ProductFilterCategory; label: string }[];

interface CatalogGridProps {
  activeCategory: ProductFilterCategory;
  onCategoryChange: (category: ProductFilterCategory) => void;
}

function CatalogGrid({ activeCategory, onCategoryChange }: CatalogGridProps) {
  const filteredProducts =
    activeCategory === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section
      id="catalog"
      className="mx-auto max-w-7xl scroll-mt-(--header-height) px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-neutral-300 bg-neutral-100 px-3 py-1 text-[11px] font-bold tracking-wider text-neutral-700 uppercase">
            <Sparkles className="h-3.5 w-3.5 text-[#ff5c1a]" />
            <span>Custom Apparel &amp; Goods</span>
          </span>
          <h2 className="text-ink font-display mt-2 text-3xl leading-none uppercase sm:text-5xl">
            FEATURED APPAREL &amp; GOODS
          </h2>
          <p className="mt-2 max-w-xl text-sm text-neutral-600">
            Order individual pieces with your custom artwork, or choose from our signature drops. We
            handle single prints and high-volume event orders.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[#e7ddd0] bg-[#e7ddd0]/60 p-1.5">
          {CATALOG_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              aria-pressed={activeCategory === tab.key}
              onClick={() => onCategoryChange(tab.key)}
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
          <article
            key={product.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-[#e7ddd0] bg-white transition-colors duration-200 hover:border-neutral-400"
          >
            {/* Product Image */}
            <div className="relative aspect-square w-full overflow-hidden bg-[#f6f2ea]">
              {product.badge && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="rounded-md bg-[#141210]/90 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white uppercase">
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
                <h3 className="text-ink font-display text-xl uppercase">{product.name}</h3>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-neutral-600">
                  {product.description}
                </p>
              </div>

              {/* Specs List */}
              <div className="space-y-1.5 border-t border-neutral-100 pt-2">
                {product.specs.slice(0, 2).map((spec, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                    <Check className="h-3.5 w-3.5 shrink-0 text-[#ff5c1a]" />
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
                    <span className="text-ink font-display text-2xl">{product.price}</span>
                    {product.youthPrice && (
                      <span className="text-xs font-semibold text-neutral-500">
                        (Youth: {product.youthPrice})
                      </span>
                    )}
                  </div>
                </div>

                <QuickViewButton
                  product={product}
                  className="flex items-center gap-1.5 rounded-lg bg-[#141210] px-4 py-2.5 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#ff5c1a]"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  <span>Quick Order</span>
                </QuickViewButton>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/** Reads the active tab from ?category= so footer links like /?category=hoodies#catalog work. */
function CatalogFromUrl() {
  const searchParams = useSearchParams();
  const activeCategory =
    CATALOG_TABS.find((tab) => tab.key === searchParams.get("category"))?.key ?? "all";

  // Keep the URL in sync with the tabs (no server round-trip) so re-clicking a footer link
  // for a different category always switches back.
  const handleCategoryChange = (category: ProductFilterCategory) => {
    const params = new URLSearchParams(searchParams);
    if (category === "all") params.delete("category");
    else params.set("category", category);
    const query = params.toString();
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`
    );
  };

  return <CatalogGrid activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />;
}

/**
 * Product catalog with filter tabs. The prerendered HTML is the Suspense fallback — every
 * product — so crawlers always see the full catalog; the ?category= tab applies on the client.
 */
export default function ProductCatalog() {
  return (
    <Suspense fallback={<CatalogGrid activeCategory="all" onCategoryChange={() => {}} />}>
      <CatalogFromUrl />
    </Suspense>
  );
}
