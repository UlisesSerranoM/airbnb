/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["links.papareact.com"],
  },
  env:{
    mapbox_key:"pk.eyJ1IjoidWxpc2Vzczk2IiwiYSI6ImNsOXhjemxpMjA5NWMzcG41a2o4bzNqaWoifQ.qa8_gMFan226eaM5_sVdDQ"
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
