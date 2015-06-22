var Uploader = function Uploader(settings){
    this.settings = this._generateSettings(settings);

    // Is dependent on settings being set first.
    this.fineUploaderSettings = this._generateFineuploaderSettings();
}

Uploader.DEFAULTS = {
    callbacks: {},
    fineUploaderOverrides: {},
    imageManipulation: {
        method: "fill",
        sizes: []
    },
    limit: 0,
    paths: {
        base_directory: null,
        sub_directory: null
    },
    plugins: [],
    url_prefix: false
};

Uploader.FINEUPLOADER_DEFAULTS = {
    callbacks: {},
    chunking: {
        enabled: true
    },
    //debug: true,
    deleteFile: {
        enabled: true,
        endpoint: "/uploader/upload"
    },
    multiple: true,
    request: {
        endpoint: '/uploader/delete',
        params: {},
        paramsInBody: true
    },
    resume: {
        enabled: true
    },
    retry: {
        showAutoRetryNote: false,
        enableAuto: true /// :NDRE YOO
    },
    validation: {
        allowedExtensions: [],
        itemLimit: 0
    }
};

Uploader.prototype._generateFineuploaderSettings = function _generateFineuploaderSettings()
{
    var settings = Uploader.FINEUPLOADER_DEFAULTS;

    if (this.settings.url_prefix !== false) {
        settings.deleteFile.endpoint = this.settings.url_prefix + "/" + settings.deleteFile.endpoint;
        settings.request.endpoint = this.settings.url_prefix + "/" + settings.request.endpoint;
    }

    if (typeof this.settings.allowedExtensions === 'Array') {
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

    _.extend(settings, this.settings.fineUploaderOverrides);

    return settings;
}

Uploader.prototype._generateSettings = function _generateSettings(settings)
{
    return _.extend(Uploader.DEFAULTS, settings);
}