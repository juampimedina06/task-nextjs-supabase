import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tiwnsckuksdljckyyrmf.supabase.co",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
