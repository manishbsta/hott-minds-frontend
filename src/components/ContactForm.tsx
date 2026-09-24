"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { COMPANY, getSmsLink } from "@/constants/company";
import type { ContactFormData } from "@/types";

const EMPTY_FORM: ContactFormData = {
  name: "",
  phone: "",
  subject: "",
  message: "",
};

const labelClass = "mb-2 block text-xs font-bold tracking-[0.12em] text-[#6b6259] uppercase";
const inputClass =
  "text-ink w-full rounded-sm border border-[#e7ddd0] bg-[#fcfaf6] px-4 py-3 text-base placeholder:text-[#a39a90] focus:border-[#141210] focus:ring-1 focus:ring-[#141210] focus:outline-none";

/** General contact form — orders, questions, feedback, anything. */
export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

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
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="rounded-lg border border-[#e7ddd0] bg-white p-6 text-center sm:p-10">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#141210] text-white">
          <Check className="h-6 w-6" />
        </div>
        <h2 className="font-display text-ink mt-5 text-3xl uppercase">Message received</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#6b6259]">
          Thanks{formData.name ? `, ${formData.name.split(" ")[0]}` : ""}. {COMPANY.owners.tash} or{" "}
          {COMPANY.owners.bill} will get back to you within 24 hours.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={getSmsLink(
              `Hi ${COMPANY.owners.combined}, I just sent a message on the website${formData.name ? ` (${formData.name})` : ""}.`
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
            Send another message
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
      <h2 className="font-display text-ink text-3xl uppercase sm:text-4xl">Send us a message</h2>
      <p className="mt-2 text-sm text-[#6b6259]">
        Place an order, ask a question, or share feedback — we read every message.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Full name
          </label>
          <input
            id="contact-name"
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
          <label htmlFor="contact-phone" className={labelClass}>
            Phone
          </label>
          <input
            id="contact-phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="(773) 555-0123"
            value={formData.phone}
            onChange={update("phone")}
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contact-subject" className={labelClass}>
            Subject
          </label>
          <input
            id="contact-subject"
            type="text"
            required
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
          rows={5}
          required
          placeholder="What can we help you with?"
          value={formData.message}
          onChange={update("message")}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        className="group mt-6 flex w-full items-center justify-center gap-2 rounded-sm bg-[#141210] py-4 text-base font-semibold text-white transition-colors hover:bg-[#2e2a27]"
      >
        Send Message
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
