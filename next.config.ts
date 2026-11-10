import type { NextConfig } from "next";
import { WORK_PUBLISHED } from "./src/lib/constants";

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP if the browser can't use it. The optimizer resizes from
    // the source file, so the 1220px portrait isn't shipped at full size.
    formats: ["image/avif", "image/webp"],
  },
  // /work is down until clients approve their case studies. Temporary (307) so it can come back.
  async redirects() {
    if (WORK_PUBLISHED) return [];
    return [
      { source: "/work", destination: "/about", permanent: false },
      { source: "/work/:slug*", destination: "/about", permanent: false },
    ];
  },
};

export default nextConfig;
