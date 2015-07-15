System.register(['jquery', '../dom/constants', '../dom/utilities'], function (_export) {
  'use strict';

  var $, SINGLE_FILLED_CLASS, getContainer;

  _export('onDeleteComplete', onDeleteComplete);

  function onDeleteComplete(uploader, id, xhr, isError) {
    var container = getContainer(uploader.settings.container);

    container.removeClass(SINGLE_FILLED_CLASS);

    uploader.fireAll('onDeleteComplete', id, xhr, isError);
  }

  return {
    setters: [function (_jquery) {
      $ = _jquery['default'];
    }, function (_domConstants) {
      SINGLE_FILLED_CLASS = _domConstants.SINGLE_FILLED_CLASS;
    }, function (_domUtilities) {
      getContainer = _domUtilities.getContainer;
    }],
    execute: function () {}
  };
});