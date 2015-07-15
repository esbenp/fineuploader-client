System.register(['./on-complete', './on-delete-complete', './on-error', './on-progress', './on-status-change', './on-session-request-complete', './on-submit', './on-submit-delete', './on-upload'], function (_export) {
  'use strict';

  var onComplete, onDeleteComplete, onError, onProgress, onStatusChange, onSessionRequestComplete, onSubmit, onSubmitDelete, onUpload;
  return {
    setters: [function (_onComplete) {
      onComplete = _onComplete.onComplete;
    }, function (_onDeleteComplete) {
      onDeleteComplete = _onDeleteComplete.onDeleteComplete;
    }, function (_onError) {
      onError = _onError.onError;
    }, function (_onProgress) {
      onProgress = _onProgress.onProgress;
    }, function (_onStatusChange) {
      onStatusChange = _onStatusChange.onStatusChange;
    }, function (_onSessionRequestComplete) {
      onSessionRequestComplete = _onSessionRequestComplete.onSessionRequestComplete;
    }, function (_onSubmit) {
      onSubmit = _onSubmit.onSubmit;
    }, function (_onSubmitDelete) {
      onSubmitDelete = _onSubmitDelete.onSubmitDelete;
    }, function (_onUpload) {
      onUpload = _onUpload.onUpload;
    }],
    execute: function () {
      _export('onComplete', onComplete);

      _export('onDeleteComplete', onDeleteComplete);

      _export('onError', onError);

      _export('onProgress', onProgress);

      _export('onStatusChange', onStatusChange);

      _export('onSessionRequestComplete', onSessionRequestComplete);

      _export('onSubmit', onSubmit);

      _export('onSubmitDelete', onSubmitDelete);

      _export('onUpload', onUpload);
    }
  };
});