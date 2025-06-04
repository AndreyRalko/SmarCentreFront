// next.config.js

const withNextIntl = require('next-intl/plugin')('./next-intl.config.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {}
  }
};

module.exports = withNextIntl(nextConfig);
