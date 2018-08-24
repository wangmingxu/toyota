import './styles/global.less';
import FastClick from 'fastclick';
import client from 'utils/ua';
import { wxConfig, appConfig } from './config';
import { fundebugApiKey, baiduTongjiID } from './constant';
import { axiosInstance } from 'utils/api';
import store from 'Store';
import get from 'lodash-es/get';

import('fundebug-javascript').then(fundebug => {
  fundebug.apikey = fundebugApiKey;
  fundebug.releasestage = process.env.NODE_ENV;
  fundebug.sampleRate = 0.3;
  fundebug.silentHttp = true;
  fundebug.filters = [
    {
      message: /^Script error\.$/,
    },
    {
      message: /Network Error/,
    },
    {
      message: /JSBridge/,
    },
    {
      target: {
        tagName: /^IMG$/,
      },
    },
  ];
});

FastClick.attach(document.body);

window.isApp = client.isLizhiFM();
window.isWX = client.isWeiXin();
window.isWeiBo = client.isWeiBo();
window.platform = client.selectPlatform();
document.documentElement.setAttribute('data-platform', window.platform);
window.debug = location.search.includes('debug');
window.isPre = location.host.includes('pre') || location.search.includes('pre');

// 添加请求拦截器
axiosInstance.interceptors.request.use((config) => {
  if (window.isApp) {
    const { method } = config;
    const dataKey = method === 'get' ? 'params' : 'data';
    Object.assign(config, {
      [dataKey]: Object.assign(config[dataKey] || {}, { token: get(store.getState(), ['Global', 'token']) }),
    });
  }
  return config;
});

window.shareData = {
  url: window.location.href,
  link: window.location.href,
  title: '全国单身踢馆歌手大赛',
  desc: '妈耶！单身汪怎么可以手撕情侣档？画面惨不忍睹……',
  'image-url': require('./assets/share_cover.jpg'),
  imgUrl: require('./assets/share_cover.jpg'),
};

// console.log(window.shareData);

if (window.isApp) {
  appConfig();
  lz.ready(() => {
    LizhiJSBridge.call('configShareUrl', {
      url: window.shareData.url, // 分享的url
      title: window.shareData.title, // 分享标题
      desc: window.shareData.desc, // 分享的描述
      'image-url': window.shareData.imgUrl, // 分享的图片
    }, (ret) => {
      console.log(ret);
    });
  });
}

function onWXBridgeReady() {
  wxConfig();
  wx.ready(() => {
    wx.onMenuShareAppMessage(window.shareData);
    wx.onMenuShareTimeline(window.shareData);
  });
}
if (window.isWX) {
  if (typeof WeixinJSBridge === 'undefined') {
    document.addEventListener('WeixinJSBridgeReady', onWXBridgeReady, false);
  } else {
    onWXBridgeReady();
  }
}

window._hmt = window._hmt || [];
(function () {
  const hm = document.createElement('script');
  hm.src = `https://hm.baidu.com/hm.js?${baiduTongjiID}`;
  const s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(hm, s);
}());