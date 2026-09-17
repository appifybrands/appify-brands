import type { NextConfig } from "next";
import path from "path";
import fs from "fs";

function resolveSplinePath(): string {
  let curr = process.cwd();
  for (let i = 0; i < 4; i++) {
    const candidate = path.join(
      curr,
      "node_modules/@splinetool/react-spline/dist/react-spline.js"
    );
    if (fs.existsSync(candidate)) {
      return candidate;
    }
    const parent = path.dirname(curr);
    if (parent === curr) break;
    curr = parent;
  }
  return path.join(
    process.cwd(),
    "node_modules/@splinetool/react-spline/dist/react-spline.js"
  );
}

const nextConfig: NextConfig = {
  // Fix monorepo workspace root tracing
  outputFileTracingRoot: path.resolve(__dirname, ".."),

  // Compress responses with gzip/brotli
  compress: true,

  // Transpile ESM packages
  transpilePackages: ["@splinetool/runtime"],

  // Optimize modern image formats
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Tree-shake large client libraries for smaller bundle size
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // Caching headers for high-performance repeat loads
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|webp|avif|mp4|webm|riv)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@splinetool/react-spline": resolveSplinePath(),
    };
    return config;
  },
};

export default nextConfig;
