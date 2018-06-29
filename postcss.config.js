const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
  plugins: [
    pxtorem({
      rootValue: 75,
      propList: ['*'],
      selectorBlackList: [/\s+body$/],
    }),
    autoprefixer,
  ],
};
