export type ServiceType = "apparel" | "catering" | "both";

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  quantity: string;
  eventDate: string;
  notes: string;
}
