"use client";

import { useState } from "react";
import { AlertCircle, ArrowRight, Check, Loader2 } from "lucide-react";
import { COMPANY, getSmsLink } from "@/constants/company";
import type { ContactFormData } from "@/types";

const EMPTY_FORM: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; name: string }
  | { state: "error"; message: string };

const labelClass = "mb-2 block text-xs font-bold tracking-[0.12em] text-[#6b6259] uppercase";
const inputClass =
  "text-ink w-full rounded-sm border border-[#e7ddd0] bg-[#fcfaf6] px-4 py-3 text-base placeholder:text-[#a39a90] focus:border-[#141210] focus:ring-1 focus:ring-[#141210] focus:outline-none disabled:opacity-60";

const PHONE_REGEX = /^[0-9+().\-\s]+$/;
const MIN_PHONE_DIGITS = 7;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

function isValidPhone(phone: string): boolean {
  const trimmed = phone.trim();
  if (!trimmed) return false;
  return PHONE_REGEX.test(trimmed) && trimmed.replace(/\D/g, "").length >= MIN_PHONE_DIGITS;
}

/** General contact form — orders, questions, feedback, anything. */
export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const submitting = status.state === "submitting";

  const update =
    (field: keyof ContactFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
      // Clear stale feedback once the visitor starts editing again.
      if (status.state === "success" || status.state === "error") setStatus({ state: "idle" });
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    if (!isValidEmail(formData.email)) {
      setStatus({
        state: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    if (!isValidPhone(formData.phone)) {
      setStatus({
        state: "error",
        message: "Please enter a valid phone number with at least 7 digits.",
      });
      return;
    }

    setStatus({ state: "submitting" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = (await res.json().catch(() => null)) as {
        error?: string;
        fields?: Partial<Record<keyof ContactFormData, string>>;
      } | null;

      if (!res.ok) {
        const fieldMessages = data?.fields ? Object.values(data.fields).join(" ") : "";
        setStatus({
          state: "error",
          message:
            fieldMessages ||
            data?.error ||
            "Something went wrong sending your message. Please try again.",
        });
        return;
      }

      setStatus({ state: "success", name: formData.name.trim() });
      setFormData(EMPTY_FORM);
    } catch {
      setStatus({
        state: "error",
        message: "Network error — please check your connection and try again.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-busy={submitting}
      className="rounded-lg border border-[#e7ddd0] bg-white p-6 sm:p-10"
    >
      <h2 className="font-display text-ink text-3xl uppercase sm:text-4xl">Send us a message</h2>
      <p className="mt-2 text-sm text-[#6b6259]">
        Place an order, ask a question, or share feedback — we read every message.
      </p>

      <fieldset disabled={submitting} className="contents">
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className={labelClass}>
              Full name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              maxLength={100}
              autoComplete="name"
              placeholder="Your name"
              value={formData.name}
              onChange={update("name")}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="contact-email" className={labelClass}>
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              maxLength={150}
              autoComplete="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={update("email")}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="contact-phone" className={labelClass}>
              Phone
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              required
              maxLength={30}
              pattern="[0-9+().\-\s]{7,30}"
              title="Please enter a valid phone number (at least 7 digits)."
              autoComplete="tel"
              placeholder="(773) 555-0123"
              value={formData.phone}
              onChange={update("phone")}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="contact-subject" className={labelClass}>
              Subject
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              required
              maxLength={150}
              placeholder="New order, question, feedback…"
              value={formData.subject}
              onChange={update("subject")}
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-5">
          <label htmlFor="contact-message" className={labelClass}>
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            maxLength={5000}
            placeholder="What can we help you with?"
            value={formData.message}
            onChange={update("message")}
            className={inputClass}
          />
        </div>
      </fieldset>

      <div aria-live="polite" role="status">
        {status.state === "success" && (
          <div className="mt-6 flex items-start gap-3 rounded-sm border border-green-200 bg-green-50 p-4 text-sm text-green-900">
            <Check className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="font-semibold">Message sent!</p>
              <p className="mt-1">
                Thanks{status.name ? `, ${status.name.split(" ")[0]}` : ""}. {COMPANY.owners.tash}{" "}
                or {COMPANY.owners.bill} will get back to you within 24 hours.{" "}
                <a
                  href={getSmsLink(
                    `Hi ${COMPANY.owners.combined}, I just sent a message on the website${status.name ? ` (${status.name})` : ""}.`
                  )}
                  className="font-semibold underline"
                >
                  Text us for a faster reply
                </a>
                .
              </p>
            </div>
          </div>
        )}
        {status.state === "error" && (
          <div className="mt-6 flex items-start gap-3 rounded-sm border border-red-200 bg-red-50 p-4 text-sm text-red-900">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="font-semibold">Your message wasn&apos;t sent.</p>
              <p className="mt-1">
                {status.message} You can also text us at{" "}
                <a href={COMPANY.contacts.phone.sms} className="font-semibold underline">
                  {COMPANY.contacts.phone.display}
                </a>
                .
              </p>
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="group mt-6 flex w-full items-center justify-center gap-2 rounded-sm bg-[#141210] py-4 text-base font-semibold text-white transition-colors hover:bg-[#2e2a27] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? (
          <>
            Sending…
            <Loader2 className="h-4 w-4 animate-spin" />
          </>
        ) : (
          <>
            Send Message
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
      <p className="mt-4 text-center text-sm text-[#6b6259]">
        We reply within 24 hours — or text{" "}
        <a href={COMPANY.contacts.phone.sms} className="text-ink font-semibold hover:underline">
          {COMPANY.contacts.phone.display}
        </a>
        .
      </p>
    </form>
  );
}
