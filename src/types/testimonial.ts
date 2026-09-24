export interface Testimonial {
  quote: string;
  name: string;
  /** Shown after the name, e.g. "Chicago, IL · 40 reunion tees" */
  detail: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Sample copy for layout review only — never rendered in production builds */
  isPlaceholder?: boolean;
}
