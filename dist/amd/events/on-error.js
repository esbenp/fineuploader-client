define(['exports', '../utilities', '../dom/utilities'], function (exports, _utilities, _domUtilities) {
  'use strict';

  exports.__esModule = true;
  exports.onError = onError;

  function onError(uploader, id, name, errorReason, xhr) {
    var file_container = $(uploader.fineuploader.getItemByFileId(id));

    _domUtilities.toggleFileContainerErrorMode(file_container);

    var customHandler = uploader.settings.errorHandler;
    if (_utilities.isFunction(customHandler)) {
      customHandler.apply(this, Array.prototype.slice.call(arguments));
    }

    uploader.fireAll('onError', id, name, errorReason, xhr);
  }

  ;
});