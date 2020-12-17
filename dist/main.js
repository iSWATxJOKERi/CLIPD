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
  oAUTH: 'ygwbp62tzr3jxe8aqh5cxt1toss9c4',
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
  var streams = [];
  document.getElementsByClassName("fa-github")[0].addEventListener('click', function () {
    window.open("https://github.com/iSWATxJOKERi/CLIPD");
  });
  document.getElementsByClassName("fa-linkedin-in")[0].addEventListener('click', function () {
    window.open("https://www.linkedin.com/in/lawrence-menyah-448597117/");
  });
  document.getElementsByClassName("fa-angellist")[0].addEventListener('click', function () {
    window.open("https://angel.co/u/iswatxjokeri");
  });
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
      var uname, gtag, a, fp, allVids, getStreams, _getStreams;

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

                              _clips.push(Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getPubgVideos"])(vid.id));
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
                a = setInterval(function () {
                  fp.style.display = "none";
                  setTimeout(function () {
                    fp.style.display = "inline";
                  }, 1000);
                }, 2000);
              }

              _context5.next = 7;
              return getStreams(uname, gtag);

            case 7:
              allVids = _context5.sent;
              allVids ? clearInterval(a) : null; // console.log(allVids);

              Object(_scripts_streams__WEBPACK_IMPORTED_MODULE_4__["displayStreams"])(kAV, allVids, gtag);

            case 10:
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
      var gamertag, splash, logo, fetchingPlayer, ape4, matches, fetchingMatches, ape3, games, fetchingEvents, ape, telemetry, fetchingKillsAndDeaths, fetchingVideos, ape2, _iterator2, _step2, _loop, final;

      return regeneratorRuntime.wrap(function _callee11$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              gamertag = document.getElementsByClassName("gamertag-field")[0].value;
              splash = document.getElementById("getStreams");
              logo = document.getElementsByClassName("logo")[0];
              fetchingPlayer = document.createElement("span");
              fetchingPlayer.classList.add("loading1", "loading");
              fetchingPlayer.innerHTML = 'Fetching Player ...';
              splash.appendChild(fetchingPlayer);
              ape4 = setInterval(function () {
                fetchingPlayer.style.display = "none";
                setTimeout(function () {
                  fetchingPlayer.style.display = "inline";
                }, 500);
              }, 1000);
              _context12.next = 10;
              return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getPlayerByName"])(gamertag);

            case 10:
              matches = _context12.sent;
              matches ? clearInterval(ape4) : null; // console.log(matches);
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
              fetchingPlayer.parentNode.removeChild(fetchingPlayer);
              fetchingMatches = document.createElement("span");
              fetchingMatches.classList.add("loading2", "loading");
              fetchingMatches.innerHTML = 'Fetching Matches ...';
              splash.appendChild(fetchingMatches);
              ape3 = setInterval(function () {
                fetchingMatches.style.display = "none";
                setTimeout(function () {
                  fetchingMatches.style.display = "inline";
                }, 500);
              }, 1000);
              _context12.next = 21;
              return Promise.allSettled(actualMatches);

            case 21:
              games = _context12.sent;
              games ? clearInterval(ape3) : null; // console.log(games)

              fetchingMatches.parentNode.removeChild(fetchingMatches);
              fetchingEvents = document.createElement("span");
              fetchingEvents.classList.add("loading3", "loading");
              fetchingEvents.innerHTML = 'Fetching Events ...';
              splash.appendChild(fetchingEvents);
              ape = setInterval(function () {
                fetchingEvents.style.display = "none";
                setTimeout(function () {
                  fetchingEvents.style.display = "inline";
                }, 500);
              }, 1000);
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
              _context12.next = 32;
              return Promise.allSettled(events);

            case 32:
              telemetry = _context12.sent;
              telemetry ? clearInterval(ape) : null;
              fetchingEvents.parentNode.removeChild(fetchingEvents);
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

              fetchingKillsAndDeaths.parentNode.removeChild(fetchingKillsAndDeaths);
              fetchingVideos = document.createElement("span");
              fetchingVideos.classList.add("loading5", "loading");
              fetchingVideos.innerHTML = 'Fetching Videos ...';
              splash.appendChild(fetchingVideos);
              ape2 = setInterval(function () {
                fetchingVideos.style.display = "none";
                setTimeout(function () {
                  fetchingVideos.style.display = "inline";
                }, 500);
              }, 1000);
              _iterator2 = _createForOfIteratorHelper(telemetryEvents);
              _context12.prev = 47;
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

            case 50:
              if ((_step2 = _iterator2.n()).done) {
                _context12.next = 54;
                break;
              }

              return _context12.delegateYield(_loop(), "t0", 52);

            case 52:
              _context12.next = 50;
              break;

            case 54:
              _context12.next = 59;
              break;

            case 56:
              _context12.prev = 56;
              _context12.t1 = _context12["catch"](47);

              _iterator2.e(_context12.t1);

            case 59:
              _context12.prev = 59;

              _iterator2.f();

              return _context12.finish(59);

            case 62:
              _context12.next = 64;
              return Promise.allSettled(clips);

            case 64:
              final = _context12.sent;

              // console.log(final);
              if (final.length === 0) {
                fetchingVideos.parentNode.removeChild(fetchingVideos);
                logo.style.display = "none";
                final ? clearInterval(ape2) : null;
                Object(_scripts_no_videos_found__WEBPACK_IMPORTED_MODULE_3__["noVideosFound"])(gamertag);
              } else {
                logo.style.display = "none";
                fetchingVideos.parentNode.removeChild(fetchingVideos);
                final ? clearInterval(ape2) : null;
                Object(_scripts_no_videos_found__WEBPACK_IMPORTED_MODULE_3__["videosFound"])(gamertag, final);
              }

            case 66:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee11, null, [[47, 56, 59, 62]]);
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
  var first = document.getElementsByClassName("first")[0];
  first.style.display = "none";
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
  var first = document.getElementsByClassName("first")[0];
  first.style.display = "none";
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
    ul.classList.add("".concat(clips[i].value.event.killer.name === gamertag ? "g" : "r"), "videoBox", "videoBox".concat(i));
    var modal = document.createElement("section");
    modal.classList.add("modal", "modal".concat(i));
    var div = document.createElement("div");
    div.setAttribute("id", "".concat(i));
    div.classList.add("vframe2");
    var btn = document.createElement("span");
    btn.innerHTML = '&#10006;';
    btn.classList.add("close".concat(i), "close");
    div.appendChild(btn);
    modal.appendChild(div);
    ul.appendChild(modal);
    listOfVids.appendChild(ul);
  } // const btn = document.createElement("span");
  // btn.innerHTML = '&#10006;';
  // btn.classList.add("close");


  container.appendChild(listOfVids);
  parent.appendChild(container); // parent.appendChild(btn);

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
      video: "".concat(clips[_i].value.vod._id),
      parent: ["clipd.herokuapp.com"]
    };
    names[_i] = new Twitch.Player("".concat(_i), options);

    names[_i].setVolume(0.5); // document.querySelectorAll(".close").forEach(b => {


    document.getElementsByClassName("close".concat(_i))[0].addEventListener('click', function () {
      names[_i].pause();

      document.getElementsByClassName("modal".concat(_i))[0].style.display = "none";
      document.getElementsByClassName("close".concat(_i))[0].style.display = "none"; // console.log("clicked");
    }); // })
  };

  for (var _i = 0; _i < clips.length; _i++) {
    var options;

    _loop(_i);
  }

  document.querySelectorAll('.videoBox').forEach(function (item, idx) {
    var frm = item.querySelector(".modal".concat(idx));
    var btn = document.querySelector(".close".concat(idx)); // console.log(frm)

    item.addEventListener('click', function (e) {
      // debugger
      if (e.target === item) {
        frm.style.display = "flex";
        btn.style.display = "block"; // console.log("clicked box")
      }
    }); // btn.addEventListener('click', e => {
    //     debugger
    //     frm.style.display = "none";
    //     btn.style.display = "none";
    // })
  }); // document.querySelectorAll('.close').forEach((x, i) => {
  //     x.addEventListener('click', e => {
  //         document.querySelectorAll('.modal').forEach(frm => {
  //             frm.style.display = "none";
  //             x.style.display = "none";
  //         })
  //     })
  // })

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
    method: 'get' // scope: 'user:read:email'

  };
  var request = new Request("/oauth", oauthInit);
  return fetch(request).then(function (response) {
    return response.json();
  });
}; // window.getOAuth = getOAuth;

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
}; // window.getTwitchUser = getTwitchUser;

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
}; // window.getPubgVideos = getPubgVideos;

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
  var first = document.getElementsByClassName("first")[0];
  first.style.display = "none";
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
      ul.classList.add("streamsBox", "streamsBox".concat(_i));
      var modal = document.createElement("section");
      modal.classList.add("modal2", "modal2-".concat(_i));
      var modal_content = document.createElement("div");
      modal_content.classList.add("modal-content", "modal-content".concat(_i));

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
      var btn = document.createElement("span");
      btn.innerHTML = '&#10006;';
      btn.classList.add("close2", "close2-".concat(_i));
      div.appendChild(btn);
      modal.appendChild(div);
      ul.appendChild(modal);
      listOfVids.appendChild(ul);
    }
  } // const btn = document.createElement("span");
  // btn.innerHTML = '&#10006;';
  // btn.classList.add("close2");


  container.appendChild(listOfVids);
  parent.appendChild(container); // parent.appendChild(btn);

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
        video: "".concat(videos[_i2]._id),
        parent: ["clipd.herokuapp.com"]
      };
      names[_i2] = new Twitch.Player("".concat(_i2), options);

      names[_i2].setVolume(0.5);

      document.querySelectorAll('.nostylist').forEach(function (event) {
        event.addEventListener('click', function () {
          names[_i2].seek(Number(event.id));
        });
      });
      document.getElementsByClassName("close2-".concat(_i2))[0].addEventListener('click', function () {
        names[_i2].pause();

        document.getElementsByClassName("modal2-".concat(_i2))[0].style.display = "none";
        document.getElementsByClassName("close2-".concat(_i2))[0].style.display = "none"; // console.log("clicked");
      });
    }
  };

  for (var _i2 = 0; _i2 < videos.length; _i2++) {
    var options;

    _loop(_i2);
  }

  document.querySelectorAll('.streamsBox').forEach(function (item, idx) {
    var frm = item.querySelector(".modal2-".concat(idx));
    var btn = document.querySelector(".close2-".concat(idx));
    item.addEventListener('click', function (e) {
      if (e.target === item) {
        frm.style.display = "flex";
        btn.style.display = "block"; // console.log("clicked box")
      }
    });
  }); // document.querySelectorAll('.close2').forEach(x => {
  //     x.addEventListener('click', e => {
  //         document.querySelectorAll('.modal2').forEach(frm => {
  //             frm.style.display = "none";
  //             x.style.display = "none";
  //         })
  //     })
  // })

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZy9rZXlzX2Rldi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZGF0ZV9jb252ZXJ0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbm9fdmlkZW9zX2ZvdW5kLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3NlYXJjaF91dGlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvc3RyZWFtcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL2luZGV4LnNjc3MiXSwibmFtZXMiOlsicHJvY2VzcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZXF1aXJlIiwicHViZ0FQSSIsInR3aXRjaEFQSSIsImNsaWVudFNFQ1JFVCIsIm9BVVRIIiwiZ2FtZUlEIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiQkxBQ0tMSVNURUQiLCJrQVYiLCJhY3R1YWwiLCJzdHJlYW1zIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsIndpbmRvdyIsIm9wZW4iLCJjb250YWluZXIiLCJxdWVyeVNlbGVjdG9yIiwiZ2V0UGxheWVyIiwiaW5wdXQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwic3R5bGUiLCJkaXNwbGF5IiwidW4iLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsImd0Iiwic3VibWl0IiwiaW5uZXJIVE1MIiwiZ2V0RWxlbWVudEJ5SWQiLCJlIiwiZ2V0SW5wdXQiLCJnZXRTdHJlYW1zIiwidW5hbWUiLCJndGFnIiwiZ2V0UGxheWVyQnlOYW1lIiwibWF0Y2hlcyIsIm1hcCIsIm1hdGNoIiwiZ2V0TWF0Y2giLCJpZCIsIlByb21pc2UiLCJhbGxTZXR0bGVkIiwiZ2FtZXMiLCJmb3JFYWNoIiwidmFsdWUiLCJpbmNsdWRlZCIsImVsZSIsImRhdGEiLCJyZWxhdGlvbnNoaXBzIiwiYXNzZXRzIiwiZXZlbnRzIiwicHVzaCIsImdldFRlbGVtZXRyeSIsImF0dHJpYnV0ZXMiLCJVUkwiLCJ0ZWxlbWV0cnkiLCJldmVudCIsImxvZyIsIl9UIiwia2lsbGVyIiwibmFtZSIsInZpY3RpbSIsImdldFR3aXRjaFVzZXIiLCJ0d2l0Y2hVc2VyIiwibGVuZ3RoIiwiZ2V0VmlkZW9zIiwidmlkZW9zIiwiY2xpcHMiLCJ2aWQiLCJnZXRQdWJnVmlkZW9zIiwiYWxsIiwiYyIsImZpbHRlciIsImdhbWUiLCJmcCIsImEiLCJzZXRJbnRlcnZhbCIsInNldFRpbWVvdXQiLCJhbGxWaWRzIiwiY2xlYXJJbnRlcnZhbCIsImRpc3BsYXlTdHJlYW1zIiwiYWN0dWFsTWF0Y2hlcyIsInRlbGVtZXRyeUV2ZW50cyIsImdhbWVydGFnIiwic3BsYXNoIiwibG9nbyIsImZldGNoaW5nUGxheWVyIiwiYXBlNCIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImZldGNoaW5nTWF0Y2hlcyIsImFwZTMiLCJmZXRjaGluZ0V2ZW50cyIsImFwZSIsImZldGNoaW5nS2lsbHNBbmREZWF0aHMiLCJmZXRjaGluZ1ZpZGVvcyIsImFwZTIiLCJ0RXZlbnQiLCJldmVudFRpbWVzdGFtcCIsIl9EIiwiY2xpcCIsInRpbWVHcmVhdGVyVGhhbiIsImNyZWF0ZWRfYXQiLCJ0aW1lR3JlYXRlclRoYW4yIiwidXJsIiwidGltZXN0YW1wIiwiZmluYWwiLCJub1ZpZGVvc0ZvdW5kIiwidmlkZW9zRm91bmQiLCJkYXRlQ29udmVydGVyIiwidWdseURhdGUiLCJmYWtlSGFsZiIsInNwbGl0IiwicmVhbEhhbGYiLCJyZWFsRGF0ZSIsIk1PTlRIUyIsImZpcnN0IiwicGFyZW50IiwiYnV0dG9uIiwicGxheWVyIiwibWVzc2FnZSIsImJvZHkiLCJvbmNsaWNrIiwibG9jYXRpb24iLCJsaXN0T2ZWaWRzIiwiaSIsInVsIiwibW9kYWwiLCJkaXYiLCJidG4iLCJuYW1lcyIsImoiLCJvcHRpb25zIiwid2lkdGgiLCJoZWlnaHQiLCJhdXRvcGxheSIsInRpbWUiLCJ0aW1lc3RhbXBJblNlY29uZHMiLCJ2aWRlbyIsInZvZCIsIl9pZCIsIlR3aXRjaCIsIlBsYXllciIsInNldFZvbHVtZSIsInBhdXNlIiwicXVlcnlTZWxlY3RvckFsbCIsIml0ZW0iLCJpZHgiLCJmcm0iLCJ0YXJnZXQiLCJwbGF5ZXJCeU5hbWVJbml0IiwibWV0aG9kIiwicmVxdWVzdCIsIlJlcXVlc3QiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJtYXRjaElkIiwiZ2FtZUluaXQiLCJ0ZWxlbWV0cnlJbml0IiwiZ2V0T0F1dGgiLCJvYXV0aEluaXQiLCJ0d2l0Y2hVc2VySW5pdCIsInIiLCJ1c2VySWQiLCJ0d2l0Y2hWaWRlb3NJbml0IiwidmlkZW9JZCIsInR3aXRjaFB1YmdJbml0IiwidDEiLCJ0MiIsInQzIiwiRGF0ZSIsInQ0Iiwic2Vjb25kcyIsInNldEhvdXJzIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZ2V0U2Vjb25kcyIsInNlY3MiLCJ0Iiwic2V0U2Vjb25kcyIsInRvSVNPU3RyaW5nIiwic3Vic3RyIiwidGltZXN0YW1wMiIsIm5UIiwidmlkZW9IYXNFdmVudHMiLCJwbHlyIiwidGl0bGUiLCJtb2RhbF9jb250ZW50IiwidmlkZW9faWQiLCJsaSIsInNlZWsiLCJOdW1iZXIiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0I7O0FBRWhCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDOztBQUVBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsMENBQTBDO0FBQzFDOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHlEQUF5RDtBQUN6RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkdBQTZHO0FBQzdHOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVc7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsd0NBQXdDO0FBQ3hDLDJCQUEyQjtBQUMzQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Qsb0NBQW9DO0FBQ3BDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FB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Y2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xudmFyIHJ1bnRpbWUgPSBmdW5jdGlvbiAoZXhwb3J0cykge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIG9ialtrZXldO1xuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyBJRSA4IGhhcyBhIGJyb2tlbiBPYmplY3QuZGVmaW5lUHJvcGVydHkgdGhhdCBvbmx5IHdvcmtzIG9uIERPTSBvYmplY3RzLlxuICAgIGRlZmluZSh7fSwgXCJcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlZmluZSA9IGZ1bmN0aW9uIChvYmosIGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTsgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cblxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG5cbiAgZXhwb3J0cy53cmFwID0gd3JhcDsgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcIm5vcm1hbFwiLFxuICAgICAgICBhcmc6IGZuLmNhbGwob2JqLCBhcmcpXG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJ0aHJvd1wiLFxuICAgICAgICBhcmc6IGVyclxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7IC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307IC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cblxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cblxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9IC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cblxuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4gIEl0ZXJhdG9yUHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcblxuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiYgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID0gR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IGRlZmluZShHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIik7IC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgIGRlZmluZShwcm90b3R5cGUsIG1ldGhvZCwgZnVuY3Rpb24gKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24gKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvciA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8IC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiIDogZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24gKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgZGVmaW5lKGdlbkZ1biwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIik7XG4gICAgfVxuXG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07IC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG5cblxuICBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24gKGFyZykge1xuICAgIHJldHVybiB7XG4gICAgICBfX2F3YWl0OiBhcmdcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yLCBQcm9taXNlSW1wbCkge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcblxuICAgICAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbiAodW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9IC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZywgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfSAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuXG5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcblxuICBBc3luY0l0ZXJhdG9yLnByb3RvdHlwZVthc3luY0l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBleHBvcnRzLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yOyAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cblxuICBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24gKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0LCBQcm9taXNlSW1wbCkge1xuICAgIGlmIChQcm9taXNlSW1wbCA9PT0gdm9pZCAwKSBQcm9taXNlSW1wbCA9IFByb21pc2U7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcih3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSwgUHJvbWlzZUltcGwpO1xuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbikgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9IC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcblxuXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG5cbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lID8gR2VuU3RhdGVDb21wbGV0ZWQgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7IC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG5cblxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcblxuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoIWluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7IC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cblxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYzsgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH0gLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuXG5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfSAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG5cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuICBkZWZpbmUoR3AsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvclwiKTsgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHtcbiAgICAgIHRyeUxvYzogbG9jc1swXVxuICAgIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3tcbiAgICAgIHRyeUxvYzogXCJyb290XCJcbiAgICB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuXG4gICAga2V5cy5yZXZlcnNlKCk7IC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cblxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuXG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfSAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cblxuXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcblxuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSxcbiAgICAgICAgICAgIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH0gLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuXG5cbiAgICByZXR1cm4ge1xuICAgICAgbmV4dDogZG9uZVJlc3VsdFxuICAgIH07XG4gIH1cblxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgZG9uZTogdHJ1ZVxuICAgIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcbiAgICByZXNldDogZnVuY3Rpb24gKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwOyAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cblxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJiBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJiAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgc3RvcDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24gKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcblxuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWJydXB0OiBmdW5jdGlvbiAodHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJiBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJiAodHlwZSA9PT0gXCJicmVha1wiIHx8IHR5cGUgPT09IFwiY29udGludWVcIikgJiYgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiYgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uIChyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fCByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcbiAgICBmaW5pc2g6IGZ1bmN0aW9uIChmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcblxuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uICh0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfSAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cblxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbiAoaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTsgLy8gUmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZVxuICAvLyBvciBub3QsIHJldHVybiB0aGUgcnVudGltZSBvYmplY3Qgc28gdGhhdCB3ZSBjYW4gZGVjbGFyZSB0aGUgdmFyaWFibGVcbiAgLy8gcmVnZW5lcmF0b3JSdW50aW1lIGluIHRoZSBvdXRlciBzY29wZSwgd2hpY2ggYWxsb3dzIHRoaXMgbW9kdWxlIHRvIGJlXG4gIC8vIGluamVjdGVkIGVhc2lseSBieSBgYmluL3JlZ2VuZXJhdG9yIC0taW5jbHVkZS1ydW50aW1lIHNjcmlwdC5qc2AuXG5cbiAgcmV0dXJuIGV4cG9ydHM7XG59KCAvLyBJZiB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGUsIHVzZSBtb2R1bGUuZXhwb3J0c1xuLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbi8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbi8vIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgdmFyaWFibGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXG50eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fSk7XG5cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAvLyBUaGlzIG1vZHVsZSBzaG91bGQgbm90IGJlIHJ1bm5pbmcgaW4gc3RyaWN0IG1vZGUsIHNvIHRoZSBhYm92ZVxuICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3RcbiAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCB3ZSBjYW4gZXNjYXBlXG4gIC8vIHN0cmljdCBtb2RlIHVzaW5nIGEgZ2xvYmFsIEZ1bmN0aW9uIGNhbGwuIFRoaXMgY291bGQgY29uY2VpdmFibHkgZmFpbFxuICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgLy8gdGhlIHByb3BlciBzb2x1dGlvbiBpcyB0byBmaXggdGhlIGFjY2lkZW50YWwgc3RyaWN0IG1vZGUgcHJvYmxlbS4gSWZcbiAgLy8geW91J3ZlIG1pc2NvbmZpZ3VyZWQgeW91ciBidW5kbGVyIHRvIGZvcmNlIHN0cmljdCBtb2RlIGFuZCBhcHBsaWVkIGFcbiAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gIC8vIHByb2JsZW1zLCBwbGVhc2UgZGV0YWlsIHlvdXIgdW5pcXVlIHByZWRpY2FtZW50IGluIGEgR2l0SHViIGlzc3VlLlxuICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xufSIsImlmKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIikge1xyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9rZXlzX3Byb2RcIilcclxufSBlbHNlIHtcclxuICAgIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4va2V5c19kZXZcIilcclxufSIsIm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgcHViZ0FQSTogJ2V5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5leUpxZEdraU9pSTFObU0xWTJNNU1DMWxZbVptTFRBeE16Z3RNV1F4T0MwMFltTXlOalZtTXpFeVlqRWlMQ0pwYzNNaU9pSm5ZVzFsYkc5amEyVnlJaXdpYVdGMElqb3hOakF5TWpBNE1EWXdMQ0p3ZFdJaU9pSmliSFZsYUc5c1pTSXNJblJwZEd4bElqb2ljSFZpWnlJc0ltRndjQ0k2SW1Oc2FYQndaV1FpZlEuWUdCbGgzZUpxUlBPa2VTREpxVFVLRzJxQVFfcTZjZXg4T0JLVXVwTHRTSScsXHJcbiAgICB0d2l0Y2hBUEk6ICc2ZGdpYTFwbXZtcmxzM2k2bGV6Z3JtaWJ2MDMwcHonLFxyXG4gICAgY2xpZW50U0VDUkVUOiAnYjdoZzJ6Z2g5bGdzNXY3aTkwMTBma2xnd2Npa3NrJyxcclxuICAgIG9BVVRIOiAneWd3YnA2MnR6cjNqeGU4YXFoNWN4dDF0b3NzOWM0JyxcclxuICAgIGdhbWVJRDogJzQ5MzA1NydcclxufSIsImltcG9ydCAnLi4vc3JjL3N0eWxlcy9pbmRleC5zY3NzJztcclxuaW1wb3J0IHsgZ2V0TWF0Y2gsIGdldFBsYXllckJ5TmFtZSwgZ2V0VHdpdGNoVXNlciwgZ2V0VGVsZW1ldHJ5LCBnZXRWaWRlb3MsIGdldFB1YmdWaWRlb3MsIHRpbWVHcmVhdGVyVGhhbiwgdGltZUdyZWF0ZXJUaGFuMiwgdGltZXN0YW1wIH0gZnJvbSAnLi9zY3JpcHRzL3NlYXJjaF91dGlsaXRpZXMnO1xyXG5pbXBvcnQgXCJyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWVcIjtcclxuaW1wb3J0IHsgbm9WaWRlb3NGb3VuZCwgdmlkZW9zRm91bmQgfSBmcm9tICcuL3NjcmlwdHMvbm9fdmlkZW9zX2ZvdW5kJztcclxuaW1wb3J0IHsgZGlzcGxheVN0cmVhbXMgfSBmcm9tICcuL3NjcmlwdHMvc3RyZWFtcyc7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcbiAgICBsZXQgQkxBQ0tMSVNURUQgPSB7fTtcclxuICAgIGxldCBrQVYgPSBbXTtcclxuICAgIGxldCBhY3R1YWw7XHJcbiAgICBsZXQgc3RyZWFtcyA9IFtdO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImZhLWdpdGh1YlwiKVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICB3aW5kb3cub3BlbihcImh0dHBzOi8vZ2l0aHViLmNvbS9pU1dBVHhKT0tFUmkvQ0xJUERcIilcclxuICAgIH0pXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZmEtbGlua2VkaW4taW5cIilbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgd2luZG93Lm9wZW4oXCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vaW4vbGF3cmVuY2UtbWVueWFoLTQ0ODU5NzExNy9cIilcclxuICAgIH0pXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZmEtYW5nZWxsaXN0XCIpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIHdpbmRvdy5vcGVuKFwiaHR0cHM6Ly9hbmdlbC5jby91L2lzd2F0eGpva2VyaVwiKVxyXG4gICAgfSlcclxuXHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZ2V0U3RyZWFtc1wiKVswXTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmEtc2VhcmNoXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBnZXRQbGF5ZXIpO1xyXG5cclxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XHJcbiAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKFwiaW5wdXQtY29udGFpbmVyXCIpO1xyXG4gICAgaW5wdXQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgY29uc3QgdW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICB1bi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dFwiKTtcclxuICAgIHVuLnNldEF0dHJpYnV0ZShcInBsYWNlaG9sZGVyXCIsIFwiVHdpdGNoIFVzZXJcIik7XHJcbiAgICB1bi5jbGFzc0xpc3QuYWRkKFwidW4tZmllbGRcIik7XHJcbiAgICBpbnB1dC5hcHBlbmRDaGlsZCh1bik7XHJcbiAgICBjb25zdCBndCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIGd0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xyXG4gICAgZ3Quc2V0QXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIiwgXCJQVUJHIFVzZXJcIik7XHJcbiAgICBndC5jbGFzc0xpc3QuYWRkKFwiZ3QtZmllbGRcIik7XHJcbiAgICBpbnB1dC5hcHBlbmRDaGlsZChndCk7XHJcbiAgICBjb25zdCBzdWJtaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgIHN1Ym1pdC5jbGFzc0xpc3QuYWRkKFwic3VibWl0LXN0cmVhbVwiKTtcclxuICAgIHN1Ym1pdC5pbm5lckhUTUwgPSBcIlNlYXJjaFwiO1xyXG4gICAgaW5wdXQuYXBwZW5kQ2hpbGQoc3VibWl0KTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChpbnB1dCk7XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnZXRTdHJlYW1zXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcclxuICAgICAgICBpZihpbnB1dC5zdHlsZS5kaXNwbGF5ID09PSBcImZsZXhcIikge1xyXG4gICAgICAgICAgICBpbnB1dC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBpbnB1dC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1Ym1pdC1zdHJlYW1cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGdldElucHV0KTtcclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRJbnB1dCgpIHtcclxuICAgICAgICBjb25zdCB1bmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ1bi1maWVsZFwiKVswXS52YWx1ZTtcclxuICAgICAgICBjb25zdCBndGFnID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImd0LWZpZWxkXCIpWzBdLnZhbHVlO1xyXG5cclxuICAgICAgICBsZXQgYTtcclxuICAgICAgICBpZih1bmFtZSAmJiBndGFnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgICAgIGZwLmNsYXNzTGlzdC5hZGQoXCJsb2FkaW5nMVwiLCBcImxvYWRcIik7XHJcbiAgICAgICAgICAgIGZwLmlubmVySFRNTCA9ICdGZXRjaGluZyBWaWRlb3MgLi4uJztcclxuICAgICAgICAgICAgaW5wdXQuYXBwZW5kQ2hpbGQoZnApO1xyXG4gICAgICAgICAgICBhID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZnAuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmcC5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIlxyXG4gICAgICAgICAgICAgICAgfSwgMTAwMClcclxuICAgICAgICAgICAgfSwgMjAwMClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhbGxWaWRzID0gYXdhaXQgZ2V0U3RyZWFtcyh1bmFtZSwgZ3RhZyk7XHJcbiAgICAgICAgYWxsVmlkcyA/IGNsZWFySW50ZXJ2YWwoYSkgOiBudWxsO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGFsbFZpZHMpO1xyXG4gICAgICAgIGRpc3BsYXlTdHJlYW1zKGtBViwgYWxsVmlkcywgZ3RhZyk7XHJcblxyXG5cclxuICAgICAgICBhc3luYyBmdW5jdGlvbiBnZXRTdHJlYW1zKHVuYW1lLCBndGFnKSB7XHJcbiAgICAgICAgICAgIGxldCBtYXRjaGVzID0gYXdhaXQgZ2V0UGxheWVyQnlOYW1lKGd0YWcpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtYXRjaGVzKTtcclxuICAgICAgICAgICAgYWN0dWFsID0gbWF0Y2hlcy5tYXAoYXN5bmMgbWF0Y2ggPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IGdldE1hdGNoKG1hdGNoLmlkKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgXHJcbiAgICAgICAgICAgIGxldCBnYW1lcyA9IGF3YWl0IFByb21pc2UuYWxsU2V0dGxlZChhY3R1YWwpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lcylcclxuICAgIFxyXG4gICAgICAgICAgICBnYW1lcy5mb3JFYWNoKGFzeW5jIG1hdGNoID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKG1hdGNoLnZhbHVlKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihtYXRjaC52YWx1ZS5pbmNsdWRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaC52YWx1ZS5pbmNsdWRlZC5mb3JFYWNoKGFzeW5jIGVsZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbGUuaWQgPT09IG1hdGNoLnZhbHVlLmRhdGEucmVsYXRpb25zaGlwcy5hc3NldHMuZGF0YVswXS5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50cy5wdXNoKGdldFRlbGVtZXRyeShlbGUuYXR0cmlidXRlcy5VUkwpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgIFxyXG4gICAgICAgICAgICBsZXQgdGVsZW1ldHJ5ID0gYXdhaXQgUHJvbWlzZS5hbGxTZXR0bGVkKGV2ZW50cyk7XHJcbiAgICBcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGVsZW1ldHJ5KVxyXG4gICAgICAgICAgICB0ZWxlbWV0cnkuZm9yRWFjaChldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudC52YWx1ZS5mb3JFYWNoKGxvZyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoKChsb2cuX1QgPT09IFwiTG9nUGxheWVyS2lsbFwiICYmIGxvZy5raWxsZXIpICYmIGxvZy5raWxsZXIubmFtZSA9PT0gZ3RhZykgfHwgKChsb2cuX1QgPT09IFwiTG9nUGxheWVyS2lsbFwiICYmIGxvZy52aWN0aW0pICYmIGxvZy52aWN0aW0ubmFtZSA9PT0gZ3RhZykpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrQVYucHVzaChsb2cpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coa0FWKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCB0d2l0Y2hVc2VyID0gYXdhaXQgZ2V0VHdpdGNoVXNlcih1bmFtZSk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHR3aXRjaFVzZXIpO1xyXG4gICAgICAgICAgICBpZih0d2l0Y2hVc2VyKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0d2l0Y2hVc2VyLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2aWRlb3MgPSBhd2FpdCBnZXRWaWRlb3ModHdpdGNoVXNlci5kYXRhWzBdLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh2aWRlb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHZpZGVvcy5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsaXBzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihjb25zdCB2aWQgb2YgdmlkZW9zLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaXBzLnB1c2goZ2V0UHViZ1ZpZGVvcyh2aWQuaWQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYyA9IGF3YWl0IFByb21pc2UuYWxsKGNsaXBzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbXMgPSBjLmZpbHRlcihlbGUgPT4gZWxlLmdhbWUgPT09IFwiUExBWUVSVU5LTk9XTidTIEJBVFRMRUdST1VORFNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlYnVnZ2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHN0cmVhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyZWFtcztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGFjdHVhbE1hdGNoZXMgPSBbXTtcclxuICAgIGxldCBldmVudHMgPSBbXTtcclxuICAgIGxldCB0ZWxlbWV0cnlFdmVudHMgPSBbXTtcclxuICAgIGxldCBjbGlwcyA9IFtdO1xyXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0UGxheWVyKCkge1xyXG4gICAgICAgIGxldCBnYW1lcnRhZyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJnYW1lcnRhZy1maWVsZFwiKVswXS52YWx1ZTtcclxuICAgICAgICBjb25zdCBzcGxhc2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdldFN0cmVhbXNcIik7XHJcbiAgICAgICAgY29uc3QgbG9nbyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJsb2dvXCIpWzBdO1xyXG4gICAgICAgIGNvbnN0IGZldGNoaW5nUGxheWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgZmV0Y2hpbmdQbGF5ZXIuY2xhc3NMaXN0LmFkZChcImxvYWRpbmcxXCIsIFwibG9hZGluZ1wiKTtcclxuICAgICAgICBmZXRjaGluZ1BsYXllci5pbm5lckhUTUwgPSAnRmV0Y2hpbmcgUGxheWVyIC4uLic7XHJcbiAgICAgICAgc3BsYXNoLmFwcGVuZENoaWxkKGZldGNoaW5nUGxheWVyKTtcclxuICAgICAgICBsZXQgYXBlNDtcclxuICAgICAgICBhcGU0ID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBmZXRjaGluZ1BsYXllci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZmV0Y2hpbmdQbGF5ZXIuc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XHJcbiAgICAgICAgICAgIH0sIDUwMClcclxuICAgICAgICB9LCAxMDAwKVxyXG4gICAgICAgIGxldCBtYXRjaGVzID0gYXdhaXQgZ2V0UGxheWVyQnlOYW1lKGdhbWVydGFnKTtcclxuICAgICAgICBtYXRjaGVzID8gY2xlYXJJbnRlcnZhbChhcGU0KSA6IG51bGw7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cobWF0Y2hlcyk7XHJcbiAgICAgICAgLy8gZGVidWdnZXJcclxuICAgICAgICBhY3R1YWxNYXRjaGVzID0gbWF0Y2hlcy5tYXAoYXN5bmMgbWF0Y2ggPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgZ2V0TWF0Y2gobWF0Y2guaWQpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZmV0Y2hpbmdQbGF5ZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChmZXRjaGluZ1BsYXllcik7XHJcbiAgICAgICAgY29uc3QgZmV0Y2hpbmdNYXRjaGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgZmV0Y2hpbmdNYXRjaGVzLmNsYXNzTGlzdC5hZGQoXCJsb2FkaW5nMlwiLCBcImxvYWRpbmdcIik7XHJcbiAgICAgICAgZmV0Y2hpbmdNYXRjaGVzLmlubmVySFRNTCA9ICdGZXRjaGluZyBNYXRjaGVzIC4uLic7XHJcbiAgICAgICAgc3BsYXNoLmFwcGVuZENoaWxkKGZldGNoaW5nTWF0Y2hlcyk7XHJcbiAgICAgICAgbGV0IGFwZTM7XHJcbiAgICAgICAgYXBlMyA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgZmV0Y2hpbmdNYXRjaGVzLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmZXRjaGluZ01hdGNoZXMuc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XHJcbiAgICAgICAgICAgIH0sIDUwMClcclxuICAgICAgICB9LCAxMDAwKVxyXG4gICAgICAgIGxldCBnYW1lcyA9IGF3YWl0IFByb21pc2UuYWxsU2V0dGxlZChhY3R1YWxNYXRjaGVzKTtcclxuICAgICAgICBnYW1lcyA/IGNsZWFySW50ZXJ2YWwoYXBlMykgOiBudWxsO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGdhbWVzKVxyXG5cclxuXHJcbiAgICAgICAgZmV0Y2hpbmdNYXRjaGVzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZmV0Y2hpbmdNYXRjaGVzKTtcclxuICAgICAgICBjb25zdCBmZXRjaGluZ0V2ZW50cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgIGZldGNoaW5nRXZlbnRzLmNsYXNzTGlzdC5hZGQoXCJsb2FkaW5nM1wiLCBcImxvYWRpbmdcIik7XHJcbiAgICAgICAgZmV0Y2hpbmdFdmVudHMuaW5uZXJIVE1MID0gJ0ZldGNoaW5nIEV2ZW50cyAuLi4nO1xyXG4gICAgICAgIHNwbGFzaC5hcHBlbmRDaGlsZChmZXRjaGluZ0V2ZW50cyk7XHJcbiAgICAgICAgbGV0IGFwZTtcclxuICAgICAgICBhcGUgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGZldGNoaW5nRXZlbnRzLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmZXRjaGluZ0V2ZW50cy5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIjtcclxuICAgICAgICAgICAgfSwgNTAwKVxyXG4gICAgICAgIH0sIDEwMDApXHJcblxyXG4gICAgICAgIGdhbWVzLmZvckVhY2goYXN5bmMgbWF0Y2ggPT4ge1xyXG4gICAgICAgICAgICBpZihtYXRjaC52YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICBpZihtYXRjaC52YWx1ZS5pbmNsdWRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoLnZhbHVlLmluY2x1ZGVkLmZvckVhY2goYXN5bmMgZWxlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlLmlkID09PSBtYXRjaC52YWx1ZS5kYXRhLnJlbGF0aW9uc2hpcHMuYXNzZXRzLmRhdGFbMF0uaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50cy5wdXNoKGdldFRlbGVtZXRyeShlbGUuYXR0cmlidXRlcy5VUkwpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGxldCB0ZWxlbWV0cnkgPSBhd2FpdCBQcm9taXNlLmFsbFNldHRsZWQoZXZlbnRzKTtcclxuICAgICAgICB0ZWxlbWV0cnkgPyBjbGVhckludGVydmFsKGFwZSkgOiBudWxsO1xyXG5cclxuICAgICAgICBmZXRjaGluZ0V2ZW50cy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGZldGNoaW5nRXZlbnRzKTtcclxuICAgICAgICBjb25zdCBmZXRjaGluZ0tpbGxzQW5kRGVhdGhzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgZmV0Y2hpbmdLaWxsc0FuZERlYXRocy5jbGFzc0xpc3QuYWRkKFwibG9hZGluZzRcIiwgXCJsb2FkaW5nXCIpO1xyXG4gICAgICAgIGZldGNoaW5nS2lsbHNBbmREZWF0aHMuaW5uZXJIVE1MID0gJ0ZldGNoaW5nIEtpbGxzIGFuZCBEZWF0aHMgLi4uJztcclxuICAgICAgICBzcGxhc2guYXBwZW5kQ2hpbGQoZmV0Y2hpbmdLaWxsc0FuZERlYXRocyk7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRlbGVtZXRyeSlcclxuICAgICAgICB0ZWxlbWV0cnkuZm9yRWFjaChldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50LnZhbHVlLmZvckVhY2gobG9nID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKCgobG9nLl9UID09PSBcIkxvZ1BsYXllcktpbGxcIiAmJiBsb2cua2lsbGVyKSAmJiBsb2cua2lsbGVyLm5hbWUgPT09IGdhbWVydGFnKSB8fCAoKGxvZy5fVCA9PT0gXCJMb2dQbGF5ZXJLaWxsXCIgJiYgbG9nLnZpY3RpbSkgJiYgbG9nLnZpY3RpbS5uYW1lID09PSBnYW1lcnRhZykpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbGVtZXRyeUV2ZW50cy5wdXNoKGxvZylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRlbGVtZXRyeUV2ZW50cylcclxuICAgICAgICBmZXRjaGluZ0tpbGxzQW5kRGVhdGhzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZmV0Y2hpbmdLaWxsc0FuZERlYXRocyk7XHJcbiAgICAgICAgY29uc3QgZmV0Y2hpbmdWaWRlb3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICBmZXRjaGluZ1ZpZGVvcy5jbGFzc0xpc3QuYWRkKFwibG9hZGluZzVcIiwgXCJsb2FkaW5nXCIpO1xyXG4gICAgICAgIGZldGNoaW5nVmlkZW9zLmlubmVySFRNTCA9ICdGZXRjaGluZyBWaWRlb3MgLi4uJztcclxuICAgICAgICBzcGxhc2guYXBwZW5kQ2hpbGQoZmV0Y2hpbmdWaWRlb3MpO1xyXG4gICAgICAgIGxldCBhcGUyO1xyXG4gICAgICAgIGFwZTIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGZldGNoaW5nVmlkZW9zLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmZXRjaGluZ1ZpZGVvcy5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIjtcclxuICAgICAgICAgICAgfSwgNTAwKVxyXG4gICAgICAgIH0sIDEwMDApXHJcbiAgICAgICAgZm9yKGNvbnN0IHRFdmVudCBvZiB0ZWxlbWV0cnlFdmVudHMpIHtcclxuICAgICAgICAgICAgbGV0IGV2ZW50VGltZXN0YW1wID0gdEV2ZW50Ll9EO1xyXG4gICAgICAgICAgICBpZih0RXZlbnQua2lsbGVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZighQkxBQ0tMSVNURURbdEV2ZW50LmtpbGxlci5uYW1lXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR3aXRjaFVzZXIgPSBhd2FpdCBnZXRUd2l0Y2hVc2VyKHRFdmVudC5raWxsZXIubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodHdpdGNoVXNlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0d2l0Y2hVc2VyLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZpZGVvcyA9IGF3YWl0IGdldFZpZGVvcyh0d2l0Y2hVc2VyLmRhdGFbMF0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodmlkZW9zLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvcy5kYXRhLm1hcChhc3luYyB2aWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2xpcCA9IGF3YWl0IGdldFB1YmdWaWRlb3ModmlkLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2xpcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGVidWdnZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNsaXAuZ2FtZSA9PT0gXCJQTEFZRVJVTktOT1dOJ1MgQkFUVExFR1JPVU5EU1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGVidWdnZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aW1lR3JlYXRlclRoYW4oZXZlbnRUaW1lc3RhbXAsIGNsaXAuY3JlYXRlZF9hdCkgJiYgdGltZUdyZWF0ZXJUaGFuMihldmVudFRpbWVzdGFtcCwgY2xpcC5jcmVhdGVkX2F0LCBjbGlwLmxlbmd0aCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpcHMucHVzaCh7XCJ1cmxcIjogY2xpcC51cmwsIFwidGltZXN0YW1wSW5TZWNvbmRzXCI6IHRpbWVzdGFtcChldmVudFRpbWVzdGFtcCwgY2xpcC5jcmVhdGVkX2F0LCBjbGlwLmxlbmd0aCksIFwiZXZlbnRcIjogdEV2ZW50LCBcInZvZFwiOiBjbGlwfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQkxBQ0tMSVNURURbdEV2ZW50LmtpbGxlci5uYW1lXSA9IHRFdmVudC5raWxsZXIubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJMQUNLTElTVEVEW3RFdmVudC5raWxsZXIubmFtZV0gPSB0RXZlbnQua2lsbGVyLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRFdmVudC52aWN0aW0pIHtcclxuICAgICAgICAgICAgICAgIGlmKCFCTEFDS0xJU1RFRFt0RXZlbnQudmljdGltLm5hbWVdKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdHdpdGNoVXNlciA9IGF3YWl0IGdldFR3aXRjaFVzZXIodEV2ZW50LnZpY3RpbS5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBpZih0d2l0Y2hVc2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHR3aXRjaFVzZXIuZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmlkZW9zID0gYXdhaXQgZ2V0VmlkZW9zKHR3aXRjaFVzZXIuZGF0YVswXS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih2aWRlb3MuZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codmlkZW9zLmRhdGEubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvcy5kYXRhLm1hcChhc3luYyB2aWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2xpcCA9IGF3YWl0IGdldFB1YmdWaWRlb3ModmlkLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2xpcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGVidWdnZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNsaXAuZ2FtZSA9PT0gXCJQTEFZRVJVTktOT1dOJ1MgQkFUVExFR1JPVU5EU1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGVidWdnZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aW1lR3JlYXRlclRoYW4oZXZlbnRUaW1lc3RhbXAsIGNsaXAuY3JlYXRlZF9hdCkgJiYgdGltZUdyZWF0ZXJUaGFuMihldmVudFRpbWVzdGFtcCwgY2xpcC5jcmVhdGVkX2F0LCBjbGlwLmxlbmd0aCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpcHMucHVzaCh7XCJ1cmxcIjogY2xpcC51cmwsIFwidGltZXN0YW1wSW5TZWNvbmRzXCI6IHRpbWVzdGFtcChldmVudFRpbWVzdGFtcCwgY2xpcC5jcmVhdGVkX2F0LCBjbGlwLmxlbmd0aCksIFwiZXZlbnRcIjogdEV2ZW50LCBcInZvZFwiOiBjbGlwfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY2xpcHMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBCTEFDS0xJU1RFRFt0RXZlbnQudmljdGltLm5hbWVdID0gdEV2ZW50LnZpY3RpbS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJMQUNLTElTVEVEW3RFdmVudC52aWN0aW0ubmFtZV0gPSB0RXZlbnQudmljdGltLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNsaXBzKTtcclxuICAgICAgICBsZXQgZmluYWwgPSBhd2FpdCBQcm9taXNlLmFsbFNldHRsZWQoY2xpcHMpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGZpbmFsKTtcclxuICAgICAgICBpZihmaW5hbC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgZmV0Y2hpbmdWaWRlb3MucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChmZXRjaGluZ1ZpZGVvcyk7XHJcbiAgICAgICAgICAgIGxvZ28uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICBmaW5hbCA/IGNsZWFySW50ZXJ2YWwoYXBlMikgOiBudWxsO1xyXG4gICAgICAgICAgICBub1ZpZGVvc0ZvdW5kKGdhbWVydGFnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsb2dvLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgZmV0Y2hpbmdWaWRlb3MucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChmZXRjaGluZ1ZpZGVvcyk7XHJcbiAgICAgICAgICAgIGZpbmFsID8gY2xlYXJJbnRlcnZhbChhcGUyKSA6IG51bGw7XHJcbiAgICAgICAgICAgIHZpZGVvc0ZvdW5kKGdhbWVydGFnLCBmaW5hbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSIsImNvbnN0IGRhdGVDb252ZXJ0ZXIgPSAodWdseURhdGUpID0+IHtcclxuICAgIGxldCBmYWtlSGFsZiA9IHVnbHlEYXRlLnNwbGl0KFwiVFwiKTtcclxuICAgIGxldCByZWFsSGFsZiA9IGZha2VIYWxmWzBdLnNwbGl0KFwiLVwiKTtcclxuXHJcbiAgICBsZXQgcmVhbERhdGUgPSBNT05USFNbcmVhbEhhbGZbMV1dICsgXCIsIFwiICsgcmVhbEhhbGZbMl0gKyBcIiBcIiArIHJlYWxIYWxmWzBdO1xyXG5cclxuICAgIHJldHVybiByZWFsRGF0ZTtcclxufVxyXG5cclxuY29uc3QgTU9OVEhTID0ge1xyXG4gICAgXCIwMVwiOiBcIkphbnVhcnlcIixcclxuICAgIFwiMDJcIjogXCJGZWJydWFyeVwiLFxyXG4gICAgXCIwM1wiOiBcIk1hcmNoXCIsXHJcbiAgICBcIjA0XCI6IFwiQXByaWxcIixcclxuICAgIFwiMDVcIjogXCJNYXlcIixcclxuICAgIFwiMDZcIjogXCJKdW5lXCIsXHJcbiAgICBcIjA3XCI6IFwiSnVseVwiLFxyXG4gICAgXCIwOFwiOiBcIkF1Z3VzdFwiLFxyXG4gICAgXCIwOVwiOiBcIlNlcHRlbWJlclwiLFxyXG4gICAgXCIxMFwiOiBcIk9jdG9iZXJcIixcclxuICAgIFwiMTFcIjogXCJOb3ZlbWJlclwiLFxyXG4gICAgXCIxMlwiOiBcIkRlY2VtYmVyXCJcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGF0ZUNvbnZlcnRlcjsiLCJleHBvcnQgY29uc3Qgbm9WaWRlb3NGb3VuZCA9IChnYW1lcnRhZykgPT4ge1xyXG4gICAgY29uc3QgZmlyc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZmlyc3RcIilbMF07XHJcbiAgICBmaXJzdC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICBjb25zdCBzcGxhc2ggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic3BsYXNoLWNvbnRlbnRcIilbMF07XHJcbiAgICBzcGxhc2guc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgY29uc3QgbG9nbyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJsb2dvXCIpWzBdO1xyXG4gICAgbG9nby5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICBjb25zdCBwYXJlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKVxyXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICBidXR0b24uaW5uZXJIVE1MID0gJyZsYXJyOyc7XHJcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImJhY2tcIik7XHJcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xyXG4gICAgcGFyZW50LmNsYXNzTGlzdC5hZGQoXCJwYXJlbnQtY29udGFpbmVyXCIpO1xyXG4gICAgY29uc3QgcGxheWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHBsYXllci5pbm5lckhUTUwgPSBgPGgyPiR7IGdhbWVydGFnIH08L2gyPmA7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocGxheWVyKTtcclxuICAgIGNvbnN0IG1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgbWVzc2FnZS5pbm5lckhUTUwgPSAnPHA+Tm8gdmlkZW9zIGZvdW5kIGZvciB0aGlzIHVzZXI8L3A+JztcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtZXNzYWdlKTtcclxuICAgIHBhcmVudC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwYXJlbnQpO1xyXG5cclxuICAgIGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy8nO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdmlkZW9zRm91bmQgPSAoZ2FtZXJ0YWcsIGNsaXBzKSA9PiB7XHJcbiAgICBjb25zdCBmaXJzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJmaXJzdFwiKVswXTtcclxuICAgIGZpcnN0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIGNvbnN0IHNwbGFzaCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzcGxhc2gtY29udGVudFwiKVswXTtcclxuICAgIHNwbGFzaC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICBjb25zdCBsb2dvID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImxvZ29cIilbMF07XHJcbiAgICBjb25zdCBwYXJlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKVxyXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICBidXR0b24uaW5uZXJIVE1MID0gJyZsYXJyOyc7XHJcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImJhY2tcIik7XHJcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xyXG4gICAgcGFyZW50LmNsYXNzTGlzdC5hZGQoXCJwYXJlbnQtY29udGFpbmVyXCIpO1xyXG4gICAgY29uc3QgcGxheWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHBsYXllci5pbm5lckhUTUwgPSBgPGgyPiR7IGdhbWVydGFnIH08L2gyPmA7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocGxheWVyKTtcclxuICAgIFxyXG4gICAgY29uc3QgbGlzdE9mVmlkcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcclxuICAgIGxpc3RPZlZpZHMuY2xhc3NMaXN0LmFkZChcImxpc3Qtb2Ytdmlkc1wiKTtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBjbGlwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xyXG4gICAgICAgIHVsLmlubmVySFRNTCA9IGA8aDM+JHsgY2xpcHNbaV0udmFsdWUuZXZlbnQua2lsbGVyLm5hbWUgfTwvaDM+PHNwYW4+a2lsbGluZyAkeyBjbGlwc1tpXS52YWx1ZS5ldmVudC52aWN0aW0ubmFtZSB9PC9zcGFuPmA7XHJcbiAgICAgICAgdWwuY2xhc3NMaXN0LmFkZChgJHsgY2xpcHNbaV0udmFsdWUuZXZlbnQua2lsbGVyLm5hbWUgPT09IGdhbWVydGFnID8gXCJnXCIgOiBcInJcIiB9YCwgXCJ2aWRlb0JveFwiLCBgdmlkZW9Cb3gkeyBpIH1gKTtcclxuICAgICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xyXG4gICAgICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoXCJtb2RhbFwiLCBgbW9kYWwkeyBpIH1gKTtcclxuICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHsgaSB9YCk7XHJcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJ2ZnJhbWUyXCIpO1xyXG4gICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgIGJ0bi5pbm5lckhUTUwgPSAnJiMxMDAwNjsnO1xyXG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKGBjbG9zZSR7IGkgfWAsIFwiY2xvc2VcIik7XHJcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKGJ0bik7XHJcbiAgICAgICAgbW9kYWwuYXBwZW5kQ2hpbGQoZGl2KTtcclxuXHJcbiAgICAgICAgdWwuYXBwZW5kQ2hpbGQobW9kYWwpO1xyXG4gICAgICAgIGxpc3RPZlZpZHMuYXBwZW5kQ2hpbGQodWwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgLy8gYnRuLmlubmVySFRNTCA9ICcmIzEwMDA2Oyc7XHJcbiAgICAvLyBidG4uY2xhc3NMaXN0LmFkZChcImNsb3NlXCIpO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGxpc3RPZlZpZHMpXHJcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcclxuICAgIC8vIHBhcmVudC5hcHBlbmRDaGlsZChidG4pO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwYXJlbnQpO1xyXG5cclxuICAgIFxyXG4gICAgbGV0IG5hbWVzID0gW107XHJcbiAgICBmb3IobGV0IGogPSAwOyBqIDwgY2xpcHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICBuYW1lcy5wdXNoKFwicGxheWVyXCIgKyBqKVxyXG4gICAgfVxyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGNsaXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHdpZHRoOiA5NzAsXHJcbiAgICAgICAgICAgIGhlaWdodDogNTQwLFxyXG4gICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXHJcbiAgICAgICAgICAgIHRpbWU6IGAkeyBjbGlwc1tpXS52YWx1ZS50aW1lc3RhbXBJblNlY29uZHMgfWAsXHJcbiAgICAgICAgICAgIHZpZGVvOiBgJHsgY2xpcHNbaV0udmFsdWUudm9kLl9pZCB9YCxcclxuICAgICAgICAgICAgcGFyZW50OiBbXCJjbGlwZC5oZXJva3VhcHAuY29tXCJdXHJcbiAgICAgICAgfTtcclxuICAgICAgICBuYW1lc1tpXSA9IG5ldyBUd2l0Y2guUGxheWVyKGAkeyBpIH1gLCBvcHRpb25zKTtcclxuICAgICAgICBuYW1lc1tpXS5zZXRWb2x1bWUoMC41KTtcclxuICAgICAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNsb3NlXCIpLmZvckVhY2goYiA9PiB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYGNsb3NlJHsgaSB9YClbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lc1tpXS5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgbW9kYWwkeyBpIH1gKVswXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGBjbG9zZSR7IGkgfWApWzBdLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY2xpY2tlZFwiKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAvLyB9KVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudmlkZW9Cb3gnKS5mb3JFYWNoKChpdGVtLCBpZHgpID0+IHtcclxuICAgICAgICBjb25zdCBmcm0gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoYC5tb2RhbCR7IGlkeCB9YCk7XHJcbiAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNsb3NlJHsgaWR4IH1gKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhmcm0pXHJcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG4gICAgICAgICAgICAvLyBkZWJ1Z2dlclxyXG4gICAgICAgICAgICBpZihlLnRhcmdldCA9PT0gaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgZnJtLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgICAgICAgICAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJjbGlja2VkIGJveFwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgICAgICAvLyAgICAgZGVidWdnZXJcclxuICAgICAgICAvLyAgICAgZnJtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAvLyAgICAgYnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAvLyB9KVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2xvc2UnKS5mb3JFYWNoKCh4LCBpKSA9PiB7XHJcbiAgICAvLyAgICAgeC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG4gICAgLy8gICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubW9kYWwnKS5mb3JFYWNoKGZybSA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICBmcm0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgLy8gICAgICAgICAgICAgeC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAvLyAgICAgICAgIH0pXHJcbiAgICAvLyAgICAgfSlcclxuICAgIC8vIH0pXHJcblxyXG4gICAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnLyc7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgS2V5IGZyb20gJy4uL2NvbmZpZy9rZXlzJztcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRQbGF5ZXJCeU5hbWUgPSBnYW1lcnRhZyA9PiB7XHJcbiAgICBjb25zdCBwbGF5ZXJCeU5hbWVJbml0ID0ge1xyXG4gICAgICAgIG1ldGhvZDogJ2dldCdcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gbGV0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdChgaHR0cHM6Ly9hcGkucHViZy5jb20vc2hhcmRzL3hib3gvcGxheWVycz9maWx0ZXJbcGxheWVyTmFtZXNdPSR7IGdhbWVydGFnIH1gLCBwbGF5ZXJCeU5hbWVJbml0KTtcclxuICAgIGxldCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoYC9wdWJnL2dhbWVydGFnLyR7IGdhbWVydGFnIH1gLCBwbGF5ZXJCeU5hbWVJbml0KVxyXG4gICAgcmV0dXJuIGZldGNoKHJlcXVlc3QpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXHJcbiAgICB9KVxyXG59XHJcbi8vIHdpbmRvdy5nZXRQbGF5ZXJCeU5hbWUgPSBnZXRQbGF5ZXJCeU5hbWU7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0TWF0Y2ggPSAobWF0Y2hJZCkgPT4ge1xyXG4gICAgY29uc3QgZ2FtZUluaXQgPSB7XHJcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgIH1cclxuXHJcbiAgICAvLyBsZXQgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGBodHRwczovL2FwaS5wdWJnLmNvbS9zaGFyZHMveGJveC9tYXRjaGVzLyR7IG1hdGNoSWQgfWAsIGdhbWVJbml0KTtcclxuICAgIGxldCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoYC9wdWJnL21hdGNoZXMvJHsgbWF0Y2hJZCB9YCwgZ2FtZUluaXQpXHJcbiAgICByZXR1cm4gZmV0Y2gocmVxdWVzdCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKClcclxuICAgIH0pXHJcbn1cclxuLy8gd2luZG93LmdldE1hdGNoID0gZ2V0TWF0Y2g7XHJcbi8vXHJcbmV4cG9ydCBjb25zdCBnZXRUZWxlbWV0cnkgPSAodXJsKSA9PiB7XHJcbiAgICBjb25zdCB0ZWxlbWV0cnlJbml0ID0ge1xyXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdChgL3B1YmcvdGVsZW1ldHJ5Lz91cmw9JHsgdXJsIH1gLCB0ZWxlbWV0cnlJbml0KTtcclxuICAgIHJldHVybiBmZXRjaChyZXF1ZXN0KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxyXG4gICAgfSlcclxufVxyXG4vLyB3aW5kb3cuZ2V0VGVsZW1ldHJ5ID0gZ2V0VGVsZW1ldHJ5O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldE9BdXRoID0gKCkgPT4ge1xyXG4gICAgY29uc3Qgb2F1dGhJbml0ID0ge1xyXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAgICAgLy8gc2NvcGU6ICd1c2VyOnJlYWQ6ZW1haWwnXHJcblxyXG4gICAgfVxyXG4gICAgbGV0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdChgL29hdXRoYCwgb2F1dGhJbml0KTtcclxuICAgIHJldHVybiBmZXRjaChyZXF1ZXN0KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxyXG4gICAgfSlcclxufVxyXG4vLyB3aW5kb3cuZ2V0T0F1dGggPSBnZXRPQXV0aDtcclxuXHJcblxyXG5leHBvcnQgY29uc3QgZ2V0VHdpdGNoVXNlciA9IGdhbWVydGFnID0+IHtcclxuICAgIGNvbnN0IHR3aXRjaFVzZXJJbml0ID0ge1xyXG4gICAgICAgIG1ldGhvZDogJ2dldCdcclxuICAgIH1cclxuICAgIGxldCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoYC90d2l0Y2gvJHsgZ2FtZXJ0YWcgfWAsIHR3aXRjaFVzZXJJbml0KTtcclxuICAgIHJldHVybiBmZXRjaChyZXF1ZXN0KS50aGVuKHIgPT4ge1xyXG4gICAgICAgIHJldHVybiByLmpzb24oKS50aGVuKGpzb24gPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGpzb25cclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG4vLyB3aW5kb3cuZ2V0VHdpdGNoVXNlciA9IGdldFR3aXRjaFVzZXI7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0VmlkZW9zID0gdXNlcklkID0+IHtcclxuICAgIGNvbnN0IHR3aXRjaFZpZGVvc0luaXQgPSB7XHJcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgIH1cclxuICAgIGxldCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoYC90d2l0Y2h2aWRlb3MvJHsgdXNlcklkIH1gLCB0d2l0Y2hWaWRlb3NJbml0KTtcclxuICAgIHJldHVybiBmZXRjaChyZXF1ZXN0KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxyXG4gICAgfSlcclxufVxyXG4vLyB3aW5kb3cuZ2V0VmlkZW9zID0gZ2V0VmlkZW9zO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFB1YmdWaWRlb3MgPSB2aWRlb0lkID0+IHtcclxuICAgIGNvbnN0IHR3aXRjaFB1YmdJbml0ID0ge1xyXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICB9XHJcbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGAvcHViZ3ZpZGVvcy8keyB2aWRlb0lkIH1gLCB0d2l0Y2hQdWJnSW5pdCk7XHJcbiAgICByZXR1cm4gZmV0Y2gocmVxdWVzdCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKClcclxuICAgIH0pXHJcbn1cclxuXHJcbi8vIHdpbmRvdy5nZXRQdWJnVmlkZW9zID0gZ2V0UHViZ1ZpZGVvcztcclxuXHJcblxyXG5leHBvcnQgY29uc3QgdGltZUdyZWF0ZXJUaGFuID0gKHQxLCB0MikgPT4ge1xyXG4gICAgLy8gZGVidWdnZXJcclxuICAgIGxldCB0MyA9IG5ldyBEYXRlKHQxKTtcclxuICAgIGxldCB0NCA9IG5ldyBEYXRlKHQyKTtcclxuXHJcbiAgICBpZih0MyA+PSB0NCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdGltZUdyZWF0ZXJUaGFuMiA9ICh0MSwgdDIsIHNlY29uZHMpID0+IHtcclxuICAgIC8vIGRlYnVnZ2VyXHJcbiAgICBsZXQgdDMgPSBuZXcgRGF0ZSh0MSk7XHJcbiAgICBsZXQgdDQgPSBuZXcgRGF0ZSh0Mik7XHJcbiAgICB0NC5zZXRIb3Vycyh0NC5nZXRIb3VycygpLCB0NC5nZXRNaW51dGVzKCksIHQ0LmdldFNlY29uZHMoKSArIHNlY29uZHMpO1xyXG4gICAgaWYgKHQzIDw9IHQ0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbiAgICAvLyBsZXQgaG91cnMgPSB0NC5nZXRIb3VycygpO1xyXG4gICAgLy8gbGV0IG1pbnV0ZXMgPSB0NC5nZXRNaW51dGVzKCk7XHJcbiAgICAvLyBsZXQgc2VjcyA9IHQ0LmdldFNlY29uZHMoKTtcclxuICAgIC8vIGlmKHNlY29uZHMgKyBzZWMgPCA2MCkge1xyXG4gICAgLy8gICAgIHQ0LnNldEhvdXJzKGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzICsgc2VjcylcclxuICAgIC8vIH0gZWxzZSBpZihzZWNvbmRzICsgc2VjID09PSA2MCkge1xyXG4gICAgLy8gICAgIHQ0LnNldEhvdXJzKGhvdXJzLCBtaW51dGVzICsgMSwgMClcclxuICAgIC8vIH0gZWxzZSBpZihzZWNvbmRzICsgc2VjID4gNjApIHtcclxuICAgIC8vICAgICBsZXQgbmV3U2VjcyA9IChzZWNvbmRzICsgc2VjKSAlIDYwO1xyXG4gICAgLy8gICAgIGxldCBuZXdNaW51dGVzID0gKChzZWNvbmRzICsgc2VjKSAtIG5ld1NlY3MpIC8gNjA7XHJcbiAgICAvLyAgICAgbGV0IG1pbjtcclxuICAgIC8vICAgICBsZXQgaG91cnM7XHJcbiAgICAvLyAgICAgaWYobmV3TWludXRlcyA+IDYwKSB7XHJcbiAgICAvLyAgICAgICAgIG1pbiA9IG5ld01pbnV0ZXMgJSA2MDtcclxuICAgIC8vICAgICAgICAgaG91cnMgPSAobmV3TWludXRlcyAtIG1pbikgLyA2MDtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB0aW1lc3RhbXAgPSAodDEsIHQyLCBzZWNvbmRzKSA9PiB7XHJcbiAgICAvLyBkZWJ1Z2dlclxyXG4gICAgbGV0IHQzID0gbmV3IERhdGUodDEpO1xyXG4gICAgbGV0IHQ0ID0gbmV3IERhdGUodDIpO1xyXG4gICAgdDQuc2V0SG91cnModDQuZ2V0SG91cnMoKSwgdDQuZ2V0TWludXRlcygpLCB0NC5nZXRTZWNvbmRzKCkgKyBzZWNvbmRzKTtcclxuICAgIGxldCBzZWNzID0gKCh0NCAtIHQzKSAvIDEwMDApO1xyXG4gICAgLy8gbGV0IG5UID0gdDQuc2V0SG91cnModDQuZ2V0SG91cnMoKSwgdDQuZ2V0TWludXRlcygpLCB0NC5nZXRTZWNvbmRzKCkgLSBzZWNzKTtcclxuICAgIC8vIGxldCBldmVudFRpbWVzdGFtcCA9IG5UIC0gKG5ldyBEYXRlKHQyKSk7XHJcbiAgICBsZXQgdCA9IG5ldyBEYXRlKG51bGwpO1xyXG4gICAgdC5zZXRTZWNvbmRzKChzZWNvbmRzIC0gc2VjcykgLSAxMCk7XHJcbiAgICBsZXQgYSA9IHQudG9JU09TdHJpbmcoKS5zdWJzdHIoMTEsIDgpLnNwbGl0KFwiOlwiKTtcclxuICAgIHJldHVybiBhWzBdICsgXCJoXCIgKyBhWzFdICsgXCJtXCIgKyBhWzJdICsgXCJzXCJcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHRpbWVzdGFtcDIgPSAodDEsIHQyLCBzZWNvbmRzKSA9PiB7XHJcbiAgICBsZXQgdDMgPSBuZXcgRGF0ZSh0MSk7XHJcbiAgICBsZXQgdDQgPSBuZXcgRGF0ZSh0Mik7XHJcbiAgICB0NC5zZXRIb3Vycyh0NC5nZXRIb3VycygpLCB0NC5nZXRNaW51dGVzKCksIHQ0LmdldFNlY29uZHMoKSArIHNlY29uZHMpO1xyXG4gICAgbGV0IHNlY3MgPSAoKHQ0IC0gdDMpIC8gMTAwMCk7XHJcbiAgICBsZXQgblQgPSB0NC5zZXRIb3Vycyh0NC5nZXRIb3VycygpLCB0NC5nZXRNaW51dGVzKCksIHQ0LmdldFNlY29uZHMoKSAtIHNlY3MpO1xyXG4gICAgcmV0dXJuICgoblQgLSAobmV3IERhdGUodDIpKSkgLyAxMDAwKSAtIDEwO1xyXG59IiwiaW1wb3J0IGRhdGVDb252ZXJ0ZXIgZnJvbSAnLi9kYXRlX2NvbnZlcnRlcic7XHJcbmltcG9ydCB7IHRpbWVHcmVhdGVyVGhhbiwgdGltZUdyZWF0ZXJUaGFuMiwgdGltZXN0YW1wLCB0aW1lc3RhbXAyIH0gZnJvbSAnLi9zZWFyY2hfdXRpbGl0aWVzJztcclxuXHJcbmV4cG9ydCBjb25zdCBkaXNwbGF5U3RyZWFtcyA9IChldmVudHMsIHZpZGVvcywgZ3RhZykgPT4ge1xyXG4gICAgY29uc3QgZmlyc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZmlyc3RcIilbMF07XHJcbiAgICBmaXJzdC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICBjb25zdCBzcGxhc2ggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic3BsYXNoLWNvbnRlbnRcIilbMF07XHJcbiAgICBzcGxhc2guc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgY29uc3QgbG9nbyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJsb2dvXCIpWzBdO1xyXG4gICAgbG9nby5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICBjb25zdCBmcCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJsb2FkXCIpWzBdO1xyXG4gICAgZnAuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgXHJcbiAgICBsZXQgY2xpcHMgPSBbXTtcclxuICAgIGxldCB2aWRlb0hhc0V2ZW50cyA9IHt9O1xyXG5cclxuICAgIC8vIGRlYnVnZ2VyXHJcbiAgICBmb3IobGV0IGogPSAwOyBqIDwgdmlkZW9zLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZih0aW1lR3JlYXRlclRoYW4oZXZlbnRzW2ldLl9ELCB2aWRlb3Nbal0uY3JlYXRlZF9hdCkgJiYgdGltZUdyZWF0ZXJUaGFuMihldmVudHNbaV0uX0QsIHZpZGVvc1tqXS5jcmVhdGVkX2F0LCB2aWRlb3Nbal0ubGVuZ3RoKSkge1xyXG4gICAgICAgICAgICAgICAgdmlkZW9IYXNFdmVudHNbdmlkZW9zW2pdLl9pZF0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY2xpcHMucHVzaCh7XCJ2aWRlb19pZFwiOiB2aWRlb3Nbal0uX2lkLCBcInVybFwiOiB2aWRlb3Nbal0udXJsLCBcInNlZWtcIjogdGltZXN0YW1wMihldmVudHNbaV0uX0QsIHZpZGVvc1tqXS5jcmVhdGVkX2F0LCB2aWRlb3Nbal0ubGVuZ3RoKSwgXCJ0aW1lc3RhbXBJblNlY29uZHNcIjogdGltZXN0YW1wKGV2ZW50c1tpXS5fRCwgdmlkZW9zW2pdLmNyZWF0ZWRfYXQsIHZpZGVvc1tqXS5sZW5ndGgpLCBcImV2ZW50XCI6IGV2ZW50c1tpXSwgXCJ2b2RcIjogdmlkZW9zW2pdfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYXJlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKVxyXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICBidXR0b24uaW5uZXJIVE1MID0gJyZsYXJyOyc7XHJcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImJhY2tcIik7XHJcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xyXG4gICAgcGFyZW50LmNsYXNzTGlzdC5hZGQoXCJwYXJlbnQtY29udGFpbmVyXCIpO1xyXG4gICAgY29uc3QgcGx5ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBwbHlyLmlubmVySFRNTCA9IGA8aDI+JHsgZ3RhZyB9PC9oMj5gO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBseXIpO1xyXG4gICAgXHJcbiAgICBjb25zdCBsaXN0T2ZWaWRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xyXG4gICAgbGlzdE9mVmlkcy5jbGFzc0xpc3QuYWRkKFwibGlzdC1vZi12aWRzXCIpO1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHZpZGVvcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmKHZpZGVvSGFzRXZlbnRzW3ZpZGVvc1tpXS5faWRdKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xyXG4gICAgICAgICAgICB1bC5pbm5lckhUTUwgPSBgPGgzPiR7IHZpZGVvc1tpXS50aXRsZSB9PC9oMz48c3Bhbj4keyBkYXRlQ29udmVydGVyKHZpZGVvc1tpXS5jcmVhdGVkX2F0KSB9PC9zcGFuPmA7XHJcbiAgICAgICAgICAgIHVsLmNsYXNzTGlzdC5hZGQoXCJzdHJlYW1zQm94XCIsIGBzdHJlYW1zQm94JHsgaSB9YCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XHJcbiAgICAgICAgICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoXCJtb2RhbDJcIiwgYG1vZGFsMi0keyBpIH1gKTtcclxuICAgICAgICAgICAgY29uc3QgbW9kYWxfY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIG1vZGFsX2NvbnRlbnQuY2xhc3NMaXN0LmFkZChcIm1vZGFsLWNvbnRlbnRcIiwgYG1vZGFsLWNvbnRlbnQkeyBpIH1gKTtcclxuXHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBjbGlwcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYoY2xpcHNbal0udmlkZW9faWQgPT09IHZpZGVvc1tpXS5faWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBkZWJ1Z2dlclxyXG4gICAgICAgICAgICAgICAgICAgIGxpLmlubmVySFRNTCA9IGBLaWxsZXI6JHsgY2xpcHNbal0uZXZlbnQua2lsbGVyID8gKGNsaXBzW2pdLmV2ZW50LmtpbGxlci5uYW1lKSA6IFwiRW52aXJvbm1lbnRcIiB9IFZpY3RpbTokeyBjbGlwc1tqXS5ldmVudC52aWN0aW0ubmFtZSB9YDtcclxuICAgICAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKGAkeyBjbGlwc1tqXS5ldmVudC5raWxsZXIgPyAoY2xpcHNbal0uZXZlbnQua2lsbGVyLm5hbWUgPT09IGd0YWcgPyBcImdyXCIgOiBcInJlXCIpIDogXCJyZVwiIH1gLCBcIm5vc3R5bGlzdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBsaS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHsgY2xpcHNbal0uc2VlayB9YClcclxuICAgICAgICAgICAgICAgICAgICBtb2RhbF9jb250ZW50LmFwcGVuZENoaWxkKGxpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtb2RhbC5hcHBlbmRDaGlsZChtb2RhbF9jb250ZW50KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHsgaSB9YCk7XHJcbiAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKFwidmZyYW1lXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICAgICAgYnRuLmlubmVySFRNTCA9ICcmIzEwMDA2Oyc7XHJcbiAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwiY2xvc2UyXCIsIGBjbG9zZTItJHsgaSB9YCk7XHJcbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChidG4pO1xyXG4gICAgICAgICAgICBtb2RhbC5hcHBlbmRDaGlsZChkaXYpO1xyXG5cclxuICAgICAgICAgICAgdWwuYXBwZW5kQ2hpbGQobW9kYWwpO1xyXG4gICAgICAgICAgICBsaXN0T2ZWaWRzLmFwcGVuZENoaWxkKHVsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgLy8gYnRuLmlubmVySFRNTCA9ICcmIzEwMDA2Oyc7XHJcbiAgICAvLyBidG4uY2xhc3NMaXN0LmFkZChcImNsb3NlMlwiKTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChsaXN0T2ZWaWRzKVxyXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcbiAgICAvLyBwYXJlbnQuYXBwZW5kQ2hpbGQoYnRuKTtcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocGFyZW50KTtcclxuXHJcbiAgICBsZXQgbmFtZXMgPSBbXTtcclxuICAgIGZvcihsZXQgaiA9IDA7IGogPCB2aWRlb3MubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICBuYW1lcy5wdXNoKFwicGxheWVyXCIgKyBqKVxyXG4gICAgfVxyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHZpZGVvcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmKHZpZGVvSGFzRXZlbnRzW3ZpZGVvc1tpXS5faWRdKSB7XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDk3MCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogNTQwLFxyXG4gICAgICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdmlkZW86IGAkeyB2aWRlb3NbaV0uX2lkIH1gLFxyXG4gICAgICAgICAgICAgICAgcGFyZW50OiBbXCJjbGlwZC5oZXJva3VhcHAuY29tXCJdXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG5hbWVzW2ldID0gbmV3IFR3aXRjaC5QbGF5ZXIoYCR7IGkgfWAsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBuYW1lc1tpXS5zZXRWb2x1bWUoMC41KTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm5vc3R5bGlzdCcpLmZvckVhY2goZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZXNbaV0uc2VlayhOdW1iZXIoZXZlbnQuaWQpKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYGNsb3NlMi0keyBpIH1gKVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lc1tpXS5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYG1vZGFsMi0keyBpIH1gKVswXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgY2xvc2UyLSR7IGkgfWApWzBdLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNsaWNrZWRcIik7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3RyZWFtc0JveCcpLmZvckVhY2goKGl0ZW0sIGlkeCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGZybSA9IGl0ZW0ucXVlcnlTZWxlY3RvcihgLm1vZGFsMi0keyBpZHggfWApO1xyXG4gICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jbG9zZTItJHsgaWR4IH1gKTtcclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcbiAgICAgICAgICAgIGlmKGUudGFyZ2V0ID09PSBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBmcm0uc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgICAgICAgICAgICAgYnRuLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNsaWNrZWQgYm94XCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2xvc2UyJykuZm9yRWFjaCh4ID0+IHtcclxuICAgIC8vICAgICB4LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcbiAgICAvLyAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tb2RhbDInKS5mb3JFYWNoKGZybSA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICBmcm0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgLy8gICAgICAgICAgICAgeC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAvLyAgICAgICAgIH0pXHJcbiAgICAvLyAgICAgfSlcclxuICAgIC8vIH0pXHJcblxyXG4gICAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnLyc7XHJcbiAgICB9XHJcbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwic291cmNlUm9vdCI6IiJ9