/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['static.wikia.nocookie.net', 'sysrqmts.com','static.ivory.getloconow.com','sm.ign.com','static.getloconow.com','static.getloconow.com','www.clavecd.es','data.xxlgamer.com','www.zonammorpg.com','www.zonammorpg.com','img.xboxachievements.com','loremflickr.com','i.redd.it','cdn.akamai.steamstatic.com','cdn.akamai.steamstatic.com','preview.redd.it',''],
  },
  
};

export default config;
