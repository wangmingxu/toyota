import './styles/global.less';
import FastClick from 'fastclick';
import { wxConfig, appConfig } from './config';
import { fundebugApiKey, BaiduStatID } from './constant';
import { registerInterceptor } from 'utils/api';
import { clientJWTInterceptor } from 'utils/JWTInterceptor';
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

if (/debug/.test(location.href)) {
  require.ensure([], (require) => {
    const eruda: any = require('eruda');
    eruda.init();
  });
}

FastClick.attach(document.body);

const client = ClientDetect.getInstance();
document.documentElement.setAttribute('data-platform', client.checkDeviceType());

// 请求拦截器,获取token并添加到请求参数中
registerInterceptor(clientJWTInterceptor);

const shareData = {
  url: location.href,
  link: location.href,
  title: '全国单身踢馆歌手大赛',
  desc: '妈耶！单身汪怎么可以手撕情侣档？画面惨不忍睹……',
  'image-url': require('./assets/share_cover.jpg'),
  imgUrl: require('./assets/share_cover.jpg'),
};

if (client.isLizhiFM) {
  appConfig();
  lz.ready(() => {
    LizhiJSBridge.call('configShareUrl', shareData, (ret) => {
      console.log(ret);
    });
  });
}

function onWXBridgeReady() {
  wxConfig();
  wx.ready(() => {
    wx.onMenuShareAppMessage(shareData);
    wx.onMenuShareTimeline(shareData);
  });
}
if (client.isWeiXin) {
  if (typeof WeixinJSBridge === 'undefined') {
    document.addEventListener('WeixinJSBridgeReady', onWXBridgeReady, false);
  } else {
    onWXBridgeReady();
  }
}

(function () {
  window._hmt = window._hmt || [];
  const hm = document.createElement('script');
  hm.src = `https://hm.baidu.com/hm.js?${BaiduStatID}`;
  const s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(hm, s);
}());
