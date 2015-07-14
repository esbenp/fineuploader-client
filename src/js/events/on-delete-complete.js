import $ from 'jquery';
import {SINGLE_FILLED_CLASS} from '../dom/constants';

export function onDeleteComplete(uploader, id, xhr, isError)
{
  var container = $(uploader.settings.container).find(".qq-uploader-selector");

  container.removeClass(SINGLE_FILLED_CLASS);

  uploader.fireAll('onDeleteComplete', id, xhr, isError);
}
