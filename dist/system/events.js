System.register(['jquery', './utilities'], function (_export) {
  'use strict';

  var $, trimFilename, stringOrFunction;

  _export('onComplete', onComplete);

  _export('onDeleteComplete', onDeleteComplete);

  _export('onError', onError);

  _export('onProgress', onProgress);

  _export('onSessionRequestComplete', onSessionRequestComplete);

  _export('onSubmit', onSubmit);

  function onComplete(uploader, id, name, responseJSON, xhr) {
    var container = $(uploader.settings.container);

    var file_container = container.find('li[qq-file-id=\'' + id + '\']');
    var thumb_container = file_container.find('.uploader-thumbnail-container');
    var icon = thumb_container.find('.optimus-uploader-icon');

    switch (xhr.status) {
      case 200:

        var uuid = responseJSON.uuid;
        var name = responseJSON.name;
        var type = responseJSON.type;
        var file_type = responseJSON.file_type;

        this.setName(id, name);
        this.setDeleteFileParams({
          name: name
        }, id);

        if (file_type === 'image') {
          icon.removeClass('optimus-uploader-icon-error').hide();
          thumb_container.removeClass('optimus-uploader-thumbnail-error').removeClass('unfilled');
          thumb_container.css('background', 'url(' + responseJSON.thumbnailUrl + ')');

          container.find('.qq-upload-drop-area').addClass('filled');

          file_container.find('.qq-upload-size-selector').hide();
        } else {
          var successMessage = trimFilename(stringOrFunction(uploader.settings.messages.completedUpload, uploader.fineuploader, id), uploader.settings.maxFilenameDisplayLength);

          file_container.find('.qq-upload-status-text-selector').text(successMessage);

          icon.addClass('optimus-uploader-icon-file').show();

          thumb_container.addClass('optimus-uploader-thumbnail-success');
        }

        break;
      default:
        icon.addClass('optimus-uploader-icon-error').show();

        thumb_container.addClass('optimus-uploader-thumbnail-error');

        break;
    }
  }

  function onDeleteComplete(uploader, id, xhr, isError) {
    var container = $(uploader.settings.container);

    container.find('.qq-upload-drop-area').removeClass('filled');
  }

  function onError(id, name, errorReason, xhr) {}

  function onProgress(uploader, id, name, uploadedBytes, totalBytes) {
    var progress = 100 / totalBytes * uploadedBytes;
    var left = 100 - progress;

    var listEle = $(uploader.fineuploader.getItemByFileId(id));
    var progressBox = listEle.find('.uploader-thumbnail-container');

    if (left > 0) {
      progressBox.css('background-image', '-webkit-gradient(' + 'linear,' + 'left top,' + 'left bottom,' + 'color-stop(0.' + left + ', rgba(255, 255, 255, 0)),' + 'color-stop(1, #B9E3A4),');

      progressBox.css('background-image', '-o-linear-gradient(bottom, rgba(255, 255, 255, 0) ' + left + '%, #B9E3A4 100%');
      progressBox.css('background-image', '-moz-linear-gradient(bottom, rgba(255, 255, 255, 0) ' + left + '%, #B9E3A4 100%');
      progressBox.css('background-image', '-webkit-linear-gradient(bottom, rgba(255, 255, 255, 0) ' + left + '%, #B9E3A4 100%');
      progressBox.css('background-image', '-ms-linear-gradient(bottom, rgba(255, 255, 255, 0) ' + left + '%, #B9E3A4 100%');
      progressBox.css('background-image', 'linear-gradient(to bottom, rgba(255, 255, 255, 0) ' + left + '%, #B9E3A4 100%');
    } else {
      console.log('PROGRESS');
    }
  }

  function onSessionRequestComplete(uploader, response, success, xhr) {
    var self = this;

    for (var i in response) {
      var obj = response[i];

      onComplete.call(self, e, i, obj.name, obj, {});
    }
  }

  function onSubmit(id, name) {}

  return {
    setters: [function (_jquery) {
      $ = _jquery['default'];
    }, function (_utilities) {
      trimFilename = _utilities.trimFilename;
      stringOrFunction = _utilities.stringOrFunction;
    }],
    execute: function () {}
  };
});