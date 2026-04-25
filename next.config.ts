import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // @splinetool/runtime still needs transpiling (ESM package)
  transpilePackages: ["@splinetool/runtime"],

  webpack: (config) => {
    // Alias bypasses @splinetool/react-spline's broken exports map entirely.
    // Webpack resolves directly to the compiled dist file instead of
    // going through the package.json "exports" field which fails in webpack 5.
    config.resolve.alias = {
      ...config.resolve.alias,
      "@splinetool/react-spline": path.join(
        process.cwd(),
        "node_modules/@splinetool/react-spline/dist/react-spline.js"
      ),
    };
    return config;
  },
};

export default nextConfig;
