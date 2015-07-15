System.register(['./uploader'], function (_export) {
  'use strict';

  var Uploader;
  return {
    setters: [function (_uploader) {
      Uploader = _uploader.Uploader;
    }],
    execute: function () {
      _export('Uploader', Uploader);
    }
  };
});