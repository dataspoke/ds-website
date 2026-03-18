/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://dataspoke.io",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};
