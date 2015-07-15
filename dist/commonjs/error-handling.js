'use strict';

exports.__esModule = true;
exports.defaultErrorHandler = defaultErrorHandler;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fineuploader = require('fineuploader');

var _fineuploader2 = _interopRequireDefault(_fineuploader);

function defaultErrorHandler(uploader, id, name, errorReason, xhr) {
  alert(errorReason);
}