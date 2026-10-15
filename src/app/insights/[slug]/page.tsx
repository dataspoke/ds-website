import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { ArticleJsonLd } from "@/components/shared/json-ld";
import { Section } from "@/components/shared/section";
import { formatLongDate, sameCalendarDay } from "@/lib/dates";
import { getInsightPost, getInsightPosts } from "@/lib/insights";
import { generateMetadata as pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return getInsightPosts().map((post) => ({ slug: post.slug }));
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
  });
}

export default async function InsightPostPage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const post = getInsightPost(slug);
  if (!post) notFound();

  const showUpdated = !sameCalendarDay(post.date, post.updated);

  return (
    <>
      <ArticleJsonLd
        headline={post.title}
        description={post.description}
        path={`/insights/${post.slug}`}
        datePublished={post.date}
        dateModified={post.updated}
        authorName={post.author}
      />
      <Section tight>
        <div className="grid max-w-3xl gap-6">
          <Link
            href="/insights"
            className="justify-self-start py-1 text-sm font-semibold text-primary hover:text-primary/80"
          >
            &larr; Insights
          </Link>
          <h1 className="text-3xl font-bold leading-[1.15] sm:text-4xl">{post.title}</h1>
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
          </p>
          <div className="grid gap-4 text-muted-foreground [&_a]:font-semibold [&_a]:text-primary [&_h2]:mt-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mt-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground [&_ol]:grid [&_ol]:list-decimal [&_ol]:gap-2 [&_ol]:pl-5 [&_ul]:grid [&_ul]:list-disc [&_ul]:gap-2 [&_ul]:pl-5">
            <ReactMarkdown>{post.body}</ReactMarkdown>
          </div>
        </div>
      </Section>
    </>
  );
}
