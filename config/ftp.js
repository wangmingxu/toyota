// const map = require('map-stream');
const fs = require('vinyl-fs');
const Ftp = require('vinyl-ftp');
const { name, versionToken } = require('../package.json');
const http = require('http');

// const log = (file, cb) => {
//   console.log(file.path);
//   cb(null, file);
// };

const conn = new Ftp({
  host: '210.14.152.195',
  port: 30000,
  user: 'guanggao',
  pass: 'lisu^hfs$ii',
});

fs.src(['./dist/**'], {
  buffer: false,
})
// .pipe(map(log))
  .pipe(conn.dest(`/2017/${name}`));

// 更新静态资源hash,根据不同的项目修改project参数
http.get(`http://oauthbiz.lizhi.fm/changeVersion?project=${versionToken}`, (rst) => {
  console.log(rst);
});
