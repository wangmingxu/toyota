import 'babel-polyfill';
import './styles/global.less';
import './styles/antd-fix.less';
import FastClick from 'fastclick';
import client from './utils/ua';
import getAppLink from './utils/appLink';
import { wxConfig, appConfig } from './config';
import {
  cookiePrefix,
  lzAuthUrl,
  wxJsConfUrl,
  fundebugApiKey,
  wxAuthUrl,
} from './constant';
import fundebug from 'fundebug-javascript';
import axios from 'axios';
import promiseFinally from 'promise.prototype.finally';
import lz from '@lizhife/lz-jssdk';
import shareCover from './assets/share_cover.jpg';

promiseFinally.shim();

fundebug.apikey = fundebugApiKey;
fundebug.releasestage = process.env.NODE_ENV;
// console.log(process.env.NODE_ENV);

FastClick.attach(document.body);

window.lz = lz;
window.isApp = client.isLizhiFM();
window.isWX = client.isWeiXin();
window.isWeiBo = client.isWeiBo();
window.getAppLink = getAppLink;

window.shareData = {
  url: window.location.href,
  link: window.location.href,
  title: '全国单身踢馆歌手大赛',
  desc: '妈耶！单身汪怎么可以手撕情侣档？画面惨不忍睹……',
  'image-url': shareCover,
  imgUrl: shareCover,
};

console.log(window.shareData);

if (window.isApp) {
  appConfig(lzAuthUrl);
}

if (window.isWX) {
  wxConfig(wxJsConfUrl);
  wx.ready(() => {
    wx.onMenuShareAppMessage(window.shareData);
    wx.onMenuShareTimeline(window.shareData);
  });
}

if (window.isWeiBo) {
  window.location.href = `${wxAuthUrl}&cookie_key=${cookiePrefix}wbid&redirectURL=${encodeURIComponent(window.location.href)}`;
}

// 添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.data.status !== 0) {
      fundebug.notifyError(new Error(response.data.msg));
    }
    return response.data;
  },
  error =>
    Promise.reject(error),
);

window._hmt = window._hmt || [];
(function () {
  const hm = document.createElement('script');
  hm.src = 'https://hm.baidu.com/hm.js?50f7f3f779102291f22b776ad51e5893';
  const s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(hm, s);
}());
