import type { NextConfig } from "next";
import { codespacePreviewHost } from "./lib/preview-host";
const previewHost = codespacePreviewHost();
const config: NextConfig = {
  poweredByHeader: false,
  allowedDevOrigins: ["127.0.0.1", ...(previewHost ? [previewHost] : [])],
  experimental: { cpus: 2 },
  outputFileTracingExcludes: { "/*": ["./.data/**/*"] },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};
export default config;
