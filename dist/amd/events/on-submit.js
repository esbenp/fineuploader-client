define(['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;
  exports.onSubmit = onSubmit;

  function onSubmit(uploader, id, name) {
    uploader.fireAll('onSubmit', id, name);
  }
});