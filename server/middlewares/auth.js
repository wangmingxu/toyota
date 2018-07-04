import axios from 'axios';
import { dev } from '../../config/build.config';
import { tokenKey } from '../../client/constant.ts';
import { toggleAuthStatus, collectErrMsg } from '../../client/Action/global.ts';

module.exports = function (req, res, next) {
  const { store, universalCookies, useragent } = req;
  const token = universalCookies.get(tokenKey);
  axios.defaults.baseURL = `${req.protocol}://${req.hostname}:${dev.port}`;// 兼容客户端以相对路径进行请求的情况
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
      if (response.status !== 0) {
        response.msg && store.dispatch(collectErrMsg(response.msg)); // 同步错误信息到客户端
        if (response.status === 2) {
          store.dispatch(toggleAuthStatus(false));
        }
      }
      return response;
    },
    error =>
      Promise.reject(error),
  );
  next();
};
