const withImages = require('next-images');
const withFonts = require('next-fonts');
const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');

dotenvLoad();

const withNextEnv = nextEnv();
module.exports = withFonts();
module.exports = withImages();
module.exports = withNextEnv({
  // Your Next.js config.
});
