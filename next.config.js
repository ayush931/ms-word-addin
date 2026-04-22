/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/taskpane.html',
        destination: '/',
      },
    ];
  },
};

module.exports = nextConfig;
