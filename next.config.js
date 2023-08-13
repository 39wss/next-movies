/** @type {import('next').NextConfig} */
const API_KEY = '19bbc8aec119123ead402e1bc1ae40dc';

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/contact/:path*',
        destination: '/new-contact/:path*',
        permanent: false,
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: `/api/movies`,
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      },
      {
        source: `/api/movies/:id`,
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`
      }
    ]
  }
}

module.exports = nextConfig
