import $ from 'jquery';
import {defaults, fineuploader_defaults} from './settings';
import {debug, err} from './logging';
import {isElement, isString, guid} from './utilities';
import {TemplateManager} from './template/template-manager';
import {FineUploader} from 'fineuploader';
import {
  onComplete,
  onDeleteComplete,
  onError,
  onProgress,
  onSessionRequestComplete,
  onSubmit
} from './events';

export class Uploader {
  constructor(settings, templateEngine, templateLoader) {
    let uploaderId = guid();
    this.uploaderId = `uploader_${uploaderId}`;

    this.settings = this._generateSettings(settings);

    if (this.settings === false) {
      return err('Settings were not generated correctly.', settings);
    }

    // Is dependent on settings being set first.
    this.fineUploaderSettings = this._generateFineuploaderSettings();

    if (this.fineUploaderSettings === false) {
      return err('Fineuploader settings were not generated correctly.');
    }

    this._template = new TemplateManager(templateEngine, templateLoader);

    if (this.settings.initiateOnCreation === true) {
      this.initialize();
    }

    return this;
  }

  initialize() {
    debug('Initializing', this.settings);

    let self = this;
    let templateMarkupPromise = this._template.load(this.settings.templatePathOrMarkup);

    $.when(templateMarkupPromise).then(function(markup){
      let node = self._template.appendMarkupToContainer(markup, self.settings.container);
      node.id = self.uploaderId;

      if (node !== false) {
        self._template.render(node, self.settings);
      }

      self._initializeFineUploader(self.settings.container, self.fineUploaderSettings);
    });
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
    }

    if (this.settings.allowedExtensions instanceof Array) {
      settings.validation.allowedExtensions = this.settings.allowedExtensions;
    }

    if (this.settings.sizeLimit !== null) {
      settings.validation.sizeLimit = this.settings.sizeLimit;
    }

    settings.validation.itemLimit = this.settings.limit;

    settings.callbacks = {
        onComplete: this._wrapCallback(onComplete),
        onDeleteComplete: this._wrapCallback(onDeleteComplete),
        onError: this._wrapCallback(onError),
        onProgress: this._wrapCallback(onProgress),
        onSessionRequestComplete: this._wrapCallback(onSessionRequestComplete),
        onSubmit: this._wrapCallback(onSubmit)
    };

    $.extend(true, settings, this.settings.fineUploaderOverrides);

    settings.request.params = this._generateRequestParameters(this.settings, settings);

    return settings;
  }

  _generateRequestParameters(settings, fineUploaderSettings) {
    return $.extend({}, settings.paths, {
      optimus_uploader_allowed_extensions: fineUploaderSettings.validation.allowedExtensions,
      optimus_uploader_size_limit: fineUploaderSettings.validation.sizeLimit,
      optimus_uploader_thumbnail_height: settings.thumbnails.height,
      optimus_uploader_thumbnail_width: settings.thumbnails.width,
    }, fineUploaderSettings.request.params || {});
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

    return combined
  }

  _wrapCallback(callback) {
    var uploader = this;
    return function(){
      var args = Array.prototype.slice.call(arguments);
      args.unshift(uploader);
      callback.apply(this, args);
    };
  }
}
