"use client";

import { use } from "react";
import { Mail, Phone, MapPin, ShieldCheck, HelpCircle } from "lucide-react";
import { COMPANY } from "@/constants/company";
import QuoteForm from "@/components/QuoteForm";
import type { ServiceType } from "@/types";

const SERVICE_TYPES: ServiceType[] = ["apparel", "catering", "both"];

export default function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { service } = use(searchParams);
  const initialService = SERVICE_TYPES.find((type) => type === service) ?? "apparel";

  return (
    <div className="bg-bone text-ink">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-[#2e2a27] bg-[#141210] py-16 text-[#faf6ef] lg:py-24">
        {/* Ambient flare */}
        <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-[#ff5c1a]/10 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-[#8c2f1b]/10 blur-3xl" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center space-y-4 px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#ff5c1a]/40 bg-[#ff5c1a]/10 px-4 py-1.5 text-xs font-bold tracking-wider text-[#ff5c1a] uppercase shadow-sm backdrop-blur-sm">
            <Mail className="h-3.5 w-3.5 text-[#ff5c1a]" />
            <span>Direct Contact &amp; Custom Quotes</span>
          </span>

          <h1 className="font-display text-4xl text-white uppercase sm:text-6xl">
            START YOUR ORDER OR <br />
            <span className="bg-gradient-to-r from-[#ff5c1a] via-[#ff7538] to-[#ffa043] bg-clip-text text-transparent">
              REQUEST A CUSTOM QUOTE
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#faf6ef]/75">
            Need custom shirts, hoodies, or caps printed with your art? Or looking to book Hott
            Meals Instantly catering &amp; cakes for an upcoming event? We are ready to make it
            happen.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT: FORM + CONTACT CARDS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7">
            <QuoteForm key={initialService} initialService={initialService} />
          </div>

          {/* Right Column: Direct Info Cards & FAQ */}
          <div className="space-y-6 lg:col-span-5">
            {/* Direct Contact Card */}
            <div className="space-y-6 rounded-3xl border border-[#2e2a27] bg-[#141210] p-8 text-[#faf6ef]">
              <div>
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#ff5c1a]/30 bg-[#ff5c1a]/10 px-3 py-1 text-[11px] font-bold tracking-wider text-[#ff5c1a] uppercase">
                  <Phone className="h-3.5 w-3.5 text-[#ff5c1a]" />
                  <span>Direct Contacts</span>
                </span>
                <h3 className="font-display mt-2 text-2xl text-white uppercase">
                  {COMPANY.owners.combined.toUpperCase()}
                </h3>
                <p className="mt-1 text-xs text-[#faf6ef]/70">
                  We take pride in every custom shirt and every hot meal we deliver.
                </p>
              </div>

              <div className="space-y-4 border-t border-[#2e2a27] pt-2 text-xs">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#ff5c1a]/30 bg-[#ff5c1a]/15 text-[#ff5c1a]">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-[#faf6ef]/50">Phone / Text Hotline:</span>
                    <a
                      href={COMPANY.contacts.phone.tel}
                      className="text-base font-bold text-white hover:text-[#ff5c1a]"
                    >
                      {COMPANY.contacts.phone.display}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#ff5c1a]/30 bg-[#ff5c1a]/15 text-[#ff5c1a]">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-[#faf6ef]/50">Official Email:</span>
                    <a
                      href={COMPANY.contacts.email.mailto}
                      className="text-sm font-semibold break-all text-white hover:text-[#ff5c1a]"
                    >
                      {COMPANY.contacts.email.display}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#ff5c1a]/30 bg-[#ff5c1a]/15 text-[#ff5c1a]">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-[#faf6ef]/50">Studio &amp; Workshop:</span>
                    <span className="text-sm font-medium text-white">
                      {COMPANY.contacts.location.serviceArea}
                    </span>
                  </div>
                </div>
              </div>

              {/* Policy Reminder */}
              <div className="space-y-2 rounded-2xl border border-[#2e2a27] bg-[#1e1c1a] p-4 text-xs">
                <span className="flex items-center gap-1.5 font-bold tracking-wider text-[#ff5c1a] uppercase">
                  <ShieldCheck className="h-4 w-4 text-[#ff5c1a]" />
                  <span>Studio Terms</span>
                </span>
                <ul className="list-inside list-disc space-y-1.5 leading-relaxed text-[#faf6ef]/80">
                  <li>Text orders and all artwork pictures must be clear and sharp.</li>
                  <li>Free {COMPANY.operations.proofTurnaround.toLowerCase()}.</li>
                  <li>{COMPANY.operations.salesPolicyNotice}</li>
                </ul>
              </div>
            </div>

            {/* Quick FAQ Accordion */}
            <div className="space-y-4 rounded-3xl border border-[#e7ddd0] bg-white p-6 shadow-sm">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-neutral-300 bg-neutral-100 px-3 py-1 text-[11px] font-bold tracking-wider text-neutral-700 uppercase">
                <HelpCircle className="h-3.5 w-3.5 text-[#ff5c1a]" />
                <span>FAQ</span>
              </span>
              <h4 className="text-ink font-display text-base uppercase">
                FREQUENTLY ASKED QUESTIONS
              </h4>

              <div className="space-y-3 text-xs text-neutral-600">
                <div className="rounded-xl bg-[#faf6ef] p-3">
                  <p className="text-ink font-bold">How should I prepare my artwork files?</p>
                  <p className="mt-1">
                    High-resolution files work best (300 DPI transparent PNG or vector formats). All
                    pictures and artwork must be clear and sharp.
                  </p>
                </div>

                <div className="rounded-xl bg-[#faf6ef] p-3">
                  <p className="text-ink font-bold">Is there a minimum order quantity?</p>
                  <p className="mt-1">
                    No! We print single custom shirts as well as 100+ group orders for parties and
                    family reunions.
                  </p>
                </div>

                <div className="rounded-xl bg-[#faf6ef] p-3">
                  <p className="text-ink font-bold">How does the free cake catering offer work?</p>
                  <p className="mt-1">
                    Any food catering order over {COMPANY.pricing.cateringCakePromoThreshold}{" "}
                    receives a free homemade whole Pound Cake (Lemon, Vanilla, Butter, or Sweet
                    Potato). Excludes infusion cakes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
