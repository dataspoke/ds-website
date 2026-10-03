/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.dataspoke.io",
  generateRobotsTxt: true,
  // Non-page routes: share image, logo, llms.txt.
  exclude: ["/opengraph-image", "/twitter-image", "/logo.png", "/llms.txt"],
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};
