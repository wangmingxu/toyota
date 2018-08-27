import client from './ua';
import axios from 'axios';
import md5 from 'md5';

export const getDownloadUrl = () => 'http://a.app.qq.com/o/simple.jsp?pkgname=com.yibasan.lizhifm&g_f=991784#opened';

// 安卓端在微信和微博环境下需要提示从外部浏览器打开
export const checkCallAction = () => !(!client.isIPhone() && (client.isWeiXin() || client.isWeiBo()));

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
  if (client.isIPhone()) {
    location.href = `https://link.lizhi.fm/ulink/action/?downloadUrl=${encodeURIComponent(getDownloadUrl())}&action=${encodeURIComponent(JSON.stringify(action))}`;
  }
  location.href = `lizhifm://action?action=${encodeURIComponent(JSON.stringify(action))}&sp=${client.checkDeviceType()}&sa=sh`;
  setTimeout(() => {
    if (!document.hidden) {
      location.href = `https://link.lizhi.fm/ulink/action/?downloadUrl=${encodeURIComponent(getDownloadUrl())}&action=${encodeURIComponent(JSON.stringify(action))}`;
    }
  }, 2000);
};

export const loadCommand = async (action) => {
  const isPre = location.host.includes('pre') || location.search.includes('pre');
  const url = `https://${isPre ? 'commandpre' : 'command'}.lizhi.fm/get_command_code`;
  const requestId = md5(action.url || action.id);
  const { data: res } = await axios.get(url, {
    params: {
      requestId,
      commandType: action.type,
      commandContent: action.type === 7 ? JSON.stringify(action) : action.id,
      commandAddUser: 'custom',
      commandAddTime: new Date().getTime(),
    },
  });
  if (res.rcode !== 0) {
    return Promise.reject(new Error('获取口令失败'));
  }
  return res.data.commandCode;
};
