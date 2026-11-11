import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

// The AI crawlers are called out so a later edit can't quietly block answer-engine crawlers.
// `*` already allows every other bot, including training crawlers.
// Next's robots.ts cannot emit comments, so the old "# llms.txt" pointer comment is gone.
// Crawlers that read llms.txt look for it at /llms.txt by convention.
const AI_CRAWLERS = ["GPTBot", "ChatGPT-User", "OAI-SearchBot", "ClaudeBot", "PerplexityBot", "Google-Extended"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }, ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" }))],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
