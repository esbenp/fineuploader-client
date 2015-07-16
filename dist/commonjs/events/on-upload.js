'use strict';

exports.__esModule = true;
exports.onUpload = onUpload;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _domUtilities = require('../dom/utilities');

var _utilities = require('../utilities');

function onUpload(uploader, id, name) {
  var container = _domUtilities.getContainer(uploader.settings.container);

  var uploadingMessage = _utilities.stringOrFunction(uploader.settings.messages.uploading, uploader.fineuploader, id);

  _domUtilities.fillContainer(uploader, container, id, uploadingMessage);

  uploader.fireAll('onUpload', id, name);
}