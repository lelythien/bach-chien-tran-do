/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Google profile photos
      },
      {
        protocol: 'https',
        hostname: 'graph.facebook.com', // Facebook profile photos
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com', // All Google CDN
      },
    ],
  },
}

module.exports = nextConfig
