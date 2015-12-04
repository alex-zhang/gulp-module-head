'use strict';

var through2 = require("through2");
var gulpUtil       = require('gulp-util');

module.exports = function(opt) {

  function getBufferFromObj(obj) {
    if(Buffer.isBuffer(obj)) {
      return obj;
    } else if (typeof obj === 'string') {
      return new Buffer(obj);
    } else if(typeof obj === 'function') {
      return getBufferFromObj(obj());
    }
    return null;
  }

  function transform(file, encoding, callback) {
    if (file.isNull()) {
      return callback(null, file);
    }

    if (file.isStream()) {
      return callback(new PluginError('gulp-wrapper', 'Streaming not supported'));
    }

    var headerBuffer = (opt && opt.header) ? getBufferFromObj(opt.header) : null;
    var fileBuffer = file.contents;
    var footerBuffer = (opt && opt.footer) ? getBufferFromObj(opt.footer) : null;

    var bufferSize = 0;
    if(headerBuffer) {
      bufferSize += headerBuffer.length;
    }

    if(footerBuffer) {
      bufferSize += footerBuffer.length;
    }

    if(bufferSize == 0) {
      return callback(null, file);
    }

    bufferSize += fileBuffer.length;

    var newBuffer = new Buffer(bufferSize);
    var newBufferOffset = 0;
    if(headerBuffer) {
      headerBuffer.copy(newBuffer, newBufferOffset);
      newBufferOffset += headerBuffer.length;
    }

    if(fileBuffer) {
      fileBuffer.copy(newBuffer, newBufferOffset);
      newBufferOffset += fileBuffer.length;
    }

    if(footerBuffer) {
      footerBuffer.copy(newBuffer, newBufferOffset);
      newBufferOffset += footerBuffer.length;
    }

    file.contents = newBuffer;
    
    return callback(null, file);
  }

  return through2.obj(transform);
}