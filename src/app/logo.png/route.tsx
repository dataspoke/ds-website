import { ImageResponse } from "next/og";
import { OgMark } from "@/lib/og";

// Organization logo for structured data (json-ld.tsx). Google wants a stable, crawlable raster image.
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        <OgMark px={440} />
      </div>
    ),
    { width: 512, height: 512 }
  );
}
