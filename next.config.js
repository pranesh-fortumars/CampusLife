/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    domains: ['images.unsplash.com', 'api.dicebear.com'],
    unoptimized: true
  }
};

module.exports = nextConfig;
