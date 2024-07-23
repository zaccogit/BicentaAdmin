/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "via.placeholder.com",
      "randomuser.me",
      "bankbot.zaccoapp.com:2626",
      "bankbot.zaccoapp.com",
      "firebasestorage.googleapis.com",
    ],
  },
  env: {
    API: "https://bankbot.zaccoapp.com:2626",
    API_OWN: "http://localhost:3000"
  },
};

export default nextConfig;
