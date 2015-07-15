'use strict';

exports.__esModule = true;
exports.onProgress = onProgress;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _domConstants = require('../dom/constants');

function onProgress(uploader, id, name, uploadedBytes, totalBytes) {
  var progress = 100 / totalBytes * uploadedBytes;
  var left = 100 - progress;

  var listEle = _jquery2['default'](uploader.fineuploader.getItemByFileId(id));
  var progressBox = listEle.find(_domConstants.THUMB_CONTAINER_SELECTOR);

  if (left > 0) {
    progressBox.css('background-image', '-webkit-gradient(' + 'linear,' + 'left top,' + 'left bottom,' + 'color-stop(0.' + left + ', rgba(255, 255, 255, 0)),' + 'color-stop(1, #B9E3A4),');

    progressBox.css('background-image', '-o-linear-gradient(bottom, rgba(255, 255, 255, 0) ' + left + '%, #B9E3A4 100%');
    progressBox.css('background-image', '-moz-linear-gradient(bottom, rgba(255, 255, 255, 0) ' + left + '%, #B9E3A4 100%');
    progressBox.css('background-image', '-webkit-linear-gradient(bottom, rgba(255, 255, 255, 0) ' + left + '%, #B9E3A4 100%');
    progressBox.css('background-image', '-ms-linear-gradient(bottom, rgba(255, 255, 255, 0) ' + left + '%, #B9E3A4 100%');
    progressBox.css('background-image', 'linear-gradient(to bottom, rgba(255, 255, 255, 0) ' + left + '%, #B9E3A4 100%');
  } else {
    progressBox.css('background-image', 'none');
  }
}