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
  outputFileTracingRoot: path.join(__dirname, "../../"),
  // @splinetool/runtime still needs transpiling (ESM package)
  transpilePackages: ["@splinetool/runtime"],

  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@splinetool/react-spline": resolveSplinePath(),
    };
    return config;
  },
};

export default nextConfig;
