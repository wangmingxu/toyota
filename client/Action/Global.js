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

export function getToken() {
  return async (dispatch, getState) => {
    const { token } = getState();
    if (token) return token;
    const { getToken: _getToken } = await import('utils/auth');
    const _token = await _getToken();
    dispatch(setToken(_token));
    return _token;
  };
}
