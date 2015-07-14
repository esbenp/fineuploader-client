define(['exports', './uploader', './template/engine/index', './template/loader/index', './plugins/index'], function (exports, _uploader, _templateEngineIndex, _templateLoaderIndex, _pluginsIndex) {
  'use strict';

  exports.__esModule = true;
  exports.Uploader = _uploader.Uploader;
  exports.engines = _templateEngineIndex.engines;
  exports.loaders = _templateLoaderIndex.loaders;
  exports.plugins = _pluginsIndex.plugins;
});