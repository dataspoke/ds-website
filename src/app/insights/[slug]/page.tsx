import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/industries/breadcrumbs";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/shared/json-ld";
import { Section } from "@/components/shared/section";
import { formatLongDate, sameCalendarDay } from "@/lib/dates";
import { getInsightPost, getInsightStaticParams } from "@/lib/insights";
import { generateMetadata as pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return getInsightStaticParams();
}

export async function generateMetadata({
  params,
}: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsightPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/insights/${post.slug}`,
    noIndex: post.status === "draft",
    image: {
      url: `/insights/${post.slug}/opengraph-image`,
      width: 1200,
      height: 630,
      alt: post.title,
    },
    article: {
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [post.author],
    },
  });
}

export default async function InsightPostPage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const post = getInsightPost(slug);
  if (!post?.Content) notFound();

  const showUpdated = !sameCalendarDay(post.date, post.updated);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Insights", path: "/insights" },
    { name: post.title, path: `/insights/${post.slug}` },
  ];
  const Content = post.Content;

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <ArticleJsonLd
        headline={post.title}
        description={post.description}
        path={`/insights/${post.slug}`}
        datePublished={post.date}
        dateModified={post.updated}
        authorName={post.author}
        image={`/insights/${post.slug}/opengraph-image`}
      />
      <Section tight>
        <article className="mx-auto grid max-w-3xl gap-6">
          <Breadcrumbs items={crumbs} />

          <header className="grid gap-3.5 border-b border-border pb-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <p className="eyebrow">Insights · {post.eyebrow}</p>
              {post.status === "draft" && (
                <span className="rounded-full border border-tint-strong bg-tint px-2.5 py-0.5 text-xs font-semibold text-primary">
                  Draft preview
                </span>
              )}
            </div>
            <h1 className="text-3xl font-extrabold leading-[1.12] text-ink sm:text-4xl">{post.title}</h1>
            <p className="lede">{post.description}</p>
            <p className="text-sm text-muted-foreground">
              {post.author === "Nick Paul" ? (
                <Link href="/about" className="font-semibold text-foreground hover:text-primary">
                  {post.author}
                </Link>
              ) : (
                <span className="font-semibold text-foreground">{post.author}</span>
              )}
              {" · "}
              <time dateTime={post.date}>{formatLongDate(post.date)}</time>
              {showUpdated && (
                <>
                  {" · Updated "}
                  <time dateTime={post.updated}>{formatLongDate(post.updated)}</time>
                </>
              )}
              {" · "}
              <span>{post.readingTime}</span>
            </p>
          </header>

          <Content />

          <div className="border-t border-border pt-6">
            <Link
              href="/insights"
              className="inline-block py-1 text-sm font-semibold text-primary hover:text-primary/80"
            >
              &larr; All Insights
            </Link>
          </div>
        </article>
      </Section>
    </>
  );
}
