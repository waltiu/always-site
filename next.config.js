/** @type {import('next').NextConfig} */
const pkg =require('./package.json')
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  assetPrefix:isProd?`/${pkg.name}/`:'',
  reactStrictMode: true,
  images: {
    loader: "custom",
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    return config;
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      "/": { page: "/" },
    };
  },
};

module.exports = nextConfig;
