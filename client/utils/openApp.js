import client from './ua';

export const getDownloadUrl = () => 'http://a.app.qq.com/o/simple.jsp?pkgname=com.yibasan.lizhifm&g_f=991784#opened';

export const openLive = (liveId, radioId) => {
  if (client.isLizhiFM()) {
    location.href = `lizhifm://www.lizhi.fm?clientparams=17,${liveId},${radioId}`;
  } else if (client.isWeiXin()) {
    location.href = `https://appweb.lizhi.fm/live/share?liveId=${liveId}`;
  } else if (client.isIPhone()) {
    location.href = `lizhifm://com.yibasan.lizhifm/?&action=live&liveId=${liveId}&radioId=${radioId}`;
  } else {
    location.href = `lizhifm://com.yibasan.lizhifm?live=${liveId}`;
  }
};

export const openWithAction = (action) => {
  if (!client.isIPhone() && (client.isWeiXin() || client.isWeiBo())) {
    return false;// 安卓端在微信和微博环境下需要提示从外部浏览器打开
  }
  if (client.isIPhone()) {
    location.href = `https://link.lizhi.fm/ulink/action/?downloadUrl=${encodeURIComponent(getDownloadUrl())}&action=${encodeURIComponent(JSON.stringify(action))}`;
    return true;
  }
  location.href = `lizhifm://action?action=${encodeURIComponent(JSON.stringify(action))}&sp=${window.platform}&sa=sh`;
  setTimeout(() => {
    if (!document.hidden) {
      location.href = `https://link.lizhi.fm/ulink/action/?downloadUrl=${encodeURIComponent(getDownloadUrl())}&action=${encodeURIComponent(JSON.stringify(action))}`;
    }
  }, 2000);
  return true;
};
