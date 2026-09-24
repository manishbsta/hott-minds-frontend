import { Star } from "lucide-react";
import type { Testimonial } from "@/types";

interface TestimonialsProps {
  eyebrow: string;
  /** Headline renders as: {titleLine1} / {titleLine2} */
  titleLine1: string;
  titleLine2: string;
  testimonials: Testimonial[];
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/** Customer review cards — layout follows the mockup's "Customer Reviews" section. */
export default function Testimonials({
  eyebrow,
  titleLine1,
  titleLine2,
  testimonials,
}: TestimonialsProps) {
  // Placeholder reviews are for layout review only; never publish them.
  const visible =
    process.env.NODE_ENV === "production"
      ? testimonials.filter((t) => !t.isPlaceholder)
      : testimonials;

  if (visible.length === 0) return null;

  return (
    <section className="border-t border-[#2e2a27] bg-[#141210] py-20 text-[#faf6ef]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-[#ff5c1a] uppercase">{eyebrow}</p>
        <h2 className="font-display mt-3 text-4xl leading-[0.95] text-white uppercase sm:text-5xl">
          {titleLine1} <br />
          {titleLine2}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {visible.map((testimonial, index) => (
            <figure
              key={`${testimonial.name}-${index}`}
              className="flex flex-col rounded-xl border border-[#2e2a27] bg-[#1e1c1a] p-6"
            >
              <div
                className="flex gap-1"
                role="img"
                aria-label={`${testimonial.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? "fill-[#ff5c1a] text-[#ff5c1a]"
                        : "fill-transparent text-white/20"
                    }`}
                  />
                ))}
              </div>

              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-[#faf6ef]/80">
                {testimonial.quote}
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff5c1a] text-sm font-bold text-white">
                  {getInitials(testimonial.name)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">{testimonial.name}</span>
                  <span className="block text-xs text-[#faf6ef]/50">{testimonial.detail}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
