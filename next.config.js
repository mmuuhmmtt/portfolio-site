/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['github.com'],
  },
  trailingSlash: true,
}

module.exports = nextConfig

