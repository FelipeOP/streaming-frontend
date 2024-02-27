/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        port: "",
        pathname: "/api/**",
      },
    ],
    dangerouslyAllowSVG: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "https://0hwt7nq7-3000.use.devtunnels.ms",
        "0hwt7nq7-3000.use.devtunnels.ms",
        "localhost:3000",
      ],
    },
  },
};

export default nextConfig;
