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
  var test = document.getElementsByClassName("test")[0];
  var a;
  test.addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getMatch"])('69fd0de7-2dd3-44aa-b189-487166d309f7');

          case 2:
            a = _context.sent;
            console.log(a);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
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
    _getInput = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var uname, gtag, fp, allVids, getStreams, _getStreams;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _getStreams = function _getStreams3() {
                _getStreams = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(uname, gtag) {
                  var matches, games, telemetry, twitchUser, videos, _clips, _iterator, _step, vid, c;

                  return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          _context5.next = 2;
                          return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getPlayerByName"])(gtag);

                        case 2:
                          matches = _context5.sent;
                          console.log(matches);
                          actual = matches.map( /*#__PURE__*/function () {
                            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(match) {
                              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                  switch (_context2.prev = _context2.next) {
                                    case 0:
                                      _context2.next = 2;
                                      return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getMatch"])(match.id);

                                    case 2:
                                      return _context2.abrupt("return", _context2.sent);

                                    case 3:
                                    case "end":
                                      return _context2.stop();
                                  }
                                }
                              }, _callee2);
                            }));

                            return function (_x3) {
                              return _ref2.apply(this, arguments);
                            };
                          }());
                          _context5.next = 7;
                          return Promise.allSettled(actual);

                        case 7:
                          games = _context5.sent;
                          // console.log(games)
                          games.forEach( /*#__PURE__*/function () {
                            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(match) {
                              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                while (1) {
                                  switch (_context4.prev = _context4.next) {
                                    case 0:
                                      if (match.value) {
                                        if (match.value.included) {
                                          match.value.included.forEach( /*#__PURE__*/function () {
                                            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ele) {
                                              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                                while (1) {
                                                  switch (_context3.prev = _context3.next) {
                                                    case 0:
                                                      if (ele.id === match.value.data.relationships.assets.data[0].id) {
                                                        events.push(Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getTelemetry"])(ele.attributes.URL));
                                                      }

                                                    case 1:
                                                    case "end":
                                                      return _context3.stop();
                                                  }
                                                }
                                              }, _callee3);
                                            }));

                                            return function (_x5) {
                                              return _ref4.apply(this, arguments);
                                            };
                                          }());
                                        }
                                      }

                                    case 1:
                                    case "end":
                                      return _context4.stop();
                                  }
                                }
                              }, _callee4);
                            }));

                            return function (_x4) {
                              return _ref3.apply(this, arguments);
                            };
                          }());
                          _context5.next = 11;
                          return Promise.allSettled(events);

                        case 11:
                          telemetry = _context5.sent;
                          // console.log(telemetry)
                          telemetry.forEach(function (event) {
                            event.value.forEach(function (log) {
                              if (log._T === "LogPlayerKill" && log.killer && log.killer.name === gtag || log._T === "LogPlayerKill" && log.victim && log.victim.name === gtag) {
                                kAV.push(log);
                              }
                            });
                          }); // console.log(kAV);

                          _context5.next = 15;
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
                          twitchUser = _context5.sent;

                          if (!twitchUser) {
                            _context5.next = 30;
                            break;
                          }

                          if (!(twitchUser.data.length > 0)) {
                            _context5.next = 30;
                            break;
                          }

                          _context5.next = 20;
                          return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getVideos"])(twitchUser.data[0].id);

                        case 20:
                          videos = _context5.sent;

                          if (!(videos.data.length > 0)) {
                            _context5.next = 30;
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

                          _context5.next = 27;
                          return Promise.all(_clips);

                        case 27:
                          c = _context5.sent;
                          // console.log(c);
                          streams = c.filter(function (ele) {
                            return ele.game === "PLAYERUNKNOWN'S BATTLEGROUNDS";
                          }); // debugger

                          return _context5.abrupt("return", streams);

                        case 30:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5);
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

              _context6.next = 7;
              return getStreams(uname, gtag);

            case 7:
              allVids = _context6.sent;
              Object(_scripts_streams__WEBPACK_IMPORTED_MODULE_4__["displayStreams"])(kAV, allVids, gtag);

            case 9:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
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
    _getPlayer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
      var gamertag, splash, logo, fetchingPlayer, matches, fetchingMatches, games, fetchingEvents, telemetry, fetchingKillsAndDeaths, fetchingVideos, _iterator2, _step2, _loop, final;

      return regeneratorRuntime.wrap(function _callee12$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              gamertag = document.getElementsByClassName("gamertag-field")[0].value;
              splash = document.getElementsByClassName("splash-content")[0];
              logo = document.getElementsByClassName("logo")[0];
              fetchingPlayer = document.createElement("span");
              fetchingPlayer.classList.add("loading1", "loading");
              fetchingPlayer.innerHTML = 'Fetching Player ...';
              splash.appendChild(fetchingPlayer);
              _context13.next = 9;
              return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getPlayerByName"])(gamertag);

            case 9:
              matches = _context13.sent;
              console.log(matches);
              actualMatches = matches.map( /*#__PURE__*/function () {
                var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(match) {
                  return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          _context7.next = 2;
                          return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getMatch"])(match.id);

                        case 2:
                          return _context7.abrupt("return", _context7.sent);

                        case 3:
                        case "end":
                          return _context7.stop();
                      }
                    }
                  }, _callee7);
                }));

                return function (_x6) {
                  return _ref5.apply(this, arguments);
                };
              }());
              fetchingPlayer.style.display = "none";
              fetchingMatches = document.createElement("span");
              fetchingMatches.classList.add("loading2", "loading");
              fetchingMatches.innerHTML = 'Fetching Matches ...';
              splash.appendChild(fetchingMatches);
              _context13.next = 19;
              return Promise.allSettled(actualMatches);

            case 19:
              games = _context13.sent;
              // console.log(games)
              fetchingMatches.style.display = "none";
              fetchingEvents = document.createElement("span");
              fetchingEvents.classList.add("loading3", "loading");
              fetchingEvents.innerHTML = 'Fetching Events ...';
              splash.appendChild(fetchingEvents);
              games.forEach( /*#__PURE__*/function () {
                var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(match) {
                  return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          if (match.value) {
                            if (match.value.included) {
                              match.value.included.forEach( /*#__PURE__*/function () {
                                var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(ele) {
                                  return regeneratorRuntime.wrap(function _callee8$(_context8) {
                                    while (1) {
                                      switch (_context8.prev = _context8.next) {
                                        case 0:
                                          if (ele.id === match.value.data.relationships.assets.data[0].id) {
                                            events.push(Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getTelemetry"])(ele.attributes.URL));
                                          }

                                        case 1:
                                        case "end":
                                          return _context8.stop();
                                      }
                                    }
                                  }, _callee8);
                                }));

                                return function (_x8) {
                                  return _ref7.apply(this, arguments);
                                };
                              }());
                            }
                          }

                        case 1:
                        case "end":
                          return _context9.stop();
                      }
                    }
                  }, _callee9);
                }));

                return function (_x7) {
                  return _ref6.apply(this, arguments);
                };
              }());
              _context13.next = 28;
              return Promise.allSettled(events);

            case 28:
              telemetry = _context13.sent;
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
              _context13.prev = 41;
              _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop() {
                var tEvent, eventTimestamp, twitchUser, videos, _twitchUser, _videos;

                return regeneratorRuntime.wrap(function _loop$(_context12) {
                  while (1) {
                    switch (_context12.prev = _context12.next) {
                      case 0:
                        tEvent = _step2.value;
                        eventTimestamp = tEvent._D;

                        if (!tEvent.killer) {
                          _context12.next = 17;
                          break;
                        }

                        if (BLACKLISTED[tEvent.killer.name]) {
                          _context12.next = 17;
                          break;
                        }

                        _context12.next = 6;
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
                        twitchUser = _context12.sent;

                        if (!twitchUser) {
                          _context12.next = 16;
                          break;
                        }

                        if (!(twitchUser.data.length > 0)) {
                          _context12.next = 14;
                          break;
                        }

                        _context12.next = 11;
                        return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getVideos"])(twitchUser.data[0].id);

                      case 11:
                        videos = _context12.sent;

                        if (videos.data.length > 0) {
                          videos.data.map( /*#__PURE__*/function () {
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

                            return function (_x9) {
                              return _ref8.apply(this, arguments);
                            };
                          }());
                        }

                        BLACKLISTED[tEvent.killer.name] = tEvent.killer.name;

                      case 14:
                        _context12.next = 17;
                        break;

                      case 16:
                        BLACKLISTED[tEvent.killer.name] = tEvent.killer.name;

                      case 17:
                        if (!tEvent.victim) {
                          _context12.next = 32;
                          break;
                        }

                        if (BLACKLISTED[tEvent.victim.name]) {
                          _context12.next = 32;
                          break;
                        }

                        _context12.next = 21;
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
                        _twitchUser = _context12.sent;

                        if (!_twitchUser) {
                          _context12.next = 31;
                          break;
                        }

                        if (!(_twitchUser.data.length > 0)) {
                          _context12.next = 28;
                          break;
                        }

                        _context12.next = 26;
                        return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getVideos"])(_twitchUser.data[0].id);

                      case 26:
                        _videos = _context12.sent;

                        if (_videos.data.length > 0) {
                          _videos.data.map( /*#__PURE__*/function () {
                            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(vid) {
                              var clip;
                              return regeneratorRuntime.wrap(function _callee11$(_context11) {
                                while (1) {
                                  switch (_context11.prev = _context11.next) {
                                    case 0:
                                      _context11.next = 2;
                                      return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getPubgVideos"])(vid.id).then(function (response) {
                                        if (response.ok) {
                                          return response.json();
                                        } else {
                                          return false;
                                        }
                                      });

                                    case 2:
                                      clip = _context11.sent;

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
                                      return _context11.stop();
                                  }
                                }
                              }, _callee11);
                            }));

                            return function (_x10) {
                              return _ref9.apply(this, arguments);
                            };
                          }());
                        }

                      case 28:
                        BLACKLISTED[tEvent.victim.name] = tEvent.victim.name;
                        _context12.next = 32;
                        break;

                      case 31:
                        BLACKLISTED[tEvent.victim.name] = tEvent.victim.name;

                      case 32:
                      case "end":
                        return _context12.stop();
                    }
                  }
                }, _loop);
              });

              _iterator2.s();

            case 44:
              if ((_step2 = _iterator2.n()).done) {
                _context13.next = 48;
                break;
              }

              return _context13.delegateYield(_loop(), "t0", 46);

            case 46:
              _context13.next = 44;
              break;

            case 48:
              _context13.next = 53;
              break;

            case 50:
              _context13.prev = 50;
              _context13.t1 = _context13["catch"](41);

              _iterator2.e(_context13.t1);

            case 53:
              _context13.prev = 53;

              _iterator2.f();

              return _context13.finish(53);

            case 56:
              _context13.next = 58;
              return Promise.allSettled(clips);

            case 58:
              final = _context13.sent;

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
              return _context13.stop();
          }
        }
      }, _callee12, null, [[41, 50, 53, 56]]);
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
    method: 'get',
    headers: {
      Authorization: "Bearer ".concat(_config_keys__WEBPACK_IMPORTED_MODULE_0___default.a.pubgAPI),
      Accept: 'application/vnd.api+json'
    }
  };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZy9rZXlzX2Rldi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZGF0ZV9jb252ZXJ0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbm9fdmlkZW9zX2ZvdW5kLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3NlYXJjaF91dGlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvc3RyZWFtcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL2luZGV4LnNjc3MiXSwibmFtZXMiOlsicHJvY2VzcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZXF1aXJlIiwicHViZ0FQSSIsInR3aXRjaEFQSSIsImNsaWVudFNFQ1JFVCIsIm9BVVRIIiwiZ2FtZUlEIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwidGVzdCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJhIiwiZ2V0TWF0Y2giLCJjb25zb2xlIiwibG9nIiwiQkxBQ0tMSVNURUQiLCJrQVYiLCJhY3R1YWwiLCJzdHJlYW1zIiwiY29udGFpbmVyIiwicXVlcnlTZWxlY3RvciIsImdldFBsYXllciIsImlucHV0IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsInN0eWxlIiwiZGlzcGxheSIsInVuIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJndCIsInN1Ym1pdCIsImlubmVySFRNTCIsImdldEVsZW1lbnRCeUlkIiwiZSIsImdldElucHV0IiwiZ2V0U3RyZWFtcyIsInVuYW1lIiwiZ3RhZyIsImdldFBsYXllckJ5TmFtZSIsIm1hdGNoZXMiLCJtYXAiLCJtYXRjaCIsImlkIiwiUHJvbWlzZSIsImFsbFNldHRsZWQiLCJnYW1lcyIsImZvckVhY2giLCJ2YWx1ZSIsImluY2x1ZGVkIiwiZWxlIiwiZGF0YSIsInJlbGF0aW9uc2hpcHMiLCJhc3NldHMiLCJldmVudHMiLCJwdXNoIiwiZ2V0VGVsZW1ldHJ5IiwiYXR0cmlidXRlcyIsIlVSTCIsInRlbGVtZXRyeSIsImV2ZW50IiwiX1QiLCJraWxsZXIiLCJuYW1lIiwidmljdGltIiwiZ2V0VHdpdGNoVXNlciIsInRoZW4iLCJyZXNwb25zZSIsIm9rIiwianNvbiIsInR3aXRjaFVzZXIiLCJsZW5ndGgiLCJnZXRWaWRlb3MiLCJ2aWRlb3MiLCJjbGlwcyIsInZpZCIsImdldFB1YmdWaWRlb3MiLCJhbGwiLCJjIiwiZmlsdGVyIiwiZ2FtZSIsImZwIiwiYWxsVmlkcyIsImRpc3BsYXlTdHJlYW1zIiwiYWN0dWFsTWF0Y2hlcyIsInRlbGVtZXRyeUV2ZW50cyIsImdhbWVydGFnIiwic3BsYXNoIiwibG9nbyIsImZldGNoaW5nUGxheWVyIiwiZmV0Y2hpbmdNYXRjaGVzIiwiZmV0Y2hpbmdFdmVudHMiLCJmZXRjaGluZ0tpbGxzQW5kRGVhdGhzIiwiZmV0Y2hpbmdWaWRlb3MiLCJ0RXZlbnQiLCJldmVudFRpbWVzdGFtcCIsIl9EIiwiY2xpcCIsInRpbWVHcmVhdGVyVGhhbiIsImNyZWF0ZWRfYXQiLCJ0aW1lR3JlYXRlclRoYW4yIiwidXJsIiwidGltZXN0YW1wIiwiZmluYWwiLCJub1ZpZGVvc0ZvdW5kIiwidmlkZW9zRm91bmQiLCJkYXRlQ29udmVydGVyIiwidWdseURhdGUiLCJmYWtlSGFsZiIsInNwbGl0IiwicmVhbEhhbGYiLCJyZWFsRGF0ZSIsIk1PTlRIUyIsInBhcmVudCIsImJ1dHRvbiIsInBsYXllciIsIm1lc3NhZ2UiLCJib2R5Iiwib25jbGljayIsIndpbmRvdyIsImxvY2F0aW9uIiwibGlzdE9mVmlkcyIsImkiLCJ1bCIsIm1vZGFsIiwiZGl2IiwiYnRuIiwibmFtZXMiLCJqIiwib3B0aW9ucyIsIndpZHRoIiwiaGVpZ2h0IiwiYXV0b3BsYXkiLCJ0aW1lIiwidGltZXN0YW1wSW5TZWNvbmRzIiwidmlkZW8iLCJ2b2QiLCJfaWQiLCJUd2l0Y2giLCJQbGF5ZXIiLCJzZXRWb2x1bWUiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYiIsInBhdXNlIiwiaXRlbSIsImZybSIsIngiLCJwbGF5ZXJCeU5hbWVJbml0IiwibWV0aG9kIiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJLZXkiLCJBY2NlcHQiLCJyZXF1ZXN0IiwiUmVxdWVzdCIsImZldGNoIiwibWF0Y2hJZCIsImdhbWVJbml0IiwidGVsZW1ldHJ5SW5pdCIsImdldE9BdXRoIiwib2F1dGhJbml0IiwidHdpdGNoVXNlckluaXQiLCJ1c2VySWQiLCJ0d2l0Y2hWaWRlb3NJbml0IiwidmlkZW9JZCIsInR3aXRjaFB1YmdJbml0IiwidDEiLCJ0MiIsInQzIiwiRGF0ZSIsInQ0Iiwic2Vjb25kcyIsInNldEhvdXJzIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZ2V0U2Vjb25kcyIsInNlY3MiLCJ0Iiwic2V0U2Vjb25kcyIsInRvSVNPU3RyaW5nIiwic3Vic3RyIiwidGltZXN0YW1wMiIsIm5UIiwidmlkZW9IYXNFdmVudHMiLCJwbHlyIiwidGl0bGUiLCJtb2RhbF9jb250ZW50IiwidmlkZW9faWQiLCJsaSIsInNlZWsiLCJOdW1iZXIiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0I7O0FBRWhCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDOztBQUVBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsMENBQTBDO0FBQzFDOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHlEQUF5RDtBQUN6RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkdBQTZHO0FBQzdHOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVc7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsd0NBQXdDO0FBQ3hDLDJCQUEyQjtBQUMzQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Qsb0NBQW9DO0FBQ3BDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsb0NBQW9DLGNBQWM7QUFDbEQ7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRDs7QUFFaEQsc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBLEdBQUcsZ0NBQWdDLGtCQUFrQjtBQUNyRDs7O0FBR0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUI7QUFDbkI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSw4Q0FBOEMsUUFBUTtBQUN0RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBLDhDQUE4QyxRQUFRO0FBQ3REOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLDhDQUE4QyxRQUFRO0FBQ3REOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDs7O0FBR0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsS0FBMEIsb0JBQW9CLFNBQUU7O0FBRWhEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7OztBQ2p0QkEsSUFBR0EsS0FBSCxFQUEwQyxFQUExQyxNQUVPO0FBQ0hDLFFBQU0sQ0FBQ0MsT0FBUCxHQUFpQkMsbUJBQU8sQ0FBQyw0Q0FBRCxDQUF4QjtBQUNILEM7Ozs7Ozs7Ozs7O0FDSkRGLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUNiRSxTQUFPLEVBQUUsaVFBREk7QUFFYkMsV0FBUyxFQUFFLGdDQUZFO0FBR2JDLGNBQVksRUFBRSxnQ0FIRDtBQUliQyxPQUFLLEVBQUUsZ0NBSk07QUFLYkMsUUFBTSxFQUFFO0FBTEssQ0FBakIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFDLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07QUFDaEQsTUFBTUMsSUFBSSxHQUFHRixRQUFRLENBQUNHLHNCQUFULENBQWdDLE1BQWhDLEVBQXdDLENBQXhDLENBQWI7QUFDQSxNQUFJQyxDQUFKO0FBQ0FGLE1BQUksQ0FBQ0QsZ0JBQUwsQ0FBc0IsT0FBdEIsdUVBQStCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNqQkksMEVBQVEsQ0FBQyxzQ0FBRCxDQURTOztBQUFBO0FBQzNCRCxhQUQyQjtBQUUzQkUsbUJBQU8sQ0FBQ0MsR0FBUixDQUFZSCxDQUFaOztBQUYyQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUEvQjtBQUlBLE1BQUlJLFdBQVcsR0FBRyxFQUFsQjtBQUNBLE1BQUlDLEdBQUcsR0FBRyxFQUFWO0FBQ0EsTUFBSUMsTUFBSjtBQUNBLE1BQUlDLE9BQU8sR0FBRyxFQUFkLENBVmdELENBV2hEOztBQUNBLE1BQU1DLFNBQVMsR0FBR1osUUFBUSxDQUFDRyxzQkFBVCxDQUFnQyxZQUFoQyxFQUE4QyxDQUE5QyxDQUFsQjtBQUNBSCxVQUFRLENBQUNhLGFBQVQsQ0FBdUIsWUFBdkIsRUFBcUNaLGdCQUFyQyxDQUFzRCxPQUF0RCxFQUErRGEsU0FBL0Q7QUFFQSxNQUFNQyxLQUFLLEdBQUdmLFFBQVEsQ0FBQ2dCLGFBQVQsQ0FBdUIsU0FBdkIsQ0FBZDtBQUNBRCxPQUFLLENBQUNFLFNBQU4sQ0FBZ0JDLEdBQWhCLENBQW9CLGlCQUFwQjtBQUNBSCxPQUFLLENBQUNJLEtBQU4sQ0FBWUMsT0FBWixHQUFzQixNQUF0QjtBQUNBLE1BQU1DLEVBQUUsR0FBR3JCLFFBQVEsQ0FBQ2dCLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBWDtBQUNBSyxJQUFFLENBQUNDLFlBQUgsQ0FBZ0IsTUFBaEIsRUFBd0IsTUFBeEI7QUFDQUQsSUFBRSxDQUFDQyxZQUFILENBQWdCLGFBQWhCLEVBQStCLGFBQS9CO0FBQ0FELElBQUUsQ0FBQ0osU0FBSCxDQUFhQyxHQUFiLENBQWlCLFVBQWpCO0FBQ0FILE9BQUssQ0FBQ1EsV0FBTixDQUFrQkYsRUFBbEI7QUFDQSxNQUFNRyxFQUFFLEdBQUd4QixRQUFRLENBQUNnQixhQUFULENBQXVCLE9BQXZCLENBQVg7QUFDQVEsSUFBRSxDQUFDRixZQUFILENBQWdCLE1BQWhCLEVBQXdCLE1BQXhCO0FBQ0FFLElBQUUsQ0FBQ0YsWUFBSCxDQUFnQixhQUFoQixFQUErQixXQUEvQjtBQUNBRSxJQUFFLENBQUNQLFNBQUgsQ0FBYUMsR0FBYixDQUFpQixVQUFqQjtBQUNBSCxPQUFLLENBQUNRLFdBQU4sQ0FBa0JDLEVBQWxCO0FBQ0EsTUFBTUMsTUFBTSxHQUFHekIsUUFBUSxDQUFDZ0IsYUFBVCxDQUF1QixNQUF2QixDQUFmO0FBQ0FTLFFBQU0sQ0FBQ1IsU0FBUCxDQUFpQkMsR0FBakIsQ0FBcUIsZUFBckI7QUFDQU8sUUFBTSxDQUFDQyxTQUFQLEdBQW1CLFFBQW5CO0FBQ0FYLE9BQUssQ0FBQ1EsV0FBTixDQUFrQkUsTUFBbEI7QUFDQWIsV0FBUyxDQUFDVyxXQUFWLENBQXNCUixLQUF0QjtBQUVBZixVQUFRLENBQUMyQixjQUFULENBQXdCLFlBQXhCLEVBQXNDMUIsZ0JBQXRDLENBQXVELE9BQXZELEVBQWdFLFVBQUEyQixDQUFDLEVBQUk7QUFDakUsUUFBR2IsS0FBSyxDQUFDSSxLQUFOLENBQVlDLE9BQVosS0FBd0IsTUFBM0IsRUFBbUM7QUFDL0JMLFdBQUssQ0FBQ0ksS0FBTixDQUFZQyxPQUFaLEdBQXNCLE1BQXRCO0FBQ0gsS0FGRCxNQUVNO0FBQ0ZMLFdBQUssQ0FBQ0ksS0FBTixDQUFZQyxPQUFaLEdBQXNCLE1BQXRCO0FBQ0g7QUFDSixHQU5EO0FBUUFwQixVQUFRLENBQUNhLGFBQVQsQ0FBdUIsZ0JBQXZCLEVBQXlDWixnQkFBekMsQ0FBMEQsT0FBMUQsRUFBbUU0QixRQUFuRTs7QUExQ2dELFdBNENqQ0EsUUE1Q2lDO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHdFQTRDaEQ7QUFBQSxvQ0FlbUJDLFVBZm5COztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxzRkFlSSxrQkFBMEJDLEtBQTFCLEVBQWlDQyxJQUFqQztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQ0FDd0JDLGlGQUFlLENBQUNELElBQUQsQ0FEdkM7O0FBQUE7QUFDUUUsaUNBRFI7QUFFSTVCLGlDQUFPLENBQUNDLEdBQVIsQ0FBWTJCLE9BQVo7QUFDQXhCLGdDQUFNLEdBQUd3QixPQUFPLENBQUNDLEdBQVI7QUFBQSxnR0FBWSxrQkFBTUMsS0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw2Q0FDSi9CLDBFQUFRLENBQUMrQixLQUFLLENBQUNDLEVBQVAsQ0FESjs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDZCQUFaOztBQUFBO0FBQUE7QUFBQTtBQUFBLDhCQUFUO0FBSEo7QUFBQSxpQ0FPc0JDLE9BQU8sQ0FBQ0MsVUFBUixDQUFtQjdCLE1BQW5CLENBUHRCOztBQUFBO0FBT1E4QiwrQkFQUjtBQVFJO0FBRUFBLCtCQUFLLENBQUNDLE9BQU47QUFBQSxnR0FBYyxrQkFBTUwsS0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1YsMENBQUdBLEtBQUssQ0FBQ00sS0FBVCxFQUFlO0FBQ1gsNENBQUdOLEtBQUssQ0FBQ00sS0FBTixDQUFZQyxRQUFmLEVBQXlCO0FBQ3JCUCwrQ0FBSyxDQUFDTSxLQUFOLENBQVlDLFFBQVosQ0FBcUJGLE9BQXJCO0FBQUEsZ0hBQTZCLGtCQUFNRyxHQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDekIsMERBQUdBLEdBQUcsQ0FBQ1AsRUFBSixLQUFXRCxLQUFLLENBQUNNLEtBQU4sQ0FBWUcsSUFBWixDQUFpQkMsYUFBakIsQ0FBK0JDLE1BQS9CLENBQXNDRixJQUF0QyxDQUEyQyxDQUEzQyxFQUE4Q1IsRUFBNUQsRUFBZ0U7QUFDNURXLDhEQUFNLENBQUNDLElBQVAsQ0FBWUMsOEVBQVksQ0FBQ04sR0FBRyxDQUFDTyxVQUFKLENBQWVDLEdBQWhCLENBQXhCO0FBQ0g7O0FBSHdCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDZDQUE3Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtIO0FBQ0o7O0FBVFM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsNkJBQWQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFWSjtBQUFBLGlDQXNCMEJkLE9BQU8sQ0FBQ0MsVUFBUixDQUFtQlMsTUFBbkIsQ0F0QjFCOztBQUFBO0FBc0JRSyxtQ0F0QlI7QUF3Qkk7QUFDQUEsbUNBQVMsQ0FBQ1osT0FBVixDQUFrQixVQUFBYSxLQUFLLEVBQUk7QUFDdkJBLGlDQUFLLENBQUNaLEtBQU4sQ0FBWUQsT0FBWixDQUFvQixVQUFBbEMsR0FBRyxFQUFJO0FBQ3ZCLGtDQUFLQSxHQUFHLENBQUNnRCxFQUFKLEtBQVcsZUFBWCxJQUE4QmhELEdBQUcsQ0FBQ2lELE1BQW5DLElBQThDakQsR0FBRyxDQUFDaUQsTUFBSixDQUFXQyxJQUFYLEtBQW9CekIsSUFBbkUsSUFBOEV6QixHQUFHLENBQUNnRCxFQUFKLEtBQVcsZUFBWCxJQUE4QmhELEdBQUcsQ0FBQ21ELE1BQW5DLElBQThDbkQsR0FBRyxDQUFDbUQsTUFBSixDQUFXRCxJQUFYLEtBQW9CekIsSUFBbEosRUFBd0o7QUFDcEp2QixtQ0FBRyxDQUFDd0MsSUFBSixDQUFTMUMsR0FBVDtBQUNIO0FBQ0osNkJBSkQ7QUFLSCwyQkFORCxFQXpCSixDQWdDSTs7QUFoQ0o7QUFBQSxpQ0FrQzJCb0QsK0VBQWEsQ0FBQzVCLEtBQUQsQ0FBYixDQUFxQjZCLElBQXJCLENBQTBCLFVBQVNDLFFBQVQsRUFBbUI7QUFDaEUsZ0NBQUdBLFFBQVEsQ0FBQ0MsRUFBWixFQUFnQjtBQUNaLHFDQUFPRCxRQUFRLENBQUNFLElBQVQsR0FBZ0JILElBQWhCLENBQXFCLFVBQUFHLElBQUksRUFBSTtBQUNoQyx1Q0FBT0EsSUFBUDtBQUNILCtCQUZNLENBQVA7QUFHSCw2QkFKRCxNQUlPO0FBQ0gscUNBQU8sS0FBUDtBQUNIO0FBQ0osMkJBUnNCLENBbEMzQjs7QUFBQTtBQWtDUUMsb0NBbENSOztBQUFBLCtCQTJDT0EsVUEzQ1A7QUFBQTtBQUFBO0FBQUE7O0FBQUEsZ0NBNENXQSxVQUFVLENBQUNuQixJQUFYLENBQWdCb0IsTUFBaEIsR0FBeUIsQ0E1Q3BDO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsaUNBNkMrQkMsMkVBQVMsQ0FBQ0YsVUFBVSxDQUFDbkIsSUFBWCxDQUFnQixDQUFoQixFQUFtQlIsRUFBcEIsQ0E3Q3hDOztBQUFBO0FBNkNnQjhCLGdDQTdDaEI7O0FBQUEsZ0NBOENlQSxNQUFNLENBQUN0QixJQUFQLENBQVlvQixNQUFaLEdBQXFCLENBOUNwQztBQUFBO0FBQUE7QUFBQTs7QUErQ29CRyxnQ0EvQ3BCLEdBK0M0QixFQS9DNUI7QUFBQSxpRUFnRGlDRCxNQUFNLENBQUN0QixJQWhEeEM7O0FBQUE7QUFnRGdCLGdGQUE4QjtBQUFwQndCLGlDQUFvQjs7QUFDMUJELG9DQUFLLENBQUNuQixJQUFOLENBQVdxQiwrRUFBYSxDQUFDRCxHQUFHLENBQUNoQyxFQUFMLENBQWIsQ0FBc0J1QixJQUF0QixDQUEyQixVQUFTQyxRQUFULEVBQW1CO0FBQ3JELG9DQUFHQSxRQUFRLENBQUNDLEVBQVosRUFBZ0I7QUFDWix5Q0FBT0QsUUFBUSxDQUFDRSxJQUFULEVBQVA7QUFDSCxpQ0FGRCxNQUVNO0FBQ0YseUNBQU8sS0FBUDtBQUNIO0FBQ0osK0JBTlUsQ0FBWDtBQU9IO0FBeERqQjtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsaUNBeUQ4QnpCLE9BQU8sQ0FBQ2lDLEdBQVIsQ0FBWUgsTUFBWixDQXpEOUI7O0FBQUE7QUF5RG9CSSwyQkF6RHBCO0FBMERnQjtBQUNBN0QsaUNBQU8sR0FBRzZELENBQUMsQ0FBQ0MsTUFBRixDQUFTLFVBQUE3QixHQUFHO0FBQUEsbUNBQUlBLEdBQUcsQ0FBQzhCLElBQUosS0FBYSwrQkFBakI7QUFBQSwyQkFBWixDQUFWLENBM0RoQixDQTREZ0I7O0FBNURoQiw0REE2RHVCL0QsT0E3RHZCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQWZKO0FBQUE7QUFBQTs7QUFlbUJtQix3QkFmbkI7QUFBQTtBQUFBOztBQUNVQyxtQkFEVixHQUNrQi9CLFFBQVEsQ0FBQ0csc0JBQVQsQ0FBZ0MsVUFBaEMsRUFBNEMsQ0FBNUMsRUFBK0N1QyxLQURqRTtBQUVVVixrQkFGVixHQUVpQmhDLFFBQVEsQ0FBQ0csc0JBQVQsQ0FBZ0MsVUFBaEMsRUFBNEMsQ0FBNUMsRUFBK0N1QyxLQUZoRTs7QUFJSSxrQkFBR1gsS0FBSyxJQUFJQyxJQUFaLEVBQWtCO0FBQ1IyQyxrQkFEUSxHQUNIM0UsUUFBUSxDQUFDZ0IsYUFBVCxDQUF1QixNQUF2QixDQURHO0FBRWQyRCxrQkFBRSxDQUFDMUQsU0FBSCxDQUFhQyxHQUFiLENBQWlCLFVBQWpCLEVBQTZCLE1BQTdCO0FBQ0F5RCxrQkFBRSxDQUFDakQsU0FBSCxHQUFlLHFCQUFmO0FBQ0FYLHFCQUFLLENBQUNRLFdBQU4sQ0FBa0JvRCxFQUFsQjtBQUNIOztBQVRMO0FBQUEscUJBV3dCN0MsVUFBVSxDQUFDQyxLQUFELEVBQVFDLElBQVIsQ0FYbEM7O0FBQUE7QUFXUTRDLHFCQVhSO0FBWUlDLHFGQUFjLENBQUNwRSxHQUFELEVBQU1tRSxPQUFOLEVBQWU1QyxJQUFmLENBQWQ7O0FBWko7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0E1Q2dEO0FBQUE7QUFBQTs7QUErSGhELE1BQUk4QyxhQUFhLEdBQUcsRUFBcEI7QUFDQSxNQUFJOUIsTUFBTSxHQUFHLEVBQWI7QUFDQSxNQUFJK0IsZUFBZSxHQUFHLEVBQXRCO0FBQ0EsTUFBSVgsS0FBSyxHQUFHLEVBQVo7O0FBbElnRCxXQW1JakN0RCxTQW5JaUM7QUFBQTtBQUFBOztBQUFBO0FBQUEseUVBbUloRDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1FrRSxzQkFEUixHQUNtQmhGLFFBQVEsQ0FBQ0csc0JBQVQsQ0FBZ0MsZ0JBQWhDLEVBQWtELENBQWxELEVBQXFEdUMsS0FEeEU7QUFFVXVDLG9CQUZWLEdBRW1CakYsUUFBUSxDQUFDRyxzQkFBVCxDQUFnQyxnQkFBaEMsRUFBa0QsQ0FBbEQsQ0FGbkI7QUFHVStFLGtCQUhWLEdBR2lCbEYsUUFBUSxDQUFDRyxzQkFBVCxDQUFnQyxNQUFoQyxFQUF3QyxDQUF4QyxDQUhqQjtBQUlVZ0YsNEJBSlYsR0FJMkJuRixRQUFRLENBQUNnQixhQUFULENBQXVCLE1BQXZCLENBSjNCO0FBS0ltRSw0QkFBYyxDQUFDbEUsU0FBZixDQUF5QkMsR0FBekIsQ0FBNkIsVUFBN0IsRUFBeUMsU0FBekM7QUFDQWlFLDRCQUFjLENBQUN6RCxTQUFmLEdBQTJCLHFCQUEzQjtBQUNBdUQsb0JBQU0sQ0FBQzFELFdBQVAsQ0FBbUI0RCxjQUFuQjtBQVBKO0FBQUEscUJBUXdCbEQsaUZBQWUsQ0FBQytDLFFBQUQsQ0FSdkM7O0FBQUE7QUFRUTlDLHFCQVJSO0FBU0k1QixxQkFBTyxDQUFDQyxHQUFSLENBQVkyQixPQUFaO0FBQ0E0QywyQkFBYSxHQUFHNUMsT0FBTyxDQUFDQyxHQUFSO0FBQUEsb0ZBQVksa0JBQU1DLEtBQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUNBQ1gvQiwwRUFBUSxDQUFDK0IsS0FBSyxDQUFDQyxFQUFQLENBREc7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFBaEI7QUFJQThDLDRCQUFjLENBQUNoRSxLQUFmLENBQXFCQyxPQUFyQixHQUErQixNQUEvQjtBQUNNZ0UsNkJBZlYsR0FlNEJwRixRQUFRLENBQUNnQixhQUFULENBQXVCLE1BQXZCLENBZjVCO0FBZ0JJb0UsNkJBQWUsQ0FBQ25FLFNBQWhCLENBQTBCQyxHQUExQixDQUE4QixVQUE5QixFQUEwQyxTQUExQztBQUNBa0UsNkJBQWUsQ0FBQzFELFNBQWhCLEdBQTRCLHNCQUE1QjtBQUNBdUQsb0JBQU0sQ0FBQzFELFdBQVAsQ0FBbUI2RCxlQUFuQjtBQWxCSjtBQUFBLHFCQW9Cc0I5QyxPQUFPLENBQUNDLFVBQVIsQ0FBbUJ1QyxhQUFuQixDQXBCdEI7O0FBQUE7QUFvQlF0QyxtQkFwQlI7QUFxQkk7QUFHQTRDLDZCQUFlLENBQUNqRSxLQUFoQixDQUFzQkMsT0FBdEIsR0FBZ0MsTUFBaEM7QUFDTWlFLDRCQXpCVixHQXlCMkJyRixRQUFRLENBQUNnQixhQUFULENBQXVCLE1BQXZCLENBekIzQjtBQTBCSXFFLDRCQUFjLENBQUNwRSxTQUFmLENBQXlCQyxHQUF6QixDQUE2QixVQUE3QixFQUF5QyxTQUF6QztBQUNBbUUsNEJBQWMsQ0FBQzNELFNBQWYsR0FBMkIscUJBQTNCO0FBQ0F1RCxvQkFBTSxDQUFDMUQsV0FBUCxDQUFtQjhELGNBQW5CO0FBRUE3QyxtQkFBSyxDQUFDQyxPQUFOO0FBQUEsb0ZBQWMsa0JBQU1MLEtBQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNWLDhCQUFHQSxLQUFLLENBQUNNLEtBQVQsRUFBZTtBQUNYLGdDQUFHTixLQUFLLENBQUNNLEtBQU4sQ0FBWUMsUUFBZixFQUF5QjtBQUNyQlAsbUNBQUssQ0FBQ00sS0FBTixDQUFZQyxRQUFaLENBQXFCRixPQUFyQjtBQUFBLG9HQUE2QixrQkFBTUcsR0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ3pCLDhDQUFHQSxHQUFHLENBQUNQLEVBQUosS0FBV0QsS0FBSyxDQUFDTSxLQUFOLENBQVlHLElBQVosQ0FBaUJDLGFBQWpCLENBQStCQyxNQUEvQixDQUFzQ0YsSUFBdEMsQ0FBMkMsQ0FBM0MsRUFBOENSLEVBQTVELEVBQWdFO0FBQzVEVyxrREFBTSxDQUFDQyxJQUFQLENBQVlDLDhFQUFZLENBQUNOLEdBQUcsQ0FBQ08sVUFBSixDQUFlQyxHQUFoQixDQUF4QjtBQUNIOztBQUh3QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQ0FBN0I7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLSDtBQUNKOztBQVRTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFkOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBOUJKO0FBQUEscUJBMEMwQmQsT0FBTyxDQUFDQyxVQUFSLENBQW1CUyxNQUFuQixDQTFDMUI7O0FBQUE7QUEwQ1FLLHVCQTFDUjtBQTRDSWdDLDRCQUFjLENBQUNsRSxLQUFmLENBQXFCQyxPQUFyQixHQUErQixNQUEvQjtBQUNNa0Usb0NBN0NWLEdBNkNtQ3RGLFFBQVEsQ0FBQ2dCLGFBQVQsQ0FBdUIsTUFBdkIsQ0E3Q25DO0FBOENJc0Usb0NBQXNCLENBQUNyRSxTQUF2QixDQUFpQ0MsR0FBakMsQ0FBcUMsVUFBckMsRUFBaUQsU0FBakQ7QUFDQW9FLG9DQUFzQixDQUFDNUQsU0FBdkIsR0FBbUMsK0JBQW5DO0FBQ0F1RCxvQkFBTSxDQUFDMUQsV0FBUCxDQUFtQitELHNCQUFuQixFQWhESixDQWlESTs7QUFDQWpDLHVCQUFTLENBQUNaLE9BQVYsQ0FBa0IsVUFBQWEsS0FBSyxFQUFJO0FBQ3ZCQSxxQkFBSyxDQUFDWixLQUFOLENBQVlELE9BQVosQ0FBb0IsVUFBQWxDLEdBQUcsRUFBSTtBQUN2QixzQkFBS0EsR0FBRyxDQUFDZ0QsRUFBSixLQUFXLGVBQVgsSUFBOEJoRCxHQUFHLENBQUNpRCxNQUFuQyxJQUE4Q2pELEdBQUcsQ0FBQ2lELE1BQUosQ0FBV0MsSUFBWCxLQUFvQnVCLFFBQW5FLElBQWtGekUsR0FBRyxDQUFDZ0QsRUFBSixLQUFXLGVBQVgsSUFBOEJoRCxHQUFHLENBQUNtRCxNQUFuQyxJQUE4Q25ELEdBQUcsQ0FBQ21ELE1BQUosQ0FBV0QsSUFBWCxLQUFvQnVCLFFBQXRKLEVBQWdLO0FBQzVKRCxtQ0FBZSxDQUFDOUIsSUFBaEIsQ0FBcUIxQyxHQUFyQjtBQUNIO0FBQ0osaUJBSkQ7QUFLSCxlQU5ELEVBbERKLENBeURJOztBQUNBK0Usb0NBQXNCLENBQUNuRSxLQUF2QixDQUE2QkMsT0FBN0IsR0FBdUMsTUFBdkM7QUFDTW1FLDRCQTNEVixHQTJEMkJ2RixRQUFRLENBQUNnQixhQUFULENBQXVCLE1BQXZCLENBM0QzQjtBQTRESXVFLDRCQUFjLENBQUN0RSxTQUFmLENBQXlCQyxHQUF6QixDQUE2QixVQUE3QixFQUF5QyxTQUF6QztBQUNBcUUsNEJBQWMsQ0FBQzdELFNBQWYsR0FBMkIscUJBQTNCO0FBQ0F1RCxvQkFBTSxDQUFDMUQsV0FBUCxDQUFtQmdFLGNBQW5CO0FBOURKLHNEQStEd0JSLGVBL0R4QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQStEY1MsOEJBL0RkO0FBZ0VZQyxzQ0FoRVosR0FnRTZCRCxNQUFNLENBQUNFLEVBaEVwQzs7QUFBQSw2QkFpRVdGLE1BQU0sQ0FBQ2hDLE1BakVsQjtBQUFBO0FBQUE7QUFBQTs7QUFBQSw0QkFrRWdCaEQsV0FBVyxDQUFDZ0YsTUFBTSxDQUFDaEMsTUFBUCxDQUFjQyxJQUFmLENBbEUzQjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLCtCQW1FdUNFLCtFQUFhLENBQUM2QixNQUFNLENBQUNoQyxNQUFQLENBQWNDLElBQWYsQ0FBYixDQUFrQ0csSUFBbEMsQ0FBdUMsVUFBU0MsUUFBVCxFQUFtQjtBQUM3RSw4QkFBR0EsUUFBUSxDQUFDQyxFQUFaLEVBQWdCO0FBQ1osbUNBQU9ELFFBQVEsQ0FBQ0UsSUFBVCxHQUFnQkgsSUFBaEIsQ0FBcUIsVUFBQUcsSUFBSSxFQUFJO0FBQ2hDLHFDQUFPQSxJQUFQO0FBQ0gsNkJBRk0sQ0FBUDtBQUdILDJCQUpELE1BSU87QUFDSCxtQ0FBTyxLQUFQO0FBQ0g7QUFDSix5QkFSc0IsQ0FuRXZDOztBQUFBO0FBbUVvQkMsa0NBbkVwQjs7QUFBQSw2QkE0RW1CQSxVQTVFbkI7QUFBQTtBQUFBO0FBQUE7O0FBQUEsOEJBNkV1QkEsVUFBVSxDQUFDbkIsSUFBWCxDQUFnQm9CLE1BQWhCLEdBQXlCLENBN0VoRDtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLCtCQThFMkNDLDJFQUFTLENBQUNGLFVBQVUsQ0FBQ25CLElBQVgsQ0FBZ0IsQ0FBaEIsRUFBbUJSLEVBQXBCLENBOUVwRDs7QUFBQTtBQThFNEI4Qiw4QkE5RTVCOztBQStFd0IsNEJBQUdBLE1BQU0sQ0FBQ3RCLElBQVAsQ0FBWW9CLE1BQVosR0FBcUIsQ0FBeEIsRUFBMkI7QUFDdkJFLGdDQUFNLENBQUN0QixJQUFQLENBQVlWLEdBQVo7QUFBQSxnR0FBZ0IsbUJBQU1rQyxHQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsNkNBQ0tDLCtFQUFhLENBQUNELEdBQUcsQ0FBQ2hDLEVBQUwsQ0FBYixDQUFzQnVCLElBQXRCLENBQTJCLFVBQVNDLFFBQVQsRUFBbUI7QUFDM0QsNENBQUdBLFFBQVEsQ0FBQ0MsRUFBWixFQUFnQjtBQUNaLGlEQUFPRCxRQUFRLENBQUNFLElBQVQsRUFBUDtBQUNILHlDQUZELE1BRU07QUFDRixpREFBTyxLQUFQO0FBQ0g7QUFDSix1Q0FOZ0IsQ0FETDs7QUFBQTtBQUNSNEIsMENBRFE7O0FBUVosMENBQUdBLElBQUgsRUFBUztBQUNMO0FBQ0EsNENBQUdBLElBQUksQ0FBQ2pCLElBQUwsS0FBYywrQkFBakIsRUFBa0Q7QUFDOUM7QUFDQSw4Q0FBR2tCLGlGQUFlLENBQUNILGNBQUQsRUFBaUJFLElBQUksQ0FBQ0UsVUFBdEIsQ0FBZixJQUFvREMsa0ZBQWdCLENBQUNMLGNBQUQsRUFBaUJFLElBQUksQ0FBQ0UsVUFBdEIsRUFBa0NGLElBQUksQ0FBQzFCLE1BQXZDLENBQXZFLEVBQXVIO0FBQ25IO0FBQ0FHLGlEQUFLLENBQUNuQixJQUFOLENBQVc7QUFBQyxxREFBTzBDLElBQUksQ0FBQ0ksR0FBYjtBQUFrQixvRUFBc0JDLDJFQUFTLENBQUNQLGNBQUQsRUFBaUJFLElBQUksQ0FBQ0UsVUFBdEIsRUFBa0NGLElBQUksQ0FBQzFCLE1BQXZDLENBQWpEO0FBQWlHLHVEQUFTdUIsTUFBMUc7QUFBa0gscURBQU9HO0FBQXpILDZDQUFYO0FBQ0g7QUFDSjtBQUNKOztBQWpCVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw2QkFBaEI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFtQkg7O0FBQ0RuRixtQ0FBVyxDQUFDZ0YsTUFBTSxDQUFDaEMsTUFBUCxDQUFjQyxJQUFmLENBQVgsR0FBa0MrQixNQUFNLENBQUNoQyxNQUFQLENBQWNDLElBQWhEOztBQXBHeEI7QUFBQTtBQUFBOztBQUFBO0FBdUdvQmpELG1DQUFXLENBQUNnRixNQUFNLENBQUNoQyxNQUFQLENBQWNDLElBQWYsQ0FBWCxHQUFrQytCLE1BQU0sQ0FBQ2hDLE1BQVAsQ0FBY0MsSUFBaEQ7O0FBdkdwQjtBQUFBLDZCQTJHVytCLE1BQU0sQ0FBQzlCLE1BM0dsQjtBQUFBO0FBQUE7QUFBQTs7QUFBQSw0QkE0R2dCbEQsV0FBVyxDQUFDZ0YsTUFBTSxDQUFDOUIsTUFBUCxDQUFjRCxJQUFmLENBNUczQjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLCtCQTZHdUNFLCtFQUFhLENBQUM2QixNQUFNLENBQUM5QixNQUFQLENBQWNELElBQWYsQ0FBYixDQUFrQ0csSUFBbEMsQ0FBdUMsVUFBU0MsUUFBVCxFQUFtQjtBQUM3RSw4QkFBR0EsUUFBUSxDQUFDQyxFQUFaLEVBQWdCO0FBQ1osbUNBQU9ELFFBQVEsQ0FBQ0UsSUFBVCxHQUFnQkgsSUFBaEIsQ0FBcUIsVUFBQUcsSUFBSSxFQUFJO0FBQ2hDLHFDQUFPQSxJQUFQO0FBQ0gsNkJBRk0sQ0FBUDtBQUdILDJCQUpELE1BSU87QUFDSCxtQ0FBTyxLQUFQO0FBQ0g7QUFDSix5QkFSc0IsQ0E3R3ZDOztBQUFBO0FBNkdvQkMsbUNBN0dwQjs7QUFBQSw2QkFzSG1CQSxXQXRIbkI7QUFBQTtBQUFBO0FBQUE7O0FBQUEsOEJBdUh1QkEsV0FBVSxDQUFDbkIsSUFBWCxDQUFnQm9CLE1BQWhCLEdBQXlCLENBdkhoRDtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLCtCQXdIMkNDLDJFQUFTLENBQUNGLFdBQVUsQ0FBQ25CLElBQVgsQ0FBZ0IsQ0FBaEIsRUFBbUJSLEVBQXBCLENBeEhwRDs7QUFBQTtBQXdINEI4QiwrQkF4SDVCOztBQXlId0IsNEJBQUdBLE9BQU0sQ0FBQ3RCLElBQVAsQ0FBWW9CLE1BQVosR0FBcUIsQ0FBeEIsRUFBMkI7QUFDdkJFLGlDQUFNLENBQUN0QixJQUFQLENBQVlWLEdBQVo7QUFBQSxnR0FBZ0IsbUJBQU1rQyxHQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsNkNBQ0tDLCtFQUFhLENBQUNELEdBQUcsQ0FBQ2hDLEVBQUwsQ0FBYixDQUFzQnVCLElBQXRCLENBQTJCLFVBQVNDLFFBQVQsRUFBbUI7QUFDM0QsNENBQUdBLFFBQVEsQ0FBQ0MsRUFBWixFQUFnQjtBQUNaLGlEQUFPRCxRQUFRLENBQUNFLElBQVQsRUFBUDtBQUNILHlDQUZELE1BRU07QUFDRixpREFBTyxLQUFQO0FBQ0g7QUFDSix1Q0FOZ0IsQ0FETDs7QUFBQTtBQUNSNEIsMENBRFE7O0FBUVosMENBQUdBLElBQUgsRUFBUztBQUNMO0FBQ0EsNENBQUdBLElBQUksQ0FBQ2pCLElBQUwsS0FBYywrQkFBakIsRUFBa0Q7QUFDOUM7QUFDQSw4Q0FBR2tCLGlGQUFlLENBQUNILGNBQUQsRUFBaUJFLElBQUksQ0FBQ0UsVUFBdEIsQ0FBZixJQUFvREMsa0ZBQWdCLENBQUNMLGNBQUQsRUFBaUJFLElBQUksQ0FBQ0UsVUFBdEIsRUFBa0NGLElBQUksQ0FBQzFCLE1BQXZDLENBQXZFLEVBQXVIO0FBQ25IO0FBQ0FHLGlEQUFLLENBQUNuQixJQUFOLENBQVc7QUFBQyxxREFBTzBDLElBQUksQ0FBQ0ksR0FBYjtBQUFrQixvRUFBc0JDLDJFQUFTLENBQUNQLGNBQUQsRUFBaUJFLElBQUksQ0FBQ0UsVUFBdEIsRUFBa0NGLElBQUksQ0FBQzFCLE1BQXZDLENBQWpEO0FBQWlHLHVEQUFTdUIsTUFBMUc7QUFBa0gscURBQU9HO0FBQXpILDZDQUFYO0FBQ0g7QUFDSjtBQUNKOztBQWpCVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw2QkFBaEI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFtQkg7O0FBN0l6QjtBQStJb0JuRixtQ0FBVyxDQUFDZ0YsTUFBTSxDQUFDOUIsTUFBUCxDQUFjRCxJQUFmLENBQVgsR0FBa0MrQixNQUFNLENBQUM5QixNQUFQLENBQWNELElBQWhEO0FBL0lwQjtBQUFBOztBQUFBO0FBaUpvQmpELG1DQUFXLENBQUNnRixNQUFNLENBQUM5QixNQUFQLENBQWNELElBQWYsQ0FBWCxHQUFrQytCLE1BQU0sQ0FBQzlCLE1BQVAsQ0FBY0QsSUFBaEQ7O0FBakpwQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7QUFBQTtBQUFBLHFCQXNKc0JuQixPQUFPLENBQUNDLFVBQVIsQ0FBbUI2QixLQUFuQixDQXRKdEI7O0FBQUE7QUFzSlE2QixtQkF0SlI7O0FBdUpJO0FBQ0Esa0JBQUdBLEtBQUssQ0FBQ2hDLE1BQU4sS0FBaUIsQ0FBcEIsRUFBdUI7QUFDbkJzQiw4QkFBYyxDQUFDcEUsS0FBZixDQUFxQkMsT0FBckIsR0FBK0IsTUFBL0I7QUFDQThELG9CQUFJLENBQUMvRCxLQUFMLENBQVdDLE9BQVgsR0FBcUIsTUFBckI7QUFDQThFLDhGQUFhLENBQUNsQixRQUFELENBQWI7QUFDSCxlQUpELE1BSU87QUFDSEUsb0JBQUksQ0FBQy9ELEtBQUwsQ0FBV0MsT0FBWCxHQUFxQixNQUFyQjtBQUNBbUUsOEJBQWMsQ0FBQ3BFLEtBQWYsQ0FBcUJDLE9BQXJCLEdBQStCLE1BQS9CO0FBQ0ErRSw0RkFBVyxDQUFDbkIsUUFBRCxFQUFXaUIsS0FBWCxDQUFYO0FBQ0g7O0FBaEtMO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBbklnRDtBQUFBO0FBQUE7QUFxU25ELENBclNELEU7Ozs7Ozs7Ozs7OztBQ05BO0FBQUEsSUFBTUcsYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixDQUFDQyxRQUFELEVBQWM7QUFDaEMsTUFBSUMsUUFBUSxHQUFHRCxRQUFRLENBQUNFLEtBQVQsQ0FBZSxHQUFmLENBQWY7QUFDQSxNQUFJQyxRQUFRLEdBQUdGLFFBQVEsQ0FBQyxDQUFELENBQVIsQ0FBWUMsS0FBWixDQUFrQixHQUFsQixDQUFmO0FBRUEsTUFBSUUsUUFBUSxHQUFHQyxNQUFNLENBQUNGLFFBQVEsQ0FBQyxDQUFELENBQVQsQ0FBTixHQUFzQixJQUF0QixHQUE2QkEsUUFBUSxDQUFDLENBQUQsQ0FBckMsR0FBMkMsR0FBM0MsR0FBaURBLFFBQVEsQ0FBQyxDQUFELENBQXhFO0FBRUEsU0FBT0MsUUFBUDtBQUNILENBUEQ7O0FBU0EsSUFBTUMsTUFBTSxHQUFHO0FBQ1gsUUFBTSxTQURLO0FBRVgsUUFBTSxVQUZLO0FBR1gsUUFBTSxPQUhLO0FBSVgsUUFBTSxPQUpLO0FBS1gsUUFBTSxLQUxLO0FBTVgsUUFBTSxNQU5LO0FBT1gsUUFBTSxNQVBLO0FBUVgsUUFBTSxRQVJLO0FBU1gsUUFBTSxXQVRLO0FBVVgsUUFBTSxTQVZLO0FBV1gsUUFBTSxVQVhLO0FBWVgsUUFBTTtBQVpLLENBQWY7QUFlZU4sNEVBQWYsRTs7Ozs7Ozs7Ozs7O0FDeEJBO0FBQUE7QUFBQTtBQUFPLElBQU1GLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBQ2xCLFFBQUQsRUFBYztBQUN2QyxNQUFNQyxNQUFNLEdBQUdqRixRQUFRLENBQUNHLHNCQUFULENBQWdDLGdCQUFoQyxFQUFrRCxDQUFsRCxDQUFmO0FBQ0E4RSxRQUFNLENBQUM5RCxLQUFQLENBQWFDLE9BQWIsR0FBdUIsTUFBdkI7QUFDQSxNQUFNOEQsSUFBSSxHQUFHbEYsUUFBUSxDQUFDRyxzQkFBVCxDQUFnQyxNQUFoQyxFQUF3QyxDQUF4QyxDQUFiO0FBQ0ErRSxNQUFJLENBQUMvRCxLQUFMLENBQVdDLE9BQVgsR0FBcUIsTUFBckI7QUFDQSxNQUFNdUYsTUFBTSxHQUFHM0csUUFBUSxDQUFDZ0IsYUFBVCxDQUF1QixTQUF2QixDQUFmO0FBQ0EsTUFBTTRGLE1BQU0sR0FBRzVHLFFBQVEsQ0FBQ2dCLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBZjtBQUNBNEYsUUFBTSxDQUFDbEYsU0FBUCxHQUFtQixRQUFuQjtBQUNBa0YsUUFBTSxDQUFDM0YsU0FBUCxDQUFpQkMsR0FBakIsQ0FBcUIsTUFBckI7QUFDQXlGLFFBQU0sQ0FBQ3BGLFdBQVAsQ0FBbUJxRixNQUFuQjtBQUNBLE1BQU1oRyxTQUFTLEdBQUdaLFFBQVEsQ0FBQ2dCLGFBQVQsQ0FBdUIsU0FBdkIsQ0FBbEI7QUFDQTJGLFFBQU0sQ0FBQzFGLFNBQVAsQ0FBaUJDLEdBQWpCLENBQXFCLGtCQUFyQjtBQUNBLE1BQU0yRixNQUFNLEdBQUc3RyxRQUFRLENBQUNnQixhQUFULENBQXVCLEtBQXZCLENBQWY7QUFDQTZGLFFBQU0sQ0FBQ25GLFNBQVAsaUJBQTJCc0QsUUFBM0I7QUFDQXBFLFdBQVMsQ0FBQ1csV0FBVixDQUFzQnNGLE1BQXRCO0FBQ0EsTUFBTUMsT0FBTyxHQUFHOUcsUUFBUSxDQUFDZ0IsYUFBVCxDQUF1QixLQUF2QixDQUFoQjtBQUNBOEYsU0FBTyxDQUFDcEYsU0FBUixHQUFvQixzQ0FBcEI7QUFDQWQsV0FBUyxDQUFDVyxXQUFWLENBQXNCdUYsT0FBdEI7QUFDQUgsUUFBTSxDQUFDcEYsV0FBUCxDQUFtQlgsU0FBbkI7QUFDQVosVUFBUSxDQUFDK0csSUFBVCxDQUFjeEYsV0FBZCxDQUEwQm9GLE1BQTFCOztBQUVBQyxRQUFNLENBQUNJLE9BQVAsR0FBaUIsWUFBVztBQUN4QkMsVUFBTSxDQUFDQyxRQUFQLEdBQWtCLEdBQWxCO0FBQ0gsR0FGRDtBQUdILENBeEJNO0FBMEJBLElBQU1mLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQUNuQixRQUFELEVBQVdaLEtBQVgsRUFBcUI7QUFDNUMsTUFBTWEsTUFBTSxHQUFHakYsUUFBUSxDQUFDRyxzQkFBVCxDQUFnQyxnQkFBaEMsRUFBa0QsQ0FBbEQsQ0FBZjtBQUNBOEUsUUFBTSxDQUFDOUQsS0FBUCxDQUFhQyxPQUFiLEdBQXVCLE1BQXZCO0FBQ0EsTUFBTThELElBQUksR0FBR2xGLFFBQVEsQ0FBQ0csc0JBQVQsQ0FBZ0MsTUFBaEMsRUFBd0MsQ0FBeEMsQ0FBYjtBQUNBLE1BQU13RyxNQUFNLEdBQUczRyxRQUFRLENBQUNnQixhQUFULENBQXVCLFNBQXZCLENBQWY7QUFDQSxNQUFNNEYsTUFBTSxHQUFHNUcsUUFBUSxDQUFDZ0IsYUFBVCxDQUF1QixNQUF2QixDQUFmO0FBQ0E0RixRQUFNLENBQUNsRixTQUFQLEdBQW1CLFFBQW5CO0FBQ0FrRixRQUFNLENBQUMzRixTQUFQLENBQWlCQyxHQUFqQixDQUFxQixNQUFyQjtBQUNBeUYsUUFBTSxDQUFDcEYsV0FBUCxDQUFtQnFGLE1BQW5CO0FBQ0EsTUFBTWhHLFNBQVMsR0FBR1osUUFBUSxDQUFDZ0IsYUFBVCxDQUF1QixTQUF2QixDQUFsQjtBQUNBMkYsUUFBTSxDQUFDMUYsU0FBUCxDQUFpQkMsR0FBakIsQ0FBcUIsa0JBQXJCO0FBQ0EsTUFBTTJGLE1BQU0sR0FBRzdHLFFBQVEsQ0FBQ2dCLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBZjtBQUNBNkYsUUFBTSxDQUFDbkYsU0FBUCxpQkFBMkJzRCxRQUEzQjtBQUNBcEUsV0FBUyxDQUFDVyxXQUFWLENBQXNCc0YsTUFBdEI7QUFFQSxNQUFNTSxVQUFVLEdBQUduSCxRQUFRLENBQUNnQixhQUFULENBQXVCLElBQXZCLENBQW5CO0FBQ0FtRyxZQUFVLENBQUNsRyxTQUFYLENBQXFCQyxHQUFyQixDQUF5QixjQUF6Qjs7QUFDQSxPQUFJLElBQUlrRyxDQUFDLEdBQUcsQ0FBWixFQUFlQSxDQUFDLEdBQUdoRCxLQUFLLENBQUNILE1BQXpCLEVBQWlDbUQsQ0FBQyxFQUFsQyxFQUFzQztBQUNsQyxRQUFNQyxFQUFFLEdBQUdySCxRQUFRLENBQUNnQixhQUFULENBQXVCLElBQXZCLENBQVg7QUFDQXFHLE1BQUUsQ0FBQzNGLFNBQUgsaUJBQXVCMEMsS0FBSyxDQUFDZ0QsQ0FBRCxDQUFMLENBQVMxRSxLQUFULENBQWVZLEtBQWYsQ0FBcUJFLE1BQXJCLENBQTRCQyxJQUFuRCxnQ0FBK0VXLEtBQUssQ0FBQ2dELENBQUQsQ0FBTCxDQUFTMUUsS0FBVCxDQUFlWSxLQUFmLENBQXFCSSxNQUFyQixDQUE0QkQsSUFBM0c7QUFDQTRELE1BQUUsQ0FBQ3BHLFNBQUgsQ0FBYUMsR0FBYixXQUFxQmtELEtBQUssQ0FBQ2dELENBQUQsQ0FBTCxDQUFTMUUsS0FBVCxDQUFlWSxLQUFmLENBQXFCRSxNQUFyQixDQUE0QkMsSUFBNUIsS0FBcUN1QixRQUFyQyxHQUFnRCxHQUFoRCxHQUFzRCxHQUEzRSxHQUFtRixVQUFuRjtBQUNBLFFBQU1zQyxLQUFLLEdBQUd0SCxRQUFRLENBQUNnQixhQUFULENBQXVCLFNBQXZCLENBQWQ7QUFDQXNHLFNBQUssQ0FBQ3JHLFNBQU4sQ0FBZ0JDLEdBQWhCLENBQW9CLE9BQXBCLEVBTGtDLENBTWxDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxRQUFNcUcsR0FBRyxHQUFHdkgsUUFBUSxDQUFDZ0IsYUFBVCxDQUF1QixLQUF2QixDQUFaO0FBQ0F1RyxPQUFHLENBQUNqRyxZQUFKLENBQWlCLElBQWpCLFlBQTJCOEYsQ0FBM0I7QUFDQUcsT0FBRyxDQUFDdEcsU0FBSixDQUFjQyxHQUFkLENBQWtCLFNBQWxCO0FBQ0FvRyxTQUFLLENBQUMvRixXQUFOLENBQWtCZ0csR0FBbEI7QUFFQUYsTUFBRSxDQUFDOUYsV0FBSCxDQUFlK0YsS0FBZjtBQUNBSCxjQUFVLENBQUM1RixXQUFYLENBQXVCOEYsRUFBdkI7QUFDSDs7QUFFRCxNQUFNRyxHQUFHLEdBQUd4SCxRQUFRLENBQUNnQixhQUFULENBQXVCLE1BQXZCLENBQVo7QUFDQXdHLEtBQUcsQ0FBQzlGLFNBQUosR0FBZ0IsVUFBaEI7QUFDQThGLEtBQUcsQ0FBQ3ZHLFNBQUosQ0FBY0MsR0FBZCxDQUFrQixPQUFsQjtBQUNBTixXQUFTLENBQUNXLFdBQVYsQ0FBc0I0RixVQUF0QjtBQUNBUixRQUFNLENBQUNwRixXQUFQLENBQW1CWCxTQUFuQjtBQUNBK0YsUUFBTSxDQUFDcEYsV0FBUCxDQUFtQmlHLEdBQW5CO0FBQ0F4SCxVQUFRLENBQUMrRyxJQUFULENBQWN4RixXQUFkLENBQTBCb0YsTUFBMUI7QUFHQSxNQUFJYyxLQUFLLEdBQUcsRUFBWjs7QUFDQSxPQUFJLElBQUlDLENBQUMsR0FBRyxDQUFaLEVBQWVBLENBQUMsR0FBR3RELEtBQUssQ0FBQ0gsTUFBekIsRUFBaUN5RCxDQUFDLEVBQWxDLEVBQXNDO0FBQ2xDRCxTQUFLLENBQUN4RSxJQUFOLENBQVcsV0FBV3lFLENBQXRCO0FBQ0g7O0FBckQyQyw2QkFzRHBDTixFQXREb0M7QUF1RHBDTyxXQUFPLEdBQUc7QUFDVkMsV0FBSyxFQUFFLEdBREc7QUFFVkMsWUFBTSxFQUFFLEdBRkU7QUFHVkMsY0FBUSxFQUFFLEtBSEE7QUFJVkMsVUFBSSxZQUFNM0QsS0FBSyxDQUFDZ0QsRUFBRCxDQUFMLENBQVMxRSxLQUFULENBQWVzRixrQkFBckIsQ0FKTTtBQUtWQyxXQUFLLFlBQU03RCxLQUFLLENBQUNnRCxFQUFELENBQUwsQ0FBUzFFLEtBQVQsQ0FBZXdGLEdBQWYsQ0FBbUJDLEdBQXpCO0FBTEssS0F2RDBCO0FBOER4Q1YsU0FBSyxDQUFDTCxFQUFELENBQUwsR0FBVyxJQUFJZ0IsTUFBTSxDQUFDQyxNQUFYLFdBQXNCakIsRUFBdEIsR0FBNEJPLE9BQTVCLENBQVg7O0FBQ0FGLFNBQUssQ0FBQ0wsRUFBRCxDQUFMLENBQVNrQixTQUFULENBQW1CLEdBQW5COztBQUNBdEksWUFBUSxDQUFDdUksZ0JBQVQsQ0FBMEIsUUFBMUIsRUFBb0M5RixPQUFwQyxDQUE0QyxVQUFBK0YsQ0FBQyxFQUFJO0FBQzdDQSxPQUFDLENBQUN2SSxnQkFBRixDQUFtQixPQUFuQixFQUE0QixZQUFNO0FBQzlCd0gsYUFBSyxDQUFDTCxFQUFELENBQUwsQ0FBU3FCLEtBQVQ7QUFDSCxPQUZEO0FBR0gsS0FKRDtBQWhFd0M7O0FBc0Q1QyxPQUFJLElBQUlyQixFQUFDLEdBQUcsQ0FBWixFQUFlQSxFQUFDLEdBQUdoRCxLQUFLLENBQUNILE1BQXpCLEVBQWlDbUQsRUFBQyxFQUFsQyxFQUFzQztBQUFBLFFBQzlCTyxPQUQ4Qjs7QUFBQSxVQUE5QlAsRUFBOEI7QUFnQnJDOztBQUVEcEgsVUFBUSxDQUFDdUksZ0JBQVQsQ0FBMEIsV0FBMUIsRUFBdUM5RixPQUF2QyxDQUErQyxVQUFBaUcsSUFBSSxFQUFJO0FBQ25ELFFBQU1DLEdBQUcsR0FBR0QsSUFBSSxDQUFDN0gsYUFBTCxDQUFtQixRQUFuQixDQUFaO0FBQ0EsUUFBTTJHLEdBQUcsR0FBR3hILFFBQVEsQ0FBQ2EsYUFBVCxDQUF1QixRQUF2QixDQUFaO0FBQ0E2SCxRQUFJLENBQUN6SSxnQkFBTCxDQUFzQixPQUF0QixFQUErQixVQUFBMkIsQ0FBQyxFQUFJO0FBQ2hDK0csU0FBRyxDQUFDeEgsS0FBSixDQUFVQyxPQUFWLEdBQW9CLE1BQXBCO0FBQ0FvRyxTQUFHLENBQUNyRyxLQUFKLENBQVVDLE9BQVYsR0FBb0IsT0FBcEI7QUFDSCxLQUhEO0FBSUgsR0FQRDtBQVNBcEIsVUFBUSxDQUFDdUksZ0JBQVQsQ0FBMEIsUUFBMUIsRUFBb0M5RixPQUFwQyxDQUE0QyxVQUFBbUcsQ0FBQyxFQUFJO0FBQzdDQSxLQUFDLENBQUMzSSxnQkFBRixDQUFtQixPQUFuQixFQUE0QixVQUFBMkIsQ0FBQyxFQUFJO0FBQzdCNUIsY0FBUSxDQUFDdUksZ0JBQVQsQ0FBMEIsUUFBMUIsRUFBb0M5RixPQUFwQyxDQUE0QyxVQUFBa0csR0FBRyxFQUFJO0FBQy9DQSxXQUFHLENBQUN4SCxLQUFKLENBQVVDLE9BQVYsR0FBb0IsTUFBcEI7QUFDQXdILFNBQUMsQ0FBQ3pILEtBQUYsQ0FBUUMsT0FBUixHQUFrQixNQUFsQjtBQUNILE9BSEQ7QUFJSCxLQUxEO0FBTUgsR0FQRDs7QUFTQXdGLFFBQU0sQ0FBQ0ksT0FBUCxHQUFpQixZQUFXO0FBQ3hCQyxVQUFNLENBQUNDLFFBQVAsR0FBa0IsR0FBbEI7QUFDSCxHQUZEO0FBR0gsQ0E3Rk0sQzs7Ozs7Ozs7Ozs7O0FDMUJQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVPLElBQU1qRixlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUErQyxRQUFRLEVBQUk7QUFDdkMsTUFBTTZELGdCQUFnQixHQUFHO0FBQ3JCQyxVQUFNLEVBQUUsS0FEYTtBQUVyQkMsV0FBTyxFQUFFO0FBQ0xDLG1CQUFhLG1CQUFhQyxtREFBRyxDQUFDdEosT0FBakIsQ0FEUjtBQUVMdUosWUFBTSxFQUFFO0FBRkg7QUFGWSxHQUF6QjtBQVFBLE1BQUlDLE9BQU8sR0FBRyxJQUFJQyxPQUFKLHdFQUE2RXBFLFFBQTdFLEdBQTBGNkQsZ0JBQTFGLENBQWQ7QUFDQSxTQUFPUSxLQUFLLENBQUNGLE9BQUQsQ0FBTCxDQUFldkYsSUFBZixDQUFvQixVQUFTQyxRQUFULEVBQW1CO0FBQzFDLFFBQUdBLFFBQVEsQ0FBQ0MsRUFBWixFQUFnQjtBQUNaO0FBQ0EsYUFBT0QsUUFBUSxDQUFDRSxJQUFULEdBQWdCSCxJQUFoQixDQUFxQixVQUFBRyxJQUFJLEVBQUk7QUFDaEMsZUFBT0EsSUFBSSxDQUFDbEIsSUFBTCxDQUFVLENBQVYsRUFBYUMsYUFBYixDQUEyQlosT0FBM0IsQ0FBbUNXLElBQTFDO0FBQ0gsT0FGTSxDQUFQO0FBR0g7QUFDSixHQVBNLENBQVA7QUFRSCxDQWxCTTtBQW9CQSxJQUFNeEMsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQ2lKLE9BQUQsRUFBYTtBQUNqQyxNQUFNQyxRQUFRLEdBQUc7QUFDYlQsVUFBTSxFQUFFO0FBREssR0FBakIsQ0FEaUMsQ0FLakM7O0FBQ0EsTUFBSUssT0FBTyxHQUFHLElBQUlDLE9BQUosMEJBQStCRSxPQUEvQixHQUEyQ0MsUUFBM0MsQ0FBZDtBQUNBLFNBQU9GLEtBQUssQ0FBQ0YsT0FBRCxDQUFMLENBQWV2RixJQUFmLENBQW9CLFVBQVNDLFFBQVQsRUFBbUI7QUFDMUMsV0FBT0EsUUFBUSxDQUFDRSxJQUFULEVBQVA7QUFDSCxHQUZNLENBQVA7QUFHSCxDQVZNLEMsQ0FXUDtBQUNBOztBQUNPLElBQU1iLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQUM2QyxHQUFELEVBQVM7QUFDakMsTUFBTXlELGFBQWEsR0FBRztBQUNsQlYsVUFBTSxFQUFFLEtBRFU7QUFFbEJDLFdBQU8sRUFBRTtBQUNMRyxZQUFNLEVBQUU7QUFESDtBQUZTLEdBQXRCO0FBT0EsTUFBSUMsT0FBTyxHQUFHLElBQUlDLE9BQUosQ0FBWXJELEdBQVosRUFBaUJ5RCxhQUFqQixDQUFkO0FBQ0EsU0FBT0gsS0FBSyxDQUFDRixPQUFELENBQUwsQ0FBZXZGLElBQWYsQ0FBb0IsVUFBU0MsUUFBVCxFQUFtQjtBQUMxQyxRQUFHQSxRQUFRLENBQUNDLEVBQVosRUFBZ0I7QUFDWixhQUFPRCxRQUFRLENBQUNFLElBQVQsR0FBZ0JILElBQWhCLENBQXFCLFVBQUFHLElBQUksRUFBSTtBQUNoQyxlQUFPQSxJQUFQO0FBQ0gsT0FGTSxDQUFQO0FBR0g7QUFDSixHQU5NLENBQVA7QUFPSCxDQWhCTSxDLENBaUJQOztBQUVPLElBQU0wRixRQUFRLEdBQUcsU0FBWEEsUUFBVyxHQUFNO0FBQzFCLE1BQU1DLFNBQVMsR0FBRztBQUNkWixVQUFNLEVBQUUsTUFETSxDQUVkOztBQUZjLEdBQWxCO0FBS0EsTUFBSUssT0FBTyxHQUFHLElBQUlDLE9BQUosdURBQTRESCxtREFBRyxDQUFDckosU0FBaEUsNEJBQTZGcUosbURBQUcsQ0FBQ3BKLFlBQWpHLHFDQUFnSjZKLFNBQWhKLENBQWQ7QUFDQSxTQUFPTCxLQUFLLENBQUNGLE9BQUQsQ0FBTCxDQUFldkYsSUFBZixDQUFvQixVQUFTQyxRQUFULEVBQW1CO0FBQzFDLFFBQUdBLFFBQVEsQ0FBQ0MsRUFBWixFQUFnQjtBQUNaLGFBQU9ELFFBQVEsQ0FBQ0UsSUFBVCxFQUFQO0FBQ0g7QUFDSixHQUpNLENBQVA7QUFLSCxDQVpNO0FBY0EsSUFBTUosYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixDQUFBcUIsUUFBUSxFQUFJO0FBQ3JDLE1BQU0yRSxjQUFjLEdBQUc7QUFDbkJiLFVBQU0sRUFBRSxLQURXO0FBRW5CQyxXQUFPLEVBQUU7QUFDTCx3Q0FBNEJFLG1EQUFHLENBQUNuSixLQUFoQyxDQURLO0FBRUwsNkJBQWlCbUosbURBQUcsQ0FBQ3JKLFNBQXJCO0FBRks7QUFGVSxHQUF2QjtBQU9BLE1BQUl1SixPQUFPLEdBQUcsSUFBSUMsT0FBSixtREFBd0RwRSxRQUF4RCxHQUFxRTJFLGNBQXJFLENBQWQ7QUFDQSxTQUFPTixLQUFLLENBQUNGLE9BQUQsQ0FBWjtBQUNILENBVk0sQyxDQVdQOztBQUVPLElBQU1qRixTQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFBMEYsTUFBTSxFQUFJO0FBQy9CLE1BQU1DLGdCQUFnQixHQUFHO0FBQ3JCZixVQUFNLEVBQUUsS0FEYTtBQUVyQkMsV0FBTyxFQUFFO0FBQ0wsd0NBQTRCRSxtREFBRyxDQUFDbkosS0FBaEMsQ0FESztBQUVMLDZCQUFpQm1KLG1EQUFHLENBQUNySixTQUFyQjtBQUZLO0FBRlksR0FBekI7QUFPQSxNQUFJdUosT0FBTyxHQUFHLElBQUlDLE9BQUosc0RBQTJEUSxNQUEzRCxHQUFzRUMsZ0JBQXRFLENBQWQ7QUFDQSxTQUFPUixLQUFLLENBQUNGLE9BQUQsQ0FBTCxDQUFldkYsSUFBZixDQUFvQixVQUFTQyxRQUFULEVBQW1CO0FBQzFDLFFBQUdBLFFBQVEsQ0FBQ0MsRUFBWixFQUFnQjtBQUNaLGFBQU9ELFFBQVEsQ0FBQ0UsSUFBVCxFQUFQO0FBQ0g7QUFDSixHQUpNLENBQVA7QUFLSCxDQWRNLEMsQ0FlUDs7QUFFTyxJQUFNTyxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLENBQUF3RixPQUFPLEVBQUk7QUFDcEMsTUFBTUMsY0FBYyxHQUFHO0FBQ25CakIsVUFBTSxFQUFFLEtBRFc7QUFFbkJDLFdBQU8sRUFBRTtBQUNMLGdCQUFVLGtDQURMO0FBRUwsNkJBQWlCRSxtREFBRyxDQUFDckosU0FBckI7QUFGSztBQUZVLEdBQXZCO0FBT0EsTUFBSXVKLE9BQU8sR0FBRyxJQUFJQyxPQUFKLCtDQUFvRFUsT0FBcEQsR0FBZ0VDLGNBQWhFLENBQWQ7QUFDQSxTQUFPVixLQUFLLENBQUNGLE9BQUQsQ0FBWjtBQUNILENBVk07QUFhQSxJQUFNdkQsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixDQUFDb0UsRUFBRCxFQUFLQyxFQUFMLEVBQVk7QUFDdkM7QUFDQSxNQUFJQyxFQUFFLEdBQUcsSUFBSUMsSUFBSixDQUFTSCxFQUFULENBQVQ7QUFDQSxNQUFJSSxFQUFFLEdBQUcsSUFBSUQsSUFBSixDQUFTRixFQUFULENBQVQ7O0FBRUEsTUFBR0MsRUFBRSxJQUFJRSxFQUFULEVBQWE7QUFDVCxXQUFPLElBQVA7QUFDSCxHQUZELE1BRU87QUFDSCxXQUFPLEtBQVA7QUFDSDtBQUNKLENBVk07QUFZQSxJQUFNdEUsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQixDQUFDa0UsRUFBRCxFQUFLQyxFQUFMLEVBQVNJLE9BQVQsRUFBcUI7QUFDakQ7QUFDQSxNQUFJSCxFQUFFLEdBQUcsSUFBSUMsSUFBSixDQUFTSCxFQUFULENBQVQ7QUFDQSxNQUFJSSxFQUFFLEdBQUcsSUFBSUQsSUFBSixDQUFTRixFQUFULENBQVQ7QUFDQUcsSUFBRSxDQUFDRSxRQUFILENBQVlGLEVBQUUsQ0FBQ0csUUFBSCxFQUFaLEVBQTJCSCxFQUFFLENBQUNJLFVBQUgsRUFBM0IsRUFBNENKLEVBQUUsQ0FBQ0ssVUFBSCxLQUFrQkosT0FBOUQ7O0FBQ0EsTUFBSUgsRUFBRSxJQUFJRSxFQUFWLEVBQWM7QUFDVixXQUFPLElBQVA7QUFDSCxHQUZELE1BRU87QUFDSCxXQUFPLEtBQVA7QUFDSCxHQVRnRCxDQVVqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNILENBM0JNO0FBNkJBLElBQU1wRSxTQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFDZ0UsRUFBRCxFQUFLQyxFQUFMLEVBQVNJLE9BQVQsRUFBcUI7QUFDMUM7QUFDQSxNQUFJSCxFQUFFLEdBQUcsSUFBSUMsSUFBSixDQUFTSCxFQUFULENBQVQ7QUFDQSxNQUFJSSxFQUFFLEdBQUcsSUFBSUQsSUFBSixDQUFTRixFQUFULENBQVQ7QUFDQUcsSUFBRSxDQUFDRSxRQUFILENBQVlGLEVBQUUsQ0FBQ0csUUFBSCxFQUFaLEVBQTJCSCxFQUFFLENBQUNJLFVBQUgsRUFBM0IsRUFBNENKLEVBQUUsQ0FBQ0ssVUFBSCxLQUFrQkosT0FBOUQ7QUFDQSxNQUFJSyxJQUFJLEdBQUksQ0FBQ04sRUFBRSxHQUFHRixFQUFOLElBQVksSUFBeEIsQ0FMMEMsQ0FNMUM7QUFDQTs7QUFDQSxNQUFJUyxDQUFDLEdBQUcsSUFBSVIsSUFBSixDQUFTLElBQVQsQ0FBUjtBQUNBUSxHQUFDLENBQUNDLFVBQUYsQ0FBY1AsT0FBTyxHQUFHSyxJQUFYLEdBQW1CLEVBQWhDO0FBQ0EsTUFBSXRLLENBQUMsR0FBR3VLLENBQUMsQ0FBQ0UsV0FBRixHQUFnQkMsTUFBaEIsQ0FBdUIsRUFBdkIsRUFBMkIsQ0FBM0IsRUFBOEJ2RSxLQUE5QixDQUFvQyxHQUFwQyxDQUFSO0FBQ0EsU0FBT25HLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBTyxHQUFQLEdBQWFBLENBQUMsQ0FBQyxDQUFELENBQWQsR0FBb0IsR0FBcEIsR0FBMEJBLENBQUMsQ0FBQyxDQUFELENBQTNCLEdBQWlDLEdBQXhDO0FBQ0gsQ0FaTTtBQWNBLElBQU0ySyxVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFDZixFQUFELEVBQUtDLEVBQUwsRUFBU0ksT0FBVCxFQUFxQjtBQUMzQyxNQUFJSCxFQUFFLEdBQUcsSUFBSUMsSUFBSixDQUFTSCxFQUFULENBQVQ7QUFDQSxNQUFJSSxFQUFFLEdBQUcsSUFBSUQsSUFBSixDQUFTRixFQUFULENBQVQ7QUFDQUcsSUFBRSxDQUFDRSxRQUFILENBQVlGLEVBQUUsQ0FBQ0csUUFBSCxFQUFaLEVBQTJCSCxFQUFFLENBQUNJLFVBQUgsRUFBM0IsRUFBNENKLEVBQUUsQ0FBQ0ssVUFBSCxLQUFrQkosT0FBOUQ7QUFDQSxNQUFJSyxJQUFJLEdBQUksQ0FBQ04sRUFBRSxHQUFHRixFQUFOLElBQVksSUFBeEI7QUFDQSxNQUFJYyxFQUFFLEdBQUdaLEVBQUUsQ0FBQ0UsUUFBSCxDQUFZRixFQUFFLENBQUNHLFFBQUgsRUFBWixFQUEyQkgsRUFBRSxDQUFDSSxVQUFILEVBQTNCLEVBQTRDSixFQUFFLENBQUNLLFVBQUgsS0FBa0JDLElBQTlELENBQVQ7QUFDQSxTQUFRLENBQUNNLEVBQUUsR0FBSSxJQUFJYixJQUFKLENBQVNGLEVBQVQsQ0FBUCxJQUF3QixJQUF6QixHQUFpQyxFQUF4QztBQUNILENBUE0sQzs7Ozs7Ozs7Ozs7O0FDdEtQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVPLElBQU1wRixjQUFjLEdBQUcsU0FBakJBLGNBQWlCLENBQUM3QixNQUFELEVBQVNtQixNQUFULEVBQWlCbkMsSUFBakIsRUFBMEI7QUFDcEQsTUFBTWlELE1BQU0sR0FBR2pGLFFBQVEsQ0FBQ0csc0JBQVQsQ0FBZ0MsZ0JBQWhDLEVBQWtELENBQWxELENBQWY7QUFDQThFLFFBQU0sQ0FBQzlELEtBQVAsQ0FBYUMsT0FBYixHQUF1QixNQUF2QjtBQUNBLE1BQU04RCxJQUFJLEdBQUdsRixRQUFRLENBQUNHLHNCQUFULENBQWdDLE1BQWhDLEVBQXdDLENBQXhDLENBQWI7QUFDQStFLE1BQUksQ0FBQy9ELEtBQUwsQ0FBV0MsT0FBWCxHQUFxQixNQUFyQjtBQUNBLE1BQU11RCxFQUFFLEdBQUczRSxRQUFRLENBQUNHLHNCQUFULENBQWdDLE1BQWhDLEVBQXdDLENBQXhDLENBQVg7QUFDQXdFLElBQUUsQ0FBQ3hELEtBQUgsQ0FBU0MsT0FBVCxHQUFtQixNQUFuQjtBQUVBLE1BQUlnRCxLQUFLLEdBQUcsRUFBWjtBQUNBLE1BQUk2RyxjQUFjLEdBQUcsRUFBckIsQ0FUb0QsQ0FXcEQ7O0FBQ0EsT0FBSSxJQUFJdkQsQ0FBQyxHQUFHLENBQVosRUFBZUEsQ0FBQyxHQUFHdkQsTUFBTSxDQUFDRixNQUExQixFQUFrQ3lELENBQUMsRUFBbkMsRUFBdUM7QUFDbkMsU0FBSSxJQUFJTixDQUFDLEdBQUcsQ0FBWixFQUFlQSxDQUFDLEdBQUdwRSxNQUFNLENBQUNpQixNQUExQixFQUFrQ21ELENBQUMsRUFBbkMsRUFBdUM7QUFDbkMsVUFBR3hCLHlFQUFlLENBQUM1QyxNQUFNLENBQUNvRSxDQUFELENBQU4sQ0FBVTFCLEVBQVgsRUFBZXZCLE1BQU0sQ0FBQ3VELENBQUQsQ0FBTixDQUFVN0IsVUFBekIsQ0FBZixJQUF1REMsMEVBQWdCLENBQUM5QyxNQUFNLENBQUNvRSxDQUFELENBQU4sQ0FBVTFCLEVBQVgsRUFBZXZCLE1BQU0sQ0FBQ3VELENBQUQsQ0FBTixDQUFVN0IsVUFBekIsRUFBcUMxQixNQUFNLENBQUN1RCxDQUFELENBQU4sQ0FBVXpELE1BQS9DLENBQTFFLEVBQWtJO0FBQzlIZ0gsc0JBQWMsQ0FBQzlHLE1BQU0sQ0FBQ3VELENBQUQsQ0FBTixDQUFVUyxHQUFYLENBQWQsR0FBZ0MsSUFBaEM7QUFDQS9ELGFBQUssQ0FBQ25CLElBQU4sQ0FBVztBQUFDLHNCQUFZa0IsTUFBTSxDQUFDdUQsQ0FBRCxDQUFOLENBQVVTLEdBQXZCO0FBQTRCLGlCQUFPaEUsTUFBTSxDQUFDdUQsQ0FBRCxDQUFOLENBQVUzQixHQUE3QztBQUFrRCxrQkFBUWdGLG9FQUFVLENBQUMvSCxNQUFNLENBQUNvRSxDQUFELENBQU4sQ0FBVTFCLEVBQVgsRUFBZXZCLE1BQU0sQ0FBQ3VELENBQUQsQ0FBTixDQUFVN0IsVUFBekIsRUFBcUMxQixNQUFNLENBQUN1RCxDQUFELENBQU4sQ0FBVXpELE1BQS9DLENBQXBFO0FBQTRILGdDQUFzQitCLG1FQUFTLENBQUNoRCxNQUFNLENBQUNvRSxDQUFELENBQU4sQ0FBVTFCLEVBQVgsRUFBZXZCLE1BQU0sQ0FBQ3VELENBQUQsQ0FBTixDQUFVN0IsVUFBekIsRUFBcUMxQixNQUFNLENBQUN1RCxDQUFELENBQU4sQ0FBVXpELE1BQS9DLENBQTNKO0FBQW1OLG1CQUFTakIsTUFBTSxDQUFDb0UsQ0FBRCxDQUFsTztBQUF1TyxpQkFBT2pELE1BQU0sQ0FBQ3VELENBQUQ7QUFBcFAsU0FBWDtBQUNIO0FBQ0o7QUFDSjs7QUFFRCxNQUFNZixNQUFNLEdBQUczRyxRQUFRLENBQUNnQixhQUFULENBQXVCLFNBQXZCLENBQWY7QUFDQSxNQUFNNEYsTUFBTSxHQUFHNUcsUUFBUSxDQUFDZ0IsYUFBVCxDQUF1QixNQUF2QixDQUFmO0FBQ0E0RixRQUFNLENBQUNsRixTQUFQLEdBQW1CLFFBQW5CO0FBQ0FrRixRQUFNLENBQUMzRixTQUFQLENBQWlCQyxHQUFqQixDQUFxQixNQUFyQjtBQUNBeUYsUUFBTSxDQUFDcEYsV0FBUCxDQUFtQnFGLE1BQW5CO0FBQ0EsTUFBTWhHLFNBQVMsR0FBR1osUUFBUSxDQUFDZ0IsYUFBVCxDQUF1QixTQUF2QixDQUFsQjtBQUNBMkYsUUFBTSxDQUFDMUYsU0FBUCxDQUFpQkMsR0FBakIsQ0FBcUIsa0JBQXJCO0FBQ0EsTUFBTWdLLElBQUksR0FBR2xMLFFBQVEsQ0FBQ2dCLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBYjtBQUNBa0ssTUFBSSxDQUFDeEosU0FBTCxpQkFBeUJNLElBQXpCO0FBQ0FwQixXQUFTLENBQUNXLFdBQVYsQ0FBc0IySixJQUF0QjtBQUVBLE1BQU0vRCxVQUFVLEdBQUduSCxRQUFRLENBQUNnQixhQUFULENBQXVCLElBQXZCLENBQW5CO0FBQ0FtRyxZQUFVLENBQUNsRyxTQUFYLENBQXFCQyxHQUFyQixDQUF5QixjQUF6Qjs7QUFDQSxPQUFJLElBQUlrRyxFQUFDLEdBQUcsQ0FBWixFQUFlQSxFQUFDLEdBQUdqRCxNQUFNLENBQUNGLE1BQTFCLEVBQWtDbUQsRUFBQyxFQUFuQyxFQUF1QztBQUNuQyxRQUFHNkQsY0FBYyxDQUFDOUcsTUFBTSxDQUFDaUQsRUFBRCxDQUFOLENBQVVlLEdBQVgsQ0FBakIsRUFBa0M7QUFDOUIsVUFBTWQsRUFBRSxHQUFHckgsUUFBUSxDQUFDZ0IsYUFBVCxDQUF1QixJQUF2QixDQUFYO0FBQ0FxRyxRQUFFLENBQUMzRixTQUFILGlCQUF1QnlDLE1BQU0sQ0FBQ2lELEVBQUQsQ0FBTixDQUFVK0QsS0FBakMsd0JBQXNEL0UsK0RBQWEsQ0FBQ2pDLE1BQU0sQ0FBQ2lELEVBQUQsQ0FBTixDQUFVdkIsVUFBWCxDQUFuRTtBQUNBd0IsUUFBRSxDQUFDcEcsU0FBSCxDQUFhQyxHQUFiLENBQWlCLFlBQWpCO0FBQ0EsVUFBTW9HLEtBQUssR0FBR3RILFFBQVEsQ0FBQ2dCLGFBQVQsQ0FBdUIsU0FBdkIsQ0FBZDtBQUNBc0csV0FBSyxDQUFDckcsU0FBTixDQUFnQkMsR0FBaEIsQ0FBb0IsUUFBcEI7QUFDQSxVQUFNa0ssYUFBYSxHQUFHcEwsUUFBUSxDQUFDZ0IsYUFBVCxDQUF1QixLQUF2QixDQUF0QjtBQUNBb0ssbUJBQWEsQ0FBQ25LLFNBQWQsQ0FBd0JDLEdBQXhCLENBQTRCLGVBQTVCOztBQUVBLFdBQUksSUFBSXdHLEVBQUMsR0FBRyxDQUFaLEVBQWVBLEVBQUMsR0FBR3RELEtBQUssQ0FBQ0gsTUFBekIsRUFBaUN5RCxFQUFDLEVBQWxDLEVBQXNDO0FBQ2xDLFlBQUd0RCxLQUFLLENBQUNzRCxFQUFELENBQUwsQ0FBUzJELFFBQVQsS0FBc0JsSCxNQUFNLENBQUNpRCxFQUFELENBQU4sQ0FBVWUsR0FBbkMsRUFBd0M7QUFDcEMsY0FBTW1ELEVBQUUsR0FBR3RMLFFBQVEsQ0FBQ2dCLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBWCxDQURvQyxDQUVwQzs7QUFDQXNLLFlBQUUsQ0FBQzVKLFNBQUgsb0JBQTBCMEMsS0FBSyxDQUFDc0QsRUFBRCxDQUFMLENBQVNwRSxLQUFULENBQWVFLE1BQWYsR0FBeUJZLEtBQUssQ0FBQ3NELEVBQUQsQ0FBTCxDQUFTcEUsS0FBVCxDQUFlRSxNQUFmLENBQXNCQyxJQUEvQyxHQUF1RCxhQUFqRixxQkFBMkdXLEtBQUssQ0FBQ3NELEVBQUQsQ0FBTCxDQUFTcEUsS0FBVCxDQUFlSSxNQUFmLENBQXNCRCxJQUFqSTtBQUNBNkgsWUFBRSxDQUFDckssU0FBSCxDQUFhQyxHQUFiLFdBQXFCa0QsS0FBSyxDQUFDc0QsRUFBRCxDQUFMLENBQVNwRSxLQUFULENBQWVFLE1BQWYsR0FBeUJZLEtBQUssQ0FBQ3NELEVBQUQsQ0FBTCxDQUFTcEUsS0FBVCxDQUFlRSxNQUFmLENBQXNCQyxJQUF0QixLQUErQnpCLElBQS9CLEdBQXNDLElBQXRDLEdBQTZDLElBQXRFLEdBQThFLElBQW5HLEdBQTRHLFdBQTVHO0FBQ0FzSixZQUFFLENBQUNoSyxZQUFILENBQWdCLElBQWhCLFlBQTBCOEMsS0FBSyxDQUFDc0QsRUFBRCxDQUFMLENBQVM2RCxJQUFuQztBQUNBSCx1QkFBYSxDQUFDN0osV0FBZCxDQUEwQitKLEVBQTFCO0FBQ0g7QUFDSjs7QUFDRGhFLFdBQUssQ0FBQy9GLFdBQU4sQ0FBa0I2SixhQUFsQjtBQUVBLFVBQU03RCxHQUFHLEdBQUd2SCxRQUFRLENBQUNnQixhQUFULENBQXVCLEtBQXZCLENBQVo7QUFDQXVHLFNBQUcsQ0FBQ2pHLFlBQUosQ0FBaUIsSUFBakIsWUFBMkI4RixFQUEzQjtBQUNBRyxTQUFHLENBQUN0RyxTQUFKLENBQWNDLEdBQWQsQ0FBa0IsUUFBbEI7QUFDQW9HLFdBQUssQ0FBQy9GLFdBQU4sQ0FBa0JnRyxHQUFsQjtBQUVBRixRQUFFLENBQUM5RixXQUFILENBQWUrRixLQUFmO0FBQ0FILGdCQUFVLENBQUM1RixXQUFYLENBQXVCOEYsRUFBdkI7QUFDSDtBQUNKOztBQUdELE1BQU1HLEdBQUcsR0FBR3hILFFBQVEsQ0FBQ2dCLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBWjtBQUNBd0csS0FBRyxDQUFDOUYsU0FBSixHQUFnQixVQUFoQjtBQUNBOEYsS0FBRyxDQUFDdkcsU0FBSixDQUFjQyxHQUFkLENBQWtCLFFBQWxCO0FBQ0FOLFdBQVMsQ0FBQ1csV0FBVixDQUFzQjRGLFVBQXRCO0FBQ0FSLFFBQU0sQ0FBQ3BGLFdBQVAsQ0FBbUJYLFNBQW5CO0FBQ0ErRixRQUFNLENBQUNwRixXQUFQLENBQW1CaUcsR0FBbkI7QUFDQXhILFVBQVEsQ0FBQytHLElBQVQsQ0FBY3hGLFdBQWQsQ0FBMEJvRixNQUExQjtBQUVBLE1BQUljLEtBQUssR0FBRyxFQUFaOztBQUNBLE9BQUksSUFBSUMsR0FBQyxHQUFHLENBQVosRUFBZUEsR0FBQyxHQUFHdkQsTUFBTSxDQUFDRixNQUExQixFQUFrQ3lELEdBQUMsRUFBbkMsRUFBdUM7QUFDbkNELFNBQUssQ0FBQ3hFLElBQU4sQ0FBVyxXQUFXeUUsR0FBdEI7QUFDSDs7QUE5RW1ELDZCQStFNUNOLEdBL0U0QztBQWdGaEQsUUFBRzZELGNBQWMsQ0FBQzlHLE1BQU0sQ0FBQ2lELEdBQUQsQ0FBTixDQUFVZSxHQUFYLENBQWpCLEVBQWtDO0FBQzFCUixhQUFPLEdBQUc7QUFDVkMsYUFBSyxFQUFFLEdBREc7QUFFVkMsY0FBTSxFQUFFLEdBRkU7QUFHVkMsZ0JBQVEsRUFBRSxLQUhBO0FBSVZHLGFBQUssWUFBTTlELE1BQU0sQ0FBQ2lELEdBQUQsQ0FBTixDQUFVZSxHQUFoQjtBQUpLLE9BRGdCO0FBTzlCVixXQUFLLENBQUNMLEdBQUQsQ0FBTCxHQUFXLElBQUlnQixNQUFNLENBQUNDLE1BQVgsV0FBc0JqQixHQUF0QixHQUE0Qk8sT0FBNUIsQ0FBWDs7QUFDQUYsV0FBSyxDQUFDTCxHQUFELENBQUwsQ0FBU2tCLFNBQVQsQ0FBbUIsR0FBbkI7O0FBQ0F0SSxjQUFRLENBQUN1SSxnQkFBVCxDQUEwQixZQUExQixFQUF3QzlGLE9BQXhDLENBQWdELFVBQUFhLEtBQUssRUFBSTtBQUNyREEsYUFBSyxDQUFDckQsZ0JBQU4sQ0FBdUIsT0FBdkIsRUFBZ0MsWUFBTTtBQUNsQ3dILGVBQUssQ0FBQ0wsR0FBRCxDQUFMLENBQVNtRSxJQUFULENBQWNDLE1BQU0sQ0FBQ2xJLEtBQUssQ0FBQ2pCLEVBQVAsQ0FBcEI7QUFDSCxTQUZEO0FBR0gsT0FKRDtBQUtBckMsY0FBUSxDQUFDdUksZ0JBQVQsQ0FBMEIsU0FBMUIsRUFBcUM5RixPQUFyQyxDQUE2QyxVQUFBK0YsQ0FBQyxFQUFJO0FBQzlDQSxTQUFDLENBQUN2SSxnQkFBRixDQUFtQixPQUFuQixFQUE0QixZQUFNO0FBQzlCd0gsZUFBSyxDQUFDTCxHQUFELENBQUwsQ0FBU3FCLEtBQVQ7QUFDSCxTQUZEO0FBR0gsT0FKRDtBQUtIO0FBbkcrQzs7QUErRXBELE9BQUksSUFBSXJCLEdBQUMsR0FBRyxDQUFaLEVBQWVBLEdBQUMsR0FBR2pELE1BQU0sQ0FBQ0YsTUFBMUIsRUFBa0NtRCxHQUFDLEVBQW5DLEVBQXVDO0FBQUEsUUFFM0JPLE9BRjJCOztBQUFBLFVBQS9CUCxHQUErQjtBQXFCdEM7O0FBRURwSCxVQUFRLENBQUN1SSxnQkFBVCxDQUEwQixhQUExQixFQUF5QzlGLE9BQXpDLENBQWlELFVBQUFpRyxJQUFJLEVBQUk7QUFDckQsUUFBTUMsR0FBRyxHQUFHRCxJQUFJLENBQUM3SCxhQUFMLENBQW1CLFNBQW5CLENBQVo7QUFDQSxRQUFNMkcsR0FBRyxHQUFHeEgsUUFBUSxDQUFDYSxhQUFULENBQXVCLFNBQXZCLENBQVo7QUFDQTZILFFBQUksQ0FBQ3pJLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCLFVBQUEyQixDQUFDLEVBQUk7QUFDaEMrRyxTQUFHLENBQUN4SCxLQUFKLENBQVVDLE9BQVYsR0FBb0IsTUFBcEI7QUFDQW9HLFNBQUcsQ0FBQ3JHLEtBQUosQ0FBVUMsT0FBVixHQUFvQixPQUFwQjtBQUNILEtBSEQ7QUFJSCxHQVBEO0FBU0FwQixVQUFRLENBQUN1SSxnQkFBVCxDQUEwQixTQUExQixFQUFxQzlGLE9BQXJDLENBQTZDLFVBQUFtRyxDQUFDLEVBQUk7QUFDOUNBLEtBQUMsQ0FBQzNJLGdCQUFGLENBQW1CLE9BQW5CLEVBQTRCLFVBQUEyQixDQUFDLEVBQUk7QUFDN0I1QixjQUFRLENBQUN1SSxnQkFBVCxDQUEwQixTQUExQixFQUFxQzlGLE9BQXJDLENBQTZDLFVBQUFrRyxHQUFHLEVBQUk7QUFDaERBLFdBQUcsQ0FBQ3hILEtBQUosQ0FBVUMsT0FBVixHQUFvQixNQUFwQjtBQUNBd0gsU0FBQyxDQUFDekgsS0FBRixDQUFRQyxPQUFSLEdBQWtCLE1BQWxCO0FBQ0gsT0FIRDtBQUlILEtBTEQ7QUFNSCxHQVBEOztBQVNBd0YsUUFBTSxDQUFDSSxPQUFQLEdBQWlCLFlBQVc7QUFDeEJDLFVBQU0sQ0FBQ0MsUUFBUCxHQUFrQixHQUFsQjtBQUNILEdBRkQ7QUFHSCxDQTNITSxDOzs7Ozs7Ozs7Ozs7QUNIUDtBQUFBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cbnZhciBydW50aW1lID0gZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cblxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBvYmpba2V5XTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgLy8gSUUgOCBoYXMgYSBicm9rZW4gT2JqZWN0LmRlZmluZVByb3BlcnR5IHRoYXQgb25seSB3b3JrcyBvbiBET00gb2JqZWN0cy5cbiAgICBkZWZpbmUoe30sIFwiXCIpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBkZWZpbmUgPSBmdW5jdGlvbiAob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7IC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuXG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7IC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cblxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJub3JtYWxcIixcbiAgICAgICAgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKVxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwidGhyb3dcIixcbiAgICAgICAgYXJnOiBlcnJcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiOyAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cblxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9OyAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cblxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fSAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG5cblxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG5cbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJiBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9IEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpOyAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgICBkZWZpbmUocHJvdG90eXBlLCBtZXRob2QsIGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uIChnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3IgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fCAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIiA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uIChnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGRlZmluZShnZW5GdW4sIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpO1xuICAgIH1cblxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9OyAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuXG5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgX19hd2FpdDogYXJnXG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvciwgUHJvbWlzZUltcGwpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG5cbiAgICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24gKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPSAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZykgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH0gLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cblxuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG5cbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjsgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG5cbiAgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uIChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCwgUHJvbWlzZUltcGwpIHtcbiAgICBpZiAoUHJvbWlzZUltcGwgPT09IHZvaWQgMCkgUHJvbWlzZUltcGwgPSBQcm9taXNlO1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3Iod3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCksIFByb21pc2VJbXBsKTtcbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfSAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG5cblxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuXG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZSA/IEdlblN0YXRlQ29tcGxldGVkIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkOyAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cblxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0gLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuXG5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG5cbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAvLyBOb3RlOiBbXCJyZXR1cm5cIl0gbXVzdCBiZSB1c2VkIGZvciBFUzMgcGFyc2luZyBjb21wYXRpYmlsaXR5LlxuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCFpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlOyAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7IC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9IC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cblxuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH0gLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuXG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcbiAgZGVmaW5lKEdwLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JcIik7IC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cblxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7XG4gICAgICB0cnlMb2M6IGxvY3NbMF1cbiAgICB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7XG4gICAgICB0cnlMb2M6IFwicm9vdFwiXG4gICAgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cblxuICAgIGtleXMucmV2ZXJzZSgpOyAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcblxuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH0gLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG5cblxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG5cbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsXG4gICAgICAgICAgICBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9IC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cblxuXG4gICAgcmV0dXJuIHtcbiAgICAgIG5leHQ6IGRvbmVSZXN1bHRcbiAgICB9O1xuICB9XG5cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgIGRvbmU6IHRydWVcbiAgICB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG4gICAgcmVzZXQ6IGZ1bmN0aW9uIChza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDsgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiYgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiYgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHN0b3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcblxuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uIChleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG5cbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhIWNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFicnVwdDogZnVuY3Rpb24gKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiYgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJiB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiYgKHR5cGUgPT09IFwiYnJlYWtcIiB8fCB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHwgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG4gICAgZmluaXNoOiBmdW5jdGlvbiAoZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG5cbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbiAodHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH0gLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG5cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24gKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07IC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuXG4gIHJldHVybiBleHBvcnRzO1xufSggLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbi8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4vLyBvYmplY3QuIEVpdGhlciB3YXksIHRoZSByZXN1bHRpbmcgb2JqZWN0IHdpbGwgYmUgdXNlZCB0byBpbml0aWFsaXplXG4vLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxudHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge30pO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbn0iLCJpZihwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIpIHtcclxuICAgIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4va2V5c19wcm9kXCIpXHJcbn0gZWxzZSB7XHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL2tleXNfZGV2XCIpXHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIHB1YmdBUEk6ICdleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcWRHa2lPaUkxTm1NMVkyTTVNQzFsWW1abUxUQXhNemd0TVdReE9DMDBZbU15TmpWbU16RXlZakVpTENKcGMzTWlPaUpuWVcxbGJHOWphMlZ5SWl3aWFXRjBJam94TmpBeU1qQTRNRFl3TENKd2RXSWlPaUppYkhWbGFHOXNaU0lzSW5ScGRHeGxJam9pY0hWaVp5SXNJbUZ3Y0NJNkltTnNhWEJ3WldRaWZRLllHQmxoM2VKcVJQT2tlU0RKcVRVS0cycUFRX3E2Y2V4OE9CS1V1cEx0U0knLFxyXG4gICAgdHdpdGNoQVBJOiAnNmRnaWExcG12bXJsczNpNmxlemdybWlidjAzMHB6JyxcclxuICAgIGNsaWVudFNFQ1JFVDogJ2I3aGcyemdoOWxnczV2N2k5MDEwZmtsZ3djaWtzaycsXHJcbiAgICBvQVVUSDogJ24wdXM3bXk1MHh1ajIzZGcycTg5empqNnh2ejJhdycsXHJcbiAgICBnYW1lSUQ6ICc0OTMwNTcnXHJcbn0iLCJpbXBvcnQgJy4uL3NyYy9zdHlsZXMvaW5kZXguc2Nzcyc7XHJcbmltcG9ydCB7IGdldE1hdGNoLCBnZXRQbGF5ZXJCeU5hbWUsIGdldFR3aXRjaFVzZXIsIGdldFRlbGVtZXRyeSwgZ2V0VmlkZW9zLCBnZXRQdWJnVmlkZW9zLCB0aW1lR3JlYXRlclRoYW4sIHRpbWVHcmVhdGVyVGhhbjIsIHRpbWVzdGFtcCB9IGZyb20gJy4vc2NyaXB0cy9zZWFyY2hfdXRpbGl0aWVzJztcclxuaW1wb3J0IFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lXCI7XHJcbmltcG9ydCB7IG5vVmlkZW9zRm91bmQsIHZpZGVvc0ZvdW5kIH0gZnJvbSAnLi9zY3JpcHRzL25vX3ZpZGVvc19mb3VuZCc7XHJcbmltcG9ydCB7IGRpc3BsYXlTdHJlYW1zIH0gZnJvbSAnLi9zY3JpcHRzL3N0cmVhbXMnO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG4gICAgY29uc3QgdGVzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0ZXN0XCIpWzBdO1xyXG4gICAgbGV0IGE7XHJcbiAgICB0ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGEgPSBhd2FpdCBnZXRNYXRjaCgnNjlmZDBkZTctMmRkMy00NGFhLWIxODktNDg3MTY2ZDMwOWY3Jyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coYSk7XHJcbiAgICB9KVxyXG4gICAgbGV0IEJMQUNLTElTVEVEID0ge307XHJcbiAgICBsZXQga0FWID0gW107XHJcbiAgICBsZXQgYWN0dWFsO1xyXG4gICAgbGV0IHN0cmVhbXMgPSBbXTtcclxuICAgIC8vIGxldCBnYW1lcnRhZyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJnYW1lcnRhZy1maWVsZFwiKVswXS52YWx1ZTtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJnZXRTdHJlYW1zXCIpWzBdO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mYS1zZWFyY2hcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGdldFBsYXllcik7XHJcblxyXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcclxuICAgIGlucHV0LmNsYXNzTGlzdC5hZGQoXCJpbnB1dC1jb250YWluZXJcIik7XHJcbiAgICBpbnB1dC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICBjb25zdCB1biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIHVuLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xyXG4gICAgdW4uc2V0QXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIiwgXCJUd2l0Y2ggVXNlclwiKTtcclxuICAgIHVuLmNsYXNzTGlzdC5hZGQoXCJ1bi1maWVsZFwiKTtcclxuICAgIGlucHV0LmFwcGVuZENoaWxkKHVuKTtcclxuICAgIGNvbnN0IGd0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgZ3Quc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XHJcbiAgICBndC5zZXRBdHRyaWJ1dGUoXCJwbGFjZWhvbGRlclwiLCBcIlBVQkcgVXNlclwiKTtcclxuICAgIGd0LmNsYXNzTGlzdC5hZGQoXCJndC1maWVsZFwiKTtcclxuICAgIGlucHV0LmFwcGVuZENoaWxkKGd0KTtcclxuICAgIGNvbnN0IHN1Ym1pdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgc3VibWl0LmNsYXNzTGlzdC5hZGQoXCJzdWJtaXQtc3RyZWFtXCIpO1xyXG4gICAgc3VibWl0LmlubmVySFRNTCA9IFwiU2VhcmNoXCI7XHJcbiAgICBpbnB1dC5hcHBlbmRDaGlsZChzdWJtaXQpO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGlucHV0KTtcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdldFN0cmVhbXNcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xyXG4gICAgICAgIGlmKGlucHV0LnN0eWxlLmRpc3BsYXkgPT09IFwiZmxleFwiKSB7XHJcbiAgICAgICAgICAgIGlucHV0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIGlucHV0LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3VibWl0LXN0cmVhbVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZ2V0SW5wdXQpO1xyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldElucHV0KCkge1xyXG4gICAgICAgIGNvbnN0IHVuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInVuLWZpZWxkXCIpWzBdLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IGd0YWcgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZ3QtZmllbGRcIilbMF0udmFsdWU7XHJcblxyXG4gICAgICAgIGlmKHVuYW1lICYmIGd0YWcpIHtcclxuICAgICAgICAgICAgY29uc3QgZnAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICAgICAgZnAuY2xhc3NMaXN0LmFkZChcImxvYWRpbmcxXCIsIFwibG9hZFwiKTtcclxuICAgICAgICAgICAgZnAuaW5uZXJIVE1MID0gJ0ZldGNoaW5nIFZpZGVvcyAuLi4nO1xyXG4gICAgICAgICAgICBpbnB1dC5hcHBlbmRDaGlsZChmcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYWxsVmlkcyA9IGF3YWl0IGdldFN0cmVhbXModW5hbWUsIGd0YWcpO1xyXG4gICAgICAgIGRpc3BsYXlTdHJlYW1zKGtBViwgYWxsVmlkcywgZ3RhZyk7XHJcblxyXG5cclxuICAgICAgICBhc3luYyBmdW5jdGlvbiBnZXRTdHJlYW1zKHVuYW1lLCBndGFnKSB7XHJcbiAgICAgICAgICAgIGxldCBtYXRjaGVzID0gYXdhaXQgZ2V0UGxheWVyQnlOYW1lKGd0YWcpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtYXRjaGVzKTtcclxuICAgICAgICAgICAgYWN0dWFsID0gbWF0Y2hlcy5tYXAoYXN5bmMgbWF0Y2ggPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IGdldE1hdGNoKG1hdGNoLmlkKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgXHJcbiAgICAgICAgICAgIGxldCBnYW1lcyA9IGF3YWl0IFByb21pc2UuYWxsU2V0dGxlZChhY3R1YWwpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lcylcclxuICAgIFxyXG4gICAgICAgICAgICBnYW1lcy5mb3JFYWNoKGFzeW5jIG1hdGNoID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKG1hdGNoLnZhbHVlKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihtYXRjaC52YWx1ZS5pbmNsdWRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaC52YWx1ZS5pbmNsdWRlZC5mb3JFYWNoKGFzeW5jIGVsZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbGUuaWQgPT09IG1hdGNoLnZhbHVlLmRhdGEucmVsYXRpb25zaGlwcy5hc3NldHMuZGF0YVswXS5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50cy5wdXNoKGdldFRlbGVtZXRyeShlbGUuYXR0cmlidXRlcy5VUkwpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgIFxyXG4gICAgICAgICAgICBsZXQgdGVsZW1ldHJ5ID0gYXdhaXQgUHJvbWlzZS5hbGxTZXR0bGVkKGV2ZW50cyk7XHJcbiAgICBcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGVsZW1ldHJ5KVxyXG4gICAgICAgICAgICB0ZWxlbWV0cnkuZm9yRWFjaChldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudC52YWx1ZS5mb3JFYWNoKGxvZyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoKChsb2cuX1QgPT09IFwiTG9nUGxheWVyS2lsbFwiICYmIGxvZy5raWxsZXIpICYmIGxvZy5raWxsZXIubmFtZSA9PT0gZ3RhZykgfHwgKChsb2cuX1QgPT09IFwiTG9nUGxheWVyS2lsbFwiICYmIGxvZy52aWN0aW0pICYmIGxvZy52aWN0aW0ubmFtZSA9PT0gZ3RhZykpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrQVYucHVzaChsb2cpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coa0FWKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCB0d2l0Y2hVc2VyID0gYXdhaXQgZ2V0VHdpdGNoVXNlcih1bmFtZSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgaWYocmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpLnRoZW4oanNvbiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBqc29uXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGlmKHR3aXRjaFVzZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmKHR3aXRjaFVzZXIuZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZpZGVvcyA9IGF3YWl0IGdldFZpZGVvcyh0d2l0Y2hVc2VyLmRhdGFbMF0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHZpZGVvcy5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsaXBzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihjb25zdCB2aWQgb2YgdmlkZW9zLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaXBzLnB1c2goZ2V0UHViZ1ZpZGVvcyh2aWQuaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYyA9IGF3YWl0IFByb21pc2UuYWxsKGNsaXBzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbXMgPSBjLmZpbHRlcihlbGUgPT4gZWxlLmdhbWUgPT09IFwiUExBWUVSVU5LTk9XTidTIEJBVFRMRUdST1VORFNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlYnVnZ2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJlYW1zO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgYWN0dWFsTWF0Y2hlcyA9IFtdO1xyXG4gICAgbGV0IGV2ZW50cyA9IFtdO1xyXG4gICAgbGV0IHRlbGVtZXRyeUV2ZW50cyA9IFtdO1xyXG4gICAgbGV0IGNsaXBzID0gW107XHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRQbGF5ZXIoKSB7XHJcbiAgICAgICAgbGV0IGdhbWVydGFnID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImdhbWVydGFnLWZpZWxkXCIpWzBdLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IHNwbGFzaCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzcGxhc2gtY29udGVudFwiKVswXTtcclxuICAgICAgICBjb25zdCBsb2dvID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImxvZ29cIilbMF07XHJcbiAgICAgICAgY29uc3QgZmV0Y2hpbmdQbGF5ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICBmZXRjaGluZ1BsYXllci5jbGFzc0xpc3QuYWRkKFwibG9hZGluZzFcIiwgXCJsb2FkaW5nXCIpO1xyXG4gICAgICAgIGZldGNoaW5nUGxheWVyLmlubmVySFRNTCA9ICdGZXRjaGluZyBQbGF5ZXIgLi4uJztcclxuICAgICAgICBzcGxhc2guYXBwZW5kQ2hpbGQoZmV0Y2hpbmdQbGF5ZXIpO1xyXG4gICAgICAgIGxldCBtYXRjaGVzID0gYXdhaXQgZ2V0UGxheWVyQnlOYW1lKGdhbWVydGFnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhtYXRjaGVzKTtcclxuICAgICAgICBhY3R1YWxNYXRjaGVzID0gbWF0Y2hlcy5tYXAoYXN5bmMgbWF0Y2ggPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgZ2V0TWF0Y2gobWF0Y2guaWQpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZmV0Y2hpbmdQbGF5ZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIGNvbnN0IGZldGNoaW5nTWF0Y2hlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgIGZldGNoaW5nTWF0Y2hlcy5jbGFzc0xpc3QuYWRkKFwibG9hZGluZzJcIiwgXCJsb2FkaW5nXCIpO1xyXG4gICAgICAgIGZldGNoaW5nTWF0Y2hlcy5pbm5lckhUTUwgPSAnRmV0Y2hpbmcgTWF0Y2hlcyAuLi4nO1xyXG4gICAgICAgIHNwbGFzaC5hcHBlbmRDaGlsZChmZXRjaGluZ01hdGNoZXMpO1xyXG5cclxuICAgICAgICBsZXQgZ2FtZXMgPSBhd2FpdCBQcm9taXNlLmFsbFNldHRsZWQoYWN0dWFsTWF0Y2hlcyk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coZ2FtZXMpXHJcblxyXG5cclxuICAgICAgICBmZXRjaGluZ01hdGNoZXMuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIGNvbnN0IGZldGNoaW5nRXZlbnRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgZmV0Y2hpbmdFdmVudHMuY2xhc3NMaXN0LmFkZChcImxvYWRpbmczXCIsIFwibG9hZGluZ1wiKTtcclxuICAgICAgICBmZXRjaGluZ0V2ZW50cy5pbm5lckhUTUwgPSAnRmV0Y2hpbmcgRXZlbnRzIC4uLic7XHJcbiAgICAgICAgc3BsYXNoLmFwcGVuZENoaWxkKGZldGNoaW5nRXZlbnRzKTtcclxuXHJcbiAgICAgICAgZ2FtZXMuZm9yRWFjaChhc3luYyBtYXRjaCA9PiB7XHJcbiAgICAgICAgICAgIGlmKG1hdGNoLnZhbHVlKXtcclxuICAgICAgICAgICAgICAgIGlmKG1hdGNoLnZhbHVlLmluY2x1ZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2gudmFsdWUuaW5jbHVkZWQuZm9yRWFjaChhc3luYyBlbGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihlbGUuaWQgPT09IG1hdGNoLnZhbHVlLmRhdGEucmVsYXRpb25zaGlwcy5hc3NldHMuZGF0YVswXS5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzLnB1c2goZ2V0VGVsZW1ldHJ5KGVsZS5hdHRyaWJ1dGVzLlVSTCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgbGV0IHRlbGVtZXRyeSA9IGF3YWl0IFByb21pc2UuYWxsU2V0dGxlZChldmVudHMpO1xyXG5cclxuICAgICAgICBmZXRjaGluZ0V2ZW50cy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgY29uc3QgZmV0Y2hpbmdLaWxsc0FuZERlYXRocyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgIGZldGNoaW5nS2lsbHNBbmREZWF0aHMuY2xhc3NMaXN0LmFkZChcImxvYWRpbmc0XCIsIFwibG9hZGluZ1wiKTtcclxuICAgICAgICBmZXRjaGluZ0tpbGxzQW5kRGVhdGhzLmlubmVySFRNTCA9ICdGZXRjaGluZyBLaWxscyBhbmQgRGVhdGhzIC4uLic7XHJcbiAgICAgICAgc3BsYXNoLmFwcGVuZENoaWxkKGZldGNoaW5nS2lsbHNBbmREZWF0aHMpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRlbGVtZXRyeSlcclxuICAgICAgICB0ZWxlbWV0cnkuZm9yRWFjaChldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50LnZhbHVlLmZvckVhY2gobG9nID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKCgobG9nLl9UID09PSBcIkxvZ1BsYXllcktpbGxcIiAmJiBsb2cua2lsbGVyKSAmJiBsb2cua2lsbGVyLm5hbWUgPT09IGdhbWVydGFnKSB8fCAoKGxvZy5fVCA9PT0gXCJMb2dQbGF5ZXJLaWxsXCIgJiYgbG9nLnZpY3RpbSkgJiYgbG9nLnZpY3RpbS5uYW1lID09PSBnYW1lcnRhZykpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbGVtZXRyeUV2ZW50cy5wdXNoKGxvZylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRlbGVtZXRyeUV2ZW50cylcclxuICAgICAgICBmZXRjaGluZ0tpbGxzQW5kRGVhdGhzLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICBjb25zdCBmZXRjaGluZ1ZpZGVvcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgIGZldGNoaW5nVmlkZW9zLmNsYXNzTGlzdC5hZGQoXCJsb2FkaW5nNVwiLCBcImxvYWRpbmdcIik7XHJcbiAgICAgICAgZmV0Y2hpbmdWaWRlb3MuaW5uZXJIVE1MID0gJ0ZldGNoaW5nIFZpZGVvcyAuLi4nO1xyXG4gICAgICAgIHNwbGFzaC5hcHBlbmRDaGlsZChmZXRjaGluZ1ZpZGVvcyk7XHJcbiAgICAgICAgZm9yKGNvbnN0IHRFdmVudCBvZiB0ZWxlbWV0cnlFdmVudHMpIHtcclxuICAgICAgICAgICAgbGV0IGV2ZW50VGltZXN0YW1wID0gdEV2ZW50Ll9EO1xyXG4gICAgICAgICAgICBpZih0RXZlbnQua2lsbGVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZighQkxBQ0tMSVNURURbdEV2ZW50LmtpbGxlci5uYW1lXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR3aXRjaFVzZXIgPSBhd2FpdCBnZXRUd2l0Y2hVc2VyKHRFdmVudC5raWxsZXIubmFtZSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKS50aGVuKGpzb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBqc29uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHR3aXRjaFVzZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodHdpdGNoVXNlci5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2aWRlb3MgPSBhd2FpdCBnZXRWaWRlb3ModHdpdGNoVXNlci5kYXRhWzBdLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHZpZGVvcy5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWRlb3MuZGF0YS5tYXAoYXN5bmMgdmlkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsaXAgPSBhd2FpdCBnZXRQdWJnVmlkZW9zKHZpZC5pZCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNsaXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlYnVnZ2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjbGlwLmdhbWUgPT09IFwiUExBWUVSVU5LTk9XTidTIEJBVFRMRUdST1VORFNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlYnVnZ2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGltZUdyZWF0ZXJUaGFuKGV2ZW50VGltZXN0YW1wLCBjbGlwLmNyZWF0ZWRfYXQpICYmIHRpbWVHcmVhdGVyVGhhbjIoZXZlbnRUaW1lc3RhbXAsIGNsaXAuY3JlYXRlZF9hdCwgY2xpcC5sZW5ndGgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlYnVnZ2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaXBzLnB1c2goe1widXJsXCI6IGNsaXAudXJsLCBcInRpbWVzdGFtcEluU2Vjb25kc1wiOiB0aW1lc3RhbXAoZXZlbnRUaW1lc3RhbXAsIGNsaXAuY3JlYXRlZF9hdCwgY2xpcC5sZW5ndGgpLCBcImV2ZW50XCI6IHRFdmVudCwgXCJ2b2RcIjogY2xpcH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJMQUNLTElTVEVEW3RFdmVudC5raWxsZXIubmFtZV0gPSB0RXZlbnQua2lsbGVyLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBCTEFDS0xJU1RFRFt0RXZlbnQua2lsbGVyLm5hbWVdID0gdEV2ZW50LmtpbGxlci5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0RXZlbnQudmljdGltKSB7XHJcbiAgICAgICAgICAgICAgICBpZighQkxBQ0tMSVNURURbdEV2ZW50LnZpY3RpbS5uYW1lXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR3aXRjaFVzZXIgPSBhd2FpdCBnZXRUd2l0Y2hVc2VyKHRFdmVudC52aWN0aW0ubmFtZSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKS50aGVuKGpzb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBqc29uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHR3aXRjaFVzZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodHdpdGNoVXNlci5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2aWRlb3MgPSBhd2FpdCBnZXRWaWRlb3ModHdpdGNoVXNlci5kYXRhWzBdLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHZpZGVvcy5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWRlb3MuZGF0YS5tYXAoYXN5bmMgdmlkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsaXAgPSBhd2FpdCBnZXRQdWJnVmlkZW9zKHZpZC5pZCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNsaXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlYnVnZ2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjbGlwLmdhbWUgPT09IFwiUExBWUVSVU5LTk9XTidTIEJBVFRMRUdST1VORFNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlYnVnZ2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGltZUdyZWF0ZXJUaGFuKGV2ZW50VGltZXN0YW1wLCBjbGlwLmNyZWF0ZWRfYXQpICYmIHRpbWVHcmVhdGVyVGhhbjIoZXZlbnRUaW1lc3RhbXAsIGNsaXAuY3JlYXRlZF9hdCwgY2xpcC5sZW5ndGgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlYnVnZ2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaXBzLnB1c2goe1widXJsXCI6IGNsaXAudXJsLCBcInRpbWVzdGFtcEluU2Vjb25kc1wiOiB0aW1lc3RhbXAoZXZlbnRUaW1lc3RhbXAsIGNsaXAuY3JlYXRlZF9hdCwgY2xpcC5sZW5ndGgpLCBcImV2ZW50XCI6IHRFdmVudCwgXCJ2b2RcIjogY2xpcH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBCTEFDS0xJU1RFRFt0RXZlbnQudmljdGltLm5hbWVdID0gdEV2ZW50LnZpY3RpbS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJMQUNLTElTVEVEW3RFdmVudC52aWN0aW0ubmFtZV0gPSB0RXZlbnQudmljdGltLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBmaW5hbCA9IGF3YWl0IFByb21pc2UuYWxsU2V0dGxlZChjbGlwcyk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coZmluYWwpO1xyXG4gICAgICAgIGlmKGZpbmFsLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBmZXRjaGluZ1ZpZGVvcy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgIGxvZ28uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICBub1ZpZGVvc0ZvdW5kKGdhbWVydGFnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsb2dvLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgZmV0Y2hpbmdWaWRlb3Muc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICB2aWRlb3NGb3VuZChnYW1lcnRhZywgZmluYWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkiLCJjb25zdCBkYXRlQ29udmVydGVyID0gKHVnbHlEYXRlKSA9PiB7XHJcbiAgICBsZXQgZmFrZUhhbGYgPSB1Z2x5RGF0ZS5zcGxpdChcIlRcIik7XHJcbiAgICBsZXQgcmVhbEhhbGYgPSBmYWtlSGFsZlswXS5zcGxpdChcIi1cIik7XHJcblxyXG4gICAgbGV0IHJlYWxEYXRlID0gTU9OVEhTW3JlYWxIYWxmWzFdXSArIFwiLCBcIiArIHJlYWxIYWxmWzJdICsgXCIgXCIgKyByZWFsSGFsZlswXTtcclxuXHJcbiAgICByZXR1cm4gcmVhbERhdGU7XHJcbn1cclxuXHJcbmNvbnN0IE1PTlRIUyA9IHtcclxuICAgIFwiMDFcIjogXCJKYW51YXJ5XCIsXHJcbiAgICBcIjAyXCI6IFwiRmVicnVhcnlcIixcclxuICAgIFwiMDNcIjogXCJNYXJjaFwiLFxyXG4gICAgXCIwNFwiOiBcIkFwcmlsXCIsXHJcbiAgICBcIjA1XCI6IFwiTWF5XCIsXHJcbiAgICBcIjA2XCI6IFwiSnVuZVwiLFxyXG4gICAgXCIwN1wiOiBcIkp1bHlcIixcclxuICAgIFwiMDhcIjogXCJBdWd1c3RcIixcclxuICAgIFwiMDlcIjogXCJTZXB0ZW1iZXJcIixcclxuICAgIFwiMTBcIjogXCJPY3RvYmVyXCIsXHJcbiAgICBcIjExXCI6IFwiTm92ZW1iZXJcIixcclxuICAgIFwiMTJcIjogXCJEZWNlbWJlclwiXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRhdGVDb252ZXJ0ZXI7IiwiZXhwb3J0IGNvbnN0IG5vVmlkZW9zRm91bmQgPSAoZ2FtZXJ0YWcpID0+IHtcclxuICAgIGNvbnN0IHNwbGFzaCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzcGxhc2gtY29udGVudFwiKVswXTtcclxuICAgIHNwbGFzaC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICBjb25zdCBsb2dvID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImxvZ29cIilbMF07XHJcbiAgICBsb2dvLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIGNvbnN0IHBhcmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpXHJcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgIGJ1dHRvbi5pbm5lckhUTUwgPSAnJmxhcnI7JztcclxuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYmFja1wiKTtcclxuICAgIHBhcmVudC5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XHJcbiAgICBwYXJlbnQuY2xhc3NMaXN0LmFkZChcInBhcmVudC1jb250YWluZXJcIik7XHJcbiAgICBjb25zdCBwbGF5ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgcGxheWVyLmlubmVySFRNTCA9IGA8aDI+JHsgZ2FtZXJ0YWcgfTwvaDI+YDtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwbGF5ZXIpO1xyXG4gICAgY29uc3QgbWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBtZXNzYWdlLmlubmVySFRNTCA9ICc8cD5ObyB2aWRlb3MgZm91bmQgZm9yIHRoaXMgdXNlcjwvcD4nO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1lc3NhZ2UpO1xyXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBhcmVudCk7XHJcblxyXG4gICAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnLyc7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB2aWRlb3NGb3VuZCA9IChnYW1lcnRhZywgY2xpcHMpID0+IHtcclxuICAgIGNvbnN0IHNwbGFzaCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzcGxhc2gtY29udGVudFwiKVswXTtcclxuICAgIHNwbGFzaC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICBjb25zdCBsb2dvID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImxvZ29cIilbMF07XHJcbiAgICBjb25zdCBwYXJlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKVxyXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICBidXR0b24uaW5uZXJIVE1MID0gJyZsYXJyOyc7XHJcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImJhY2tcIik7XHJcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xyXG4gICAgcGFyZW50LmNsYXNzTGlzdC5hZGQoXCJwYXJlbnQtY29udGFpbmVyXCIpO1xyXG4gICAgY29uc3QgcGxheWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHBsYXllci5pbm5lckhUTUwgPSBgPGgyPiR7IGdhbWVydGFnIH08L2gyPmA7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocGxheWVyKTtcclxuICAgIFxyXG4gICAgY29uc3QgbGlzdE9mVmlkcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcclxuICAgIGxpc3RPZlZpZHMuY2xhc3NMaXN0LmFkZChcImxpc3Qtb2Ytdmlkc1wiKTtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBjbGlwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xyXG4gICAgICAgIHVsLmlubmVySFRNTCA9IGA8aDM+JHsgY2xpcHNbaV0udmFsdWUuZXZlbnQua2lsbGVyLm5hbWUgfTwvaDM+PHNwYW4+a2lsbGluZyAkeyBjbGlwc1tpXS52YWx1ZS5ldmVudC52aWN0aW0ubmFtZSB9PC9zcGFuPmA7XHJcbiAgICAgICAgdWwuY2xhc3NMaXN0LmFkZChgJHsgY2xpcHNbaV0udmFsdWUuZXZlbnQua2lsbGVyLm5hbWUgPT09IGdhbWVydGFnID8gXCJnXCIgOiBcInJcIiB9YCwgXCJ2aWRlb0JveFwiKTtcclxuICAgICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xyXG4gICAgICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoXCJtb2RhbFwiKTtcclxuICAgICAgICAvLyBjb25zdCBpZnJtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlmcmFtZVwiKTtcclxuICAgICAgICAvLyBpZnJtLnNldEF0dHJpYnV0ZShcInNyY1wiLCBgaHR0cHM6Ly9wbGF5ZXIudHdpdGNoLnR2Lz92aWRlbz0keyBjbGlwc1tpXS52YWx1ZS52b2QuX2lkIH0mYXV0b3BsYXk9ZmFsc2UmcGFyZW50PWxvY2FsaG9zdCZ0aW1lPSR7IGNsaXBzW2ldLnZhbHVlLnRpbWVzdGFtcEluU2Vjb25kcyB9YCk7XHJcbiAgICAgICAgLy8gaWZybS5zZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiwgXCI1NDBcIik7XHJcbiAgICAgICAgLy8gaWZybS5zZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiLCBcIjk3MFwiKTtcclxuICAgICAgICAvLyBpZnJtLnNldEF0dHJpYnV0ZShcImZyYW1lYm9yZGVyXCIsIFwiMFwiKTtcclxuICAgICAgICAvLyBpZnJtLnNldEF0dHJpYnV0ZShcInNjcm9sbGluZ1wiLCBcIm5vXCIpO1xyXG4gICAgICAgIC8vIGlmcm0uc2V0QXR0cmlidXRlKFwiYWxsb3dmdWxsc2NyZWVuXCIsIFwidHJ1ZVwiKTtcclxuICAgICAgICAvLyBpZnJtLmNsYXNzTGlzdC5hZGQoXCJmcmFtZVwiKTtcclxuICAgICAgICAvLyBtb2RhbC5hcHBlbmRDaGlsZChpZnJtKTtcclxuICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHsgaSB9YCk7XHJcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJ2ZnJhbWUyXCIpO1xyXG4gICAgICAgIG1vZGFsLmFwcGVuZENoaWxkKGRpdik7XHJcblxyXG4gICAgICAgIHVsLmFwcGVuZENoaWxkKG1vZGFsKTtcclxuICAgICAgICBsaXN0T2ZWaWRzLmFwcGVuZENoaWxkKHVsKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgIGJ0bi5pbm5lckhUTUwgPSAnJiMxMDAwNjsnO1xyXG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJjbG9zZVwiKTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChsaXN0T2ZWaWRzKVxyXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoYnRuKTtcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocGFyZW50KTtcclxuXHJcbiAgICBcclxuICAgIGxldCBuYW1lcyA9IFtdO1xyXG4gICAgZm9yKGxldCBqID0gMDsgaiA8IGNsaXBzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgbmFtZXMucHVzaChcInBsYXllclwiICsgailcclxuICAgIH1cclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBjbGlwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICB3aWR0aDogOTcwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDU0MCxcclxuICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgICAgICAgICB0aW1lOiBgJHsgY2xpcHNbaV0udmFsdWUudGltZXN0YW1wSW5TZWNvbmRzIH1gLFxyXG4gICAgICAgICAgICB2aWRlbzogYCR7IGNsaXBzW2ldLnZhbHVlLnZvZC5faWQgfWBcclxuICAgICAgICB9O1xyXG4gICAgICAgIG5hbWVzW2ldID0gbmV3IFR3aXRjaC5QbGF5ZXIoYCR7IGkgfWAsIG9wdGlvbnMpO1xyXG4gICAgICAgIG5hbWVzW2ldLnNldFZvbHVtZSgwLjUpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2xvc2VcIikuZm9yRWFjaChiID0+IHtcclxuICAgICAgICAgICAgYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIG5hbWVzW2ldLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnZpZGVvQm94JykuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBjb25zdCBmcm0gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCcpO1xyXG4gICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZScpO1xyXG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgICAgICAgICAgZnJtLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgICAgICAgICAgYnRuLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNsb3NlJykuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICB4LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tb2RhbCcpLmZvckVhY2goZnJtID0+IHtcclxuICAgICAgICAgICAgICAgIGZybS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICB4LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICBidXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvJztcclxuICAgIH1cclxufSIsImltcG9ydCBLZXkgZnJvbSAnLi4vY29uZmlnL2tleXMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFBsYXllckJ5TmFtZSA9IGdhbWVydGFnID0+IHtcclxuICAgIGNvbnN0IHBsYXllckJ5TmFtZUluaXQgPSB7XHJcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHsgS2V5LnB1YmdBUEkgfWAsXHJcbiAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL3ZuZC5hcGkranNvbidcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGxldCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoYGh0dHBzOi8vYXBpLnB1YmcuY29tL3NoYXJkcy94Ym94L3BsYXllcnM/ZmlsdGVyW3BsYXllck5hbWVzXT0keyBnYW1lcnRhZyB9YCwgcGxheWVyQnlOYW1lSW5pdCk7XHJcbiAgICByZXR1cm4gZmV0Y2gocmVxdWVzdCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgIGlmKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgIC8vIGRlYnVnZ2VyXHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCkudGhlbihqc29uID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBqc29uLmRhdGFbMF0ucmVsYXRpb25zaGlwcy5tYXRjaGVzLmRhdGE7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldE1hdGNoID0gKG1hdGNoSWQpID0+IHtcclxuICAgIGNvbnN0IGdhbWVJbml0ID0ge1xyXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICB9XHJcblxyXG4gICAgLy8gbGV0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdChgaHR0cHM6Ly9hcGkucHViZy5jb20vc2hhcmRzL3hib3gvbWF0Y2hlcy8keyBtYXRjaElkIH1gLCBnYW1lSW5pdCk7XHJcbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGAvcHViZy9nYW1lcnRhZy8keyBtYXRjaElkIH1gLCBnYW1lSW5pdClcclxuICAgIHJldHVybiBmZXRjaChyZXF1ZXN0KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxyXG4gICAgfSlcclxufVxyXG4vLyB3aW5kb3cuZ2V0TWF0Y2ggPSBnZXRNYXRjaDtcclxuLy9cclxuZXhwb3J0IGNvbnN0IGdldFRlbGVtZXRyeSA9ICh1cmwpID0+IHtcclxuICAgIGNvbnN0IHRlbGVtZXRyeUluaXQgPSB7XHJcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL3ZuZC5hcGkranNvbidcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdCh1cmwsIHRlbGVtZXRyeUluaXQpO1xyXG4gICAgcmV0dXJuIGZldGNoKHJlcXVlc3QpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICBpZihyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpLnRoZW4oanNvbiA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ganNvblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuLy8gd2luZG93LmdldFRlbGVtZXRyeSA9IGdldFRlbGVtZXRyeTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRPQXV0aCA9ICgpID0+IHtcclxuICAgIGNvbnN0IG9hdXRoSW5pdCA9IHtcclxuICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAvLyBzY29wZTogJ3VzZXI6cmVhZDplbWFpbCdcclxuXHJcbiAgICB9XHJcbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGBodHRwczovL2lkLnR3aXRjaC50di9vYXV0aDIvdG9rZW4/Y2xpZW50X2lkPSR7IEtleS50d2l0Y2hBUEkgfSZjbGllbnRfc2VjcmV0PSR7IEtleS5jbGllbnRTRUNSRVQgfSZncmFudF90eXBlPWNsaWVudF9jcmVkZW50aWFsc2AsIG9hdXRoSW5pdCk7XHJcbiAgICByZXR1cm4gZmV0Y2gocmVxdWVzdCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgIGlmKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKClcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0VHdpdGNoVXNlciA9IGdhbWVydGFnID0+IHtcclxuICAgIGNvbnN0IHR3aXRjaFVzZXJJbml0ID0ge1xyXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHsgS2V5Lm9BVVRIIH1gLFxyXG4gICAgICAgICAgICAnQ2xpZW50LUlkJzogYCR7IEtleS50d2l0Y2hBUEkgfWBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGBodHRwczovL2FwaS50d2l0Y2gudHYvaGVsaXgvdXNlcnM/bG9naW49JHsgZ2FtZXJ0YWcgfWAsIHR3aXRjaFVzZXJJbml0KTtcclxuICAgIHJldHVybiBmZXRjaChyZXF1ZXN0KVxyXG59XHJcbi8vIHdpbmRvdy5nZXRUd2l0Y2hVc2VyID0gZ2V0VHdpdGNoVXNlcjtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRWaWRlb3MgPSB1c2VySWQgPT4ge1xyXG4gICAgY29uc3QgdHdpdGNoVmlkZW9zSW5pdCA9IHtcclxuICAgICAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7IEtleS5vQVVUSCB9YCxcclxuICAgICAgICAgICAgJ0NsaWVudC1JZCc6IGAkeyBLZXkudHdpdGNoQVBJIH1gXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGV0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdChgaHR0cHM6Ly9hcGkudHdpdGNoLnR2L2hlbGl4L3ZpZGVvcz91c2VyX2lkPSR7IHVzZXJJZCB9YCwgdHdpdGNoVmlkZW9zSW5pdCk7XHJcbiAgICByZXR1cm4gZmV0Y2gocmVxdWVzdCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgIGlmKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKClcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcbi8vIHdpbmRvdy5nZXRWaWRlb3MgPSBnZXRWaWRlb3M7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0UHViZ1ZpZGVvcyA9IHZpZGVvSWQgPT4ge1xyXG4gICAgY29uc3QgdHdpdGNoUHViZ0luaXQgPSB7XHJcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgIFwiQWNjZXB0XCI6IFwiYXBwbGljYXRpb24vdm5kLnR3aXRjaHR2LnY1K2pzb25cIixcclxuICAgICAgICAgICAgJ0NsaWVudC1JZCc6IGAkeyBLZXkudHdpdGNoQVBJIH1gXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGV0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdChgaHR0cHM6Ly9hcGkudHdpdGNoLnR2L2tyYWtlbi92aWRlb3MvJHsgdmlkZW9JZCB9YCwgdHdpdGNoUHViZ0luaXQpO1xyXG4gICAgcmV0dXJuIGZldGNoKHJlcXVlc3QpXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgdGltZUdyZWF0ZXJUaGFuID0gKHQxLCB0MikgPT4ge1xyXG4gICAgLy8gZGVidWdnZXJcclxuICAgIGxldCB0MyA9IG5ldyBEYXRlKHQxKTtcclxuICAgIGxldCB0NCA9IG5ldyBEYXRlKHQyKTtcclxuXHJcbiAgICBpZih0MyA+PSB0NCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdGltZUdyZWF0ZXJUaGFuMiA9ICh0MSwgdDIsIHNlY29uZHMpID0+IHtcclxuICAgIC8vIGRlYnVnZ2VyXHJcbiAgICBsZXQgdDMgPSBuZXcgRGF0ZSh0MSk7XHJcbiAgICBsZXQgdDQgPSBuZXcgRGF0ZSh0Mik7XHJcbiAgICB0NC5zZXRIb3Vycyh0NC5nZXRIb3VycygpLCB0NC5nZXRNaW51dGVzKCksIHQ0LmdldFNlY29uZHMoKSArIHNlY29uZHMpO1xyXG4gICAgaWYgKHQzIDw9IHQ0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbiAgICAvLyBsZXQgaG91cnMgPSB0NC5nZXRIb3VycygpO1xyXG4gICAgLy8gbGV0IG1pbnV0ZXMgPSB0NC5nZXRNaW51dGVzKCk7XHJcbiAgICAvLyBsZXQgc2VjcyA9IHQ0LmdldFNlY29uZHMoKTtcclxuICAgIC8vIGlmKHNlY29uZHMgKyBzZWMgPCA2MCkge1xyXG4gICAgLy8gICAgIHQ0LnNldEhvdXJzKGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzICsgc2VjcylcclxuICAgIC8vIH0gZWxzZSBpZihzZWNvbmRzICsgc2VjID09PSA2MCkge1xyXG4gICAgLy8gICAgIHQ0LnNldEhvdXJzKGhvdXJzLCBtaW51dGVzICsgMSwgMClcclxuICAgIC8vIH0gZWxzZSBpZihzZWNvbmRzICsgc2VjID4gNjApIHtcclxuICAgIC8vICAgICBsZXQgbmV3U2VjcyA9IChzZWNvbmRzICsgc2VjKSAlIDYwO1xyXG4gICAgLy8gICAgIGxldCBuZXdNaW51dGVzID0gKChzZWNvbmRzICsgc2VjKSAtIG5ld1NlY3MpIC8gNjA7XHJcbiAgICAvLyAgICAgbGV0IG1pbjtcclxuICAgIC8vICAgICBsZXQgaG91cnM7XHJcbiAgICAvLyAgICAgaWYobmV3TWludXRlcyA+IDYwKSB7XHJcbiAgICAvLyAgICAgICAgIG1pbiA9IG5ld01pbnV0ZXMgJSA2MDtcclxuICAgIC8vICAgICAgICAgaG91cnMgPSAobmV3TWludXRlcyAtIG1pbikgLyA2MDtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB0aW1lc3RhbXAgPSAodDEsIHQyLCBzZWNvbmRzKSA9PiB7XHJcbiAgICAvLyBkZWJ1Z2dlclxyXG4gICAgbGV0IHQzID0gbmV3IERhdGUodDEpO1xyXG4gICAgbGV0IHQ0ID0gbmV3IERhdGUodDIpO1xyXG4gICAgdDQuc2V0SG91cnModDQuZ2V0SG91cnMoKSwgdDQuZ2V0TWludXRlcygpLCB0NC5nZXRTZWNvbmRzKCkgKyBzZWNvbmRzKTtcclxuICAgIGxldCBzZWNzID0gKCh0NCAtIHQzKSAvIDEwMDApO1xyXG4gICAgLy8gbGV0IG5UID0gdDQuc2V0SG91cnModDQuZ2V0SG91cnMoKSwgdDQuZ2V0TWludXRlcygpLCB0NC5nZXRTZWNvbmRzKCkgLSBzZWNzKTtcclxuICAgIC8vIGxldCBldmVudFRpbWVzdGFtcCA9IG5UIC0gKG5ldyBEYXRlKHQyKSk7XHJcbiAgICBsZXQgdCA9IG5ldyBEYXRlKG51bGwpO1xyXG4gICAgdC5zZXRTZWNvbmRzKChzZWNvbmRzIC0gc2VjcykgLSAxMCk7XHJcbiAgICBsZXQgYSA9IHQudG9JU09TdHJpbmcoKS5zdWJzdHIoMTEsIDgpLnNwbGl0KFwiOlwiKTtcclxuICAgIHJldHVybiBhWzBdICsgXCJoXCIgKyBhWzFdICsgXCJtXCIgKyBhWzJdICsgXCJzXCJcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHRpbWVzdGFtcDIgPSAodDEsIHQyLCBzZWNvbmRzKSA9PiB7XHJcbiAgICBsZXQgdDMgPSBuZXcgRGF0ZSh0MSk7XHJcbiAgICBsZXQgdDQgPSBuZXcgRGF0ZSh0Mik7XHJcbiAgICB0NC5zZXRIb3Vycyh0NC5nZXRIb3VycygpLCB0NC5nZXRNaW51dGVzKCksIHQ0LmdldFNlY29uZHMoKSArIHNlY29uZHMpO1xyXG4gICAgbGV0IHNlY3MgPSAoKHQ0IC0gdDMpIC8gMTAwMCk7XHJcbiAgICBsZXQgblQgPSB0NC5zZXRIb3Vycyh0NC5nZXRIb3VycygpLCB0NC5nZXRNaW51dGVzKCksIHQ0LmdldFNlY29uZHMoKSAtIHNlY3MpO1xyXG4gICAgcmV0dXJuICgoblQgLSAobmV3IERhdGUodDIpKSkgLyAxMDAwKSAtIDEwO1xyXG59IiwiaW1wb3J0IGRhdGVDb252ZXJ0ZXIgZnJvbSAnLi9kYXRlX2NvbnZlcnRlcic7XHJcbmltcG9ydCB7IHRpbWVHcmVhdGVyVGhhbiwgdGltZUdyZWF0ZXJUaGFuMiwgdGltZXN0YW1wLCB0aW1lc3RhbXAyIH0gZnJvbSAnLi9zZWFyY2hfdXRpbGl0aWVzJztcclxuXHJcbmV4cG9ydCBjb25zdCBkaXNwbGF5U3RyZWFtcyA9IChldmVudHMsIHZpZGVvcywgZ3RhZykgPT4ge1xyXG4gICAgY29uc3Qgc3BsYXNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNwbGFzaC1jb250ZW50XCIpWzBdO1xyXG4gICAgc3BsYXNoLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIGNvbnN0IGxvZ28gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibG9nb1wiKVswXTtcclxuICAgIGxvZ28uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgY29uc3QgZnAgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibG9hZFwiKVswXTtcclxuICAgIGZwLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIFxyXG4gICAgbGV0IGNsaXBzID0gW107XHJcbiAgICBsZXQgdmlkZW9IYXNFdmVudHMgPSB7fTtcclxuXHJcbiAgICAvLyBkZWJ1Z2dlclxyXG4gICAgZm9yKGxldCBqID0gMDsgaiA8IHZpZGVvcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYodGltZUdyZWF0ZXJUaGFuKGV2ZW50c1tpXS5fRCwgdmlkZW9zW2pdLmNyZWF0ZWRfYXQpICYmIHRpbWVHcmVhdGVyVGhhbjIoZXZlbnRzW2ldLl9ELCB2aWRlb3Nbal0uY3JlYXRlZF9hdCwgdmlkZW9zW2pdLmxlbmd0aCkpIHtcclxuICAgICAgICAgICAgICAgIHZpZGVvSGFzRXZlbnRzW3ZpZGVvc1tqXS5faWRdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNsaXBzLnB1c2goe1widmlkZW9faWRcIjogdmlkZW9zW2pdLl9pZCwgXCJ1cmxcIjogdmlkZW9zW2pdLnVybCwgXCJzZWVrXCI6IHRpbWVzdGFtcDIoZXZlbnRzW2ldLl9ELCB2aWRlb3Nbal0uY3JlYXRlZF9hdCwgdmlkZW9zW2pdLmxlbmd0aCksIFwidGltZXN0YW1wSW5TZWNvbmRzXCI6IHRpbWVzdGFtcChldmVudHNbaV0uX0QsIHZpZGVvc1tqXS5jcmVhdGVkX2F0LCB2aWRlb3Nbal0ubGVuZ3RoKSwgXCJldmVudFwiOiBldmVudHNbaV0sIFwidm9kXCI6IHZpZGVvc1tqXX0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGFyZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIilcclxuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgYnV0dG9uLmlubmVySFRNTCA9ICcmbGFycjsnO1xyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJiYWNrXCIpO1xyXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcclxuICAgIHBhcmVudC5jbGFzc0xpc3QuYWRkKFwicGFyZW50LWNvbnRhaW5lclwiKTtcclxuICAgIGNvbnN0IHBseXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgcGx5ci5pbm5lckhUTUwgPSBgPGgyPiR7IGd0YWcgfTwvaDI+YDtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwbHlyKTtcclxuICAgIFxyXG4gICAgY29uc3QgbGlzdE9mVmlkcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcclxuICAgIGxpc3RPZlZpZHMuY2xhc3NMaXN0LmFkZChcImxpc3Qtb2Ytdmlkc1wiKTtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB2aWRlb3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZih2aWRlb0hhc0V2ZW50c1t2aWRlb3NbaV0uX2lkXSkge1xyXG4gICAgICAgICAgICBjb25zdCB1bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcclxuICAgICAgICAgICAgdWwuaW5uZXJIVE1MID0gYDxoMz4keyB2aWRlb3NbaV0udGl0bGUgfTwvaDM+PHNwYW4+JHsgZGF0ZUNvbnZlcnRlcih2aWRlb3NbaV0uY3JlYXRlZF9hdCkgfTwvc3Bhbj5gO1xyXG4gICAgICAgICAgICB1bC5jbGFzc0xpc3QuYWRkKFwic3RyZWFtc0JveFwiKTtcclxuICAgICAgICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcclxuICAgICAgICAgICAgbW9kYWwuY2xhc3NMaXN0LmFkZChcIm1vZGFsMlwiKTtcclxuICAgICAgICAgICAgY29uc3QgbW9kYWxfY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIG1vZGFsX2NvbnRlbnQuY2xhc3NMaXN0LmFkZChcIm1vZGFsLWNvbnRlbnRcIik7XHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgY2xpcHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKGNsaXBzW2pdLnZpZGVvX2lkID09PSB2aWRlb3NbaV0uX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVidWdnZXJcclxuICAgICAgICAgICAgICAgICAgICBsaS5pbm5lckhUTUwgPSBgS2lsbGVyOiR7IGNsaXBzW2pdLmV2ZW50LmtpbGxlciA/IChjbGlwc1tqXS5ldmVudC5raWxsZXIubmFtZSkgOiBcIkVudmlyb25tZW50XCIgfSBWaWN0aW06JHsgY2xpcHNbal0uZXZlbnQudmljdGltLm5hbWUgfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmFkZChgJHsgY2xpcHNbal0uZXZlbnQua2lsbGVyID8gKGNsaXBzW2pdLmV2ZW50LmtpbGxlci5uYW1lID09PSBndGFnID8gXCJnclwiIDogXCJyZVwiKSA6IFwicmVcIiB9YCwgXCJub3N0eWxpc3RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7IGNsaXBzW2pdLnNlZWsgfWApXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kYWxfY29udGVudC5hcHBlbmRDaGlsZChsaSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbW9kYWwuYXBwZW5kQ2hpbGQobW9kYWxfY29udGVudCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7IGkgfWApO1xyXG4gICAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZChcInZmcmFtZVwiKTtcclxuICAgICAgICAgICAgbW9kYWwuYXBwZW5kQ2hpbGQoZGl2KTtcclxuXHJcbiAgICAgICAgICAgIHVsLmFwcGVuZENoaWxkKG1vZGFsKTtcclxuICAgICAgICAgICAgbGlzdE9mVmlkcy5hcHBlbmRDaGlsZCh1bCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgIGJ0bi5pbm5lckhUTUwgPSAnJiMxMDAwNjsnO1xyXG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJjbG9zZTJcIik7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobGlzdE9mVmlkcylcclxuICAgIHBhcmVudC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xyXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGJ0bik7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBhcmVudCk7XHJcblxyXG4gICAgbGV0IG5hbWVzID0gW107XHJcbiAgICBmb3IobGV0IGogPSAwOyBqIDwgdmlkZW9zLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgbmFtZXMucHVzaChcInBsYXllclwiICsgailcclxuICAgIH1cclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB2aWRlb3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZih2aWRlb0hhc0V2ZW50c1t2aWRlb3NbaV0uX2lkXSkge1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA5NzAsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDU0MCxcclxuICAgICAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHZpZGVvOiBgJHsgdmlkZW9zW2ldLl9pZCB9YFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBuYW1lc1tpXSA9IG5ldyBUd2l0Y2guUGxheWVyKGAkeyBpIH1gLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgbmFtZXNbaV0uc2V0Vm9sdW1lKDAuNSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ub3N0eWxpc3QnKS5mb3JFYWNoKGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWVzW2ldLnNlZWsoTnVtYmVyKGV2ZW50LmlkKSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNsb3NlMlwiKS5mb3JFYWNoKGIgPT4ge1xyXG4gICAgICAgICAgICAgICAgYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lc1tpXS5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN0cmVhbXNCb3gnKS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIGNvbnN0IGZybSA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLm1vZGFsMicpO1xyXG4gICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZTInKTtcclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcbiAgICAgICAgICAgIGZybS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgICAgICAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jbG9zZTInKS5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgIHguYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1vZGFsMicpLmZvckVhY2goZnJtID0+IHtcclxuICAgICAgICAgICAgICAgIGZybS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICB4LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICBidXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvJztcclxuICAgIH1cclxufSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJzb3VyY2VSb290IjoiIn0=