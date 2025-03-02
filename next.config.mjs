/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Helps in catching potential issues
  swcMinify: true, // Enables SWC-based minification for better performance
  images: {
    domains: ["lh3.googleusercontent.com"], // Allow external image domains if needed
  },
};

export default nextConfig;



// /** @type {import('next').NextConfig} */
    // const nextConfig = {};

    // export default nextConfig;
