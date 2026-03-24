/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['testingproduction.blob.core.windows.net', 'api.towner.taxi' , 'api.nimmavahana.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,  // ✅ Skips ESLint on npm run build
  },
}

module.exports = nextConfig
