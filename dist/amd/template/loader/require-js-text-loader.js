define(['exports', './../../logging', 'jquery'], function (exports, _logging, _jquery) {
  'use strict';

  exports.__esModule = true;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _$ = _interopRequireDefault(_jquery);

  var RequireJsTextLoader = (function () {
    function RequireJsTextLoader(requireInstance) {
      _classCallCheck(this, RequireJsTextLoader);

      this.require = requireInstance;
    }

    RequireJsTextLoader.prototype.load = function load(path) {
      _logging.debug('Loading template ' + path + ' using Require JS text loader');

      var promise = _$['default'].Deferred();
      require(['text!' + path], function (markup) {
        promise.resolve(markup);
      });

      return promise;
    };

    return RequireJsTextLoader;
  })();

  exports.RequireJsTextLoader = RequireJsTextLoader;
});