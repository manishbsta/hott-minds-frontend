"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Check, X } from "lucide-react";
import { COMPANY, getSmsLink } from "@/constants/company";
import type { ContactFormData, ServiceType } from "@/types";

interface QuoteFormProps {
  initialService?: ServiceType;
}

const SERVICE_OPTIONS: { value: ServiceType; label: string }[] = [
  { value: "apparel", label: "Custom apparel" },
  { value: "catering", label: "Catering & cakes" },
  { value: "both", label: "Both" },
];

const DETAILS_PLACEHOLDER: Record<ServiceType, string> = {
  apparel: "What you need printed, how many, sizes and colors, front or back…",
  catering: "Type of event, number of guests, pans or cakes you'd like…",
  both: "Tell us about the shirts and the food — quantities, guests, event type…",
};

const EMPTY_FORM: ContactFormData = {
  name: "",
  phone: "",
  email: "",
  neededBy: "",
  notes: "",
};

const labelClass = "mb-2 block text-xs font-bold tracking-[0.12em] text-[#6b6259] uppercase";
const inputClass =
  "text-ink w-full rounded-sm border border-[#e7ddd0] bg-[#fcfaf6] px-4 py-3 text-base placeholder:text-[#a39a90] focus:border-[#141210] focus:ring-1 focus:ring-[#141210] focus:outline-none";

function formatFileSize(bytes: number) {
  return bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

/** Quote request form for apparel, catering, or both — layout follows the mockup's quote card. */
export default function QuoteForm({ initialService = "apparel" }: QuoteFormProps) {
  const [service, setService] = useState<ServiceType>(initialService);
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_FORM);
  const [artwork, setArtwork] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const showApparel = service === "apparel" || service === "both";
  const showCatering = service === "catering" || service === "both";

  const update =
    (field: keyof ContactFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData({ ...formData, [field]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setArtwork(null);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="rounded-lg border border-[#e7ddd0] bg-white p-6 text-center sm:p-10">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#141210] text-white">
          <Check className="h-6 w-6" />
        </div>
        <h2 className="font-display text-ink mt-5 text-3xl uppercase">Request received</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#6b6259]">
          Thanks{formData.name ? `, ${formData.name.split(" ")[0]}` : ""}. {COMPANY.owners.tash} or{" "}
          {COMPANY.owners.bill} will get back to you with pricing within 24 hours.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={getSmsLink(
              `Hi ${COMPANY.owners.combined}, I just submitted a quote request on the website${formData.name ? ` (${formData.name})` : ""}.`
            )}
            className="flex items-center justify-center gap-2 rounded-sm bg-[#141210] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#2e2a27]"
          >
            Text us for a faster reply
            <ArrowRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={resetForm}
            className="text-ink rounded-sm border border-[#e7ddd0] px-6 py-3.5 text-sm font-semibold transition-colors hover:border-[#141210]"
          >
            Submit another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-[#e7ddd0] bg-white p-6 sm:p-10"
    >
      <h2 className="font-display text-ink text-3xl uppercase sm:text-4xl">Get a custom quote</h2>

      {/* Service selector */}
      <fieldset className="mt-8">
        <legend className={labelClass}>What do you need?</legend>
        <div className="grid grid-cols-3 gap-2">
          {SERVICE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={service === option.value}
              onClick={() => setService(option.value)}
              className={`rounded-sm border px-2 py-3 text-sm font-semibold transition-colors ${
                service === option.value
                  ? "border-[#141210] bg-[#141210] text-white"
                  : "text-ink border-[#e7ddd0] bg-[#fcfaf6] hover:border-[#141210]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Contact details */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="quote-name" className={labelClass}>
            Full name
          </label>
          <input
            id="quote-name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            value={formData.name}
            onChange={update("name")}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="quote-phone" className={labelClass}>
            Phone
          </label>
          <input
            id="quote-phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="(773) 555-0123"
            value={formData.phone}
            onChange={update("phone")}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="quote-email" className={labelClass}>
            Email <span className="font-normal tracking-normal normal-case">(optional)</span>
          </label>
          <input
            id="quote-email"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={update("email")}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="quote-date" className={labelClass}>
            {showCatering ? "Event date" : "Needed by"}
          </label>
          <input
            id="quote-date"
            type="date"
            value={formData.neededBy}
            onChange={update("neededBy")}
            className={inputClass}
          />
        </div>
      </div>

      {/* Project details */}
      <div className="mt-6">
        <label htmlFor="quote-details" className={labelClass}>
          Project details
        </label>
        <textarea
          id="quote-details"
          rows={4}
          placeholder={DETAILS_PLACEHOLDER[service]}
          value={formData.notes}
          onChange={update("notes")}
          className={inputClass}
        />
      </div>

      {/* Artwork (apparel only) */}
      {showApparel && (
        <div className="mt-6">
          <span className={labelClass}>
            Artwork <span className="font-normal tracking-normal normal-case">(optional)</span>
          </span>
          {artwork ? (
            <div className="flex items-center justify-center gap-2 rounded-sm border border-dashed border-[#e7ddd0] bg-[#fcfaf6] px-4 py-5 text-sm">
              <span className="text-ink truncate font-semibold">{artwork.name}</span>
              <span className="shrink-0 text-[#6b6259]">· {formatFileSize(artwork.size)} ·</span>
              <span className="shrink-0 font-semibold text-emerald-700">Attached ✓</span>
              <button
                type="button"
                onClick={() => setArtwork(null)}
                aria-label="Remove artwork"
                className="ml-1 shrink-0 text-[#6b6259] hover:text-[#141210]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label
              htmlFor="quote-artwork"
              className="block cursor-pointer rounded-sm border border-dashed border-[#e7ddd0] bg-[#fcfaf6] px-4 py-5 text-center text-sm transition-colors hover:border-[#141210]"
            >
              <span className="text-ink font-semibold">Choose a file</span>
              <span className="text-[#6b6259]"> · PNG, JPG, PDF or AI</span>
              <input
                id="quote-artwork"
                type="file"
                accept="image/*,.pdf,.ai,.eps,.svg"
                className="sr-only"
                onChange={(e) => setArtwork(e.target.files?.[0] ?? null)}
              />
            </label>
          )}
        </div>
      )}

      <button
        type="submit"
        className="group mt-6 flex w-full items-center justify-center gap-2 rounded-sm bg-[#141210] py-4 text-base font-semibold text-white transition-colors hover:bg-[#2e2a27]"
      >
        Request My Quote
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
      <p className="mt-4 text-center text-sm text-[#6b6259]">
        No obligation. We reply within 24 hours — or text{" "}
        <a href={COMPANY.contacts.phone.sms} className="text-ink font-semibold hover:underline">
          {COMPANY.contacts.phone.display}
        </a>
        .
      </p>
    </form>
  );
}

/**
 * Quote form preselected from ?service= (e.g. /contact?service=catering). Wrap in <Suspense> with a
 * plain <QuoteForm /> fallback so the page itself can still be prerendered.
 */
export function QuoteFormFromUrl() {
  const service = useSearchParams().get("service");
  const initialService = SERVICE_OPTIONS.find((option) => option.value === service)?.value;

  return <QuoteForm key={initialService} initialService={initialService} />;
}
