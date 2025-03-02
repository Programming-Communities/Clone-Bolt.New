/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "archive.org",
        pathname: "/download/placeholder-image/**",
      },
    ],
  },
};

export default nextConfig;



// /** @type {import('next').NextConfig} */
    // const nextConfig = {};

    // export default nextConfig;
