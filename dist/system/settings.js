System.register([], function (_export) {
  'use strict';

  var defaults, fineuploader_defaults;
  return {
    setters: [],
    execute: function () {
      defaults = {
        allowedExtensions: [],
        callbacks: {},
        container: null,
        fineUploaderOverrides: {},
        initiateOnCreation: false,
        limit: 0,
        maxFilenameDisplayLength: 20,
        messages: {
          completedUpload: 'Completed.'
        },
        paths: {
          base_directory: null,
          sub_directory: null
        },
        plugins: [],
        sizeLimit: null,
        templatePathOrMarkup: null,
        template: {
          btnClass: 'btn-large',
          btnLabel: '<i class="glyphicon glyphicon-file"></i> Select File(s) on Drive',
          dropLabel: 'Drop Files Here to Upload'
        },
        thumbnails: {
          height: 100,
          width: 100
        },
        url_prefix: false
      };

      _export('defaults', defaults);

      fineuploader_defaults = {
        callbacks: {},
        chunking: {
          enabled: true
        },
        debug: true,
        deleteFile: {
          enabled: true,
          endpoint: '/uploader/delete'
        },
        multiple: true,
        request: {
          endpoint: '/uploader/upload',
          params: {},
          paramsInBody: true
        },
        resume: {
          enabled: true
        },
        retry: {
          showAutoRetryNote: false,
          enableAuto: true },
        thumbnails: {
          placeholders: {
            notAvailablePath: '../dist/assets/images/placeholders/not_available-generic.png',
            waitingPath: '../dist/assets/images/placeholders/waiting-generic.png',
            waitUntilResponse: false
          }
        },
        validation: {
          allowedExtensions: [],
          itemLimit: 0,
          sizeLimit: 0
        }
      };

      _export('fineuploader_defaults', fineuploader_defaults);
    }
  };
});