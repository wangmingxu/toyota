webpackJsonp([6],{

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable */
// 语法验证忽略当前文件，这文件故意留了两个语法错误，开发中请删除这三行
// 语法验证报错，会导致打包失败和热更新失败，所以我打包时先注释掉



var data222 = [{ author: 'Pete Hunt', text: 'This is one comment' }, { author: 'Jordan Walke', text: 'This is *another* comment' }];

function Comment(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'comment' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'h2',
      null,
      props.author
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'p',
      null,
      props.text
    )
  );
}
Comment.propTypes = {
  author: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  text: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
};

function CommentList(props) {
  var commentNodes = props.data.map(function (comment, index) {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Comment, { key: index, author: comment.author, text: comment.text });
  });
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'commentList' },
    commentNodes
  );
}
CommentList.propTypes = {
  data: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired
};

var CommentFrom = function (_Component) {
  _inherits(CommentFrom, _Component);

  function CommentFrom() {
    _classCallCheck(this, CommentFrom);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  CommentFrom.prototype.handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    var author = this.author.value;
    var text = this.text.value;
    if (!text || !author) {
      return;
    }
    // TODO: send request to the server
    this.props.onCommentSubmit({ author: author, text: text });
    this.author.value = '';
    this.text.value = '';
  };

  CommentFrom.prototype.render = function render() {
    var _this2 = this;

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'commentForm' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'form',
        { className: 'commentForm', onSubmit: function onSubmit() {
            _this2.handleSubmit();
          } },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text', placeholder: 'Your name', ref: function ref(c) {
            return _this2.author = c;
          } }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text', placeholder: 'Say something...', ref: function ref(c) {
            return _this2.text = c;
          } }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'submit', value: 'Post' })
      )
    );
  };

  return CommentFrom;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

CommentFrom.propTypes = {
  onCommentSubmit: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

var CommentBox = function (_Component2) {
  _inherits(CommentBox, _Component2);

  function CommentBox(props) {
    _classCallCheck(this, CommentBox);

    var _this3 = _possibleConstructorReturn(this, _Component2.call(this, props));

    _this3.state = { data: [] };
    _this3.handleCommentSubmit = _this3.handleCommentSubmit.bind(_this3);
    return _this3;
  }

  CommentBox.prototype.componentDidMount = function componentDidMount() {
    var _this4 = this;

    setTimeout(function () {
      _this4.setState({ data: data222 });
    }, 3000);
  };

  CommentBox.prototype.handleCommentSubmit = function handleCommentSubmit(comment) {
    var _this5 = this;

    setTimeout(function () {
      data222.push(comment);
      _this5.setState({ data: data222 });
    }, 1000);
  };

  CommentBox.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'commentBox' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'h1',
        null,
        ' Comment '
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(CommentList, { data: this.state.data }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(CommentFrom, { onCommentSubmit: this.handleCommentSubmit })
    );
  };

  return CommentBox;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

var _default = CommentBox;


/* harmony default export */ __webpack_exports__["default"] = (_default);
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(data222, 'data222', '/Users/mingxu/MxProject/example/src/Page/Comment.js');

  __REACT_HOT_LOADER__.register(Comment, 'Comment', '/Users/mingxu/MxProject/example/src/Page/Comment.js');

  __REACT_HOT_LOADER__.register(CommentList, 'CommentList', '/Users/mingxu/MxProject/example/src/Page/Comment.js');

  __REACT_HOT_LOADER__.register(CommentFrom, 'CommentFrom', '/Users/mingxu/MxProject/example/src/Page/Comment.js');

  __REACT_HOT_LOADER__.register(CommentBox, 'CommentBox', '/Users/mingxu/MxProject/example/src/Page/Comment.js');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/mingxu/MxProject/example/src/Page/Comment.js');
}();

;

/***/ })

});
//# sourceMappingURL=6.js.map?24c43b0e2733b127cb69