const lessParser = require('postcss-less').parse;
const utils = require('../config/utils');
// Provide custom regenerator runtime and core-js
require('babel-polyfill');

// Node babel source map support
require('source-map-support').install();

// Javascript require hook
require('babel-register')({
  presets: ['es2015', 'stage-0'],
  plugins: [
    ['resolver', { resolveDirs: ['src'] }],
    'transform-decorators-legacy',
  ],
});

// Css require hook
require('css-modules-require-hook')({
  extensions: ['.less', '.css'],
  processorOpts: { parser: lessParser },
  generateScopedName: '[path][name]__[local]',
});

// Image require hook
require('asset-require-hook')({
  extensions: ['jpg', 'png', 'gif', 'webp'],
  limit: 8000,
  name: `/${utils.assetsPath('assets/[name].[ext]?[hash]')}`,
});

global.__isomorphic__ = true;

const path = require('path');
const fs = require('fs');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const config = require('../config/webpack.config.dev');
const { common, dev } = require('../config/build.config');
const clientRoute = require('./middlewares/clientRoute');
const proxyTable = require('../config/proxyTable');
const mockTable = require('../config/mockTable');
const proxyMiddleware = require('proxy-middleware');
const cookiesMiddleware = require('universal-cookie-express');

const compiler = webpack(config);

// Webpack hook event to write html file into `/views/dev` from `/views/tpl` due to server render
compiler.plugin('emit', (compilation, callback) => {
  const { assets } = compilation;
  let file;
  let data;

  Object.keys(assets).forEach((key) => {
    if (key.match(/\.html$/)) {
      file = path.join(common.viewPath, 'dev', key);
      data = assets[key].source();
      console.log(key);
      fs.writeFileSync(file, data);
    }
  });
  callback();
});

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: true,
}));

app.use(webpackHotMiddleware(compiler, {
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
}));

// proxy api requests
Object.keys(proxyTable).forEach((context) => {
  const options = proxyTable[context];
  app.use(context, proxyMiddleware(options));
});

// mock api requests
Object.keys(mockTable).forEach((context) => {
  app.use(context, mockTable[context]);
});

app.use(cookiesMiddleware());

app.set('views', path.resolve(__dirname, '../views/dev'));
app.set('view engine', 'html');
// app.engine('html', require('ejs').renderFile);
app.engine('html', require('hbs').__express);

app.use('*', clientRoute);

app.listen(dev.port, () => {
  console.log(`Example app listening on port ${dev.port}!\n`);
});
