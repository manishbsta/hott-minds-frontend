import { MessageSquare, Plus } from "lucide-react";
import { COMPANY, getSmsLink } from "@/constants/company";
import type { FaqItem } from "@/types";

interface FaqSectionProps {
  faqs: FaqItem[];
}

/**
 * FAQ accordion built on native <details> so every answer ships in the HTML for crawlers.
 * Sharing `name` makes it exclusive: opening one question closes the others.
 */
export default function FaqSection({ faqs }: FaqSectionProps) {
  return (
    <section
      id="faq"
      className="scroll-mt-(--header-height) border-t border-[#e7ddd0] py-16 sm:py-24"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-16 gap-y-10 px-4 sm:px-6 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:px-8">
        {/* Heading */}
        <div className="lg:col-span-5">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#ff5c1a] uppercase">FAQ</p>
          <h2 className="font-display text-ink mt-3 text-4xl leading-[0.95] uppercase sm:text-5xl">
            Questions, <br />
            answered.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[#6b6259]">
            Pricing, turnaround, artwork files, and catering — the things customers ask us most
            before they order.
          </p>
        </div>

        {/* Accordion */}
        <div className="border-b border-[#e7ddd0] lg:col-span-7 lg:col-start-6 lg:row-span-2">
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              name="faq"
              open={index === 0}
              className="faq-item group border-t border-[#e7ddd0]"
            >
              <summary className="flex list-none items-start gap-5 rounded-sm py-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff5c1a] [&::-webkit-details-marker]:hidden">
                <span className="font-display w-7 shrink-0 pt-0.5 text-sm text-[#ff5c1a] tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-ink flex-1 text-base font-semibold sm:text-lg">
                  {faq.question}
                </h3>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#d9ccbb] text-[#141210] transition-colors duration-200 group-open:border-[#ff5c1a] group-open:bg-[#ff5c1a] group-open:text-white group-hover:border-[#ff5c1a]">
                  <Plus className="h-4 w-4 transition-transform duration-300 group-open:rotate-45" />
                </span>
              </summary>
              <p className="max-w-2xl pr-12 pb-6 pl-12 text-[15px] leading-relaxed text-[#6b6259]">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        {/* Still-have-questions CTA */}
        <div className="self-start rounded-2xl bg-[#141210] p-7 text-[#faf6ef] lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:col-span-5">
          <h3 className="font-display text-2xl text-white uppercase">Still have a question?</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#faf6ef]/70">
            Text {COMPANY.owners.combined} directly — send a photo of your design or your event
            details and we&apos;ll reply within 24 hours.
          </p>
          <a
            href={getSmsLink(`Hi ${COMPANY.owners.combined}, I have a question`)}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#ff5c1a] px-5 py-3 text-xs font-bold tracking-wider text-white uppercase transition-colors duration-200 hover:bg-[#ff7538]"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Text Us</span>
          </a>
        </div>
      </div>
    </section>
  );
}
