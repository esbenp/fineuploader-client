import {THUMB_CONTAINER_SELECTOR} from '../dom/constants';
import {ICON_CONTAINER_SELECTOR} from '../dom/constants';
import {SIZE_LABEL_SELECTOR} from '../dom/constants';
import {SINGLE_FILLED_CLASS} from '../dom/constants';


export function fillContainer(container, id, message)
{
  var container = container.find("li[qq-file-id='" + id + "']");

  container.addClass(SINGLE_FILLED_CLASS);

  container.find(".qq-upload-status-text-selector")
    .removeClass('qq-hide')
    .text(message);
}

export function toggleContainerErrorMode(container)
{
  var thumb_container = container.find(THUMB_CONTAINER_SELECTOR);
  var icon = container.find(ICON_CONTAINER_SELECTOR);

  // Show error icon
  icon.addClass('optimus-uploader-icon-error').show();
  // Red borders
  thumb_container
    .addClass("optimus-uploader-thumbnail-error");
}

export function toggleContainerSuccessfulFileMode(container, message)
{
  var thumb_container = container.find(THUMB_CONTAINER_SELECTOR);
  var icon = thumb_container.find(ICON_CONTAINER_SELECTOR);

  thumb_container.find(".qq-upload-status-text-selector").text(message);

  icon
    .addClass('optimus-uploader-icon-file')
    .show();

  thumb_container
    .addClass("optimus-uploader-thumbnail-success");
}

export function toggleContainerSuccessfulImageMode(container, thumbnail, message)
{
  var thumb_container = container.find(THUMB_CONTAINER_SELECTOR);
  var icon = container.find(ICON_CONTAINER_SELECTOR);

  icon.removeClass('optimus-uploader-icon-error').hide();
  thumb_container.removeClass("optimus-uploader-thumbnail-error unfilled");
  thumb_container.css('background', 'url(' + thumbnail + ')');

  thumb_container.find(".qq-upload-drop-area").addClass("filled");

  container.find(SIZE_LABEL_SELECTOR).hide();

  container.find(".qq-upload-status-text-selector")
    .addClass('optimus-uploader-status-text-ribbon')
    .text(message);
}
