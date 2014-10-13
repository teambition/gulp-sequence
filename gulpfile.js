'use strict';

var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  gulpSequence = require('./index'),
  test = require('./test/index');

gulp.task('jshint', function () {
  return gulp.src(['index.js', 'gulpfile.js', 'test/index.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

test();

gulp.task('test', ['gulp-sequence']);

gulp.task('default', gulpSequence('jshint', 'test'));
