System.register(['./settings', './logging', './utilities', './template/template-manager', 'fineuploader'], function (_export) {
  'use strict';

  var defaults, fineuploader_defaults, debug, err, isElement, assign, guid, TemplateManager, FineUploader, Uploader;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_settings) {
      defaults = _settings.defaults;
      fineuploader_defaults = _settings.fineuploader_defaults;
    }, function (_logging) {
      debug = _logging.debug;
      err = _logging.err;
    }, function (_utilities) {
      isElement = _utilities.isElement;
      assign = _utilities.assign;
      guid = _utilities.guid;
    }, function (_templateTemplateManager) {
      TemplateManager = _templateTemplateManager.TemplateManager;
    }, function (_fineuploader) {
      FineUploader = _fineuploader.FineUploader;
    }],
    execute: function () {
      Uploader = (function () {
        function Uploader(settings, templateEngine, templateLoader) {
          _classCallCheck(this, Uploader);

          var uploaderId = guid();
          this.uploaderId = 'uploader_' + uploaderId;

          this.settings = this._generateSettings(settings);

          this.fineUploaderSettings = this._generateFineuploaderSettings();

          this._template = new TemplateManager(templateEngine, templateLoader);

          if (this.settings.initiateOnCreation === true) {
            this.initialize();
          }

          return this;
        }

        Uploader.prototype.initialize = function initialize() {
          debug('Initializing', this.settings);

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

          this.fineuploader = new FineUploader(settings);
        };

        Uploader.prototype._generateFineuploaderSettings = function _generateFineuploaderSettings() {
          var settings = fineuploader_defaults;

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

          assign({}, settings, this.settings.fineUploaderOverrides);

          return settings;
        };

        Uploader.prototype._generateSettings = function _generateSettings(settings) {
          if (settings.container instanceof jQuery) {
            settings.container = settings.container[0];
          }

          if (!isElement(settings.container)) {
            return err('Container is not a valid DOM node.');
          }

          return assign({}, defaults, settings);
        };

        return Uploader;
      })();

      _export('Uploader', Uploader);
    }
  };
});