System.register(['./engine/index', './loader/index'], function (_export) {
  'use strict';

  var engines, loaders;
  return {
    setters: [function (_engineIndex) {
      engines = _engineIndex.engines;
    }, function (_loaderIndex) {
      loaders = _loaderIndex.loaders;
    }],
    execute: function () {}
  };
});