import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { DefaultInterceptor, ServerResponse } from './DefaultInterceptor';

export const axiosInstance = axios.create();

export const registerInterceptor = interceptor => interceptor.call(axiosInstance);

export const unregisterInterceptor = (id) => {
  axiosInstance.interceptors.request.eject(id);
};

registerInterceptor(DefaultInterceptor);

const HttpMethods = ['GET', 'POST', 'PUT', 'DELETE'];

type axiosMap<T> = { [P in keyof T]?: <R extends AxiosRequestConfig>(args: any, config?: R) => AxiosPromise<ServerResponse> };

function apiConfig<T>(rMap: T) {
  return Object.keys(rMap).reduce<axiosMap<T>>((fMap, key) => {
    fMap[key] = (data, config = {}) => {
      if (typeof rMap[key] === 'string') {
        if (HttpMethods.some(v => rMap[key].startsWith(v))) {
          const [method, url] = rMap[key].split(' ');
          return axiosInstance.request(
            Object.assign(config, {
              url,
              method,
              [/GET/i.test(method) ? 'params' : 'data']: data,
            }),
          );
        }
        return axiosInstance.request(Object.assign(config, { url: rMap[key], params: data }));
      }
      return axiosInstance.request(Object.assign(rMap[key], { data }));
    };
    return fMap;
  }, {});
}

const fMap = {
  getCity: 'GET /hangzhou/singleDog/getCity',
  listLuckyDoy: 'POST /activity/listLuckyDoy',
  trans: 'GET //oauthbiz.lizhi.fm/checkAppTrans',
};

type ApiMap = typeof fMap;

const API = apiConfig<ApiMap>(fMap);

export default API;
