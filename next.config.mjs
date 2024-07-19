/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['profile.line-scdn.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.dog.ceo',
        port: '',
        pathname: '/breeds/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn2.thecatapi.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
