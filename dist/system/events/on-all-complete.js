System.register([], function (_export) {
  'use strict';

  _export('onAllComplete', onAllComplete);

  function onAllComplete(uploader, succeeded, failed) {
    uploader.fireAll('onAllComplete', succeeded, failed);
  }

  return {
    setters: [],
    execute: function () {}
  };
});