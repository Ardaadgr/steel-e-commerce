import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["iyzipay", "@prisma/client", "prisma"],
};

export default nextConfig;
