import {isFunction} from '../utilities';
import {toggleFileContainerErrorMode} from '../dom/utilities';

export function onError(uploader, id, name, errorReason, xhr) {
  var file_container = $(uploader.fineuploader.getItemByFileId(id));

  toggleFileContainerErrorMode(file_container);

  var customHandler = uploader.settings.errorHandler;
  if (isFunction(customHandler)) {
    customHandler.apply(this, Array.prototype.slice.call(arguments));
  }

  uploader.fireAll('onError', id, name, errorReason, xhr);
};
