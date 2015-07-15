System.register(['fineuploader'], function (_export) {
  'use strict';

  var qq;

  _export('defaultErrorHandler', defaultErrorHandler);

  function defaultErrorHandler(uploader, id, name, errorReason, xhr) {
    alert(errorReason);
  }

  return {
    setters: [function (_fineuploader) {
      qq = _fineuploader['default'];
    }],
    execute: function () {}
  };
});