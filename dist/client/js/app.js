webpackJsonp([8],{"116":function(e,t,n){"use strict";function configureStore(e){var t=Object(B["d"])(Y,z.a.fromJS(e)||z.a.Map(),Object(B["c"])(Object(B["a"])(G.a,Q)));return t}Object.defineProperty(t,"__esModule",{"value":!0});var r=(n(117),n(118),n(119),n(124),n(125),n(126),n(127),n(128),n(129),n(130),n(131),n(132),n(133),n(134),n(135),n(136),n(137),n(138),n(139),n(140),n(141),n(142),n(143),n(144),n(145),n(146),n(147),n(148),n(149),n(153),n(156),n(157),n(158),n(159),n(160),n(161),n(162),n(163),n(164),n(165),n(166),n(168),n(169),n(170),n(171),n(172),n(173),n(175),n(177),n(179),n(180),n(181),n(183),n(184),n(185),n(186),n(187),n(188),n(189),n(190),n(191),n(192),n(57),n(193),n(194),n(195),n(196),n(197),n(198),n(199),n(200),n(201),n(202),n(203),n(204),n(205),n(206),n(207),n(208),n(209),n(210),n(211),n(212),n(213),n(214),n(215),n(216),n(217),n(218),n(219),n(220),n(221),n(235),n(236),n(239),n(240),n(241),n(242),n(243),n(244));r.apikey="294a8593da2207207c592dcd7364e84e913b366ca32bd592002dfc068c568f58",r.releasestage="production",n(245).attach(document.body);var o=n(2),i=n.n(o),u=n(72),a=n.n(u),c=n(256),l=n(106),s=n(107),f=n(114),p=n.n(f),d=n(4),m=n.n(d),y=n(32),_=function(e){function Bundle(t){y.classCallCheck(this,Bundle);var n=y.possibleConstructorReturn(this,e.call(this,t));return n.state={"mod":null},n}return y.inherits(Bundle,e),Bundle.prototype.componentWillMount=function(){this.load(this.props)},Bundle.prototype.componentWillReceiveProps=function(e){e.load!==this.props.load&&this.load(e)},Bundle.prototype.load=function(e){var t=this;this.setState({"mod":null}),e.load(function(e){t.setState({"mod":e["default"]?e["default"]:e})})},Bundle.prototype.render=function(){return this.state.mod?this.props.children(this.state.mod):null},Bundle}(o["Component"]);_.propTypes={"load":m.a.func.isRequired,"children":m.a.func.isRequired};var h=_,b=h,v=(function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(_,"Bundle","/Users/mingxu/MxProject/example/src/Component/Bundle.js"),__REACT_HOT_LOADER__.register(h,"default","/Users/mingxu/MxProject/example/src/Component/Bundle.js"))}(),n(283)),x=n.n(v),O=n(291),g=n.n(O),A=n(292),E=n.n(A),j=n(293),R=n.n(j),w=n(294),T=n.n(w),P=n(295),S=n.n(P),C=n(32),L=s["a"],D=function(e){return e.name?e:function(t){return i.a.createElement(b,{"load":e},function(e){return i.a.createElement(e,t)})}},k=[{"path":"/","component":D(x.a),"exact":!0},{"path":"/home","component":D(x.a),"exact":!0},{"path":"/from","component":D(E.a),"exact":!0},{"path":"/comment","component":D(R.a),"exact":!0},{"path":"/like","component":D(T.a),"exact":!0},{"path":"/list","component":D(S.a),"exact":!0},{"component":D(g.a)}],H=function(){return i.a.createElement(L,null,i.a.createElement(s["c"],{"render":function(e){var t=e.location;return i.a.createElement(p.a,{"transitionName":"left","transitionEnterTimeout":500,"transitionLeaveTimeout":500},i.a.createElement("div",{"key":t.key,"style":{"height":"100%","width":"100%","position":"absolute"}},i.a.createElement(s["d"],{"location":t},k.map(function(e,t){return i.a.createElement(s["c"],C["extends"]({},e,{"key":t}))}))))}}))},M=H,U=M,B=(function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(L,"Router","/Users/mingxu/MxProject/example/src/Route/index.js"),__REACT_HOT_LOADER__.register(D,"createComponent","/Users/mingxu/MxProject/example/src/Route/index.js"),__REACT_HOT_LOADER__.register(k,"routes","/Users/mingxu/MxProject/example/src/Route/index.js"),__REACT_HOT_LOADER__.register(H,"RouteConfig","/Users/mingxu/MxProject/example/src/Route/index.js"),__REACT_HOT_LOADER__.register(M,"default","/Users/mingxu/MxProject/example/src/Route/index.js"))}(),n(99)),I=n(296),G=n.n(I),q=n(297),J=n(298),W=n(36),z=n.n(W),V=(n(32),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:z.a.List(["hello","world","click","me"]),t=arguments[1];switch(t.type){case"Add":return e.push(prompt("Enter some text"));case"Remove":return e["delete"](t.index);default:return e}}),N=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:z.a.fromJS({"like":!1});switch(arguments[1].type){case"change":return e.set("like",!e.get("like"));default:return e}},$=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments[1];switch(t.type){case"SetTestData":return t.data;default:return e}},F={"TodoList":V,"Like":N,"TestData":$},X=F,K=(function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(V,"TodoList","/Users/mingxu/MxProject/example/src/Reducer/index.js"),__REACT_HOT_LOADER__.register(N,"Like","/Users/mingxu/MxProject/example/src/Reducer/index.js"),__REACT_HOT_LOADER__.register($,"TestData","/Users/mingxu/MxProject/example/src/Reducer/index.js"),__REACT_HOT_LOADER__.register(F,"default","/Users/mingxu/MxProject/example/src/Reducer/index.js"))}(),n(32)),Q=Object(q["createLogger"])({"stateTransformer":function(e){return e.toJS()}}),Y=Object(J["combineReducers"])(K["extends"]({},X)),Z=(function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(Q,"logger","/Users/mingxu/MxProject/example/src/Store/index.js"),__REACT_HOT_LOADER__.register(Y,"rootReducer","/Users/mingxu/MxProject/example/src/Store/index.js"),__REACT_HOT_LOADER__.register(configureStore,"configureStore","/Users/mingxu/MxProject/example/src/Store/index.js"))}(),n(115)),ee=(n(32),configureStore(window.REDUX_STATE)),te=function(e){a.a.hydrate(i.a.createElement(c["AppContainer"],null,i.a.createElement(l["a"],{"store":ee},i.a.createElement(Z["CookiesProvider"],null,i.a.createElement(e,null)))),document.getElementById("app"))};te(U);!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(ee,"store","/Users/mingxu/MxProject/example/src/index.js"),__REACT_HOT_LOADER__.register(te,"render","/Users/mingxu/MxProject/example/src/index.js"))}()},"242":function(e,t){},"283":function(e,t,n){e.exports=function(e){Promise.all([n.e(1),n.e(0)]).then(function(t){e(n(303))}.bind(null,n))["catch"](n.oe)}},"291":function(e,t,n){e.exports=function(e){n.e(3).then(function(t){e(n(304))}.bind(null,n))["catch"](n.oe)}},"292":function(e,t,n){e.exports=function(e){Promise.all([n.e(0),n.e(5)]).then(function(t){e(n(305))}.bind(null,n))["catch"](n.oe)}},"293":function(e,t,n){e.exports=function(e){n.e(6).then(function(t){e(n(306))}.bind(null,n))["catch"](n.oe)}},"294":function(e,t,n){e.exports=function(e){Promise.all([n.e(0),n.e(4)]).then(function(t){e(n(307))}.bind(null,n))["catch"](n.oe)}},"295":function(e,t,n){e.exports=function(e){Promise.all([n.e(0),n.e(2)]).then(function(t){e(n(308))}.bind(null,n))["catch"](n.oe)}},"32":function(e,t,n){(function(t){!function(t){var n=t.babelHelpers={};n["typeof"]="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n.jsx=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,n,r,o){var i=t&&t.defaultProps,u=arguments.length-3;if(n||0===u||(n={}),n&&i)for(var a in i)void 0===n[a]&&(n[a]=i[a]);else n||(n=i||{});if(1===u)n.children=o;else if(u>1){for(var c=Array(u),l=0;l<u;l++)c[l]=arguments[l+3];n.children=c}return{"$$typeof":e,"type":t,"key":void 0===r?null:""+r,"ref":null,"props":n,"_owner":null}}}(),n.asyncIterator=function(e){if("function"==typeof Symbol){if(Symbol.asyncIterator){var t=e[Symbol.asyncIterator];if(null!=t)return t.call(e)}if(Symbol.iterator)return e[Symbol.iterator]()}throw new TypeError("Object is not async iterable")},n.asyncGenerator=function(){function AwaitValue(e){this.value=e}function AsyncGenerator(e){function send(e,r){return new Promise(function(o,i){var u={"key":e,"arg":r,"resolve":o,"reject":i,"next":null};n?n=n.next=u:(t=n=u,resume(e,r))})}function resume(t,n){try{var r=e[t](n),o=r.value;o instanceof AwaitValue?Promise.resolve(o.value).then(function(e){resume("next",e)},function(e){resume("throw",e)}):settle(r.done?"return":"normal",r.value)}catch(i){settle("throw",i)}}function settle(e,r){switch(e){case"return":t.resolve({"value":r,"done":!0});break;case"throw":t.reject(r);break;default:t.resolve({"value":r,"done":!1})}t=t.next,t?resume(t.key,t.arg):n=null}var t,n;this._invoke=send,"function"!=typeof e["return"]&&(this["return"]=void 0)}return"function"==typeof Symbol&&Symbol.asyncIterator&&(AsyncGenerator.prototype[Symbol.asyncIterator]=function(){return this}),AsyncGenerator.prototype.next=function(e){return this._invoke("next",e)},AsyncGenerator.prototype["throw"]=function(e){return this._invoke("throw",e)},AsyncGenerator.prototype["return"]=function(e){return this._invoke("return",e)},{"wrap":function(e){return function(){return new AsyncGenerator(e.apply(this,arguments))}},"await":function(e){return new AwaitValue(e)}}}(),n.asyncGeneratorDelegate=function(e,t){function pump(n,o){return r=!0,o=new Promise(function(t){t(e[n](o))}),{"done":!1,"value":t(o)}}var n={},r=!1;return"function"==typeof Symbol&&Symbol.iterator&&(n[Symbol.iterator]=function(){return this}),n.next=function(e){return r?(r=!1,e):pump("next",e)},"function"==typeof e["throw"]&&(n["throw"]=function(e){if(r)throw r=!1,e;return pump("throw",e)}),"function"==typeof e["return"]&&(n["return"]=function(e){return pump("return",e)}),n},n.asyncToGenerator=function(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function step(r,o){try{var i=t[r](o),u=i.value}catch(a){return void n(a)}if(!i.done)return Promise.resolve(u).then(function(e){step("next",e)},function(e){step("throw",e)});e(u)}return step("next")})}},n.classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},n.createClass=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),n.defineEnumerableProperties=function(e,t){for(var n in t){var r=t[n];r.configurable=r.enumerable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,n,r)}return e},n.defaults=function(e,t){for(var n=Object.getOwnPropertyNames(t),r=0;r<n.length;r++){var o=n[r],i=Object.getOwnPropertyDescriptor(t,o);i&&i.configurable&&void 0===e[o]&&Object.defineProperty(e,o,i)}return e},n.defineProperty=function(e,t,n){return t in e?Object.defineProperty(e,t,{"value":n,"enumerable":!0,"configurable":!0,"writable":!0}):e[t]=n,e},n["extends"]=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},n.get=function get(e,t,n){null===e&&(e=Function.prototype);var r=Object.getOwnPropertyDescriptor(e,t);if(void 0===r){var o=Object.getPrototypeOf(e);return null===o?void 0:get(o,t,n)}if("value"in r)return r.value;var i=r.get;if(void 0!==i)return i.call(n)},n.inherits=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},n["instanceof"]=function(e,t){return null!=t&&"undefined"!=typeof Symbol&&t[Symbol.hasInstance]?t[Symbol.hasInstance](e):e instanceof t},n.interopRequireDefault=function(e){return e&&e.__esModule?e:{"default":e}},n.interopRequireWildcard=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t},n.newArrowCheck=function(e,t){if(e!==t)throw new TypeError("Cannot instantiate an arrow function")},n.objectDestructuringEmpty=function(e){if(null==e)throw new TypeError("Cannot destructure undefined")},n.objectWithoutProperties=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n},n.possibleConstructorReturn=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},n.selfGlobal=void 0===t?self:t,n.set=function set(e,t,n,r){var o=Object.getOwnPropertyDescriptor(e,t);if(void 0===o){var i=Object.getPrototypeOf(e);null!==i&&set(i,t,n,r)}else if("value"in o&&o.writable)o.value=n;else{var u=o.set;void 0!==u&&u.call(r,n)}return n},n.slicedToArray=function(){function sliceIterator(e,t){var n=[],r=!0,o=!1,i=void 0;try{for(var u,a=e[Symbol.iterator]();!(r=(u=a.next()).done)&&(n.push(u.value),!t||n.length!==t);r=!0);}catch(c){o=!0,i=c}finally{try{!r&&a["return"]&&a["return"]()}finally{if(o)throw i}}return n}return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return sliceIterator(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),n.slicedToArrayLoose=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e)){for(var n,r=[],o=e[Symbol.iterator]();!(n=o.next()).done&&(r.push(n.value),!t||r.length!==t););return r}throw new TypeError("Invalid attempt to destructure non-iterable instance")},n.taggedTemplateLiteral=function(e,t){return Object.freeze(Object.defineProperties(e,{"raw":{"value":Object.freeze(t)}}))},n.taggedTemplateLiteralLoose=function(e,t){return e.raw=t,e},n.temporalRef=function(e,t,n){if(e===n)throw new ReferenceError(t+" is not defined - temporal dead zone");return e},n.temporalUndefined={},n.toArray=function(e){return Array.isArray(e)?e:Array.from(e)},n.toConsumableArray=function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)},e.exports=n}(void 0===t?self:t)}).call(t,n(37))}},[116]);
//# sourceMappingURL=app.js.map?44abc11d3a0f523796d3