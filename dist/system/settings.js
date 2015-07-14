System.register(['./error-handling'], function (_export) {
  'use strict';

  var defaultErrorHandler, defaults, fineuploader_defaults;
  return {
    setters: [function (_errorHandling) {
      defaultErrorHandler = _errorHandling.defaultErrorHandler;
    }],
    execute: function () {
      defaults = {
        allowedExtensions: [],
        callbacks: {},
        confirmDelete: false,
        container: null,
        deleteCheck: null,
        errorHandler: defaultErrorHandler,
        fineUploaderOverrides: {},
        initiateOnCreation: false,
        limit: 0,
        maxFilenameDisplayLength: 20,
        messages: {
          completedFile: 'Completed.',
          completedImage: 'Completed.',
          errors: {
            'S0001': 'The file \'{}\' was not found on the server.',
            'S0002': 'Thumbnail for the file \'{}\' was not found on the server.'
          },
          uploading: 'Uploading...'
        },
        messageHandler: null,
        paths: {
          base_directory: null,
          sub_directory: null
        },
        plugins: [],
        session: null,
        sessionErrorHandler: null,
        sizeLimit: null,
        templatePathOrMarkup: null,
        template: {
          btnClass: 'btn-large',
          btnLabel: '<i class=\'glyphicon glyphicon-file\'></i> Select File(s) on Drive',
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
        session: {
          endpoint: '/uploader/session',
          params: {}
        },
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