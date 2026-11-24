import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE_NAME } from "@/lib/constants";
import { getInsightPost, getInsightStaticParams } from "@/lib/insights";
import { OG_COLORS, OgMark } from "@/lib/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getInsightStaticParams();
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getInsightPost(slug);

  const [jakarta, inter] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/PlusJakartaSans-800.woff")),
    readFile(join(process.cwd(), "assets/fonts/Inter-500.woff")),
  ]);

  const title = post?.title ?? "Insights";
  const description = post?.description ?? "";
  const eyebrow = post ? `INSIGHTS · ${post.eyebrow.toUpperCase()}` : "INSIGHTS";
  const author = post?.author ?? "Nick Paul";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#ffffff" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 48px 56px 68px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <OgMark px={44} />
            <span style={{ fontFamily: "Jakarta", fontSize: 34, color: OG_COLORS.brand }}>{SITE_NAME}</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <span
              style={{
                fontFamily: "Jakarta",
                fontSize: 18,
                letterSpacing: "0.08em",
                color: OG_COLORS.primary,
              }}
            >
              {eyebrow}
            </span>
            <span
              style={{
                fontFamily: "Jakarta",
                fontSize: 58,
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                color: OG_COLORS.foreground,
              }}
            >
              {title}
            </span>
            <span
              style={{
                fontFamily: "Inter",
                fontSize: 25,
                lineHeight: 1.38,
                color: OG_COLORS.muted,
              }}
            >
              {description}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "Inter", fontSize: 22 }}>
            <span style={{ color: OG_COLORS.foreground }}>{author}</span>
            <span style={{ color: OG_COLORS.muted }}>·</span>
            <span style={{ color: OG_COLORS.primary }}>dataspoke.io/insights</span>
          </div>
        </div>

        <div
          style={{
            width: 340,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: OG_COLORS.tint,
          }}
        >
          <OgMark px={240} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Jakarta", data: jakarta, style: "normal", weight: 800 },
        { name: "Inter", data: inter, style: "normal", weight: 500 },
      ],
    }
  );
}
