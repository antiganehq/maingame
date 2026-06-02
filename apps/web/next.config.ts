import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@maingame/brand",
    "@maingame/types",
    "@maingame/ui",
    "@maingame/utils"
  ]
};

export default nextConfig;
