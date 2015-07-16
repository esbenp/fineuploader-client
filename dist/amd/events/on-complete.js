define(['exports', 'jquery', '../utilities', '../dom/utilities'], function (exports, _jquery, _utilities, _domUtilities) {
  'use strict';

  exports.__esModule = true;
  exports.onComplete = onComplete;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _$ = _interopRequireDefault(_jquery);

  function onComplete(uploader, id, name, responseJSON, xhr) {
    var file_container = _$['default'](uploader.fineuploader.getItemByFileId(id));

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
          successMessage = _utilities.stringOrFunction(uploader.settings.messages.completedImage, uploader.fineuploader, id);

          _domUtilities.toggleFileContainerSuccessfulImageMode(file_container, responseJSON.thumbnailUrl, successMessage);
        } else {
          successMessage = _utilities.trimFilename(_utilities.stringOrFunction(uploader.settings.messages.completedFile, uploader.fineuploader, id), uploader.settings.maxFilenameDisplayLength);

          _domUtilities.toggleFileContainerSuccessfulFileMode(file_container, successMessage);
        }

        break;
      default:

        break;
    }

    uploader.fireAll('onComplete', id, name, responseJSON, xhr, upload_path);
  }
});