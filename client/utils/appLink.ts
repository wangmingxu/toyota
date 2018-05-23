import client from './ua';

export default (liveId, radioId) => {
  if (client.isLizhiFM()) {
    return `lizhifm://www.lizhi.fm?clientparams=17,${liveId},${radioId}`;
  }
  if (client.isWeiXin()) {
    return `https://appweb.lizhi.fm/live/share?liveId=${liveId}`;
  }
  if (client.isIPhone()) {
    return `lizhifm://com.yibasan.lizhifm/?&action=live&liveId=${liveId}&radioId=${radioId}`;
  }
  return `lizhifm://com.yibasan.lizhifm?live=${liveId}`;
};

