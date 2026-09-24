import { COMPANY } from "@/constants/company";
import { renderOgImage } from "@/lib/og-image";

export const alt = `Request a custom apparel or catering quote from ${COMPANY.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "Direct contact & custom quotes",
    title: "Start your order.",
    accent: "Get a quote.",
    tagline: `Text ${COMPANY.contacts.phone.display} or send your artwork — we reply within 24 hours.`,
    image: "/images/tshirt-reunion.jpg",
  });
}
