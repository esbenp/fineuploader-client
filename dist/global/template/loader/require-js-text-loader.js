'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var RequireJsTextLoader = (function () {
  function RequireJsTextLoader(requireInstance) {
    _classCallCheck(this, RequireJsTextLoader);

    this.require = requireInstance;
  }

  RequireJsTextLoader.prototype.load = function load(path) {
    debug('Loading template ' + path + ' using Require JS text loader');

    var promise = $.Deferred();
    require(['text!' + path], function (markup) {
      promise.resolve(markup);
    });

    return promise;
  };

  return RequireJsTextLoader;
})();