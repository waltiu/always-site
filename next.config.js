/** @type {import('next').NextConfig} */
const pkg = require('./package.json');

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  assetPrefix: isProd ? `/${pkg.name}/` : '',
  images: {
    loader: 'custom',
  },
};

module.exports = nextConfig;
