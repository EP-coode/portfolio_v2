/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.WEBSITE_URL || "https://example.com",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 1.0,
};
