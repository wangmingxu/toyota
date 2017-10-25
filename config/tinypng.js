const path = require('path');
const gulp = require('gulp');
const tingpng = require('gulp-tinypng');
const { build } = require('./build.config');

const assetsPath = path.join(build.assetsRoot, build.assetsSubDirectory, 'assets');

gulp.task('tinypng', () => {
  gulp.src([path.join(assetsPath, '*.jpg'), path.join(assetsPath, '*.png'), path.join(assetsPath, '*.jpeg')])
    .pipe(tingpng(build.tinyApiKey)) // tinypng_api_key
    .pipe(gulp.dest(assetsPath));
});
