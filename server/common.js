const utils = require('../config/utils');
const { dev } = require('../config/build.config');

import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    if (config.url.charAt(0, 1) === '/') {
      config.url = `http://${utils.getIP()}:${dev.port}${config.url}`;
    }
    return config;
  },
  err => Promise.reject(err),
);
