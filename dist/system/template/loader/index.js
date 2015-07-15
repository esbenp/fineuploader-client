System.register(["./require-js-text-loader"], function (_export) {
  "use strict";

  var RequireJsTextLoader, loaders;
  return {
    setters: [function (_requireJsTextLoader) {
      RequireJsTextLoader = _requireJsTextLoader.RequireJsTextLoader;
    }],
    execute: function () {
      loaders = {
        "requireJsText": RequireJsTextLoader
      };

      _export("loaders", loaders);
    }
  };
});