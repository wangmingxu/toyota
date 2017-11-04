webpackJsonp([4],{

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_immutable_proptypes__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_immutable_proptypes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_immutable_proptypes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Action_Index__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux__ = __webpack_require__(103);
var _dec, _class, _class2, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var Main = (_dec = Object(__WEBPACK_IMPORTED_MODULE_4_react_redux__["b" /* connect */])(function (state) {
  return { like: state.get('Like') };
}, __WEBPACK_IMPORTED_MODULE_3__Action_Index__["b" /* LikeAction */]), _dec(_class = (_temp = _class2 = function (_React$PureComponent) {
  _inherits(Main, _React$PureComponent);

  function Main(props) {
    _classCallCheck(this, Main);

    return _possibleConstructorReturn(this, _React$PureComponent.call(this, props));
  }

  Main.prototype.render = function render() {
    var _props = this.props,
        handleClick = _props.handleClick,
        like = _props.like;

    var Like = like.toJS().like ? 'like' : 'don\'t like';
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'App' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'p',
        { onClick: handleClick },
        'you ',
        Like,
        ' this;'
      )
    );
  };

  return Main;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent), _class2.propTypes = {
  handleClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  like: __WEBPACK_IMPORTED_MODULE_2_react_immutable_proptypes___default.a.map.isRequired
}, _temp)) || _class);
var _default = Main;


/* harmony default export */ __webpack_exports__["default"] = (_default); // 连接redux

;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Main, 'Main', '/Users/mingxu/MxProject/example/src/Page/Like.js');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/mingxu/MxProject/example/src/Page/Like.js');
}();

;

/***/ })

});
//# sourceMappingURL=4.js.map?9b969f595a1bd26b2406