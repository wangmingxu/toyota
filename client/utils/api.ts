import axios, { AxiosPromise } from 'axios';

type ApiMap = {
  getCity: string | Object;
  listLuckyDoy: string | Object;
  trans: string | Object;
};

type axiosMap<T> = { [P in keyof T]?: (args: any) => AxiosPromise<any> };

function apiConfig<T>(rMap: T) {
  return Object.keys(rMap).reduce<axiosMap<T>>((fMap, key) => {
    fMap[key] = data => {
      if (typeof rMap[key] === 'string') {
        return axios({ url: rMap[key], params: data });
      }
      return axios(Object.assign(rMap[key], { data }));
    };
    return fMap;
  }, {});
}

const API = apiConfig<ApiMap>({
  getCity: '/hangzhou/singleDog/getCity', //get
  // getCity: {
  //   url: '/hangzhou/singleDog/getCity', // post
  //   method: 'post',
  // },
  listLuckyDoy: '/activity/listLuckyDoy',
  trans: '//oauthbiz.lizhi.fm/checkAppTrans',
});

export default API;
