define(['exports', './on-complete', './on-delete-complete', './on-error', './on-progress', './on-status-change', './on-session-request-complete', './on-submit', './on-submit-delete', './on-upload'], function (exports, _onComplete, _onDeleteComplete, _onError, _onProgress, _onStatusChange, _onSessionRequestComplete, _onSubmit, _onSubmitDelete, _onUpload) {
  'use strict';

  exports.__esModule = true;
  exports.onComplete = _onComplete.onComplete;
  exports.onDeleteComplete = _onDeleteComplete.onDeleteComplete;
  exports.onError = _onError.onError;
  exports.onProgress = _onProgress.onProgress;
  exports.onStatusChange = _onStatusChange.onStatusChange;
  exports.onSessionRequestComplete = _onSessionRequestComplete.onSessionRequestComplete;
  exports.onSubmit = _onSubmit.onSubmit;
  exports.onSubmitDelete = _onSubmitDelete.onSubmitDelete;
  exports.onUpload = _onUpload.onUpload;
});