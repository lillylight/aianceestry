import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
<<<<<<< HEAD
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['aianceestry-5h7h.vercel.app'],
    unoptimized: true,
  },
  async headers() {
    return [
      // Manifest files
      {
        source: '/manifest.json',
        headers: [
          { key: 'Content-Type', value: 'application/json' },
          { key: 'Cache-Control', value: 'public, max-age=3600' },
        ],
      },
      // Farcaster manifest
      {
        source: '/.well-known/farcaster.json',
        headers: [
          { key: 'Content-Type', value: 'application/json' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Cache-Control', value: 'public, max-age=3600' },
        ],
      },
      // Image files
      {
        source: '/:path*.{png,jpg,jpeg,svg,gif,webp,ico}',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET' },
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
=======
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has TypeScript errors.
    ignoreBuildErrors: true,
  },
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
};

export default nextConfig;
