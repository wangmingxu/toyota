const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
  plugins: [
    pxtorem({
      rootValue: 64,
      propList: ['*'],
      selectorBlackList: [/body$/],
    }),
    autoprefixer,
  ],
};
