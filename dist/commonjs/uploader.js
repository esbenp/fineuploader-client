'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _settings = require('./settings');

var _logging = require('./logging');

var _utilities = require('./utilities');

var _templateManager = require('./template-manager');

var _fineuploader = require('fineuploader');

var _session = require('./session');

var _eventsIndex = require('./events/index');

var Uploader = (function () {
  function Uploader(settings, templateEngine, templateLoader) {
    _classCallCheck(this, Uploader);

    var uploaderId = _utilities.guid();
    this.uploaderId = 'uploader_' + uploaderId;
    this._initialized = false;

    this.events = {};

    this.settings = this._generateSettings(settings);

    if (this.settings === false) {
      return _logging.err('Settings were not generated correctly.', settings);
    }

    this._session = new _session.Session(this);
    this._template = new _templateManager.TemplateManager(templateEngine, templateLoader);

    if (this.settings.initiateOnCreation === true) {
      this.initialize();
    }

    return this;
  }

  Uploader.prototype.initialize = function initialize() {
    _logging.debug('Initializing', this.settings);

    var self = this;
    var templateMarkupPromise = this._template.load(this.settings.templatePathOrMarkup);

    var plugins = this._initializePlugins();
    if (!plugins) {
      return plugins;
    }

    var events = this.settings.events;
    for (var type in events) {
      if (_utilities.isArray(events[type])) {
        for (var i in events[type]) {
          this.listen(type, events[type][i]);
        }
      } else {
        this.listen(type, events[type]);
      }
    }

    this.fineUploaderSettings = this._generateFineuploaderSettings();

    if (this.fineUploaderSettings === false) {
      return _logging.err('Fineuploader settings were not generated correctly.');
    }

    _jquery2['default'].when(templateMarkupPromise).then(function (markup) {
      var node = self._template.appendMarkupToContainer(markup, self.settings.container);
      node.id = self.uploaderId;

      if (node !== false) {
        self._template.render(node, self.settings);
      }

      self.fireAll('onTemplateRendered');

      self._initializeFineUploader(self.settings.container, self.fineUploaderSettings);
      self._initialize = true;

      self.fireAll('onUploaderInitialized');
    });
  };

  Uploader.prototype.fire = function fire(type, index) {
    var args = Array.prototype.slice.call(arguments, 2);

    this.events[type][index].apply(this.events[type][index], args);
  };

  Uploader.prototype.fireAll = function fireAll(type) {
    var args = Array.prototype.slice.call(arguments, 1);
    var events = this.events[type];
    for (var i in events) {
      events[i].apply(events[i], args);
    }
  };

  Uploader.prototype.isInitialized = function isInitialized() {
    return this._initialized;
  };

  Uploader.prototype.listen = function listen(type, callback) {
    if (!_utilities.isArray(this.events[type])) {
      this.events[type] = [];
    }

    this.events[type].push(callback);
  };

  Uploader.prototype.setSession = function setSession(session) {
    if (!_utilities.isUndefined(this.fineUploaderSettings)) {
      return _logging.err('Fineuploader settings have already been set. To late to ' + 'alter the initial session now.');
    }

    if (typeof session === 'undefined' || session === null) {
      return;
    }

    this._session.setSession(session);
  };

  Uploader.prototype._initializeFineUploader = function _initializeFineUploader(container, settings) {
    settings.element = container;
    settings.template = this.uploaderId;

    this.fineuploader = new _fineuploader.FineUploader(settings);
  };

  Uploader.prototype._generateFineuploaderSettings = function _generateFineuploaderSettings() {
    var settings = _jquery2['default'].extend(true, {}, _settings.fineuploader_defaults);

    if (this.settings.url_prefix !== false) {
      settings.deleteFile.endpoint = this.settings.url_prefix + settings.deleteFile.endpoint;
      settings.request.endpoint = this.settings.url_prefix + settings.request.endpoint;
      settings.session.endpoint = this.settings.url_prefix + settings.session.endpoint;
    }

    if (this.settings.allowedExtensions instanceof Array) {
      settings.validation.allowedExtensions = this.settings.allowedExtensions;
    }

    if (this.settings.sizeLimit !== null) {
      settings.validation.sizeLimit = this.settings.sizeLimit;
    }

    if (this.settings.confirmDelete === true) {
      settings.deleteFile.forceConfirm = true;
    }

    if (this.settings.messageHandler !== null) {
      var self = this;
      settings.showMessage = function () {
        var args = ['message'].concat(Array.prototype.slice.call(arguments));
        return self.settings.messageHandler.apply(this, args);
      };

      settings.showConfirm = function () {
        var args = ['confirm'].concat(Array.prototype.slice.call(arguments));
        return self.settings.messageHandler.apply(this, args);
      };
    }

    var session = this._session.getSession();
    if (session === null || session.length === 0) {
      delete settings.session;
    } else {
      settings.session.params = this._generateRequestParameters(this.settings, settings, 'session');
      settings.session.params.optimus_uploader_files = this._session.mapSession(session);
    }

    settings.validation.itemLimit = this.settings.limit;

    settings.callbacks = {
      onAllComplete: this._wrapCallback(_eventsIndex.onAllComplete),
      onComplete: this._wrapCallback(_eventsIndex.onComplete),
      onDeleteComplete: this._wrapCallback(_eventsIndex.onDeleteComplete),
      onError: this._wrapCallback(_eventsIndex.onError),
      onProgress: this._wrapCallback(_eventsIndex.onProgress),
      onStatusChange: this._wrapCallback(_eventsIndex.onStatusChange),
      onSessionRequestComplete: this._wrapCallback(_eventsIndex.onSessionRequestComplete),
      onSubmit: this._wrapCallback(_eventsIndex.onSubmit),
      onSubmitDelete: this._wrapCallback(_eventsIndex.onSubmitDelete),
      onUpload: this._wrapCallback(_eventsIndex.onUpload)
    };

    _jquery2['default'].extend(true, settings, this.settings.fineUploaderOverrides);

    settings.request.params = this._generateRequestParameters(this.settings, settings, 'request');

    return settings;
  };

  Uploader.prototype._initializePlugins = function _initializePlugins() {
    for (var i in this.settings.plugins) {
      var plugin = this.settings.plugins[i];
      if (!_utilities.isFunction(plugin.__setUploader)) {
        return _logging.err('A plugin should aways implement a __setUploader method');
      }

      plugin.__setUploader(this);
    }
    return true;
  };

  Uploader.prototype._generateRequestParameters = function _generateRequestParameters(settings, fineUploaderSettings, request_type) {
    return _jquery2['default'].extend({}, settings.paths, {
      optimus_uploader_allowed_extensions: fineUploaderSettings.validation.allowedExtensions,
      optimus_uploader_size_limit: fineUploaderSettings.validation.sizeLimit,
      optimus_uploader_thumbnail_height: settings.thumbnails.height,
      optimus_uploader_thumbnail_width: settings.thumbnails.width
    }, fineUploaderSettings[request_type].params || {});
  };

  Uploader.prototype._generateSettings = function _generateSettings(settings) {
    if (settings.container instanceof jQuery) {
      settings.container = settings.container[0];
    }

    if (!_utilities.isElement(settings.container)) {
      return _logging.err('Container is not a valid DOM node.');
    }

    var combined = _jquery2['default'].extend(true, {}, _settings.defaults, settings);

    if (!_utilities.isString(combined.paths.base_directory)) {
      return _logging.err(combined.paths.base_directory + ' is not a valid base uploader path.');
    }

    return combined;
  };

  Uploader.prototype._wrapCallback = function _wrapCallback(callback) {
    var uploader = this;
    return function () {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(uploader);
      return callback.apply(this, args);
    };
  };

  return Uploader;
})();

exports.Uploader = Uploader;