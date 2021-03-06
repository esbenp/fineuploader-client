import $ from 'jquery';
import {SINGLE_FILLED_CLASS} from '../dom/constants';
import {getContainer} from '../dom/utilities';

export function onDeleteComplete(uploader, id, xhr, isError)
{
  let response = $.parseJSON(xhr.responseText);

  let container = getContainer(uploader.settings.container);

  container.removeClass(SINGLE_FILLED_CLASS);

  uploader.fireAll('onDeleteComplete', id, xhr, isError, response.deleted[0]);
}
