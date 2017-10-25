如果直接在模块中require helper.js会报错,webpack对helper.js的转换有问题
用external-helpers生成helpers.js之后要在最后加上module.exports导出，否则无法正确引入,
因为external-helpers-insert-require做了类似以下形式的引入
var babelHelpers = __webpack_require__(xx);
webpack-dev-server中不能使用chunkhash,只能使用hash
