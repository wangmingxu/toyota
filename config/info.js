/*
 网站相关信息
 */
const path = require('path');
const { common } = require('./build.config');

module.exports = {
  app: {
    title: 'react-starter',
    description: 'create a new react project',
    keywords: 'lizhi',
    favicon: path.join(common.srcPath, 'assets/favicon.ico'),
  },
};
