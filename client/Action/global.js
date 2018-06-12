export function toggleAuthStatus(isLogin) {
  return {
    type: 'toggleAuthStatus',
    isLogin,
  };
}

export function collectErrMsg(msg) {
  return {
    type: 'errMsg',
    msg,
  };
}

export function setToken(token) {
  return {
    type: 'setToken',
    token,
  };
}
