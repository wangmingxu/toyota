const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { common, dev, build } = require('./build.config');
const utils = require('./utils');
const { theme } = require('../package.json');

const { NODE_ENV, mode } = process.env;

const baseConfig = {
  context: common.clientPath,
  entry: {
    app: common.entry,
  },
  output: {
    path: common.distPath,
    filename: NODE_ENV === 'production'
      ? utils.assetsPath('js/[name].js?[chunkhash]')
      : utils.assetsPath('js/[name].js?[hash]'),
    chunkFilename: utils.assetsPath('js/[name].js?[chunkhash]'),
    publicPath: NODE_ENV === 'production'
      ? build.assetsPublicPath
      : dev.assetsPublicPath,
    crossOriginLoading: NODE_ENV === 'production' ? 'anonymous' : false,
  },
  resolve: {
    modules: [common.clientPath, 'node_modules'],
    extensions: [
      '.js', '.jsx', '.json', '.scss', '.less',
    ], // 当requrie的模块找不到时，添加这些后缀
    alias: {
      '@': common.clientPath,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: common.clientPath,
        use: [{
          loader: 'babel-loader?cacheDirectory',
          options: {
            plugins: [
              'external-helpers-2',
              'external-helpers-insert-require',
            ],
          },
        }],
      },
      {
        test: /\.(css|less)$/,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true, // css压缩
              importLoaders: 2,
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              modifyVars: theme,
            },
          },
        ],
      },
      {
        test: /\.(gif|jpg|jpeg|png|woff|svg|eot|ttf)$/, // 这些资源包括在js中import或在css中background url引入都会被处理
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: utils.assetsPath('assets/[name].[ext]?[hash]'),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    /** 忽略引入模块中并不需要的内容* */
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    /** 只引入moment的zh-cn语言包 */
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      __isomorphic__: mode === 'ssr',
    }),
    /** 抽取css文件* */
    new MiniCssExtractPlugin({ filename: utils.assetsPath('css/[name].css?[hash]'), allChunks: true }),
    new webpack.LoaderOptionsPlugin({
      options: {},
    }),
  ],
  // 通过script引入,不打包到一起
  externals: [],
};

module.exports = baseConfig;
