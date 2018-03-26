/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$ = $;

__webpack_require__(1);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(4);

__webpack_require__(5);

var _plugin_helpers = __webpack_require__(6);

var _plugin_helpers2 = _interopRequireDefault(_plugin_helpers);

var _class_helpers = __webpack_require__(7);

var _class_helpers2 = _interopRequireDefault(_class_helpers);

var _attribute_helpers = __webpack_require__(8);

var _attribute_helpers2 = _interopRequireDefault(_attribute_helpers);

var _target_helpers = __webpack_require__(9);

var _target_helpers2 = _interopRequireDefault(_target_helpers);

var _query_helpers = __webpack_require__(10);

var _query_helpers2 = _interopRequireDefault(_query_helpers);

var _event_helpers = __webpack_require__(11);

var _event_helpers2 = _interopRequireDefault(_event_helpers);

var _content_helpers = __webpack_require__(12);

var _content_helpers2 = _interopRequireDefault(_content_helpers);

var _component = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Public API
window.Plugr = { $: $, Component: _component.Component, registerComponent: _component.registerComponent, connectComponents: _component.connectComponents, watch: _component.watch

  /**
   * Wraps the given DOMElement or NodeList in a Plugr element. The Plugr element
   * provides an API very similar to jQuery.
   */
};function $(arg) {
  return wrapDOMElement(arg, [_plugin_helpers2.default, _class_helpers2.default, _attribute_helpers2.default, _query_helpers2.default, _target_helpers2.default, _event_helpers2.default, _content_helpers2.default]);
}

/**
 * Returns an object with the given `arg` as the source
 * element with the helpers applied.
 *
 * @param {DOMElement|NodeList} arg
 * @param {function[]} helpers
 */
function wrapDOMElement(arg, helpers) {
  return helpers.reduce(function (arg, helper) {
    return helper(arg);
  }, arg);
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (!Array.prototype.filter) {
  Array.prototype.filter = function (fun /*, thisArg*/) {
    'use strict';

    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function') {
      throw new TypeError();
    }

    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i];

        // NOTE: Technically this should Object.defineProperty at
        //       the next index, as push can be affected by
        //       properties on Object.prototype and Array.prototype.
        //       But that method's new, and collisions should be
        //       rare, so use the more-compatible alternative.
        if (fun.call(thisArg, val, i, t)) {
          res.push(val);
        }
      }
    }

    return res;
  };
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (!Array.prototype.find) {
  Array.prototype.find = function (predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (fn, scope) {
    for (var i = 0, len = this.length; i < len; ++i) {
      fn.call(scope, this[i], i, this);
    }
  };
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {

  Array.prototype.map = function (callback, thisArg) {

    var T, A, k;

    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }

    //  1. Let O be the result of calling ToObject passing the |this| 
    //    value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal 
    //    method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let A be a new array created as if by the expression new Array(len) 
    //    where Array is the standard built-in constructor with that name and 
    //    len is the value of len.
    A = new Array(len);

    // 7. Let k be 0
    k = 0;

    // 8. Repeat, while k < len
    while (k < len) {

      var kValue, mappedValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal 
      //    method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal 
        //    method of O with argument Pk.
        kValue = O[k];

        // ii. Let mappedValue be the result of calling the Call internal 
        //     method of callback with T as the this value and argument 
        //     list containing kValue, k, and O.
        mappedValue = callback.call(T, kValue, k, O);

        // iii. Call the DefineOwnProperty internal method of A with arguments
        // Pk, Property Descriptor
        // { Value: mappedValue,
        //   Writable: true,
        //   Enumerable: true,
        //   Configurable: true },
        // and false.

        // In browsers that support Object.defineProperty, use the following:
        // Object.defineProperty(A, k, {
        //   value: mappedValue,
        //   writable: true,
        //   enumerable: true,
        //   configurable: true
        // });

        // For best browser support, use the following:
        A[k] = mappedValue;
      }
      // d. Increase k by 1.
      k++;
    }

    // 9. return A
    return A;
  };
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Production steps of ECMA-262, Edition 5, 15.4.4.21
// Reference: http://es5.github.io/#x15.4.4.21
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
if (!Array.prototype.reduce) {
  Object.defineProperty(Array.prototype, 'reduce', {
    value: function value(callback /*, initialValue*/) {
      if (this === null) {
        throw new TypeError('Array.prototype.reduce ' + 'called on null or undefined');
      }
      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }

      // 1. Let O be ? ToObject(this value).
      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // Steps 3, 4, 5, 6, 7      
      var k = 0;
      var value;

      if (arguments.length >= 2) {
        value = arguments[1];
      } else {
        while (k < len && !(k in o)) {
          k++;
        }

        // 3. If len is 0 and initialValue is not present,
        //    throw a TypeError exception.
        if (k >= len) {
          throw new TypeError('Reduce of empty array ' + 'with no initial value');
        }
        value = o[k++];
      }

      // 8. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kPresent be ? HasProperty(O, Pk).
        // c. If kPresent is true, then
        //    i.  Let kValue be ? Get(O, Pk).
        //    ii. Let accumulator be ? Call(
        //          callbackfn, undefined,
        //          « accumulator, kValue, k, O »).
        if (k in o) {
          value = callback(value, o[k], k, o);
        }

        // d. Increase k by 1.      
        k++;
      }

      // 9. Return accumulator.
      return value;
    }
  });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pluginHelpers;
function pluginHelpers(arg) {
  if (typeof arg === 'string') {
    var div = document.createElement('div');
    div.innerHTML = arg.trim();
    arg = div.childNodes;
  }

  if (arg instanceof NodeList) {
    arg = Array.prototype.slice.call(arg);
  } else if (arg instanceof HTMLElement) {
    arg = [arg];
  } else if (arg.source) {
    arg = arg.source;
  }

  var eachNode = function eachNode(callback) {
    return arg.forEach(callback);
  };
  var firstNode = function firstNode(callback) {
    return callback(arg[0]);
  };

  return {
    source: arg,
    eachNode: eachNode,
    get length() {
      if (arg.length !== undefined) {
        return arg.length;
      }

      if (!arg) {
        return 0;
      }

      return 1;
    },
    register: function register(functionName, callback) {
      this[functionName] = function () {
        var args = Array.prototype.slice.call(arguments);

        eachNode(function (node) {
          callback.apply(null, [node].concat(args));
        });

        return this;
      };
    },
    registerFirst: function registerFirst(functionName, callback) {
      this[functionName] = function () {
        var args = Array.prototype.slice.call(arguments);

        var returnValue = firstNode(function (node) {
          return callback.apply(null, [node].concat(args));
        });

        return returnValue === undefined ? this : returnValue;
      };
    },
    registerMapReduce: function registerMapReduce(functionName, map, reduce) {
      this[functionName] = function () {
        var args = Array.prototype.slice.call(arguments);

        var values = [];

        eachNode(function (node) {
          values.push(map.apply(null, [node].concat(args)));
        });

        return reduce(values);
      };
    },
    alias: function alias(functionName, callback) {
      this[functionName] = function () {
        var args = Array.prototype.slice.call(arguments);

        return callback.apply(null, args);
      };
    }
  };
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = classHelpers;
function classHelpers(source) {
  source.register('addClass', function (node, className) {
    className.split(' ').forEach(function (className) {
      node.classList.add(className);
    });
  });

  source.register('removeClass', function (node, className) {
    className.split(' ').forEach(function (className) {
      node.classList.remove(className);
    });
  });

  source.register('toggleClass', function (node, className, conditional) {
    className.split(' ').forEach(function (className) {
      node.classList.toggle(className, conditional);
    });
  });

  return source;
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = attributeHelpers;
function attributeHelpers(source) {
  source.registerFirst('prop', function (node, propName) {
    return node[propName];
  });

  return source;
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = targetHelpers;
function targetHelpers(source) {
  source.alias('target', function (targetName) {
    return source.find('[data-target="' + targetName + '"]');
  });

  return source;
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = queryHelpers;
function queryHelpers(source) {

  source.registerMapReduce('find', function (node, selector) {
    return node.querySelectorAll(selector);
  }, function (allChildren) {
    var flattened = [];

    allChildren.forEach(function (nodes) {
      for (var i = 0; i < nodes.length; i++) {
        flattened.push(nodes[i]);
      }
    });

    return window.Plugr.$(flattened);
  });

  source.registerFirst('parent', function (node) {
    return window.Plugr.$(node.parentNode);
  });

  return source;
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eventHelpers;
function eventHelpers(source) {
  source.register('on', function (node, eventName, handler) {
    var wrappedHandler = function wrappedHandler(ev) {
      return handler(ev, node);
    };

    node.__eventHandlers = node.__eventHandlers || {};
    node.__eventHandlers[handler] = wrappedHandler;

    node.addEventListener(eventName, wrappedHandler);
  });

  source.register('off', function (node, eventName, handler) {
    var wrappedHandler = node.__eventHandlers ? node.__eventHandlers[handler] : handler;

    node.removeEventListener(eventName, wrappedHandler);
  });

  source.registerFirst('trigger', function (node, eventName, data) {
    var event = new CustomEvent(eventName, { detail: data });
    return node.dispatchEvent(event);
  });

  return source;
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = contentHelpers;
function contentHelpers(source) {
  source.registerFirst('html', function (node, contents) {
    if (contents === undefined) return node.innerHTML;

    source.empty();
    source.append(contents);
  });

  source.registerFirst('append', function (node, child) {
    window.Plugr.$(child).eachNode(function (child) {
      node.appendChild(child);
    });
  });

  source.register('empty', function (node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  });

  return source;
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.registerComponent = registerComponent;
exports.watch = watch;
exports.connectComponents = connectComponents;
exports.render = render;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = exports.Component = function () {
  function Component(node) {
    _classCallCheck(this, Component);

    this.node = node;
    this.$elm = window.Plugr.$(node);

    if (typeof this.template === 'function') {
      this.$elm.html(this.template());
    }
  }

  _createClass(Component, [{
    key: 'target',
    value: function target(targetName) {
      return this.$elm.target(targetName);
    }
  }, {
    key: 'connect',
    value: function connect() {}
  }, {
    key: 'disconnect',
    value: function disconnect() {}
  }]);

  return Component;
}();

var registeredComponents = {};

function registerComponent(componentName, componentClass) {
  registeredComponents[componentName] = componentClass;
}

function watch(root) {
  var mutationObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      console.log('mutation', mutation);
    });
  });

  mutationObserver.observe(root, {
    childList: true,
    subtree: true
  });
}

function connectComponents(rootElement) {
  var components = rootElement.querySelectorAll('[data-component]');

  Array.prototype.forEach.call(components, function (node) {
    var componentName = node.getAttribute('data-component');

    connectComponent(node, componentName);

    injectComponetAPI(node);
  });
}

function connectComponent(node, componentName) {
  var componentClass = registeredComponents[componentName];

  var instance = new componentClass(node);

  instance.connect();

  node.__initializedComponents = node.__initializedComponents || {};
  node.__initializedComponents[componentName] = instance;

  return instance;
}

function injectComponetAPI(node) {
  node.getComponent = function (name) {
    return node.__initializedComponents && node.__initializedComponents[name];
  };
}

function render(componentName) {
  var node = document.createElement('div');
  node.setAttribute('data-component', componentName);
  var component = connectComponent(node, componentName);

  return { node: node, component: component };
}

/***/ })
/******/ ]);
//# sourceMappingURL=plugr.bundle.js.map