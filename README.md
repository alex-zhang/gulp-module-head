gulp-wrapper2
==============

> add contents before or after file contents. 

## Install
```
npm install --save-dev gulp-wrapper2
```

## Usage

```js
var gulp = require('gulp');
var wrapper2 = require('gulp-wrapper2');

gulp.task('default', function () {
  return gulp.src('app/*')
    .pipe(wrapper2({
      header: 'This is Header \n',
      footer: 'n\This is Footer'
    }));
```

'header' and 'footer' can also be 'function' or 'Buffer'

```js
return gulp.src('app/*')
    .pipe(wrapper2({
      header: function(f) {
        return 'This is Header \n';
      },
      footer: function(f) {
        return 'n\This is Footer';
      }
    }));
```

```js
return gulp.src('app/*')
    .pipe(wrapper2({
      header: new Buffer(30),
      footer: new Buffer(20)
    }));
```

```js
return gulp.src('app/*')
    .pipe(wrapper2({
      header: function(f) {
        return new Buffer(30);
      },
      footer: function(f) {
        return Buffer(20);
      }
    }));
```

## License

gulp-wrapper2.js is [MIT Licensed](./LICENSE.md).