import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
const isProduction = process.env.NODE_ENV === "production";

function createContentSecurityPolicy() {
  const policy = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "object-src 'none'",
    "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://i.scdn.co https://*.scdn.co",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://open.spotify.com https://*.scdn.co https://va.vercel-scripts.com https://vitals.vercel-insights.com",
    "media-src 'self' https: blob:",
    "frame-src 'self' https://open.spotify.com https://w.soundcloud.com https://www.youtube.com https://www.youtube-nocookie.com",
    "child-src 'self' https://open.spotify.com https://w.soundcloud.com https://www.youtube.com https://www.youtube-nocookie.com",
    "upgrade-insecure-requests"
  ];

  return policy.join("; ");
}

const nextConfig: NextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co"
      }
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          { key: "X-DNS-Prefetch-Control", value: "off" },
          ...(isProduction
            ? [{ key: "Content-Security-Policy", value: createContentSecurityPolicy() }]
            : [])
        ]
      }
    ];
  }
};

export default withNextIntl(nextConfig);
