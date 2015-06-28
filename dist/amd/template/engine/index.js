define(["exports", "./knockout-engine"], function (exports, _knockoutEngine) {
  "use strict";

  exports.__esModule = true;
  var engines = {
    "knockout": _knockoutEngine.KnockoutEngine
  };
  exports.engines = engines;
});