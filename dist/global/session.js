'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Session = (function () {
  function Session() {
    _classCallCheck(this, Session);
  }

  Session.prototype.mapSession = function mapSession(files) {
    if (isString(files)) {
      files = [files];
    }

    return files.map(function (file) {
      return {
        name: file.split('/')[1],
        type: 'session',
        uuid: guid()
      };
    });
  };

  return Session;
})();