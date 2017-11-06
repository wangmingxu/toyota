require('./common.js');
const path = require('path');
const express = require('express');
const clientRoute = require('./middlewares/clientRoute');

const app = express();
const { dev, common } = require('../config/build.config');

app.use(express.static(path.resolve(__dirname, '../../dist')));
console.log(common.distPath);
app.set('views', path.resolve(__dirname, '../../views/prod'));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.use(clientRoute);

// Serve the files on port 3000.
app.listen(dev.port, () => {
  console.log(`Example app listening on port ${dev.port}!\n`);
});
