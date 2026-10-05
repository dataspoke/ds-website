/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.dataspoke.io",
  generateRobotsTxt: true,
  // Four pages: list them directly in sitemap.xml instead of an index pointing at sitemap-0.xml.
  generateIndexSitemap: false,
  // Non-page routes: share image, logo, llms.txt.
  exclude: ["/opengraph-image", "/twitter-image", "/logo.png", "/llms.txt"],
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};
