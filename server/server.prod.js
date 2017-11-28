const path = require('path');
const express = require('express');
const cookiesMiddleware = require('universal-cookie-express');
const useragent = require('express-useragent');
const clientRoute = require('./middlewares/clientRoute');
const proxyMiddleware = require('proxy-middleware');
const proxyTable = require('../proxy/prod/proxyTable');

const app = express();
const { dev } = require('../config/build.config');
const authMiddleware = require('./middlewares/auth');
const bindStoreMiddleware = require('./middlewares/bindStore');
const promiseFinally = require('promise.prototype.finally');
require('./utils/axiosHook');

promiseFinally.shim();

// proxy api requests
Object.keys(proxyTable).forEach((context) => {
  const options = proxyTable[context];
  app.use(context, proxyMiddleware(options));
});

app.use(cookiesMiddleware());
app.use(useragent.express());

app.use(express.static(path.resolve(__dirname, '../../dist')));
// console.log(common.distPath);

app.set('views', path.resolve(__dirname, '../../views/prod'));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.use(bindStoreMiddleware);
app.use(authMiddleware);
app.use(clientRoute);

app.listen(dev.port, () => {
  console.log(`App listening on port ${dev.port}!\n`);
});
