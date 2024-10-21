/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: [
      "static.ivory.getloconow.com",
      "sm.ign.com",
      "static.getloconow.com",
      "www.clavecd.es",
      "data.xxlgamer.com",
      "www.zonammorpg.com",
      "sm.ign.com",
      "img.xboxachievements.com",
      "static.wikia.nocookie.net",
      "www.google.com",
      "cdn.akamai.steamstatic.com",
      "sysrqmts.com",
    ],
  },
};

export default config;
