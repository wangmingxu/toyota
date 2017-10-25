/**
 * 生产构建配置
 */
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname, '..'); // 项目根目录
const DIST_PATH = path.join(ROOT_PATH, 'dist'); // 产出路径
const config = require('./build.config');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

module.exports = merge(baseConfig, {
  devtool: 'source-map',
  plugins: [
    /** 分析打包情况* */
    new BundleAnalyzerPlugin({
      analyzerPort: config.build.analyzerPort,
      openAnalyzer: config.build.bundleAnalyzerReport,
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
    /** 把代码转成es3,有兼容性要求时使用* */
    // new es3ifyPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      ie8: false,
      output: {
        comments: false,
        beautify: false,
      },
      mangle: {
        keep_fnames: true,
      },
      compress: {
        warnings: false,
        drop_console: true,
      },
      sourceMap: true,
    }),
    new PreloadWebpackPlugin({
      rel: 'prefetch',
    }),
    /** 清空dist目录* */
    new CleanWebpackPlugin([DIST_PATH], {
      root: ROOT_PATH,
    }),
  ],
});
