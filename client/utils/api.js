import axios from 'axios';

export const axiosInstance = axios.create();

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  response => Promise.resolve(response.data), // 避免每次都要写res.data.xxx
  error => Promise.reject(error),
);

const HttpMethods = ['GET', 'POST', 'PUT', 'DELETE'];

function apiConfig(rMap) {
  return Object.keys(rMap).reduce((fMap, key) => {
    fMap[key] = (data, config = {}) => {
      if (typeof rMap[key] === 'string') {
        if (HttpMethods.some(v => rMap[key].startsWith(v))) {
          const [method, url] = rMap[key].split(' ');
          return axiosInstance(Object.assign(
            config,
            { url, method, [method.toUpperCase() === 'GET' ? 'params' : 'data']: data },
          ));
        }
        return axiosInstance(Object.assign(config, { url: rMap[key], params: data }));
      }
      return axiosInstance(Object.assign(rMap[key], { data }));
    };
    return fMap;
  }, {});
}

const api = apiConfig({
  getCity: 'GET /hangzhou/singleDog/getCity',
  listLuckyDoy: 'POST /activity/listLuckyDoy',
  trans: 'GET //oauthbiz.lizhi.fm/checkAppTrans',
});

export default api;
