System.register(['jquery', '../utilities', '../dom/utilities'], function (_export) {
  'use strict';

  var $, stringOrFunction, trimFilename, toggleFileContainerErrorMode, toggleFileContainerSuccessfulFileMode, toggleFileContainerSuccessfulImageMode;

  _export('onComplete', onComplete);

  function onComplete(uploader, id, name, responseJSON, xhr) {
    var file_container = $(uploader.fineuploader.getItemByFileId(id));

    switch (xhr.status) {
      case 200:

        var name = responseJSON.name;
        var upload_path = responseJSON.upload_path;

        this.setName(id, name);
        this.setDeleteFileParams({
          upload_path: upload_path
        }, id);

        var file_type = responseJSON.file_type;
        var successMessage;

        if (file_type === 'image') {
          successMessage = stringOrFunction(uploader.settings.messages.completedImage, uploader.fineuploader, id);

          toggleFileContainerSuccessfulImageMode(file_container, responseJSON.thumbnailUrl, successMessage);
        } else {
          successMessage = trimFilename(stringOrFunction(uploader.settings.messages.completedFile, uploader.fineuploader, id), uploader.settings.maxFilenameDisplayLength);

          toggleFileContainerSuccessfulFileMode(file_container, successMessage);
        }

        break;
      default:

        break;
    }

    uploader.fireAll('onComplete', id, name, responseJSON, xhr, upload_path);
  }

  return {
    setters: [function (_jquery) {
      $ = _jquery['default'];
    }, function (_utilities) {
      stringOrFunction = _utilities.stringOrFunction;
      trimFilename = _utilities.trimFilename;
    }, function (_domUtilities) {
      toggleFileContainerErrorMode = _domUtilities.toggleFileContainerErrorMode;
      toggleFileContainerSuccessfulFileMode = _domUtilities.toggleFileContainerSuccessfulFileMode;
      toggleFileContainerSuccessfulImageMode = _domUtilities.toggleFileContainerSuccessfulImageMode;
    }],
    execute: function () {}
  };
});