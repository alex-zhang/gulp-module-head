"use strict";
var through = require("through");

module.exports = function(opt) {
  return through(
    function(file) {
      console.log('--------------------------------');
      console.dir(file.__proto__);
      this.queue(file);
    }
  );
};
