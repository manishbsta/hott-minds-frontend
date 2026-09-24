import { COMPANY } from "@/constants/company";
import { CAKES, SAVORY_FEASTS } from "@/constants/catering";
import { FAQS } from "@/constants/faqs";
import { PRODUCTS } from "@/constants/products";
import { PAGES, SITE, absoluteUrl } from "@/constants/site";

// Built once at build time from the same constants the pages render.
export const dynamic = "force-static";

/** Markdown summary of the business for AI assistants — see https://llmstxt.org */
function buildLlmsTxt(): string {
  const { phone, email, location } = COMPANY.contacts;
  const cakes = (type: "pound" | "infusion") =>
    CAKES.filter((cake) => cake.type === type).map((cake) => `- ${cake.name}: ${cake.description}`);

  return [
    `# ${COMPANY.name}`,
    "",
    `> ${SITE.description}`,
    "",
    `- Location: ${location.city}, ${location.region} — ${location.coverage}`,
    `- Phone / text orders: ${phone.display}`,
    `- Email: ${email.display}`,
    `- Owners: ${COMPANY.owners.combined}`,
    `- Legal name: ${COMPANY.legalName}`,
    `- Policy: ${COMPANY.operations.salesPolicyNotice}`,
    "",
    "## Pages",
    "",
    ...Object.values(PAGES).map(
      (page) => `- [${page.name}](${absoluteUrl(page.path)}): ${page.description}`
    ),
    "",
    `## ${COMPANY.divisions.apparel} — custom DTF apparel`,
    "",
    "Full-color DTF (direct-to-film) printing on tees, hoodies, caps, bags, and drinkware, hand-pressed locally in Chicago.",
    "",
    "- No minimum order: 1 shirt or 100+ event pieces",
    "- No color setup fees; photos, gradients, and unlimited colors",
    `- ${COMPANY.operations.proofTurnaround}`,
    "- 3-5 day turnaround; local Chicago pickup or tracked shipping nationwide",
    "- Soft-hand transfers that stretch and last 60+ washes without cracking or peeling",
    "",
    "### Standard pricing",
    "",
    `- Adult shirt (front print included): ${COMPANY.pricing.adultTee}`,
    `- Youth shirt: ${COMPANY.pricing.youthTee}`,
    `- Full-back printing: ${COMPANY.pricing.fullBackAddon} (varies with image size)`,
    "- Hoodies, caps & mugs: available by order",
    "",
    "### Featured products",
    "",
    ...PRODUCTS.map(
      (product) =>
        `- ${product.name} (${product.categoryLabel}) — ${product.price}${product.youthPrice ? ` adult, ${product.youthPrice} youth` : ""}: ${product.description}`
    ),
    "",
    "### How ordering works",
    "",
    "1. Send your art: text or email high-resolution artwork or a sketch (vector or 300 DPI PNG preferred).",
    "2. Approve the proof: a digital art proof within 24 hours shows exact sizing, placement, and colors.",
    "3. We print & press on commercial equipment with high-density DTF inks.",
    "4. Pickup in Chicago or tracked shipping nationwide in 3-5 days.",
    "",
    `## ${COMPANY.divisions.catering} — catering & cakes`,
    "",
    `Party catering in ${location.city} for birthdays, reunions, parties, repasts, and celebrations. Orders over ${COMPANY.pricing.cateringCakePromoThreshold} get a free whole homemade pound cake (Lemon, Vanilla, Butter, or Sweet Potato; excludes infusion cakes).`,
    "",
    "### Hot party pans",
    "",
    ...SAVORY_FEASTS.map((item) => `- ${item.title} (${item.serves}): ${item.desc}`),
    "",
    "### Homemade pound cakes (whole bundt cakes)",
    "",
    ...cakes("pound"),
    "",
    "### Rum infusion cakes (whole bundt cakes)",
    "",
    ...cakes("infusion"),
    "",
    "## FAQ",
    "",
    ...FAQS.flatMap((faq) => [`### ${faq.question}`, "", faq.answer, ""]),
    "## Optional",
    "",
    `- [Sitemap](${absoluteUrl("/sitemap.xml")})`,
    "",
  ].join("\n");
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
