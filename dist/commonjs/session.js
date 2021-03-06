'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilities = require('./utilities');

var Session = (function () {
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
    if (_utilities.isString(session)) {
      session = [session];
    }

    return session;
  };

  return Session;
})();

exports.Session = Session;