/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "joystick.evyx.lol",
      },
    ],
  },
};

module.exports = nextConfig;
