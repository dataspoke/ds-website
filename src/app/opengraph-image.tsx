import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { OG_COLORS, OgMark } from "@/lib/og";

export const alt = `${SITE_NAME}: ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [jakarta, inter] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/PlusJakartaSans-800.woff")),
    readFile(join(process.cwd(), "assets/fonts/Inter-500.woff")),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#ffffff" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 0 64px 72px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <OgMark px={52} />
            <span style={{ fontFamily: "Jakarta", fontSize: 40, color: OG_COLORS.brand }}>{SITE_NAME}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <span
              style={{
                fontFamily: "Jakarta",
                fontSize: 64,
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                color: OG_COLORS.foreground,
              }}
            >
              {SITE_TAGLINE}
            </span>
            <span style={{ fontFamily: "Inter", fontSize: 28, lineHeight: 1.35, color: OG_COLORS.muted }}>
              Connected data, dashboards, automation and AI for small businesses.
            </span>
          </div>
          <span style={{ fontFamily: "Inter", fontSize: 24, color: OG_COLORS.primary }}>dataspoke.io</span>
        </div>
        <div
          style={{
            width: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: OG_COLORS.tint,
          }}
        >
          <OgMark px={280} />
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
