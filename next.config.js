/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ntytxecxpzrxqxwbalcb.supabase.co',
        pathname: '/storage/v1/object/public/meals-images/**',
      },
      {
        protocol: 'https',
        hostname: 'cloud.appwrite.io',
        pathname: '/v1/storage/buckets/**',
      },
    ],
  },
};

module.exports = nextConfig;
