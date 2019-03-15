// 开发构建配置
const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');
const { common } = require('./build.config');
const info = require('./info');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: [
    path.resolve(common.clientPath, 'rhlConfig.js'),
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    'webpack/hot/only-dev-server',
  ],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        include: common.clientPath,
        use: ['css-hot-loader'].concat([
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              context: path.resolve(common.clientPath, 'styles'),
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
              importLoaders: 2,
            },
          },
          'postcss-loader',
          'less-loader',
        ]),
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    /** 生成入口html文件* */
    new HtmlWebpackPlugin(
      Object.assign(info.app, {
        template: common.index,
        filename: 'index.html',
      })
    ),
  ],
});
