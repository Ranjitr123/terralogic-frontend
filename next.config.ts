import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "8080", pathname: "/**" },
      { protocol: "https", hostname: "terralogic.com", pathname: "/**" },
      { protocol: "https", hostname: "**.terralogic.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
