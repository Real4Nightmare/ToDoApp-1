/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/ToDoApp-1',
  assetPrefix: '/ToDoApp-1/',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  // Optional: Add trailing slash for GitHub Pages
  trailingSlash: true,
};

module.exports = nextConfig;
