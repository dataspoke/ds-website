/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://dataspoke.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};
