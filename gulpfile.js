const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const changed = require('gulp-changed');
const spritesmith = require('gulp.spritesmith');

// const del = require('del');
const browserSync = require('browser-sync').create();
// const proxy = require('http-proxy-middleware');

let Pathconfig = {
  sassSrcPath: __dirname + "/css/**/*.scss",
  sassDestPath: __dirname + "/css/",
  htmlSrcPath: __dirname + "**/*.html"
}

gulp.task('serve', function() {
  browserSync.init({
    port: 8888,
    server: __dirname,
    browser: 'google chrome'
  });

  gulp.watch([Pathconfig.sassSrcPath], ['sass']).on('change', browserSync.reload);
  gulp.watch([Pathconfig.htmlSrcPath]).on('change', browserSync.reload);
})

gulp.task('sass', function() {
  gulp.src(Pathconfig.sassSrcPath)
    .pipe(changed(Pathconfig.sassSrcPath))
    .pipe(sourcemaps.init())
    .pipe(sass({
      // compress: true
    }).on('error', sass.logError))
    .pipe(concat('build.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.stream());
})

gulp.task('default', ['serve'])
