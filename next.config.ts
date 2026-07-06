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
};

export default nextConfig;
