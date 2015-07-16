'use strict';

exports.__esModule = true;
exports.onDeleteComplete = onDeleteComplete;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _domConstants = require('../dom/constants');

var _domUtilities = require('../dom/utilities');

function onDeleteComplete(uploader, id, xhr, isError) {
  var response = _jquery2['default'].parseJSON(xhr.responseText);

  var container = _domUtilities.getContainer(uploader.settings.container);

  container.removeClass(_domConstants.SINGLE_FILLED_CLASS);

  uploader.fireAll('onDeleteComplete', id, xhr, isError, response.deleted[0]);
}