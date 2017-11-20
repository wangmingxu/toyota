import axios from 'axios';

function apiConfig(map) {
  const rMap = map;

  return Object.keys(rMap).reduce((fMap, key) => {
    fMap[key] = (data) => {
      if (typeof rMap[key] === 'string') {
        return axios({ url: rMap[key], data });
      }
      return rMap[key](data);
    };
    return fMap;
  }, {});
}

const API = apiConfig({
  getCity: '/hangzhou/singleDog/getCity',
  mineSchool: '/oldSchool/mineSchool',
  loadNotice: '/oldSchool/loadNotice',
  listFireSchool: '/oldSchool/listFireSchool',
  searchSchool: '/oldSchool/searchSchool',
  addSchool: '/oldSchool/addSchool',
  addQqGroup: '/oldSchool/addQqGroup',
  schoolInfo: '/oldSchool/schoolInfo',
  listAudio: '/oldSchool/listAudio',
  addAudio: '/oldSchool/addAudio',
  audioInfo: '/oldSchool/audioInfo',
  loadAudioCount: '/oldSchool/loadAudioCount',
  mineAudio: '/oldSchool/mineAudio',
  trans: '//oauthbiz.lizhi.fm/checkAppTrans',
});

export default API;
