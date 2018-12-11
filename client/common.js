import babelHelpers from 'script-loader!../helpers.js'; //eslint-disable-line
import 'url-polyfill';
import './styles/global.less';
import FastClick from 'fastclick';
import { initBaiduStat, initFundebug } from '@/utils/stat';

FastClick.attach(document.body);

initFundebug();

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

initBaiduStat();
