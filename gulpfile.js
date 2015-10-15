var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');

var paths = {
  sass: ['./scss/**/*.scss', './scss/**/*.sass'],
  stylus: ['./scss/**/*.styl'],
  jade: ['./www/jade/**/*.jade'],
  js : ['./www/js/*.js', './www/js/**/*.js']
};

gulp.task('default', ['sass', 'stylus', 'jade']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('stylus', function (done) {
  gulp.src(paths.stylus)
    .pipe(stylus())
    .pipe(gulp.dest('./www/'))
    .on('end', done);
});

gulp.task('jade', function (done) {
  gulp.src(paths.jade)
    .pipe(jade())
    .pipe(gulp.dest('./www/views/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  // gulp.watch(paths.stylus, ['stylus']);
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.js, ['index']);
});



gulp.task('index', function() {
  return gulp.src('./www/index.html')
    .pipe(inject(gulp.src(paths.js, { read : false}), {relative : true}))
    .pipe(gulp.dest('./www'))
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
