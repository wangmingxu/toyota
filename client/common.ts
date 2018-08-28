import './styles/global.less';
import FastClick from 'fastclick';
import { wxConfig, appConfig } from './config';
import { fundebugApiKey, baiduTongjiID } from './constant';
import { axiosInstance } from 'utils/api';
import { getToken } from 'utils/auth';
import ClientDetect from 'rc-useragent/ClientDetect';

require.ensure([], function(require) {
  const fundebug: any = require('fundebug-javascript');
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

const client = ClientDetect.getInstance();
document.documentElement.setAttribute('data-lizhi', client.isLizhiFM);
document.documentElement.setAttribute('data-platform', client.checkDeviceType());
window.debug = location.search.includes('debug');
window.isPre = location.host.includes('pre') || location.search.includes('pre');

// 添加请求拦截器
axiosInstance.interceptors.request.use((config) => {
  const { method } = config;
  const dataKey = /GET/i.test(method) ? 'params' : 'data';
  return getToken()
    .then((token) => {
      if (client.isLizhiFM) {
        Object.assign(config, {
          [dataKey]: Object.assign(config[dataKey] || {}, { token }),
        });
      } else if (client.isWeiXin) {
        Object.assign(config, {
          [dataKey]: Object.assign(config[dataKey] || {}, { openid: token }),
        });
      }
      return config;
    })
    .catch(() => Promise.resolve(config));
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

if (client.isLizhiFM) {
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
if (client.isWeiXin) {
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
