'use strict';

function onSessionRequestComplete(uploader, response, success, xhr) {
  var container = getContainer(uploader.settings.container);

  for (var i in response) {
    var obj = response[i];

    if (!isUndefined(obj.error_code)) {
      var file_container = $(uploader.fineuploader.getItemByFileId(i));

      var errorMessage = stringOrFunction(uploader.settings.messages.errors[obj.error_code], obj.name);

      fillContainer(uploader, container, i, errorMessage);

      onError.call(uploader.fineuploader, uploader, i, obj.name, errorMessage, xhr);
      toggleFileContainerErrorMode(file_container);

      var customSessionErrorHandler = uploader.settings.sessionErrorHandler;
      if (isFunction(customSessionErrorHandler)) {
        customSessionErrorHandler.call(customSessionErrorHandler, uploader, i, obj, errorMessage, xhr);
      }

      this.setDeleteFileParams({
        upload_path: obj.upload_path
      }, i);
    } else {
      onUpload.call(uploader.fineuploader, uploader, i, obj.name);
      onComplete.call(uploader.fineuploader, uploader, i, obj.name, obj, xhr, obj.upload_path);
    }
  }
}