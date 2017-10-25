// 开发构建配置
const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');
const config = require('./build.config').dev;
const utils = require('./utils');

module.exports = merge(baseConfig, {
  devtool: 'cheap-module-source-map',
  entry: [
    'react-hot-loader/patch', 'webpack/hot/only-dev-server', `webpack-dev-server/client?http://0.0.0.0:${config.port}`,
    baseConfig.entry.app,
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin(),
    // 配置全局常量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
  // https://doc.webpack-china.org/configuration/dev-server/
  // webpack dev server 配置
  devServer: {
    hot: true,
    inline: true,
    historyApiFallback: true,
    quiet: false, // lets WebpackDashboard do its thing
    noInfo: true,
    host: utils.getIP(),
    port: config.port,
    // headers: {
    //   "X-Custom-Foo": "bar"
    // },
    proxy: {
      '/lizhi': {
        target: 'http://city.lizhi.fm',
        pathRewrite: {
          '^/api': '',
        },
        changeOrigin: true,
      },
    },
  },
});
