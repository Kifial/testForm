var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var prefixer = require('gulp-autoprefixer');
var babel = require('babel-core');
var glob = require('gulp-sass-glob');
var gutil = require('gulp-util');
var webpack = require('webpack');

import { webpackConfig } from './webpack.config';

gulp.task('scripts', function() {
  webpack(webpackConfig, function(err, stats) {
    if (err) {
      throw new gutil.PluginError("webpack", err);
    }
    gutil.log("[webpack]", stats.toString({
      chunks: false,
      colors: true,
      errorDetails: true
    }));
  })
});

gulp.task('server-scripts', function() {
  return gulp.src('app/server.js')
    .pipe(gulp.dest('dist'));
});

gulp.task('style', function() {
  return gulp.src('app/Assets/main.scss')
    .pipe(plumber())
    .pipe(glob())
    .pipe(sass())
    .pipe(prefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('markup', function() {
  return gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('app/**/*.jsx', ['scripts']);
  gulp.watch('app/*.js', ['server-scripts']);
  gulp.watch('app/**/*.scss', ['style']);
  gulp.watch('app/*.html', ['markup']);
});
