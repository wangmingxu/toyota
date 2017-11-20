const utils = require('../../config/utils');
const { dev } = require('../../config/build.config');
const axios = require('axios');

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    if (config.url.charAt(0, 1) === '/') {
      config.url = `http://${utils.getIP()}:${dev.port}${config.url}`;// 兼容客户端以相对路径进行请求的情况
    }
    return config;
  },
  err => Promise.reject(err),
);

// 响应拦截器
axios.interceptors.response.use(
  response => response.data, // 避免每次都要写res.data.xxx
  error =>
    Promise.reject(error),
);
