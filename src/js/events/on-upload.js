import $ from 'jquery';
import {fillContainer} from '../dom/utilities';
import {stringOrFunction} from '../utilities';

export function onUpload(uploader, id, name) {
  var container = $(uploader.settings.container).find(".qq-uploader-selector");

  var file_container = container.find("li[qq-file-id='" + id + "']");
  var uploadingMessage = stringOrFunction(
                      uploader.settings.messages.uploading,
                      uploader.fineuploader,
                      id
                    );

  fillContainer(container, id, uploadingMessage);

  uploader.fireAll('onUpload', id, name);
}
