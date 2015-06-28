define(['exports', 'jquery', '../logging'], function (exports, _jquery, _logging) {
  'use strict';

  exports.__esModule = true;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _$ = _interopRequireDefault(_jquery);

  var TemplateManager = (function () {
    function TemplateManager(engine, loader) {
      _classCallCheck(this, TemplateManager);

      this._engine = engine;
      this._loader = loader;
    }

    TemplateManager.prototype.load = function load(pathOrMarkup) {
      return this._loader.load(pathOrMarkup);
    };

    TemplateManager.prototype.appendMarkupToContainer = function appendMarkupToContainer(markup, container) {
      _$['default'](container).html(markup);

      if (markup === '' || container.children.length === 0) {
        return _logging.err('The loaded markup was either empty or non valid.', markup);
      }

      if (container.children.length > 1) {
        return _logging.err('The loaded markup should only have 1 root node.');
      }

      return container.children[0];
    };

    TemplateManager.prototype.render = function render(node) {
      var viewmodel = arguments[1] === undefined ? {} : arguments[1];

      return this._engine.render(node, viewmodel);
    };

    return TemplateManager;
  })();

  exports.TemplateManager = TemplateManager;
});