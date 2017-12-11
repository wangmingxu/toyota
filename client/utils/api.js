import axios from 'axios';

function apiConfig(rMap) {
  return Object.keys(rMap).reduce((fMap, key) => {
    fMap[key] = (data) => {
      if (typeof rMap[key] === 'string') {
        return axios({ url: rMap[key], params: data });
      }
      return axios(data);
    };
    return fMap;
  }, {});
}

const API = apiConfig({
  getCity: '/hangzhou/singleDog/getCity',
  listLuckyDoy: '/activity/listLuckyDoy',
  trans: '//oauthbiz.lizhi.fm/checkAppTrans',
});

export default API;
