define(['exports', 'jquery', '../utilities'], function (exports, _jquery, _utilities) {
  'use strict';

  exports.__esModule = true;
  exports.onSubmitDelete = onSubmitDelete;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _$ = _interopRequireDefault(_jquery);

  function onSubmitDelete(uploader, id) {
    var deferred = _$['default'].Deferred();

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
});