/**
 * Centralized Company Constants for Hott Minds
 * Single source of truth for brand identity, owners, contact channels, location, operations, and pricing.
 */

export const COMPANY = {
  // Brand & Legal Identity
  name: "Hott Minds",
  legalName: "H.M.I Industries LLC",
  divisions: {
    apparel: "Designs by Hott Minds",
    catering: "Hott Meals Instantly (H.M.I)",
  },

  // Owners & Personnel
  owners: {
    combined: "Ms. Tash & Mr. Bill",
    tash: "Ms. Tash",
    bill: "Mr. Bill",
  },

  // Contact Channels
  contacts: {
    phone: {
      display: "(773) 417-9901",
      raw: "7734179901",
      international: "+1-773-417-9901",
      tel: "tel:7734179901",
      sms: "sms:7734179901",
    },
    email: {
      display: "hmindustriesllc@yahoo.com",
      mailto: "mailto:hmindustriesllc@yahoo.com",
    },
    location: {
      city: "Chicago",
      region: "IL",
      country: "US",
      coverage: "Chicago Local Pickup/Delivery & Nationwide Shipping",
      serviceArea: "Chicago, IL • Nationwide Apparel Shipping",
    },
    /**
     * Official profile URLs (Google Business Profile, Instagram, Facebook, TikTok, Yelp…).
     * Emitted as schema.org `sameAs` so search engines and AI assistants can tie them to this site.
     */
    profiles: [] as string[],
  },

  // Operations & Turnaround
  operations: {
    proofTurnaround: "24-hour digital art proof provided before print",
    salesPolicyNotice: "All sales are final. No Returns No Exchanges.",
  },

  // Standard Pricing & Promos
  pricing: {
    adultTee: "$25.00",
    youthTee: "$15.00",
    fullBackAddon: "+$5.00 & up",
    cateringCakePromoThreshold: "$200.00",
  },
} as const;

/**
 * Generate a pre-filled SMS order/inquiry link
 */
export function getSmsLink(message?: string): string {
  if (!message) return COMPANY.contacts.phone.sms;
  return `sms:${COMPANY.contacts.phone.raw}?body=${encodeURIComponent(message)}`;
}
