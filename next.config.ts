import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: { appIsrStatus: false },
  async redirects() {
    return [
      {
        source: "/:id",
        has: [
          {
            type: "host",
            value: "go.comma.to",
          },
          {
            type: "host",
            value: "go.nucelo.co"
          }
        ],
        destination: `${process.env.NEXT_PUBLIC_URL}/api/bookmarks/t/:id`,
        permanent: false,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: `app.${process.env.NEXT_PUBLIC_LEGACY_APP_DOMAIN}`,
          }
        ],
        destination: `${process.env.NEXT_PUBLIC_APP_URL}/:path*`,
        permanent: true,
      }
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
