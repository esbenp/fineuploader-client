'use strict';

function onUpload(uploader, id, name) {
  var container = getContainer(uploader.settings.container);

  var uploadingMessage = stringOrFunction(uploader.settings.messages.uploading, uploader.fineuploader, id);

  fillContainer(container, id, uploadingMessage);

  uploader.fireAll('onUpload', id, name);
}