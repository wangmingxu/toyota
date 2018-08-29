import { tokenKey, wxAuthUrl } from 'constant';
import ClientDetect from 'rc-useragent/ClientDetect';
import { Cookies } from 'react-cookie';

export const applyLogin = async () => {
  const client = ClientDetect.getInstance();
  if (client.isLizhiFM) {
    const p = new Promise((resolve) => { lz.on('user:login', resolve); });
    lz.gotoLogin();
    await p;
  } else if (client.isWeiXin) {
    location.href = `${wxAuthUrl}&redirectURL=${encodeURIComponent(location.href)}`;
    await Promise.reject(new Error(null));
  }
};

export const getToken = async () => {
  const cookies = new Cookies();
  const client = ClientDetect.getInstance();
  if (client.isLizhiFM) {
    await new Promise((resolve) => { lz.ready(resolve); });
    const ret = await lz.getToken({ needRefresh: true });
    if (ret.status === 'success') {
      cookies.set(tokenKey, ret.token);
      return ret.token;
    }
  } else if (client.isWeiXin) {
    const qs = new URLSearchParams(location.search);
    const openid = qs.get('openid');
    if (openid) {
      openid && cookies.set(tokenKey, openid);
      return openid;
    }
    return cookies.get(tokenKey);
  }
  return '';
};

const clientCheckLogin = async () => {
  const client = ClientDetect.getInstance();
  if (client.isLizhiFM) {
    await new Promise((resolve) => { lz.ready(resolve); });
    const ret = await lz.getSessionUser();
    const isLogin = Boolean(ret.id);
    if (!isLogin) {
      const cookies = new Cookies();
      cookies.remove(tokenKey);
    }
    return isLogin;
  } else if (client.isWeiXin) {
    const openid = await getToken();
    return Boolean(openid);
  }
  return true;
};

const serverCheckLogin = async (client, cookies) => {
  if (client.isLizhiFM || client.isWeiXin) {
    const token = cookies.get(tokenKey);
    return Boolean(token);
  }
  return true;
};

export const checkLogin = (client, cookies) => {
  const isServer = typeof exports === 'object';
  if (isServer) {
    return serverCheckLogin(client, cookies);
  }
  return clientCheckLogin();
};
