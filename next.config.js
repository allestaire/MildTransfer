/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    IS_DEV: process.env.NODE_ENV === 'development',
    DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD || ''
  }
}

module.exports = nextConfig
