/**
 * 配置的相关工具函数
 */
const path = require('path');
const fs = require('fs');
const config = require('./build.config');
const os = require('os');
const { exec } = require('child_process');

// 自动获取入口配置
exports.getEntrys = function(dirname) {
  return fs.readdirSync(dirname).reduce((entries, dir) => {
    if (!fs.statSync(path.join(dirname, dir)).isDirectory()) {
      const fileArr = dir.split('.');
      const fileName = fileArr[0];
      const ext = fileArr[1];
      if (ext === 'js') {
        // 仅js文件为入口文件
        entries[fileName] = path.join(dirname, dir);
      }
    }
    return entries;
  }, {});
};

// 获取本地IP
exports.getIP = function() {
  const ifaces = os.networkInterfaces();
  let ip = '127.0.0.1';
  Object.keys(ifaces).forEach(key => {
    if (ifaces[key].family === 'IPv4' && !ifaces[key].internal) {
      ip = ifaces[key].address;
    }
  });
  return ip;
};

// 自动打开浏览器
exports.open = function(url) {
  let cmd;
  if (process.platform === 'win32') {
    cmd = 'explorer';
  } else if (process.platform === 'linux') {
    cmd = 'xdg-open';
  } else if (process.platform === 'darwin') {
    cmd = 'open';
  }
  exec(`${cmd} "${url}"`);
};

// 设置输出路径
exports.assetsPath = function(_path) {
  const assetsSubDirectory =
    process.env.NODE_ENV === 'production'
      ? config.build.assetsSubDirectory
      : config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path);
};
