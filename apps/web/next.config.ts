import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@maingame/brand",
    "@maingame/styles",
    "@maingame/types",
    "@maingame/components",
    "@maingame/utils",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
};

export default nextConfig;
