import {isFunction} from '../utilities';
import {toggleContainerErrorMode} from '../dom/utilities';

export function onError(uploader, id, name, errorReason, xhr) {
  var container = $(uploader.settings.container).find(".qq-uploader-selector");
  var file_container = container.find("li[qq-file-id='" + id + "']");

  toggleContainerErrorMode(file_container);

  var customHandler = uploader.settings.errorHandler;
  if (isFunction(customHandler)) {
    customHandler.apply(this, Array.prototype.slice.call(arguments));
  }

  uploader.fireAll('onError', id, name, errorReason, xhr);
};
