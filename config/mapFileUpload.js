require('babel-register')({
  presets: ['es2015'],
});
const { fundebugApiKey } = require('../client/constant');

const { exec } = require('child_process');

const cmdStr = `fundebug-cli upload --apikey ${fundebugApiKey} --directory dist/client/js`;

exec(cmdStr, (err, stdout, stderr) => {
  if (err) {
    console.log(stderr);
  } else {
    console.log(stdout);
  }
});
