import 'babel-polyfill';
import './styles/global.less';
import FastClick from 'fastclick';
import client from './utils/ua';
import lz from '@lizhife/lz-jssdk';
import { wxConfig, appConfig } from './config';
import {
  lzAuthUrl,
  wxJsConfUrl,
  fundebugApiKey,
  baiduTongjiID,
} from './constant';
import fundebug from 'fundebug-javascript';
import axios from 'axios';
import promiseFinally from 'promise.prototype.finally';
import first from 'lodash-es/first';

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

(window as any).lz = lz;
(window as any).isApp = client.isLizhiFM();
(window as any).isWX = client.isWeiXin();
(window as any).isWeiBo = client.isWeiBo();
(window as any).platform = client.whichPlatform();
document.documentElement.setAttribute('data-platform', (window as any).platform);
(window as any).debug = location.search.includes('debug');
(window as any).debug && import('eruda').then((eruda) => { eruda.init(); });

(window as any).shareData = {
  url: window.location.href,
  link: window.location.href,
  title: '全国单身踢馆歌手大赛',
  desc: '妈耶！单身汪怎么可以手撕情侣档？画面惨不忍睹……',
  'image-url': require('./assets/share_cover.jpg'),
  imgUrl: require('./assets/share_cover.jpg'),
};

// console.log(window.shareData);

if ((window as any).isApp) {
  appConfig(lzAuthUrl);
}

function onWXBridgeReady() {
  wxConfig(wxJsConfUrl);
  wx.ready(() => {
    wx.onMenuShareAppMessage((window as any).shareData);
    wx.onMenuShareTimeline((window as any).shareData);
  });
}
if ((window as any).isWX) {
  const cs = document.createElement('script');
  cs.src = '//res.wx.qq.com/open/js/jweixin-1.2.0.js';
  const s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(cs, s);
  cs.onload = () => {
    if (typeof WeixinJSBridge === 'undefined') {
      document.addEventListener('WeixinJSBridgeReady', onWXBridgeReady, false);
    } else {
      onWXBridgeReady();
    }
  };
}

const observer = new MutationObserver(((mutations) => {
  mutations.forEach((mutation) => {
    // console.log(mutation.type);
    if (mutation.type === 'childList') {
      const docHeight = document.documentElement.clientHeight;
      const _wrapperEle = first(document.querySelectorAll('.routerWrapper'));
      const pageEle = _wrapperEle.firstElementChild;
      const pageHeight = pageEle.clientHeight;
      const offsetHeight = Math.abs(pageHeight - docHeight);
      if (offsetHeight > 150) return;
      const scale = docHeight / pageHeight;
      (pageEle as any).style['transform-origin'] = '0 0';
      (pageEle as any).style.transform = `scaleY(${scale})`;
    }
  });
}));
observer.observe(document.getElementById('app'), {
  childList: true,
  subtree: true,
});

(window as any)._hmt = (window as any)._hmt || [];
(function () {
  const hm = document.createElement('script');
  hm.src = `https://hm.baidu.com/hm.js?${baiduTongjiID}`;
  const s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(hm, s);
}());
