// const map = require('map-stream');
const fs = require('vinyl-fs');
const Ftp = require('vinyl-ftp');
const { name } = require('../package.json');
const request = require('request');

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

//更新静态资源hash,需要修改project参数
request('http://oauthbiz.lizhi.fm/changeVersion?project=base_cityfm_old_school', (error, response, body) => {
  console.log(body);
});
