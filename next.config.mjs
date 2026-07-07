/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'prod-images.nawy.com' },
    ],
  },
}
export default nextConfig
