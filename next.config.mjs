/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      // Add other domains if needed
    ],
  },
};

export default nextConfig;



// /** @type {import('next').NextConfig} */
    // const nextConfig = {};

    // export default nextConfig;
