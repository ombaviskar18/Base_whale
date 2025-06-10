import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Disable ESLint during builds for demo purposes
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript strict checking for demo
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizeCss: true,
  },
  images: {
    domains: ['pbs.twimg.com', 'avatars.githubusercontent.com'],
  },
};

export default nextConfig;
