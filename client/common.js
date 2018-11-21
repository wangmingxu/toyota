import babelHelpers from 'script-loader!../helpers.js'; //eslint-disable-line
import 'url-polyfill';
import './styles/global.less';
import FastClick from 'fastclick';
import { fundebugApiKey, BaiduStatKey } from './constant';

FastClick.attach(document.body);

require.ensure(
  [],
  require => {
    const fundebug = require('fundebug-javascript');
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
  },
  console.log,
  'fundebug'
);

if (/debug/.test(window.location.href)) {
  require.ensure(
    [],
    require => {
      const eruda = require('eruda');
      eruda.init();
    },
    console.log,
    'eruda'
  );
}

window._hmt = window._hmt || [];
(function() {
  const hm = document.createElement('script');
  hm.src = `https://hm.baidu.com/hm.js?${BaiduStatKey}`;
  const s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(hm, s);
})();
