import 'babel-polyfill';
import './styles/global.less';
import FastClick from 'fastclick';
import client from 'utils/ua';
import lz from '@lizhife/lz-jssdk';
import { wxConfig, appConfig } from './config';
import { fundebugApiKey, baiduTongjiID } from './constant';
import fundebug from 'fundebug-javascript';
import axios from 'axios';
import promiseFinally from 'promise.prototype.finally';
import store from 'Store';
import get from 'lodash-es/get';

promiseFinally.shim();

fundebug.apikey = fundebugApiKey;
fundebug.releasestage = process.env.NODE_ENV;
// console.log(process.env.NODE_ENV);

// 添加请求拦截器
axios.interceptors.request.use(config =>
  Object.assign(config, {
    params: Object.assign(config.params || {}, { token: get(store.getState(), ['Global', 'token']) }),
  }));

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
  appConfig();
}

function onWXBridgeReady() {
  wxConfig();
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

(window as any)._hmt = (window as any)._hmt || [];
(function () {
  const hm = document.createElement('script');
  hm.src = `https://hm.baidu.com/hm.js?${baiduTongjiID}`;
  const s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(hm, s);
}());
