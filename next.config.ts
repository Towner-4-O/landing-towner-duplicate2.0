/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['testingproduction.blob.core.windows.net', 'api.towner.taxi', 'api.nimmavahana.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [300, 400, 600],
    minimumCacheTTL: 31536000, // Cache optimized images for 1 year
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
