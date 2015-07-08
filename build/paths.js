var path = require('path');

var appRoot = 'src/';

module.exports = {
  root: appRoot,
  source: appRoot + 'js/**/*.js',
  styles: appRoot + 'less/**/*.less',
  lessEntry: appRoot + 'less/**/uploader.less',
  html: appRoot + 'html/**/*.html',
  output: 'dist/'
};
