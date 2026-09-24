import type { MetadataRoute } from "next";
import { COMPANY } from "@/constants/company";
import { PAGES, SITE } from "@/constants/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${COMPANY.name} — Custom DTF Apparel & Catering`,
    short_name: COMPANY.name,
    description: PAGES.home.description,
    start_url: "/",
    display: "standalone",
    background_color: SITE.backgroundColor,
    theme_color: SITE.themeColor,
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
