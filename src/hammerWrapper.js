// Hammer js bug on builds: https://github.com/hammerjs/hammer.js/issues/930
let implementation = () => {};
if (typeof window !== 'undefined') {
  implementation = require('hammerjs');
}
module.exports = implementation;
