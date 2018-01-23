import axios from 'axios';

function apiConfig(rMap) {
  return Object.keys(rMap).reduce((fMap, key) => {
    fMap[key] = (data) => {
      if (typeof rMap[key] === 'string') {
        return axios({ url: rMap[key], params: data });
      }
      return axios(Object.assign(rMap[key], { data }));
    };
    return fMap;
  }, {});
}

const API = apiConfig({
  // getCity: '/hangzhou/singleDog/getCity',//get
  getCity: {
    url: '/hangzhou/singleDog/getCity', // post
    method: 'post',
  },
  listLuckyDoy: '/activity/listLuckyDoy',
  trans: '//oauthbiz.lizhi.fm/checkAppTrans',
});

export default API;
