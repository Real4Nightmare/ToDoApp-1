/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/ToDoApp-1',
  assetPrefix: '/ToDoApp-1/',
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Optional: Add trailing slash for GitHub Pages
  trailingSlash: true,
};

module.exports = nextConfig;
