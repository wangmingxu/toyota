/*
 网站相关信息
 */
const path = require('path');
const { common } = require('./build.config');

module.exports = {
  app: {
    title: '全国单身踢馆歌手大赛',
    description: '全国单身踢馆歌手大赛',
    keywords: 'lizhi',
    favicon: path.join(common.clientPath, 'assets/favicon.ico'),
  },
};
