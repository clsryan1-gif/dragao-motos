import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['192.168.1.12', 'localhost:3001'],
  images: {
    unoptimized: true
  },
  devIndicators: false,
};

export default nextConfig;
