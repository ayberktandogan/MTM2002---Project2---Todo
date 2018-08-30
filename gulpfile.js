var gulp = require('gulp');
var sass = require('gulp-sass');
var min = require('gulp-clean-css');
var watch = require('gulp-watch');
var webpackStream = require('webpack-stream');
var webpack = require('webpack')

gulp.task("build:css", function () {
  return gulp
    .src("./css/src/**/*.scss")
    .pipe(sass())
    .pipe(min())
    .pipe(gulp.dest('./static/css'));
});

gulp.task('build:js', function () {
  return gulp.src('')
    .pipe(webpackStream({
      mode: 'development',
      watch: true,
      entry: {
        main: './js/src/main.js',
        login: './js/src/login.js',
        register: './js/src/register.js',
        index: './js/src/index.js',
        forIE: './js/src/forIE.js'
      },
      output: {
        filename: '[name].min.js'
      },
      plugins: [
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
        })
      ]
    }, webpack))
    .pipe(gulp.dest('./static/js'));
})

gulp.task('watch', function () {
  gulp.watch('./css/src/**/*.scss', ['build:css'])
})

gulp.task("watch", function () {
  gulp.watch("./css/src/**/*.scss", ["build:css"], ["build:js"]);
})

gulp.task("default", ["build:css", "build:js", "watch"])
