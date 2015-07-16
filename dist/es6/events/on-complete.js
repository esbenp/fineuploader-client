import $ from 'jquery';
import {
  stringOrFunction,
  trimFilename
} from '../utilities';
import {
  toggleFileContainerErrorMode,
  toggleFileContainerSuccessfulFileMode,
  toggleFileContainerSuccessfulImageMode
} from '../dom/utilities';

export function onComplete(uploader, id, name, responseJSON, xhr)
{
  var file_container = $(uploader.fineuploader.getItemByFileId(id));

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
      var successMessage;

      if (file_type === 'image') {
        successMessage = stringOrFunction(
          uploader.settings.messages.completedImage,
          uploader.fineuploader,
          id
        );

        toggleFileContainerSuccessfulImageMode(
          file_container,
          responseJSON.thumbnailUrl,
          successMessage
        );
      } else {
        successMessage = trimFilename(stringOrFunction(
          uploader.settings.messages.completedFile,
          uploader.fineuploader,
          id
        ), uploader.settings.maxFilenameDisplayLength);

        toggleFileContainerSuccessfulFileMode(
          file_container,
          successMessage
        );
      }

      break;
    default:

      // Error handling will happen in onError

      break;
  }

  uploader.fireAll('onComplete', id, name, responseJSON, xhr, upload_path);
}
