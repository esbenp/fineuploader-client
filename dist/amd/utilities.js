define(["exports", "fineuploader"], function (exports, _fineuploader) {
  "use strict";

  exports.__esModule = true;
  exports.isElement = isElement;
  exports.isArray = isArray;
  exports.isFunction = isFunction;
  exports.isObject = isObject;
  exports.isString = isString;
  exports.isUndefined = isUndefined;
  exports.guid = guid;
  exports.stringOrFunction = stringOrFunction;
  exports.trimFilename = trimFilename;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  var _qq = _interopRequireDefault(_fineuploader);

  function isElement(obj) {
    try {
      return obj instanceof HTMLElement;
    } catch (e) {
      return typeof obj === "object" && obj.nodeType === 1 && typeof obj.style === "object" && typeof obj.ownerDocument === "object";
    }
  }

  function isArray(input) {
    return input instanceof Array;
  }

  function isFunction(input) {
    return typeof input === "function";
  }

  function isObject(input) {
    return typeof input === "object";
  }

  function isString(input) {
    return typeof input === "string";
  }

  function isUndefined(input) {
    return typeof input === "undefined";
  }

  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
  }

  function stringOrFunction(subject) {
    var args = Array.prototype.slice.call(arguments, 1);

    if (isString(subject)) {
      if (subject.match("{}")) {
        return _qq["default"].format.apply(_qq["default"].format, [subject].concat(args));
      } else {
        return subject;
      }
    } else if (isFunction(subject)) {
      return subject.apply(this, args);
    } else {
      throw Error("Invalid argument.");
    }
  }

  function trimFilename(filename, maxLength) {
    var ext = filename.substr(filename.lastIndexOf(".") + 1);
    var basename = filename.substr(0, filename.lastIndexOf(".") - 1);

    if (isUndefined(maxLength)) {
      maxLength = 20;
    }

    if (basename.length > maxLength) {
      basename = basename.substr(0, maxLength) + "..";
    }

    return basename + "." + ext;
  }
});