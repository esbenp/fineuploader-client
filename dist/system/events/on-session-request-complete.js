System.register(['jquery', '../dom/utilities', '../utilities', './on-complete', './on-error', './on-upload'], function (_export) {
  'use strict';

  var $, fillContainer, getContainer, toggleFileContainerErrorMode, isFunction, isUndefined, stringOrFunction, onComplete, onError, onUpload;

  _export('onSessionRequestComplete', onSessionRequestComplete);

  function onSessionRequestComplete(uploader, response, success, xhr) {
    var container = getContainer(uploader.settings.container);

    for (var i in response) {
      var obj = response[i];

      if (!isUndefined(obj.error_code)) {
        var file_container = $(uploader.fineuploader.getItemByFileId(i));

        var errorMessage = stringOrFunction(uploader.settings.messages.errors[obj.error_code], obj.name);

        fillContainer(container, i, errorMessage);

        onError.call(uploader.fineuploader, uploader, i, obj.name, errorMessage, xhr);
        toggleFileContainerErrorMode(file_container);

        var customSessionErrorHandler = uploader.settings.sessionErrorHandler;
        if (isFunction(customSessionErrorHandler)) {
          customSessionErrorHandler.call(customSessionErrorHandler, uploader, i, obj, errorMessage, xhr);
        }

        this.setDeleteFileParams({
          upload_path: response.upload_path
        }, i);
      } else {
        onUpload.call(uploader.fineuploader, uploader, i, obj.name);
        onComplete.call(uploader.fineuploader, uploader, i, obj.name, obj, xhr);
      }
    }
  }

  return {
    setters: [function (_jquery) {
      $ = _jquery['default'];
    }, function (_domUtilities) {
      fillContainer = _domUtilities.fillContainer;
      getContainer = _domUtilities.getContainer;
      toggleFileContainerErrorMode = _domUtilities.toggleFileContainerErrorMode;
    }, function (_utilities) {
      isFunction = _utilities.isFunction;
      isUndefined = _utilities.isUndefined;
      stringOrFunction = _utilities.stringOrFunction;
    }, function (_onComplete) {
      onComplete = _onComplete.onComplete;
    }, function (_onError) {
      onError = _onError.onError;
    }, function (_onUpload) {
      onUpload = _onUpload.onUpload;
    }],
    execute: function () {}
  };
});