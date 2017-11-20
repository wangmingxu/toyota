const initState = {
  animateCls: 'fade',
  isLogin: typeof exports === 'object', // 如果是服务端渲染则设置初始值为true,在服务端获取api失败时置为false
  errMsg: [],
};
const Global = (state = initState, action) => {
  switch (action.type) {
  case 'routeAnimate': // 修改路由过度动画
    return {
      ...state,
      animateCls: action.cls,
    };
  case 'toggleAuth':
    return {
      ...state,
      isLogin: action.isLogin,
    };
  case 'errMsg':
    return {
      ...state,
      errMsg: [...state.errMsg, action.msg],
    };
  default:
    return state;
  }
};

export default Global;
