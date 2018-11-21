const path = require('path');
const express = require('express');
const proxyMiddleware = require('proxy-middleware');
const proxyTable = require('../proxy/prod/proxyTable');

const app = express();
const { dev } = require('../config/build.config');

// proxy api requests
Object.keys(proxyTable).forEach(context => {
  const options = proxyTable[context];
  app.use(context, proxyMiddleware(options));
});

app.use(express.static(path.resolve(__dirname, '../dist')));
// console.log(common.distPath);

app.listen(dev.port, () => {
  console.log(`App listening on port ${dev.port}!\n`);
});
