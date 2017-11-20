/*
 网站相关信息
 */
const path = require('path');
const { common } = require('./build.config');

module.exports = {
  app: {
    title: 'single-dog',
    description: '全国单身歌手大赛',
    keywords: 'lizhi',
    favicon: path.join(common.clientPath, 'assets/favicon.ico'),
  },
};
