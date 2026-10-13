/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  basePath: "/cyber-escape-room",

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },
}

export default nextConfig