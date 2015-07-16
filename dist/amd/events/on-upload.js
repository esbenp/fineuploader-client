define(['exports', 'jquery', '../dom/utilities', '../utilities'], function (exports, _jquery, _domUtilities, _utilities) {
  'use strict';

  exports.__esModule = true;
  exports.onUpload = onUpload;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _$ = _interopRequireDefault(_jquery);

  function onUpload(uploader, id, name) {
    var container = _domUtilities.getContainer(uploader.settings.container);

    var uploadingMessage = _utilities.stringOrFunction(uploader.settings.messages.uploading, uploader.fineuploader, id);

    _domUtilities.fillContainer(uploader, container, id, uploadingMessage);

    uploader.fireAll('onUpload', id, name);
  }
});