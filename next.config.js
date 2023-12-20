/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  babel: {
    presets: ["next/babel", "@babel/preset-react"],
  },
};

module.exports = nextConfig;
