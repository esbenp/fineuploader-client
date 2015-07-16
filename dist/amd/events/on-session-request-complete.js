define(['exports', 'jquery', '../dom/utilities', '../utilities', './on-complete', './on-error', './on-upload'], function (exports, _jquery, _domUtilities, _utilities, _onComplete, _onError, _onUpload) {
  'use strict';

  exports.__esModule = true;
  exports.onSessionRequestComplete = onSessionRequestComplete;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _$ = _interopRequireDefault(_jquery);

  function onSessionRequestComplete(uploader, response, success, xhr) {
    var container = _domUtilities.getContainer(uploader.settings.container);

    for (var i in response) {
      var obj = response[i];

      if (!_utilities.isUndefined(obj.error_code)) {
        var file_container = _$['default'](uploader.fineuploader.getItemByFileId(i));

        var errorMessage = _utilities.stringOrFunction(uploader.settings.messages.errors[obj.error_code], obj.name);

        _domUtilities.fillContainer(uploader, container, i, errorMessage);

        _onError.onError.call(uploader.fineuploader, uploader, i, obj.name, errorMessage, xhr);
        _domUtilities.toggleFileContainerErrorMode(file_container);

        var customSessionErrorHandler = uploader.settings.sessionErrorHandler;
        if (_utilities.isFunction(customSessionErrorHandler)) {
          customSessionErrorHandler.call(customSessionErrorHandler, uploader, i, obj, errorMessage, xhr);
        }

        this.setDeleteFileParams({
          upload_path: obj.upload_path
        }, i);
      } else {
        _onUpload.onUpload.call(uploader.fineuploader, uploader, i, obj.name);
        _onComplete.onComplete.call(uploader.fineuploader, uploader, i, obj.name, obj, xhr);
      }
    }
  }
});