System.register([], function (_export) {
  'use strict';

  _export('onSubmit', onSubmit);

  function onSubmit(uploader, id, name) {
    uploader.fireAll('onSubmit', id, name);
  }

  return {
    setters: [],
    execute: function () {}
  };
});