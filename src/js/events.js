import $ from 'jquery';
import {trimFilename, stringOrFunction} from './utilities';

export function onComplete(uploader, id, name, responseJSON, xhr)
{
  var container = $(uploader.settings.container);

  var file_container = container.find("li[qq-file-id='" + id + "']");
  var thumb_container = file_container.find(".uploader-thumbnail-container");
  var icon = thumb_container.find('.optimus-uploader-icon');

  switch(xhr.status){
    case 200:

      var uuid = responseJSON.uuid;
      var name = responseJSON.name;
      var type = responseJSON.type;
      var file_type = responseJSON.file_type;

      // Setting name will fuckup retry and cancel
      this.setName(id, name);
      this.setDeleteFileParams({
        name: name
      }, id);

      //file_container.data("optimus_file", name);

      if (file_type === 'image') {
        icon.removeClass('optimus-uploader-icon-error').hide();
        thumb_container.removeClass("optimus-uploader-thumbnail-error").removeClass("unfilled");
        thumb_container.css('background', 'url(' + responseJSON.thumbnailUrl + ')');

        container.find(".qq-upload-drop-area").addClass("filled");

        file_container.find(".qq-upload-size-selector").hide();
      } else {
        var successMessage = trimFilename(stringOrFunction(
                            uploader.settings.messages.completedUpload,
                            uploader.fineuploader,
                            id
                          ), uploader.settings.maxFilenameDisplayLength);

        file_container.find(".qq-upload-status-text-selector").text(successMessage);

        // Show error icon
        icon.addClass('optimus-uploader-icon-file').show();
        // Red borders
        thumb_container
          .addClass("optimus-uploader-thumbnail-success");
      }

      break;
    default:

      // Show error icon
      icon.addClass('optimus-uploader-icon-error').show();
      // Red borders
      thumb_container
        .addClass("optimus-uploader-thumbnail-error");

      break;
  }

/*  var directory = server_options.baseDirectory();
  var subdirectory = server_options.subDirectory() !== null ? server_options.subDirectory() : uuid;

  var path = subdirectory + "/" + name;
  var full_path = "/uploads/" + directory + "/" + subdirectory + "/" + name;
  var thumb_path = ep_utils.insertLabel(full_path, "_thumb");

  var file_container = template.find("li[qq-file-id='" + id + "']");
  file_container.data("ep_filename", path);
  var thumb_container = file_container.find(".uploader-thumbnail-container");

  file_container.find(".qq-upload-size-selector").text(responseJSON.message);

  thumb_container.css("background-image", "url("+thumb_path+")");
  thumb_container.removeClass("unfilled");

  template.find(".qq-upload-drop-area").addClass("filled");

  if (type === "upload") {
    if (self.limit == 1) {
      self.value(path);
    } else {
      self.value.push(path);
    }
  }

  this.setDeleteFileParams($.extend(server_options, {fileName: name}), id);

  if (type === "upload" && _.isFunction(options.uploadCallback)) {
    options.uploadCallback();
  }*/
}

export function onDeleteComplete(uploader, id, xhr, isError)
{
  var container = $(uploader.settings.container);

  container.find(".qq-upload-drop-area").removeClass("filled");
}

export function onError(id, name, errorReason, xhr)
{

}

export function onProgress(uploader, id, name, uploadedBytes, totalBytes)
{
  var progress = (100/totalBytes)*uploadedBytes;
  var left = 100-progress;

  var listEle = $(uploader.fineuploader.getItemByFileId(id));
  var progressBox = listEle.find('.uploader-thumbnail-container');

  if (left > 0) {
    progressBox.css('background-image', '-webkit-gradient(' +
    	'linear,' +
    	'left top,' +
    	'left bottom,' +
    	'color-stop(0.' + left + ', rgba(255, 255, 255, 0)),' +
    	'color-stop(1, #B9E3A4),'
    );

    progressBox.css('background-image',
      '-o-linear-gradient(bottom, rgba(255, 255, 255, 0) ' + left + '%, #B9E3A4 100%');
    progressBox.css('background-image',
      '-moz-linear-gradient(bottom, rgba(255, 255, 255, 0) ' + left + '%, #B9E3A4 100%');
    progressBox.css('background-image',
      '-webkit-linear-gradient(bottom, rgba(255, 255, 255, 0) ' + left + '%, #B9E3A4 100%');
    progressBox.css('background-image',
      '-ms-linear-gradient(bottom, rgba(255, 255, 255, 0) ' + left + '%, #B9E3A4 100%');
    progressBox.css('background-image',
      'linear-gradient(to bottom, rgba(255, 255, 255, 0) ' + left + '%, #B9E3A4 100%');
  } else {
    console.log("PROGRESS")
  }
}

export function onSessionRequestComplete(uploader, response, success, xhr)
{
  var self = this;

  for (var i in response) {
      var obj = response[i];

      onComplete.call(self, e, i, obj.name, obj, {});
  }
}

export function onSubmit(id, name)
{

}
