import {defaults, fineuploader_defaults} from './settings';
import {debug, err} from './logging';
import {isElement, assign, guid} from './utilities';
import {TemplateManager} from './template/template-manager';
import {FineUploader} from 'fineuploader';

export class Uploader {
  constructor(settings, templateEngine, templateLoader) {
    let uploaderId = guid();
    this.uploaderId = `uploader_${uploaderId}`;

    this.settings = this._generateSettings(settings);

    // Is dependent on settings being set first.
    this.fineUploaderSettings = this._generateFineuploaderSettings();

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
    let settings = fineuploader_defaults;

    if (this.settings.url_prefix !== false) {
        settings.deleteFile.endpoint = this.settings.url_prefix + "/" + settings.deleteFile.endpoint;
        settings.request.endpoint = this.settings.url_prefix + "/" + settings.request.endpoint;
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
  }

  _generateSettings(settings) {
    if (settings.container instanceof jQuery) {
        settings.container = settings.container[0];
    }

    if (!isElement(settings.container)) {
        return err(`Container is not a valid DOM node.`);
    }

    return assign({}, defaults, settings);
  }
}
