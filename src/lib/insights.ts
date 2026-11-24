import type { ComponentType } from "react";
import { INSIGHT_ENTRIES, type InsightStatus } from "@/content/insights";

export interface InsightPost {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  /** YYYY-MM-DD publish date. */
  date: string;
  /** YYYY-MM-DD. Falls back to `date` when the post has no `updated` field. */
  updated: string;
  author: string;
  readingTime: string;
  status: InsightStatus;
  Content?: ComponentType;
}

const ALL_POSTS: InsightPost[] = INSIGHT_ENTRIES.map((entry) => ({
  ...entry,
  updated: entry.updated ?? entry.date,
})).sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));

const ALLOW_DRAFTS = process.env.NODE_ENV !== "production" || process.env.VERCEL_ENV === "preview";

/** Published posts only, newest first. Drives /insights, nav, sitemap.xml and llms.txt. */
export function getInsightPosts(): InsightPost[] {
  return ALL_POSTS.filter((post) => post.status === "published");
}

/**
 * Look up a single post by slug.
 * Published posts are always returned; drafts are viewable locally and on Vercel preview builds.
 */
export function getInsightPost(slug: string): InsightPost | undefined {
  const post = ALL_POSTS.find((entry) => entry.slug === slug);
  if (!post) return undefined;
  if (post.status === "draft" && !ALLOW_DRAFTS) return undefined;
  return post;
}

/** Static params for /insights/[slug] (excludes standalone routes that omit `Content`). */
export function getInsightStaticParams(): { slug: string }[] {
  const visible = ALLOW_DRAFTS ? ALL_POSTS : getInsightPosts();
  return visible.filter((post) => Boolean(post.Content)).map((post) => ({ slug: post.slug }));
}
