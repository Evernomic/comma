import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: { appIsrStatus: false },
  async rewrites() {
    return [
      {
        source: "/:id",
        has: [
          {
            type: "host",
            value: "go.comma.to",
          },
        ],
        destination: `${process.env.NEXT_PUBLIC_URL}/api/bookmarks/t/:id`,
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "icons.duckduckgo.com",
        pathname: "/ip3/*",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "uh7iqgcm0yv1ea0w.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
