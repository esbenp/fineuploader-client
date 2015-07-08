System.register(["lodash"], function (_export) {
  "use strict";

  var _;

  _export("isElement", isElement);

  _export("isFunction", isFunction);

  _export("isString", isString);

  _export("isUndefined", isUndefined);

  _export("guid", guid);

  _export("stringOrFunction", stringOrFunction);

  _export("trimFilename", trimFilename);

  function isElement(obj) {
    try {
      return obj instanceof HTMLElement;
    } catch (e) {
      return typeof obj === "object" && obj.nodeType === 1 && typeof obj.style === "object" && typeof obj.ownerDocument === "object";
    }
  }

  function isFunction(input) {
    return typeof input === "function";
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

  function stringOrFunction() {
    var args = Array.prototype.slice.call(arguments);
    var subject = args.shift();

    if (isString(subject)) {
      return subject;
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

  return {
    setters: [function (_lodash) {
      _ = _lodash["default"];
    }],
    execute: function () {}
  };
});