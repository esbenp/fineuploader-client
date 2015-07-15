'use strict';

function onStatusChange(uploader, id, name) {
  uploader.fireAll('onStatusChange', id, name);
}