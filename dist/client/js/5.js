webpackJsonp([5],{

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router__ = __webpack_require__(375);
var _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var From = Object(__WEBPACK_IMPORTED_MODULE_1_react_router__["a" /* withRouter */])(_class = function (_Component) {
  _inherits(From, _Component);

  function From(props) {
    _classCallCheck(this, From);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleChange = function () {
      return _this.__handleChange__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.state = { value: 'hello' };
    return _this;
  }

  From.prototype.__handleChange__REACT_HOT_LOADER__ = function __handleChange__REACT_HOT_LOADER__() {
    return this.__handleChange__REACT_HOT_LOADER__.apply(this, arguments);
  };

  From.prototype.__handleChange__REACT_HOT_LOADER__ = function __handleChange__REACT_HOT_LOADER__() {
    return this.__handleChange__REACT_HOT_LOADER__.apply(this, arguments);
  };

  From.prototype.__handleChange__REACT_HOT_LOADER__ = function __handleChange__REACT_HOT_LOADER__(event) {
    this.setState({ value: event.target.value });
    // 思考 使用Redux的核心 就是组件不直接修改 state。是否可以在这里，进行发送 dispatch(action)
  };

  From.prototype.render = function render() {
    var value = this.state.value;

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'App' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text', value: value, onChange: this.handleChange }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'p',
        null,
        value
      )
    );
  };

  return From;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"])) || _class;

var _default = From;


/* harmony default export */ __webpack_exports__["default"] = (_default);
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(From, 'From', '/Users/mingxu/MxProject/example/src/Page/From.js');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/mingxu/MxProject/example/src/Page/From.js');
}();

;

/***/ })

});
//# sourceMappingURL=5.js.map?636f99fb377435034be8