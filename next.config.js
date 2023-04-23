/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  async redirects() {
    return [
      {
        source: "/articles",
        destination: "/articles/page/0",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
