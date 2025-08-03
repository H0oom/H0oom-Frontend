const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: false,
  },
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en'],
    localeDetection: true,
  },
};

module.exports = nextConfig;
