const { name } = require('../package.json');
const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '..'); // 项目根目录
const CLIENT_PATH = path.join(ROOT_PATH, 'client'); // 源码目录
const VIEW_PATH = path.join(ROOT_PATH, 'views'); // 视图目录
const DIST_PATH = path.join(ROOT_PATH, 'dist'); // 输出目录
const SERVER_PATH = path.join(ROOT_PATH, 'server'); // 输出目录
module.exports = {
  isomorphic: false, // true为ssr模式(同构)，false为spa模式
  common: {
    entry: path.resolve(CLIENT_PATH, 'index.js'), // js入口
    index: path.resolve(VIEW_PATH, 'tpl/index.html'), // html入口
    rootPath: ROOT_PATH,
    clientPath: CLIENT_PATH,
    viewPath: VIEW_PATH,
    distPath: DIST_PATH,
    serverPath: SERVER_PATH,
  },
  build: {
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'client', // 单独创建一个目录存放静态资源，方便upload
    assetsPublicPath: process.env.NODE_ENV === 'production'
      ? `https://bizadv.lizhi.fm/static/2017/${name}/`
      : '/',
    bundleAnalyzerReport: false,
    analyzerPort: 7777,
    tinyApiKey: '6i9NPe1a2nU6YN1k5tjrTEQyK4h3-ZDU',
  },
  dev: {
    port: 8080,
    autoOpenBrowser: false,
    assetsSubDirectory: 'client',
    assetsPublicPath: '/',
  },
};
