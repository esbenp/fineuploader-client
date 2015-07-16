import $ from 'jquery';
import {
  getContainer,
  fillContainer
} from '../dom/utilities';
import {stringOrFunction} from '../utilities';

export function onUpload(uploader, id, name) {
  var container = getContainer(uploader.settings.container);

  var uploadingMessage = stringOrFunction(
                      uploader.settings.messages.uploading,
                      uploader.fineuploader,
                      id
                    );

  fillContainer(uploader, container, id, uploadingMessage);

  uploader.fireAll('onUpload', id, name);
}
