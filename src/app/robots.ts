import type { MetadataRoute } from "next";
import { SITE, absoluteUrl } from "@/constants/site";

export default function robots(): MetadataRoute.Robots {
  if (!SITE.isIndexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  // Everything is public. AI search and assistant crawlers (OAI-SearchBot, ChatGPT-User, GPTBot,
  // PerplexityBot, Claude-SearchBot, ClaudeBot, Google-Extended, Applebot-Extended…) are
  // intentionally allowed so the business can be found and cited in AI answers.
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
