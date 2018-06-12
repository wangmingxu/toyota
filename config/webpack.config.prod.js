/**
 * 生产构建配置
 */
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const info = require('./info');
const utils = require('./utils');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { common, build } = require('./build.config');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const CrossOriginPlugin = require('script-crossorigin-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const { RENDER_MODE } = process.env;

const clientConfig = merge(baseConfig, {
  mode: 'production',
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    minimize: true, // [new UglifyJsPlugin({...})]
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendor',
        },
        'async-vendor': {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2,
          chunks: 'async',
          name: 'async-vendor',
        },
        // styles: {
        //   name: 'styles',
        //   test: /\.less|css$/,
        //   chunks: 'all', // merge all the css chunk to one file
        //   enforce: true,
        // },
      },
    },
  },
  devtool: 'source-map',
  // profile: true, // 配合stats-webpack-plugin分析打包性能
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        include: common.clientPath,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
              minimize: true, // css压缩
              importLoaders: 2,
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
    ].concat(RENDER_MODE === 'spa' && build.codeSplit ? [{
      test: /\.js$/,
      include: path.join(common.clientPath, 'Page'),
      use: ['bundle-loader?lazy', 'babel-loader'],
    }] : []),
  },
  plugins: [
    new HtmlWebpackPlugin(Object.assign(info.app, {
      template: common.index,
      filename: RENDER_MODE === 'ssr' ? path.join(common.viewPath, 'prod/index.html') : 'index.html',
      isomorphic: RENDER_MODE === 'ssr',
    })),
    new CrossOriginPlugin(),
    new PreloadWebpackPlugin({
      rel: 'prefetch',
    }),
    /** 清空dist目录* */
    new CleanWebpackPlugin([common.distPath], {
      root: common.rootPath,
    }),
  ].concat(build.bundleAnalyzerReport ? [
    /** 分析打包情况* */
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      analyzerPort: build.analyzerPort,
      openAnalyzer: false,
      reportFilename: 'report.html',
    }),
  ] : []),
});

const serverConfig = {
  mode: 'production',
  optimization: {
    minimize: false,
  },
  context: common.clientPath,
  entry: { server: path.join(common.serverPath, 'server.prod') },
  output: {
    path: common.distPath,
    filename: 'server/[name].js',
    chunkFilename: 'server/chunk.[name].js',
  },
  target: 'node',
  node: {
    __filename: false,
    __dirname: false,
  },
  resolve: {
    modules: [common.clientPath, 'node_modules'],
    extensions: [
      '.js', '.jsx', '.json', '.scss', '.less', '.html', '.ejs',
    ], // 当requrie的模块找不到时，添加这些后缀
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
              modules: 'commonjs',
            }], ['@babel/preset-stage-0', {
              decoratorsLegacy: true,
            }]],
          },
        }],
      },
      {
        test: /\.(css|less)$/,
        use: [
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)$/,
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
};

const prodConfig = RENDER_MODE === 'ssr' ? [clientConfig, serverConfig] : clientConfig;

module.exports = prodConfig;
