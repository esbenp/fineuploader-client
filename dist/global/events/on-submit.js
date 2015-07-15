'use strict';

function onSubmit(uploader, id, name) {
  uploader.fireAll('onSubmit', id, name);
}