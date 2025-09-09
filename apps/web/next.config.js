/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@ui'],
  webpack: (config) => {
    config.resolve.alias['react-native'] = 'react-native-web';
    return config;
  },
};

module.exports = nextConfig;
