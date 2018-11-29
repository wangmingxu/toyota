const path = require('path');
const express = require('express');
const useragent = require('express-useragent');
const proxyMiddleware = require('proxy-middleware');
const clientRoute = require('./middlewares/clientRoute');
const proxyTable = require('../proxy/prod/proxyTable');

const app = express();
const { build } = require('../config/build.config');

// proxy api requests
Object.keys(proxyTable).forEach((context) => {
  const options = proxyTable[context];
  app.use(context, proxyMiddleware(options));
});

app.use(useragent.express());

app.use(express.static(path.resolve(__dirname, '../../dist')));
// console.log(common.distPath);

app.set('views', path.resolve(__dirname, '../../views/prod'));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.use(clientRoute);

app.listen(build.port, () => {
  console.log(`App listening on port ${build.port}!\n`);
});
