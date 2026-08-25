import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  outputFileTracingRoot: path.join(__dirname),
  watchOptions: {
    pollIntervalMs: 1000,
  },
};

export default nextConfig;
