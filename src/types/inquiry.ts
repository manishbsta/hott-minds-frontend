export type ServiceType = "apparel" | "catering" | "both";

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  /** Apparel: date the order is needed by. Catering: event date. */
  neededBy: string;
  notes: string;
}
