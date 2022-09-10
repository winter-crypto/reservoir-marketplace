/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  api: {
    bodyParser: false,
  },
  images: {
    loader: 'akamai',
    path: '',
  },
  env: {
    WINTER_ENV: process.env.WINTER_ENV,
  }
}

module.exports = nextConfig
