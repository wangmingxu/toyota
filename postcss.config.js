/*
const pxtorem = require('postcss-pxtorem');

module.exports = {
  plugins: [
    pxtorem({
      rootValue: 75,
      propList: ['*'],
    }),
  ],
};
*/
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
  plugins: [
    pxtorem({
      rootValue: 75,
      propList: ['*'],
    }),
    autoprefixer,
  ],
};
