const path = require('path');
const gulp = require('gulp');
const tingpng = require('gulp-tinypng');
const { common, build } = require('./build.config');

const assetsPath = path.join(common.clientPath, 'assets');

gulp.task('tinypng', () => {
  gulp.src([path.join(assetsPath, '**/*.jpg'), path.join(assetsPath, '**/*.png'), path.join(assetsPath, '**/*.jpeg')])
    .pipe(tingpng(build.tinyApiKey)) // tinypng_api_key
    .pipe(gulp.dest(assetsPath));
});
