import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/shared/section";
import { getInsightPosts } from "@/lib/insights";
import { generateMetadata as pageMetadata } from "@/lib/metadata";
import { formatLongDate } from "@/lib/dates";

export function generateMetadata(): Metadata {
  const posts = getInsightPosts();
  return pageMetadata({
    title: "Insights: plain-English articles on running a business on its own data",
    description: posts.length
      ? "Articles from DataSpoke for business owners on connecting your software, knowing your numbers and putting AI to work without a technical background."
      : "Articles from DataSpoke for business owners on connecting your software, knowing your numbers and putting AI to work. No posts yet.",
    path: "/insights",
  });
}

export default function InsightsPage() {
  const posts = getInsightPosts();

  return (
    <Section>
      <h1 className="text-4xl font-extrabold leading-[1.1] sm:text-5xl">Insights</h1>
      {posts.length === 0 ? (
        <p className="mt-4 text-muted-foreground">No posts yet.</p>
      ) : (
        <ul className="mt-10 grid max-w-3xl gap-8">
          {posts.map((post) => (
            <li key={post.slug} className="grid gap-2">
              <p className="text-sm text-muted-foreground">
                <time dateTime={post.date}>{formatLongDate(post.date)}</time>
              </p>
              <h2 className="text-2xl font-bold">
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
  );
}
