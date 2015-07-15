System.register([], function (_export) {
  'use strict';

  _export('debug', debug);

  _export('err', err);

  function debug(message) {
    if (__DEBUG__) {
      for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
      }

      console.debug.apply(console, ['Debug: ' + message].concat(rest));
    }
  }

  function err(message) {
    for (var _len2 = arguments.length, rest = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      rest[_key2 - 1] = arguments[_key2];
    }

    console.error.apply(console, ['Error: ' + message].concat(rest));
    return false;
  }

  return {
    setters: [],
    execute: function () {
      (function (global) {
        'use strict';
        global.console = global.console || {};
        var con = global.console;
        var prop, method;
        var empty = {};
        var dummy = function dummy() {};
        var properties = 'memory'.split(',');
        var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' + 'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' + 'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
        while (prop = properties.pop()) if (!con[prop]) con[prop] = empty;
        while (method = methods.pop()) if (!con[method]) con[method] = dummy;
      })(typeof window === 'undefined' ? undefined : window);

      if (Function.prototype.bind && window.console && typeof console.log == 'object') {
        ['log', 'info', 'warn', 'error', 'assert', 'dir', 'clear', 'profile', 'profileEnd'].forEach(function (method) {
          console[method] = this.bind(console[method], console);
        }, Function.prototype.call);
      }
    }
  };
});