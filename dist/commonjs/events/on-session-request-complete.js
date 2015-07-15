'use strict';

exports.__esModule = true;
exports.onSessionRequestComplete = onSessionRequestComplete;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _domUtilities = require('../dom/utilities');

var _utilities = require('../utilities');

var _onComplete = require('./on-complete');

var _onError = require('./on-error');

var _onUpload = require('./on-upload');

function onSessionRequestComplete(uploader, response, success, xhr) {
  var container = _domUtilities.getContainer(uploader.settings.container);

  for (var i in response) {
    var obj = response[i];

    if (!_utilities.isUndefined(obj.error_code)) {
      var file_container = _jquery2['default'](uploader.fineuploader.getItemByFileId(i));

      var errorMessage = _utilities.stringOrFunction(uploader.settings.messages.errors[obj.error_code], obj.name);

      _domUtilities.fillContainer(container, i, errorMessage);

      _onError.onError.call(uploader.fineuploader, uploader, i, obj.name, errorMessage, xhr);
      _domUtilities.toggleFileContainerErrorMode(file_container);

      var customSessionErrorHandler = uploader.settings.sessionErrorHandler;
      if (_utilities.isFunction(customSessionErrorHandler)) {
        customSessionErrorHandler.call(customSessionErrorHandler, uploader, i, obj, errorMessage, xhr);
      }

      this.setDeleteFileParams({
        upload_path: response.upload_path
      }, i);
    } else {
      _onUpload.onUpload.call(uploader.fineuploader, uploader, i, obj.name);
      _onComplete.onComplete.call(uploader.fineuploader, uploader, i, obj.name, obj, xhr);
    }
  }
}