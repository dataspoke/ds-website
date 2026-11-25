import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/industries/breadcrumbs";
import { BreadcrumbJsonLd, ItemListJsonLd } from "@/components/shared/json-ld";
import { Section } from "@/components/shared/section";
import { formatLongDate } from "@/lib/dates";
import { getInsightPosts } from "@/lib/insights";
import { generateMetadata as pageMetadata } from "@/lib/metadata";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Insights", path: "/insights" },
];

export function generateMetadata(): Metadata {
  const posts = getInsightPosts();
  return pageMetadata({
    title: "Insights: running a business on data",
    description:
      "Plain-English articles for business owners on connecting your software, knowing your numbers and putting AI to work.",
    path: "/insights",
    // An empty index is thin. It indexes (and joins the sitemap, see src/app/sitemap.ts)
    // once src/content/insights.ts has a published post.
    noIndex: posts.length === 0,
  });
}

export default function InsightsPage() {
  const posts = getInsightPosts();

  return (
    <>
      <BreadcrumbJsonLd items={CRUMBS} />
      {posts.length > 0 && (
        <ItemListJsonLd
          path="/insights"
          name="DataSpoke Insights"
          items={posts.map((post) => ({ name: post.title, path: `/insights/${post.slug}` }))}
        />
      )}
      <Section>
        <div className="grid max-w-3xl gap-4">
          <Breadcrumbs items={CRUMBS} />
          <h1 className="text-4xl font-extrabold leading-[1.1] sm:text-5xl">Insights</h1>
          <p className="lede">
            Practical guides for business owners on delegation, connected data, and putting AI agents to work.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="mt-8 text-muted-foreground">No posts yet.</p>
        ) : (
          <ul className="mt-10 grid max-w-3xl gap-6">
            {posts.map((post) => (
              <li
                key={post.slug}
                className="grid gap-2.5 rounded-2xl border border-border bg-white p-6 transition-colors hover:border-brand"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.06em] text-primary">
                  <span>{post.eyebrow}</span>
                  <span aria-hidden="true" className="text-border">
                    ·
                  </span>
                  <time dateTime={post.date} className="font-medium normal-case tracking-normal text-muted-foreground">
                    {formatLongDate(post.date)}
                  </time>
                  <span aria-hidden="true" className="text-border">
                    ·
                  </span>
                  <span className="font-medium normal-case tracking-normal text-muted-foreground">
                    {post.readingTime}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-ink">
                  <Link href={`/insights/${post.slug}`} className="hover:text-primary">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground">{post.description}</p>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
