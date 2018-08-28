import { getToken as getTokenAsync } from 'utils/auth';

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
    const latestToken = await getTokenAsync();
    dispatch(setToken(latestToken));
    return latestToken;
  };
}
