System.register(['./uploader', './template/engine/index', './template/loader/index', './plugins/index'], function (_export) {
  'use strict';

  return {
    setters: [function (_uploader) {
      _export('Uploader', _uploader.Uploader);
    }, function (_templateEngineIndex) {
      _export('engines', _templateEngineIndex.engines);
    }, function (_templateLoaderIndex) {
      _export('loaders', _templateLoaderIndex.loaders);
    }, function (_pluginsIndex) {
      _export('plugins', _pluginsIndex.plugins);
    }],
    execute: function () {}
  };
});