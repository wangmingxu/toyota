import shareCover from './assets/share_cover.jpg';

export const getDefaultShareData = () => ({
  url: `${location.origin}${location.pathname}#/`,
  link: `${location.origin}${location.pathname}#/`,
  title: '测试标题',
  desc: '测试描述',
  'image-url': shareCover,
  imgUrl: shareCover,
});

export const cookiePrefix = 'base_cityfm_single_dog';
export const tokenKey = `${cookiePrefix}token`;

export const wxJsConfUrl = '//oauthbiz.lizhi.fm/weixin/jsconfig?tag=cityfm';
export const wxAuthUrl = '//oauthbiz.lizhi.fm/weixin/wechatAuth?tag=cityfm';
export const lzAuthUrl = 'https://h5security.lizhi.fm/jsBridgeConfig/get';
export const fundebugApiKey = '294a8593da2207207c592dcd7364e84e913b366ca32bd592002dfc068c568f58';
export const BaiduStatID = '50f7f3f779102291f22b776ad51e5893';

export const baseUrlPath = process.env.NODE_ENV === 'production' ? '/hangzhou/singleDog' : '/';
