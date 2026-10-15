/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.dataspoke.io",
  generateRobotsTxt: true,
  // A small site: list pages directly in sitemap.xml instead of an index pointing at sitemap-0.xml.
  generateIndexSitemap: false,
  // Non-page routes (share image, logo, llms.txt) and the no-nav /lp/* ad landing pages.
  exclude: ["/opengraph-image", "/twitter-image", "/logo.png", "/icon.svg", "/llms.txt", "/lp", "/lp/*"],
  // /work renders per request (the ?line= filter), so next-sitemap doesn't find it in the static output.
  additionalPaths: async (config) => [await config.transform(config, "/work")],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      // Called out so a later edit can't quietly block answer-engine crawlers.
      // `*` already allows every other bot, including training crawlers.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
    ],
    transformRobotsTxt: async (_config, robotsTxt) =>
      `${robotsTxt.trimEnd()}\n\n# LLM-readable site summary\n# https://www.dataspoke.io/llms.txt\n`,
  },
};
