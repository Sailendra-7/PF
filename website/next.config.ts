import type { NextConfig } from "next";

const basePath = process.env.DEPLOY_ENV === "custom-domain" ? "" : "/PF";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  env: {
    // Lets plain <img> tags and CMS-uploaded paths work under a basePath.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
