System.register([], function (_export) {
  'use strict';

  var CONTAINER_SELECTOR, SIZE_LABEL_SELECTOR, SINGLE_FILLED_CLASS, DROP_AREA_SELECTOR, FILE_LIST_SELECTOR, FILE_ICON_SELECTOR, FILE_ICON_FILE_CLASS, FILE_ICON_ERROR_CLASS, FILE_STATUS_TEXT_SELECTOR, FILE_STATUS_TEXT_RIBBON_CLASS, THUMBNAIL_SELECTOR, THUMBNAIL_ERROR_CLASS, THUMBNAIL_SUCCESS_CLASS, THUMBNAIL_UNFILLED_CLASS;
  return {
    setters: [],
    execute: function () {
      CONTAINER_SELECTOR = '.qq-uploader-selector';

      _export('CONTAINER_SELECTOR', CONTAINER_SELECTOR);

      SIZE_LABEL_SELECTOR = '.qq-upload-size-selector';

      _export('SIZE_LABEL_SELECTOR', SIZE_LABEL_SELECTOR);

      SINGLE_FILLED_CLASS = 'ou--single--filled';

      _export('SINGLE_FILLED_CLASS', SINGLE_FILLED_CLASS);

      DROP_AREA_SELECTOR = '.qq-upload-drop-area';

      _export('DROP_AREA_SELECTOR', DROP_AREA_SELECTOR);

      FILE_LIST_SELECTOR = '.ou__files';

      _export('FILE_LIST_SELECTOR', FILE_LIST_SELECTOR);

      FILE_ICON_SELECTOR = '.ou__files__icon';

      _export('FILE_ICON_SELECTOR', FILE_ICON_SELECTOR);

      FILE_ICON_FILE_CLASS = 'ou__files__icon--file';

      _export('FILE_ICON_FILE_CLASS', FILE_ICON_FILE_CLASS);

      FILE_ICON_ERROR_CLASS = 'ou__files__icon--error';

      _export('FILE_ICON_ERROR_CLASS', FILE_ICON_ERROR_CLASS);

      FILE_STATUS_TEXT_SELECTOR = '.qq-upload-status-text-selector';

      _export('FILE_STATUS_TEXT_SELECTOR', FILE_STATUS_TEXT_SELECTOR);

      FILE_STATUS_TEXT_RIBBON_CLASS = 'ou__files__status-label--ribbon';

      _export('FILE_STATUS_TEXT_RIBBON_CLASS', FILE_STATUS_TEXT_RIBBON_CLASS);

      THUMBNAIL_SELECTOR = '.ou__files__thumbnail';

      _export('THUMBNAIL_SELECTOR', THUMBNAIL_SELECTOR);

      THUMBNAIL_ERROR_CLASS = 'ou__files__thumbnail--error';

      _export('THUMBNAIL_ERROR_CLASS', THUMBNAIL_ERROR_CLASS);

      THUMBNAIL_SUCCESS_CLASS = 'ou__files__thumbnail--success';

      _export('THUMBNAIL_SUCCESS_CLASS', THUMBNAIL_SUCCESS_CLASS);

      THUMBNAIL_UNFILLED_CLASS = 'ou__files__thumbnail--unfilled';

      _export('THUMBNAIL_UNFILLED_CLASS', THUMBNAIL_UNFILLED_CLASS);
    }
  };
});