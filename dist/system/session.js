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
        function Session(uploader) {
          _classCallCheck(this, Session);

          this._session = null;
          this._uploader = uploader;

          this.setSession(this._uploader.settings.session);
        }

        Session.prototype.getSession = function getSession() {
          return this._session;
        };

        Session.prototype.setSession = function setSession(session) {
          this._session = session;
        };

        Session.prototype.mapSession = function mapSession(session) {
          if (isString(session)) {
            session = [session];
          }

          return session;
        };

        return Session;
      })();

      _export('Session', Session);
    }
  };
});