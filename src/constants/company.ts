/**
 * Centralized Company Constants for Hott Minds
 * Single source of truth for brand identity, owners, contact channels, location, operations, pricing, and policies.
 */

export const COMPANY = {
  // Brand & Legal Identity
  name: "Hott Minds",
  legalName: "H.M.I Industries LLC",
  tagline: "Chicago's Premier Custom DTF Apparel & H.M.I Catering",
  divisions: {
    apparel: "Designs by Hott Minds",
    apparelShort: "Custom Apparel",
    catering: "Hott Meals Instantly (H.M.I)",
    cateringShort: "H.M.I Catering",
  },

  // Owners & Personnel
  owners: {
    combined: "Ms. Tash & Mr. Bill",
    tash: "Ms. Tash",
    bill: "Mr. Bill",
  },

  // Contact Channels
  contacts: {
    owners: "Ms. Tash & Mr. Bill", // Preserved for direct access
    phone: {
      display: "(773) 417-9901",
      plain: "773-417-9901",
      raw: "7734179901",
      tel: "tel:7734179901",
      sms: "sms:7734179901",
    },
    email: {
      display: "HMINDUSTRIESLLC@YAHOO.COM",
      raw: "hmindustriesllc@yahoo.com",
      mailto: "mailto:HMINDUSTRIESLLC@YAHOO.COM",
    },
    location: {
      city: "Chicago",
      state: "IL",
      cityState: "Chicago, IL",
      coverage: "Chicago Local Pickup/Delivery & Nationwide Shipping",
      serviceArea: "Chicago, IL • Nationwide Apparel Shipping",
    },
  },

  // Operations & Turnaround
  operations: {
    proofTurnaround: "24-hour digital art proof provided before print",
    orderTurnaround:
      "Standard orders ready within 3-5 business days. Expedited rush turnaround available.",
    salesPolicyNotice: "All sales are final. No Returns No Exchanges.",
    artworkNotice:
      "High-resolution artwork required (minimum 300 DPI recommended, transparent PNG preferred). All pictures must be clear and sharp.",
  },

  // Standard Pricing & Promos
  pricing: {
    adultTee: "$25.00",
    youthTee: "$15.00",
    fullBackAddon: "+$5.00 & up",
    cateringCakePromoThreshold: "$200.00",
    cateringCakePromoNotice:
      "Spend $200 or more on catering party pans and receive 1 FREE regular pound cake (Rum infusion cakes excluded).",
  },

  // Studio Policies
  policies: [
    "No refunds on custom printed shirts, DTF orders, or personalized merchandise.",
    "High-resolution artwork required (minimum 300 DPI recommended, transparent PNG preferred).",
    "50% deposit required on bulk apparel and custom catering reservations before production.",
    "Standard orders ready within 3-5 business days. Expedited rush turnaround available.",
  ],
} as const;

/**
 * Generate a pre-filled SMS order/inquiry link
 */
export function getSmsLink(message?: string): string {
  if (!message) return COMPANY.contacts.phone.sms;
  return `sms:${COMPANY.contacts.phone.raw}?body=${encodeURIComponent(message)}`;
}

export default COMPANY;
