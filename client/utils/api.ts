import axios, { AxiosPromise, AxiosResponse, AxiosError, AxiosStatic } from 'axios';

export const axiosInstance = axios.create();

// 后端返回的数据结构体,默认是{status:xx,data:xx,msg:xx}
// 有些可能返回的是{rCode:xx,data:xx,message:xx}},根据项目而定
// 如果项目同时有多种结构体，可以考虑做成数组
const ResponseStructure = {
  status: 'status',
  data: 'data',
  msg: 'msg',
};

// 后端返回的状态码
enum ResponseStateEnum {
  SUCCESS = 0,
  NO_LOGIN = 2,
}

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => Promise.resolve(response.data), // 避免每次都要写res.data.xxx
  (error: AxiosError) => Promise.reject(error),
);

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  response => {
    const { status, msg } = ResponseStructure;
    if (response[status] === ResponseStateEnum.SUCCESS) {
      return Promise.resolve(response);
    }
    return Promise.reject(response[msg]);
  },
  error => Promise.reject(error),
);

const HttpMethods = ['GET', 'POST', 'PUT', 'DELETE'];

interface CustomResponse {
  code: number;
  data: any;
  msg: string;
}

type axiosMap<T> = { [P in keyof T]?: (args: any) => AxiosPromise<CustomResponse> };

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
