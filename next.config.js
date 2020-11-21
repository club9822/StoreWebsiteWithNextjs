const withImages = require('next-images');
const withFonts = require('next-fonts');
const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');
const withOffline = require('next-offline')

dotenvLoad();

const withNextEnv = nextEnv();

const nextConfig = {
  target: 'serverless',
  transformManifest: manifest => ['/'].concat(manifest), // add the homepage to the cache
  // Trying to set NODE_ENV=production when running yarn dev causes a build-time error so we
  // turn on the SW in dev mode so that we can actually test it
  generateInDevMode: true,
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en-US', 'fa'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en-US',
    // This is a list of locale domains and the default locale they
    // should handle (these are only required when setting up domain routing)
    domains: [
      {
        domain: 'example.com',
        defaultLocale: 'en-US',
      },
      {
        domain: 'example.ir',
        defaultLocale: 'fa',
      },
    ],
  },
}
module.exports = withOffline(nextConfig)
module.exports = withFonts();
module.exports = withImages();
module.exports = withNextEnv(nextConfig);
