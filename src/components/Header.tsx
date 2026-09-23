"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { COMPANY } from "@/constants/company";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Apparel & Printing", href: "/" },
    { name: "Catering & Deserts", href: "/services" },
    { name: "Contact & Quote", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#2e2a27]/20 bg-[#141210]/95 text-[#faf6ef] backdrop-blur-md">
      {/* Top Banner Notice */}
      <div className="bg-[#ff5c1a] px-4 py-1.5 text-center text-xs font-semibold tracking-wider text-white uppercase">
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
          <span>
            {COMPANY.contacts.location.city} & Nationwide Custom DTF Printing • Adult{" "}
            {COMPANY.pricing.adultTee} | Youth {COMPANY.pricing.youthTee} • Text Orders:{" "}
            {COMPANY.contacts.phone.display}
          </span>
        </span>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Lockup */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-tr from-[#8c2f1b] via-[#ff5c1a] to-[#ff9900] shadow-lg shadow-[#ff5c1a]/25 transition-transform duration-200 group-hover:scale-105">
              {/* Fiery H Symbol */}
              <span className="text-2xl font-extrabold tracking-tighter text-white drop-shadow">
                H
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-[family-name:var(--font-anton)] text-xl leading-none font-black tracking-wider text-white uppercase sm:text-2xl">
                {COMPANY.name.toUpperCase()}
              </span>
              <span className="text-[10px] font-bold tracking-widest text-[#ff5c1a] uppercase sm:text-xs">
                DTF Print Studio & Goods
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-150 ${
                    isActive
                      ? "bg-[#ff5c1a] text-white shadow-md shadow-[#ff5c1a]/30"
                      : "text-[#faf6ef]/85 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.name}
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
              <svg className="h-4 w-4 text-[#ff5c1a]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
              </svg>
              <span>{COMPANY.contacts.phone.display}</span>
            </a>
            <Link
              href="/contact"
              className="rounded-lg bg-[#faf6ef] px-4 py-2.5 text-xs font-bold tracking-wider text-[#141210] uppercase shadow transition-all duration-200 hover:bg-[#ff5c1a] hover:text-white hover:shadow-lg hover:shadow-[#ff5c1a]/20"
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
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
              </svg>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
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
                className={`block rounded-lg px-4 py-3 text-base font-semibold tracking-wide ${
                  isActive ? "bg-[#ff5c1a] text-white" : "text-[#faf6ef]/90 hover:bg-white/10"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="flex flex-col gap-2 border-t border-white/10 pt-4">
            <a
              href={COMPANY.contacts.phone.sms}
              className="w-full rounded-lg bg-[#ff5c1a] py-3 text-center text-sm font-bold tracking-wider text-white uppercase"
            >
              💬 Text Orders: {COMPANY.contacts.phone.display}
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
