import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroStat {
  label: string;
  value: string;
}

interface PageHeroProps {
  eyebrow: string;
  /** Headline renders as: {titleLine1} / {titleLine2} {titleAccent} */
  titleLine1: string;
  titleLine2: string;
  titleAccent: string;
  intro: string;
  note: { label: string; text: string };
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  stats: [HeroStat, HeroStat, HeroStat, HeroStat];
  showcase: {
    image: string;
    alt: string;
    title: string;
    subtitle: string;
    action: { label: string; href?: string; onClick?: () => void };
  };
}

/** Shared hero for the Apparel and Services pages — keep both pages on this one layout. */
export default function PageHero({
  eyebrow,
  titleLine1,
  titleLine2,
  titleAccent,
  intro,
  note,
  primaryCta,
  secondaryCta,
  stats,
  showcase,
}: PageHeroProps) {
  const actionClass =
    "shrink-0 text-sm font-semibold text-[#ff5c1a] transition-colors hover:text-white";

  return (
    <section className="border-b border-[#2e2a27] bg-[#141210] pt-12 pb-20 text-[#faf6ef] lg:flex lg:min-h-[calc(100svh-var(--header-height))] lg:items-center lg:py-6">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#ff5c1a] uppercase">
              {eyebrow}
            </p>

            <h1 className="font-display tall:xl:text-7xl mt-5 text-4xl leading-[0.92] text-white uppercase sm:text-6xl">
              {titleLine1} <br />
              {titleLine2} <span className="text-[#ff5c1a]">{titleAccent}</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#faf6ef]/70 sm:text-lg">
              {intro}
            </p>

            <div className="mt-6 max-w-xl border-l-2 border-[#ff5c1a] pl-4">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#ff5c1a] uppercase">
                {note.label}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[#faf6ef]/60">{note.text}</p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={primaryCta.href}
                className="group flex items-center gap-2 rounded-lg bg-[#ff5c1a] px-6 py-3.5 text-sm font-bold tracking-wider text-white uppercase transition-colors duration-200 hover:bg-[#ff7538]"
              >
                <span>{primaryCta.label}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href={secondaryCta.href}
                className="rounded-lg border border-white/15 px-6 py-3.5 text-sm font-bold tracking-wider text-white uppercase transition-colors duration-200 hover:border-white/40"
              >
                {secondaryCta.label}
              </Link>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-6 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-xs text-[#faf6ef]/50">{stat.label}</dt>
                  <dd className="font-display mt-1 text-2xl text-white">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-[#2e2a27] bg-[#1e1c1a]">
              <div className="relative aspect-square w-full">
                <Image
                  src={showcase.image}
                  alt={showcase.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center justify-between gap-4 p-5">
                <div>
                  <h3 className="font-display text-xl text-white uppercase">{showcase.title}</h3>
                  <p className="text-xs text-[#faf6ef]/50">{showcase.subtitle}</p>
                </div>
                {showcase.action.href ? (
                  <a href={showcase.action.href} className={actionClass}>
                    {showcase.action.label} →
                  </a>
                ) : (
                  <button type="button" onClick={showcase.action.onClick} className={actionClass}>
                    {showcase.action.label} →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
