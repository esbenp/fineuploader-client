define(['exports', 'fineuploader'], function (exports, _fineuploader) {
  'use strict';

  exports.__esModule = true;
  exports.defaultErrorHandler = defaultErrorHandler;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _qq = _interopRequireDefault(_fineuploader);

  function defaultErrorHandler(uploader, id, name, errorReason, xhr) {
    alert(errorReason);
  }
});