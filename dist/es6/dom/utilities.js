import {
  CONTAINER_SELECTOR,
  FILE_ICON_FILE_CLASS,
  FILE_ICON_ERROR_CLASS,
  FILE_ICON_SELECTOR,
  FILE_STATUS_TEXT_RIBBON_CLASS,
  FILE_STATUS_TEXT_SELECTOR,
  SINGLE_FILLED_CLASS,
  SIZE_LABEL_SELECTOR,
  THUMBNAIL_SELECTOR,
  THUMBNAIL_ERROR_CLASS,
  THUMBNAIL_SUCCESS_CLASS,
  THUMBNAIL_UNFILLED_CLASS
} from '../dom/constants';

// Get uploader container
export function getContainer(container)
{
  return $(container).find(CONTAINER_SELECTOR);
}

export function fillContainer(container, id, message)
{
  container.addClass(SINGLE_FILLED_CLASS);

  container.find(FILE_STATUS_TEXT_SELECTOR)
    .removeClass('qq-hide')
    .text(message);
}

export function toggleFileContainerErrorMode(container)
{
  var thumb_container = container.find(THUMBNAIL_SELECTOR);
  var icon = container.find(FILE_ICON_SELECTOR);

  container.removeClass('qq-upload-success').addClass('qq-upload-fail');

  // Show error icon
  icon.addClass(FILE_ICON_ERROR_CLASS).show();
  // Red borders
  thumb_container
    .addClass(THUMBNAIL_ERROR_CLASS);
}

export function toggleFileContainerSuccessfulFileMode(container, message)
{
  var thumb_container = container.find(THUMBNAIL_SELECTOR);
  var icon = thumb_container.find(FILE_ICON_SELECTOR);

  container.find(FILE_STATUS_TEXT_SELECTOR).text(message);

  icon
    .addClass(FILE_ICON_FILE_CLASS)
    .show();

  thumb_container
    .addClass(THUMBNAIL_SUCCESS_CLASS);
}

export function toggleFileContainerSuccessfulImageMode(container, thumbnail, message)
{
  var thumb_container = container.find(THUMBNAIL_SELECTOR);
  var icon = container.find(FILE_ICON_SELECTOR);

  icon.removeClass(FILE_ICON_ERROR_CLASS).hide();
  thumb_container.removeClass(THUMBNAIL_ERROR_CLASS + ' ' + THUMBNAIL_UNFILLED_CLASS);
  thumb_container.css('background', 'url(' + thumbnail + ')');

  container.find(SIZE_LABEL_SELECTOR).hide();

  container.find(FILE_STATUS_TEXT_SELECTOR)
    .addClass(FILE_STATUS_TEXT_RIBBON_CLASS)
    .text(message);
}
