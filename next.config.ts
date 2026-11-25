import type { NextConfig } from "next";
import { WORK_PUBLISHED } from "./src/lib/constants";

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP if the browser can't use it. The optimizer resizes from
    // the source file, so the 1220px portrait isn't shipped at full size.
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // Dead URLs that still get visits. Config redirects run before filesystem
    // routes, so a redirect here hides any page later built at the same URL.
    // Never redirect a URL where a page is being built.
    const deadUrls = [
      { source: "/insights/personal-ai-agent", destination: "/services/personal-ai-agent", permanent: true },
    ];

    // /work is down until clients approve their case studies. Permanent (308)
    // because /work is indexed and the case studies are not coming back soon.
    // Setting WORK_PUBLISHED to true removes these redirects, but browsers that
    // cached the 308 may keep sending visitors to /about until their cache clears.
    if (WORK_PUBLISHED) return deadUrls;
    return [
      ...deadUrls,
      { source: "/work", destination: "/about", permanent: true },
      { source: "/work/:slug*", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
