如果直接在模块中require helper.js会报错,webpack对helper.js的转换有问题
用external-helpers生成helpers.js之后要在最后加上module.exports导出，否则无法正确引入,
因为external-helpers-insert-require做了类似以下形式的引入
var babelHelpers = __webpack_require__(xx);
webpack-dev-server中不能使用chunkhash,只能使用hash
用了react-router-redux把router绑定到store,但是每次通过Link组件跳转时并没有触发相应的change action,但实际上routing state已经改变，只有在首页/的时候触发，原因不明（通过dispatch(push('/foo'))这种形式是可以正常触发action的）
由于目前react-router-redux(router4.0)和redux-immutable还不兼容,因为syncHistoryWithStore api已经被废弃,所以放弃react-router-redux,集成redux-immutable
用了redux-immutable之后propTypes可改为react-immutable-proptypes
https://www.npmjs.com/package/react-immutable-proptypes

使用immutable需要改动的点：
1.创建store
2.redux-logger需要转化
3.reducer
4.connect To Props的时候
