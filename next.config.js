/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    unoptimized: false,
  },
  experimental: {
    dynamicIO: true,
  }
}

module.exports = nextConfig 