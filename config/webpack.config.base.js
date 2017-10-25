const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname, '..'); // 项目根目录
const SRC_PATH = path.join(ROOT_PATH, 'src'); // 源码目录
const config = require('./build.config');
const utils = require('./utils');
const info = require('./info');
const { theme } = require('../package.json');
// const InsertScriptPlugin = require('./plugins/insert-js-webpack-plugin');
module.exports = {
  context: SRC_PATH,
  entry: {
    app: config.common.entry,
  },
  output: {
    path: path.join(ROOT_PATH, 'dist'),
    filename: process.env.NODE_ENV === 'production'
      ? utils.assetsPath('js/[name].js?[chunkhash]')
      : utils.assetsPath('js/[name].js?[hash]'),
    chunkFilename: utils.assetsPath('js/[id].js?[chunkhash]'),
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
    crossOriginLoading: process.env.NODE_ENV === 'production' ? 'anonymous' : false,
  },
  resolve: {
    extensions: [
      '.js', '.jsx', '.json', '.scss', '.less',
    ], // 当requrie的模块找不到时，添加这些后缀
    alias: {
      '@': SRC_PATH,
    },
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: SRC_PATH,
        use: [{
          loader: 'babel-loader',
          options: {
            plugins: [
              [
                'react-css-modules',
                {
                  context: SRC_PATH,
                  webpackHotModuleReloading: true,
                  filetypes: {
                    '.less': {
                      syntax: 'postcss-less',
                    },
                  },
                  generateScopedName: '[path][name]__[local]--[hash:base64:5]',
                },
              ],
              // import js and css modularly (less source files)
              // [
              //   'import', {
              //     libraryName: 'antd-mobile',
              //     style: true,
              //   },
              // ],
              [
                'import', {
                  libraryName: 'antd',
                  style: 'css',
                },
              ],
            ],
          },
        }],
      }, {
        test: /\.(css|less)$/,
        include: SRC_PATH,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                minimize: true, // css压缩
                importLoaders: 2,
              },
            },
            'postcss-loader',
            'less-loader',
          ],
        }),
      }, {
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
      }, {
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
    ],
  },
  plugins: [
    /** 自定义插件，用于在html插入scriptsrc,也可以通过htmlwebpackPlugin实现 * */
    // new InsertScriptPlugin({
    //     paths: [utils.assetsPath('js/helpers.js')]
    // }),
    /** 忽略引入模块中并不需要的内容* */
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    /** 生成入口html文件* */
    new HtmlWebpackPlugin({
      title: info.app.title,
      description: info.app.description,
      keywords: info.app.keywords,
      template: config.common.index,
      filename: 'index.html',
      favicon: path.join(SRC_PATH, 'assets/favicon.ico'),
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
