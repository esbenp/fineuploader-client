'use strict';

exports.__esModule = true;
exports.onAllComplete = onAllComplete;

function onAllComplete(uploader, succeeded, failed) {
  uploader.fireAll('onAllComplete', succeeded, failed);
}