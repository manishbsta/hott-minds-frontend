/**
 * Centralized Company Constants for Hott Minds
 * Covers brand identifiers, owners, contact channels, standard pricing, and studio policies.
 */

export const COMPANY = {
  name: "Hott Minds",
  legalName: "H.M.I Industries LLC",
  divisions: {
    apparel: "Designs by Hott Minds",
    catering: "Hott Meals Instantly (H.M.I)",
  },
  contacts: {
    owners: "Ms. Tash & Mr. Bill",
    phone: {
      display: "(773) 417-9901",
      plain: "773-417-9901",
      raw: "7734179901",
      tel: "tel:7734179901",
      sms: "sms:7734179901",
    },
    email: {
      display: "HMINDUSTRIESLLC@YAHOO.COM",
      mailto: "mailto:HMINDUSTRIESLLC@YAHOO.COM",
    },
    location: {
      cityState: "Chicago, IL",
      coverage: "Chicago Local Pickup/Delivery & Nationwide Shipping",
    },
  },
  pricing: {
    adultTee: "$25.00",
    youthTee: "$15.00",
    fullBackAddon: "+$5.00 & up",
    cateringCakePromoThreshold: "$200.00",
    cateringCakePromoNotice:
      "Spend $200 or more on catering party pans and receive 1 FREE regular pound cake (Rum infusion cakes excluded).",
  },
  policies: [
    "No refunds on custom printed shirts, DTF orders, or personalized merchandise.",
    "High-resolution artwork required (minimum 300 DPI recommended, transparent PNG preferred).",
    "50% deposit required on bulk apparel and custom catering reservations before production.",
    "Standard orders ready within 3-5 business days. Expedited rush turnaround available.",
  ],
} as const;

export default COMPANY;
