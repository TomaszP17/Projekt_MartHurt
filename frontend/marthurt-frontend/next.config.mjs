/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['marthurt-photos-bucket.s3.amazonaws.com'],
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 800,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
