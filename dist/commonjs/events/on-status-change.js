'use strict';

exports.__esModule = true;
exports.onStatusChange = onStatusChange;

function onStatusChange(uploader, id, name) {
  uploader.fireAll('onStatusChange', id, name);
}