"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { X, ZoomIn } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

export type Product = {
  id: string;
  name: string;
  category: "tees" | "hoodies" | "caps" | "other";
  categoryLabel: string;
  price: string;
  youthPrice?: string;
  image: string;
  badge?: string;
  description: string;
  specs: string[];
};

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const isLightboxOpenRef = useRef(false);
  isLightboxOpenRef.current = isLightboxOpen;
  const lastLightboxCloseTime = useRef(0);

  const handleCloseLightbox = () => {
    lastLightboxCloseTime.current = Date.now();
    setIsLightboxOpen(false);
  };

  const isYarlTarget = (target: EventTarget | null) => {
    if (target instanceof Element) {
      return Boolean(target.closest(".yarl__portal, .yarl__root, [class*='yarl__']"));
    }
    return false;
  };

  const shouldBlockDismiss = (target?: EventTarget | null) => {
    if (isLightboxOpenRef.current) return true;
    if (Date.now() - lastLightboxCloseTime.current < 400) return true;
    if (target && isYarlTarget(target)) return true;
    return false;
  };

  if (!product) return null;

  return (
    <>
      {/* PRIMARY PRODUCT DETAILS MODAL */}
      <Dialog.Root
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen && shouldBlockDismiss()) {
            return;
          }
          if (!isOpen) {
            handleCloseLightbox();
          }
          onOpenChange(isOpen);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />

          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-3 sm:p-6">
            <Dialog.Content
              className="dialog-content pointer-events-auto relative max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[#2e2a27] bg-[#141210] p-5 text-[#faf6ef] shadow-2xl focus:outline-none sm:p-8"
              aria-describedby="product-modal-description"
              onPointerDownOutside={(e) => {
                if (shouldBlockDismiss(e.target)) {
                  e.preventDefault();
                }
              }}
              onInteractOutside={(e) => {
                if (shouldBlockDismiss(e.target)) {
                  e.preventDefault();
                }
              }}
              onEscapeKeyDown={(e) => {
                if (isLightboxOpenRef.current || Date.now() - lastLightboxCloseTime.current < 400) {
                  e.preventDefault();
                }
              }}
            >
              {/* Close Button */}
              <Dialog.Close
                className="absolute top-4 right-4 z-20 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-[#2e2a27] text-white shadow-xl transition-all hover:scale-105 hover:bg-[#ff5c1a] focus:outline-none"
                aria-label="Close product preview"
              >
                <X className="h-5 w-5" />
              </Dialog.Close>

              <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-2">
                {/* Product Media - Click to Open Lightbox */}
                <div
                  onClick={() => setIsLightboxOpen(true)}
                  className="group relative aspect-square cursor-zoom-in overflow-hidden rounded-2xl border border-[#2e2a27] bg-black/40 shadow-lg transition-all hover:border-[#ff5c1a]/60"
                  title="Click to inspect image in lightbox"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, 350px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 backdrop-blur-[2px] transition-opacity group-hover:opacity-100">
                    <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-[#141210]/90 px-3.5 py-1.5 text-xs font-bold text-white shadow-lg">
                      <ZoomIn className="h-4 w-4 text-[#ff5c1a]" />
                      <span>Click to Zoom</span>
                    </span>
                  </div>
                  <div className="pointer-events-none absolute bottom-3 left-3 z-10 rounded-full border border-white/10 bg-black/70 px-2.5 py-1 text-[10px] font-semibold text-white/90 backdrop-blur-sm">
                    🔍 Click to zoom
                  </div>
                </div>

                {/* Product Information */}
                <div className="space-y-4">
                  <span className="text-xs font-bold tracking-widest text-[#ff5c1a] uppercase">
                    {product.categoryLabel}
                  </span>

                  <Dialog.Title className="font-[family-name:var(--font-anton)] text-2xl leading-tight font-black text-white uppercase sm:text-3xl">
                    {product.name}
                  </Dialog.Title>

                  <div className="flex items-baseline gap-3">
                    <span className="font-[family-name:var(--font-anton)] text-3xl font-black text-[#ff5c1a]">
                      {product.price}
                    </span>
                    {product.youthPrice && (
                      <span className="text-xs text-[#faf6ef]/70">
                        Youth Size: {product.youthPrice}
                      </span>
                    )}
                  </div>

                  <Dialog.Description
                    id="product-modal-description"
                    className="text-xs leading-relaxed text-[#faf6ef]/70"
                  >
                    {product.description}
                  </Dialog.Description>

                  {/* Specs List */}
                  <div className="space-y-1.5 border-t border-white/10 pt-2 text-xs">
                    {product.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-[#faf6ef]/85">
                        <span className="font-bold text-[#ff5c1a]">✓</span>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action CTAs */}
                  <div className="flex flex-col gap-2.5 pt-3">
                    <a
                      href={`sms:7734179901?body=Hi Ms. Tash and Mr. Bill, I would like to order: ${encodeURIComponent(product.name)}`}
                      className="w-full rounded-xl bg-[#ff5c1a] py-3.5 text-center text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-[#ff5c1a]/25 transition-all duration-200 hover:bg-[#ff7538]"
                    >
                      💬 Text to Order This Item (773) 417-9901
                    </a>

                    <Link
                      href="/contact"
                      onClick={() => onOpenChange(false)}
                      className="w-full rounded-xl border border-white/15 bg-white/10 py-3 text-center text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-white/20"
                    >
                      Request Custom Bulk Quote
                    </Link>

                    <Dialog.Close asChild>
                      <button
                        type="button"
                        className="w-full cursor-pointer rounded-xl border border-white/10 py-2.5 text-center text-xs font-semibold tracking-wider text-neutral-400 uppercase transition-colors hover:bg-white/5 hover:text-white"
                      >
                        ✕ Close Window
                      </button>
                    </Dialog.Close>
                  </div>
                </div>
              </div>
            </Dialog.Content>
          </div>
        </Dialog.Portal>
      </Dialog.Root>

      {/* YET-ANOTHER-REACT-LIGHTBOX WITH ZOOM PLUGIN */}
      <Lightbox
        open={isLightboxOpen}
        close={handleCloseLightbox}
        slides={[{ src: product.image, alt: product.name }]}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 1.5,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: true,
        }}
        controller={{ closeOnBackdropClick: true }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
        styles={{
          root: { "--yarl__color_backdrop": "rgba(0, 0, 0, 0.92)" },
        }}
      />
    </>
  );
}
