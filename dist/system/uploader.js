System.register(['jquery', './settings', './logging', './utilities', './template/template-manager', 'fineuploader', './session', './events/index'], function (_export) {
  'use strict';

  var $, defaults, fineuploader_defaults, debug, err, isArray, isElement, isString, isFunction, isUndefined, guid, TemplateManager, FineUploader, Session, onComplete, onDeleteComplete, onError, onProgress, onStatusChange, onSessionRequestComplete, onSubmit, onSubmitDelete, onUpload, Uploader;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_jquery) {
      $ = _jquery['default'];
    }, function (_settings) {
      defaults = _settings.defaults;
      fineuploader_defaults = _settings.fineuploader_defaults;
    }, function (_logging) {
      debug = _logging.debug;
      err = _logging.err;
    }, function (_utilities) {
      isArray = _utilities.isArray;
      isElement = _utilities.isElement;
      isString = _utilities.isString;
      isFunction = _utilities.isFunction;
      isUndefined = _utilities.isUndefined;
      guid = _utilities.guid;
    }, function (_templateTemplateManager) {
      TemplateManager = _templateTemplateManager.TemplateManager;
    }, function (_fineuploader) {
      FineUploader = _fineuploader.FineUploader;
    }, function (_session) {
      Session = _session.Session;
    }, function (_eventsIndex) {
      onComplete = _eventsIndex.onComplete;
      onDeleteComplete = _eventsIndex.onDeleteComplete;
      onError = _eventsIndex.onError;
      onProgress = _eventsIndex.onProgress;
      onStatusChange = _eventsIndex.onStatusChange;
      onSessionRequestComplete = _eventsIndex.onSessionRequestComplete;
      onSubmit = _eventsIndex.onSubmit;
      onSubmitDelete = _eventsIndex.onSubmitDelete;
      onUpload = _eventsIndex.onUpload;
    }],
    execute: function () {
      Uploader = (function () {
        function Uploader(settings, templateEngine, templateLoader) {
          _classCallCheck(this, Uploader);

          var uploaderId = guid();
          this.uploaderId = 'uploader_' + uploaderId;
          this._initialized = false;

          this.events = {};

          this.settings = this._generateSettings(settings);

          if (this.settings === false) {
            return err('Settings were not generated correctly.', settings);
          }

          this._session = new Session(this);
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

          var plugins = this._initializePlugins();
          if (!plugins) {
            return plugins;
          }

          this.fineUploaderSettings = this._generateFineuploaderSettings();

          if (this.fineUploaderSettings === false) {
            return err('Fineuploader settings were not generated correctly.');
          }

          $.when(templateMarkupPromise).then(function (markup) {
            var node = self._template.appendMarkupToContainer(markup, self.settings.container);
            node.id = self.uploaderId;

            if (node !== false) {
              self._template.render(node, self.settings);
            }

            self._initializeFineUploader(self.settings.container, self.fineUploaderSettings);
            self._initialize = true;
          });
        };

        Uploader.prototype.fire = function fire(type, index) {
          var args = Array.prototype.slice.call(arguments, 2);
          this.events[type][index].apply(this, args);
        };

        Uploader.prototype.fireAll = function fireAll(type) {
          var args = Array.prototype.slice.call(arguments, 1);
          var events = this.events[type];
          for (var i in events) {
            events[i].apply(this, args);
          }
        };

        Uploader.prototype.isInitialized = function isInitialized() {
          return this._initialized;
        };

        Uploader.prototype.listen = function listen(type, callback) {
          if (!isArray(this.events[type])) {
            this.events[type] = [];
          }

          this.events[type].push(callback);
        };

        Uploader.prototype.setSession = function setSession(session) {
          if (!isUndefined(this.fineUploaderSettings)) {
            return err('Fineuploader settings have already been set. To late to ' + 'alter the initial session now.');
          }

          if (typeof session === 'undefined' || session === null) {
            return;
          }

          this._session.setSession(session);
        };

        Uploader.prototype._initializeFineUploader = function _initializeFineUploader(container, settings) {
          settings.element = container;
          settings.template = this.uploaderId;

          this.fineuploader = new FineUploader(settings);
        };

        Uploader.prototype._generateFineuploaderSettings = function _generateFineuploaderSettings() {
          var settings = $.extend(true, {}, fineuploader_defaults);

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
          if (session === null) {
            delete settings.session;
          } else {
            settings.session.params.optimus_uploader_files = this._session.mapSession(session);
          }

          settings.validation.itemLimit = this.settings.limit;

          settings.callbacks = {
            onComplete: this._wrapCallback(onComplete),
            onDeleteComplete: this._wrapCallback(onDeleteComplete),
            onError: this._wrapCallback(onError),
            onProgress: this._wrapCallback(onProgress),
            onStatusChange: this._wrapCallback(onStatusChange),
            onSessionRequestComplete: this._wrapCallback(onSessionRequestComplete),
            onSubmit: this._wrapCallback(onSubmit),
            onSubmitDelete: this._wrapCallback(onSubmitDelete),
            onUpload: this._wrapCallback(onUpload)
          };

          $.extend(true, settings, this.settings.fineUploaderOverrides);

          settings.request.params = this._generateRequestParameters(this.settings, settings);

          return settings;
        };

        Uploader.prototype._initializePlugins = function _initializePlugins() {
          for (var i in this.settings.plugins) {
            var plugin = this.settings.plugins[i];
            if (!isFunction(plugin.__setUploader)) {
              return err('A plugin should aways implement a __setUploader method');
            }

            plugin.__setUploader(this);
          }
          return true;
        };

        Uploader.prototype._generateRequestParameters = function _generateRequestParameters(settings, fineUploaderSettings) {
          return $.extend({}, settings.paths, {
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

          if (!isElement(settings.container)) {
            return err('Container is not a valid DOM node.');
          }

          var combined = $.extend(true, {}, defaults, settings);

          if (!isString(combined.paths.base_directory)) {
            return err(combined.paths.base_directory + ' is not a valid base uploader path.');
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

      _export('Uploader', Uploader);
    }
  };
});