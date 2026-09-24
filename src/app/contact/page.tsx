import type { Metadata } from "next";
import { Mail, Phone, MapPin, ShieldCheck } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import ContactForm from "@/components/ContactForm";
import FaqSection from "@/components/FaqSection";
import { COMPANY } from "@/constants/company";
import { FAQS } from "@/constants/faqs";
import { PAGES } from "@/constants/site";
import { pageMetadata } from "@/lib/metadata";
import { contactJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(PAGES.contact);

export default function ContactPage() {
  return (
    <div className="bg-bone text-ink">
      <JsonLd data={contactJsonLd()} />
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-[#2e2a27] bg-[#141210] py-16 text-[#faf6ef] lg:py-24">
        {/* Ambient flare */}
        <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-[#ff5c1a]/10 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-[#8c2f1b]/10 blur-3xl" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center space-y-4 px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#ff5c1a]/40 bg-[#ff5c1a]/10 px-4 py-1.5 text-xs font-bold tracking-wider text-[#ff5c1a] uppercase shadow-sm backdrop-blur-sm">
            <Mail className="h-3.5 w-3.5 text-[#ff5c1a]" />
            <span>Get In Touch</span>
          </span>

          <h1 className="font-display text-4xl text-white uppercase sm:text-6xl">
            START YOUR ORDER OR <br />
            <span className="bg-gradient-to-r from-[#ff5c1a] via-[#ff7538] to-[#ffa043] bg-clip-text text-transparent">
              SEND US A MESSAGE
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#faf6ef]/75">
            Need custom shirts, hoodies, or caps printed with your art? Or looking to book Hott
            Meals Instantly catering &amp; cakes for an upcoming event? Send us a message with your
            order, question, or feedback — we reply within 24 hours.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT: FORM + CONTACT CARDS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right Column: Direct Info Card */}
          <div className="space-y-6 lg:col-span-5">
            {/* Direct Contact Card */}
            <div className="space-y-6 rounded-3xl border border-[#2e2a27] bg-[#141210] p-8 text-[#faf6ef]">
              <div>
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#ff5c1a]/30 bg-[#ff5c1a]/10 px-3 py-1 text-[11px] font-bold tracking-wider text-[#ff5c1a] uppercase">
                  <Phone className="h-3.5 w-3.5 text-[#ff5c1a]" />
                  <span>Direct Contacts</span>
                </span>
                <h2 className="font-display mt-2 text-2xl text-white uppercase">
                  {COMPANY.owners.combined.toUpperCase()}
                </h2>
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
          </div>
        </div>
      </section>

      <FaqSection faqs={FAQS} />
    </div>
  );
}
