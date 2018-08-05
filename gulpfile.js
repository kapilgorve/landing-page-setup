const gulp = require('gulp');
const sass = require('gulp-sass');
const postCss = require('gulp-postcss');
const autoPrefixer = require('autoprefixer');
const connect = require('gulp-connect');
const watch = require('gulp-watch');

gulp.task('scss', function() {
  gulp
    .src('./scss/style.scss')
    .pipe(sass())
    .pipe(postCss([autoPrefixer()]))
    .on('error', function(err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(gulp.dest('./css/'));
});

gulp.task('webserver', function() {
  connect.server({
    port: 8080,
    livereload: true,
  });
});

gulp.task('livereload', function() {
  gulp
    .src(['./*.html', './scss/*.scss'])
    .pipe(watch())
    .pipe(connect.reload());
});

gulp.task('default', ['webserver', 'scss'], function() {
  gulp.watch('./scss/style.scss', ['scss']);
});
