"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Phone, Menu, X, MessageSquare } from "lucide-react";
import { COMPANY } from "@/constants/company";
import type { NavLink } from "@/types";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: NavLink[] = [
    { name: "Apparel", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Contact & Quote", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#2e2a27] bg-[#141210] text-[#faf6ef]">
      {/* Top Banner Notice - validated against PDF Page 3 */}
      <div className="bg-[#ff5c1a] px-4 py-1.5 text-center text-xs font-semibold tracking-wider text-white uppercase">
        <span>
          NO MINIMUMS — ORDER 1 OR 1,000 • 24-HOUR ART PROOFS •{" "}
          {COMPANY.contacts.location.city.toUpperCase()} &amp; NATIONWIDE SHIPPING
        </span>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Lockup */}
          <Link href="/" className="group flex items-center gap-3">
            <Image
              src="/images/logo-mark.png"
              alt=""
              width={247}
              height={256}
              priority
              className="h-12 w-auto transition-transform duration-200 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-display text-xl leading-none tracking-wider text-white uppercase sm:text-2xl">
                {COMPANY.name.toUpperCase()}
              </span>
              <span className="text-[10px] font-bold tracking-widest text-[#ff5c1a] uppercase sm:text-xs">
                DTF Print Studio &amp; Goods
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - leveled text links without glowing pill buttons */}
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-2 text-sm font-semibold tracking-wide transition-colors duration-150 focus:outline-none ${
                    isActive ? "text-[#ff5c1a]" : "text-[#faf6ef]/75 hover:text-white"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="absolute right-0 bottom-0 left-0 h-0.5 bg-[#ff5c1a]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Direct CTA & Phone */}
          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={COMPANY.contacts.phone.tel}
              className="flex items-center gap-2 text-xs font-bold text-[#faf6ef]/90 transition-colors hover:text-[#ff5c1a]"
            >
              <Phone className="h-4 w-4 text-[#ff5c1a]" />
              <span>{COMPANY.contacts.phone.display}</span>
            </a>
            <Link
              href="/contact"
              className="rounded-lg bg-[#faf6ef] px-4 py-2.5 text-xs font-bold tracking-wider text-[#141210] uppercase transition-colors duration-200 hover:bg-[#ff5c1a] hover:text-white"
            >
              Get Custom Quote
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={COMPANY.contacts.phone.tel}
              className="rounded-lg bg-[#ff5c1a] p-2 text-white"
              aria-label={`Call ${COMPANY.name}`}
            >
              <Phone className="h-5 w-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="space-y-2 border-t border-[#2e2a27] bg-[#141210] px-4 pt-3 pb-6 md:hidden">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 text-base font-semibold tracking-wide ${
                  isActive ? "font-bold text-[#ff5c1a]" : "text-[#faf6ef]/80 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="flex flex-col gap-2 border-t border-white/10 pt-4">
            <a
              href={COMPANY.contacts.phone.sms}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff5c1a] py-3 text-center text-sm font-bold tracking-wider text-white uppercase"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Text Orders: {COMPANY.contacts.phone.display}</span>
            </a>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full rounded-lg bg-white py-3 text-center text-sm font-bold tracking-wider text-[#141210] uppercase"
            >
              Start Order / Request Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
