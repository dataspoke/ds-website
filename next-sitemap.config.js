/* eslint-disable @typescript-eslint/no-require-imports -- next-sitemap loads this file as CommonJS. */
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const matter = require("gray-matter");

// Used when git can't date a page (no .git in the build, or history cut off by a shallow clone).
const FALLBACK_LASTMOD = "2026-10-28";

/** Published insight posts, by the same rule as src/lib/insights.ts: `.md` files not starting with `_`. */
function insightPosts() {
  const dir = path.join(__dirname, "content/insights");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"))
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
      return { slug: file.replace(/\.md$/i, ""), updated: data.updated ?? data.date };
    });
}

function git(args) {
  try {
    return execFileSync("git", args, { cwd: __dirname, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return "";
  }
}

// A shallow clone's oldest commits appear to add every file they hold, so their dates say nothing about a page.
const shallowBoundary = (() => {
  const file = git(["rev-parse", "--git-path", "shallow"]);
  if (!file) return new Set();
  try {
    return new Set(fs.readFileSync(path.resolve(__dirname, file), "utf8").split(/\s+/).filter(Boolean));
  } catch {
    return new Set();
  }
})();

/** Date of the last commit touching any of `files`, or undefined. */
function gitLastmod(files) {
  const [hash, date] = git(["log", "-1", "--format=%H %cI", "--", ...files]).split(" ");
  if (!hash || !date || shallowBoundary.has(hash)) return undefined;
  return date;
}

/** `dates.modified` per case study slug, as kept by hand in src/content/case-studies.ts. */
function caseStudyModified() {
  const source = fs.readFileSync(path.join(__dirname, "src/content/case-studies.ts"), "utf8");
  const out = {};
  for (const chunk of source.split(/\n\s*slug: "/).slice(1)) {
    const slug = chunk.slice(0, chunk.indexOf('"'));
    const modified = chunk.match(/modified: "([^"]+)"/);
    if (modified) out[slug] = modified[1];
  }
  return out;
}

/** The source files each page is built from. Shared chrome (layout, header, footer) is left out. */
function pageSources(pagePath) {
  if (pagePath.startsWith("/services/")) {
    return ["src/app/services/[line]", "src/content/services.ts", "src/content/service-pages.ts", "src/components/services"];
  }
  if (pagePath.startsWith("/work/")) return ["src/app/work/[slug]", "src/components/work"];
  const sources = {
    "/": ["src/app/page.tsx", "src/content/home.ts", "src/components/home"],
    "/about": ["src/app/about", "src/content/home.ts", "src/components/home"],
    "/approach": ["src/app/approach", "src/content/approach.ts", "src/components/home"],
    "/contact": ["src/app/contact", "src/components/contact"],
    "/free-estimate": ["src/app/free-estimate", "src/content/free-estimate.ts", "src/components/estimate"],
    "/insights": ["src/app/insights/page.tsx"],
    "/privacy": ["src/app/privacy", "src/content/privacy.ts"],
    "/services": ["src/app/services/page.tsx", "src/content/services.ts", "src/content/approach.ts", "src/components/services"],
    "/work": ["src/app/work/page.tsx", "src/components/work", "src/content/case-studies.ts"],
  };
  return sources[pagePath] ?? [`src/app${pagePath}`];
}

function latest(dates) {
  const known = dates.filter(Boolean);
  if (known.length === 0) return undefined;
  return known.reduce((a, b) => (new Date(a) > new Date(b) ? a : b));
}

const posts = insightPosts();
const studyDates = caseStudyModified();

/** Real per-page lastmod: git history of the page's sources, plus content dates where a page has them. */
function lastmodFor(pagePath) {
  if (pagePath.startsWith("/insights/")) {
    const post = posts.find((p) => `/insights/${p.slug}` === pagePath);
    if (post?.updated) return new Date(post.updated).toISOString();
  }
  const dates = [gitLastmod(pageSources(pagePath))];
  if (pagePath.startsWith("/work/")) dates.push(studyDates[pagePath.slice("/work/".length)]);
  if (pagePath === "/insights") dates.push(...posts.map((p) => p.updated));
  const date = latest(dates) ?? FALLBACK_LASTMOD;
  return new Date(date).toISOString();
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.dataspoke.io",
  generateRobotsTxt: true,
  // A small site: list pages directly in sitemap.xml instead of an index pointing at sitemap-0.xml.
  generateIndexSitemap: false,
  // Non-page routes (share image, logo, icons, llms.txt) and the no-nav /lp/* ad landing pages.
  exclude: [
    "/opengraph-image",
    "/twitter-image",
    "/logo.png",
    "/icon.svg",
    "/icon.png",
    "/icon1.png",
    "/icon2.png",
    "/apple-icon.png",
    "/favicon.ico",
    "/manifest.webmanifest",
    "/icons/icon-192.png",
    "/icons/icon-512.png",
    "/llms.txt",
    "/lp",
    "/lp/*",
    // /insights is noindex until a post is published (see src/app/insights/page.tsx).
    ...(posts.length === 0 ? ["/insights"] : []),
  ],
  // /work renders per request (the ?line= filter), so next-sitemap doesn't find it in the static output.
  additionalPaths: async (config) => [await config.transform(config, "/work")],
  transform: async (config, pagePath) => ({
    loc: pagePath,
    lastmod: lastmodFor(pagePath),
    changefreq: config.changefreq,
    priority: config.priority,
  }),
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      // Called out so a later edit can't quietly block answer-engine crawlers.
      // `*` already allows every other bot, including training crawlers.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
    ],
    transformRobotsTxt: async (_config, robotsTxt) =>
      `${robotsTxt.trimEnd()}\n\n# LLM-readable site summary\n# https://www.dataspoke.io/llms.txt\n`,
  },
};
