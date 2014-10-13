'use strict';
/*
 * gulp-sequence
 * https://github.com/teambition/gulp-sequence
 *
 * Copyright (c) 2014 Yan Qing
 * Licensed under the MIT license.
 */

var gulp = require('gulp');
var Thunk = require('thunks')();
var gutil = require('gulp-util');
var packageName = require('./package.json').name;

module.exports = function () {
  var BREAKER = {};
  var args = Array.prototype.slice.call(arguments);
  var callback = args[args.length - 1];

  if (typeof callback === 'function') args.pop();
  else callback = null;

  if (!args.length) throw new gutil.PluginError(packageName, 'No tasks were provided to gulp-sequence!');

  function genTask(task) {
    if (!Array.isArray(task)) task = [task];
    return function (error) {
      if (error) return Thunk.digest(error);
      return Thunk(function (cb) {
        function successListener(e) {
          var index = task.indexOf(e.task);
          if (index < 0) return;
          task[index] = BREAKER;
          for (var i = 0; i < task.length; i++) {
            if (task[i] !== BREAKER) return;
          }
          removeListener();
          cb();
        }

        function errorListener(e) {
          if (!e.err || task.indexOf(e.task) < 0) return;
          removeListener();
          cb(e.err);
        }

        function removeListener() {
          gulp.removeListener('task_stop', successListener)
            .removeListener('task_not_found', errorListener)
            .removeListener('task_recursion', errorListener)
            .removeListener('task_err', errorListener);
        }

        gulp
          .on('task_stop', successListener)
          .on('task_not_found', errorListener)
          .on('task_recursion', errorListener)
          .on('task_err', errorListener)
          .start(task.slice());
      });
    };
  }

  function runSequence(cb) {
    var thunk = Thunk();
    for (var i = 0; i < args.length; i++) thunk = thunk(genTask(args[i]));
    return thunk(cb);
  }

  if (callback) return runSequence(callback);
  return runSequence;
};
