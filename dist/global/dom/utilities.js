'use strict';

function getContainer(container) {
  return $(container).find(CONTAINER_SELECTOR);
}

function fillContainer(container, id, message) {
  container.addClass(SINGLE_FILLED_CLASS);

  container.find(FILE_STATUS_TEXT_SELECTOR).removeClass('qq-hide').text(message);
}

function toggleFileContainerErrorMode(container) {
  var thumb_container = container.find(THUMBNAIL_SELECTOR);
  var icon = container.find(FILE_ICON_SELECTOR);

  container.removeClass('qq-upload-success').addClass('qq-upload-fail');

  icon.addClass(FILE_ICON_ERROR_CLASS).show();

  thumb_container.addClass(THUMBNAIL_ERROR_CLASS);
}

function toggleFileContainerSuccessfulFileMode(container, message) {
  var thumb_container = container.find(THUMBNAIL_SELECTOR);
  var icon = thumb_container.find(FILE_ICON_SELECTOR);

  container.find(FILE_STATUS_TEXT_SELECTOR).text(message);

  icon.addClass(FILE_ICON_FILE_CLASS).show();

  thumb_container.addClass(THUMBNAIL_SUCCESS_CLASS);
}

function toggleFileContainerSuccessfulImageMode(container, thumbnail, message) {
  var thumb_container = container.find(THUMBNAIL_SELECTOR);
  var icon = container.find(FILE_ICON_SELECTOR);

  icon.removeClass(FILE_ICON_ERROR_CLASS).hide();
  thumb_container.removeClass(THUMBNAIL_ERROR_CLASS + ' ' + THUMBNAIL_UNFILLED_CLASS);
  thumb_container.css('background', 'url(' + thumbnail + ')');

  container.find(SIZE_LABEL_SELECTOR).hide();

  container.find(FILE_STATUS_TEXT_SELECTOR).addClass(FILE_STATUS_TEXT_RIBBON_CLASS).text(message);
}