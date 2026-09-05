import type { NextConfig } from "next";
const aliases = ["www.chrishayuk.com", "chrishay.uk", "www.chrishay.uk", "chrishayuk.net", "www.chrishayuk.net", "chrishay.net", "www.chrishay.net", "chrishayuk.io", "www.chrishayuk.io"];
const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@chrishayuk/hause"],
  async redirects() {
    return aliases.map(host => ({ source: "/:path*", has: [{ type: "host" as const, value: host.replaceAll(".", "\\.") }], destination: "https://chrishayuk.com/:path*", permanent: true }));
  },
  async headers() {
    return [{ source: "/:path*", has: [{ type: "host" as const, value: "chrishayuk-site\\.fly\\.dev" }], headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};
export default nextConfig;
