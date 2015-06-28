'use strict';

Uploader.prototype.getTemplateEngine = function getTemplateEngine() {
    return this.settings.templateEngine;
};

Uploader.prototype.setTemplateEngine = function setTemplateEngine(templateEngine) {
    var renderFunctionType = typeof templateEngine['render'];

    if (renderFunctionType !== 'function') {
        return err('setTemplateEngine: ' + renderFunctionType + ' is not a valid render function.');
    }

    this.settings.templateEngine = templateEngine;

    return true;
};

Uploader.prototype.getTemplateLoader = function getTemplateLoader() {
    return this.settings.templateLoader;
};

Uploader.prototype.loadTemplate = function loadTemplate() {
    if (this.settings.templateLoaderArguments instanceof Array) {
        return this.settings.templateLoader.load.apply(this, this.settings.templateLoaderArguments);
    } else {
        return this.settings.templateLoader.load.call(this, this.settings.templateLoaderArguments);
    }
};

Uploader.prototype.setTemplateLoader = function setTemplateLoader(templateLoader) {
    var loadFunctionType = typeof templateLoader['load'];

    if (loadFunctionType !== 'function') {
        return err('setTemplateLoader: ' + loadFunctionType + ' is not a valid load function.');
    }

    this.settings.templateLoader = templateLoader;

    return true;
};