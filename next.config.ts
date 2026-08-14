import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  watchOptions: {
    pollIntervalMs: 1000,
  },
};

export default nextConfig;
