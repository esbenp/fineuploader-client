define(['exports', './uploader', './template/engine/index', './template/loader/index'], function (exports, _uploader, _templateEngineIndex, _templateLoaderIndex) {
  'use strict';

  exports.__esModule = true;
  exports.Uploader = _uploader.Uploader;
  exports.engines = _templateEngineIndex.engines;
  exports.loaders = _templateLoaderIndex.loaders;
});