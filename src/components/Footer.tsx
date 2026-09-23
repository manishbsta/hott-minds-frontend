import Link from "next/link";
import { COMPANY } from "@/constants/company";

export default function Footer() {
  return (
    <footer className="border-t border-[#2e2a27] bg-[#141210] text-[#faf6ef]">
      {/* Top CTA Strip */}
      <div className="border-b border-[#2e2a27]/60 bg-gradient-to-r from-[#8c2f1b]/40 via-[#ff5c1a]/20 to-transparent px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <span className="mb-1 block text-xs font-bold tracking-widest text-[#ff5c1a] uppercase">
              Have An Event, Reunion or Project?
            </span>
            <h3 className="font-[family-name:var(--font-anton)] text-2xl font-black text-white uppercase sm:text-3xl">
              READY TO PRESS YOUR CUSTOM DESIGNS?
            </h3>
            <p className="mt-1 max-w-xl text-sm text-[#faf6ef]/70">
              From one single custom shirt to 500+ celebration tees and hot catering pans. No
              minimum order size.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <a
              href={COMPANY.contacts.phone.sms}
              className="rounded-lg bg-[#ff5c1a] px-6 py-3 text-sm font-bold tracking-wider text-white uppercase shadow-lg shadow-[#ff5c1a]/25 transition-all duration-200 hover:bg-[#ff7a40]"
            >
              💬 Text Order {COMPANY.contacts.phone.display}
            </a>
            <Link
              href="/contact"
              className="rounded-lg border border-white/15 bg-white/10 px-6 py-3 text-sm font-bold tracking-wider text-white uppercase transition-all duration-200 hover:bg-white/20"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-[#8c2f1b] via-[#ff5c1a] to-[#ff9900] shadow-md">
                <span className="text-xl font-extrabold text-white">H</span>
              </div>
              <div>
                <span className="block font-[family-name:var(--font-anton)] text-xl leading-none font-black tracking-wider text-white uppercase">
                  {COMPANY.name.toUpperCase()}
                </span>
                <span className="text-[10px] font-bold tracking-widest text-[#ff5c1a] uppercase">
                  Designs & Studio
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-[#faf6ef]/70">
              Full-color DTF apparel printing on premium tees, hoodies, caps, bags, and drinkware.
              Local hand-pressed quality with 60+ wash durability.
            </p>
            <div className="pt-2">
              <span className="inline-block rounded border border-[#ff5c1a]/30 bg-[#2e2a27] px-2.5 py-1 text-[11px] font-bold tracking-wider text-[#ff5c1a] uppercase">
                {COMPANY.contacts.location.coverage}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-[family-name:var(--font-anton)] text-sm font-bold tracking-wider text-white uppercase">
              Explore Services
            </h4>
            <ul className="space-y-2 text-xs text-[#faf6ef]/80">
              <li>
                <Link href="/" className="transition-colors hover:text-[#ff5c1a]">
                  Custom T-Shirts (Adult {COMPANY.pricing.adultTee} / Youth {COMPANY.pricing.youthTee})
                </Link>
              </li>
              <li>
                <Link href="/" className="transition-colors hover:text-[#ff5c1a]">
                  Custom Hoodies & Sweatshirts
                </Link>
              </li>
              <li>
                <Link href="/" className="transition-colors hover:text-[#ff5c1a]">
                  Snapback Caps & Headwear
                </Link>
              </li>
              <li>
                <Link href="/services" className="transition-colors hover:text-[#ff5c1a]">
                  {COMPANY.divisions.catering}
                </Link>
              </li>
              <li>
                <Link href="/services" className="transition-colors hover:text-[#ff5c1a]">
                  Pound Cakes & Rum Infusion Cakes
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contacts */}
          <div className="space-y-3">
            <h4 className="font-[family-name:var(--font-anton)] text-sm font-bold tracking-wider text-white uppercase">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs text-[#faf6ef]/80">
              <p className="font-semibold text-white">
                Contact: <span className="text-[#ff5c1a]">{COMPANY.contacts.owners}</span>
              </p>
              <p>
                <span className="block text-[#faf6ef]/50">Phone / Text:</span>
                <a
                  href={COMPANY.contacts.phone.tel}
                  className="text-sm font-bold text-white hover:text-[#ff5c1a]"
                >
                  {COMPANY.contacts.phone.display}
                </a>
              </p>
              <p>
                <span className="block text-[#faf6ef]/50">Email:</span>
                <a
                  href={COMPANY.contacts.email.mailto}
                  className="font-medium break-all text-white hover:text-[#ff5c1a]"
                >
                  {COMPANY.contacts.email.display}
                </a>
              </p>
            </div>
          </div>

          {/* Studio Policies */}
          <div className="space-y-3">
            <h4 className="font-[family-name:var(--font-anton)] text-sm font-bold tracking-wider text-white uppercase">
              Ordering Guidelines
            </h4>
            <div className="space-y-2 rounded-lg border border-[#2e2a27] bg-[#1e1c1a] p-3 text-xs">
              <div className="flex items-start gap-2">
                <span className="font-bold text-[#ff5c1a]">✓</span>
                <span className="text-[#faf6ef]/80">
                  Text orders and all artwork/pictures must be clear.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-[#ff5c1a]">✓</span>
                <span className="text-[#faf6ef]/80">
                  24-hour digital art proof provided before print.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-[#ff5c1a]">!</span>
                <span className="font-medium text-amber-400/90">
                  All sales are final. No Returns, No Exchanges.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#2e2a27] pt-6 text-xs text-[#faf6ef]/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Designs by Hott Minds / H.M.I Industries LLC. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/" className="transition-colors hover:text-white">
              Apparel
            </Link>
            <Link href="/services" className="transition-colors hover:text-white">
              Catering
            </Link>
            <Link href="/contact" className="transition-colors hover:text-white">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
