'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilities = require('./utilities');

var Session = (function () {
  function Session() {
    _classCallCheck(this, Session);
  }

  Session.prototype.mapSession = function mapSession(files) {
    if (_utilities.isString(files)) {
      files = [files];
    }

    return files.map(function (file) {
      return {
        name: file.split('/')[1],
        type: 'session',
        uuid: _utilities.guid()
      };
    });
  };

  return Session;
})();

exports.Session = Session;