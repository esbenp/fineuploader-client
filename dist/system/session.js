System.register(['./utilities'], function (_export) {
  'use strict';

  var isString, guid, Session;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_utilities) {
      isString = _utilities.isString;
      guid = _utilities.guid;
    }],
    execute: function () {
      Session = (function () {
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

      _export('Session', Session);
    }
  };
});