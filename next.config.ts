import type { NextConfig } from "next";

const wordpressUrl = process.env.WORDPRESS_API_URL ?? "";
let wordpressHostname = "";

try {
  if (wordpressUrl) {
    wordpressHostname = new URL(wordpressUrl).hostname;
  }
} catch {
  // Invalid URL at build time — images will be configured after .env.local is set
}

const nextConfig: NextConfig = {
  // Hide "X-Powered-By: Next.js"
  poweredByHeader: false,
  images: {
    remotePatterns: wordpressHostname
      ? [
          {
            protocol: "https",
            hostname: wordpressHostname,
            pathname: "/wp-content/**",
          },
          {
            protocol: "http",
            hostname: wordpressHostname,
            pathname: "/wp-content/**",
          },
        ]
      : [],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // Reduce cross-site tech probing
          { key: "X-DNS-Prefetch-Control", value: "off" },
        ],
      },
    ];
  },
};

export default nextConfig;
