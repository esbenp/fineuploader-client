System.register(['jquery', '../logging'], function (_export) {
  'use strict';

  var $, err, TemplateManager;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_jquery) {
      $ = _jquery['default'];
    }, function (_logging) {
      err = _logging.err;
    }],
    execute: function () {
      TemplateManager = (function () {
        function TemplateManager(engine, loader) {
          _classCallCheck(this, TemplateManager);

          this._engine = engine;
          this._loader = loader;
        }

        TemplateManager.prototype.load = function load(pathOrMarkup) {
          return this._loader.load(pathOrMarkup);
        };

        TemplateManager.prototype.appendMarkupToContainer = function appendMarkupToContainer(markup, container) {
          $(container).html(markup);

          if (markup === '' || container.children.length === 0) {
            return err('The loaded markup was either empty or non valid.', markup);
          }

          if (container.children.length > 1) {
            return err('The loaded markup should only have 1 root node.');
          }

          return container.children[0];
        };

        TemplateManager.prototype.render = function render(node) {
          var viewmodel = arguments[1] === undefined ? {} : arguments[1];

          return this._engine.render(node, viewmodel);
        };

        return TemplateManager;
      })();

      _export('TemplateManager', TemplateManager);
    }
  };
});