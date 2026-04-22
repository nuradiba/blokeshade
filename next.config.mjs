/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dwkui4w8n/image/upload/**",
      },
    ],
  },
};

export default nextConfig;
