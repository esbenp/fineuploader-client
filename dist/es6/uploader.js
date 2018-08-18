import $ from 'jquery';
import {defaults, fineuploader_defaults} from './settings';
import {debug, err} from './logging';
import {
  isArray,
  isElement,
  isString,
  isFunction,
  isUndefined,
  guid
} from './utilities';
import {getContainer} from './dom/utilities';
import {TemplateManager} from './template-manager';
import {FineUploader} from 'fineuploader';
import {Session} from './session';
import {
  onAllComplete,
  onComplete,
  onDeleteComplete,
  onError,
  onProgress,
  onStatusChange,
  onSessionRequestComplete,
  onSubmit,
  onSubmitDelete,
  onUpload
} from './events/index';

export class Uploader {
  constructor(settings, templateEngine, templateLoader) {
    let uploaderId = guid();
    this.uploaderId = `uploader_${uploaderId}`;
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

  initialize() {
    debug('Initializing', this.settings);

    let self = this;
    //let templateMarkupPromise = this._template.load(this.settings.templatePathOrMarkup);

    let plugins = this._initializePlugins();
    if (!plugins) {
      return plugins;
    }

    // Listen for events here, to let them fire after plugins
    let events = this.settings.events;
    for(var type in events) {
      if (isArray(events[type])) {
        for(var i in events[type]) {
          this.listen(type, events[type][i]);
        }
      } else {
        this.listen(type, events[type]);
      }
    }

    // Is dependent on settings being set first.
    this.fineUploaderSettings = this._generateFineuploaderSettings();

    if (this.fineUploaderSettings === false) {
      return err('Fineuploader settings were not generated correctly.');
    }

    //$.when(templateMarkupPromise).then(function(markup){
      let node = self.settings.container
      node.id = self.uploaderId;

      /*if (self.settings.thumbnails.overrideCss) {
        var container = getContainer($(node));
        container.css({
          height: self.settings.thumbnails.height,
          width: self.settings.thumbnails.width
        });
      }

      if (node !== false) {
        self._template.render(node, self.settings);
      }*/

      self.fireAll('onTemplateRendered');

      self._initializeFineUploader(self.settings.container, self.fineUploaderSettings);
      self._initialize = true;

      self.fireAll('onUploaderInitialized');
    //});
  }

  fire(type, index) {
    var args = Array.prototype.slice.call(arguments, 2);
    // apply to self to retain the scoped bounded to the function
    this.events[type][index].apply(this.events[type][index], args);
  }

  fireAll(type) {
    var args = Array.prototype.slice.call(arguments, 1);
    var events = this.events[type];
    for (var i in events) {
      // apply to self to retain the scoped bounded to the function
      events[i].apply(events[i], args);
    }
  }

  getPlugin(key) {
    return this.settings.plugins[key];
  }

  isInitialized() {
    return this._initialized;
  }

  listen(type, callback) {
    if (!isArray(this.events[type])) {
      this.events[type] = [];
    }

    this.events[type].push(callback);
  }

  setSession(session) {
    if (!isUndefined(this.fineUploaderSettings)) {
      return err('Fineuploader settings have already been set. To late to ' +
                'alter the initial session now.');
    }

    if (typeof session === 'undefined' || session === null) {
      return;
    }

    this._session.setSession(session);
  }

  _initializeFineUploader(container, settings) {
    settings.element = container;
    settings.template = this.uploaderId;

    this.fineuploader = new FineUploader(settings);
  }

  _generateFineuploaderSettings() {
    let settings = $.extend(true, {}, fineuploader_defaults);

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
      settings.showMessage = function(){
        var args = ['message'].concat(Array.prototype.slice.call(arguments));
        return self.settings.messageHandler.apply(this, args);
      };

      settings.showConfirm = function(){
        var args = ['confirm'].concat(Array.prototype.slice.call(arguments));
        return self.settings.messageHandler.apply(this, args);
      }
    }

    let session = this._session.getSession();
    if (session === null || session.length === 0) {
      delete settings.session;
    } else {
      settings.session.params = this._generateRequestParameters(
        this.settings,
        settings,
        'session'
      );
      settings.session.params.optimus_uploader_files = this._session.mapSession(session);
    }

    settings.validation.itemLimit = this.settings.limit;

    settings.callbacks = {
      onAllComplete: this._wrapCallback(onAllComplete),
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

    settings.request.params = this._generateRequestParameters(
      this.settings,
      settings,
      'request'
    );

    return settings;
  }

  _initializePlugins() {
    for(var i in this.settings.plugins) {
      var plugin = this.settings.plugins[i];
      if (!isFunction(plugin.__setUploader)) {
        return err(`A plugin should aways implement a __setUploader method`);
      }

      plugin.__setUploader(this);
    }
    return true;
  }

  _generateRequestParameters(settings, fineUploaderSettings, request_type) {
    return $.extend({}, settings.paths, {
      optimus_uploader_allowed_extensions: fineUploaderSettings.validation.allowedExtensions,
      optimus_uploader_size_limit: fineUploaderSettings.validation.sizeLimit,
      optimus_uploader_thumbnail_height: settings.thumbnails.height,
      optimus_uploader_thumbnail_width: settings.thumbnails.width,
    }, fineUploaderSettings[request_type].params || {});
  }

  _generateSettings(settings) {
   if (settings.container instanceof jQuery) {
      settings.container = settings.container[0];
    }

    if (!isElement(settings.container)) {
      return err(`Container is not a valid DOM node.`);
    }

    let combined = $.extend(true, {}, defaults, settings);

    if (!isString(combined.paths.base_directory)) {
      return err(`${combined.paths.base_directory} is not a valid base uploader path.`);
    }

    return combined;
  }

  _wrapCallback(callback) {
    var uploader = this;
    return function(){
      var args = Array.prototype.slice.call(arguments);
      args.unshift(uploader);
      return callback.apply(this, args);
    };
  }
}
