'use strict';

function defaultErrorHandler(uploader, id, name, errorReason, xhr) {
  alert(errorReason);
}