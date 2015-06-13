'use strict';
var less = require('less');

var convertToLess = function (resolve, reject, data) {
  less.render(data.source, function (error, css) {
    if (error) {
      // index starts at 1
      var line = parseInt(error.line, 10) || 0;
      var ch = parseInt(error.column, 10) || 0;
      if (line > 0) {
        line = line - 1;
      }
      if (ch > 0) {
        ch = ch - 1;
      }
      var errors = {
        line: line,
        ch: ch,
        msg: error.message
      };
      resolve({
        errors: [errors],
        result: null
      });
    }
    var res = css.css;
    resolve({
      errors: null,
      result: res
    });
  });
};

module.exports = convertToLess;
