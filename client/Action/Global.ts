export function toggleAuthStatus(isLogin: boolean) {
  return {
    type: 'toggleAuthStatus',
    isLogin,
  };
}

export function collectErrMsg(msg: string) {
  return {
    type: 'errMsg',
    msg,
  };
}
