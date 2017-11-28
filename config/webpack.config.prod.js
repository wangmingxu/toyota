/**
 * 生产构建配置
 */
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');
const info = require('./info');
const utils = require('./utils');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { common, build } = require('./build.config');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const Es3ifyPlugin = require('es3ify-webpack-plugin');

const { mode } = process.env;

const clientConfig = merge(baseConfig, {
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.(css|less)$/,
        include: common.clientPath,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
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
        }),
      },
    ].concat(mode === 'spa' && build.codeSplit ? [{
      test: /\.js$/,
      include: path.join(common.clientPath, 'Page'),
      use: ['bundle-loader?lazy', 'babel-loader'],
    }] : []),
  },
  plugins: [
    /** 分析打包情况* */
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      analyzerPort: build.analyzerPort,
      openAnalyzer: build.bundleAnalyzerReport,
      reportFilename: 'report.html',
    }),
    /** 启用作用域提升* */
    new webpack.optimize.ModuleConcatenationPlugin(),
    /** 把从node_modules加载的模块到移到vendor* */
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) => (
        resource &&
            resource.indexOf('node_modules') >= 0 &&
            resource.match(/\.js$/)
      ),
    }),
    /** 把webpack运行时代码移到mainifest,避免重新打包时vendor的hash改变* */
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'mainifest'],
      chunks: ['vendor'],
      minChunks: Infinity,
    }),
    /** 把异步加载的chunk中的公共部分提取出来* */
    new webpack.optimize.CommonsChunkPlugin({
      async: 'used-twice',
      minChunks: (module, count) => (
        count >= 2
      ),
    }),
    // new webpack.EnvironmentPlugin({
    //   NODE_ENV: 'production',
    //   DEBUG: false
    // }),
    /** 配置全局常量,也可以用上面那种方式* */
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new HtmlWebpackPlugin(Object.assign(info.app, {
      template: common.index,
      filename: mode === 'ssr' ? path.join(common.viewPath, 'prod/index.html') : 'index.html',
      isomorphic: mode === 'ssr',
    })),
    /** 把代码转成es3* */
    // new Es3ifyPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      ie8: false,
      output: {
        quote_keys: true,
        comments: false,
        beautify: false,
      },
      mangle: {
        keep_fnames: true,
        screw_ie8: false,
      },
      compress: {
        properties: false,
        warnings: false,
        drop_console: true,
      },
      sourceMap: true,
    }),
    new PreloadWebpackPlugin({
      rel: 'prefetch',
    }),
    /** 清空dist目录* */
    new CleanWebpackPlugin([common.distPath], {
      root: common.rootPath,
    }),
  ],
});

const serverConfig = {
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
      '.js', '.jsx', '.json', '.scss', '.less', '.html', 'ejs',
    ], // 当requrie的模块找不到时，添加这些后缀
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0'],
            plugins: [
              'transform-decorators-legacy',
            ],
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
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      comments: false,
    }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
  ],
};

const prodConfig = mode === 'ssr' ? [clientConfig, serverConfig] : clientConfig;

module.exports = prodConfig;
