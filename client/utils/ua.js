const ua = navigator.userAgent;
const lang = (navigator.browserLanguage || navigator.language).toLowerCase();

function isIE() {
  // IE内核
  return ua.indexOf('Trident') > -1;
}

function isOpera() {
  // opera内核
  return ua.indexOf('Presto') > -1;
}

function isWebKit() {
  // 苹果/谷歌内核
  return ua.indexOf('AppleWebKit') > -1;
}

function isFireFox() {
  // 火狐内核
  return ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1;
}

function isMobile() {
  // 移动终端
  return !!ua.match(/AppleWebKit.*Mobile.*/);
}

function isIOS() {
  // ios终端
  return !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

function isAndroid() {
  // android终端/uc浏览器
  return ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1;
}

function isIPhone() {
  // iPhone/QQHD浏览器
  return ua.indexOf('iPhone') > -1;
}

function isIPad() {
  // iPad
  return ua.indexOf('iPad') > -1;
}

function isWebApp() {
  // web应该程序，没有头部与底部
  return ua.indexOf('Safari') === -1;
}

function isWeiBo() {
  // 微博
  return !!ua.match(/Weibo/i);
}

function isWeiXin() {
  // 微信
  return !!ua.match(/MicroMessenger/i);
}

function isUC() {
  // uc
  return !!ua.match(/UCBrowser/i);
}

function isQQ() {
  // qq
  return !!ua.match(/QQBrowser/i);
}

function isSafari() {
  // safari
  return !!ua.match(/Safari/i);
}

function isLizhiFM() {
  // lizhifm
  if (ua.match(/LizhiFM/i) !== null) {
    return true;
  }
  if (typeof LizhiJSBridge !== 'undefined') {
    return true;
  }

  return false;
}

function checkPlatform() {
  if (isIPhone()) {
    if ([812, 724, 690].includes(screen.height) && screen.width === 375) {
      return 'IPhoneX';
    }
    return 'IPhone';
  } else if (screen.width < 768) {
    return 'Android';
  }
  return 'Desktop';
}

export default {
  ua,
  lang,
  isIE,
  isOpera,
  isWebKit,
  isFireFox,
  isMobile,
  isIOS,
  isAndroid,
  isIPhone,
  isIPad,
  isWebApp,
  isWeiBo,
  isWeiXin,
  isUC,
  isQQ,
  isSafari,
  isLizhiFM,
  checkPlatform,
};
