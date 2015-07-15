import $ from 'jquery';
import {isFunction} from '../utilities';

export function onSubmitDelete(uploader, id)
{
  var deferred = $.Deferred();

 var filename = this.getName(id);

  var deleteCheck = uploader.settings.deleteCheck;
  if (isFunction(deleteCheck)) {
    deleteCheck(filename, deferred);
  } else {
    deferred.resolve(true);
  }

  uploader.fireAll('onSubmitDelete', id, deferred);

  return deferred;
}
