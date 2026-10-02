import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Version 2 is now the homepage; keep old links working.
  async redirects() {
    return [{ source: "/v2", destination: "/", permanent: true }];
  },
};

export default nextConfig;
