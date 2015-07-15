'use strict';

exports.__esModule = true;
exports.onSubmitDelete = onSubmitDelete;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _utilities = require('../utilities');

function onSubmitDelete(uploader, id) {
  var deferred = _jquery2['default'].Deferred();

  var filename = this.getName(id);

  var deleteCheck = uploader.settings.deleteCheck;
  if (_utilities.isFunction(deleteCheck)) {
    deleteCheck(filename, deferred);
  } else {
    deferred.resolve(true);
  }

  uploader.fireAll('onSubmitDelete', id, deferred);

  return deferred;
}