define(['exports'], function (exports) {
    'use strict';

    exports.__esModule = true;
    var defaults = {
        callbacks: {},
        container: null,
        fineUploaderOverrides: {},
        initiateOnCreation: false,
        limit: 0,
        paths: {
            base_directory: null,
            sub_directory: null
        },
        plugins: [],
        templatePathOrMarkup: null,
        template: {
            btnClass: 'btn-large',
            btnLabel: '<i class="glyphicon glyphicon-file"></i> Select File(s) on Drive',
            dropLabel: 'Drop Files Here to Upload'
        },
        url_prefix: false
    };

    exports.defaults = defaults;
    var fineuploader_defaults = {
        callbacks: {},
        chunking: {
            enabled: true
        },

        deleteFile: {
            enabled: true,
            endpoint: '/uploader/upload'
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
            enableAuto: true },
        validation: {
            allowedExtensions: [],
            itemLimit: 0
        }
    };
    exports.fineuploader_defaults = fineuploader_defaults;
});