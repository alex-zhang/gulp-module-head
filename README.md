gulp-wrapper
==============

> add contents before or after file contents. 

## Install
```
npm install --save-dev gulp-wrapper
```

## Usage

```js
var gulp = require('gulp');
var wrapper = require('gulp-wrapper');

gulp.task('default', function () {
  return gulp.src('app/*')
    .pipe(wrapper({
      header: 'This is Header \n',
      footer: 'n\This is Footer'
    }));
```

'header' and 'footer' can also be 'function' or 'Buffer'

```js
return gulp.src('app/*')
    .pipe(wrapper({
      header: function(f) {
        return 'This is Header \n';
      },
      footer: function() {
        return 'n\This is Footer';
      }
    }));
```

```js
return gulp.src('app/*')
    .pipe(wrapper({
      header: new Buffer(30),
      footer: new Buffer(20)
    }));
```

```js
return gulp.src('app/*')
    .pipe(wrapper({
      header: function(f) {
        return new Buffer(30);
      },
      footer: function() {
        return Buffer(20);
      }
    }));
```

## License

gulp-wrapper.js is [MIT Licensed](./LICENSE.md).