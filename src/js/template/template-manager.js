import $ from 'jquery';
import {err} from '../logging';

export class TemplateManager {
  constructor(engine, loader) {
    this._engine = engine;
    this._loader = loader;
  }

  load(pathOrMarkup) {
    return this._loader.load(pathOrMarkup);
  }

  appendMarkupToContainer(markup, container) {
    $(container).html(markup);

    if (markup === '' || container.children.length === 0) {
      return err('The loaded markup was either empty or non valid.', markup);
    }

    return container;
  }

  render(node, viewmodel = {}) {
    return this._engine.render(node, viewmodel);
  }
}
