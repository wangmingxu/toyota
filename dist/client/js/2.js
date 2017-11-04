webpackJsonp([2],{

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_immutable_proptypes__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_immutable_proptypes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_immutable_proptypes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_addons_css_transition_group__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_addons_css_transition_group___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_addons_css_transition_group__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Action_Index__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_redux__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_router__ = __webpack_require__(375);
var _dec, _class, _class2, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var Main = (_dec = Object(__WEBPACK_IMPORTED_MODULE_5_react_redux__["b" /* connect */])(function (state) {
  return { TodoList: state.get('TodoList') };
}, __WEBPACK_IMPORTED_MODULE_4__Action_Index__["c" /* TodoListAction */]), Object(__WEBPACK_IMPORTED_MODULE_6_react_router__["a" /* withRouter */])(_class = _dec(_class = (_temp = _class2 = function (_React$PureComponent) {
  _inherits(Main, _React$PureComponent);

  function Main(props) {
    _classCallCheck(this, Main);

    return _possibleConstructorReturn(this, _React$PureComponent.call(this, props));
  }

  Main.prototype.componentDidUpdate = function componentDidUpdate() {
    console.log('componentDidUpdate');
  };

  Main.prototype.render = function render() {
    var _props = this.props,
        TodoList = _props.TodoList,
        handleAdd = _props.handleAdd,
        handleRemove = _props.handleRemove;

    var items = TodoList.toJS().map(function (item, i) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { key: i, onClick: function onClick() {
            return handleRemove(i);
          } },
        item
      );
    });
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'App' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'button',
        { onClick: handleAdd },
        'Add Item'
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_3_react_addons_css_transition_group___default.a,
        {
          transitionName: 'example',
          transitionEnterTimeout: 500,
          transitionLeaveTimeout: 500
        },
        items
      )
    );
  };

  return Main;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent), _class2.propTypes = {
  TodoList: __WEBPACK_IMPORTED_MODULE_2_react_immutable_proptypes___default.a.list.isRequired,
  handleAdd: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  handleRemove: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
}, _temp)) || _class) || _class);
var _default = Main;


/* harmony default export */ __webpack_exports__["default"] = (_default);
;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Main, 'Main', '/Users/mingxu/MxProject/example/src/Page/TodoList.js');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/mingxu/MxProject/example/src/Page/TodoList.js');
}();

;

/***/ })

});
//# sourceMappingURL=2.js.map?62dc6197c6eea6c32759