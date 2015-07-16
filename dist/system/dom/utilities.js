System.register(['../dom/constants'], function (_export) {
  'use strict';

  var CONTAINER_SELECTOR, FILE_ICON_FILE_CLASS, FILE_ICON_ERROR_CLASS, FILE_ICON_SELECTOR, FILE_LIST_SELECTOR, FILE_STATUS_TEXT_RIBBON_CLASS, FILE_STATUS_TEXT_SELECTOR, SINGLE_FILLED_CLASS, SIZE_LABEL_SELECTOR, THUMBNAIL_SELECTOR, THUMBNAIL_ERROR_CLASS, THUMBNAIL_SUCCESS_CLASS, THUMBNAIL_UNFILLED_CLASS;

  _export('getContainer', getContainer);

  _export('getFileList', getFileList);

  _export('fillContainer', fillContainer);

  _export('toggleFileContainerErrorMode', toggleFileContainerErrorMode);

  _export('toggleFileContainerSuccessfulFileMode', toggleFileContainerSuccessfulFileMode);

  _export('toggleFileContainerSuccessfulImageMode', toggleFileContainerSuccessfulImageMode);

  function getContainer(container) {
    return $(container).find(CONTAINER_SELECTOR);
  }

  function getFileList(container) {
    return getContainer(container).find(FILE_LIST_SELECTOR);
  }

  function fillContainer(uploader, container, id, message) {
    container.addClass(SINGLE_FILLED_CLASS);

    var file_container = $(uploader.fineuploader.getItemByFileId(id));

    file_container.find(FILE_STATUS_TEXT_SELECTOR).removeClass('qq-hide').text(message);
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

  return {
    setters: [function (_domConstants) {
      CONTAINER_SELECTOR = _domConstants.CONTAINER_SELECTOR;
      FILE_ICON_FILE_CLASS = _domConstants.FILE_ICON_FILE_CLASS;
      FILE_ICON_ERROR_CLASS = _domConstants.FILE_ICON_ERROR_CLASS;
      FILE_ICON_SELECTOR = _domConstants.FILE_ICON_SELECTOR;
      FILE_LIST_SELECTOR = _domConstants.FILE_LIST_SELECTOR;
      FILE_STATUS_TEXT_RIBBON_CLASS = _domConstants.FILE_STATUS_TEXT_RIBBON_CLASS;
      FILE_STATUS_TEXT_SELECTOR = _domConstants.FILE_STATUS_TEXT_SELECTOR;
      SINGLE_FILLED_CLASS = _domConstants.SINGLE_FILLED_CLASS;
      SIZE_LABEL_SELECTOR = _domConstants.SIZE_LABEL_SELECTOR;
      THUMBNAIL_SELECTOR = _domConstants.THUMBNAIL_SELECTOR;
      THUMBNAIL_ERROR_CLASS = _domConstants.THUMBNAIL_ERROR_CLASS;
      THUMBNAIL_SUCCESS_CLASS = _domConstants.THUMBNAIL_SUCCESS_CLASS;
      THUMBNAIL_UNFILLED_CLASS = _domConstants.THUMBNAIL_UNFILLED_CLASS;
    }],
    execute: function () {}
  };
});