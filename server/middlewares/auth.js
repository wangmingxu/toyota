import axios from 'axios';
import { tokenKey } from '../../client/constant.ts';
import { toggleAuthStatus, collectErrMsg } from '../../client/Action/global.ts';

module.exports = function (req, res, next) {
  const { store, universalCookies, useragent } = req;
  const token = universalCookies.get(tokenKey);
  req.axiosRequestHook = axios.interceptors.request.use(
    (config) => {
      if (token) {
        config.params.token = token; // 转发token
      }
      config.headers.common['User-Agent'] = useragent.source;// 转发User-Agent
      return config;
    },
    err => Promise.reject(err),
  );
  req.axiosResponseHook = axios.interceptors.response.use(
    (response) => {
      if (response.status === 2) {
        store.dispatch(toggleAuthStatus(false));
      }
      if (response.msg && response.msg.length > 0) {
        store.dispatch(collectErrMsg(response.msg));
      }
      return response;
    },
    error =>
      Promise.reject(error),
  );
  next();
};
