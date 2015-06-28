System.register(["./knockout-engine"], function (_export) {
  "use strict";

  var KnockoutEngine, engines;
  return {
    setters: [function (_knockoutEngine) {
      KnockoutEngine = _knockoutEngine.KnockoutEngine;
    }],
    execute: function () {
      engines = {
        "knockout": KnockoutEngine
      };

      _export("engines", engines);
    }
  };
});