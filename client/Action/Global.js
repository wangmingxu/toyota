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
