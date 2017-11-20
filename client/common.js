import 'babel-polyfill';
import './styles/global.less';
import './styles/antd-fix.less';
import FastClick from 'fastclick';
import client from './utils/ua';
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

promiseFinally.shim();

fundebug.apikey = fundebugApiKey;
fundebug.releasestage = process.env.NODE_ENV;
// console.log(process.env.NODE_ENV);

FastClick.attach(document.body);

window.isApp = client.isLizhiFM();
window.isWX = client.isWeiXin();
window.isWeiBo = client.isWeiBo();

window.shareData = {
  url: window.location.href,
  link: window.location.href,
  title: '全国单身汪踢馆歌手大赛',
  desc: '妈耶！单身汪怎么可以手撕情侣档？画面惨不忍睹……',
  'image-url': require('./assets/share_cover.png'),
  imgUrl: require('./assets/share_cover.png'),
};

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
