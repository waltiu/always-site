/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
       loader: "custom",
    },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
    }
  },
}

module.exports = nextConfig
