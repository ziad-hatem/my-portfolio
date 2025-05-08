/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://your-portfolio-domain.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ["/api/*", "/admin/*"],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/*", "/admin/*"],
      },
    ],
  },
  // Add specific sections with their priorities
  additionalPaths: async (config) => [
    {
      loc: "/",
      changefreq: "weekly",
      priority: 1.0,
      lastmod: new Date().toISOString(),
    },
    {
      loc: "/#about",
      changefreq: "monthly",
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    {
      loc: "/#what-i-do",
      changefreq: "monthly",
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    {
      loc: "/#skills",
      changefreq: "monthly",
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    {
      loc: "/#projects",
      changefreq: "weekly",
      priority: 0.9,
      lastmod: new Date().toISOString(),
    },
    {
      loc: "/#experience",
      changefreq: "monthly",
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    {
      loc: "/#education",
      changefreq: "monthly",
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    {
      loc: "/#contact",
      changefreq: "monthly",
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
  ],
};
