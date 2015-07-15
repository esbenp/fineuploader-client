System.register(['../utilities', '../dom/utilities'], function (_export) {
  'use strict';

  var isFunction, toggleFileContainerErrorMode;

  _export('onError', onError);

  function onError(uploader, id, name, errorReason, xhr) {
    var file_container = $(uploader.fineuploader.getItemByFileId(id));

    toggleFileContainerErrorMode(file_container);

    var customHandler = uploader.settings.errorHandler;
    if (isFunction(customHandler)) {
      customHandler.apply(this, Array.prototype.slice.call(arguments));
    }

    uploader.fireAll('onError', id, name, errorReason, xhr);
  }

  return {
    setters: [function (_utilities) {
      isFunction = _utilities.isFunction;
    }, function (_domUtilities) {
      toggleFileContainerErrorMode = _domUtilities.toggleFileContainerErrorMode;
    }],
    execute: function () {
      ;
    }
  };
});