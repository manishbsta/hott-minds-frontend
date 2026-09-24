import type { Testimonial } from "@/types";

/**
 * Customer testimonials.
 *
 * TODO: The entries below are made-up sample reviews for layout and client-demo purposes.
 * Replace them with real customer reviews (quote, name, detail, rating) and remove
 * `isPlaceholder`. Placeholder entries only render in development, so a section with no
 * real reviews is hidden in production — do not remove the flag from invented reviews.
 */

export const APPAREL_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Ordered 45 shirts for our family reunion with Grandma's photo on the front and everybody's names on the back. The proof came back the next morning and the colors were perfect. Two washes later, still looks brand new.",
    name: "Denise W.",
    detail: "South Shore, Chicago · 45 reunion tees",
    rating: 5,
    isPlaceholder: true,
  },
  {
    quote:
      "I texted a sketch for my small clothing brand and they turned it into a clean print on heavyweight hoodies. No setup fees, no minimum — I started with 6 and I've reordered twice since.",
    name: "Marcus T.",
    detail: "Bronzeville, Chicago · Brand hoodies",
    rating: 5,
    isPlaceholder: true,
  },
  {
    quote:
      "Needed one shirt for my son's graduation and they treated it like a big order. Shipped to Atlanta in four days and the print is soft, not that stiff plastic feel.",
    name: "Tanya B.",
    detail: "Atlanta, GA · 1 custom tee",
    rating: 5,
    isPlaceholder: true,
  },
];

export const CATERING_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Ms. Tash catered my mother's 70th birthday — BBQ chicken, ribs, and mac & cheese for 40 people. Every pan was gone. We went over $200 and got a lemon pound cake free, and it was the best part of the night.",
    name: "Angela R.",
    detail: "Chatham, Chicago · 70th birthday party",
    rating: 5,
    isPlaceholder: true,
  },
  {
    quote:
      "The Hennessy rum infusion cake is dangerous. Moist, soaked all the way through, and it arrived beautifully boxed. I've ordered three for holidays now.",
    name: "Kevin J.",
    detail: "Oak Park, IL · Rum infusion cakes",
    rating: 5,
    isPlaceholder: true,
  },
  {
    quote:
      "They handled the food for my father's repast on short notice. I just texted what we needed, and everything was hot, on time, and plenty for the family. One less thing to worry about on a hard day.",
    name: "Sharon M.",
    detail: "Hyde Park, Chicago · Repast catering",
    rating: 5,
    isPlaceholder: true,
  },
];
