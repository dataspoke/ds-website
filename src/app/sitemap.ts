import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/content/case-studies";
import { INDUSTRIES } from "@/content/industries";
import { SERVICE_LINES } from "@/content/services";
import { SITE_URL, WORK_PUBLISHED } from "@/lib/constants";
import { getInsightPosts } from "@/lib/insights";

// Built once at `next build` and served as a static file. Not listed: the /lp/* ad landing
// pages (no nav, not for search), and non-page routes (icons, share images, llms.txt).

// Used when git can't date a page (no .git in the build, or history cut off by a shallow clone).
const FALLBACK_LASTMOD = "2026-10-28";
const ROOT = process.cwd();

function git(args: string[]): string {
  try {
    return execFileSync("git", args, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return "";
  }
}

// A shallow clone's oldest commits appear to add every file they hold, so their dates say nothing about a page.
function shallowBoundary(): Set<string> {
  const file = git(["rev-parse", "--git-path", "shallow"]);
  if (!file) return new Set();
  try {
    return new Set(fs.readFileSync(path.resolve(ROOT, file), "utf8").split(/\s+/).filter(Boolean));
  } catch {
    return new Set();
  }
}

/** The source files each page is built from. Shared chrome (layout, header, footer) is left out. */
function pageSources(pagePath: string): string[] {
  if (pagePath === "/services/claude") {
    return ["src/app/services/claude", "src/content/claude-services.ts", "src/components/services/claude-journey.tsx"];
  }
  if (pagePath.startsWith("/services/")) {
    return ["src/app/services/[line]", "src/content/services.ts", "src/content/service-pages.ts", "src/components/services"];
  }
  if (pagePath.startsWith("/industries/")) {
    return ["src/app/industries/[slug]", "src/content/industries.ts", "src/components/industries"];
  }
  if (pagePath.startsWith("/work/")) return ["src/app/work/[slug]", "src/components/work"];
  const sources: Record<string, string[]> = {
    "/": ["src/app/page.tsx", "src/content/home.ts", "src/components/home"],
    "/about": ["src/app/about", "src/content/home.ts", "src/components/home"],
    "/approach": ["src/app/approach", "src/content/approach.ts", "src/components/home"],
    "/contact": ["src/app/contact", "src/components/contact"],
    "/free-estimate": ["src/app/free-estimate", "src/content/free-estimate.ts", "src/components/estimate"],
    "/industries": ["src/app/industries/page.tsx", "src/content/industries.ts", "src/components/industries"],
    "/insights": ["src/app/insights/page.tsx"],
    "/privacy": ["src/app/privacy", "src/content/privacy.ts"],
    "/services": ["src/app/services/page.tsx", "src/content/services.ts", "src/content/approach.ts", "src/components/services"],
    "/work": ["src/app/work/page.tsx", "src/components/work", "src/content/case-studies.ts"],
  };
  return sources[pagePath] ?? [`src/app${pagePath}`];
}

function latest(dates: (string | undefined)[]): string | undefined {
  const known = dates.filter((d): d is string => Boolean(d));
  if (known.length === 0) return undefined;
  return known.reduce((a, b) => (new Date(a) > new Date(b) ? a : b));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getInsightPosts();
  const boundary = shallowBoundary();

  /** Date of the last commit touching any of `files`, or undefined. */
  const gitLastmod = (files: string[]): string | undefined => {
    const [hash, date] = git(["log", "-1", "--format=%H %cI", "--", ...files]).split(" ");
    if (!hash || !date || boundary.has(hash)) return undefined;
    return date;
  };

  /** Real per-page lastmod: git history of the page's sources, plus content dates where a page has them. */
  const lastmodFor = (pagePath: string): string => {
    if (pagePath.startsWith("/insights/")) {
      const post = posts.find((p) => `/insights/${p.slug}` === pagePath);
      if (post) return new Date(post.updated).toISOString();
    }
    const dates = [gitLastmod(pageSources(pagePath))];
    if (pagePath.startsWith("/work/")) {
      dates.push(CASE_STUDIES.find((c) => `/work/${c.slug}` === pagePath)?.dates?.modified);
    }
    if (pagePath === "/insights") dates.push(...posts.map((p) => p.updated));
    return new Date(latest(dates) ?? FALLBACK_LASTMOD).toISOString();
  };

  const paths = [
    "/",
    "/about",
    "/approach",
    "/contact",
    "/free-estimate",
    "/privacy",
    "/services",
    ...SERVICE_LINES.map((l) => `/services/${l.slug}`),
    "/services/claude",
    "/industries",
    ...INDUSTRIES.map((i) => `/industries/${i.slug}`),
    // /insights is noindex until a post is published (see src/app/insights/page.tsx).
    ...(posts.length > 0 ? ["/insights", ...posts.map((p) => `/insights/${p.slug}`)] : []),
    ...(WORK_PUBLISHED ? ["/work", ...CASE_STUDIES.map((c) => `/work/${c.slug}`)] : []),
  ];

  return paths.map((p) => ({
    url: p === "/" ? SITE_URL : `${SITE_URL}${p}`,
    lastModified: lastmodFor(p),
  }));
}
