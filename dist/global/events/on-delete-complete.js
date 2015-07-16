'use strict';

function onDeleteComplete(uploader, id, xhr, isError) {
  var response = $.parseJSON(xhr.responseText);

  var container = getContainer(uploader.settings.container);

  container.removeClass(SINGLE_FILLED_CLASS);

  uploader.fireAll('onDeleteComplete', id, xhr, isError, response.deleted[0]);
}