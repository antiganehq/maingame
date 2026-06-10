import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@maingame/brand",
    "@maingame/styles",
    "@maingame/types",
    "@maingame/components",
    "@maingame/utils"
  ]
};

export default nextConfig;
