webpackJsonp([3],{"101":function(e,t,n){"use strict";function apiConfig(e){var t=e;return Object.keys(t).reduce(function(e,n){return e[n]=function(e){return"string"==typeof t[n]?o()({"url":t[n],"data":e}):t[n](e)},e},{})}function SetDivision(e){return{"type":"SetDivision","data":e}}function GetDivision(){return function(e){return a.getCity().then(function(t){var n=t.data.substr(0,2);e(SetDivision(c["b"].indexOf(n)>-1?n:"未知"))}).catch(function(e){}).finally(function(){})}}function routeAnimate(e){return{"type":"routeAnimate","cls":e}}function toggleAuth(e){return{"type":"toggleAuth","isLogin":e}}function collectErrMsg(e){return{"type":"errMsg","msg":e}}var r={};n.d(r,"routeAnimate",function(){return routeAnimate}),n.d(r,"toggleAuth",function(){return toggleAuth}),n.d(r,"collectErrMsg",function(){return collectErrMsg});var i=n(84),o=n.n(i),s=(n(11),apiConfig({"getCity":"/hangzhou/singleDog/getCity","mineSchool":"/oldSchool/mineSchool","loadNotice":"/oldSchool/loadNotice","listFireSchool":"/oldSchool/listFireSchool","searchSchool":"/oldSchool/searchSchool","addSchool":"/oldSchool/addSchool","addQqGroup":"/oldSchool/addQqGroup","schoolInfo":"/oldSchool/schoolInfo","listAudio":"/oldSchool/listAudio","addAudio":"/oldSchool/addAudio","audioInfo":"/oldSchool/audioInfo","loadAudioCount":"/oldSchool/loadAudioCount","mineAudio":"/oldSchool/mineAudio","trans":"//oauthbiz.lizhi.fm/checkAppTrans"})),u=s,a=u,c=(function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(apiConfig,"apiConfig","/Users/mingxu/MxProject/example/client/utils/api.js"),__REACT_HOT_LOADER__.register(s,"API","/Users/mingxu/MxProject/example/client/utils/api.js"),__REACT_HOT_LOADER__.register(u,"default","/Users/mingxu/MxProject/example/client/utils/api.js"))}(),n(42));n(11),function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(SetDivision,"SetDivision","/Users/mingxu/MxProject/example/client/Action/division.js"),__REACT_HOT_LOADER__.register(GetDivision,"GetDivision","/Users/mingxu/MxProject/example/client/Action/division.js"))}(),function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(routeAnimate,"routeAnimate","/Users/mingxu/MxProject/example/client/Action/global.js"),__REACT_HOT_LOADER__.register(toggleAuth,"toggleAuth","/Users/mingxu/MxProject/example/client/Action/global.js"),__REACT_HOT_LOADER__.register(collectErrMsg,"collectErrMsg","/Users/mingxu/MxProject/example/client/Action/global.js"))}();n.d(t,"b",function(){return SetDivision}),n.d(t,"a",function(){return GetDivision}),n.d(t,"c",function(){return r});n(11)},"11":function(e,t,n){(function(t){!function(t){var n=t.babelHelpers={};n.typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n.jsx=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,n,r,i){var o=t&&t.defaultProps,s=arguments.length-3;if(n||0===s||(n={}),n&&o)for(var u in o)void 0===n[u]&&(n[u]=o[u]);else n||(n=o||{});if(1===s)n.children=i;else if(s>1){for(var a=Array(s),c=0;c<s;c++)a[c]=arguments[c+3];n.children=a}return{"$$typeof":e,"type":t,"key":void 0===r?null:""+r,"ref":null,"props":n,"_owner":null}}}(),n.asyncIterator=function(e){if("function"==typeof Symbol){if(Symbol.asyncIterator){var t=e[Symbol.asyncIterator];if(null!=t)return t.call(e)}if(Symbol.iterator)return e[Symbol.iterator]()}throw new TypeError("Object is not async iterable")},n.asyncGenerator=function(){function AwaitValue(e){this.value=e}function AsyncGenerator(e){function send(e,r){return new Promise(function(i,o){var s={"key":e,"arg":r,"resolve":i,"reject":o,"next":null};n?n=n.next=s:(t=n=s,resume(e,r))})}function resume(t,n){try{var r=e[t](n),i=r.value;i instanceof AwaitValue?Promise.resolve(i.value).then(function(e){resume("next",e)},function(e){resume("throw",e)}):settle(r.done?"return":"normal",r.value)}catch(o){settle("throw",o)}}function settle(e,r){switch(e){case"return":t.resolve({"value":r,"done":!0});break;case"throw":t.reject(r);break;default:t.resolve({"value":r,"done":!1})}t=t.next,t?resume(t.key,t.arg):n=null}var t,n;this._invoke=send,"function"!=typeof e.return&&(this.return=void 0)}return"function"==typeof Symbol&&Symbol.asyncIterator&&(AsyncGenerator.prototype[Symbol.asyncIterator]=function(){return this}),AsyncGenerator.prototype.next=function(e){return this._invoke("next",e)},AsyncGenerator.prototype.throw=function(e){return this._invoke("throw",e)},AsyncGenerator.prototype.return=function(e){return this._invoke("return",e)},{"wrap":function(e){return function(){return new AsyncGenerator(e.apply(this,arguments))}},"await":function(e){return new AwaitValue(e)}}}(),n.asyncGeneratorDelegate=function(e,t){function pump(n,i){return r=!0,i=new Promise(function(t){t(e[n](i))}),{"done":!1,"value":t(i)}}var n={},r=!1;return"function"==typeof Symbol&&Symbol.iterator&&(n[Symbol.iterator]=function(){return this}),n.next=function(e){return r?(r=!1,e):pump("next",e)},"function"==typeof e.throw&&(n.throw=function(e){if(r)throw r=!1,e;return pump("throw",e)}),"function"==typeof e.return&&(n.return=function(e){return pump("return",e)}),n},n.asyncToGenerator=function(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function step(r,i){try{var o=t[r](i),s=o.value}catch(u){return void n(u)}if(!o.done)return Promise.resolve(s).then(function(e){step("next",e)},function(e){step("throw",e)});e(s)}return step("next")})}},n.classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},n.createClass=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),n.defineEnumerableProperties=function(e,t){for(var n in t){var r=t[n];r.configurable=r.enumerable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,n,r)}return e},n.defaults=function(e,t){for(var n=Object.getOwnPropertyNames(t),r=0;r<n.length;r++){var i=n[r],o=Object.getOwnPropertyDescriptor(t,i);o&&o.configurable&&void 0===e[i]&&Object.defineProperty(e,i,o)}return e},n.defineProperty=function(e,t,n){return t in e?Object.defineProperty(e,t,{"value":n,"enumerable":!0,"configurable":!0,"writable":!0}):e[t]=n,e},n.extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},n.get=function get(e,t,n){null===e&&(e=Function.prototype);var r=Object.getOwnPropertyDescriptor(e,t);if(void 0===r){var i=Object.getPrototypeOf(e);return null===i?void 0:get(i,t,n)}if("value"in r)return r.value;var o=r.get;if(void 0!==o)return o.call(n)},n.inherits=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},n.instanceof=function(e,t){return null!=t&&"undefined"!=typeof Symbol&&t[Symbol.hasInstance]?t[Symbol.hasInstance](e):e instanceof t},n.interopRequireDefault=function(e){return e&&e.__esModule?e:{"default":e}},n.interopRequireWildcard=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t},n.newArrowCheck=function(e,t){if(e!==t)throw new TypeError("Cannot instantiate an arrow function")},n.objectDestructuringEmpty=function(e){if(null==e)throw new TypeError("Cannot destructure undefined")},n.objectWithoutProperties=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n},n.possibleConstructorReturn=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},n.selfGlobal=void 0===t?self:t,n.set=function set(e,t,n,r){var i=Object.getOwnPropertyDescriptor(e,t);if(void 0===i){var o=Object.getPrototypeOf(e);null!==o&&set(o,t,n,r)}else if("value"in i&&i.writable)i.value=n;else{var s=i.set;void 0!==s&&s.call(r,n)}return n},n.slicedToArray=function(){function sliceIterator(e,t){var n=[],r=!0,i=!1,o=void 0;try{for(var s,u=e[Symbol.iterator]();!(r=(s=u.next()).done)&&(n.push(s.value),!t||n.length!==t);r=!0);}catch(a){i=!0,o=a}finally{try{!r&&u["return"]&&u["return"]()}finally{if(i)throw o}}return n}return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return sliceIterator(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),n.slicedToArrayLoose=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e)){for(var n,r=[],i=e[Symbol.iterator]();!(n=i.next()).done&&(r.push(n.value),!t||r.length!==t););return r}throw new TypeError("Invalid attempt to destructure non-iterable instance")},n.taggedTemplateLiteral=function(e,t){return Object.freeze(Object.defineProperties(e,{"raw":{"value":Object.freeze(t)}}))},n.taggedTemplateLiteralLoose=function(e,t){return e.raw=t,e},n.temporalRef=function(e,t,n){if(e===n)throw new ReferenceError(t+" is not defined - temporal dead zone");return e},n.temporalUndefined={},n.toArray=function(e){return Array.isArray(e)?e:Array.from(e)},n.toConsumableArray=function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)},e.exports=n}(void 0===t?self:t)}).call(t,n(43))},"152":function(e,t,n){"use strict";function isIE(){return o.indexOf("Trident")>-1}function isOpera(){return o.indexOf("Presto")>-1}function isWebKit(){return o.indexOf("AppleWebKit")>-1}function isFireFox(){return o.indexOf("Gecko")>-1&&-1==o.indexOf("KHTML")}function isMobile(){return!!o.match(/AppleWebKit.*Mobile.*/)}function isIOS(){return!!o.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)}function isAndroid(){return o.indexOf("Android")>-1||o.indexOf("Linux")>-1}function isIPhone(){return o.indexOf("iPhone")>-1}function isIPad(){return o.indexOf("iPad")>-1}function isWebApp(){return-1==o.indexOf("Safari")}function isWeiBo(){return!!o.match(/Weibo/i)}function isWeiXin(){return!!o.match(/MicroMessenger/i)}function isUC(){return!!o.match(/UCBrowser/i)}function isQQ(){return!!o.match(/QQBrowser/i)}function isSafari(){return!!o.match(/Safari/i)}function isLizhiFM(){return null!==o.match(/LizhiFM/i)||void 0!==window.LizhiJSBridge}function wxConfig(e){var t=window.location,n=t.protocol,r=t.host,i=t.pathname,o=t.search,s=n+"//"+r+i+o;l()({"url":e,"params":{"currentURL":s}}).then(function(e){var t=e.data,n=window,r=n.wx;t&&r.config({"debug":!1,"appId":t.appid,"timestamp":t.timestamp,"nonceStr":t.nonceStr,"signature":t.signature,"jsApiList":["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","hideMenuItems","showMenuItems","hideAllNonBaseMenuItem","showAllNonBaseMenuItem","translateVoice","startRecord","stopRecord","onRecordEnd","playVoice","pauseVoice","stopVoice","uploadVoice","downloadVoice","chooseImage","previewImage","uploadImage","downloadImage","getNetworkType","openLocation","getLocation","hideOptionMenu","showOptionMenu","closeWindow","scanQRCode","chooseWXPay","openProductSpecificView","addCard","chooseCard","openCard"]})})}function appConfig(e){_["a"].config({"debug":!1,"url":e,"apiList":["getToken","getSessionUser","gotoLogin","shareUrl","startRecordVoice","stopRecordVoice","uploadRecordVoice","replayRecordVoice","shareImage","saveImage"],"eventList":["user:login","recordStateChange"]})}Object.defineProperty(t,"__esModule",{"value":!0});var r=(n(153),n(154),n(155),n(160),n(161),n(162),n(163),n(164),n(165),n(166),n(167),n(168),n(170),n(171),n(172),n(173),n(174),n(176),n(177),n(178),n(179),n(180),n(181),n(182),n(183),n(184),n(185),n(186),n(187),n(191),n(194),n(195),n(196),n(197),n(198),n(199),n(200),n(201),n(202),n(203),n(204),n(205),n(207),n(208),n(209),n(210),n(211),n(213),n(214),n(215),n(216),n(217),n(219),n(220),n(221),n(222),n(223),n(224),n(225),n(226),n(227),n(228),n(76),n(229),n(230),n(231),n(232),n(233),n(234),n(235),n(236),n(237),n(238),n(239),n(240),n(241),n(242),n(243),n(245),n(246),n(247),n(248),n(249),n(250),n(251),n(252),n(253),n(254),n(255),n(256),n(257),n(258),n(259),n(260),n(261),n(262),n(263),n(264),n(265),n(266)),i=n.n(r),o=navigator.userAgent,s=(navigator.browserLanguage||navigator.language).toLowerCase(),u={"ua":o,"lang":s,"isIE":isIE,"isOpera":isOpera,"isWebKit":isWebKit,"isFireFox":isFireFox,"isMobile":isMobile,"isIOS":isIOS,"isAndroid":isAndroid,"isIPhone":isIPhone,"isIPad":isIPad,"isWebApp":isWebApp,"isWeiBo":isWeiBo,"isWeiXin":isWeiXin,"isUC":isUC,"isQQ":isQQ,"isSafari":isSafari,"isLizhiFM":isLizhiFM},a=u,c=(function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(o,"ua","/Users/mingxu/MxProject/example/client/utils/ua.js"),__REACT_HOT_LOADER__.register(s,"lang","/Users/mingxu/MxProject/example/client/utils/ua.js"),__REACT_HOT_LOADER__.register(isIE,"isIE","/Users/mingxu/MxProject/example/client/utils/ua.js"),__REACT_HOT_LOADER__.register(isOpera,"isOpera","/Users/mingxu/MxProject/example/client/utils/ua.js"),__REACT_HOT_LOADER__.register(isWebKit,"isWebKit","/Users/mingxu/MxProject/example/client/utils/ua.js"),__REACT_HOT_LOADER__.register(isFireFox,"isFireFox","/Users/mingxu/MxProject/example/client/utils/ua.js"),__REACT_HOT_LOADER__.register(isMobile,"isMobile","/Users/mingxu/MxProject/example/client/utils/ua.js"),__REACT_HOT_LOADER__.register(isIOS,"isIOS","/Users/mingxu/MxProject/example/client/utils/ua.js"),__REACT_HOT_LOADER__.register(isAndroid,"isAndroid","/Users/mingxu/MxProject/example/client/utils/ua.js"),__REACT_HOT_LOADER__.register(isIPhone,"isIPhone","/Users/mingxu/MxProject/example/client/utils/ua.js"),__REACT_HOT_LOADER__.register(isIPad,"isIPad","/Users/mingxu/MxProject/example/client/utils/ua.js"),__REACT_HOT_LOADER__.register(isWebApp,"isWebApp","/Users/mingxu/MxProject/example/client/utils/ua.js"),__REACT_HOT_LOADER__.register(isWeiBo,"isWeiBo","/Users/mingxu/MxProject/example/client/utils/ua.js"),__REACT_HOT_LOADER__.register(isWeiXin,"isWeiXin","/Users/mingxu/MxProject/example/client/utils/ua.js"),__REACT_HOT_LOADER__.register(isUC,"isUC","/Users/mingxu/MxProject/example/client/utils/ua.js"),__REACT_HOT_LOADER__.register(isQQ,"isQQ","/Users/mingxu/MxProject/example/client/utils/ua.js"),__REACT_HOT_LOADER__.register(isSafari,"isSafari","/Users/mingxu/MxProject/example/client/utils/ua.js"),__REACT_HOT_LOADER__.register(isLizhiFM,"isLizhiFM","/Users/mingxu/MxProject/example/client/utils/ua.js"),__REACT_HOT_LOADER__.register(u,"default","/Users/mingxu/MxProject/example/client/utils/ua.js"))}(),n(84)),l=n.n(c),_=n(86),f=(n(11),function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(wxConfig,"wxConfig","/Users/mingxu/MxProject/example/client/config.js"),__REACT_HOT_LOADER__.register(appConfig,"appConfig","/Users/mingxu/MxProject/example/client/config.js"))}(),n(42)),p=n(285),d=n.n(p),m=n(286),g=n.n(m),x=n(302),A=n.n(x);n(11);g.a.shim(),d.a.apikey=f["d"],d.a.releasestage="production",i.a.attach(document.body),window.lz=_["a"],window.isApp=a.isLizhiFM(),window.isWX=a.isWeiXin(),window.isWeiBo=a.isWeiBo(),window.shareData={"url":window.location.href,"link":window.location.href,"title":"全国单身踢馆歌手大赛","desc":"妈耶！单身汪怎么可以手撕情侣档？画面惨不忍睹……","image-url":A.a,"imgUrl":A.a},window.isApp&&appConfig(f["f"]),window.isWX&&(wxConfig(f["i"]),wx.ready(function(){wx.onMenuShareAppMessage(window.shareData),wx.onMenuShareTimeline(window.shareData)})),window.isWeiBo&&(window.location.href=f["h"]+"&cookie_key="+f["c"]+"wbid&redirectURL="+encodeURIComponent(window.location.href)),l.a.interceptors.response.use(function(e){return 0!==e.data.status&&d.a.notifyError(new Error(e.data.msg)),e.data},function(e){return Promise.reject(e)}),window._hmt=window._hmt||[],function(){var e=document.createElement("script");e.src="https://hm.baidu.com/hm.js?50f7f3f779102291f22b776ad51e5893";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}();var O=n(1),h=n.n(O),R=n(100),E=n.n(R),y=n(313),T=n(63),j=n(327),b=n(3),C=n.n(b),w=n(11),v=function(e){function Bundle(t){w.classCallCheck(this,Bundle);var n=w.possibleConstructorReturn(this,e.call(this,t));return n.state={"mod":null},n}return w.inherits(Bundle,e),Bundle.prototype.componentWillMount=function(){this.load(this.props)},Bundle.prototype.componentWillReceiveProps=function(e){e.load!==this.props.load&&this.load(e)},Bundle.prototype.load=function(e){var t=this;this.setState({"mod":null}),e.load(function(e){t.setState({"mod":e.default?e.default:e})})},Bundle.prototype.render=function(){return this.state.mod?this.props.children(this.state.mod):null},Bundle}(O["Component"]);v.propTypes={"load":C.a.func.isRequired,"children":C.a.func.isRequired};var L,P,M,D,S=v,U=S,H=(function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(v,"Bundle","/Users/mingxu/MxProject/example/client/Component/Bundle.js"),__REACT_HOT_LOADER__.register(S,"default","/Users/mingxu/MxProject/example/client/Component/Bundle.js"))}(),n(333)),I=n.n(H),W=n(334),k=n.n(W),B=(n(11),function(e){return e.name?e:function(t){return h.a.createElement(U,{"load":e},function(e){return h.a.createElement(e,t)})}}),z=[{"path":"/","component":B(I.a),"exact":!0},{"path":"/home","component":B(I.a),"exact":!0},{"component":B(k.a)}],G=z,F=G,Q=(function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(B,"createComponent","/Users/mingxu/MxProject/example/client/Route/index.js"),__REACT_HOT_LOADER__.register(z,"routes","/Users/mingxu/MxProject/example/client/Route/index.js"),__REACT_HOT_LOADER__.register(G,"default","/Users/mingxu/MxProject/example/client/Route/index.js"))}(),n(335)),V=n.n(Q),X=n(101),K=n(59),N=n(146),q=n.n(N),J=n(11),$=(L=Object(T["b"])(function(e){return{"animateCls":q()(e,["Global","animateCls"])}},function(e){return Object(K["b"])(X["c"],e)}))(P=function(e){function RouteWrapper(t){return J.classCallCheck(this,RouteWrapper),J.possibleConstructorReturn(this,e.call(this,t))}return J.inherits(RouteWrapper,e),RouteWrapper.prototype.componentDidUpdate=function(){window.isWX&&wxConfig(f["i"]),this.props.routeAnimate("fade")},RouteWrapper.prototype.render=function(){var e=this.props,t=e.location,n=e.animateCls;return h.a.createElement(V.a,{"transitionName":n,"transitionEnterTimeout":1e3,"transitionLeaveTimeout":1e3},h.a.createElement("div",{"key":t.key,"className":"routerWrapper"},this.props.children))},RouteWrapper}(h.a.Component))||P,Y=$,Z=Y,ee=(function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register($,"RouteWrapper","/Users/mingxu/MxProject/example/client/Component/RouteWrapper.js"),__REACT_HOT_LOADER__.register(Y,"default","/Users/mingxu/MxProject/example/client/Component/RouteWrapper.js"))}(),n(387)),te=(n(11),function(){return h.a.createElement(j["a"],{"basename":f["a"]},h.a.createElement(j["b"],{"render":function(e){var t=e.location;return h.a.createElement(Z,{"location":t},Object(ee["a"])(F,{"location":t}))}}))}),ne=te,re=ne,ie=(function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(te,"RouterView","/Users/mingxu/MxProject/example/client/Component/RouterView.js"),__REACT_HOT_LOADER__.register(ne,"default","/Users/mingxu/MxProject/example/client/Component/RouterView.js"))}(),n(150)),oe=n(11),se=new ie["Cookies"],ue=(M=Object(T["b"])(function(e){return{"isLogin":q()(e,["Global","isLogin"])}},function(e){return Object(K["b"])(X["c"],e)}))(D=function(e){function App(t){return oe.classCallCheck(this,App),oe.possibleConstructorReturn(this,e.call(this,t))}return oe.inherits(App,e),App.prototype.componentDidMount=function(){this.configReady()},App.prototype.configReady=function(){var e=this;window.isApp?_["a"].ready(function(){_["a"].getSessionUser().then(function(t){t.id?(se.set(f["e"],t.id),_["a"].getToken({"needRefresh":!0}).then(function(t){"success"===t.status&&(se.set(f["g"],t.token),e.props.toggleAuth(!0))})):(_["a"].on("user:login",function(){window.location.reload()}),_["a"].gotoLogin())})}):e.props.toggleAuth(!0)},App.prototype.render=function(){return this.props.isLogin?h.a.createElement(re,null):null},App}(O["Component"]))||D,ae=ue,ce=ae,le=(function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(se,"cookieManager","/Users/mingxu/MxProject/example/client/App.js"),__REACT_HOT_LOADER__.register(ue,"App","/Users/mingxu/MxProject/example/client/App.js"),__REACT_HOT_LOADER__.register(ae,"default","/Users/mingxu/MxProject/example/client/App.js"))}(),n(398)),_e=n.n(le),fe=n(399),pe=n(11),de={"animateCls":"fade","isLogin":"object"===("undefined"==typeof exports?"undefined":pe.typeof(exports)),"errMsg":[]},me=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:de,t=arguments[1];switch(t.type){case"routeAnimate":return pe.extends({},e,{"animateCls":t.cls});case"toggleAuth":return pe.extends({},e,{"isLogin":t.isLogin});case"errMsg":return pe.extends({},e,{"errMsg":[].concat(e.errMsg,[t.msg])});default:return e}},ge=me,xe=ge,Ae=(function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(de,"initState","/Users/mingxu/MxProject/example/client/Reducer/global.js"),__REACT_HOT_LOADER__.register(me,"Global","/Users/mingxu/MxProject/example/client/Reducer/global.js"),__REACT_HOT_LOADER__.register(ge,"default","/Users/mingxu/MxProject/example/client/Reducer/global.js"))}(),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments[1];switch(t.type){case"SetDivision":return t.data;default:return e}}),Oe=Ae,he=Oe,Re=(function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(Ae,"Division","/Users/mingxu/MxProject/example/client/Reducer/division.js"),__REACT_HOT_LOADER__.register(Oe,"default","/Users/mingxu/MxProject/example/client/Reducer/division.js"))}(),n(11),{"Global":xe,"Division":he}),Ee=Re,ye=(function(){"undefined"!=typeof __REACT_HOT_LOADER__&&__REACT_HOT_LOADER__.register(Re,"default","/Users/mingxu/MxProject/example/client/Reducer/index.js")}(),n(11)),Te=Object(fe["createLogger"])(),je=Object(K["c"])(ye.extends({},Ee)),be=[_e.a].concat([]),Ce="object"===("undefined"==typeof window?"undefined":ye.typeof(window))?window.REDUX_STATE:{},we=function(e){var t=Object(K["e"])(je,e||{},Object(K["d"])(K["a"].apply(void 0,be)));return t},ve=we(Ce),Le=ve,Pe=(function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(Te,"logger","/Users/mingxu/MxProject/example/client/Store/index.js"),__REACT_HOT_LOADER__.register(je,"rootReducer","/Users/mingxu/MxProject/example/client/Store/index.js"),__REACT_HOT_LOADER__.register(be,"middleware","/Users/mingxu/MxProject/example/client/Store/index.js"),__REACT_HOT_LOADER__.register(Ce,"initState","/Users/mingxu/MxProject/example/client/Store/index.js"),__REACT_HOT_LOADER__.register(we,"configureStore","/Users/mingxu/MxProject/example/client/Store/index.js"),__REACT_HOT_LOADER__.register(ve,"default","/Users/mingxu/MxProject/example/client/Store/index.js"))}(),n(11),function(e){(0,E.a.render)(h.a.createElement(y["AppContainer"],null,h.a.createElement(T["a"],{"store":Le},h.a.createElement(ie["CookiesProvider"],null,h.a.createElement(e,null)))),document.getElementById("app"))});Pe(ce);!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&__REACT_HOT_LOADER__.register(Pe,"render","/Users/mingxu/MxProject/example/client/index.js")}()},"264":function(e,t){},"265":function(e,t){},"302":function(e,t,n){e.exports=n.p+"client/assets/share_cover.jpg?ffd57bbaaa05973bc75deaad51c541d6"},"333":function(e,t,n){e.exports=function(e){n.e(0).then(function(t){e(n(400))}.bind(null,n)).catch(n.oe)}},"334":function(e,t,n){e.exports=function(e){n.e(1).then(function(t){e(n(401))}.bind(null,n)).catch(n.oe)}},"42":function(e,t,n){"use strict";n.d(t,"c",function(){return r}),n.d(t,"g",function(){return i}),n.d(t,"e",function(){return o}),n.d(t,"i",function(){return s}),n.d(t,"h",function(){return u}),n.d(t,"f",function(){return a}),n.d(t,"d",function(){return c}),n.d(t,"b",function(){return l}),n.d(t,"a",function(){return _});var r="base_cityfm_hangzhou_single_dog_",i=r+"token",o=r+"id",s="//oauthbiz.lizhi.fm/weixin/jsconfig?tag=cityfm",u="//oauthbiz.lizhi.fm/weixin/auth?tag=cityfm",a="https://h5security.lizhi.fm/jsBridgeConfig/get",c="294a8593da2207207c592dcd7364e84e913b366ca32bd592002dfc068c568f58",l=["广州","北京","成都","武汉","长沙","杭州","重庆"],_="/hangzhou/singleDog";!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(r,"cookiePrefix","/Users/mingxu/MxProject/example/client/constant.js"),__REACT_HOT_LOADER__.register(i,"tokenKey","/Users/mingxu/MxProject/example/client/constant.js"),__REACT_HOT_LOADER__.register(o,"idKey","/Users/mingxu/MxProject/example/client/constant.js"),__REACT_HOT_LOADER__.register(s,"wxJsConfUrl","/Users/mingxu/MxProject/example/client/constant.js"),__REACT_HOT_LOADER__.register(u,"wxAuthUrl","/Users/mingxu/MxProject/example/client/constant.js"),__REACT_HOT_LOADER__.register(a,"lzAuthUrl","/Users/mingxu/MxProject/example/client/constant.js"),__REACT_HOT_LOADER__.register(c,"fundebugApiKey","/Users/mingxu/MxProject/example/client/constant.js"),__REACT_HOT_LOADER__.register(l,"cityList","/Users/mingxu/MxProject/example/client/constant.js"),__REACT_HOT_LOADER__.register(_,"baseUrlPath","/Users/mingxu/MxProject/example/client/constant.js"))}()}},[152]);
//# sourceMappingURL=app.js.map?18c8637c69d8e824febc