import axios from 'axios';

// 添加响应拦截器
axios.interceptors.response.use(
  response => Promise.resolve(response.data), // 避免每次都要写res.data.xxx
  error => Promise.reject(error),
);

const HttpMethods = ['GET', 'POST', 'PUT', 'DELETE'];

function apiConfig(rMap) {
  return Object.keys(rMap).reduce((fMap, key) => {
    fMap[key] = (data) => {
      if (typeof rMap[key] === 'string') {
        if (HttpMethods.some(v => rMap[key].startsWith(v))) {
          const [method, url] = rMap[key].split(' ');
          return axios({ url, method, [method.toUpperCase() === 'GET' ? 'params' : 'data']: data });
        }
        return axios({ url: rMap[key], params: data });
      }
      return axios(Object.assign(rMap[key], { data }));
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
