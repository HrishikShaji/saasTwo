/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["epic-projects.nyc3.digitaloceanspaces.com"],
  },
};

module.exports = nextConfig;
