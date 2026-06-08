import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  reactStrictMode: true,

  images: {
    unoptimized: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  trailingSlash: true,
};

export default nextConfig;
