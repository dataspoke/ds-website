import type { ComponentType } from "react";
import { MissionCommandArticle } from "@/components/insights/mission-command-ai-agents";
import { COMPANY_BRAIN } from "@/content/company-brain";

export type InsightStatus = "draft" | "published";

export interface InsightEntry {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  /** YYYY-MM-DD publish date. */
  date: string;
  /** YYYY-MM-DD last-updated date. Omit when unchanged from `date`. */
  updated?: string;
  author: string;
  readingTime: string;
  status: InsightStatus;
  /** Omit when the post owns its own static route under src/app/insights/<slug>/page.tsx. */
  Content?: ComponentType;
}

/**
 * Registry of Insights articles.
 * Flip `status` between "draft" and "published" to control visibility on the live site:
 * drafts stay off /insights, the nav, sitemap.xml and llms.txt in production, while
 * remaining previewable locally and on Vercel preview builds at /insights/<slug>.
 */
export const INSIGHT_ENTRIES: InsightEntry[] = [
  {
    slug: "company-brain",
    title: COMPANY_BRAIN.title,
    description: COMPANY_BRAIN.metaDescription,
    eyebrow: "AI in practice",
    date: COMPANY_BRAIN.date,
    author: COMPANY_BRAIN.author,
    readingTime: COMPANY_BRAIN.readingTime,
    status: "published",
  },
  {
    slug: "mission-command-ai-agents",
    title: "Give your AI agents task and purpose.",
    description:
      "How the U.S. Army's seven mission command principles turn vague AI prompts into reliable delegation - without giving up control of the calls that matter.",
    eyebrow: "AI operations",
    date: "2026-11-23",
    author: "Nick Paul",
    readingTime: "4 min read",
    status: "published",
    Content: MissionCommandArticle,
  },
];
