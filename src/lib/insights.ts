import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface InsightPost {
  slug: string;
  title: string;
  description: string;
  /** YYYY-MM-DD from frontmatter. */
  date: string;
  /** YYYY-MM-DD. Falls back to `date` when the post has no `updated` field. */
  updated: string;
  author: string;
  body: string;
}

const DIR = path.join(process.cwd(), "content/insights");

function asDate(value: unknown, file: string, key: string): string {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  throw new Error(`${file}: ${key} must be a quoted YYYY-MM-DD date`);
}

function asText(value: unknown, file: string, key: string): string {
  if (typeof value === "string" && value.trim()) return value.trim();
  throw new Error(`${file}: ${key} is required`);
}

function readPost(fileName: string): InsightPost {
  const slug = fileName.replace(/\.md$/i, "");
  const raw = fs.readFileSync(path.join(DIR, fileName), "utf8");
  const { data, content } = matter(raw);
  const date = asDate(data.date, fileName, "date");
  const updated = data.updated == null ? date : asDate(data.updated, fileName, "updated");
  return {
    slug,
    title: asText(data.title, fileName, "title"),
    description: asText(data.description, fileName, "description"),
    date,
    updated,
    author: asText(data.author, fileName, "author"),
    body: content.trim(),
  };
}

/** Published posts. Files starting with `_` are templates and are skipped. */
export function getInsightPosts(): InsightPost[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"))
    .map(readPost)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));
}

export function getInsightPost(slug: string): InsightPost | undefined {
  return getInsightPosts().find((post) => post.slug === slug);
}
