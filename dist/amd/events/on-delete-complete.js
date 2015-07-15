define(['exports', 'jquery', '../dom/constants', '../dom/utilities'], function (exports, _jquery, _domConstants, _domUtilities) {
  'use strict';

  exports.__esModule = true;
  exports.onDeleteComplete = onDeleteComplete;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _$ = _interopRequireDefault(_jquery);

  function onDeleteComplete(uploader, id, xhr, isError) {
    var container = _domUtilities.getContainer(uploader.settings.container);

    container.removeClass(_domConstants.SINGLE_FILLED_CLASS);

    uploader.fireAll('onDeleteComplete', id, xhr, isError);
  }
});