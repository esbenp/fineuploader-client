'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _settings = require('./settings');

var _logging = require('./logging');

var _utilities = require('./utilities');

var _templateTemplateManager = require('./template/template-manager');

var _fineuploader = require('fineuploader');

var _events = require('./events');

var Uploader = (function () {
  function Uploader(settings, templateEngine, templateLoader) {
    _classCallCheck(this, Uploader);

    var uploaderId = _utilities.guid();
    this.uploaderId = 'uploader_' + uploaderId;

    this.settings = this._generateSettings(settings);

    if (this.settings === false) {
      return _logging.err('Settings were not generated correctly.', settings);
    }

    this.fineUploaderSettings = this._generateFineuploaderSettings();

    if (this.fineUploaderSettings === false) {
      return _logging.err('Fineuploader settings were not generated correctly.');
    }

    this._template = new _templateTemplateManager.TemplateManager(templateEngine, templateLoader);

    if (this.settings.initiateOnCreation === true) {
      this.initialize();
    }

    return this;
  }

  Uploader.prototype.initialize = function initialize() {
    _logging.debug('Initializing', this.settings);

    var self = this;
    var templateMarkupPromise = this._template.load(this.settings.templatePathOrMarkup);

    _jquery2['default'].when(templateMarkupPromise).then(function (markup) {
      var node = self._template.appendMarkupToContainer(markup, self.settings.container);
      node.id = self.uploaderId;

      if (node !== false) {
        self._template.render(node, self.settings);
      }

      self._initializeFineUploader(self.settings.container, self.fineUploaderSettings);
    });
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
    }

    if (this.settings.allowedExtensions instanceof Array) {
      settings.validation.allowedExtensions = this.settings.allowedExtensions;
    }

    if (this.settings.sizeLimit !== null) {
      settings.validation.sizeLimit = this.settings.sizeLimit;
    }

    settings.validation.itemLimit = this.settings.limit;

    settings.callbacks = {
      onComplete: this._wrapCallback(_events.onComplete),
      onDeleteComplete: this._wrapCallback(_events.onDeleteComplete),
      onError: this._wrapCallback(_events.onError),
      onProgress: this._wrapCallback(_events.onProgress),
      onSessionRequestComplete: this._wrapCallback(_events.onSessionRequestComplete),
      onSubmit: this._wrapCallback(_events.onSubmit)
    };

    _jquery2['default'].extend(true, settings, this.settings.fineUploaderOverrides);

    settings.request.params = this._generateRequestParameters(this.settings, settings);

    return settings;
  };

  Uploader.prototype._generateRequestParameters = function _generateRequestParameters(settings, fineUploaderSettings) {
    return _jquery2['default'].extend({}, settings.paths, {
      optimus_uploader_allowed_extensions: fineUploaderSettings.validation.allowedExtensions,
      optimus_uploader_size_limit: fineUploaderSettings.validation.sizeLimit,
      optimus_uploader_thumbnail_height: settings.thumbnails.height,
      optimus_uploader_thumbnail_width: settings.thumbnails.width
    }, fineUploaderSettings.request.params || {});
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
      callback.apply(this, args);
    };
  };

  return Uploader;
})();

exports.Uploader = Uploader;