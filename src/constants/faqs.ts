import { COMPANY } from "@/constants/company";
import type { FaqItem } from "@/types";

/**
 * Frequently asked questions shown on the Contact page. The same text feeds FAQPage structured
 * data and /llms.txt, so answers must stay accurate, self-contained, and match what's on the page.
 */
export const FAQS: FaqItem[] = [
  {
    question: "How much do custom shirts cost?",
    answer: `Adult shirts are ${COMPANY.pricing.adultTee} and youth shirts are ${COMPANY.pricing.youthTee}, with a front print included. Full-back printing is ${COMPANY.pricing.fullBackAddon} depending on image size. Hoodies, caps, and mugs are available by order.`,
  },
  {
    question: "Is there a minimum order quantity?",
    answer:
      "No! We print single custom shirts as well as 100+ group orders for parties and family reunions.",
  },
  {
    question: "How long does a custom apparel order take?",
    answer: `You get a digital art proof within 24 hours showing sizing, placement, and colors. Once you approve it, orders are printed in 3-5 days for local ${COMPANY.contacts.location.city} pickup or tracked shipping nationwide.`,
  },
  {
    question: "How should I prepare my artwork files?",
    answer:
      "High-resolution files work best (300 DPI transparent PNG or vector formats). All pictures and artwork must be clear and sharp.",
  },
  {
    question: "What is DTF printing?",
    answer:
      "DTF (direct-to-film) printing transfers full-color artwork from a printed film onto fabric with heat and adhesive powder. It prints photos, gradients, and unlimited colors with no per-color setup fees, stretches with the fabric, and lasts 60+ washes without cracking or peeling.",
  },
  {
    question: "What's on the catering menu?",
    answer:
      "Hot party pans of grilled BBQ chicken, smoked ribs, baked mac & cheese, green beans & collard greens, and cornbread & potato salad (half pans serve 10-12 guests, full pans 20-25), plus homemade pound cakes (lemon, vanilla, butter, sweet potato) and rum infusion cakes (Hennessy, Caribbean coffee, midnight mocha).",
  },
  {
    question: "How does the free cake catering offer work?",
    answer: `Any food catering order over ${COMPANY.pricing.cateringCakePromoThreshold} receives a free homemade whole Pound Cake (Lemon, Vanilla, Butter, or Sweet Potato). Excludes infusion cakes.`,
  },
  {
    question: "Can I get custom shirts and catering for the same event?",
    answer:
      "Yes. We bundle matching custom front-and-back shirts with hot buffet catering for family reunions, birthdays, graduations, and corporate gatherings — just text or call us about both.",
  },
  {
    question: "Do you accept returns or exchanges?",
    answer: `${COMPANY.operations.salesPolicyNotice} That's why every apparel order includes a digital art proof for you to approve before we print.`,
  },
];
