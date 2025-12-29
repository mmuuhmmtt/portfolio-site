/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const repositoryName = 'portfolio-site'

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: isProd ? `/${repositoryName}` : '',
  assetPrefix: isProd ? `/${repositoryName}` : '',
  images: {
    unoptimized: true,
    domains: ['github.com'],
  },
  trailingSlash: true,
}

module.exports = nextConfig

