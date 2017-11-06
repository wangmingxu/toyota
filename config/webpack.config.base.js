const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const {
  common, dev, build, isomorphic,
} = require('./build.config');
const utils = require('./utils');
const { theme } = require('../package.json');
const path = require('path');

const baseConfig = {
  context: common.srcPath,
  entry: {
    app: common.entry,
  },
  output: {
    path: common.distPath,
    filename: process.env.NODE_ENV === 'production'
      ? utils.assetsPath('js/[name].js?[chunkhash]')
      : utils.assetsPath('js/[name].js?[hash]'),
    chunkFilename: utils.assetsPath('js/[id].js?[chunkhash]'),
    publicPath: process.env.NODE_ENV === 'production'
      ? build.assetsPublicPath
      : dev.assetsPublicPath,
    crossOriginLoading: process.env.NODE_ENV === 'production' ? 'anonymous' : false,
  },
  resolve: {
    modules: [common.srcPath, 'node_modules'],
    extensions: [
      '.js', '.jsx', '.json', '.scss', '.less',
    ], // 当requrie的模块找不到时，添加这些后缀
    alias: {
      '@': common.srcPath,
    },
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: common.srcPath,
        use: [{
          loader: 'babel-loader',
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
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
        }),
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)$/, // 这些资源包括在js中import或在css中background url引入都会被处理
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
    ].concat(isomorphic ? [] : {
      test: /\.js$/,
      include: path.join(common.srcPath, 'Page'),
      use: ['bundle-loader?lazy', 'babel-loader'],
    }),
  },
  plugins: [
    /** 忽略引入模块中并不需要的内容* */
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      __isomorphic__: isomorphic,
    }),
    /** 抽取css文件* */
    new ExtractTextPlugin({ filename: utils.assetsPath('css/[name].css?[contenthash]'), allChunks: true }),
    new webpack.LoaderOptionsPlugin({
      options: {
        //
      },
    }),
  ],
  externals: [
    { // 通过script引入,不打包到一起
      //
    },
  ],
};

module.exports = baseConfig;
