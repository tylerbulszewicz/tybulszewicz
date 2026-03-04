import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// Enable OpenNext Cloudflare dev runtime only when explicitly requested.
if (process.env.OPENNEXT_CLOUDFLARE_DEV === "1") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { initOpenNextCloudflareForDev } = require("@opennextjs/cloudflare");
  initOpenNextCloudflareForDev();
}

export default nextConfig;
