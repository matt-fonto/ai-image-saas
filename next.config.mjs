/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
        pathname: "/**",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
