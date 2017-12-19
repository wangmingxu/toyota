import 'babel-polyfill';
import './styles/global.less';
import FastClick from 'fastclick';
import client from './utils/ua';
import getAppLink from './utils/appLink';
import { wxConfig, appConfig } from './config';
import {
  lzAuthUrl,
  wxJsConfUrl,
  fundebugApiKey,
} from './constant';
import fundebug from 'fundebug-javascript';
import axios from 'axios';
import promiseFinally from 'promise.prototype.finally';
import lz from '@lizhife/lz-jssdk';
import shareCover from './assets/share_cover.jpg';
import first from 'lodash/first';

promiseFinally.shim();

fundebug.apikey = fundebugApiKey;
fundebug.releasestage = process.env.NODE_ENV;
// console.log(process.env.NODE_ENV);

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

// console.log(window.shareData);

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

const observer = new MutationObserver(((mutations) => {
  mutations.forEach((mutation) => {
    console.log(mutation.type);
    if (mutation.type === 'childList') {
      const _wrapperEle = first(document.querySelectorAll('.routerWrapper'));
      const pageEle = _wrapperEle.firstChild;
      const wrapperHeight = _wrapperEle.clientHeight;
      const pageHeight = pageEle.clientHeight;
      const offsetHeight = Math.abs(pageHeight - wrapperHeight);
      if (offsetHeight > 150) return;
      const scale = wrapperHeight / pageHeight;
      pageEle.style['transform-origin'] = '0 0';
      pageEle.style.transform = `scaleY(${scale})`;
    }
  });
}));
observer.observe(document.getElementById('app'), {
  childList: true,
  subtree: true,
});

window._hmt = window._hmt || [];
(function () {
  const hm = document.createElement('script');
  hm.src = 'https://hm.baidu.com/hm.js?50f7f3f779102291f22b776ad51e5893';
  const s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(hm, s);
}());
