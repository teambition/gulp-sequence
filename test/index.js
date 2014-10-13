'use strict';
/*global describe, it, before, after, beforeEach, afterEach, Promise, noneFn*/

var gulp = require('gulp'),
  gulpSequence = require('../index');

module.exports = function () {

  gulp.task('a', function (cb) {
    setTimeout(function () {
      console.log('a');
      cb();
    }, 100);
  });

  gulp.task('b', function (cb) {
    setTimeout(function () {
      console.log('b');
      cb();
    }, 500);
  });

  gulp.task('c', function (cb) {
    setTimeout(function () {
      console.log('c');
      cb();
    }, 200);
  });

  gulp.task('d', function (cb) {
    setTimeout(function () {
      console.log('d');
      cb();
    }, 50);
  });

  gulp.task('e', function (cb) {
    setTimeout(function () {
      console.log('e');
      cb();
    }, 800);
  });

  gulp.task('sequence-1', gulpSequence(['a', 'b'], 'c', ['d', 'e']));

  gulp.task('sequence-2', function (cb) {
    gulpSequence(['a', 'b'], 'c', ['d', 'e'], cb);
  });

  gulp.task('sequence-3', function (cb) {
    gulpSequence(['a', 'b'], 'c', ['d', 'e'])(cb);
  });

  gulp.task('gulp-sequence', gulpSequence('sequence-1', 'sequence-2', 'sequence-3'));

};
