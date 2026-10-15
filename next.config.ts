import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP if the browser can't use it. The optimizer resizes from
    // the source file, so the 1220px portrait isn't shipped at full size.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
