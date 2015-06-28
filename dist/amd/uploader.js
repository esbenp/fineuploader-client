define(['exports', './settings', './logging', './utilities', './template/template-manager', 'fineuploader'], function (exports, _settings, _logging, _utilities, _templateTemplateManager, _fineuploader) {
  'use strict';

  exports.__esModule = true;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var Uploader = (function () {
    function Uploader(settings, templateEngine, templateLoader) {
      _classCallCheck(this, Uploader);

      var uploaderId = _utilities.guid();
      this.uploaderId = 'uploader_' + uploaderId;

      this.settings = this._generateSettings(settings);

      this.fineUploaderSettings = this._generateFineuploaderSettings();

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

      $.when(templateMarkupPromise).then(function (markup) {
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
      var settings = _settings.fineuploader_defaults;

      if (this.settings.url_prefix !== false) {
        settings.deleteFile.endpoint = this.settings.url_prefix + '/' + settings.deleteFile.endpoint;
        settings.request.endpoint = this.settings.url_prefix + '/' + settings.request.endpoint;
      }

      if (this.settings.allowedExtensions instanceof Array) {
        settings.validation.allowedExtensions = this.settings.allowedExtensions;
      }

      settings.validation.itemLimit = this.settings.limit;

      settings.callbacks = {
        onComplete: this._onComplete,
        onDeleteComplete: this._onDeleteComplete,
        onError: this._onError,
        onSessionRequestComplete: this._onSessionRequestComplete,
        onSubmit: this._onSubmit
      };

      _utilities.assign({}, settings, this.settings.fineUploaderOverrides);

      return settings;
    };

    Uploader.prototype._generateSettings = function _generateSettings(settings) {
      if (settings.container instanceof jQuery) {
        settings.container = settings.container[0];
      }

      if (!_utilities.isElement(settings.container)) {
        return _logging.err('Container is not a valid DOM node.');
      }

      return _utilities.assign({}, _settings.defaults, settings);
    };

    return Uploader;
  })();

  exports.Uploader = Uploader;
});