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
                          // console.log(matches);
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
                          _context4.next = 6;
                          return Promise.allSettled(actual);

                        case 6:
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
                          _context4.next = 10;
                          return Promise.allSettled(events);

                        case 10:
                          telemetry = _context4.sent;
                          // console.log(telemetry)
                          telemetry.forEach(function (event) {
                            event.value.forEach(function (log) {
                              if (log._T === "LogPlayerKill" && log.killer && log.killer.name === gtag || log._T === "LogPlayerKill" && log.victim && log.victim.name === gtag) {
                                kAV.push(log);
                              }
                            });
                          }); // console.log(kAV);

                          _context4.next = 14;
                          return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getTwitchUser"])(uname);

                        case 14:
                          twitchUser = _context4.sent;

                          if (!twitchUser) {
                            _context4.next = 29;
                            break;
                          }

                          if (!(twitchUser.data.length > 0)) {
                            _context4.next = 29;
                            break;
                          }

                          _context4.next = 19;
                          return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getVideos"])(twitchUser.data[0].id);

                        case 19:
                          videos = _context4.sent;

                          if (!(videos.data.length > 0)) {
                            _context4.next = 29;
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

                          _context4.next = 26;
                          return Promise.all(_clips);

                        case 26:
                          c = _context4.sent;
                          // console.log(c);
                          streams = c.filter(function (ele) {
                            return ele.game === "PLAYERUNKNOWN'S BATTLEGROUNDS";
                          }); // debugger
                          // console.log(streams);

                          return _context4.abrupt("return", streams);

                        case 29:
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
              // console.log(matches);
              // debugger
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
              _context12.next = 18;
              return Promise.allSettled(actualMatches);

            case 18:
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
              _context12.next = 27;
              return Promise.allSettled(events);

            case 27:
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
              _context12.prev = 40;
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
                        return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getTwitchUser"])(tEvent.killer.name);

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
                                      return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getPubgVideos"])(vid.id);

                                    case 2:
                                      clip = _context9.sent;

                                      if (clip) {
                                        // debugger
                                        if (clip.game === "PLAYERUNKNOWN'S BATTLEGROUNDS") {
                                          // debugger
                                          if (Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["timeGreaterThan"])(eventTimestamp, clip.created_at) && Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["timeGreaterThan2"])(eventTimestamp, clip.created_at, clip.length)) {
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
                        return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getTwitchUser"])(tEvent.victim.name);

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
                          // console.log(videos.data.length)
                          _videos.data.map( /*#__PURE__*/function () {
                            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(vid) {
                              var clip;
                              return regeneratorRuntime.wrap(function _callee10$(_context10) {
                                while (1) {
                                  switch (_context10.prev = _context10.next) {
                                    case 0:
                                      _context10.next = 2;
                                      return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getPubgVideos"])(vid.id);

                                    case 2:
                                      clip = _context10.sent;

                                      if (clip) {
                                        // debugger
                                        if (clip.game === "PLAYERUNKNOWN'S BATTLEGROUNDS") {
                                          // debugger
                                          if (Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["timeGreaterThan"])(eventTimestamp, clip.created_at) && Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["timeGreaterThan2"])(eventTimestamp, clip.created_at, clip.length)) {
                                            clips.push({
                                              "url": clip.url,
                                              "timestampInSeconds": Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["timestamp"])(eventTimestamp, clip.created_at, clip.length),
                                              "event": tEvent,
                                              "vod": clip
                                            }); // console.log(clips)
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

            case 43:
              if ((_step2 = _iterator2.n()).done) {
                _context12.next = 47;
                break;
              }

              return _context12.delegateYield(_loop(), "t0", 45);

            case 45:
              _context12.next = 43;
              break;

            case 47:
              _context12.next = 52;
              break;

            case 49:
              _context12.prev = 49;
              _context12.t1 = _context12["catch"](40);

              _iterator2.e(_context12.t1);

            case 52:
              _context12.prev = 52;

              _iterator2.f();

              return _context12.finish(52);

            case 55:
              _context12.next = 57;
              return Promise.allSettled(clips);

            case 57:
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

            case 59:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee11, null, [[40, 49, 52, 55]]);
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
    modal.classList.add("modal");
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPlayerByName", function() { return getPlayerByName; });
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
    method: 'get'
  }; // let request = new Request(`https://api.pubg.com/shards/xbox/players?filter[playerNames]=${ gamertag }`, playerByNameInit);

  var request = new Request("/pubg/gamertag/".concat(gamertag), playerByNameInit);
  return fetch(request).then(function (response) {
    return response.json();
  });
}; // window.getPlayerByName = getPlayerByName;

var getMatch = function getMatch(matchId) {
  var gameInit = {
    method: 'get'
  }; // let request = new Request(`https://api.pubg.com/shards/xbox/matches/${ matchId }`, gameInit);

  var request = new Request("/pubg/matches/".concat(matchId), gameInit);
  return fetch(request).then(function (response) {
    return response.json();
  });
}; // window.getMatch = getMatch;
//

var getTelemetry = function getTelemetry(url) {
  var telemetryInit = {
    method: 'get'
  };
  var request = new Request("/pubg/telemetry/?url=".concat(url), telemetryInit);
  return fetch(request).then(function (response) {
    return response.json();
  });
}; // window.getTelemetry = getTelemetry;

var getOAuth = function getOAuth() {
  var oauthInit = {
    method: 'post' // scope: 'user:read:email'

  };
  var request = new Request("/oauth", oauthInit);
  return fetch(request).then(function (response) {
    return response.json();
  });
};
var getTwitchUser = function getTwitchUser(gamertag) {
  var twitchUserInit = {
    method: 'get'
  };
  var request = new Request("/twitch/".concat(gamertag), twitchUserInit);
  return fetch(request).then(function (r) {
    return r.json().then(function (json) {
      return json;
    });
  });
};
window.getTwitchUser = getTwitchUser;
var getVideos = function getVideos(userId) {
  var twitchVideosInit = {
    method: 'get'
  };
  var request = new Request("/twitchvideos/".concat(userId), twitchVideosInit);
  return fetch(request).then(function (response) {
    return response.json();
  });
}; // window.getVideos = getVideos;

var getPubgVideos = function getPubgVideos(videoId) {
  var twitchPubgInit = {
    method: 'get'
  };
  var request = new Request("/pubgvideos/".concat(videoId), twitchPubgInit);
  return fetch(request).then(function (response) {
    return response.json();
  });
};
window.getPubgVideos = getPubgVideos;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZy9rZXlzX2Rldi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZGF0ZV9jb252ZXJ0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbm9fdmlkZW9zX2ZvdW5kLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3NlYXJjaF91dGlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvc3RyZWFtcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL2luZGV4LnNjc3MiXSwibmFtZXMiOlsicHJvY2VzcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZXF1aXJlIiwicHViZ0FQSSIsInR3aXRjaEFQSSIsImNsaWVudFNFQ1JFVCIsIm9BVVRIIiwiZ2FtZUlEIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiQkxBQ0tMSVNURUQiLCJrQVYiLCJhY3R1YWwiLCJzdHJlYW1zIiwiY29udGFpbmVyIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInF1ZXJ5U2VsZWN0b3IiLCJnZXRQbGF5ZXIiLCJpbnB1dCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJzdHlsZSIsImRpc3BsYXkiLCJ1biIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwiZ3QiLCJzdWJtaXQiLCJpbm5lckhUTUwiLCJnZXRFbGVtZW50QnlJZCIsImUiLCJnZXRJbnB1dCIsImdldFN0cmVhbXMiLCJ1bmFtZSIsImd0YWciLCJnZXRQbGF5ZXJCeU5hbWUiLCJtYXRjaGVzIiwibWFwIiwibWF0Y2giLCJnZXRNYXRjaCIsImlkIiwiUHJvbWlzZSIsImFsbFNldHRsZWQiLCJnYW1lcyIsImZvckVhY2giLCJ2YWx1ZSIsImluY2x1ZGVkIiwiZWxlIiwiZGF0YSIsInJlbGF0aW9uc2hpcHMiLCJhc3NldHMiLCJldmVudHMiLCJwdXNoIiwiZ2V0VGVsZW1ldHJ5IiwiYXR0cmlidXRlcyIsIlVSTCIsInRlbGVtZXRyeSIsImV2ZW50IiwibG9nIiwiX1QiLCJraWxsZXIiLCJuYW1lIiwidmljdGltIiwiZ2V0VHdpdGNoVXNlciIsInR3aXRjaFVzZXIiLCJsZW5ndGgiLCJnZXRWaWRlb3MiLCJ2aWRlb3MiLCJjbGlwcyIsInZpZCIsImdldFB1YmdWaWRlb3MiLCJ0aGVuIiwicmVzcG9uc2UiLCJvayIsImpzb24iLCJhbGwiLCJjIiwiZmlsdGVyIiwiZ2FtZSIsImZwIiwiYWxsVmlkcyIsImRpc3BsYXlTdHJlYW1zIiwiYWN0dWFsTWF0Y2hlcyIsInRlbGVtZXRyeUV2ZW50cyIsImdhbWVydGFnIiwic3BsYXNoIiwibG9nbyIsImZldGNoaW5nUGxheWVyIiwiZmV0Y2hpbmdNYXRjaGVzIiwiZmV0Y2hpbmdFdmVudHMiLCJmZXRjaGluZ0tpbGxzQW5kRGVhdGhzIiwiZmV0Y2hpbmdWaWRlb3MiLCJ0RXZlbnQiLCJldmVudFRpbWVzdGFtcCIsIl9EIiwiY2xpcCIsInRpbWVHcmVhdGVyVGhhbiIsImNyZWF0ZWRfYXQiLCJ0aW1lR3JlYXRlclRoYW4yIiwidXJsIiwidGltZXN0YW1wIiwiZmluYWwiLCJub1ZpZGVvc0ZvdW5kIiwidmlkZW9zRm91bmQiLCJkYXRlQ29udmVydGVyIiwidWdseURhdGUiLCJmYWtlSGFsZiIsInNwbGl0IiwicmVhbEhhbGYiLCJyZWFsRGF0ZSIsIk1PTlRIUyIsInBhcmVudCIsImJ1dHRvbiIsInBsYXllciIsIm1lc3NhZ2UiLCJib2R5Iiwib25jbGljayIsIndpbmRvdyIsImxvY2F0aW9uIiwibGlzdE9mVmlkcyIsImkiLCJ1bCIsIm1vZGFsIiwiZGl2IiwiYnRuIiwibmFtZXMiLCJqIiwib3B0aW9ucyIsIndpZHRoIiwiaGVpZ2h0IiwiYXV0b3BsYXkiLCJ0aW1lIiwidGltZXN0YW1wSW5TZWNvbmRzIiwidmlkZW8iLCJ2b2QiLCJfaWQiLCJUd2l0Y2giLCJQbGF5ZXIiLCJzZXRWb2x1bWUiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYiIsInBhdXNlIiwiaXRlbSIsImZybSIsIngiLCJwbGF5ZXJCeU5hbWVJbml0IiwibWV0aG9kIiwicmVxdWVzdCIsIlJlcXVlc3QiLCJmZXRjaCIsIm1hdGNoSWQiLCJnYW1lSW5pdCIsInRlbGVtZXRyeUluaXQiLCJnZXRPQXV0aCIsIm9hdXRoSW5pdCIsInR3aXRjaFVzZXJJbml0IiwiciIsInVzZXJJZCIsInR3aXRjaFZpZGVvc0luaXQiLCJ2aWRlb0lkIiwidHdpdGNoUHViZ0luaXQiLCJ0MSIsInQyIiwidDMiLCJEYXRlIiwidDQiLCJzZWNvbmRzIiwic2V0SG91cnMiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJnZXRTZWNvbmRzIiwic2VjcyIsInQiLCJzZXRTZWNvbmRzIiwiYSIsInRvSVNPU3RyaW5nIiwic3Vic3RyIiwidGltZXN0YW1wMiIsIm5UIiwidmlkZW9IYXNFdmVudHMiLCJwbHlyIiwidGl0bGUiLCJtb2RhbF9jb250ZW50IiwidmlkZW9faWQiLCJsaSIsInNlZWsiLCJOdW1iZXIiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0I7O0FBRWhCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDOztBQUVBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsMENBQTBDO0FBQzFDOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHlEQUF5RDtBQUN6RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkdBQTZHO0FBQzdHOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVc7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsd0NBQXdDO0FBQ3hDLDJCQUEyQjtBQUMzQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Qsb0NBQW9DO0FBQ3BDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsb0NBQW9DLGNBQWM7QUFDbEQ7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QixFQUFxQy9GLE9BQXJDLENBQTZDLFVBQUFvRyxDQUFDLEVBQUk7QUFDOUNBLEtBQUMsQ0FBQ3hJLGdCQUFGLENBQW1CLE9BQW5CLEVBQTRCLFVBQUFzQixDQUFDLEVBQUk7QUFDN0J2QixjQUFRLENBQUNvSSxnQkFBVCxDQUEwQixTQUExQixFQUFxQy9GLE9BQXJDLENBQTZDLFVBQUFtRyxHQUFHLEVBQUk7QUFDaERBLFdBQUcsQ0FBQzFILEtBQUosQ0FBVUMsT0FBVixHQUFvQixNQUFwQjtBQUNBMEgsU0FBQyxDQUFDM0gsS0FBRixDQUFRQyxPQUFSLEdBQWtCLE1BQWxCO0FBQ0gsT0FIRDtBQUlILEtBTEQ7QUFNSCxHQVBEOztBQVNBMEYsUUFBTSxDQUFDSSxPQUFQLEdBQWlCLFlBQVc7QUFDeEJDLFVBQU0sQ0FBQ0MsUUFBUCxHQUFrQixHQUFsQjtBQUNILEdBRkQ7QUFHSCxDQTNITSxDOzs7Ozs7Ozs7Ozs7QUNIUDtBQUFBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cbnZhciBydW50aW1lID0gZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cblxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBvYmpba2V5XTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgLy8gSUUgOCBoYXMgYSBicm9rZW4gT2JqZWN0LmRlZmluZVByb3BlcnR5IHRoYXQgb25seSB3b3JrcyBvbiBET00gb2JqZWN0cy5cbiAgICBkZWZpbmUoe30sIFwiXCIpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBkZWZpbmUgPSBmdW5jdGlvbiAob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7IC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuXG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7IC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cblxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJub3JtYWxcIixcbiAgICAgICAgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKVxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwidGhyb3dcIixcbiAgICAgICAgYXJnOiBlcnJcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiOyAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cblxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9OyAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cblxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fSAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG5cblxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG5cbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJiBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9IEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpOyAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgICBkZWZpbmUocHJvdG90eXBlLCBtZXRob2QsIGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uIChnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3IgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fCAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIiA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uIChnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGRlZmluZShnZW5GdW4sIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpO1xuICAgIH1cblxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9OyAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuXG5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgX19hd2FpdDogYXJnXG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvciwgUHJvbWlzZUltcGwpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG5cbiAgICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24gKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPSAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZykgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH0gLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cblxuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG5cbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjsgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG5cbiAgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uIChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCwgUHJvbWlzZUltcGwpIHtcbiAgICBpZiAoUHJvbWlzZUltcGwgPT09IHZvaWQgMCkgUHJvbWlzZUltcGwgPSBQcm9taXNlO1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3Iod3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCksIFByb21pc2VJbXBsKTtcbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfSAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG5cblxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuXG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZSA/IEdlblN0YXRlQ29tcGxldGVkIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkOyAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cblxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0gLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuXG5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG5cbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAvLyBOb3RlOiBbXCJyZXR1cm5cIl0gbXVzdCBiZSB1c2VkIGZvciBFUzMgcGFyc2luZyBjb21wYXRpYmlsaXR5LlxuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCFpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlOyAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7IC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9IC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cblxuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH0gLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuXG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcbiAgZGVmaW5lKEdwLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JcIik7IC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cblxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7XG4gICAgICB0cnlMb2M6IGxvY3NbMF1cbiAgICB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7XG4gICAgICB0cnlMb2M6IFwicm9vdFwiXG4gICAgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cblxuICAgIGtleXMucmV2ZXJzZSgpOyAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcblxuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH0gLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG5cblxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG5cbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsXG4gICAgICAgICAgICBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9IC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cblxuXG4gICAgcmV0dXJuIHtcbiAgICAgIG5leHQ6IGRvbmVSZXN1bHRcbiAgICB9O1xuICB9XG5cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgIGRvbmU6IHRydWVcbiAgICB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG4gICAgcmVzZXQ6IGZ1bmN0aW9uIChza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDsgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiYgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiYgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHN0b3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcblxuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uIChleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG5cbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhIWNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFicnVwdDogZnVuY3Rpb24gKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiYgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJiB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiYgKHR5cGUgPT09IFwiYnJlYWtcIiB8fCB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHwgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG4gICAgZmluaXNoOiBmdW5jdGlvbiAoZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG5cbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbiAodHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH0gLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG5cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24gKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07IC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuXG4gIHJldHVybiBleHBvcnRzO1xufSggLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbi8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4vLyBvYmplY3QuIEVpdGhlciB3YXksIHRoZSByZXN1bHRpbmcgb2JqZWN0IHdpbGwgYmUgdXNlZCB0byBpbml0aWFsaXplXG4vLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxudHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge30pO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbn0iLCJpZihwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIpIHtcclxuICAgIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4va2V5c19wcm9kXCIpXHJcbn0gZWxzZSB7XHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL2tleXNfZGV2XCIpXHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIHB1YmdBUEk6ICdleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcWRHa2lPaUkxTm1NMVkyTTVNQzFsWW1abUxUQXhNemd0TVdReE9DMDBZbU15TmpWbU16RXlZakVpTENKcGMzTWlPaUpuWVcxbGJHOWphMlZ5SWl3aWFXRjBJam94TmpBeU1qQTRNRFl3TENKd2RXSWlPaUppYkhWbGFHOXNaU0lzSW5ScGRHeGxJam9pY0hWaVp5SXNJbUZ3Y0NJNkltTnNhWEJ3WldRaWZRLllHQmxoM2VKcVJQT2tlU0RKcVRVS0cycUFRX3E2Y2V4OE9CS1V1cEx0U0knLFxyXG4gICAgdHdpdGNoQVBJOiAnNmRnaWExcG12bXJsczNpNmxlemdybWlidjAzMHB6JyxcclxuICAgIGNsaWVudFNFQ1JFVDogJ2I3aGcyemdoOWxnczV2N2k5MDEwZmtsZ3djaWtzaycsXHJcbiAgICBvQVVUSDogJ24wdXM3bXk1MHh1ajIzZGcycTg5empqNnh2ejJhdycsXHJcbiAgICBnYW1lSUQ6ICc0OTMwNTcnXHJcbn0iLCJpbXBvcnQgJy4uL3NyYy9zdHlsZXMvaW5kZXguc2Nzcyc7XHJcbmltcG9ydCB7IGdldE1hdGNoLCBnZXRQbGF5ZXJCeU5hbWUsIGdldFR3aXRjaFVzZXIsIGdldFRlbGVtZXRyeSwgZ2V0VmlkZW9zLCBnZXRQdWJnVmlkZW9zLCB0aW1lR3JlYXRlclRoYW4sIHRpbWVHcmVhdGVyVGhhbjIsIHRpbWVzdGFtcCB9IGZyb20gJy4vc2NyaXB0cy9zZWFyY2hfdXRpbGl0aWVzJztcclxuaW1wb3J0IFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lXCI7XHJcbmltcG9ydCB7IG5vVmlkZW9zRm91bmQsIHZpZGVvc0ZvdW5kIH0gZnJvbSAnLi9zY3JpcHRzL25vX3ZpZGVvc19mb3VuZCc7XHJcbmltcG9ydCB7IGRpc3BsYXlTdHJlYW1zIH0gZnJvbSAnLi9zY3JpcHRzL3N0cmVhbXMnO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG4gICAgbGV0IEJMQUNLTElTVEVEID0ge307XHJcbiAgICBsZXQga0FWID0gW107XHJcbiAgICBsZXQgYWN0dWFsO1xyXG4gICAgbGV0IHN0cmVhbXMgPSBbXTtcclxuICAgIC8vIGxldCBnYW1lcnRhZyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJnYW1lcnRhZy1maWVsZFwiKVswXS52YWx1ZTtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJnZXRTdHJlYW1zXCIpWzBdO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mYS1zZWFyY2hcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGdldFBsYXllcik7XHJcblxyXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcclxuICAgIGlucHV0LmNsYXNzTGlzdC5hZGQoXCJpbnB1dC1jb250YWluZXJcIik7XHJcbiAgICBpbnB1dC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICBjb25zdCB1biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIHVuLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xyXG4gICAgdW4uc2V0QXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIiwgXCJUd2l0Y2ggVXNlclwiKTtcclxuICAgIHVuLmNsYXNzTGlzdC5hZGQoXCJ1bi1maWVsZFwiKTtcclxuICAgIGlucHV0LmFwcGVuZENoaWxkKHVuKTtcclxuICAgIGNvbnN0IGd0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgZ3Quc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XHJcbiAgICBndC5zZXRBdHRyaWJ1dGUoXCJwbGFjZWhvbGRlclwiLCBcIlBVQkcgVXNlclwiKTtcclxuICAgIGd0LmNsYXNzTGlzdC5hZGQoXCJndC1maWVsZFwiKTtcclxuICAgIGlucHV0LmFwcGVuZENoaWxkKGd0KTtcclxuICAgIGNvbnN0IHN1Ym1pdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgc3VibWl0LmNsYXNzTGlzdC5hZGQoXCJzdWJtaXQtc3RyZWFtXCIpO1xyXG4gICAgc3VibWl0LmlubmVySFRNTCA9IFwiU2VhcmNoXCI7XHJcbiAgICBpbnB1dC5hcHBlbmRDaGlsZChzdWJtaXQpO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGlucHV0KTtcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdldFN0cmVhbXNcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xyXG4gICAgICAgIGlmKGlucHV0LnN0eWxlLmRpc3BsYXkgPT09IFwiZmxleFwiKSB7XHJcbiAgICAgICAgICAgIGlucHV0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIGlucHV0LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3VibWl0LXN0cmVhbVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZ2V0SW5wdXQpO1xyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldElucHV0KCkge1xyXG4gICAgICAgIGNvbnN0IHVuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInVuLWZpZWxkXCIpWzBdLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IGd0YWcgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZ3QtZmllbGRcIilbMF0udmFsdWU7XHJcblxyXG4gICAgICAgIGlmKHVuYW1lICYmIGd0YWcpIHtcclxuICAgICAgICAgICAgY29uc3QgZnAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICAgICAgZnAuY2xhc3NMaXN0LmFkZChcImxvYWRpbmcxXCIsIFwibG9hZFwiKTtcclxuICAgICAgICAgICAgZnAuaW5uZXJIVE1MID0gJ0ZldGNoaW5nIFZpZGVvcyAuLi4nO1xyXG4gICAgICAgICAgICBpbnB1dC5hcHBlbmRDaGlsZChmcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYWxsVmlkcyA9IGF3YWl0IGdldFN0cmVhbXModW5hbWUsIGd0YWcpO1xyXG4gICAgICAgIGRpc3BsYXlTdHJlYW1zKGtBViwgYWxsVmlkcywgZ3RhZyk7XHJcblxyXG5cclxuICAgICAgICBhc3luYyBmdW5jdGlvbiBnZXRTdHJlYW1zKHVuYW1lLCBndGFnKSB7XHJcbiAgICAgICAgICAgIGxldCBtYXRjaGVzID0gYXdhaXQgZ2V0UGxheWVyQnlOYW1lKGd0YWcpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtYXRjaGVzKTtcclxuICAgICAgICAgICAgYWN0dWFsID0gbWF0Y2hlcy5tYXAoYXN5bmMgbWF0Y2ggPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IGdldE1hdGNoKG1hdGNoLmlkKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgXHJcbiAgICAgICAgICAgIGxldCBnYW1lcyA9IGF3YWl0IFByb21pc2UuYWxsU2V0dGxlZChhY3R1YWwpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lcylcclxuICAgIFxyXG4gICAgICAgICAgICBnYW1lcy5mb3JFYWNoKGFzeW5jIG1hdGNoID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKG1hdGNoLnZhbHVlKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihtYXRjaC52YWx1ZS5pbmNsdWRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaC52YWx1ZS5pbmNsdWRlZC5mb3JFYWNoKGFzeW5jIGVsZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbGUuaWQgPT09IG1hdGNoLnZhbHVlLmRhdGEucmVsYXRpb25zaGlwcy5hc3NldHMuZGF0YVswXS5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50cy5wdXNoKGdldFRlbGVtZXRyeShlbGUuYXR0cmlidXRlcy5VUkwpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgIFxyXG4gICAgICAgICAgICBsZXQgdGVsZW1ldHJ5ID0gYXdhaXQgUHJvbWlzZS5hbGxTZXR0bGVkKGV2ZW50cyk7XHJcbiAgICBcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGVsZW1ldHJ5KVxyXG4gICAgICAgICAgICB0ZWxlbWV0cnkuZm9yRWFjaChldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudC52YWx1ZS5mb3JFYWNoKGxvZyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoKChsb2cuX1QgPT09IFwiTG9nUGxheWVyS2lsbFwiICYmIGxvZy5raWxsZXIpICYmIGxvZy5raWxsZXIubmFtZSA9PT0gZ3RhZykgfHwgKChsb2cuX1QgPT09IFwiTG9nUGxheWVyS2lsbFwiICYmIGxvZy52aWN0aW0pICYmIGxvZy52aWN0aW0ubmFtZSA9PT0gZ3RhZykpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrQVYucHVzaChsb2cpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coa0FWKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCB0d2l0Y2hVc2VyID0gYXdhaXQgZ2V0VHdpdGNoVXNlcih1bmFtZSk7XHJcbiAgICAgICAgICAgIGlmKHR3aXRjaFVzZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmKHR3aXRjaFVzZXIuZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZpZGVvcyA9IGF3YWl0IGdldFZpZGVvcyh0d2l0Y2hVc2VyLmRhdGFbMF0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHZpZGVvcy5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsaXBzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihjb25zdCB2aWQgb2YgdmlkZW9zLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaXBzLnB1c2goZ2V0UHViZ1ZpZGVvcyh2aWQuaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYyA9IGF3YWl0IFByb21pc2UuYWxsKGNsaXBzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbXMgPSBjLmZpbHRlcihlbGUgPT4gZWxlLmdhbWUgPT09IFwiUExBWUVSVU5LTk9XTidTIEJBVFRMRUdST1VORFNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlYnVnZ2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHN0cmVhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyZWFtcztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGFjdHVhbE1hdGNoZXMgPSBbXTtcclxuICAgIGxldCBldmVudHMgPSBbXTtcclxuICAgIGxldCB0ZWxlbWV0cnlFdmVudHMgPSBbXTtcclxuICAgIGxldCBjbGlwcyA9IFtdO1xyXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0UGxheWVyKCkge1xyXG4gICAgICAgIGxldCBnYW1lcnRhZyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJnYW1lcnRhZy1maWVsZFwiKVswXS52YWx1ZTtcclxuICAgICAgICBjb25zdCBzcGxhc2ggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic3BsYXNoLWNvbnRlbnRcIilbMF07XHJcbiAgICAgICAgY29uc3QgbG9nbyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJsb2dvXCIpWzBdO1xyXG4gICAgICAgIGNvbnN0IGZldGNoaW5nUGxheWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgZmV0Y2hpbmdQbGF5ZXIuY2xhc3NMaXN0LmFkZChcImxvYWRpbmcxXCIsIFwibG9hZGluZ1wiKTtcclxuICAgICAgICBmZXRjaGluZ1BsYXllci5pbm5lckhUTUwgPSAnRmV0Y2hpbmcgUGxheWVyIC4uLic7XHJcbiAgICAgICAgc3BsYXNoLmFwcGVuZENoaWxkKGZldGNoaW5nUGxheWVyKTtcclxuICAgICAgICBsZXQgbWF0Y2hlcyA9IGF3YWl0IGdldFBsYXllckJ5TmFtZShnYW1lcnRhZyk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cobWF0Y2hlcyk7XHJcbiAgICAgICAgLy8gZGVidWdnZXJcclxuICAgICAgICBhY3R1YWxNYXRjaGVzID0gbWF0Y2hlcy5tYXAoYXN5bmMgbWF0Y2ggPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgZ2V0TWF0Y2gobWF0Y2guaWQpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZmV0Y2hpbmdQbGF5ZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIGNvbnN0IGZldGNoaW5nTWF0Y2hlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgIGZldGNoaW5nTWF0Y2hlcy5jbGFzc0xpc3QuYWRkKFwibG9hZGluZzJcIiwgXCJsb2FkaW5nXCIpO1xyXG4gICAgICAgIGZldGNoaW5nTWF0Y2hlcy5pbm5lckhUTUwgPSAnRmV0Y2hpbmcgTWF0Y2hlcyAuLi4nO1xyXG4gICAgICAgIHNwbGFzaC5hcHBlbmRDaGlsZChmZXRjaGluZ01hdGNoZXMpO1xyXG4gICAgICAgIGxldCBnYW1lcyA9IGF3YWl0IFByb21pc2UuYWxsU2V0dGxlZChhY3R1YWxNYXRjaGVzKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lcylcclxuXHJcblxyXG4gICAgICAgIGZldGNoaW5nTWF0Y2hlcy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgY29uc3QgZmV0Y2hpbmdFdmVudHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICBmZXRjaGluZ0V2ZW50cy5jbGFzc0xpc3QuYWRkKFwibG9hZGluZzNcIiwgXCJsb2FkaW5nXCIpO1xyXG4gICAgICAgIGZldGNoaW5nRXZlbnRzLmlubmVySFRNTCA9ICdGZXRjaGluZyBFdmVudHMgLi4uJztcclxuICAgICAgICBzcGxhc2guYXBwZW5kQ2hpbGQoZmV0Y2hpbmdFdmVudHMpO1xyXG5cclxuICAgICAgICBnYW1lcy5mb3JFYWNoKGFzeW5jIG1hdGNoID0+IHtcclxuICAgICAgICAgICAgaWYobWF0Y2gudmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgaWYobWF0Y2gudmFsdWUuaW5jbHVkZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXRjaC52YWx1ZS5pbmNsdWRlZC5mb3JFYWNoKGFzeW5jIGVsZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZS5pZCA9PT0gbWF0Y2gudmFsdWUuZGF0YS5yZWxhdGlvbnNoaXBzLmFzc2V0cy5kYXRhWzBdLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudHMucHVzaChnZXRUZWxlbWV0cnkoZWxlLmF0dHJpYnV0ZXMuVVJMKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBsZXQgdGVsZW1ldHJ5ID0gYXdhaXQgUHJvbWlzZS5hbGxTZXR0bGVkKGV2ZW50cyk7XHJcblxyXG4gICAgICAgIGZldGNoaW5nRXZlbnRzLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICBjb25zdCBmZXRjaGluZ0tpbGxzQW5kRGVhdGhzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgZmV0Y2hpbmdLaWxsc0FuZERlYXRocy5jbGFzc0xpc3QuYWRkKFwibG9hZGluZzRcIiwgXCJsb2FkaW5nXCIpO1xyXG4gICAgICAgIGZldGNoaW5nS2lsbHNBbmREZWF0aHMuaW5uZXJIVE1MID0gJ0ZldGNoaW5nIEtpbGxzIGFuZCBEZWF0aHMgLi4uJztcclxuICAgICAgICBzcGxhc2guYXBwZW5kQ2hpbGQoZmV0Y2hpbmdLaWxsc0FuZERlYXRocyk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGVsZW1ldHJ5KVxyXG4gICAgICAgIHRlbGVtZXRyeS5mb3JFYWNoKGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgZXZlbnQudmFsdWUuZm9yRWFjaChsb2cgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoKChsb2cuX1QgPT09IFwiTG9nUGxheWVyS2lsbFwiICYmIGxvZy5raWxsZXIpICYmIGxvZy5raWxsZXIubmFtZSA9PT0gZ2FtZXJ0YWcpIHx8ICgobG9nLl9UID09PSBcIkxvZ1BsYXllcktpbGxcIiAmJiBsb2cudmljdGltKSAmJiBsb2cudmljdGltLm5hbWUgPT09IGdhbWVydGFnKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVsZW1ldHJ5RXZlbnRzLnB1c2gobG9nKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGVsZW1ldHJ5RXZlbnRzKVxyXG4gICAgICAgIGZldGNoaW5nS2lsbHNBbmREZWF0aHMuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIGNvbnN0IGZldGNoaW5nVmlkZW9zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgZmV0Y2hpbmdWaWRlb3MuY2xhc3NMaXN0LmFkZChcImxvYWRpbmc1XCIsIFwibG9hZGluZ1wiKTtcclxuICAgICAgICBmZXRjaGluZ1ZpZGVvcy5pbm5lckhUTUwgPSAnRmV0Y2hpbmcgVmlkZW9zIC4uLic7XHJcbiAgICAgICAgc3BsYXNoLmFwcGVuZENoaWxkKGZldGNoaW5nVmlkZW9zKTtcclxuICAgICAgICBmb3IoY29uc3QgdEV2ZW50IG9mIHRlbGVtZXRyeUV2ZW50cykge1xyXG4gICAgICAgICAgICBsZXQgZXZlbnRUaW1lc3RhbXAgPSB0RXZlbnQuX0Q7XHJcbiAgICAgICAgICAgIGlmKHRFdmVudC5raWxsZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmKCFCTEFDS0xJU1RFRFt0RXZlbnQua2lsbGVyLm5hbWVdKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdHdpdGNoVXNlciA9IGF3YWl0IGdldFR3aXRjaFVzZXIodEV2ZW50LmtpbGxlci5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBpZih0d2l0Y2hVc2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHR3aXRjaFVzZXIuZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmlkZW9zID0gYXdhaXQgZ2V0VmlkZW9zKHR3aXRjaFVzZXIuZGF0YVswXS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih2aWRlb3MuZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9zLmRhdGEubWFwKGFzeW5jIHZpZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjbGlwID0gYXdhaXQgZ2V0UHViZ1ZpZGVvcyh2aWQuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjbGlwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWJ1Z2dlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2xpcC5nYW1lID09PSBcIlBMQVlFUlVOS05PV04nUyBCQVRUTEVHUk9VTkRTXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWJ1Z2dlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRpbWVHcmVhdGVyVGhhbihldmVudFRpbWVzdGFtcCwgY2xpcC5jcmVhdGVkX2F0KSAmJiB0aW1lR3JlYXRlclRoYW4yKGV2ZW50VGltZXN0YW1wLCBjbGlwLmNyZWF0ZWRfYXQsIGNsaXAubGVuZ3RoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGlwcy5wdXNoKHtcInVybFwiOiBjbGlwLnVybCwgXCJ0aW1lc3RhbXBJblNlY29uZHNcIjogdGltZXN0YW1wKGV2ZW50VGltZXN0YW1wLCBjbGlwLmNyZWF0ZWRfYXQsIGNsaXAubGVuZ3RoKSwgXCJldmVudFwiOiB0RXZlbnQsIFwidm9kXCI6IGNsaXB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBCTEFDS0xJU1RFRFt0RXZlbnQua2lsbGVyLm5hbWVdID0gdEV2ZW50LmtpbGxlci5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQkxBQ0tMSVNURURbdEV2ZW50LmtpbGxlci5uYW1lXSA9IHRFdmVudC5raWxsZXIubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodEV2ZW50LnZpY3RpbSkge1xyXG4gICAgICAgICAgICAgICAgaWYoIUJMQUNLTElTVEVEW3RFdmVudC52aWN0aW0ubmFtZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0d2l0Y2hVc2VyID0gYXdhaXQgZ2V0VHdpdGNoVXNlcih0RXZlbnQudmljdGltLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHR3aXRjaFVzZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodHdpdGNoVXNlci5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2aWRlb3MgPSBhd2FpdCBnZXRWaWRlb3ModHdpdGNoVXNlci5kYXRhWzBdLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHZpZGVvcy5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh2aWRlb3MuZGF0YS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9zLmRhdGEubWFwKGFzeW5jIHZpZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjbGlwID0gYXdhaXQgZ2V0UHViZ1ZpZGVvcyh2aWQuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjbGlwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWJ1Z2dlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2xpcC5nYW1lID09PSBcIlBMQVlFUlVOS05PV04nUyBCQVRUTEVHUk9VTkRTXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWJ1Z2dlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRpbWVHcmVhdGVyVGhhbihldmVudFRpbWVzdGFtcCwgY2xpcC5jcmVhdGVkX2F0KSAmJiB0aW1lR3JlYXRlclRoYW4yKGV2ZW50VGltZXN0YW1wLCBjbGlwLmNyZWF0ZWRfYXQsIGNsaXAubGVuZ3RoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGlwcy5wdXNoKHtcInVybFwiOiBjbGlwLnVybCwgXCJ0aW1lc3RhbXBJblNlY29uZHNcIjogdGltZXN0YW1wKGV2ZW50VGltZXN0YW1wLCBjbGlwLmNyZWF0ZWRfYXQsIGNsaXAubGVuZ3RoKSwgXCJldmVudFwiOiB0RXZlbnQsIFwidm9kXCI6IGNsaXB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjbGlwcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJMQUNLTElTVEVEW3RFdmVudC52aWN0aW0ubmFtZV0gPSB0RXZlbnQudmljdGltLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQkxBQ0tMSVNURURbdEV2ZW50LnZpY3RpbS5uYW1lXSA9IHRFdmVudC52aWN0aW0ubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coY2xpcHMpO1xyXG4gICAgICAgIGxldCBmaW5hbCA9IGF3YWl0IFByb21pc2UuYWxsU2V0dGxlZChjbGlwcyk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coZmluYWwpO1xyXG4gICAgICAgIGlmKGZpbmFsLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBmZXRjaGluZ1ZpZGVvcy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgIGxvZ28uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICBub1ZpZGVvc0ZvdW5kKGdhbWVydGFnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsb2dvLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgZmV0Y2hpbmdWaWRlb3Muc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICB2aWRlb3NGb3VuZChnYW1lcnRhZywgZmluYWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkiLCJjb25zdCBkYXRlQ29udmVydGVyID0gKHVnbHlEYXRlKSA9PiB7XHJcbiAgICBsZXQgZmFrZUhhbGYgPSB1Z2x5RGF0ZS5zcGxpdChcIlRcIik7XHJcbiAgICBsZXQgcmVhbEhhbGYgPSBmYWtlSGFsZlswXS5zcGxpdChcIi1cIik7XHJcblxyXG4gICAgbGV0IHJlYWxEYXRlID0gTU9OVEhTW3JlYWxIYWxmWzFdXSArIFwiLCBcIiArIHJlYWxIYWxmWzJdICsgXCIgXCIgKyByZWFsSGFsZlswXTtcclxuXHJcbiAgICByZXR1cm4gcmVhbERhdGU7XHJcbn1cclxuXHJcbmNvbnN0IE1PTlRIUyA9IHtcclxuICAgIFwiMDFcIjogXCJKYW51YXJ5XCIsXHJcbiAgICBcIjAyXCI6IFwiRmVicnVhcnlcIixcclxuICAgIFwiMDNcIjogXCJNYXJjaFwiLFxyXG4gICAgXCIwNFwiOiBcIkFwcmlsXCIsXHJcbiAgICBcIjA1XCI6IFwiTWF5XCIsXHJcbiAgICBcIjA2XCI6IFwiSnVuZVwiLFxyXG4gICAgXCIwN1wiOiBcIkp1bHlcIixcclxuICAgIFwiMDhcIjogXCJBdWd1c3RcIixcclxuICAgIFwiMDlcIjogXCJTZXB0ZW1iZXJcIixcclxuICAgIFwiMTBcIjogXCJPY3RvYmVyXCIsXHJcbiAgICBcIjExXCI6IFwiTm92ZW1iZXJcIixcclxuICAgIFwiMTJcIjogXCJEZWNlbWJlclwiXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRhdGVDb252ZXJ0ZXI7IiwiZXhwb3J0IGNvbnN0IG5vVmlkZW9zRm91bmQgPSAoZ2FtZXJ0YWcpID0+IHtcclxuICAgIGNvbnN0IHNwbGFzaCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzcGxhc2gtY29udGVudFwiKVswXTtcclxuICAgIHNwbGFzaC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICBjb25zdCBsb2dvID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImxvZ29cIilbMF07XHJcbiAgICBsb2dvLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIGNvbnN0IHBhcmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpXHJcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgIGJ1dHRvbi5pbm5lckhUTUwgPSAnJmxhcnI7JztcclxuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYmFja1wiKTtcclxuICAgIHBhcmVudC5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XHJcbiAgICBwYXJlbnQuY2xhc3NMaXN0LmFkZChcInBhcmVudC1jb250YWluZXJcIik7XHJcbiAgICBjb25zdCBwbGF5ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgcGxheWVyLmlubmVySFRNTCA9IGA8aDI+JHsgZ2FtZXJ0YWcgfTwvaDI+YDtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwbGF5ZXIpO1xyXG4gICAgY29uc3QgbWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBtZXNzYWdlLmlubmVySFRNTCA9ICc8cD5ObyB2aWRlb3MgZm91bmQgZm9yIHRoaXMgdXNlcjwvcD4nO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1lc3NhZ2UpO1xyXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBhcmVudCk7XHJcblxyXG4gICAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnLyc7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB2aWRlb3NGb3VuZCA9IChnYW1lcnRhZywgY2xpcHMpID0+IHtcclxuICAgIGNvbnN0IHNwbGFzaCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzcGxhc2gtY29udGVudFwiKVswXTtcclxuICAgIHNwbGFzaC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICBjb25zdCBsb2dvID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImxvZ29cIilbMF07XHJcbiAgICBjb25zdCBwYXJlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKVxyXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICBidXR0b24uaW5uZXJIVE1MID0gJyZsYXJyOyc7XHJcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImJhY2tcIik7XHJcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xyXG4gICAgcGFyZW50LmNsYXNzTGlzdC5hZGQoXCJwYXJlbnQtY29udGFpbmVyXCIpO1xyXG4gICAgY29uc3QgcGxheWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHBsYXllci5pbm5lckhUTUwgPSBgPGgyPiR7IGdhbWVydGFnIH08L2gyPmA7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocGxheWVyKTtcclxuICAgIFxyXG4gICAgY29uc3QgbGlzdE9mVmlkcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcclxuICAgIGxpc3RPZlZpZHMuY2xhc3NMaXN0LmFkZChcImxpc3Qtb2Ytdmlkc1wiKTtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBjbGlwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xyXG4gICAgICAgIHVsLmlubmVySFRNTCA9IGA8aDM+JHsgY2xpcHNbaV0udmFsdWUuZXZlbnQua2lsbGVyLm5hbWUgfTwvaDM+PHNwYW4+a2lsbGluZyAkeyBjbGlwc1tpXS52YWx1ZS5ldmVudC52aWN0aW0ubmFtZSB9PC9zcGFuPmA7XHJcbiAgICAgICAgdWwuY2xhc3NMaXN0LmFkZChgJHsgY2xpcHNbaV0udmFsdWUuZXZlbnQua2lsbGVyLm5hbWUgPT09IGdhbWVydGFnID8gXCJnXCIgOiBcInJcIiB9YCwgXCJ2aWRlb0JveFwiKTtcclxuICAgICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xyXG4gICAgICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoXCJtb2RhbFwiKTtcclxuICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHsgaSB9YCk7XHJcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJ2ZnJhbWUyXCIpO1xyXG4gICAgICAgIG1vZGFsLmFwcGVuZENoaWxkKGRpdik7XHJcblxyXG4gICAgICAgIHVsLmFwcGVuZENoaWxkKG1vZGFsKTtcclxuICAgICAgICBsaXN0T2ZWaWRzLmFwcGVuZENoaWxkKHVsKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgIGJ0bi5pbm5lckhUTUwgPSAnJiMxMDAwNjsnO1xyXG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJjbG9zZVwiKTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChsaXN0T2ZWaWRzKVxyXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoYnRuKTtcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocGFyZW50KTtcclxuXHJcbiAgICBcclxuICAgIGxldCBuYW1lcyA9IFtdO1xyXG4gICAgZm9yKGxldCBqID0gMDsgaiA8IGNsaXBzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgbmFtZXMucHVzaChcInBsYXllclwiICsgailcclxuICAgIH1cclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBjbGlwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICB3aWR0aDogOTcwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDU0MCxcclxuICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgICAgICAgICB0aW1lOiBgJHsgY2xpcHNbaV0udmFsdWUudGltZXN0YW1wSW5TZWNvbmRzIH1gLFxyXG4gICAgICAgICAgICB2aWRlbzogYCR7IGNsaXBzW2ldLnZhbHVlLnZvZC5faWQgfWBcclxuICAgICAgICB9O1xyXG4gICAgICAgIG5hbWVzW2ldID0gbmV3IFR3aXRjaC5QbGF5ZXIoYCR7IGkgfWAsIG9wdGlvbnMpO1xyXG4gICAgICAgIG5hbWVzW2ldLnNldFZvbHVtZSgwLjUpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2xvc2VcIikuZm9yRWFjaChiID0+IHtcclxuICAgICAgICAgICAgYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIG5hbWVzW2ldLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnZpZGVvQm94JykuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBjb25zdCBmcm0gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCcpO1xyXG4gICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZScpO1xyXG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgICAgICAgICAgZnJtLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgICAgICAgICAgYnRuLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNsb3NlJykuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICB4LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tb2RhbCcpLmZvckVhY2goZnJtID0+IHtcclxuICAgICAgICAgICAgICAgIGZybS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICB4LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICBidXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvJztcclxuICAgIH1cclxufSIsImltcG9ydCBLZXkgZnJvbSAnLi4vY29uZmlnL2tleXMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFBsYXllckJ5TmFtZSA9IGdhbWVydGFnID0+IHtcclxuICAgIGNvbnN0IHBsYXllckJ5TmFtZUluaXQgPSB7XHJcbiAgICAgICAgbWV0aG9kOiAnZ2V0J1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBsZXQgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGBodHRwczovL2FwaS5wdWJnLmNvbS9zaGFyZHMveGJveC9wbGF5ZXJzP2ZpbHRlcltwbGF5ZXJOYW1lc109JHsgZ2FtZXJ0YWcgfWAsIHBsYXllckJ5TmFtZUluaXQpO1xyXG4gICAgbGV0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdChgL3B1YmcvZ2FtZXJ0YWcvJHsgZ2FtZXJ0YWcgfWAsIHBsYXllckJ5TmFtZUluaXQpXHJcbiAgICByZXR1cm4gZmV0Y2gocmVxdWVzdCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKClcclxuICAgIH0pXHJcbn1cclxuLy8gd2luZG93LmdldFBsYXllckJ5TmFtZSA9IGdldFBsYXllckJ5TmFtZTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRNYXRjaCA9IChtYXRjaElkKSA9PiB7XHJcbiAgICBjb25zdCBnYW1lSW5pdCA9IHtcclxuICAgICAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgfVxyXG5cclxuICAgIC8vIGxldCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoYGh0dHBzOi8vYXBpLnB1YmcuY29tL3NoYXJkcy94Ym94L21hdGNoZXMvJHsgbWF0Y2hJZCB9YCwgZ2FtZUluaXQpO1xyXG4gICAgbGV0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdChgL3B1YmcvbWF0Y2hlcy8keyBtYXRjaElkIH1gLCBnYW1lSW5pdClcclxuICAgIHJldHVybiBmZXRjaChyZXF1ZXN0KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxyXG4gICAgfSlcclxufVxyXG4vLyB3aW5kb3cuZ2V0TWF0Y2ggPSBnZXRNYXRjaDtcclxuLy9cclxuZXhwb3J0IGNvbnN0IGdldFRlbGVtZXRyeSA9ICh1cmwpID0+IHtcclxuICAgIGNvbnN0IHRlbGVtZXRyeUluaXQgPSB7XHJcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGAvcHViZy90ZWxlbWV0cnkvP3VybD0keyB1cmwgfWAsIHRlbGVtZXRyeUluaXQpO1xyXG4gICAgcmV0dXJuIGZldGNoKHJlcXVlc3QpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXHJcbiAgICB9KVxyXG59XHJcbi8vIHdpbmRvdy5nZXRUZWxlbWV0cnkgPSBnZXRUZWxlbWV0cnk7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0T0F1dGggPSAoKSA9PiB7XHJcbiAgICBjb25zdCBvYXV0aEluaXQgPSB7XHJcbiAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgLy8gc2NvcGU6ICd1c2VyOnJlYWQ6ZW1haWwnXHJcblxyXG4gICAgfVxyXG4gICAgbGV0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdChgL29hdXRoYCwgb2F1dGhJbml0KTtcclxuICAgIHJldHVybiBmZXRjaChyZXF1ZXN0KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldFR3aXRjaFVzZXIgPSBnYW1lcnRhZyA9PiB7XHJcbiAgICBjb25zdCB0d2l0Y2hVc2VySW5pdCA9IHtcclxuICAgICAgICBtZXRob2Q6ICdnZXQnXHJcbiAgICB9XHJcbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGAvdHdpdGNoLyR7IGdhbWVydGFnIH1gLCB0d2l0Y2hVc2VySW5pdCk7XHJcbiAgICByZXR1cm4gZmV0Y2gocmVxdWVzdCkudGhlbihyID0+IHtcclxuICAgICAgICByZXR1cm4gci5qc29uKCkudGhlbihqc29uID0+IHtcclxuICAgICAgICAgIHJldHVybiBqc29uXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxud2luZG93LmdldFR3aXRjaFVzZXIgPSBnZXRUd2l0Y2hVc2VyO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFZpZGVvcyA9IHVzZXJJZCA9PiB7XHJcbiAgICBjb25zdCB0d2l0Y2hWaWRlb3NJbml0ID0ge1xyXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICB9XHJcbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGAvdHdpdGNodmlkZW9zLyR7IHVzZXJJZCB9YCwgdHdpdGNoVmlkZW9zSW5pdCk7XHJcbiAgICByZXR1cm4gZmV0Y2gocmVxdWVzdCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKClcclxuICAgIH0pXHJcbn1cclxuLy8gd2luZG93LmdldFZpZGVvcyA9IGdldFZpZGVvcztcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRQdWJnVmlkZW9zID0gdmlkZW9JZCA9PiB7XHJcbiAgICBjb25zdCB0d2l0Y2hQdWJnSW5pdCA9IHtcclxuICAgICAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgfVxyXG4gICAgbGV0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdChgL3B1Ymd2aWRlb3MvJHsgdmlkZW9JZCB9YCwgdHdpdGNoUHViZ0luaXQpO1xyXG4gICAgcmV0dXJuIGZldGNoKHJlcXVlc3QpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXHJcbiAgICB9KVxyXG59XHJcblxyXG53aW5kb3cuZ2V0UHViZ1ZpZGVvcyA9IGdldFB1YmdWaWRlb3M7XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IHRpbWVHcmVhdGVyVGhhbiA9ICh0MSwgdDIpID0+IHtcclxuICAgIC8vIGRlYnVnZ2VyXHJcbiAgICBsZXQgdDMgPSBuZXcgRGF0ZSh0MSk7XHJcbiAgICBsZXQgdDQgPSBuZXcgRGF0ZSh0Mik7XHJcblxyXG4gICAgaWYodDMgPj0gdDQpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHRpbWVHcmVhdGVyVGhhbjIgPSAodDEsIHQyLCBzZWNvbmRzKSA9PiB7XHJcbiAgICAvLyBkZWJ1Z2dlclxyXG4gICAgbGV0IHQzID0gbmV3IERhdGUodDEpO1xyXG4gICAgbGV0IHQ0ID0gbmV3IERhdGUodDIpO1xyXG4gICAgdDQuc2V0SG91cnModDQuZ2V0SG91cnMoKSwgdDQuZ2V0TWludXRlcygpLCB0NC5nZXRTZWNvbmRzKCkgKyBzZWNvbmRzKTtcclxuICAgIGlmICh0MyA8PSB0NCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG4gICAgLy8gbGV0IGhvdXJzID0gdDQuZ2V0SG91cnMoKTtcclxuICAgIC8vIGxldCBtaW51dGVzID0gdDQuZ2V0TWludXRlcygpO1xyXG4gICAgLy8gbGV0IHNlY3MgPSB0NC5nZXRTZWNvbmRzKCk7XHJcbiAgICAvLyBpZihzZWNvbmRzICsgc2VjIDwgNjApIHtcclxuICAgIC8vICAgICB0NC5zZXRIb3Vycyhob3VycywgbWludXRlcywgc2Vjb25kcyArIHNlY3MpXHJcbiAgICAvLyB9IGVsc2UgaWYoc2Vjb25kcyArIHNlYyA9PT0gNjApIHtcclxuICAgIC8vICAgICB0NC5zZXRIb3Vycyhob3VycywgbWludXRlcyArIDEsIDApXHJcbiAgICAvLyB9IGVsc2UgaWYoc2Vjb25kcyArIHNlYyA+IDYwKSB7XHJcbiAgICAvLyAgICAgbGV0IG5ld1NlY3MgPSAoc2Vjb25kcyArIHNlYykgJSA2MDtcclxuICAgIC8vICAgICBsZXQgbmV3TWludXRlcyA9ICgoc2Vjb25kcyArIHNlYykgLSBuZXdTZWNzKSAvIDYwO1xyXG4gICAgLy8gICAgIGxldCBtaW47XHJcbiAgICAvLyAgICAgbGV0IGhvdXJzO1xyXG4gICAgLy8gICAgIGlmKG5ld01pbnV0ZXMgPiA2MCkge1xyXG4gICAgLy8gICAgICAgICBtaW4gPSBuZXdNaW51dGVzICUgNjA7XHJcbiAgICAvLyAgICAgICAgIGhvdXJzID0gKG5ld01pbnV0ZXMgLSBtaW4pIC8gNjA7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdGltZXN0YW1wID0gKHQxLCB0Miwgc2Vjb25kcykgPT4ge1xyXG4gICAgLy8gZGVidWdnZXJcclxuICAgIGxldCB0MyA9IG5ldyBEYXRlKHQxKTtcclxuICAgIGxldCB0NCA9IG5ldyBEYXRlKHQyKTtcclxuICAgIHQ0LnNldEhvdXJzKHQ0LmdldEhvdXJzKCksIHQ0LmdldE1pbnV0ZXMoKSwgdDQuZ2V0U2Vjb25kcygpICsgc2Vjb25kcyk7XHJcbiAgICBsZXQgc2VjcyA9ICgodDQgLSB0MykgLyAxMDAwKTtcclxuICAgIC8vIGxldCBuVCA9IHQ0LnNldEhvdXJzKHQ0LmdldEhvdXJzKCksIHQ0LmdldE1pbnV0ZXMoKSwgdDQuZ2V0U2Vjb25kcygpIC0gc2Vjcyk7XHJcbiAgICAvLyBsZXQgZXZlbnRUaW1lc3RhbXAgPSBuVCAtIChuZXcgRGF0ZSh0MikpO1xyXG4gICAgbGV0IHQgPSBuZXcgRGF0ZShudWxsKTtcclxuICAgIHQuc2V0U2Vjb25kcygoc2Vjb25kcyAtIHNlY3MpIC0gMTApO1xyXG4gICAgbGV0IGEgPSB0LnRvSVNPU3RyaW5nKCkuc3Vic3RyKDExLCA4KS5zcGxpdChcIjpcIik7XHJcbiAgICByZXR1cm4gYVswXSArIFwiaFwiICsgYVsxXSArIFwibVwiICsgYVsyXSArIFwic1wiXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB0aW1lc3RhbXAyID0gKHQxLCB0Miwgc2Vjb25kcykgPT4ge1xyXG4gICAgbGV0IHQzID0gbmV3IERhdGUodDEpO1xyXG4gICAgbGV0IHQ0ID0gbmV3IERhdGUodDIpO1xyXG4gICAgdDQuc2V0SG91cnModDQuZ2V0SG91cnMoKSwgdDQuZ2V0TWludXRlcygpLCB0NC5nZXRTZWNvbmRzKCkgKyBzZWNvbmRzKTtcclxuICAgIGxldCBzZWNzID0gKCh0NCAtIHQzKSAvIDEwMDApO1xyXG4gICAgbGV0IG5UID0gdDQuc2V0SG91cnModDQuZ2V0SG91cnMoKSwgdDQuZ2V0TWludXRlcygpLCB0NC5nZXRTZWNvbmRzKCkgLSBzZWNzKTtcclxuICAgIHJldHVybiAoKG5UIC0gKG5ldyBEYXRlKHQyKSkpIC8gMTAwMCkgLSAxMDtcclxufSIsImltcG9ydCBkYXRlQ29udmVydGVyIGZyb20gJy4vZGF0ZV9jb252ZXJ0ZXInO1xyXG5pbXBvcnQgeyB0aW1lR3JlYXRlclRoYW4sIHRpbWVHcmVhdGVyVGhhbjIsIHRpbWVzdGFtcCwgdGltZXN0YW1wMiB9IGZyb20gJy4vc2VhcmNoX3V0aWxpdGllcyc7XHJcblxyXG5leHBvcnQgY29uc3QgZGlzcGxheVN0cmVhbXMgPSAoZXZlbnRzLCB2aWRlb3MsIGd0YWcpID0+IHtcclxuICAgIGNvbnN0IHNwbGFzaCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzcGxhc2gtY29udGVudFwiKVswXTtcclxuICAgIHNwbGFzaC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICBjb25zdCBsb2dvID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImxvZ29cIilbMF07XHJcbiAgICBsb2dvLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIGNvbnN0IGZwID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImxvYWRcIilbMF07XHJcbiAgICBmcC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICBcclxuICAgIGxldCBjbGlwcyA9IFtdO1xyXG4gICAgbGV0IHZpZGVvSGFzRXZlbnRzID0ge307XHJcblxyXG4gICAgLy8gZGVidWdnZXJcclxuICAgIGZvcihsZXQgaiA9IDA7IGogPCB2aWRlb3MubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRpbWVHcmVhdGVyVGhhbihldmVudHNbaV0uX0QsIHZpZGVvc1tqXS5jcmVhdGVkX2F0KSAmJiB0aW1lR3JlYXRlclRoYW4yKGV2ZW50c1tpXS5fRCwgdmlkZW9zW2pdLmNyZWF0ZWRfYXQsIHZpZGVvc1tqXS5sZW5ndGgpKSB7XHJcbiAgICAgICAgICAgICAgICB2aWRlb0hhc0V2ZW50c1t2aWRlb3Nbal0uX2lkXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjbGlwcy5wdXNoKHtcInZpZGVvX2lkXCI6IHZpZGVvc1tqXS5faWQsIFwidXJsXCI6IHZpZGVvc1tqXS51cmwsIFwic2Vla1wiOiB0aW1lc3RhbXAyKGV2ZW50c1tpXS5fRCwgdmlkZW9zW2pdLmNyZWF0ZWRfYXQsIHZpZGVvc1tqXS5sZW5ndGgpLCBcInRpbWVzdGFtcEluU2Vjb25kc1wiOiB0aW1lc3RhbXAoZXZlbnRzW2ldLl9ELCB2aWRlb3Nbal0uY3JlYXRlZF9hdCwgdmlkZW9zW2pdLmxlbmd0aCksIFwiZXZlbnRcIjogZXZlbnRzW2ldLCBcInZvZFwiOiB2aWRlb3Nbal19KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBhcmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpXHJcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgIGJ1dHRvbi5pbm5lckhUTUwgPSAnJmxhcnI7JztcclxuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYmFja1wiKTtcclxuICAgIHBhcmVudC5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XHJcbiAgICBwYXJlbnQuY2xhc3NMaXN0LmFkZChcInBhcmVudC1jb250YWluZXJcIik7XHJcbiAgICBjb25zdCBwbHlyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHBseXIuaW5uZXJIVE1MID0gYDxoMj4keyBndGFnIH08L2gyPmA7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocGx5cik7XHJcbiAgICBcclxuICAgIGNvbnN0IGxpc3RPZlZpZHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XHJcbiAgICBsaXN0T2ZWaWRzLmNsYXNzTGlzdC5hZGQoXCJsaXN0LW9mLXZpZHNcIik7XHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdmlkZW9zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYodmlkZW9IYXNFdmVudHNbdmlkZW9zW2ldLl9pZF0pIHtcclxuICAgICAgICAgICAgY29uc3QgdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XHJcbiAgICAgICAgICAgIHVsLmlubmVySFRNTCA9IGA8aDM+JHsgdmlkZW9zW2ldLnRpdGxlIH08L2gzPjxzcGFuPiR7IGRhdGVDb252ZXJ0ZXIodmlkZW9zW2ldLmNyZWF0ZWRfYXQpIH08L3NwYW4+YDtcclxuICAgICAgICAgICAgdWwuY2xhc3NMaXN0LmFkZChcInN0cmVhbXNCb3hcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XHJcbiAgICAgICAgICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoXCJtb2RhbDJcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vZGFsX2NvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBtb2RhbF9jb250ZW50LmNsYXNzTGlzdC5hZGQoXCJtb2RhbC1jb250ZW50XCIpO1xyXG5cclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IGNsaXBzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihjbGlwc1tqXS52aWRlb19pZCA9PT0gdmlkZW9zW2ldLl9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRlYnVnZ2VyXHJcbiAgICAgICAgICAgICAgICAgICAgbGkuaW5uZXJIVE1MID0gYEtpbGxlcjokeyBjbGlwc1tqXS5ldmVudC5raWxsZXIgPyAoY2xpcHNbal0uZXZlbnQua2lsbGVyLm5hbWUpIDogXCJFbnZpcm9ubWVudFwiIH0gVmljdGltOiR7IGNsaXBzW2pdLmV2ZW50LnZpY3RpbS5uYW1lIH1gO1xyXG4gICAgICAgICAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoYCR7IGNsaXBzW2pdLmV2ZW50LmtpbGxlciA/IChjbGlwc1tqXS5ldmVudC5raWxsZXIubmFtZSA9PT0gZ3RhZyA/IFwiZ3JcIiA6IFwicmVcIikgOiBcInJlXCIgfWAsIFwibm9zdHlsaXN0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxpLnNldEF0dHJpYnV0ZShcImlkXCIsIGAkeyBjbGlwc1tqXS5zZWVrIH1gKVxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGFsX2NvbnRlbnQuYXBwZW5kQ2hpbGQobGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1vZGFsLmFwcGVuZENoaWxkKG1vZGFsX2NvbnRlbnQpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZShcImlkXCIsIGAkeyBpIH1gKTtcclxuICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJ2ZnJhbWVcIik7XHJcbiAgICAgICAgICAgIG1vZGFsLmFwcGVuZENoaWxkKGRpdik7XHJcblxyXG4gICAgICAgICAgICB1bC5hcHBlbmRDaGlsZChtb2RhbCk7XHJcbiAgICAgICAgICAgIGxpc3RPZlZpZHMuYXBwZW5kQ2hpbGQodWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICBidG4uaW5uZXJIVE1MID0gJyYjMTAwMDY7JztcclxuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwiY2xvc2UyXCIpO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGxpc3RPZlZpZHMpXHJcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcclxuICAgIHBhcmVudC5hcHBlbmRDaGlsZChidG4pO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwYXJlbnQpO1xyXG5cclxuICAgIGxldCBuYW1lcyA9IFtdO1xyXG4gICAgZm9yKGxldCBqID0gMDsgaiA8IHZpZGVvcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgIG5hbWVzLnB1c2goXCJwbGF5ZXJcIiArIGopXHJcbiAgICB9XHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdmlkZW9zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYodmlkZW9IYXNFdmVudHNbdmlkZW9zW2ldLl9pZF0pIHtcclxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogOTcwLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA1NDAsXHJcbiAgICAgICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB2aWRlbzogYCR7IHZpZGVvc1tpXS5faWQgfWBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgbmFtZXNbaV0gPSBuZXcgVHdpdGNoLlBsYXllcihgJHsgaSB9YCwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIG5hbWVzW2ldLnNldFZvbHVtZSgwLjUpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubm9zdHlsaXN0JykuZm9yRWFjaChldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lc1tpXS5zZWVrKE51bWJlcihldmVudC5pZCkpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jbG9zZTJcIikuZm9yRWFjaChiID0+IHtcclxuICAgICAgICAgICAgICAgIGIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZXNbaV0ucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdHJlYW1zQm94JykuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBjb25zdCBmcm0gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbDInKTtcclxuICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UyJyk7XHJcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG4gICAgICAgICAgICBmcm0uc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgICAgICAgICBidG4uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2xvc2UyJykuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICB4LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tb2RhbDInKS5mb3JFYWNoKGZybSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmcm0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgeC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gICAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnLyc7XHJcbiAgICB9XHJcbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwic291cmNlUm9vdCI6IiJ9