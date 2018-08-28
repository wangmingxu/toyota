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
  }
};

export const getToken = async () => {
  const cookies = new Cookies();
  const client = ClientDetect.getInstance();
  if (client.isLizhiFM) {
    const r2 = await lz.getToken({ needRefresh: true });
    if (r2.status === 'success') {
      cookies.set(tokenKey, r2.token);
      return r2.token;
    }
  } else if (client.isWeiXin) {
    const qs = new URLSearchParams(location.search);
    const openid = qs.get('openid');
    if (openid) {
      openid && cookies.set(tokenKey, openid);
      return openid;
    }
  }
  return cookies.get(tokenKey);
};

export const checkLogin = async () => {
  const client = ClientDetect.getInstance();
  if (client.isLizhiFM) {
    await new Promise((resolve) => { lz.ready(resolve); });
    const r1 = await lz.getSessionUser();
    return Boolean(r1.id);
  } else if (client.isWeiXin) {
    const openid = await getToken();
    return Boolean(openid);
  }
  return true;
};
