const { name } = require('../package.json');
const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '..'); // 项目根目录
const SRC_PATH = path.join(ROOT_PATH, 'src'); // 源码目录
module.exports = {
  common: {
    entry: path.resolve(SRC_PATH, 'index.js'), // js入口
    index: path.resolve(SRC_PATH, 'index.html'), // html入口
  },
  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static', // 单独创建一个目录存放静态资源，方便upload
    assetsPublicPath: process.env.NODE_ENV === 'production'
      ? `https://bizadv.lizhi.fm/static/2017/${name}/`
      : '/',
    bundleAnalyzerReport: false,
    analyzerPort: 7777,
    tinyApiKey: '6i9NPe1a2nU6YN1k5tjrTEQyK4h3-ZDU',
  },
  dev: {
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
  },
};
