import $ from 'jquery';
import {
  stringOrFunction,
  trimFilename
} from '../utilities';
import {
  fillContainer,
  toggleContainerErrorMode,
  toggleContainerSuccessfulFileMode,
  toggleContainerSuccessfulImageMode
} from '../dom/utilities';

export function onComplete(uploader, id, name, responseJSON, xhr)
{
  var container = $(uploader.settings.container).find(".qq-uploader-selector");
  var file_container = container.find("li[qq-file-id='" + id + "']");

  switch(xhr.status){
    case 200:

      var name = responseJSON.name;
      var upload_path = responseJSON.upload_path;

      // Setting name will fuckup retry and cancel
      this.setName(id, name);
      this.setDeleteFileParams({
        upload_path: upload_path
      }, id);

      var file_type = responseJSON.file_type;

      if (file_type === 'image') {
        var successMessage = stringOrFunction(
          uploader.settings.messages.completedImage,
          uploader.fineuploader,
          id
        );

        toggleContainerSuccessfulImageMode(
          file_container,
          responseJSON.thumbnailUrl,
          successMessage
        );
      } else {
        var successMessage = trimFilename(stringOrFunction(
          uploader.settings.messages.completedFile,
          uploader.fineuploader,
          id
        ), uploader.settings.maxFilenameDisplayLength);

        toggleContainerSuccessfulFileMode(
          file_container,
          successMessage
        );
      }

      break;
    default:

      // Error handling will happen in onError

      break;
  }

  uploader.fireAll('onComplete', id, name, responseJSON, xhr);
}
