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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var runtime = function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.

  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }

  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.

    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.

  var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.


  var IteratorPrototype = {};

  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  exports.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }

    genFun.prototype = Object.create(Gp);
    return genFun;
  }; // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.


  exports.awrap = function (arg) {
    return {
      __await: arg
    };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;

        if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    } // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).


    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };

  exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.

  exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        } // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;

        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);

          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);

        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted; // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.

          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  } // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.


  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

      context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.

      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    } // The delegate iterator is finished, so forget it and continue with
    // the outer generator.


    context.delegate = null;
    return ContinueSentinel;
  } // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.


  defineIteratorMethods(Gp);
  define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    keys.reverse(); // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.

    return function next() {
      while (keys.length) {
        var key = keys.pop();

        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      } // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.


      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];

      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;
          return next;
        };

        return next.next = next;
      }
    } // Return an iterator with no values.


    return {
      next: doneResult
    };
  }

  exports.values = values;

  function doneResult() {
    return {
      value: undefined,
      done: true
    };
  }

  Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      this.prev = 0;
      this.next = 0; // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.

      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = undefined;
      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },
    stop: function () {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;

      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;

      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },
    complete: function (record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      } // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.


      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  }; // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.

  return exports;
}( // If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
 true ? module.exports : undefined);

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

/***/ }),

/***/ "./src/config/keys.js":
/*!****************************!*\
  !*** ./src/config/keys.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

if (false) {} else {
  module.exports = __webpack_require__(/*! ./keys_dev */ "./src/config/keys_dev.js");
}

/***/ }),

/***/ "./src/config/keys_dev.js":
/*!********************************!*\
  !*** ./src/config/keys_dev.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  pubgAPI: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI1NmM1Y2M5MC1lYmZmLTAxMzgtMWQxOC00YmMyNjVmMzEyYjEiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNjAyMjA4MDYwLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6ImNsaXBwZWQifQ.YGBlh3eJqRPOkeSDJqTUKG2qAQ_q6cex8OBKUupLtSI',
  twitchAPI: '6dgia1pmvmrls3i6lezgrmibv030pz',
  clientSECRET: 'b7hg2zgh9lgs5v7i9010fklgwciksk',
  oAUTH: 'n0us7my50xuj23dg2q89zjj6xvz2aw',
  gameID: '493057'
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/styles/index.scss */ "./src/styles/index.scss");
/* harmony import */ var _scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/search_utilities */ "./src/scripts/search_utilities.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _scripts_no_videos_found__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scripts/no_videos_found */ "./src/scripts/no_videos_found.js");
/* harmony import */ var _scripts_streams__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scripts/streams */ "./src/scripts/streams.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






document.addEventListener("DOMContentLoaded", function () {
  var BLACKLISTED = {};
  var kAV = [];
  var actual;
  var streams = []; // let gamertag = document.getElementsByClassName("gamertag-field")[0].value;

  var container = document.getElementsByClassName("getStreams")[0];
  document.querySelector(".fa-search").addEventListener("click", getPlayer);
  var input = document.createElement("section");
  input.classList.add("input-container");
  input.style.display = "none";
  var un = document.createElement("input");
  un.setAttribute("type", "text");
  un.setAttribute("placeholder", "Twitch User");
  un.classList.add("un-field");
  input.appendChild(un);
  var gt = document.createElement("input");
  gt.setAttribute("type", "text");
  gt.setAttribute("placeholder", "PUBG User");
  gt.classList.add("gt-field");
  input.appendChild(gt);
  var submit = document.createElement("span");
  submit.classList.add("submit-stream");
  submit.innerHTML = "Search";
  input.appendChild(submit);
  container.appendChild(input);
  document.getElementById("getStreams").addEventListener("click", function (e) {
    if (input.style.display === "flex") {
      input.style.display = "none";
    } else {
      input.style.display = "flex";
    }
  });
  document.querySelector(".submit-stream").addEventListener("click", getInput);

  function getInput() {
    return _getInput.apply(this, arguments);
  }

  function _getInput() {
    _getInput = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var uname, gtag, fp, allVids, getStreams, _getStreams;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _getStreams = function _getStreams3() {
                _getStreams = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(uname, gtag) {
                  var matches, games, telemetry, twitchUser, videos, _clips, _iterator, _step, vid, c;

                  return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          _context4.next = 2;
                          return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getPlayerByName"])(gtag);

                        case 2:
                          matches = _context4.sent;
                          console.log(matches);
                          actual = matches.map( /*#__PURE__*/function () {
                            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(match) {
                              return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                  switch (_context.prev = _context.next) {
                                    case 0:
                                      _context.next = 2;
                                      return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getMatch"])(match.id);

                                    case 2:
                                      return _context.abrupt("return", _context.sent);

                                    case 3:
                                    case "end":
                                      return _context.stop();
                                  }
                                }
                              }, _callee);
                            }));

                            return function (_x3) {
                              return _ref.apply(this, arguments);
                            };
                          }());
                          _context4.next = 7;
                          return Promise.allSettled(actual);

                        case 7:
                          games = _context4.sent;
                          // console.log(games)
                          games.forEach( /*#__PURE__*/function () {
                            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(match) {
                              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                while (1) {
                                  switch (_context3.prev = _context3.next) {
                                    case 0:
                                      if (match.value) {
                                        if (match.value.included) {
                                          match.value.included.forEach( /*#__PURE__*/function () {
                                            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ele) {
                                              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                                while (1) {
                                                  switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                      if (ele.id === match.value.data.relationships.assets.data[0].id) {
                                                        events.push(Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getTelemetry"])(ele.attributes.URL));
                                                      }

                                                    case 1:
                                                    case "end":
                                                      return _context2.stop();
                                                  }
                                                }
                                              }, _callee2);
                                            }));

                                            return function (_x5) {
                                              return _ref3.apply(this, arguments);
                                            };
                                          }());
                                        }
                                      }

                                    case 1:
                                    case "end":
                                      return _context3.stop();
                                  }
                                }
                              }, _callee3);
                            }));

                            return function (_x4) {
                              return _ref2.apply(this, arguments);
                            };
                          }());
                          _context4.next = 11;
                          return Promise.allSettled(events);

                        case 11:
                          telemetry = _context4.sent;
                          // console.log(telemetry)
                          telemetry.forEach(function (event) {
                            event.value.forEach(function (log) {
                              if (log._T === "LogPlayerKill" && log.killer && log.killer.name === gtag || log._T === "LogPlayerKill" && log.victim && log.victim.name === gtag) {
                                kAV.push(log);
                              }
                            });
                          }); // console.log(kAV);

                          _context4.next = 15;
                          return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getTwitchUser"])(uname).then(function (response) {
                            if (response.ok) {
                              return response.json().then(function (json) {
                                return json;
                              });
                            } else {
                              return false;
                            }
                          });

                        case 15:
                          twitchUser = _context4.sent;

                          if (!twitchUser) {
                            _context4.next = 30;
                            break;
                          }

                          if (!(twitchUser.data.length > 0)) {
                            _context4.next = 30;
                            break;
                          }

                          _context4.next = 20;
                          return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getVideos"])(twitchUser.data[0].id);

                        case 20:
                          videos = _context4.sent;

                          if (!(videos.data.length > 0)) {
                            _context4.next = 30;
                            break;
                          }

                          _clips = [];
                          _iterator = _createForOfIteratorHelper(videos.data);

                          try {
                            for (_iterator.s(); !(_step = _iterator.n()).done;) {
                              vid = _step.value;

                              _clips.push(Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getPubgVideos"])(vid.id).then(function (response) {
                                if (response.ok) {
                                  return response.json();
                                } else {
                                  return false;
                                }
                              }));
                            }
                          } catch (err) {
                            _iterator.e(err);
                          } finally {
                            _iterator.f();
                          }

                          _context4.next = 27;
                          return Promise.all(_clips);

                        case 27:
                          c = _context4.sent;
                          // console.log(c);
                          streams = c.filter(function (ele) {
                            return ele.game === "PLAYERUNKNOWN'S BATTLEGROUNDS";
                          }); // debugger

                          return _context4.abrupt("return", streams);

                        case 30:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4);
                }));
                return _getStreams.apply(this, arguments);
              };

              getStreams = function _getStreams2(_x, _x2) {
                return _getStreams.apply(this, arguments);
              };

              uname = document.getElementsByClassName("un-field")[0].value;
              gtag = document.getElementsByClassName("gt-field")[0].value;

              if (uname && gtag) {
                fp = document.createElement("span");
                fp.classList.add("loading1", "load");
                fp.innerHTML = 'Fetching Videos ...';
                input.appendChild(fp);
              }

              _context5.next = 7;
              return getStreams(uname, gtag);

            case 7:
              allVids = _context5.sent;
              Object(_scripts_streams__WEBPACK_IMPORTED_MODULE_4__["displayStreams"])(kAV, allVids, gtag);

            case 9:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));
    return _getInput.apply(this, arguments);
  }

  var actualMatches = [];
  var events = [];
  var telemetryEvents = [];
  var clips = [];

  function getPlayer() {
    return _getPlayer.apply(this, arguments);
  }

  function _getPlayer() {
    _getPlayer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
      var gamertag, splash, logo, fetchingPlayer, matches, fetchingMatches, games, fetchingEvents, telemetry, fetchingKillsAndDeaths, fetchingVideos, _iterator2, _step2, _loop, final;

      return regeneratorRuntime.wrap(function _callee11$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              gamertag = document.getElementsByClassName("gamertag-field")[0].value;
              splash = document.getElementsByClassName("splash-content")[0];
              logo = document.getElementsByClassName("logo")[0];
              fetchingPlayer = document.createElement("span");
              fetchingPlayer.classList.add("loading1", "loading");
              fetchingPlayer.innerHTML = 'Fetching Player ...';
              splash.appendChild(fetchingPlayer);
              _context12.next = 9;
              return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getPlayerByName"])(gamertag);

            case 9:
              matches = _context12.sent;
              console.log(matches);
              actualMatches = matches.map( /*#__PURE__*/function () {
                var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(match) {
                  return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          _context6.next = 2;
                          return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getMatch"])(match.id);

                        case 2:
                          return _context6.abrupt("return", _context6.sent);

                        case 3:
                        case "end":
                          return _context6.stop();
                      }
                    }
                  }, _callee6);
                }));

                return function (_x6) {
                  return _ref4.apply(this, arguments);
                };
              }());
              fetchingPlayer.style.display = "none";
              fetchingMatches = document.createElement("span");
              fetchingMatches.classList.add("loading2", "loading");
              fetchingMatches.innerHTML = 'Fetching Matches ...';
              splash.appendChild(fetchingMatches);
              _context12.next = 19;
              return Promise.allSettled(actualMatches);

            case 19:
              games = _context12.sent;
              // console.log(games)
              fetchingMatches.style.display = "none";
              fetchingEvents = document.createElement("span");
              fetchingEvents.classList.add("loading3", "loading");
              fetchingEvents.innerHTML = 'Fetching Events ...';
              splash.appendChild(fetchingEvents);
              games.forEach( /*#__PURE__*/function () {
                var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(match) {
                  return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                      switch (_context8.prev = _context8.next) {
                        case 0:
                          if (match.value) {
                            if (match.value.included) {
                              match.value.included.forEach( /*#__PURE__*/function () {
                                var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(ele) {
                                  return regeneratorRuntime.wrap(function _callee7$(_context7) {
                                    while (1) {
                                      switch (_context7.prev = _context7.next) {
                                        case 0:
                                          if (ele.id === match.value.data.relationships.assets.data[0].id) {
                                            events.push(Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getTelemetry"])(ele.attributes.URL));
                                          }

                                        case 1:
                                        case "end":
                                          return _context7.stop();
                                      }
                                    }
                                  }, _callee7);
                                }));

                                return function (_x8) {
                                  return _ref6.apply(this, arguments);
                                };
                              }());
                            }
                          }

                        case 1:
                        case "end":
                          return _context8.stop();
                      }
                    }
                  }, _callee8);
                }));

                return function (_x7) {
                  return _ref5.apply(this, arguments);
                };
              }());
              _context12.next = 28;
              return Promise.allSettled(events);

            case 28:
              telemetry = _context12.sent;
              fetchingEvents.style.display = "none";
              fetchingKillsAndDeaths = document.createElement("span");
              fetchingKillsAndDeaths.classList.add("loading4", "loading");
              fetchingKillsAndDeaths.innerHTML = 'Fetching Kills and Deaths ...';
              splash.appendChild(fetchingKillsAndDeaths); // console.log(telemetry)

              telemetry.forEach(function (event) {
                event.value.forEach(function (log) {
                  if (log._T === "LogPlayerKill" && log.killer && log.killer.name === gamertag || log._T === "LogPlayerKill" && log.victim && log.victim.name === gamertag) {
                    telemetryEvents.push(log);
                  }
                });
              }); // console.log(telemetryEvents)

              fetchingKillsAndDeaths.style.display = "none";
              fetchingVideos = document.createElement("span");
              fetchingVideos.classList.add("loading5", "loading");
              fetchingVideos.innerHTML = 'Fetching Videos ...';
              splash.appendChild(fetchingVideos);
              _iterator2 = _createForOfIteratorHelper(telemetryEvents);
              _context12.prev = 41;
              _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop() {
                var tEvent, eventTimestamp, twitchUser, videos, _twitchUser, _videos;

                return regeneratorRuntime.wrap(function _loop$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        tEvent = _step2.value;
                        eventTimestamp = tEvent._D;

                        if (!tEvent.killer) {
                          _context11.next = 17;
                          break;
                        }

                        if (BLACKLISTED[tEvent.killer.name]) {
                          _context11.next = 17;
                          break;
                        }

                        _context11.next = 6;
                        return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getTwitchUser"])(tEvent.killer.name).then(function (response) {
                          if (response.ok) {
                            return response.json().then(function (json) {
                              return json;
                            });
                          } else {
                            return false;
                          }
                        });

                      case 6:
                        twitchUser = _context11.sent;

                        if (!twitchUser) {
                          _context11.next = 16;
                          break;
                        }

                        if (!(twitchUser.data.length > 0)) {
                          _context11.next = 14;
                          break;
                        }

                        _context11.next = 11;
                        return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getVideos"])(twitchUser.data[0].id);

                      case 11:
                        videos = _context11.sent;

                        if (videos.data.length > 0) {
                          videos.data.map( /*#__PURE__*/function () {
                            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(vid) {
                              var clip;
                              return regeneratorRuntime.wrap(function _callee9$(_context9) {
                                while (1) {
                                  switch (_context9.prev = _context9.next) {
                                    case 0:
                                      _context9.next = 2;
                                      return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getPubgVideos"])(vid.id).then(function (response) {
                                        if (response.ok) {
                                          return response.json();
                                        } else {
                                          return false;
                                        }
                                      });

                                    case 2:
                                      clip = _context9.sent;

                                      if (clip) {
                                        // debugger
                                        if (clip.game === "PLAYERUNKNOWN'S BATTLEGROUNDS") {
                                          // debugger
                                          if (Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["timeGreaterThan"])(eventTimestamp, clip.created_at) && Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["timeGreaterThan2"])(eventTimestamp, clip.created_at, clip.length)) {
                                            // debugger
                                            clips.push({
                                              "url": clip.url,
                                              "timestampInSeconds": Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["timestamp"])(eventTimestamp, clip.created_at, clip.length),
                                              "event": tEvent,
                                              "vod": clip
                                            });
                                          }
                                        }
                                      }

                                    case 4:
                                    case "end":
                                      return _context9.stop();
                                  }
                                }
                              }, _callee9);
                            }));

                            return function (_x9) {
                              return _ref7.apply(this, arguments);
                            };
                          }());
                        }

                        BLACKLISTED[tEvent.killer.name] = tEvent.killer.name;

                      case 14:
                        _context11.next = 17;
                        break;

                      case 16:
                        BLACKLISTED[tEvent.killer.name] = tEvent.killer.name;

                      case 17:
                        if (!tEvent.victim) {
                          _context11.next = 32;
                          break;
                        }

                        if (BLACKLISTED[tEvent.victim.name]) {
                          _context11.next = 32;
                          break;
                        }

                        _context11.next = 21;
                        return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getTwitchUser"])(tEvent.victim.name).then(function (response) {
                          if (response.ok) {
                            return response.json().then(function (json) {
                              return json;
                            });
                          } else {
                            return false;
                          }
                        });

                      case 21:
                        _twitchUser = _context11.sent;

                        if (!_twitchUser) {
                          _context11.next = 31;
                          break;
                        }

                        if (!(_twitchUser.data.length > 0)) {
                          _context11.next = 28;
                          break;
                        }

                        _context11.next = 26;
                        return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getVideos"])(_twitchUser.data[0].id);

                      case 26:
                        _videos = _context11.sent;

                        if (_videos.data.length > 0) {
                          _videos.data.map( /*#__PURE__*/function () {
                            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(vid) {
                              var clip;
                              return regeneratorRuntime.wrap(function _callee10$(_context10) {
                                while (1) {
                                  switch (_context10.prev = _context10.next) {
                                    case 0:
                                      _context10.next = 2;
                                      return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getPubgVideos"])(vid.id).then(function (response) {
                                        if (response.ok) {
                                          return response.json();
                                        } else {
                                          return false;
                                        }
                                      });

                                    case 2:
                                      clip = _context10.sent;

                                      if (clip) {
                                        // debugger
                                        if (clip.game === "PLAYERUNKNOWN'S BATTLEGROUNDS") {
                                          // debugger
                                          if (Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["timeGreaterThan"])(eventTimestamp, clip.created_at) && Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["timeGreaterThan2"])(eventTimestamp, clip.created_at, clip.length)) {
                                            // debugger
                                            clips.push({
                                              "url": clip.url,
                                              "timestampInSeconds": Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["timestamp"])(eventTimestamp, clip.created_at, clip.length),
                                              "event": tEvent,
                                              "vod": clip
                                            });
                                          }
                                        }
                                      }

                                    case 4:
                                    case "end":
                                      return _context10.stop();
                                  }
                                }
                              }, _callee10);
                            }));

                            return function (_x10) {
                              return _ref8.apply(this, arguments);
                            };
                          }());
                        }

                      case 28:
                        BLACKLISTED[tEvent.victim.name] = tEvent.victim.name;
                        _context11.next = 32;
                        break;

                      case 31:
                        BLACKLISTED[tEvent.victim.name] = tEvent.victim.name;

                      case 32:
                      case "end":
                        return _context11.stop();
                    }
                  }
                }, _loop);
              });

              _iterator2.s();

            case 44:
              if ((_step2 = _iterator2.n()).done) {
                _context12.next = 48;
                break;
              }

              return _context12.delegateYield(_loop(), "t0", 46);

            case 46:
              _context12.next = 44;
              break;

            case 48:
              _context12.next = 53;
              break;

            case 50:
              _context12.prev = 50;
              _context12.t1 = _context12["catch"](41);

              _iterator2.e(_context12.t1);

            case 53:
              _context12.prev = 53;

              _iterator2.f();

              return _context12.finish(53);

            case 56:
              _context12.next = 58;
              return Promise.allSettled(clips);

            case 58:
              final = _context12.sent;

              // console.log(final);
              if (final.length === 0) {
                fetchingVideos.style.display = "none";
                logo.style.display = "none";
                Object(_scripts_no_videos_found__WEBPACK_IMPORTED_MODULE_3__["noVideosFound"])(gamertag);
              } else {
                logo.style.display = "none";
                fetchingVideos.style.display = "none";
                Object(_scripts_no_videos_found__WEBPACK_IMPORTED_MODULE_3__["videosFound"])(gamertag, final);
              }

            case 60:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee11, null, [[41, 50, 53, 56]]);
    }));
    return _getPlayer.apply(this, arguments);
  }
});

/***/ }),

/***/ "./src/scripts/date_converter.js":
/*!***************************************!*\
  !*** ./src/scripts/date_converter.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var dateConverter = function dateConverter(uglyDate) {
  var fakeHalf = uglyDate.split("T");
  var realHalf = fakeHalf[0].split("-");
  var realDate = MONTHS[realHalf[1]] + ", " + realHalf[2] + " " + realHalf[0];
  return realDate;
};

var MONTHS = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December"
};
/* harmony default export */ __webpack_exports__["default"] = (dateConverter);

/***/ }),

/***/ "./src/scripts/no_videos_found.js":
/*!****************************************!*\
  !*** ./src/scripts/no_videos_found.js ***!
  \****************************************/
/*! exports provided: noVideosFound, videosFound */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noVideosFound", function() { return noVideosFound; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "videosFound", function() { return videosFound; });
var noVideosFound = function noVideosFound(gamertag) {
  var splash = document.getElementsByClassName("splash-content")[0];
  splash.style.display = "none";
  var logo = document.getElementsByClassName("logo")[0];
  logo.style.display = "none";
  var parent = document.createElement("section");
  var button = document.createElement("span");
  button.innerHTML = '&larr;';
  button.classList.add("back");
  parent.appendChild(button);
  var container = document.createElement("section");
  parent.classList.add("parent-container");
  var player = document.createElement("div");
  player.innerHTML = "<h2>".concat(gamertag, "</h2>");
  container.appendChild(player);
  var message = document.createElement("div");
  message.innerHTML = '<p>No videos found for this user</p>';
  container.appendChild(message);
  parent.appendChild(container);
  document.body.appendChild(parent);

  button.onclick = function () {
    window.location = '/';
  };
};
var videosFound = function videosFound(gamertag, clips) {
  var splash = document.getElementsByClassName("splash-content")[0];
  splash.style.display = "none";
  var logo = document.getElementsByClassName("logo")[0];
  var parent = document.createElement("section");
  var button = document.createElement("span");
  button.innerHTML = '&larr;';
  button.classList.add("back");
  parent.appendChild(button);
  var container = document.createElement("section");
  parent.classList.add("parent-container");
  var player = document.createElement("div");
  player.innerHTML = "<h2>".concat(gamertag, "</h2>");
  container.appendChild(player);
  var listOfVids = document.createElement("ul");
  listOfVids.classList.add("list-of-vids");

  for (var i = 0; i < clips.length; i++) {
    var ul = document.createElement("ul");
    ul.innerHTML = "<h3>".concat(clips[i].value.event.killer.name, "</h3><span>killing ").concat(clips[i].value.event.victim.name, "</span>");
    ul.classList.add("".concat(clips[i].value.event.killer.name === gamertag ? "g" : "r"), "videoBox");
    var modal = document.createElement("section");
    modal.classList.add("modal"); // const ifrm = document.createElement("iframe");
    // ifrm.setAttribute("src", `https://player.twitch.tv/?video=${ clips[i].value.vod._id }&autoplay=false&parent=localhost&time=${ clips[i].value.timestampInSeconds }`);
    // ifrm.setAttribute("height", "540");
    // ifrm.setAttribute("width", "970");
    // ifrm.setAttribute("frameborder", "0");
    // ifrm.setAttribute("scrolling", "no");
    // ifrm.setAttribute("allowfullscreen", "true");
    // ifrm.classList.add("frame");
    // modal.appendChild(ifrm);

    var div = document.createElement("div");
    div.setAttribute("id", "".concat(i));
    div.classList.add("vframe2");
    modal.appendChild(div);
    ul.appendChild(modal);
    listOfVids.appendChild(ul);
  }

  var btn = document.createElement("span");
  btn.innerHTML = '&#10006;';
  btn.classList.add("close");
  container.appendChild(listOfVids);
  parent.appendChild(container);
  parent.appendChild(btn);
  document.body.appendChild(parent);
  var names = [];

  for (var j = 0; j < clips.length; j++) {
    names.push("player" + j);
  }

  var _loop = function _loop(_i) {
    options = {
      width: 970,
      height: 540,
      autoplay: false,
      time: "".concat(clips[_i].value.timestampInSeconds),
      video: "".concat(clips[_i].value.vod._id)
    };
    names[_i] = new Twitch.Player("".concat(_i), options);

    names[_i].setVolume(0.5);

    document.querySelectorAll(".close").forEach(function (b) {
      b.addEventListener('click', function () {
        names[_i].pause();
      });
    });
  };

  for (var _i = 0; _i < clips.length; _i++) {
    var options;

    _loop(_i);
  }

  document.querySelectorAll('.videoBox').forEach(function (item) {
    var frm = item.querySelector('.modal');
    var btn = document.querySelector('.close');
    item.addEventListener('click', function (e) {
      frm.style.display = "flex";
      btn.style.display = "block";
    });
  });
  document.querySelectorAll('.close').forEach(function (x) {
    x.addEventListener('click', function (e) {
      document.querySelectorAll('.modal').forEach(function (frm) {
        frm.style.display = "none";
        x.style.display = "none";
      });
    });
  });

  button.onclick = function () {
    window.location = '/';
  };
};

/***/ }),

/***/ "./src/scripts/search_utilities.js":
/*!*****************************************!*\
  !*** ./src/scripts/search_utilities.js ***!
  \*****************************************/
/*! exports provided: getPlayerByName, getMatch, getTelemetry, getOAuth, getTwitchUser, getVideos, getPubgVideos, timeGreaterThan, timeGreaterThan2, timestamp, timestamp2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPlayerByName", function() { return getPlayerByName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMatch", function() { return getMatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTelemetry", function() { return getTelemetry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOAuth", function() { return getOAuth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTwitchUser", function() { return getTwitchUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVideos", function() { return getVideos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPubgVideos", function() { return getPubgVideos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timeGreaterThan", function() { return timeGreaterThan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timeGreaterThan2", function() { return timeGreaterThan2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timestamp", function() { return timestamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timestamp2", function() { return timestamp2; });
/* harmony import */ var _config_keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/keys */ "./src/config/keys.js");
/* harmony import */ var _config_keys__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_config_keys__WEBPACK_IMPORTED_MODULE_0__);

var getPlayerByName = function getPlayerByName(gamertag) {
  var playerByNameInit = {
    method: 'get',
    headers: {
      Authorization: "Bearer ".concat(_config_keys__WEBPACK_IMPORTED_MODULE_0___default.a.pubgAPI),
      Accept: 'application/vnd.api+json'
    }
  };
  console.log(process.env);
  console.log("development");
  console.log(_config_keys__WEBPACK_IMPORTED_MODULE_0___default.a.pubgAPI);
  var request = new Request("https://api.pubg.com/shards/xbox/players?filter[playerNames]=".concat(gamertag), playerByNameInit);
  return fetch(request).then(function (response) {
    if (response.ok) {
      // debugger
      return response.json().then(function (json) {
        return json.data[0].relationships.matches.data;
      });
    }
  });
};
window.Key = _config_keys__WEBPACK_IMPORTED_MODULE_0___default.a;
var getMatch = function getMatch(matchId) {
  var gameInit = {
    method: 'get'
  }; // let request = new Request(`https://api.pubg.com/shards/xbox/matches/${ matchId }`, gameInit);

  var request = new Request("/pubg/gamertag/".concat(matchId), gameInit);
  return fetch(request).then(function (response) {
    return response.json();
  });
}; // window.getMatch = getMatch;
//

var getTelemetry = function getTelemetry(url) {
  var telemetryInit = {
    method: 'get',
    headers: {
      Accept: 'application/vnd.api+json'
    }
  };
  var request = new Request(url, telemetryInit);
  return fetch(request).then(function (response) {
    if (response.ok) {
      return response.json().then(function (json) {
        return json;
      });
    }
  });
}; // window.getTelemetry = getTelemetry;

var getOAuth = function getOAuth() {
  var oauthInit = {
    method: 'post' // scope: 'user:read:email'

  };
  var request = new Request("https://id.twitch.tv/oauth2/token?client_id=".concat(_config_keys__WEBPACK_IMPORTED_MODULE_0___default.a.twitchAPI, "&client_secret=").concat(_config_keys__WEBPACK_IMPORTED_MODULE_0___default.a.clientSECRET, "&grant_type=client_credentials"), oauthInit);
  return fetch(request).then(function (response) {
    if (response.ok) {
      return response.json();
    }
  });
};
var getTwitchUser = function getTwitchUser(gamertag) {
  var twitchUserInit = {
    method: 'get',
    headers: {
      'Authorization': "Bearer ".concat(_config_keys__WEBPACK_IMPORTED_MODULE_0___default.a.oAUTH),
      'Client-Id': "".concat(_config_keys__WEBPACK_IMPORTED_MODULE_0___default.a.twitchAPI)
    }
  };
  var request = new Request("https://api.twitch.tv/helix/users?login=".concat(gamertag), twitchUserInit);
  return fetch(request);
}; // window.getTwitchUser = getTwitchUser;

var getVideos = function getVideos(userId) {
  var twitchVideosInit = {
    method: 'get',
    headers: {
      'Authorization': "Bearer ".concat(_config_keys__WEBPACK_IMPORTED_MODULE_0___default.a.oAUTH),
      'Client-Id': "".concat(_config_keys__WEBPACK_IMPORTED_MODULE_0___default.a.twitchAPI)
    }
  };
  var request = new Request("https://api.twitch.tv/helix/videos?user_id=".concat(userId), twitchVideosInit);
  return fetch(request).then(function (response) {
    if (response.ok) {
      return response.json();
    }
  });
}; // window.getVideos = getVideos;

var getPubgVideos = function getPubgVideos(videoId) {
  var twitchPubgInit = {
    method: 'get',
    headers: {
      "Accept": "application/vnd.twitchtv.v5+json",
      'Client-Id': "".concat(_config_keys__WEBPACK_IMPORTED_MODULE_0___default.a.twitchAPI)
    }
  };
  var request = new Request("https://api.twitch.tv/kraken/videos/".concat(videoId), twitchPubgInit);
  return fetch(request);
};
var timeGreaterThan = function timeGreaterThan(t1, t2) {
  // debugger
  var t3 = new Date(t1);
  var t4 = new Date(t2);

  if (t3 >= t4) {
    return true;
  } else {
    return false;
  }
};
var timeGreaterThan2 = function timeGreaterThan2(t1, t2, seconds) {
  // debugger
  var t3 = new Date(t1);
  var t4 = new Date(t2);
  t4.setHours(t4.getHours(), t4.getMinutes(), t4.getSeconds() + seconds);

  if (t3 <= t4) {
    return true;
  } else {
    return false;
  } // let hours = t4.getHours();
  // let minutes = t4.getMinutes();
  // let secs = t4.getSeconds();
  // if(seconds + sec < 60) {
  //     t4.setHours(hours, minutes, seconds + secs)
  // } else if(seconds + sec === 60) {
  //     t4.setHours(hours, minutes + 1, 0)
  // } else if(seconds + sec > 60) {
  //     let newSecs = (seconds + sec) % 60;
  //     let newMinutes = ((seconds + sec) - newSecs) / 60;
  //     let min;
  //     let hours;
  //     if(newMinutes > 60) {
  //         min = newMinutes % 60;
  //         hours = (newMinutes - min) / 60;
  //     }
  // }

};
var timestamp = function timestamp(t1, t2, seconds) {
  // debugger
  var t3 = new Date(t1);
  var t4 = new Date(t2);
  t4.setHours(t4.getHours(), t4.getMinutes(), t4.getSeconds() + seconds);
  var secs = (t4 - t3) / 1000; // let nT = t4.setHours(t4.getHours(), t4.getMinutes(), t4.getSeconds() - secs);
  // let eventTimestamp = nT - (new Date(t2));

  var t = new Date(null);
  t.setSeconds(seconds - secs - 10);
  var a = t.toISOString().substr(11, 8).split(":");
  return a[0] + "h" + a[1] + "m" + a[2] + "s";
};
var timestamp2 = function timestamp2(t1, t2, seconds) {
  var t3 = new Date(t1);
  var t4 = new Date(t2);
  t4.setHours(t4.getHours(), t4.getMinutes(), t4.getSeconds() + seconds);
  var secs = (t4 - t3) / 1000;
  var nT = t4.setHours(t4.getHours(), t4.getMinutes(), t4.getSeconds() - secs);
  return (nT - new Date(t2)) / 1000 - 10;
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./src/scripts/streams.js":
/*!********************************!*\
  !*** ./src/scripts/streams.js ***!
  \********************************/
/*! exports provided: displayStreams */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "displayStreams", function() { return displayStreams; });
/* harmony import */ var _date_converter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./date_converter */ "./src/scripts/date_converter.js");
/* harmony import */ var _search_utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search_utilities */ "./src/scripts/search_utilities.js");


var displayStreams = function displayStreams(events, videos, gtag) {
  var splash = document.getElementsByClassName("splash-content")[0];
  splash.style.display = "none";
  var logo = document.getElementsByClassName("logo")[0];
  logo.style.display = "none";
  var fp = document.getElementsByClassName("load")[0];
  fp.style.display = "none";
  var clips = [];
  var videoHasEvents = {}; // debugger

  for (var j = 0; j < videos.length; j++) {
    for (var i = 0; i < events.length; i++) {
      if (Object(_search_utilities__WEBPACK_IMPORTED_MODULE_1__["timeGreaterThan"])(events[i]._D, videos[j].created_at) && Object(_search_utilities__WEBPACK_IMPORTED_MODULE_1__["timeGreaterThan2"])(events[i]._D, videos[j].created_at, videos[j].length)) {
        videoHasEvents[videos[j]._id] = true;
        clips.push({
          "video_id": videos[j]._id,
          "url": videos[j].url,
          "seek": Object(_search_utilities__WEBPACK_IMPORTED_MODULE_1__["timestamp2"])(events[i]._D, videos[j].created_at, videos[j].length),
          "timestampInSeconds": Object(_search_utilities__WEBPACK_IMPORTED_MODULE_1__["timestamp"])(events[i]._D, videos[j].created_at, videos[j].length),
          "event": events[i],
          "vod": videos[j]
        });
      }
    }
  }

  var parent = document.createElement("section");
  var button = document.createElement("span");
  button.innerHTML = '&larr;';
  button.classList.add("back");
  parent.appendChild(button);
  var container = document.createElement("section");
  parent.classList.add("parent-container");
  var plyr = document.createElement("div");
  plyr.innerHTML = "<h2>".concat(gtag, "</h2>");
  container.appendChild(plyr);
  var listOfVids = document.createElement("ul");
  listOfVids.classList.add("list-of-vids");

  for (var _i = 0; _i < videos.length; _i++) {
    if (videoHasEvents[videos[_i]._id]) {
      var ul = document.createElement("ul");
      ul.innerHTML = "<h3>".concat(videos[_i].title, "</h3><span>").concat(Object(_date_converter__WEBPACK_IMPORTED_MODULE_0__["default"])(videos[_i].created_at), "</span>");
      ul.classList.add("streamsBox");
      var modal = document.createElement("section");
      modal.classList.add("modal2");
      var modal_content = document.createElement("div");
      modal_content.classList.add("modal-content");

      for (var _j = 0; _j < clips.length; _j++) {
        if (clips[_j].video_id === videos[_i]._id) {
          var li = document.createElement("li"); // debugger

          li.innerHTML = "Killer:".concat(clips[_j].event.killer ? clips[_j].event.killer.name : "Environment", " Victim:").concat(clips[_j].event.victim.name);
          li.classList.add("".concat(clips[_j].event.killer ? clips[_j].event.killer.name === gtag ? "gr" : "re" : "re"), "nostylist");
          li.setAttribute("id", "".concat(clips[_j].seek));
          modal_content.appendChild(li);
        }
      }

      modal.appendChild(modal_content);
      var div = document.createElement("div");
      div.setAttribute("id", "".concat(_i));
      div.classList.add("vframe");
      modal.appendChild(div);
      ul.appendChild(modal);
      listOfVids.appendChild(ul);
    }
  }

  var btn = document.createElement("span");
  btn.innerHTML = '&#10006;';
  btn.classList.add("close2");
  container.appendChild(listOfVids);
  parent.appendChild(container);
  parent.appendChild(btn);
  document.body.appendChild(parent);
  var names = [];

  for (var _j2 = 0; _j2 < videos.length; _j2++) {
    names.push("player" + _j2);
  }

  var _loop = function _loop(_i2) {
    if (videoHasEvents[videos[_i2]._id]) {
      options = {
        width: 970,
        height: 540,
        autoplay: false,
        video: "".concat(videos[_i2]._id)
      };
      names[_i2] = new Twitch.Player("".concat(_i2), options);

      names[_i2].setVolume(0.5);

      document.querySelectorAll('.nostylist').forEach(function (event) {
        event.addEventListener('click', function () {
          names[_i2].seek(Number(event.id));
        });
      });
      document.querySelectorAll(".close2").forEach(function (b) {
        b.addEventListener('click', function () {
          names[_i2].pause();
        });
      });
    }
  };

  for (var _i2 = 0; _i2 < videos.length; _i2++) {
    var options;

    _loop(_i2);
  }

  document.querySelectorAll('.streamsBox').forEach(function (item) {
    var frm = item.querySelector('.modal2');
    var btn = document.querySelector('.close2');
    item.addEventListener('click', function (e) {
      frm.style.display = "flex";
      btn.style.display = "block";
    });
  });
  document.querySelectorAll('.close2').forEach(function (x) {
    x.addEventListener('click', function (e) {
      document.querySelectorAll('.modal2').forEach(function (frm) {
        frm.style.display = "none";
        x.style.display = "none";
      });
    });
  });

  button.onclick = function () {
    window.location = '/';
  };
};

/***/ }),

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9jb25maWcva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL2tleXNfZGV2LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9kYXRlX2NvbnZlcnRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9ub192aWRlb3NfZm91bmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvc2VhcmNoX3V0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9zdHJlYW1zLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvaW5kZXguc2NzcyJdLCJuYW1lcyI6WyJwcm9jZXNzIiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcXVpcmUiLCJwdWJnQVBJIiwidHdpdGNoQVBJIiwiY2xpZW50U0VDUkVUIiwib0FVVEgiLCJnYW1lSUQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJCTEFDS0xJU1RFRCIsImtBViIsImFjdHVhbCIsInN0cmVhbXMiLCJjb250YWluZXIiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwicXVlcnlTZWxlY3RvciIsImdldFBsYXllciIsImlucHV0IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsInN0eWxlIiwiZGlzcGxheSIsInVuIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJndCIsInN1Ym1pdCIsImlubmVySFRNTCIsImdldEVsZW1lbnRCeUlkIiwiZSIsImdldElucHV0IiwiZ2V0U3RyZWFtcyIsInVuYW1lIiwiZ3RhZyIsImdldFBsYXllckJ5TmFtZSIsIm1hdGNoZXMiLCJjb25zb2xlIiwibG9nIiwibWFwIiwibWF0Y2giLCJnZXRNYXRjaCIsImlkIiwiUHJvbWlzZSIsImFsbFNldHRsZWQiLCJnYW1lcyIsImZvckVhY2giLCJ2YWx1ZSIsImluY2x1ZGVkIiwiZWxlIiwiZGF0YSIsInJlbGF0aW9uc2hpcHMiLCJhc3NldHMiLCJldmVudHMiLCJwdXNoIiwiZ2V0VGVsZW1ldHJ5IiwiYXR0cmlidXRlcyIsIlVSTCIsInRlbGVtZXRyeSIsImV2ZW50IiwiX1QiLCJraWxsZXIiLCJuYW1lIiwidmljdGltIiwiZ2V0VHdpdGNoVXNlciIsInRoZW4iLCJyZXNwb25zZSIsIm9rIiwianNvbiIsInR3aXRjaFVzZXIiLCJsZW5ndGgiLCJnZXRWaWRlb3MiLCJ2aWRlb3MiLCJjbGlwcyIsInZpZCIsImdldFB1YmdWaWRlb3MiLCJhbGwiLCJjIiwiZmlsdGVyIiwiZ2FtZSIsImZwIiwiYWxsVmlkcyIsImRpc3BsYXlTdHJlYW1zIiwiYWN0dWFsTWF0Y2hlcyIsInRlbGVtZXRyeUV2ZW50cyIsImdhbWVydGFnIiwic3BsYXNoIiwibG9nbyIsImZldGNoaW5nUGxheWVyIiwiZmV0Y2hpbmdNYXRjaGVzIiwiZmV0Y2hpbmdFdmVudHMiLCJmZXRjaGluZ0tpbGxzQW5kRGVhdGhzIiwiZmV0Y2hpbmdWaWRlb3MiLCJ0RXZlbnQiLCJldmVudFRpbWVzdGFtcCIsIl9EIiwiY2xpcCIsInRpbWVHcmVhdGVyVGhhbiIsImNyZWF0ZWRfYXQiLCJ0aW1lR3JlYXRlclRoYW4yIiwidXJsIiwidGltZXN0YW1wIiwiZmluYWwiLCJub1ZpZGVvc0ZvdW5kIiwidmlkZW9zRm91bmQiLCJkYXRlQ29udmVydGVyIiwidWdseURhdGUiLCJmYWtlSGFsZiIsInNwbGl0IiwicmVhbEhhbGYiLCJyZWFsRGF0ZSIsIk1PTlRIUyIsInBhcmVudCIsImJ1dHRvbiIsInBsYXllciIsIm1lc3NhZ2UiLCJib2R5Iiwib25jbGljayIsIndpbmRvdyIsImxvY2F0aW9uIiwibGlzdE9mVmlkcyIsImkiLCJ1bCIsIm1vZGFsIiwiZGl2IiwiYnRuIiwibmFtZXMiLCJqIiwib3B0aW9ucyIsIndpZHRoIiwiaGVpZ2h0IiwiYXV0b3BsYXkiLCJ0aW1lIiwidGltZXN0YW1wSW5TZWNvbmRzIiwidmlkZW8iLCJ2b2QiLCJfaWQiLCJUd2l0Y2giLCJQbGF5ZXIiLCJzZXRWb2x1bWUiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYiIsInBhdXNlIiwiaXRlbSIsImZybSIsIngiLCJwbGF5ZXJCeU5hbWVJbml0IiwibWV0aG9kIiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJLZXkiLCJBY2NlcHQiLCJlbnYiLCJyZXF1ZXN0IiwiUmVxdWVzdCIsImZldGNoIiwibWF0Y2hJZCIsImdhbWVJbml0IiwidGVsZW1ldHJ5SW5pdCIsImdldE9BdXRoIiwib2F1dGhJbml0IiwidHdpdGNoVXNlckluaXQiLCJ1c2VySWQiLCJ0d2l0Y2hWaWRlb3NJbml0IiwidmlkZW9JZCIsInR3aXRjaFB1YmdJbml0IiwidDEiLCJ0MiIsInQzIiwiRGF0ZSIsInQ0Iiwic2Vjb25kcyIsInNldEhvdXJzIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZ2V0U2Vjb25kcyIsInNlY3MiLCJ0Iiwic2V0U2Vjb25kcyIsImEiLCJ0b0lTT1N0cmluZyIsInN1YnN0ciIsInRpbWVzdGFtcDIiLCJuVCIsInZpZGVvSGFzRXZlbnRzIiwicGx5ciIsInRpdGxlIiwibW9kYWxfY29udGVudCIsInZpZGVvX2lkIiwibGkiLCJzZWVrIiwiTnVtYmVyIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtC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Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkdBQTZHO0FBQzdHOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVc7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsd0NBQXdDO0FBQ3hDLDJCQUEyQjtBQUMzQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FB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QUFDaENrSCxTQUFHLENBQUMzSCxLQUFKLENBQVVDLE9BQVYsR0FBb0IsTUFBcEI7QUFDQXVHLFNBQUcsQ0FBQ3hHLEtBQUosQ0FBVUMsT0FBVixHQUFvQixPQUFwQjtBQUNILEtBSEQ7QUFJSCxHQVBEO0FBU0FmLFVBQVEsQ0FBQ3FJLGdCQUFULENBQTBCLFNBQTFCLEVBQXFDOUYsT0FBckMsQ0FBNkMsVUFBQW1HLENBQUMsRUFBSTtBQUM5Q0EsS0FBQyxDQUFDekksZ0JBQUYsQ0FBbUIsT0FBbkIsRUFBNEIsVUFBQXNCLENBQUMsRUFBSTtBQUM3QnZCLGNBQVEsQ0FBQ3FJLGdCQUFULENBQTBCLFNBQTFCLEVBQXFDOUYsT0FBckMsQ0FBNkMsVUFBQWtHLEdBQUcsRUFBSTtBQUNoREEsV0FBRyxDQUFDM0gsS0FBSixDQUFVQyxPQUFWLEdBQW9CLE1BQXBCO0FBQ0EySCxTQUFDLENBQUM1SCxLQUFGLENBQVFDLE9BQVIsR0FBa0IsTUFBbEI7QUFDSCxPQUhEO0FBSUgsS0FMRDtBQU1ILEdBUEQ7O0FBU0EyRixRQUFNLENBQUNJLE9BQVAsR0FBaUIsWUFBVztBQUN4QkMsVUFBTSxDQUFDQyxRQUFQLEdBQWtCLEdBQWxCO0FBQ0gsR0FGRDtBQUdILENBM0hNLEM7Ozs7Ozs7Ozs7OztBQ0hQO0FBQUEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307IC8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0KCkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuXG4oZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICB9XG5cbiAgdHJ5IHtcbiAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gIH1cbn0pKCk7XG5cbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgfSAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuXG5cbiAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0cnkge1xuICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gIH0gLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuXG5cbiAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRyeSB7XG4gICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgIH1cbiAgfVxufVxuXG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZHJhaW5pbmcgPSBmYWxzZTtcblxuICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gIH0gZWxzZSB7XG4gICAgcXVldWVJbmRleCA9IC0xO1xuICB9XG5cbiAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgIGRyYWluUXVldWUoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICBpZiAoZHJhaW5pbmcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgZHJhaW5pbmcgPSB0cnVlO1xuICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuXG4gIHdoaWxlIChsZW4pIHtcbiAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICBxdWV1ZSA9IFtdO1xuXG4gICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcXVldWVJbmRleCA9IC0xO1xuICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgfVxuXG4gIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gIGRyYWluaW5nID0gZmFsc2U7XG4gIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gIH1cblxuICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuXG4gIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgfVxufTsgLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuXG5cbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICB0aGlzLmZ1biA9IGZ1bjtcbiAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuXG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcblxucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcblxucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBbXTtcbn07XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gJy8nO1xufTtcblxucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAwO1xufTsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG52YXIgcnVudGltZSA9IGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqW2tleV07XG4gIH1cblxuICB0cnkge1xuICAgIC8vIElFIDggaGFzIGEgYnJva2VuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB0aGF0IG9ubHkgd29ya3Mgb24gRE9NIG9iamVjdHMuXG4gICAgZGVmaW5lKHt9LCBcIlwiKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZGVmaW5lID0gZnVuY3Rpb24gKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldID0gdmFsdWU7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pOyAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cblxuICBleHBvcnRzLndyYXAgPSB3cmFwOyAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwibm9ybWFsXCIsXG4gICAgICAgIGFyZzogZm4uY2FsbChvYmosIGFyZylcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcInRocm93XCIsXG4gICAgICAgIGFyZzogZXJyXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjsgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTsgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge30gLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuXG5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbiAgSXRlcmF0b3JQcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuXG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJiBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiYgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPSBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb247XG4gIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gZGVmaW5lKEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKTsgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cblxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZCkge1xuICAgICAgZGVmaW5lKHByb3RvdHlwZSwgbWV0aG9kLCBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbiAoZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHwgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCIgOiBmYWxzZTtcbiAgfTtcblxuICBleHBvcnRzLm1hcmsgPSBmdW5jdGlvbiAoZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBkZWZpbmUoZ2VuRnVuLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKTtcbiAgICB9XG5cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTsgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cblxuXG4gIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbiAoYXJnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIF9fYXdhaXQ6IGFyZ1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IsIFByb21pc2VJbXBsKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuXG4gICAgICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uICh1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2VJbXBsKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID0gLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLCAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcpIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9IC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG5cblxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuXG4gIEFzeW5jSXRlcmF0b3IucHJvdG90eXBlW2FzeW5jSXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7IC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbiAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QsIFByb21pc2VJbXBsKSB7XG4gICAgaWYgKFByb21pc2VJbXBsID09PSB2b2lkIDApIFByb21pc2VJbXBsID0gUHJvbWlzZTtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLCBQcm9taXNlSW1wbCk7XG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKSA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH0gLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuXG5cbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcblxuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmUgPyBHZW5TdGF0ZUNvbXBsZXRlZCA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDsgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9IC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cblxuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuXG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgLy8gTm90ZTogW1wicmV0dXJuXCJdIG11c3QgYmUgdXNlZCBmb3IgRVMzIHBhcnNpbmcgY29tcGF0aWJpbGl0eS5cbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTsgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jOyAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfSAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG5cblxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9IC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cblxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG4gIGRlZmluZShHcCwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yXCIpOyAvLyBBIEdlbmVyYXRvciBzaG91bGQgYWx3YXlzIHJldHVybiBpdHNlbGYgYXMgdGhlIGl0ZXJhdG9yIG9iamVjdCB3aGVuIHRoZVxuICAvLyBAQGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBpdC4gU29tZSBicm93c2VycycgaW1wbGVtZW50YXRpb25zIG9mIHRoZVxuICAvLyBpdGVyYXRvciBwcm90b3R5cGUgY2hhaW4gaW5jb3JyZWN0bHkgaW1wbGVtZW50IHRoaXMsIGNhdXNpbmcgdGhlIEdlbmVyYXRvclxuICAvLyBvYmplY3QgdG8gbm90IGJlIHJldHVybmVkIGZyb20gdGhpcyBjYWxsLiBUaGlzIGVuc3VyZXMgdGhhdCBkb2Vzbid0IGhhcHBlbi5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9pc3N1ZXMvMjc0IGZvciBtb3JlIGRldGFpbHMuXG5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEdwLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0ge1xuICAgICAgdHJ5TG9jOiBsb2NzWzBdXG4gICAgfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbe1xuICAgICAgdHJ5TG9jOiBcInJvb3RcIlxuICAgIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgZXhwb3J0cy5rZXlzID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG5cbiAgICBrZXlzLnJldmVyc2UoKTsgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG5cbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9IC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuXG5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuXG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLFxuICAgICAgICAgICAgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfSAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG5cblxuICAgIHJldHVybiB7XG4gICAgICBuZXh0OiBkb25lUmVzdWx0XG4gICAgfTtcbiAgfVxuXG4gIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgICBkb25lOiB0cnVlXG4gICAgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuICAgIHJlc2V0OiBmdW5jdGlvbiAoc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7IC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBzdG9wOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbiAoZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuXG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISFjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uICh0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiYgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmICh0eXBlID09PSBcImJyZWFrXCIgfHwgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJiBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJiBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcbiAgICBjb21wbGV0ZTogZnVuY3Rpb24gKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8IHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuICAgIGZpbmlzaDogZnVuY3Rpb24gKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuXG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24gKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9IC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuXG5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uIChpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9OyAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cblxuICByZXR1cm4gZXhwb3J0cztcbn0oIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4vLyBhcyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIG5hbWVzcGFjZS4gT3RoZXJ3aXNlIGNyZWF0ZSBhIG5ldyBlbXB0eVxuLy8gb2JqZWN0LiBFaXRoZXIgd2F5LCB0aGUgcmVzdWx0aW5nIG9iamVjdCB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbnR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgPyBtb2R1bGUuZXhwb3J0cyA6IHt9KTtcblxudHJ5IHtcbiAgcmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbn0gY2F0Y2ggKGFjY2lkZW50YWxTdHJpY3RNb2RlKSB7XG4gIC8vIFRoaXMgbW9kdWxlIHNob3VsZCBub3QgYmUgcnVubmluZyBpbiBzdHJpY3QgbW9kZSwgc28gdGhlIGFib3ZlXG4gIC8vIGFzc2lnbm1lbnQgc2hvdWxkIGFsd2F5cyB3b3JrIHVubGVzcyBzb21ldGhpbmcgaXMgbWlzY29uZmlndXJlZC4gSnVzdFxuICAvLyBpbiBjYXNlIHJ1bnRpbWUuanMgYWNjaWRlbnRhbGx5IHJ1bnMgaW4gc3RyaWN0IG1vZGUsIHdlIGNhbiBlc2NhcGVcbiAgLy8gc3RyaWN0IG1vZGUgdXNpbmcgYSBnbG9iYWwgRnVuY3Rpb24gY2FsbC4gVGhpcyBjb3VsZCBjb25jZWl2YWJseSBmYWlsXG4gIC8vIGlmIGEgQ29udGVudCBTZWN1cml0eSBQb2xpY3kgZm9yYmlkcyB1c2luZyBGdW5jdGlvbiwgYnV0IGluIHRoYXQgY2FzZVxuICAvLyB0aGUgcHJvcGVyIHNvbHV0aW9uIGlzIHRvIGZpeCB0aGUgYWNjaWRlbnRhbCBzdHJpY3QgbW9kZSBwcm9ibGVtLiBJZlxuICAvLyB5b3UndmUgbWlzY29uZmlndXJlZCB5b3VyIGJ1bmRsZXIgdG8gZm9yY2Ugc3RyaWN0IG1vZGUgYW5kIGFwcGxpZWQgYVxuICAvLyBDU1AgdG8gZm9yYmlkIEZ1bmN0aW9uLCBhbmQgeW91J3JlIG5vdCB3aWxsaW5nIHRvIGZpeCBlaXRoZXIgb2YgdGhvc2VcbiAgLy8gcHJvYmxlbXMsIHBsZWFzZSBkZXRhaWwgeW91ciB1bmlxdWUgcHJlZGljYW1lbnQgaW4gYSBHaXRIdWIgaXNzdWUuXG4gIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG59IiwiaWYocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiKSB7XHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL2tleXNfcHJvZFwiKVxyXG59IGVsc2Uge1xyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9rZXlzX2RldlwiKVxyXG59IiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBwdWJnQVBJOiAnZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnFkR2tpT2lJMU5tTTFZMk01TUMxbFltWm1MVEF4TXpndE1XUXhPQzAwWW1NeU5qVm1NekV5WWpFaUxDSnBjM01pT2lKbllXMWxiRzlqYTJWeUlpd2lhV0YwSWpveE5qQXlNakE0TURZd0xDSndkV0lpT2lKaWJIVmxhRzlzWlNJc0luUnBkR3hsSWpvaWNIVmlaeUlzSW1Gd2NDSTZJbU5zYVhCd1pXUWlmUS5ZR0JsaDNlSnFSUE9rZVNESnFUVUtHMnFBUV9xNmNleDhPQktVdXBMdFNJJyxcclxuICAgIHR3aXRjaEFQSTogJzZkZ2lhMXBtdm1ybHMzaTZsZXpncm1pYnYwMzBweicsXHJcbiAgICBjbGllbnRTRUNSRVQ6ICdiN2hnMnpnaDlsZ3M1djdpOTAxMGZrbGd3Y2lrc2snLFxyXG4gICAgb0FVVEg6ICduMHVzN215NTB4dWoyM2RnMnE4OXpqajZ4dnoyYXcnLFxyXG4gICAgZ2FtZUlEOiAnNDkzMDU3J1xyXG59IiwiaW1wb3J0ICcuLi9zcmMvc3R5bGVzL2luZGV4LnNjc3MnO1xyXG5pbXBvcnQgeyBnZXRNYXRjaCwgZ2V0UGxheWVyQnlOYW1lLCBnZXRUd2l0Y2hVc2VyLCBnZXRUZWxlbWV0cnksIGdldFZpZGVvcywgZ2V0UHViZ1ZpZGVvcywgdGltZUdyZWF0ZXJUaGFuLCB0aW1lR3JlYXRlclRoYW4yLCB0aW1lc3RhbXAgfSBmcm9tICcuL3NjcmlwdHMvc2VhcmNoX3V0aWxpdGllcyc7XHJcbmltcG9ydCBcInJlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZVwiO1xyXG5pbXBvcnQgeyBub1ZpZGVvc0ZvdW5kLCB2aWRlb3NGb3VuZCB9IGZyb20gJy4vc2NyaXB0cy9ub192aWRlb3NfZm91bmQnO1xyXG5pbXBvcnQgeyBkaXNwbGF5U3RyZWFtcyB9IGZyb20gJy4vc2NyaXB0cy9zdHJlYW1zJztcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICAgIGxldCBCTEFDS0xJU1RFRCA9IHt9O1xyXG4gICAgbGV0IGtBViA9IFtdO1xyXG4gICAgbGV0IGFjdHVhbDtcclxuICAgIGxldCBzdHJlYW1zID0gW107XHJcbiAgICAvLyBsZXQgZ2FtZXJ0YWcgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZ2FtZXJ0YWctZmllbGRcIilbMF0udmFsdWU7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZ2V0U3RyZWFtc1wiKVswXTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmEtc2VhcmNoXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBnZXRQbGF5ZXIpO1xyXG5cclxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XHJcbiAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKFwiaW5wdXQtY29udGFpbmVyXCIpO1xyXG4gICAgaW5wdXQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgY29uc3QgdW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICB1bi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dFwiKTtcclxuICAgIHVuLnNldEF0dHJpYnV0ZShcInBsYWNlaG9sZGVyXCIsIFwiVHdpdGNoIFVzZXJcIik7XHJcbiAgICB1bi5jbGFzc0xpc3QuYWRkKFwidW4tZmllbGRcIik7XHJcbiAgICBpbnB1dC5hcHBlbmRDaGlsZCh1bik7XHJcbiAgICBjb25zdCBndCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIGd0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xyXG4gICAgZ3Quc2V0QXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIiwgXCJQVUJHIFVzZXJcIik7XHJcbiAgICBndC5jbGFzc0xpc3QuYWRkKFwiZ3QtZmllbGRcIik7XHJcbiAgICBpbnB1dC5hcHBlbmRDaGlsZChndCk7XHJcbiAgICBjb25zdCBzdWJtaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgIHN1Ym1pdC5jbGFzc0xpc3QuYWRkKFwic3VibWl0LXN0cmVhbVwiKTtcclxuICAgIHN1Ym1pdC5pbm5lckhUTUwgPSBcIlNlYXJjaFwiO1xyXG4gICAgaW5wdXQuYXBwZW5kQ2hpbGQoc3VibWl0KTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChpbnB1dCk7XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnZXRTdHJlYW1zXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcclxuICAgICAgICBpZihpbnB1dC5zdHlsZS5kaXNwbGF5ID09PSBcImZsZXhcIikge1xyXG4gICAgICAgICAgICBpbnB1dC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBpbnB1dC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1Ym1pdC1zdHJlYW1cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGdldElucHV0KTtcclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRJbnB1dCgpIHtcclxuICAgICAgICBjb25zdCB1bmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ1bi1maWVsZFwiKVswXS52YWx1ZTtcclxuICAgICAgICBjb25zdCBndGFnID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImd0LWZpZWxkXCIpWzBdLnZhbHVlO1xyXG5cclxuICAgICAgICBpZih1bmFtZSAmJiBndGFnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgICAgIGZwLmNsYXNzTGlzdC5hZGQoXCJsb2FkaW5nMVwiLCBcImxvYWRcIik7XHJcbiAgICAgICAgICAgIGZwLmlubmVySFRNTCA9ICdGZXRjaGluZyBWaWRlb3MgLi4uJztcclxuICAgICAgICAgICAgaW5wdXQuYXBwZW5kQ2hpbGQoZnApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFsbFZpZHMgPSBhd2FpdCBnZXRTdHJlYW1zKHVuYW1lLCBndGFnKTtcclxuICAgICAgICBkaXNwbGF5U3RyZWFtcyhrQVYsIGFsbFZpZHMsIGd0YWcpO1xyXG5cclxuXHJcbiAgICAgICAgYXN5bmMgZnVuY3Rpb24gZ2V0U3RyZWFtcyh1bmFtZSwgZ3RhZykge1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2hlcyA9IGF3YWl0IGdldFBsYXllckJ5TmFtZShndGFnKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobWF0Y2hlcyk7XHJcbiAgICAgICAgICAgIGFjdHVhbCA9IG1hdGNoZXMubWFwKGFzeW5jIG1hdGNoID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBnZXRNYXRjaChtYXRjaC5pZClcclxuICAgICAgICAgICAgfSlcclxuICAgIFxyXG4gICAgICAgICAgICBsZXQgZ2FtZXMgPSBhd2FpdCBQcm9taXNlLmFsbFNldHRsZWQoYWN0dWFsKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZ2FtZXMpXHJcbiAgICBcclxuICAgICAgICAgICAgZ2FtZXMuZm9yRWFjaChhc3luYyBtYXRjaCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihtYXRjaC52YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYobWF0Y2gudmFsdWUuaW5jbHVkZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2gudmFsdWUuaW5jbHVkZWQuZm9yRWFjaChhc3luYyBlbGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlLmlkID09PSBtYXRjaC52YWx1ZS5kYXRhLnJlbGF0aW9uc2hpcHMuYXNzZXRzLmRhdGFbMF0uaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudHMucHVzaChnZXRUZWxlbWV0cnkoZWxlLmF0dHJpYnV0ZXMuVVJMKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICBcclxuICAgICAgICAgICAgbGV0IHRlbGVtZXRyeSA9IGF3YWl0IFByb21pc2UuYWxsU2V0dGxlZChldmVudHMpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRlbGVtZXRyeSlcclxuICAgICAgICAgICAgdGVsZW1ldHJ5LmZvckVhY2goZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQudmFsdWUuZm9yRWFjaChsb2cgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCgobG9nLl9UID09PSBcIkxvZ1BsYXllcktpbGxcIiAmJiBsb2cua2lsbGVyKSAmJiBsb2cua2lsbGVyLm5hbWUgPT09IGd0YWcpIHx8ICgobG9nLl9UID09PSBcIkxvZ1BsYXllcktpbGxcIiAmJiBsb2cudmljdGltKSAmJiBsb2cudmljdGltLm5hbWUgPT09IGd0YWcpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAga0FWLnB1c2gobG9nKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGtBVik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgdHdpdGNoVXNlciA9IGF3YWl0IGdldFR3aXRjaFVzZXIodW5hbWUpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGlmKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKS50aGVuKGpzb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ganNvblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBpZih0d2l0Y2hVc2VyKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0d2l0Y2hVc2VyLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2aWRlb3MgPSBhd2FpdCBnZXRWaWRlb3ModHdpdGNoVXNlci5kYXRhWzBdLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZih2aWRlb3MuZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjbGlwcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IoY29uc3QgdmlkIG9mIHZpZGVvcy5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGlwcy5wdXNoKGdldFB1YmdWaWRlb3ModmlkLmlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGMgPSBhd2FpdCBQcm9taXNlLmFsbChjbGlwcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJlYW1zID0gYy5maWx0ZXIoZWxlID0+IGVsZS5nYW1lID09PSBcIlBMQVlFUlVOS05PV04nUyBCQVRUTEVHUk9VTkRTXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWJ1Z2dlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyZWFtcztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGFjdHVhbE1hdGNoZXMgPSBbXTtcclxuICAgIGxldCBldmVudHMgPSBbXTtcclxuICAgIGxldCB0ZWxlbWV0cnlFdmVudHMgPSBbXTtcclxuICAgIGxldCBjbGlwcyA9IFtdO1xyXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0UGxheWVyKCkge1xyXG4gICAgICAgIGxldCBnYW1lcnRhZyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJnYW1lcnRhZy1maWVsZFwiKVswXS52YWx1ZTtcclxuICAgICAgICBjb25zdCBzcGxhc2ggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic3BsYXNoLWNvbnRlbnRcIilbMF07XHJcbiAgICAgICAgY29uc3QgbG9nbyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJsb2dvXCIpWzBdO1xyXG4gICAgICAgIGNvbnN0IGZldGNoaW5nUGxheWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgZmV0Y2hpbmdQbGF5ZXIuY2xhc3NMaXN0LmFkZChcImxvYWRpbmcxXCIsIFwibG9hZGluZ1wiKTtcclxuICAgICAgICBmZXRjaGluZ1BsYXllci5pbm5lckhUTUwgPSAnRmV0Y2hpbmcgUGxheWVyIC4uLic7XHJcbiAgICAgICAgc3BsYXNoLmFwcGVuZENoaWxkKGZldGNoaW5nUGxheWVyKTtcclxuICAgICAgICBsZXQgbWF0Y2hlcyA9IGF3YWl0IGdldFBsYXllckJ5TmFtZShnYW1lcnRhZyk7XHJcbiAgICAgICAgY29uc29sZS5sb2cobWF0Y2hlcyk7XHJcbiAgICAgICAgYWN0dWFsTWF0Y2hlcyA9IG1hdGNoZXMubWFwKGFzeW5jIG1hdGNoID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IGdldE1hdGNoKG1hdGNoLmlkKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGZldGNoaW5nUGxheWVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICBjb25zdCBmZXRjaGluZ01hdGNoZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICBmZXRjaGluZ01hdGNoZXMuY2xhc3NMaXN0LmFkZChcImxvYWRpbmcyXCIsIFwibG9hZGluZ1wiKTtcclxuICAgICAgICBmZXRjaGluZ01hdGNoZXMuaW5uZXJIVE1MID0gJ0ZldGNoaW5nIE1hdGNoZXMgLi4uJztcclxuICAgICAgICBzcGxhc2guYXBwZW5kQ2hpbGQoZmV0Y2hpbmdNYXRjaGVzKTtcclxuXHJcbiAgICAgICAgbGV0IGdhbWVzID0gYXdhaXQgUHJvbWlzZS5hbGxTZXR0bGVkKGFjdHVhbE1hdGNoZXMpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGdhbWVzKVxyXG5cclxuXHJcbiAgICAgICAgZmV0Y2hpbmdNYXRjaGVzLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICBjb25zdCBmZXRjaGluZ0V2ZW50cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgIGZldGNoaW5nRXZlbnRzLmNsYXNzTGlzdC5hZGQoXCJsb2FkaW5nM1wiLCBcImxvYWRpbmdcIik7XHJcbiAgICAgICAgZmV0Y2hpbmdFdmVudHMuaW5uZXJIVE1MID0gJ0ZldGNoaW5nIEV2ZW50cyAuLi4nO1xyXG4gICAgICAgIHNwbGFzaC5hcHBlbmRDaGlsZChmZXRjaGluZ0V2ZW50cyk7XHJcblxyXG4gICAgICAgIGdhbWVzLmZvckVhY2goYXN5bmMgbWF0Y2ggPT4ge1xyXG4gICAgICAgICAgICBpZihtYXRjaC52YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICBpZihtYXRjaC52YWx1ZS5pbmNsdWRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoLnZhbHVlLmluY2x1ZGVkLmZvckVhY2goYXN5bmMgZWxlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlLmlkID09PSBtYXRjaC52YWx1ZS5kYXRhLnJlbGF0aW9uc2hpcHMuYXNzZXRzLmRhdGFbMF0uaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50cy5wdXNoKGdldFRlbGVtZXRyeShlbGUuYXR0cmlidXRlcy5VUkwpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGxldCB0ZWxlbWV0cnkgPSBhd2FpdCBQcm9taXNlLmFsbFNldHRsZWQoZXZlbnRzKTtcclxuXHJcbiAgICAgICAgZmV0Y2hpbmdFdmVudHMuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIGNvbnN0IGZldGNoaW5nS2lsbHNBbmREZWF0aHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICBmZXRjaGluZ0tpbGxzQW5kRGVhdGhzLmNsYXNzTGlzdC5hZGQoXCJsb2FkaW5nNFwiLCBcImxvYWRpbmdcIik7XHJcbiAgICAgICAgZmV0Y2hpbmdLaWxsc0FuZERlYXRocy5pbm5lckhUTUwgPSAnRmV0Y2hpbmcgS2lsbHMgYW5kIERlYXRocyAuLi4nO1xyXG4gICAgICAgIHNwbGFzaC5hcHBlbmRDaGlsZChmZXRjaGluZ0tpbGxzQW5kRGVhdGhzKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0ZWxlbWV0cnkpXHJcbiAgICAgICAgdGVsZW1ldHJ5LmZvckVhY2goZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBldmVudC52YWx1ZS5mb3JFYWNoKGxvZyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZigoKGxvZy5fVCA9PT0gXCJMb2dQbGF5ZXJLaWxsXCIgJiYgbG9nLmtpbGxlcikgJiYgbG9nLmtpbGxlci5uYW1lID09PSBnYW1lcnRhZykgfHwgKChsb2cuX1QgPT09IFwiTG9nUGxheWVyS2lsbFwiICYmIGxvZy52aWN0aW0pICYmIGxvZy52aWN0aW0ubmFtZSA9PT0gZ2FtZXJ0YWcpKXtcclxuICAgICAgICAgICAgICAgICAgICB0ZWxlbWV0cnlFdmVudHMucHVzaChsb2cpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0ZWxlbWV0cnlFdmVudHMpXHJcbiAgICAgICAgZmV0Y2hpbmdLaWxsc0FuZERlYXRocy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgY29uc3QgZmV0Y2hpbmdWaWRlb3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICBmZXRjaGluZ1ZpZGVvcy5jbGFzc0xpc3QuYWRkKFwibG9hZGluZzVcIiwgXCJsb2FkaW5nXCIpO1xyXG4gICAgICAgIGZldGNoaW5nVmlkZW9zLmlubmVySFRNTCA9ICdGZXRjaGluZyBWaWRlb3MgLi4uJztcclxuICAgICAgICBzcGxhc2guYXBwZW5kQ2hpbGQoZmV0Y2hpbmdWaWRlb3MpO1xyXG4gICAgICAgIGZvcihjb25zdCB0RXZlbnQgb2YgdGVsZW1ldHJ5RXZlbnRzKSB7XHJcbiAgICAgICAgICAgIGxldCBldmVudFRpbWVzdGFtcCA9IHRFdmVudC5fRDtcclxuICAgICAgICAgICAgaWYodEV2ZW50LmtpbGxlcikge1xyXG4gICAgICAgICAgICAgICAgaWYoIUJMQUNLTElTVEVEW3RFdmVudC5raWxsZXIubmFtZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0d2l0Y2hVc2VyID0gYXdhaXQgZ2V0VHdpdGNoVXNlcih0RXZlbnQua2lsbGVyLm5hbWUpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCkudGhlbihqc29uID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ganNvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBpZih0d2l0Y2hVc2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHR3aXRjaFVzZXIuZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmlkZW9zID0gYXdhaXQgZ2V0VmlkZW9zKHR3aXRjaFVzZXIuZGF0YVswXS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih2aWRlb3MuZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9zLmRhdGEubWFwKGFzeW5jIHZpZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjbGlwID0gYXdhaXQgZ2V0UHViZ1ZpZGVvcyh2aWQuaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjbGlwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWJ1Z2dlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2xpcC5nYW1lID09PSBcIlBMQVlFUlVOS05PV04nUyBCQVRUTEVHUk9VTkRTXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWJ1Z2dlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRpbWVHcmVhdGVyVGhhbihldmVudFRpbWVzdGFtcCwgY2xpcC5jcmVhdGVkX2F0KSAmJiB0aW1lR3JlYXRlclRoYW4yKGV2ZW50VGltZXN0YW1wLCBjbGlwLmNyZWF0ZWRfYXQsIGNsaXAubGVuZ3RoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWJ1Z2dlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGlwcy5wdXNoKHtcInVybFwiOiBjbGlwLnVybCwgXCJ0aW1lc3RhbXBJblNlY29uZHNcIjogdGltZXN0YW1wKGV2ZW50VGltZXN0YW1wLCBjbGlwLmNyZWF0ZWRfYXQsIGNsaXAubGVuZ3RoKSwgXCJldmVudFwiOiB0RXZlbnQsIFwidm9kXCI6IGNsaXB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBCTEFDS0xJU1RFRFt0RXZlbnQua2lsbGVyLm5hbWVdID0gdEV2ZW50LmtpbGxlci5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQkxBQ0tMSVNURURbdEV2ZW50LmtpbGxlci5uYW1lXSA9IHRFdmVudC5raWxsZXIubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodEV2ZW50LnZpY3RpbSkge1xyXG4gICAgICAgICAgICAgICAgaWYoIUJMQUNLTElTVEVEW3RFdmVudC52aWN0aW0ubmFtZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0d2l0Y2hVc2VyID0gYXdhaXQgZ2V0VHdpdGNoVXNlcih0RXZlbnQudmljdGltLm5hbWUpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCkudGhlbihqc29uID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ganNvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBpZih0d2l0Y2hVc2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHR3aXRjaFVzZXIuZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmlkZW9zID0gYXdhaXQgZ2V0VmlkZW9zKHR3aXRjaFVzZXIuZGF0YVswXS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih2aWRlb3MuZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9zLmRhdGEubWFwKGFzeW5jIHZpZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjbGlwID0gYXdhaXQgZ2V0UHViZ1ZpZGVvcyh2aWQuaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjbGlwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWJ1Z2dlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2xpcC5nYW1lID09PSBcIlBMQVlFUlVOS05PV04nUyBCQVRUTEVHUk9VTkRTXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWJ1Z2dlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRpbWVHcmVhdGVyVGhhbihldmVudFRpbWVzdGFtcCwgY2xpcC5jcmVhdGVkX2F0KSAmJiB0aW1lR3JlYXRlclRoYW4yKGV2ZW50VGltZXN0YW1wLCBjbGlwLmNyZWF0ZWRfYXQsIGNsaXAubGVuZ3RoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWJ1Z2dlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGlwcy5wdXNoKHtcInVybFwiOiBjbGlwLnVybCwgXCJ0aW1lc3RhbXBJblNlY29uZHNcIjogdGltZXN0YW1wKGV2ZW50VGltZXN0YW1wLCBjbGlwLmNyZWF0ZWRfYXQsIGNsaXAubGVuZ3RoKSwgXCJldmVudFwiOiB0RXZlbnQsIFwidm9kXCI6IGNsaXB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgQkxBQ0tMSVNURURbdEV2ZW50LnZpY3RpbS5uYW1lXSA9IHRFdmVudC52aWN0aW0ubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBCTEFDS0xJU1RFRFt0RXZlbnQudmljdGltLm5hbWVdID0gdEV2ZW50LnZpY3RpbS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZmluYWwgPSBhd2FpdCBQcm9taXNlLmFsbFNldHRsZWQoY2xpcHMpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGZpbmFsKTtcclxuICAgICAgICBpZihmaW5hbC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgZmV0Y2hpbmdWaWRlb3Muc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICBsb2dvLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgbm9WaWRlb3NGb3VuZChnYW1lcnRhZyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbG9nby5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgIGZldGNoaW5nVmlkZW9zLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgdmlkZW9zRm91bmQoZ2FtZXJ0YWcsIGZpbmFsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pIiwiY29uc3QgZGF0ZUNvbnZlcnRlciA9ICh1Z2x5RGF0ZSkgPT4ge1xyXG4gICAgbGV0IGZha2VIYWxmID0gdWdseURhdGUuc3BsaXQoXCJUXCIpO1xyXG4gICAgbGV0IHJlYWxIYWxmID0gZmFrZUhhbGZbMF0uc3BsaXQoXCItXCIpO1xyXG5cclxuICAgIGxldCByZWFsRGF0ZSA9IE1PTlRIU1tyZWFsSGFsZlsxXV0gKyBcIiwgXCIgKyByZWFsSGFsZlsyXSArIFwiIFwiICsgcmVhbEhhbGZbMF07XHJcblxyXG4gICAgcmV0dXJuIHJlYWxEYXRlO1xyXG59XHJcblxyXG5jb25zdCBNT05USFMgPSB7XHJcbiAgICBcIjAxXCI6IFwiSmFudWFyeVwiLFxyXG4gICAgXCIwMlwiOiBcIkZlYnJ1YXJ5XCIsXHJcbiAgICBcIjAzXCI6IFwiTWFyY2hcIixcclxuICAgIFwiMDRcIjogXCJBcHJpbFwiLFxyXG4gICAgXCIwNVwiOiBcIk1heVwiLFxyXG4gICAgXCIwNlwiOiBcIkp1bmVcIixcclxuICAgIFwiMDdcIjogXCJKdWx5XCIsXHJcbiAgICBcIjA4XCI6IFwiQXVndXN0XCIsXHJcbiAgICBcIjA5XCI6IFwiU2VwdGVtYmVyXCIsXHJcbiAgICBcIjEwXCI6IFwiT2N0b2JlclwiLFxyXG4gICAgXCIxMVwiOiBcIk5vdmVtYmVyXCIsXHJcbiAgICBcIjEyXCI6IFwiRGVjZW1iZXJcIlxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkYXRlQ29udmVydGVyOyIsImV4cG9ydCBjb25zdCBub1ZpZGVvc0ZvdW5kID0gKGdhbWVydGFnKSA9PiB7XHJcbiAgICBjb25zdCBzcGxhc2ggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic3BsYXNoLWNvbnRlbnRcIilbMF07XHJcbiAgICBzcGxhc2guc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgY29uc3QgbG9nbyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJsb2dvXCIpWzBdO1xyXG4gICAgbG9nby5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICBjb25zdCBwYXJlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKVxyXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICBidXR0b24uaW5uZXJIVE1MID0gJyZsYXJyOyc7XHJcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImJhY2tcIik7XHJcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xyXG4gICAgcGFyZW50LmNsYXNzTGlzdC5hZGQoXCJwYXJlbnQtY29udGFpbmVyXCIpO1xyXG4gICAgY29uc3QgcGxheWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHBsYXllci5pbm5lckhUTUwgPSBgPGgyPiR7IGdhbWVydGFnIH08L2gyPmA7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocGxheWVyKTtcclxuICAgIGNvbnN0IG1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgbWVzc2FnZS5pbm5lckhUTUwgPSAnPHA+Tm8gdmlkZW9zIGZvdW5kIGZvciB0aGlzIHVzZXI8L3A+JztcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtZXNzYWdlKTtcclxuICAgIHBhcmVudC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwYXJlbnQpO1xyXG5cclxuICAgIGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy8nO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdmlkZW9zRm91bmQgPSAoZ2FtZXJ0YWcsIGNsaXBzKSA9PiB7XHJcbiAgICBjb25zdCBzcGxhc2ggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic3BsYXNoLWNvbnRlbnRcIilbMF07XHJcbiAgICBzcGxhc2guc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgY29uc3QgbG9nbyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJsb2dvXCIpWzBdO1xyXG4gICAgY29uc3QgcGFyZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIilcclxuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgYnV0dG9uLmlubmVySFRNTCA9ICcmbGFycjsnO1xyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJiYWNrXCIpO1xyXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcclxuICAgIHBhcmVudC5jbGFzc0xpc3QuYWRkKFwicGFyZW50LWNvbnRhaW5lclwiKTtcclxuICAgIGNvbnN0IHBsYXllciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBwbGF5ZXIuaW5uZXJIVE1MID0gYDxoMj4keyBnYW1lcnRhZyB9PC9oMj5gO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBsYXllcik7XHJcbiAgICBcclxuICAgIGNvbnN0IGxpc3RPZlZpZHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XHJcbiAgICBsaXN0T2ZWaWRzLmNsYXNzTGlzdC5hZGQoXCJsaXN0LW9mLXZpZHNcIik7XHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgY2xpcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCB1bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcclxuICAgICAgICB1bC5pbm5lckhUTUwgPSBgPGgzPiR7IGNsaXBzW2ldLnZhbHVlLmV2ZW50LmtpbGxlci5uYW1lIH08L2gzPjxzcGFuPmtpbGxpbmcgJHsgY2xpcHNbaV0udmFsdWUuZXZlbnQudmljdGltLm5hbWUgfTwvc3Bhbj5gO1xyXG4gICAgICAgIHVsLmNsYXNzTGlzdC5hZGQoYCR7IGNsaXBzW2ldLnZhbHVlLmV2ZW50LmtpbGxlci5uYW1lID09PSBnYW1lcnRhZyA/IFwiZ1wiIDogXCJyXCIgfWAsIFwidmlkZW9Cb3hcIik7XHJcbiAgICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcclxuICAgICAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKFwibW9kYWxcIik7XHJcbiAgICAgICAgLy8gY29uc3QgaWZybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7XHJcbiAgICAgICAgLy8gaWZybS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgYGh0dHBzOi8vcGxheWVyLnR3aXRjaC50di8/dmlkZW89JHsgY2xpcHNbaV0udmFsdWUudm9kLl9pZCB9JmF1dG9wbGF5PWZhbHNlJnBhcmVudD1sb2NhbGhvc3QmdGltZT0keyBjbGlwc1tpXS52YWx1ZS50aW1lc3RhbXBJblNlY29uZHMgfWApO1xyXG4gICAgICAgIC8vIGlmcm0uc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIFwiNTQwXCIpO1xyXG4gICAgICAgIC8vIGlmcm0uc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgXCI5NzBcIik7XHJcbiAgICAgICAgLy8gaWZybS5zZXRBdHRyaWJ1dGUoXCJmcmFtZWJvcmRlclwiLCBcIjBcIik7XHJcbiAgICAgICAgLy8gaWZybS5zZXRBdHRyaWJ1dGUoXCJzY3JvbGxpbmdcIiwgXCJub1wiKTtcclxuICAgICAgICAvLyBpZnJtLnNldEF0dHJpYnV0ZShcImFsbG93ZnVsbHNjcmVlblwiLCBcInRydWVcIik7XHJcbiAgICAgICAgLy8gaWZybS5jbGFzc0xpc3QuYWRkKFwiZnJhbWVcIik7XHJcbiAgICAgICAgLy8gbW9kYWwuYXBwZW5kQ2hpbGQoaWZybSk7XHJcbiAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBkaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7IGkgfWApO1xyXG4gICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKFwidmZyYW1lMlwiKTtcclxuICAgICAgICBtb2RhbC5hcHBlbmRDaGlsZChkaXYpO1xyXG5cclxuICAgICAgICB1bC5hcHBlbmRDaGlsZChtb2RhbCk7XHJcbiAgICAgICAgbGlzdE9mVmlkcy5hcHBlbmRDaGlsZCh1bCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICBidG4uaW5uZXJIVE1MID0gJyYjMTAwMDY7JztcclxuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwiY2xvc2VcIik7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobGlzdE9mVmlkcylcclxuICAgIHBhcmVudC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xyXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGJ0bik7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBhcmVudCk7XHJcblxyXG4gICAgXHJcbiAgICBsZXQgbmFtZXMgPSBbXTtcclxuICAgIGZvcihsZXQgaiA9IDA7IGogPCBjbGlwcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgIG5hbWVzLnB1c2goXCJwbGF5ZXJcIiArIGopXHJcbiAgICB9XHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgY2xpcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgd2lkdGg6IDk3MCxcclxuICAgICAgICAgICAgaGVpZ2h0OiA1NDAsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuICAgICAgICAgICAgdGltZTogYCR7IGNsaXBzW2ldLnZhbHVlLnRpbWVzdGFtcEluU2Vjb25kcyB9YCxcclxuICAgICAgICAgICAgdmlkZW86IGAkeyBjbGlwc1tpXS52YWx1ZS52b2QuX2lkIH1gXHJcbiAgICAgICAgfTtcclxuICAgICAgICBuYW1lc1tpXSA9IG5ldyBUd2l0Y2guUGxheWVyKGAkeyBpIH1gLCBvcHRpb25zKTtcclxuICAgICAgICBuYW1lc1tpXS5zZXRWb2x1bWUoMC41KTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNsb3NlXCIpLmZvckVhY2goYiA9PiB7XHJcbiAgICAgICAgICAgIGIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lc1tpXS5wYXVzZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy52aWRlb0JveCcpLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgY29uc3QgZnJtID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcubW9kYWwnKTtcclxuICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UnKTtcclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcbiAgICAgICAgICAgIGZybS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgICAgICAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jbG9zZScpLmZvckVhY2goeCA9PiB7XHJcbiAgICAgICAgeC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubW9kYWwnKS5mb3JFYWNoKGZybSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmcm0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgeC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gICAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnLyc7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgS2V5IGZyb20gJy4uL2NvbmZpZy9rZXlzJztcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRQbGF5ZXJCeU5hbWUgPSBnYW1lcnRhZyA9PiB7XHJcbiAgICBjb25zdCBwbGF5ZXJCeU5hbWVJbml0ID0ge1xyXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7IEtleS5wdWJnQVBJIH1gLFxyXG4gICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi92bmQuYXBpK2pzb24nXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2cocHJvY2Vzcy5lbnYpO1xyXG4gICAgY29uc29sZS5sb2cocHJvY2Vzcy5lbnYuTk9ERV9FTlYpO1xyXG4gICAgY29uc29sZS5sb2coS2V5LnB1YmdBUEkpO1xyXG4gICAgbGV0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdChgaHR0cHM6Ly9hcGkucHViZy5jb20vc2hhcmRzL3hib3gvcGxheWVycz9maWx0ZXJbcGxheWVyTmFtZXNdPSR7IGdhbWVydGFnIH1gLCBwbGF5ZXJCeU5hbWVJbml0KTtcclxuICAgIHJldHVybiBmZXRjaChyZXF1ZXN0KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgaWYocmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgLy8gZGVidWdnZXJcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKS50aGVuKGpzb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGpzb24uZGF0YVswXS5yZWxhdGlvbnNoaXBzLm1hdGNoZXMuZGF0YTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcbndpbmRvdy5LZXkgPSBLZXk7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0TWF0Y2ggPSAobWF0Y2hJZCkgPT4ge1xyXG4gICAgY29uc3QgZ2FtZUluaXQgPSB7XHJcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgIH1cclxuXHJcbiAgICAvLyBsZXQgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGBodHRwczovL2FwaS5wdWJnLmNvbS9zaGFyZHMveGJveC9tYXRjaGVzLyR7IG1hdGNoSWQgfWAsIGdhbWVJbml0KTtcclxuICAgIGxldCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoYC9wdWJnL2dhbWVydGFnLyR7IG1hdGNoSWQgfWAsIGdhbWVJbml0KVxyXG4gICAgcmV0dXJuIGZldGNoKHJlcXVlc3QpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXHJcbiAgICB9KVxyXG59XHJcbi8vIHdpbmRvdy5nZXRNYXRjaCA9IGdldE1hdGNoO1xyXG4vL1xyXG5leHBvcnQgY29uc3QgZ2V0VGVsZW1ldHJ5ID0gKHVybCkgPT4ge1xyXG4gICAgY29uc3QgdGVsZW1ldHJ5SW5pdCA9IHtcclxuICAgICAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vdm5kLmFwaStqc29uJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHVybCwgdGVsZW1ldHJ5SW5pdCk7XHJcbiAgICByZXR1cm4gZmV0Y2gocmVxdWVzdCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgIGlmKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCkudGhlbihqc29uID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBqc29uXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG4vLyB3aW5kb3cuZ2V0VGVsZW1ldHJ5ID0gZ2V0VGVsZW1ldHJ5O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldE9BdXRoID0gKCkgPT4ge1xyXG4gICAgY29uc3Qgb2F1dGhJbml0ID0ge1xyXG4gICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgIC8vIHNjb3BlOiAndXNlcjpyZWFkOmVtYWlsJ1xyXG5cclxuICAgIH1cclxuICAgIGxldCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoYGh0dHBzOi8vaWQudHdpdGNoLnR2L29hdXRoMi90b2tlbj9jbGllbnRfaWQ9JHsgS2V5LnR3aXRjaEFQSSB9JmNsaWVudF9zZWNyZXQ9JHsgS2V5LmNsaWVudFNFQ1JFVCB9JmdyYW50X3R5cGU9Y2xpZW50X2NyZWRlbnRpYWxzYCwgb2F1dGhJbml0KTtcclxuICAgIHJldHVybiBmZXRjaChyZXF1ZXN0KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgaWYocmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRUd2l0Y2hVc2VyID0gZ2FtZXJ0YWcgPT4ge1xyXG4gICAgY29uc3QgdHdpdGNoVXNlckluaXQgPSB7XHJcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAkeyBLZXkub0FVVEggfWAsXHJcbiAgICAgICAgICAgICdDbGllbnQtSWQnOiBgJHsgS2V5LnR3aXRjaEFQSSB9YFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoYGh0dHBzOi8vYXBpLnR3aXRjaC50di9oZWxpeC91c2Vycz9sb2dpbj0keyBnYW1lcnRhZyB9YCwgdHdpdGNoVXNlckluaXQpO1xyXG4gICAgcmV0dXJuIGZldGNoKHJlcXVlc3QpXHJcbn1cclxuLy8gd2luZG93LmdldFR3aXRjaFVzZXIgPSBnZXRUd2l0Y2hVc2VyO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFZpZGVvcyA9IHVzZXJJZCA9PiB7XHJcbiAgICBjb25zdCB0d2l0Y2hWaWRlb3NJbml0ID0ge1xyXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHsgS2V5Lm9BVVRIIH1gLFxyXG4gICAgICAgICAgICAnQ2xpZW50LUlkJzogYCR7IEtleS50d2l0Y2hBUEkgfWBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGBodHRwczovL2FwaS50d2l0Y2gudHYvaGVsaXgvdmlkZW9zP3VzZXJfaWQ9JHsgdXNlcklkIH1gLCB0d2l0Y2hWaWRlb3NJbml0KTtcclxuICAgIHJldHVybiBmZXRjaChyZXF1ZXN0KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgaWYocmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuLy8gd2luZG93LmdldFZpZGVvcyA9IGdldFZpZGVvcztcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRQdWJnVmlkZW9zID0gdmlkZW9JZCA9PiB7XHJcbiAgICBjb25zdCB0d2l0Y2hQdWJnSW5pdCA9IHtcclxuICAgICAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgXCJBY2NlcHRcIjogXCJhcHBsaWNhdGlvbi92bmQudHdpdGNodHYudjUranNvblwiLFxyXG4gICAgICAgICAgICAnQ2xpZW50LUlkJzogYCR7IEtleS50d2l0Y2hBUEkgfWBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGBodHRwczovL2FwaS50d2l0Y2gudHYva3Jha2VuL3ZpZGVvcy8keyB2aWRlb0lkIH1gLCB0d2l0Y2hQdWJnSW5pdCk7XHJcbiAgICByZXR1cm4gZmV0Y2gocmVxdWVzdClcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCB0aW1lR3JlYXRlclRoYW4gPSAodDEsIHQyKSA9PiB7XHJcbiAgICAvLyBkZWJ1Z2dlclxyXG4gICAgbGV0IHQzID0gbmV3IERhdGUodDEpO1xyXG4gICAgbGV0IHQ0ID0gbmV3IERhdGUodDIpO1xyXG5cclxuICAgIGlmKHQzID49IHQ0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB0aW1lR3JlYXRlclRoYW4yID0gKHQxLCB0Miwgc2Vjb25kcykgPT4ge1xyXG4gICAgLy8gZGVidWdnZXJcclxuICAgIGxldCB0MyA9IG5ldyBEYXRlKHQxKTtcclxuICAgIGxldCB0NCA9IG5ldyBEYXRlKHQyKTtcclxuICAgIHQ0LnNldEhvdXJzKHQ0LmdldEhvdXJzKCksIHQ0LmdldE1pbnV0ZXMoKSwgdDQuZ2V0U2Vjb25kcygpICsgc2Vjb25kcyk7XHJcbiAgICBpZiAodDMgPD0gdDQpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuICAgIC8vIGxldCBob3VycyA9IHQ0LmdldEhvdXJzKCk7XHJcbiAgICAvLyBsZXQgbWludXRlcyA9IHQ0LmdldE1pbnV0ZXMoKTtcclxuICAgIC8vIGxldCBzZWNzID0gdDQuZ2V0U2Vjb25kcygpO1xyXG4gICAgLy8gaWYoc2Vjb25kcyArIHNlYyA8IDYwKSB7XHJcbiAgICAvLyAgICAgdDQuc2V0SG91cnMoaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMgKyBzZWNzKVxyXG4gICAgLy8gfSBlbHNlIGlmKHNlY29uZHMgKyBzZWMgPT09IDYwKSB7XHJcbiAgICAvLyAgICAgdDQuc2V0SG91cnMoaG91cnMsIG1pbnV0ZXMgKyAxLCAwKVxyXG4gICAgLy8gfSBlbHNlIGlmKHNlY29uZHMgKyBzZWMgPiA2MCkge1xyXG4gICAgLy8gICAgIGxldCBuZXdTZWNzID0gKHNlY29uZHMgKyBzZWMpICUgNjA7XHJcbiAgICAvLyAgICAgbGV0IG5ld01pbnV0ZXMgPSAoKHNlY29uZHMgKyBzZWMpIC0gbmV3U2VjcykgLyA2MDtcclxuICAgIC8vICAgICBsZXQgbWluO1xyXG4gICAgLy8gICAgIGxldCBob3VycztcclxuICAgIC8vICAgICBpZihuZXdNaW51dGVzID4gNjApIHtcclxuICAgIC8vICAgICAgICAgbWluID0gbmV3TWludXRlcyAlIDYwO1xyXG4gICAgLy8gICAgICAgICBob3VycyA9IChuZXdNaW51dGVzIC0gbWluKSAvIDYwO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHRpbWVzdGFtcCA9ICh0MSwgdDIsIHNlY29uZHMpID0+IHtcclxuICAgIC8vIGRlYnVnZ2VyXHJcbiAgICBsZXQgdDMgPSBuZXcgRGF0ZSh0MSk7XHJcbiAgICBsZXQgdDQgPSBuZXcgRGF0ZSh0Mik7XHJcbiAgICB0NC5zZXRIb3Vycyh0NC5nZXRIb3VycygpLCB0NC5nZXRNaW51dGVzKCksIHQ0LmdldFNlY29uZHMoKSArIHNlY29uZHMpO1xyXG4gICAgbGV0IHNlY3MgPSAoKHQ0IC0gdDMpIC8gMTAwMCk7XHJcbiAgICAvLyBsZXQgblQgPSB0NC5zZXRIb3Vycyh0NC5nZXRIb3VycygpLCB0NC5nZXRNaW51dGVzKCksIHQ0LmdldFNlY29uZHMoKSAtIHNlY3MpO1xyXG4gICAgLy8gbGV0IGV2ZW50VGltZXN0YW1wID0gblQgLSAobmV3IERhdGUodDIpKTtcclxuICAgIGxldCB0ID0gbmV3IERhdGUobnVsbCk7XHJcbiAgICB0LnNldFNlY29uZHMoKHNlY29uZHMgLSBzZWNzKSAtIDEwKTtcclxuICAgIGxldCBhID0gdC50b0lTT1N0cmluZygpLnN1YnN0cigxMSwgOCkuc3BsaXQoXCI6XCIpO1xyXG4gICAgcmV0dXJuIGFbMF0gKyBcImhcIiArIGFbMV0gKyBcIm1cIiArIGFbMl0gKyBcInNcIlxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdGltZXN0YW1wMiA9ICh0MSwgdDIsIHNlY29uZHMpID0+IHtcclxuICAgIGxldCB0MyA9IG5ldyBEYXRlKHQxKTtcclxuICAgIGxldCB0NCA9IG5ldyBEYXRlKHQyKTtcclxuICAgIHQ0LnNldEhvdXJzKHQ0LmdldEhvdXJzKCksIHQ0LmdldE1pbnV0ZXMoKSwgdDQuZ2V0U2Vjb25kcygpICsgc2Vjb25kcyk7XHJcbiAgICBsZXQgc2VjcyA9ICgodDQgLSB0MykgLyAxMDAwKTtcclxuICAgIGxldCBuVCA9IHQ0LnNldEhvdXJzKHQ0LmdldEhvdXJzKCksIHQ0LmdldE1pbnV0ZXMoKSwgdDQuZ2V0U2Vjb25kcygpIC0gc2Vjcyk7XHJcbiAgICByZXR1cm4gKChuVCAtIChuZXcgRGF0ZSh0MikpKSAvIDEwMDApIC0gMTA7XHJcbn0iLCJpbXBvcnQgZGF0ZUNvbnZlcnRlciBmcm9tICcuL2RhdGVfY29udmVydGVyJztcclxuaW1wb3J0IHsgdGltZUdyZWF0ZXJUaGFuLCB0aW1lR3JlYXRlclRoYW4yLCB0aW1lc3RhbXAsIHRpbWVzdGFtcDIgfSBmcm9tICcuL3NlYXJjaF91dGlsaXRpZXMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGRpc3BsYXlTdHJlYW1zID0gKGV2ZW50cywgdmlkZW9zLCBndGFnKSA9PiB7XHJcbiAgICBjb25zdCBzcGxhc2ggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic3BsYXNoLWNvbnRlbnRcIilbMF07XHJcbiAgICBzcGxhc2guc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgY29uc3QgbG9nbyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJsb2dvXCIpWzBdO1xyXG4gICAgbG9nby5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICBjb25zdCBmcCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJsb2FkXCIpWzBdO1xyXG4gICAgZnAuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgXHJcbiAgICBsZXQgY2xpcHMgPSBbXTtcclxuICAgIGxldCB2aWRlb0hhc0V2ZW50cyA9IHt9O1xyXG5cclxuICAgIC8vIGRlYnVnZ2VyXHJcbiAgICBmb3IobGV0IGogPSAwOyBqIDwgdmlkZW9zLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZih0aW1lR3JlYXRlclRoYW4oZXZlbnRzW2ldLl9ELCB2aWRlb3Nbal0uY3JlYXRlZF9hdCkgJiYgdGltZUdyZWF0ZXJUaGFuMihldmVudHNbaV0uX0QsIHZpZGVvc1tqXS5jcmVhdGVkX2F0LCB2aWRlb3Nbal0ubGVuZ3RoKSkge1xyXG4gICAgICAgICAgICAgICAgdmlkZW9IYXNFdmVudHNbdmlkZW9zW2pdLl9pZF0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY2xpcHMucHVzaCh7XCJ2aWRlb19pZFwiOiB2aWRlb3Nbal0uX2lkLCBcInVybFwiOiB2aWRlb3Nbal0udXJsLCBcInNlZWtcIjogdGltZXN0YW1wMihldmVudHNbaV0uX0QsIHZpZGVvc1tqXS5jcmVhdGVkX2F0LCB2aWRlb3Nbal0ubGVuZ3RoKSwgXCJ0aW1lc3RhbXBJblNlY29uZHNcIjogdGltZXN0YW1wKGV2ZW50c1tpXS5fRCwgdmlkZW9zW2pdLmNyZWF0ZWRfYXQsIHZpZGVvc1tqXS5sZW5ndGgpLCBcImV2ZW50XCI6IGV2ZW50c1tpXSwgXCJ2b2RcIjogdmlkZW9zW2pdfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYXJlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKVxyXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICBidXR0b24uaW5uZXJIVE1MID0gJyZsYXJyOyc7XHJcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImJhY2tcIik7XHJcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xyXG4gICAgcGFyZW50LmNsYXNzTGlzdC5hZGQoXCJwYXJlbnQtY29udGFpbmVyXCIpO1xyXG4gICAgY29uc3QgcGx5ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBwbHlyLmlubmVySFRNTCA9IGA8aDI+JHsgZ3RhZyB9PC9oMj5gO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBseXIpO1xyXG4gICAgXHJcbiAgICBjb25zdCBsaXN0T2ZWaWRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xyXG4gICAgbGlzdE9mVmlkcy5jbGFzc0xpc3QuYWRkKFwibGlzdC1vZi12aWRzXCIpO1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHZpZGVvcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmKHZpZGVvSGFzRXZlbnRzW3ZpZGVvc1tpXS5faWRdKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xyXG4gICAgICAgICAgICB1bC5pbm5lckhUTUwgPSBgPGgzPiR7IHZpZGVvc1tpXS50aXRsZSB9PC9oMz48c3Bhbj4keyBkYXRlQ29udmVydGVyKHZpZGVvc1tpXS5jcmVhdGVkX2F0KSB9PC9zcGFuPmA7XHJcbiAgICAgICAgICAgIHVsLmNsYXNzTGlzdC5hZGQoXCJzdHJlYW1zQm94XCIpO1xyXG4gICAgICAgICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKFwibW9kYWwyXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBtb2RhbF9jb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgbW9kYWxfY29udGVudC5jbGFzc0xpc3QuYWRkKFwibW9kYWwtY29udGVudFwiKTtcclxuXHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBjbGlwcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYoY2xpcHNbal0udmlkZW9faWQgPT09IHZpZGVvc1tpXS5faWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBkZWJ1Z2dlclxyXG4gICAgICAgICAgICAgICAgICAgIGxpLmlubmVySFRNTCA9IGBLaWxsZXI6JHsgY2xpcHNbal0uZXZlbnQua2lsbGVyID8gKGNsaXBzW2pdLmV2ZW50LmtpbGxlci5uYW1lKSA6IFwiRW52aXJvbm1lbnRcIiB9IFZpY3RpbTokeyBjbGlwc1tqXS5ldmVudC52aWN0aW0ubmFtZSB9YDtcclxuICAgICAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKGAkeyBjbGlwc1tqXS5ldmVudC5raWxsZXIgPyAoY2xpcHNbal0uZXZlbnQua2lsbGVyLm5hbWUgPT09IGd0YWcgPyBcImdyXCIgOiBcInJlXCIpIDogXCJyZVwiIH1gLCBcIm5vc3R5bGlzdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBsaS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHsgY2xpcHNbal0uc2VlayB9YClcclxuICAgICAgICAgICAgICAgICAgICBtb2RhbF9jb250ZW50LmFwcGVuZENoaWxkKGxpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtb2RhbC5hcHBlbmRDaGlsZChtb2RhbF9jb250ZW50KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHsgaSB9YCk7XHJcbiAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKFwidmZyYW1lXCIpO1xyXG4gICAgICAgICAgICBtb2RhbC5hcHBlbmRDaGlsZChkaXYpO1xyXG5cclxuICAgICAgICAgICAgdWwuYXBwZW5kQ2hpbGQobW9kYWwpO1xyXG4gICAgICAgICAgICBsaXN0T2ZWaWRzLmFwcGVuZENoaWxkKHVsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgYnRuLmlubmVySFRNTCA9ICcmIzEwMDA2Oyc7XHJcbiAgICBidG4uY2xhc3NMaXN0LmFkZChcImNsb3NlMlwiKTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChsaXN0T2ZWaWRzKVxyXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoYnRuKTtcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocGFyZW50KTtcclxuXHJcbiAgICBsZXQgbmFtZXMgPSBbXTtcclxuICAgIGZvcihsZXQgaiA9IDA7IGogPCB2aWRlb3MubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICBuYW1lcy5wdXNoKFwicGxheWVyXCIgKyBqKVxyXG4gICAgfVxyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHZpZGVvcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmKHZpZGVvSGFzRXZlbnRzW3ZpZGVvc1tpXS5faWRdKSB7XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDk3MCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogNTQwLFxyXG4gICAgICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdmlkZW86IGAkeyB2aWRlb3NbaV0uX2lkIH1gXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG5hbWVzW2ldID0gbmV3IFR3aXRjaC5QbGF5ZXIoYCR7IGkgfWAsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBuYW1lc1tpXS5zZXRWb2x1bWUoMC41KTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm5vc3R5bGlzdCcpLmZvckVhY2goZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZXNbaV0uc2VlayhOdW1iZXIoZXZlbnQuaWQpKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2xvc2UyXCIpLmZvckVhY2goYiA9PiB7XHJcbiAgICAgICAgICAgICAgICBiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWVzW2ldLnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3RyZWFtc0JveCcpLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgY29uc3QgZnJtID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcubW9kYWwyJyk7XHJcbiAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsb3NlMicpO1xyXG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgICAgICAgICAgZnJtLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgICAgICAgICAgYnRuLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNsb3NlMicpLmZvckVhY2goeCA9PiB7XHJcbiAgICAgICAgeC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubW9kYWwyJykuZm9yRWFjaChmcm0gPT4ge1xyXG4gICAgICAgICAgICAgICAgZnJtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgIHguc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICAgIGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy8nO1xyXG4gICAgfVxyXG59IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sInNvdXJjZVJvb3QiOiIifQ==