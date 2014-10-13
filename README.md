gulp-sequence v0.1.1 [![Build Status](https://travis-ci.org/teambition/gulp-sequence.svg)](https://travis-ci.org/teambition/gulp-sequence)
====
> Run a series of gulp tasks in order.

## Install

Install with [npm](https://npmjs.org/package/gulp-sequence)

```
npm install --save-dev gulp-sequence
```


## Example

```js
var gulp = require('gulp'),
  gulpSequence = require('gulp-sequence');

gulp.task('a', function (cb) {
  //... cb()
});

gulp.task('b', function (cb) {
  //... cb()
});

gulp.task('c', function (cb) {
  //... cb()
});

gulp.task('d', function (cb) {
  //... cb()
});

gulp.task('e', function (cb) {
  //... cb()
});

// model 1, recommend
// 1. run 'a', 'b' in parallel;
// 2. run 'c' when 'a' and 'b' finished;
// 3. run 'd', 'e' in parallel after 'c'.
gulp.task('sequence-1', gulpSequence(['a', 'b'], 'c', ['d', 'e']));

// model 2
gulp.task('sequence-2', function (cb) {
  gulpSequence(['a', 'b'], 'c', ['d', 'e'], cb);
});

// model 3
gulp.task('sequence-3', function (cb) {
  gulpSequence(['a', 'b'], 'c', ['d', 'e'])(cb);
});

gulp.task('gulp-sequence', gulpSequence('sequence-1', 'sequence-2', 'sequence-3'));
```

## API

```js
var gulpSequence = require('gulp-sequence');
```

### gulpSequence('subtask1', 'subtask2',...[, callback])

## License

MIT © [Teambition](http://teambition.com)
