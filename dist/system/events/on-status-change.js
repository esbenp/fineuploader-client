System.register([], function (_export) {
  'use strict';

  _export('onStatusChange', onStatusChange);

  function onStatusChange(uploader, id, name) {
    uploader.fireAll('onStatusChange', id, name);
  }

  return {
    setters: [],
    execute: function () {}
  };
});