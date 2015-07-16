'use strict';

exports.__esModule = true;
exports.getContainer = getContainer;
exports.getFileList = getFileList;
exports.fillContainer = fillContainer;
exports.toggleFileContainerErrorMode = toggleFileContainerErrorMode;
exports.toggleFileContainerSuccessfulFileMode = toggleFileContainerSuccessfulFileMode;
exports.toggleFileContainerSuccessfulImageMode = toggleFileContainerSuccessfulImageMode;

var _domConstants = require('../dom/constants');

function getContainer(container) {
  return $(container).find(_domConstants.CONTAINER_SELECTOR);
}

function getFileList(container) {
  return getContainer(container).find(_domConstants.FILE_LIST_SELECTOR);
}

function fillContainer(uploader, container, id, message) {
  container.addClass(_domConstants.SINGLE_FILLED_CLASS);

  var file_container = $(uploader.fineuploader.getItemByFileId(id));

  file_container.find(_domConstants.FILE_STATUS_TEXT_SELECTOR).removeClass('qq-hide').text(message);
}

function toggleFileContainerErrorMode(container) {
  var thumb_container = container.find(_domConstants.THUMBNAIL_SELECTOR);
  var icon = container.find(_domConstants.FILE_ICON_SELECTOR);

  container.removeClass('qq-upload-success').addClass('qq-upload-fail');

  icon.addClass(_domConstants.FILE_ICON_ERROR_CLASS).show();

  thumb_container.addClass(_domConstants.THUMBNAIL_ERROR_CLASS);
}

function toggleFileContainerSuccessfulFileMode(container, message) {
  var thumb_container = container.find(_domConstants.THUMBNAIL_SELECTOR);
  var icon = thumb_container.find(_domConstants.FILE_ICON_SELECTOR);

  container.find(_domConstants.FILE_STATUS_TEXT_SELECTOR).text(message);

  icon.addClass(_domConstants.FILE_ICON_FILE_CLASS).show();

  thumb_container.addClass(_domConstants.THUMBNAIL_SUCCESS_CLASS);
}

function toggleFileContainerSuccessfulImageMode(container, thumbnail, message) {
  var thumb_container = container.find(_domConstants.THUMBNAIL_SELECTOR);
  var icon = container.find(_domConstants.FILE_ICON_SELECTOR);

  icon.removeClass(_domConstants.FILE_ICON_ERROR_CLASS).hide();
  thumb_container.removeClass(_domConstants.THUMBNAIL_ERROR_CLASS + ' ' + _domConstants.THUMBNAIL_UNFILLED_CLASS);
  thumb_container.css('background', 'url(' + thumbnail + ')');

  container.find(_domConstants.SIZE_LABEL_SELECTOR).hide();

  container.find(_domConstants.FILE_STATUS_TEXT_SELECTOR).addClass(_domConstants.FILE_STATUS_TEXT_RIBBON_CLASS).text(message);
}