'use strict';

function onAllComplete(uploader, succeeded, failed) {
  uploader.fireAll('onAllComplete', succeeded, failed);
}