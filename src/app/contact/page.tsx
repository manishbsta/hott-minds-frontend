"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState<"apparel" | "catering" | "both">(
    "apparel"
  );
  const [formData, setFormData] = useState({
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
        <div className="pointer-events-none absolute top-0 right-0 -mt-20 -mr-32 h-[500px] w-[500px] rounded-full bg-[#ff5c1a]/15 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl space-y-4 px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ff5c1a]/40 bg-[#ff5c1a]/15 px-3 py-1 text-xs font-bold tracking-widest text-[#ff5c1a] uppercase">
            <span>GET IN TOUCH WITH MS. TASH & MR. BILL</span>
          </div>

          <h1 className="font-[family-name:var(--font-anton)] text-4xl font-black tracking-tight text-white uppercase sm:text-6xl">
            START YOUR ORDER OR <br />
            <span className="bg-gradient-to-r from-[#ff5c1a] via-[#ff884d] to-[#ffa31a] bg-clip-text text-transparent">
              REQUEST A CUSTOM QUOTE
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#faf6ef]/75">
            Need custom tees, hoodies, or caps printed with your art? Or looking to book Hott Meals
            Instantly catering & cakes for an upcoming event? We are ready to make it happen.
          </p>

          {/* Quick Direct Action Strip */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 text-xs">
            <a
              href="tel:7734179901"
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 font-bold text-white hover:bg-white/20"
            >
              <span className="text-[#ff5c1a]">📞</span>
              <span>Call: (773) 417-9901</span>
            </a>
            <a
              href="sms:7734179901"
              className="flex items-center gap-2 rounded-full bg-[#ff5c1a] px-5 py-2.5 font-bold text-white shadow-lg shadow-[#ff5c1a]/25 hover:bg-[#ff7538]"
            >
              <span>💬</span>
              <span>Text Orders: (773) 417-9901</span>
            </a>
            <a
              href="mailto:HMINDUSTRIESLLC@YAHOO.COM"
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 font-bold text-white hover:bg-white/20"
            >
              <span className="text-[#ff5c1a]">✉️</span>
              <span>HMINDUSTRIESLLC@YAHOO.COM</span>
            </a>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT: FORM + CONTACT CARDS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-[#e7ddd0] bg-white p-8 shadow-xl sm:p-10">
              {formSubmitted ? (
                <div className="space-y-4 py-12 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-600">
                    ✓
                  </div>
                  <h3 className="text-ink font-[family-name:var(--font-anton)] text-3xl font-black uppercase">
                    THANK YOU FOR REACHING OUT!
                  </h3>
                  <p className="mx-auto max-w-md text-sm leading-relaxed text-neutral-600">
                    We received your project details. Ms. Tash or Mr. Bill will review your request
                    and get back to you with pricing and digital proofs within 24 hours.
                  </p>
                  <div className="flex flex-col justify-center gap-3 pt-4 sm:flex-row">
                    <a
                      href={`sms:7734179901?body=Hi Ms. Tash and Mr. Bill, I just submitted an inquiry on the website from ${formData.name || "Customer"}.`}
                      className="rounded-xl bg-[#ff5c1a] px-6 py-3 text-xs font-bold tracking-wider text-white uppercase shadow"
                    >
                      💬 Text Us Directly For Faster Reply
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
                    <h2 className="text-ink font-[family-name:var(--font-anton)] text-2xl font-black uppercase sm:text-3xl">
                      TELL US ABOUT YOUR PROJECT
                    </h2>
                    <p className="mt-1 text-xs text-neutral-500">
                      Fill out the form below or text us directly at (773) 417-9901.
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
                        className={`rounded-xl border px-3 py-3 text-xs font-bold tracking-wider uppercase transition-all ${
                          selectedService === "apparel"
                            ? "border-[#141210] bg-[#141210] text-white shadow"
                            : "border-[#e7ddd0] bg-[#faf6ef] text-neutral-700 hover:bg-neutral-100"
                        }`}
                      >
                        👕 Custom Apparel
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedService("catering")}
                        className={`rounded-xl border px-3 py-3 text-xs font-bold tracking-wider uppercase transition-all ${
                          selectedService === "catering"
                            ? "border-[#141210] bg-[#141210] text-white shadow"
                            : "border-[#e7ddd0] bg-[#faf6ef] text-neutral-700 hover:bg-neutral-100"
                        }`}
                      >
                        🍰 H.M.I Catering
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedService("both")}
                        className={`rounded-xl border px-3 py-3 text-xs font-bold tracking-wider uppercase transition-all ${
                          selectedService === "both"
                            ? "border-[#141210] bg-[#141210] text-white shadow"
                            : "border-[#e7ddd0] bg-[#faf6ef] text-neutral-700 hover:bg-neutral-100"
                        }`}
                      >
                        🎉 Both (Event Package)
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
                  <div className="cursor-pointer space-y-1 rounded-xl border-2 border-dashed border-[#e7ddd0] bg-[#faf6ef] p-4 text-center transition-colors hover:border-[#ff5c1a]">
                    <span className="text-2xl">📁</span>
                    <span className="block text-xs font-bold text-neutral-800">
                      Send Pictures / Artwork File
                    </span>
                    <p className="text-[11px] text-neutral-500">
                      All pictures must be clear and high-resolution. You can also text files
                      directly to (773) 417-9901.
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
                      className="w-full rounded-xl bg-[#ff5c1a] py-4 text-sm font-bold tracking-wider text-white uppercase shadow-xl shadow-[#ff5c1a]/30 transition-all duration-200 hover:bg-[#ff7538]"
                    >
                      Submit Quote Request →
                    </button>
                    <p className="mt-2 text-center text-[11px] text-neutral-500">
                      All sales are final. No Returns No Exchanges. Proofs sent before printing.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Direct Info Cards & FAQ */}
          <div className="space-y-6 lg:col-span-5">
            {/* Direct Contact Card */}
            <div className="space-y-6 rounded-3xl border border-[#2e2a27] bg-[#141210] p-8 text-[#faf6ef] shadow-xl">
              <div>
                <span className="text-xs font-bold tracking-widest text-[#ff5c1a] uppercase">
                  Direct Contacts
                </span>
                <h3 className="mt-1 font-[family-name:var(--font-anton)] text-2xl font-black text-white uppercase">
                  MS. TASH & MR. BILL
                </h3>
                <p className="mt-1 text-xs text-[#faf6ef]/70">
                  We take pride in every custom shirt and every hot meal we deliver.
                </p>
              </div>

              <div className="space-y-4 border-t border-[#2e2a27] pt-2 text-xs">
                <div className="flex items-start gap-3">
                  <span className="text-xl text-[#ff5c1a]">📞</span>
                  <div>
                    <span className="block text-[#faf6ef]/50">Phone / Text Hotline:</span>
                    <a
                      href="tel:7734179901"
                      className="text-base font-bold text-white hover:text-[#ff5c1a]"
                    >
                      (773) 417-9901
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl text-[#ff5c1a]">✉️</span>
                  <div>
                    <span className="block text-[#faf6ef]/50">Official Email:</span>
                    <a
                      href="mailto:HMINDUSTRIESLLC@YAHOO.COM"
                      className="text-sm font-semibold break-all text-white hover:text-[#ff5c1a]"
                    >
                      HMINDUSTRIESLLC@YAHOO.COM
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl text-[#ff5c1a]">📍</span>
                  <div>
                    <span className="block text-[#faf6ef]/50">Studio & Workshop:</span>
                    <span className="text-sm font-medium text-white">
                      Chicago, IL • Nationwide Apparel Shipping
                    </span>
                  </div>
                </div>
              </div>

              {/* Policy Reminder */}
              <div className="space-y-2 rounded-2xl border border-[#2e2a27] bg-[#1e1c1a] p-4 text-xs">
                <span className="block font-bold tracking-wider text-[#ff5c1a] uppercase">
                  ⚠️ Studio Terms
                </span>
                <p className="leading-relaxed text-[#faf6ef]/80">
                  • Text orders and all artwork pictures must be clear and sharp.
                  <br />• Free 24-hour digital art proof provided before print.
                  <br />• All sales are final. No Returns, No Exchanges.
                </p>
              </div>
            </div>

            {/* Quick FAQ Accordion */}
            <div className="space-y-4 rounded-3xl border border-[#e7ddd0] bg-white p-6 shadow-sm">
              <h4 className="text-ink font-[family-name:var(--font-anton)] text-base font-bold uppercase">
                FREQUENTLY ASKED QUESTIONS
              </h4>

              <div className="space-y-3 text-xs text-neutral-600">
                <div className="rounded-xl bg-[#faf6ef] p-3">
                  <p className="text-ink font-bold">
                    What is the standard price for custom shirts?
                  </p>
                  <p className="mt-1">
                    Adult tees are $25.00, Youth tees are $15.00, and full-back printing starts at
                    +$5.00.
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
                    Any food catering order over $200 receives a free homemade whole Pound Cake
                    (Lemon, Vanilla, Butter, or Sweet Potato). Excludes infusion cakes.
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
