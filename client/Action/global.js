export function routeAnimate(cls) {
  return {
    type: 'routeAnimate',
    cls,
  };
}

export function toggleAuth(isLogin) {
  return {
    type: 'toggleAuth',
    isLogin,
  };
}

export function collectErrMsg(msg) {
  return {
    type: 'errMsg',
    msg,
  };
}
