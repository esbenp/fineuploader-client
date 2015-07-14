import _ from 'lodash';
import qq from 'fineuploader';

// http://stackoverflow.com/a/384380/602488
export function isElement(obj) {
  try {
    //Using W3 DOM2 (works for FF, Opera and Chrom)
    return obj instanceof HTMLElement;
  }
  catch(e){
    //Browsers not supporting W3 DOM2 don't have HTMLElement and
    //an exception is thrown and we end up here. Testing some
    //properties that all elements have. (works on IE7)
    return (typeof obj==="object") &&
      (obj.nodeType===1) && (typeof obj.style === "object") &&
      (typeof obj.ownerDocument ==="object");
  }
}

export function isArray(input) {
  return input instanceof Array;
}

export function isFunction(input) {
  return typeof input === 'function';
}

export function isString(input) {
  return typeof input === 'string';
}

export function isUndefined(input) {
  return typeof input === 'undefined';
}

export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export function stringOrFunction(subject) {
  var args = Array.prototype.slice.call(arguments, 1);

  if (isString(subject)) {
    if (subject.match('{}')) {
      return qq.format.apply(qq.format, [subject].concat(args));
    } else {
      return subject;
    }
  } else if (isFunction(subject)){
    return subject.apply(this, args);
  } else {
    throw Error("Invalid argument.");
  }
}

export function trimFilename(filename, maxLength) {
  var ext = filename.substr(filename.lastIndexOf('.')+1);
  var basename = filename.substr(0, filename.lastIndexOf('.')-1);

  if (isUndefined(maxLength)) {
    maxLength = 20;
  }

  if (basename.length > maxLength) {
    basename = basename.substr(0, maxLength) + '..';
  }

  return basename + '.' + ext;
}
