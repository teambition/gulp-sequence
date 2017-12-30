'use strict'

const gulp = require('gulp')
const gulpSequence = require('./index')
const test = require('./test/index')

test()

gulp.task('default', gulpSequence('test'))
