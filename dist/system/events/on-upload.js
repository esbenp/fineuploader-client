System.register(['jquery', '../dom/utilities', '../utilities'], function (_export) {
  'use strict';

  var $, getContainer, fillContainer, stringOrFunction;

  _export('onUpload', onUpload);

  function onUpload(uploader, id, name) {
    var container = getContainer(uploader.settings.container);

    var uploadingMessage = stringOrFunction(uploader.settings.messages.uploading, uploader.fineuploader, id);

    fillContainer(container, id, uploadingMessage);

    uploader.fireAll('onUpload', id, name);
  }

  return {
    setters: [function (_jquery) {
      $ = _jquery['default'];
    }, function (_domUtilities) {
      getContainer = _domUtilities.getContainer;
      fillContainer = _domUtilities.fillContainer;
    }, function (_utilities) {
      stringOrFunction = _utilities.stringOrFunction;
    }],
    execute: function () {}
  };
});