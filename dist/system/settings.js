System.register([], function (_export) {
    'use strict';

    var defaults, fineuploader_defaults;
    return {
        setters: [],
        execute: function () {
            defaults = {
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

            _export('defaults', defaults);

            fineuploader_defaults = {
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

            _export('fineuploader_defaults', fineuploader_defaults);
        }
    };
});