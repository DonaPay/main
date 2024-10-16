/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['assets.aceternity.com'],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false, 
  },
};

export default nextConfig;
