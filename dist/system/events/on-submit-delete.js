System.register(['jquery', '../utilities'], function (_export) {
  'use strict';

  var $, isFunction;

  _export('onSubmitDelete', onSubmitDelete);

  function onSubmitDelete(uploader, id) {
    var deferred = $.Deferred();

    var filename = this.getName(id);

    var deleteCheck = uploader.settings.deleteCheck;
    if (isFunction(deleteCheck)) {
      deleteCheck(filename, deferred);
    } else {
      deferred.resolve(true);
    }

    uploader.fireAll('onSubmitDelete', id, deferred);

    return deferred;
  }

  return {
    setters: [function (_jquery) {
      $ = _jquery['default'];
    }, function (_utilities) {
      isFunction = _utilities.isFunction;
    }],
    execute: function () {}
  };
});