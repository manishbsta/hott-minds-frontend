"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Shirt,
  ChefHat,
  Sparkles,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  UploadCloud,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";
import { COMPANY, getSmsLink } from "@/constants/company";
import type { ContactFormData, ServiceType } from "@/types";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceType>("apparel");
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    email: "",
    quantity: "1-10",
    eventDate: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

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
            <div className="rounded-3xl border border-[#e7ddd0] bg-white p-8 sm:p-10">
              {formSubmitted ? (
                <div className="space-y-4 py-12 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-600">
                    <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                  </div>
                  <h3 className="text-ink font-display text-3xl uppercase">
                    THANK YOU FOR REACHING OUT!
                  </h3>
                  <p className="mx-auto max-w-md text-sm leading-relaxed text-neutral-600">
                    We received your project details. {COMPANY.owners.tash} or {COMPANY.owners.bill}{" "}
                    will review your request and get back to you with pricing and digital proofs
                    within 24 hours.
                  </p>
                  <div className="flex flex-col justify-center gap-3 pt-4 sm:flex-row">
                    <a
                      href={getSmsLink(
                        `Hi ${COMPANY.owners.combined}, I just submitted an inquiry on the website from ${formData.name || "Customer"}.`
                      )}
                      className="flex items-center justify-center gap-2 rounded-xl bg-[#ff5c1a] px-6 py-3 text-xs font-bold tracking-wider text-white uppercase shadow-md shadow-[#ff5c1a]/25 transition-all hover:bg-[#ff7538]"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Text Us Directly For Faster Reply</span>
                    </a>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="rounded-xl bg-neutral-100 px-6 py-3 text-xs font-bold tracking-wider text-neutral-800 uppercase hover:bg-neutral-200"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-ink font-display text-2xl uppercase sm:text-3xl">
                      TELL US ABOUT YOUR PROJECT
                    </h2>
                    <p className="mt-1 text-xs text-neutral-500">
                      Fill out the form below or text us directly at{" "}
                      {COMPANY.contacts.phone.display}.
                    </p>
                  </div>

                  {/* Service Toggle */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold tracking-wider text-neutral-700 uppercase">
                      Service Interested In
                    </label>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                      <button
                        type="button"
                        onClick={() => setSelectedService("apparel")}
                        className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-xs font-bold tracking-wider uppercase transition-all ${
                          selectedService === "apparel"
                            ? "border-[#141210] bg-[#141210] text-white shadow"
                            : "border-[#e7ddd0] bg-[#faf6ef] text-neutral-700 hover:bg-neutral-100"
                        }`}
                      >
                        <Shirt className="h-4 w-4" />
                        <span>{COMPANY.divisions.apparelShort}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedService("catering")}
                        className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-xs font-bold tracking-wider uppercase transition-all ${
                          selectedService === "catering"
                            ? "border-[#141210] bg-[#141210] text-white shadow"
                            : "border-[#e7ddd0] bg-[#faf6ef] text-neutral-700 hover:bg-neutral-100"
                        }`}
                      >
                        <ChefHat className="h-4 w-4" />
                        <span>{COMPANY.divisions.cateringShort}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedService("both")}
                        className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-xs font-bold tracking-wider uppercase transition-all ${
                          selectedService === "both"
                            ? "border-[#141210] bg-[#141210] text-white shadow"
                            : "border-[#e7ddd0] bg-[#faf6ef] text-neutral-700 hover:bg-neutral-100"
                        }`}
                      >
                        <Sparkles className="h-4 w-4" />
                        <span>Both (Event Package)</span>
                      </button>
                    </div>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold tracking-wider text-neutral-700 uppercase">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="text-ink w-full rounded-xl border border-[#e7ddd0] bg-[#faf6ef] px-4 py-3 text-sm focus:ring-2 focus:ring-[#ff5c1a] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold tracking-wider text-neutral-700 uppercase">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. (773) 555-0123"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="text-ink w-full rounded-xl border border-[#e7ddd0] bg-[#faf6ef] px-4 py-3 text-sm focus:ring-2 focus:ring-[#ff5c1a] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Email & Quantity */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold tracking-wider text-neutral-700 uppercase">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="text-ink w-full rounded-xl border border-[#e7ddd0] bg-[#faf6ef] px-4 py-3 text-sm focus:ring-2 focus:ring-[#ff5c1a] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold tracking-wider text-neutral-700 uppercase">
                        Estimated Pieces / Headcount
                      </label>
                      <select
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="text-ink w-full rounded-xl border border-[#e7ddd0] bg-[#faf6ef] px-4 py-3 text-sm focus:ring-2 focus:ring-[#ff5c1a] focus:outline-none"
                      >
                        <option value="1-5">1 – 5 pieces (Sample / Single)</option>
                        <option value="6-12">6 – 12 pieces</option>
                        <option value="13-24">13 – 24 pieces</option>
                        <option value="25-50">25 – 50 pieces</option>
                        <option value="50+">50+ pieces (Bulk event)</option>
                      </select>
                    </div>
                  </div>

                  {/* Event Date */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold tracking-wider text-neutral-700 uppercase">
                      Needed By Date / Event Date
                    </label>
                    <input
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="text-ink w-full rounded-xl border border-[#e7ddd0] bg-[#faf6ef] px-4 py-3 text-sm focus:ring-2 focus:ring-[#ff5c1a] focus:outline-none"
                    />
                  </div>

                  {/* Artwork Upload Visual Note */}
                  <div className="cursor-pointer space-y-1.5 rounded-xl border-2 border-dashed border-[#e7ddd0] bg-[#faf6ef] p-5 text-center transition-colors hover:border-[#ff5c1a]">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#ff5c1a]/10 text-[#ff5c1a]">
                      <UploadCloud className="h-5 w-5" />
                    </div>
                    <span className="block text-xs font-bold text-neutral-800">
                      Send Pictures / Artwork File
                    </span>
                    <p className="text-[11px] text-neutral-500">
                      All pictures must be clear and high-resolution. You can also text files
                      directly to {COMPANY.contacts.phone.display}.
                    </p>
                  </div>

                  {/* Notes / Message */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold tracking-wider text-neutral-700 uppercase">
                      Project Details / Special Requests
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us what you want printed (colors, sizes, front/back placement) or catering dishes/cakes requested..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="text-ink w-full rounded-xl border border-[#e7ddd0] bg-[#faf6ef] px-4 py-3 text-sm focus:ring-2 focus:ring-[#ff5c1a] focus:outline-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff5c1a] py-4 text-sm font-bold tracking-wider text-white uppercase shadow-lg shadow-[#ff5c1a]/25 transition-all duration-200 hover:bg-[#ff7538] hover:shadow-[#ff5c1a]/40"
                    >
                      <span>Submit Quote Request</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                    <p className="mt-2 text-center text-[11px] text-neutral-500">
                      {COMPANY.operations.salesPolicyNotice} {COMPANY.operations.proofTurnaround}.
                    </p>
                  </div>
                </form>
              )}
            </div>
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
                <p className="leading-relaxed text-[#faf6ef]/80">
                  • Text orders and all artwork pictures must be clear and sharp.
                  <br />• Free {COMPANY.operations.proofTurnaround.toLowerCase()}.
                  <br />• {COMPANY.operations.salesPolicyNotice}
                </p>
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
