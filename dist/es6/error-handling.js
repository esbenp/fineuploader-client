import qq from 'fineuploader';

export function defaultErrorHandler(uploader, id, name, errorReason, xhr) {
  alert(errorReason);
}
