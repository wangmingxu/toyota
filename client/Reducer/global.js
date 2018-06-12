const initState = {
  isLogin: typeof exports === 'object', // 如果是服务端渲染则设置初始值为true,在服务端获取api失败时置为false
  errMsg: [],
};
const Global = (state = initState, action) => {
  switch (action.type) {
  case 'toggleAuthStatus':
    return {
      ...state,
      isLogin: action.isLogin,
    };
  case 'errMsg':
    return {
      ...state,
      errMsg: [...state.errMsg, action.msg],
    };
  case 'setToken':
    return {
      ...state,
      token: action.token,
    };
  default:
    return state;
  }
};

export default Global;
