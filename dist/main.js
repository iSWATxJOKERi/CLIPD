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
};
window.getTelemetry = getTelemetry;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZy9rZXlzX2Rldi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZGF0ZV9jb252ZXJ0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbm9fdmlkZW9zX2ZvdW5kLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3NlYXJjaF91dGlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvc3RyZWFtcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL2luZGV4LnNjc3MiXSwibmFtZXMiOlsicHJvY2VzcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZXF1aXJlIiwicHViZ0FQSSIsInR3aXRjaEFQSSIsImNsaWVudFNFQ1JFVCIsIm9BVVRIIiwiZ2FtZUlEIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiQkxBQ0tMSVNURUQiLCJrQVYiLCJhY3R1YWwiLCJzdHJlYW1zIiwiY29udGFpbmVyIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInF1ZXJ5U2VsZWN0b3IiLCJnZXRQbGF5ZXIiLCJpbnB1dCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJzdHlsZSIsImRpc3BsYXkiLCJ1biIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwiZ3QiLCJzdWJtaXQiLCJpbm5lckhUTUwiLCJnZXRFbGVtZW50QnlJZCIsImUiLCJnZXRJbnB1dCIsImdldFN0cmVhbXMiLCJ1bmFtZSIsImd0YWciLCJnZXRQbGF5ZXJCeU5hbWUiLCJtYXRjaGVzIiwibWFwIiwibWF0Y2giLCJnZXRNYXRjaCIsImlkIiwiUHJvbWlzZSIsImFsbFNldHRsZWQiLCJnYW1lcyIsImZvckVhY2giLCJ2YWx1ZSIsImluY2x1ZGVkIiwiZWxlIiwiZGF0YSIsInJlbGF0aW9uc2hpcHMiLCJhc3NldHMiLCJldmVudHMiLCJwdXNoIiwiZ2V0VGVsZW1ldHJ5IiwiYXR0cmlidXRlcyIsIlVSTCIsInRlbGVtZXRyeSIsImV2ZW50IiwibG9nIiwiX1QiLCJraWxsZXIiLCJuYW1lIiwidmljdGltIiwiZ2V0VHdpdGNoVXNlciIsInR3aXRjaFVzZXIiLCJsZW5ndGgiLCJnZXRWaWRlb3MiLCJ2aWRlb3MiLCJjbGlwcyIsInZpZCIsImdldFB1YmdWaWRlb3MiLCJhbGwiLCJjIiwiZmlsdGVyIiwiZ2FtZSIsImZwIiwiYWxsVmlkcyIsImRpc3BsYXlTdHJlYW1zIiwiYWN0dWFsTWF0Y2hlcyIsInRlbGVtZXRyeUV2ZW50cyIsImdhbWVydGFnIiwic3BsYXNoIiwibG9nbyIsImZldGNoaW5nUGxheWVyIiwiZmV0Y2hpbmdNYXRjaGVzIiwiZmV0Y2hpbmdFdmVudHMiLCJmZXRjaGluZ0tpbGxzQW5kRGVhdGhzIiwiZmV0Y2hpbmdWaWRlb3MiLCJ0RXZlbnQiLCJldmVudFRpbWVzdGFtcCIsIl9EIiwiY2xpcCIsInRpbWVHcmVhdGVyVGhhbiIsImNyZWF0ZWRfYXQiLCJ0aW1lR3JlYXRlclRoYW4yIiwidXJsIiwidGltZXN0YW1wIiwiZmluYWwiLCJub1ZpZGVvc0ZvdW5kIiwidmlkZW9zRm91bmQiLCJkYXRlQ29udmVydGVyIiwidWdseURhdGUiLCJmYWtlSGFsZiIsInNwbGl0IiwicmVhbEhhbGYiLCJyZWFsRGF0ZSIsIk1PTlRIUyIsInBhcmVudCIsImJ1dHRvbiIsInBsYXllciIsIm1lc3NhZ2UiLCJib2R5Iiwib25jbGljayIsIndpbmRvdyIsImxvY2F0aW9uIiwibGlzdE9mVmlkcyIsImkiLCJ1bCIsIm1vZGFsIiwiZGl2IiwiYnRuIiwibmFtZXMiLCJqIiwib3B0aW9ucyIsIndpZHRoIiwiaGVpZ2h0IiwiYXV0b3BsYXkiLCJ0aW1lIiwidGltZXN0YW1wSW5TZWNvbmRzIiwidmlkZW8iLCJ2b2QiLCJfaWQiLCJUd2l0Y2giLCJQbGF5ZXIiLCJzZXRWb2x1bWUiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYiIsInBhdXNlIiwiaXRlbSIsImZybSIsIngiLCJwbGF5ZXJCeU5hbWVJbml0IiwibWV0aG9kIiwicmVxdWVzdCIsIlJlcXVlc3QiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJtYXRjaElkIiwiZ2FtZUluaXQiLCJ0ZWxlbWV0cnlJbml0IiwiZ2V0T0F1dGgiLCJvYXV0aEluaXQiLCJ0d2l0Y2hVc2VySW5pdCIsInIiLCJ1c2VySWQiLCJ0d2l0Y2hWaWRlb3NJbml0IiwidmlkZW9JZCIsInR3aXRjaFB1YmdJbml0IiwidDEiLCJ0MiIsInQzIiwiRGF0ZSIsInQ0Iiwic2Vjb25kcyIsInNldEhvdXJzIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZ2V0U2Vjb25kcyIsInNlY3MiLCJ0Iiwic2V0U2Vjb25kcyIsImEiLCJ0b0lTT1N0cmluZyIsInN1YnN0ciIsInRpbWVzdGFtcDIiLCJuVCIsInZpZGVvSGFzRXZlbnRzIiwicGx5ciIsInRpdGxlIiwibW9kYWxfY29udGVudCIsInZpZGVvX2lkIiwibGkiLCJzZWVrIiwiTnVtYmVyIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCOztBQUVoQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0Qzs7QUFFQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLDBDQUEwQztBQUMxQzs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZHQUE2RztBQUM3Rzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QyxXQUFXO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7OztBQUdBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdDQUF3QztBQUN4QywyQkFBMkI7QUFDM0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULG9DQUFvQztBQUNwQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILG9DQUFvQyxjQUFjO0FBQ2xEO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7O0FBRWhELHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7OztBQUdBO0FBQ0E7QUFDQSxHQUFHLGdDQUFnQyxrQkFBa0I7QUFDckQ7OztBQUdBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CO0FBQ25COztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDhDQUE4QyxRQUFRO0FBQ3REO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQSw4Q0FBOEMsUUFBUTtBQUN0RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSw4Q0FBOEMsUUFBUTtBQUN0RDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7OztBQUdBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7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QUFVQyxPQUFWLEdBQW9CLE1BQXBCO0FBQ0FzSCxTQUFDLENBQUN2SCxLQUFGLENBQVFDLE9BQVIsR0FBa0IsTUFBbEI7QUFDSCxPQUhEO0FBSUgsS0FMRDtBQU1ILEdBUEQ7O0FBU0FzRixRQUFNLENBQUNJLE9BQVAsR0FBaUIsWUFBVztBQUN4QkMsVUFBTSxDQUFDQyxRQUFQLEdBQWtCLEdBQWxCO0FBQ0gsR0FGRDtBQUdILENBM0hNLEM7Ozs7Ozs7Ozs7OztBQ0hQO0FBQUEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xudmFyIHJ1bnRpbWUgPSBmdW5jdGlvbiAoZXhwb3J0cykge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIG9ialtrZXldO1xuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyBJRSA4IGhhcyBhIGJyb2tlbiBPYmplY3QuZGVmaW5lUHJvcGVydHkgdGhhdCBvbmx5IHdvcmtzIG9uIERPTSBvYmplY3RzLlxuICAgIGRlZmluZSh7fSwgXCJcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlZmluZSA9IGZ1bmN0aW9uIChvYmosIGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTsgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cblxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG5cbiAgZXhwb3J0cy53cmFwID0gd3JhcDsgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcIm5vcm1hbFwiLFxuICAgICAgICBhcmc6IGZuLmNhbGwob2JqLCBhcmcpXG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJ0aHJvd1wiLFxuICAgICAgICBhcmc6IGVyclxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7IC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307IC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cblxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cblxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9IC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cblxuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4gIEl0ZXJhdG9yUHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcblxuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiYgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID0gR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IGRlZmluZShHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIik7IC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgIGRlZmluZShwcm90b3R5cGUsIG1ldGhvZCwgZnVuY3Rpb24gKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24gKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvciA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8IC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiIDogZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24gKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgZGVmaW5lKGdlbkZ1biwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIik7XG4gICAgfVxuXG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07IC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG5cblxuICBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24gKGFyZykge1xuICAgIHJldHVybiB7XG4gICAgICBfX2F3YWl0OiBhcmdcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yLCBQcm9taXNlSW1wbCkge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcblxuICAgICAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbiAodW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9IC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZywgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfSAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuXG5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcblxuICBBc3luY0l0ZXJhdG9yLnByb3RvdHlwZVthc3luY0l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBleHBvcnRzLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yOyAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cblxuICBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24gKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0LCBQcm9taXNlSW1wbCkge1xuICAgIGlmIChQcm9taXNlSW1wbCA9PT0gdm9pZCAwKSBQcm9taXNlSW1wbCA9IFByb21pc2U7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcih3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSwgUHJvbWlzZUltcGwpO1xuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbikgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9IC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcblxuXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG5cbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lID8gR2VuU3RhdGVDb21wbGV0ZWQgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7IC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG5cblxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcblxuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoIWluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7IC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cblxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYzsgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH0gLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuXG5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfSAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG5cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuICBkZWZpbmUoR3AsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvclwiKTsgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHtcbiAgICAgIHRyeUxvYzogbG9jc1swXVxuICAgIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3tcbiAgICAgIHRyeUxvYzogXCJyb290XCJcbiAgICB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuXG4gICAga2V5cy5yZXZlcnNlKCk7IC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cblxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuXG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfSAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cblxuXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcblxuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSxcbiAgICAgICAgICAgIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH0gLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuXG5cbiAgICByZXR1cm4ge1xuICAgICAgbmV4dDogZG9uZVJlc3VsdFxuICAgIH07XG4gIH1cblxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgZG9uZTogdHJ1ZVxuICAgIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcbiAgICByZXNldDogZnVuY3Rpb24gKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwOyAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cblxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJiBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJiAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgc3RvcDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24gKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcblxuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWJydXB0OiBmdW5jdGlvbiAodHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJiBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJiAodHlwZSA9PT0gXCJicmVha1wiIHx8IHR5cGUgPT09IFwiY29udGludWVcIikgJiYgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiYgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uIChyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fCByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcbiAgICBmaW5pc2g6IGZ1bmN0aW9uIChmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcblxuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uICh0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfSAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cblxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbiAoaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTsgLy8gUmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZVxuICAvLyBvciBub3QsIHJldHVybiB0aGUgcnVudGltZSBvYmplY3Qgc28gdGhhdCB3ZSBjYW4gZGVjbGFyZSB0aGUgdmFyaWFibGVcbiAgLy8gcmVnZW5lcmF0b3JSdW50aW1lIGluIHRoZSBvdXRlciBzY29wZSwgd2hpY2ggYWxsb3dzIHRoaXMgbW9kdWxlIHRvIGJlXG4gIC8vIGluamVjdGVkIGVhc2lseSBieSBgYmluL3JlZ2VuZXJhdG9yIC0taW5jbHVkZS1ydW50aW1lIHNjcmlwdC5qc2AuXG5cbiAgcmV0dXJuIGV4cG9ydHM7XG59KCAvLyBJZiB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGUsIHVzZSBtb2R1bGUuZXhwb3J0c1xuLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbi8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbi8vIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgdmFyaWFibGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXG50eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fSk7XG5cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAvLyBUaGlzIG1vZHVsZSBzaG91bGQgbm90IGJlIHJ1bm5pbmcgaW4gc3RyaWN0IG1vZGUsIHNvIHRoZSBhYm92ZVxuICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3RcbiAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCB3ZSBjYW4gZXNjYXBlXG4gIC8vIHN0cmljdCBtb2RlIHVzaW5nIGEgZ2xvYmFsIEZ1bmN0aW9uIGNhbGwuIFRoaXMgY291bGQgY29uY2VpdmFibHkgZmFpbFxuICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgLy8gdGhlIHByb3BlciBzb2x1dGlvbiBpcyB0byBmaXggdGhlIGFjY2lkZW50YWwgc3RyaWN0IG1vZGUgcHJvYmxlbS4gSWZcbiAgLy8geW91J3ZlIG1pc2NvbmZpZ3VyZWQgeW91ciBidW5kbGVyIHRvIGZvcmNlIHN0cmljdCBtb2RlIGFuZCBhcHBsaWVkIGFcbiAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gIC8vIHByb2JsZW1zLCBwbGVhc2UgZGV0YWlsIHlvdXIgdW5pcXVlIHByZWRpY2FtZW50IGluIGEgR2l0SHViIGlzc3VlLlxuICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xufSIsImlmKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIikge1xyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9rZXlzX3Byb2RcIilcclxufSBlbHNlIHtcclxuICAgIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4va2V5c19kZXZcIilcclxufSIsIm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgcHViZ0FQSTogJ2V5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5leUpxZEdraU9pSTFObU0xWTJNNU1DMWxZbVptTFRBeE16Z3RNV1F4T0MwMFltTXlOalZtTXpFeVlqRWlMQ0pwYzNNaU9pSm5ZVzFsYkc5amEyVnlJaXdpYVdGMElqb3hOakF5TWpBNE1EWXdMQ0p3ZFdJaU9pSmliSFZsYUc5c1pTSXNJblJwZEd4bElqb2ljSFZpWnlJc0ltRndjQ0k2SW1Oc2FYQndaV1FpZlEuWUdCbGgzZUpxUlBPa2VTREpxVFVLRzJxQVFfcTZjZXg4T0JLVXVwTHRTSScsXHJcbiAgICB0d2l0Y2hBUEk6ICc2ZGdpYTFwbXZtcmxzM2k2bGV6Z3JtaWJ2MDMwcHonLFxyXG4gICAgY2xpZW50U0VDUkVUOiAnYjdoZzJ6Z2g5bGdzNXY3aTkwMTBma2xnd2Npa3NrJyxcclxuICAgIG9BVVRIOiAnbjB1czdteTUweHVqMjNkZzJxODl6amo2eHZ6MmF3JyxcclxuICAgIGdhbWVJRDogJzQ5MzA1NydcclxufSIsImltcG9ydCAnLi4vc3JjL3N0eWxlcy9pbmRleC5zY3NzJztcclxuaW1wb3J0IHsgZ2V0TWF0Y2gsIGdldFBsYXllckJ5TmFtZSwgZ2V0VHdpdGNoVXNlciwgZ2V0VGVsZW1ldHJ5LCBnZXRWaWRlb3MsIGdldFB1YmdWaWRlb3MsIHRpbWVHcmVhdGVyVGhhbiwgdGltZUdyZWF0ZXJUaGFuMiwgdGltZXN0YW1wIH0gZnJvbSAnLi9zY3JpcHRzL3NlYXJjaF91dGlsaXRpZXMnO1xyXG5pbXBvcnQgXCJyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWVcIjtcclxuaW1wb3J0IHsgbm9WaWRlb3NGb3VuZCwgdmlkZW9zRm91bmQgfSBmcm9tICcuL3NjcmlwdHMvbm9fdmlkZW9zX2ZvdW5kJztcclxuaW1wb3J0IHsgZGlzcGxheVN0cmVhbXMgfSBmcm9tICcuL3NjcmlwdHMvc3RyZWFtcyc7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcbiAgICBsZXQgQkxBQ0tMSVNURUQgPSB7fTtcclxuICAgIGxldCBrQVYgPSBbXTtcclxuICAgIGxldCBhY3R1YWw7XHJcbiAgICBsZXQgc3RyZWFtcyA9IFtdO1xyXG4gICAgLy8gbGV0IGdhbWVydGFnID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImdhbWVydGFnLWZpZWxkXCIpWzBdLnZhbHVlO1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImdldFN0cmVhbXNcIilbMF07XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZhLXNlYXJjaFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZ2V0UGxheWVyKTtcclxuXHJcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xyXG4gICAgaW5wdXQuY2xhc3NMaXN0LmFkZChcImlucHV0LWNvbnRhaW5lclwiKTtcclxuICAgIGlucHV0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIGNvbnN0IHVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgdW4uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XHJcbiAgICB1bi5zZXRBdHRyaWJ1dGUoXCJwbGFjZWhvbGRlclwiLCBcIlR3aXRjaCBVc2VyXCIpO1xyXG4gICAgdW4uY2xhc3NMaXN0LmFkZChcInVuLWZpZWxkXCIpO1xyXG4gICAgaW5wdXQuYXBwZW5kQ2hpbGQodW4pO1xyXG4gICAgY29uc3QgZ3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICBndC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dFwiKTtcclxuICAgIGd0LnNldEF0dHJpYnV0ZShcInBsYWNlaG9sZGVyXCIsIFwiUFVCRyBVc2VyXCIpO1xyXG4gICAgZ3QuY2xhc3NMaXN0LmFkZChcImd0LWZpZWxkXCIpO1xyXG4gICAgaW5wdXQuYXBwZW5kQ2hpbGQoZ3QpO1xyXG4gICAgY29uc3Qgc3VibWl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICBzdWJtaXQuY2xhc3NMaXN0LmFkZChcInN1Ym1pdC1zdHJlYW1cIik7XHJcbiAgICBzdWJtaXQuaW5uZXJIVE1MID0gXCJTZWFyY2hcIjtcclxuICAgIGlucHV0LmFwcGVuZENoaWxkKHN1Ym1pdCk7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaW5wdXQpO1xyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2V0U3RyZWFtc1wiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XHJcbiAgICAgICAgaWYoaW5wdXQuc3R5bGUuZGlzcGxheSA9PT0gXCJmbGV4XCIpIHtcclxuICAgICAgICAgICAgaW5wdXQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgaW5wdXQuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdWJtaXQtc3RyZWFtXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBnZXRJbnB1dCk7XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0SW5wdXQoKSB7XHJcbiAgICAgICAgY29uc3QgdW5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidW4tZmllbGRcIilbMF0udmFsdWU7XHJcbiAgICAgICAgY29uc3QgZ3RhZyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJndC1maWVsZFwiKVswXS52YWx1ZTtcclxuXHJcbiAgICAgICAgaWYodW5hbWUgJiYgZ3RhZykge1xyXG4gICAgICAgICAgICBjb25zdCBmcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgICAgICBmcC5jbGFzc0xpc3QuYWRkKFwibG9hZGluZzFcIiwgXCJsb2FkXCIpO1xyXG4gICAgICAgICAgICBmcC5pbm5lckhUTUwgPSAnRmV0Y2hpbmcgVmlkZW9zIC4uLic7XHJcbiAgICAgICAgICAgIGlucHV0LmFwcGVuZENoaWxkKGZwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhbGxWaWRzID0gYXdhaXQgZ2V0U3RyZWFtcyh1bmFtZSwgZ3RhZyk7XHJcbiAgICAgICAgZGlzcGxheVN0cmVhbXMoa0FWLCBhbGxWaWRzLCBndGFnKTtcclxuXHJcblxyXG4gICAgICAgIGFzeW5jIGZ1bmN0aW9uIGdldFN0cmVhbXModW5hbWUsIGd0YWcpIHtcclxuICAgICAgICAgICAgbGV0IG1hdGNoZXMgPSBhd2FpdCBnZXRQbGF5ZXJCeU5hbWUoZ3RhZyk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG1hdGNoZXMpO1xyXG4gICAgICAgICAgICBhY3R1YWwgPSBtYXRjaGVzLm1hcChhc3luYyBtYXRjaCA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgZ2V0TWF0Y2gobWF0Y2guaWQpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICBcclxuICAgICAgICAgICAgbGV0IGdhbWVzID0gYXdhaXQgUHJvbWlzZS5hbGxTZXR0bGVkKGFjdHVhbCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGdhbWVzKVxyXG4gICAgXHJcbiAgICAgICAgICAgIGdhbWVzLmZvckVhY2goYXN5bmMgbWF0Y2ggPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYobWF0Y2gudmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG1hdGNoLnZhbHVlLmluY2x1ZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoLnZhbHVlLmluY2x1ZGVkLmZvckVhY2goYXN5bmMgZWxlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZS5pZCA9PT0gbWF0Y2gudmFsdWUuZGF0YS5yZWxhdGlvbnNoaXBzLmFzc2V0cy5kYXRhWzBdLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzLnB1c2goZ2V0VGVsZW1ldHJ5KGVsZS5hdHRyaWJ1dGVzLlVSTCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgXHJcbiAgICAgICAgICAgIGxldCB0ZWxlbWV0cnkgPSBhd2FpdCBQcm9taXNlLmFsbFNldHRsZWQoZXZlbnRzKTtcclxuICAgIFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0ZWxlbWV0cnkpXHJcbiAgICAgICAgICAgIHRlbGVtZXRyeS5mb3JFYWNoKGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnZhbHVlLmZvckVhY2gobG9nID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZigoKGxvZy5fVCA9PT0gXCJMb2dQbGF5ZXJLaWxsXCIgJiYgbG9nLmtpbGxlcikgJiYgbG9nLmtpbGxlci5uYW1lID09PSBndGFnKSB8fCAoKGxvZy5fVCA9PT0gXCJMb2dQbGF5ZXJLaWxsXCIgJiYgbG9nLnZpY3RpbSkgJiYgbG9nLnZpY3RpbS5uYW1lID09PSBndGFnKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtBVi5wdXNoKGxvZylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhrQVYpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHR3aXRjaFVzZXIgPSBhd2FpdCBnZXRUd2l0Y2hVc2VyKHVuYW1lKTtcclxuICAgICAgICAgICAgaWYodHdpdGNoVXNlcikge1xyXG4gICAgICAgICAgICAgICAgaWYodHdpdGNoVXNlci5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmlkZW9zID0gYXdhaXQgZ2V0VmlkZW9zKHR3aXRjaFVzZXIuZGF0YVswXS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodmlkZW9zLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2xpcHMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGNvbnN0IHZpZCBvZiB2aWRlb3MuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpcHMucHVzaChnZXRQdWJnVmlkZW9zKHZpZC5pZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjID0gYXdhaXQgUHJvbWlzZS5hbGwoY2xpcHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyZWFtcyA9IGMuZmlsdGVyKGVsZSA9PiBlbGUuZ2FtZSA9PT0gXCJQTEFZRVJVTktOT1dOJ1MgQkFUVExFR1JPVU5EU1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGVidWdnZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coc3RyZWFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJlYW1zO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgYWN0dWFsTWF0Y2hlcyA9IFtdO1xyXG4gICAgbGV0IGV2ZW50cyA9IFtdO1xyXG4gICAgbGV0IHRlbGVtZXRyeUV2ZW50cyA9IFtdO1xyXG4gICAgbGV0IGNsaXBzID0gW107XHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRQbGF5ZXIoKSB7XHJcbiAgICAgICAgbGV0IGdhbWVydGFnID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImdhbWVydGFnLWZpZWxkXCIpWzBdLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IHNwbGFzaCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzcGxhc2gtY29udGVudFwiKVswXTtcclxuICAgICAgICBjb25zdCBsb2dvID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImxvZ29cIilbMF07XHJcbiAgICAgICAgY29uc3QgZmV0Y2hpbmdQbGF5ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICBmZXRjaGluZ1BsYXllci5jbGFzc0xpc3QuYWRkKFwibG9hZGluZzFcIiwgXCJsb2FkaW5nXCIpO1xyXG4gICAgICAgIGZldGNoaW5nUGxheWVyLmlubmVySFRNTCA9ICdGZXRjaGluZyBQbGF5ZXIgLi4uJztcclxuICAgICAgICBzcGxhc2guYXBwZW5kQ2hpbGQoZmV0Y2hpbmdQbGF5ZXIpO1xyXG4gICAgICAgIGxldCBtYXRjaGVzID0gYXdhaXQgZ2V0UGxheWVyQnlOYW1lKGdhbWVydGFnKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhtYXRjaGVzKTtcclxuICAgICAgICAvLyBkZWJ1Z2dlclxyXG4gICAgICAgIGFjdHVhbE1hdGNoZXMgPSBtYXRjaGVzLm1hcChhc3luYyBtYXRjaCA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBnZXRNYXRjaChtYXRjaC5pZClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBmZXRjaGluZ1BsYXllci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgY29uc3QgZmV0Y2hpbmdNYXRjaGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgZmV0Y2hpbmdNYXRjaGVzLmNsYXNzTGlzdC5hZGQoXCJsb2FkaW5nMlwiLCBcImxvYWRpbmdcIik7XHJcbiAgICAgICAgZmV0Y2hpbmdNYXRjaGVzLmlubmVySFRNTCA9ICdGZXRjaGluZyBNYXRjaGVzIC4uLic7XHJcbiAgICAgICAgc3BsYXNoLmFwcGVuZENoaWxkKGZldGNoaW5nTWF0Y2hlcyk7XHJcbiAgICAgICAgbGV0IGdhbWVzID0gYXdhaXQgUHJvbWlzZS5hbGxTZXR0bGVkKGFjdHVhbE1hdGNoZXMpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGdhbWVzKVxyXG5cclxuXHJcbiAgICAgICAgZmV0Y2hpbmdNYXRjaGVzLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICBjb25zdCBmZXRjaGluZ0V2ZW50cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgIGZldGNoaW5nRXZlbnRzLmNsYXNzTGlzdC5hZGQoXCJsb2FkaW5nM1wiLCBcImxvYWRpbmdcIik7XHJcbiAgICAgICAgZmV0Y2hpbmdFdmVudHMuaW5uZXJIVE1MID0gJ0ZldGNoaW5nIEV2ZW50cyAuLi4nO1xyXG4gICAgICAgIHNwbGFzaC5hcHBlbmRDaGlsZChmZXRjaGluZ0V2ZW50cyk7XHJcblxyXG4gICAgICAgIGdhbWVzLmZvckVhY2goYXN5bmMgbWF0Y2ggPT4ge1xyXG4gICAgICAgICAgICBpZihtYXRjaC52YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICBpZihtYXRjaC52YWx1ZS5pbmNsdWRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoLnZhbHVlLmluY2x1ZGVkLmZvckVhY2goYXN5bmMgZWxlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlLmlkID09PSBtYXRjaC52YWx1ZS5kYXRhLnJlbGF0aW9uc2hpcHMuYXNzZXRzLmRhdGFbMF0uaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50cy5wdXNoKGdldFRlbGVtZXRyeShlbGUuYXR0cmlidXRlcy5VUkwpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGxldCB0ZWxlbWV0cnkgPSBhd2FpdCBQcm9taXNlLmFsbFNldHRsZWQoZXZlbnRzKTtcclxuXHJcbiAgICAgICAgZmV0Y2hpbmdFdmVudHMuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIGNvbnN0IGZldGNoaW5nS2lsbHNBbmREZWF0aHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICBmZXRjaGluZ0tpbGxzQW5kRGVhdGhzLmNsYXNzTGlzdC5hZGQoXCJsb2FkaW5nNFwiLCBcImxvYWRpbmdcIik7XHJcbiAgICAgICAgZmV0Y2hpbmdLaWxsc0FuZERlYXRocy5pbm5lckhUTUwgPSAnRmV0Y2hpbmcgS2lsbHMgYW5kIERlYXRocyAuLi4nO1xyXG4gICAgICAgIHNwbGFzaC5hcHBlbmRDaGlsZChmZXRjaGluZ0tpbGxzQW5kRGVhdGhzKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0ZWxlbWV0cnkpXHJcbiAgICAgICAgdGVsZW1ldHJ5LmZvckVhY2goZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBldmVudC52YWx1ZS5mb3JFYWNoKGxvZyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZigoKGxvZy5fVCA9PT0gXCJMb2dQbGF5ZXJLaWxsXCIgJiYgbG9nLmtpbGxlcikgJiYgbG9nLmtpbGxlci5uYW1lID09PSBnYW1lcnRhZykgfHwgKChsb2cuX1QgPT09IFwiTG9nUGxheWVyS2lsbFwiICYmIGxvZy52aWN0aW0pICYmIGxvZy52aWN0aW0ubmFtZSA9PT0gZ2FtZXJ0YWcpKXtcclxuICAgICAgICAgICAgICAgICAgICB0ZWxlbWV0cnlFdmVudHMucHVzaChsb2cpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0ZWxlbWV0cnlFdmVudHMpXHJcbiAgICAgICAgZmV0Y2hpbmdLaWxsc0FuZERlYXRocy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgY29uc3QgZmV0Y2hpbmdWaWRlb3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICBmZXRjaGluZ1ZpZGVvcy5jbGFzc0xpc3QuYWRkKFwibG9hZGluZzVcIiwgXCJsb2FkaW5nXCIpO1xyXG4gICAgICAgIGZldGNoaW5nVmlkZW9zLmlubmVySFRNTCA9ICdGZXRjaGluZyBWaWRlb3MgLi4uJztcclxuICAgICAgICBzcGxhc2guYXBwZW5kQ2hpbGQoZmV0Y2hpbmdWaWRlb3MpO1xyXG4gICAgICAgIGZvcihjb25zdCB0RXZlbnQgb2YgdGVsZW1ldHJ5RXZlbnRzKSB7XHJcbiAgICAgICAgICAgIGxldCBldmVudFRpbWVzdGFtcCA9IHRFdmVudC5fRDtcclxuICAgICAgICAgICAgaWYodEV2ZW50LmtpbGxlcikge1xyXG4gICAgICAgICAgICAgICAgaWYoIUJMQUNLTElTVEVEW3RFdmVudC5raWxsZXIubmFtZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0d2l0Y2hVc2VyID0gYXdhaXQgZ2V0VHdpdGNoVXNlcih0RXZlbnQua2lsbGVyLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHR3aXRjaFVzZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodHdpdGNoVXNlci5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2aWRlb3MgPSBhd2FpdCBnZXRWaWRlb3ModHdpdGNoVXNlci5kYXRhWzBdLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHZpZGVvcy5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWRlb3MuZGF0YS5tYXAoYXN5bmMgdmlkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsaXAgPSBhd2FpdCBnZXRQdWJnVmlkZW9zKHZpZC5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNsaXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlYnVnZ2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjbGlwLmdhbWUgPT09IFwiUExBWUVSVU5LTk9XTidTIEJBVFRMRUdST1VORFNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlYnVnZ2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGltZUdyZWF0ZXJUaGFuKGV2ZW50VGltZXN0YW1wLCBjbGlwLmNyZWF0ZWRfYXQpICYmIHRpbWVHcmVhdGVyVGhhbjIoZXZlbnRUaW1lc3RhbXAsIGNsaXAuY3JlYXRlZF9hdCwgY2xpcC5sZW5ndGgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaXBzLnB1c2goe1widXJsXCI6IGNsaXAudXJsLCBcInRpbWVzdGFtcEluU2Vjb25kc1wiOiB0aW1lc3RhbXAoZXZlbnRUaW1lc3RhbXAsIGNsaXAuY3JlYXRlZF9hdCwgY2xpcC5sZW5ndGgpLCBcImV2ZW50XCI6IHRFdmVudCwgXCJ2b2RcIjogY2xpcH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJMQUNLTElTVEVEW3RFdmVudC5raWxsZXIubmFtZV0gPSB0RXZlbnQua2lsbGVyLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBCTEFDS0xJU1RFRFt0RXZlbnQua2lsbGVyLm5hbWVdID0gdEV2ZW50LmtpbGxlci5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0RXZlbnQudmljdGltKSB7XHJcbiAgICAgICAgICAgICAgICBpZighQkxBQ0tMSVNURURbdEV2ZW50LnZpY3RpbS5uYW1lXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR3aXRjaFVzZXIgPSBhd2FpdCBnZXRUd2l0Y2hVc2VyKHRFdmVudC52aWN0aW0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodHdpdGNoVXNlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0d2l0Y2hVc2VyLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZpZGVvcyA9IGF3YWl0IGdldFZpZGVvcyh0d2l0Y2hVc2VyLmRhdGFbMF0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodmlkZW9zLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHZpZGVvcy5kYXRhLmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWRlb3MuZGF0YS5tYXAoYXN5bmMgdmlkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsaXAgPSBhd2FpdCBnZXRQdWJnVmlkZW9zKHZpZC5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNsaXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlYnVnZ2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjbGlwLmdhbWUgPT09IFwiUExBWUVSVU5LTk9XTidTIEJBVFRMRUdST1VORFNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlYnVnZ2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGltZUdyZWF0ZXJUaGFuKGV2ZW50VGltZXN0YW1wLCBjbGlwLmNyZWF0ZWRfYXQpICYmIHRpbWVHcmVhdGVyVGhhbjIoZXZlbnRUaW1lc3RhbXAsIGNsaXAuY3JlYXRlZF9hdCwgY2xpcC5sZW5ndGgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaXBzLnB1c2goe1widXJsXCI6IGNsaXAudXJsLCBcInRpbWVzdGFtcEluU2Vjb25kc1wiOiB0aW1lc3RhbXAoZXZlbnRUaW1lc3RhbXAsIGNsaXAuY3JlYXRlZF9hdCwgY2xpcC5sZW5ndGgpLCBcImV2ZW50XCI6IHRFdmVudCwgXCJ2b2RcIjogY2xpcH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNsaXBzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgQkxBQ0tMSVNURURbdEV2ZW50LnZpY3RpbS5uYW1lXSA9IHRFdmVudC52aWN0aW0ubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBCTEFDS0xJU1RFRFt0RXZlbnQudmljdGltLm5hbWVdID0gdEV2ZW50LnZpY3RpbS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhjbGlwcyk7XHJcbiAgICAgICAgbGV0IGZpbmFsID0gYXdhaXQgUHJvbWlzZS5hbGxTZXR0bGVkKGNsaXBzKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhmaW5hbCk7XHJcbiAgICAgICAgaWYoZmluYWwubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGZldGNoaW5nVmlkZW9zLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgbG9nby5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgIG5vVmlkZW9zRm91bmQoZ2FtZXJ0YWcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxvZ28uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICBmZXRjaGluZ1ZpZGVvcy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgIHZpZGVvc0ZvdW5kKGdhbWVydGFnLCBmaW5hbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSIsImNvbnN0IGRhdGVDb252ZXJ0ZXIgPSAodWdseURhdGUpID0+IHtcclxuICAgIGxldCBmYWtlSGFsZiA9IHVnbHlEYXRlLnNwbGl0KFwiVFwiKTtcclxuICAgIGxldCByZWFsSGFsZiA9IGZha2VIYWxmWzBdLnNwbGl0KFwiLVwiKTtcclxuXHJcbiAgICBsZXQgcmVhbERhdGUgPSBNT05USFNbcmVhbEhhbGZbMV1dICsgXCIsIFwiICsgcmVhbEhhbGZbMl0gKyBcIiBcIiArIHJlYWxIYWxmWzBdO1xyXG5cclxuICAgIHJldHVybiByZWFsRGF0ZTtcclxufVxyXG5cclxuY29uc3QgTU9OVEhTID0ge1xyXG4gICAgXCIwMVwiOiBcIkphbnVhcnlcIixcclxuICAgIFwiMDJcIjogXCJGZWJydWFyeVwiLFxyXG4gICAgXCIwM1wiOiBcIk1hcmNoXCIsXHJcbiAgICBcIjA0XCI6IFwiQXByaWxcIixcclxuICAgIFwiMDVcIjogXCJNYXlcIixcclxuICAgIFwiMDZcIjogXCJKdW5lXCIsXHJcbiAgICBcIjA3XCI6IFwiSnVseVwiLFxyXG4gICAgXCIwOFwiOiBcIkF1Z3VzdFwiLFxyXG4gICAgXCIwOVwiOiBcIlNlcHRlbWJlclwiLFxyXG4gICAgXCIxMFwiOiBcIk9jdG9iZXJcIixcclxuICAgIFwiMTFcIjogXCJOb3ZlbWJlclwiLFxyXG4gICAgXCIxMlwiOiBcIkRlY2VtYmVyXCJcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGF0ZUNvbnZlcnRlcjsiLCJleHBvcnQgY29uc3Qgbm9WaWRlb3NGb3VuZCA9IChnYW1lcnRhZykgPT4ge1xyXG4gICAgY29uc3Qgc3BsYXNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNwbGFzaC1jb250ZW50XCIpWzBdO1xyXG4gICAgc3BsYXNoLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIGNvbnN0IGxvZ28gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibG9nb1wiKVswXTtcclxuICAgIGxvZ28uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgY29uc3QgcGFyZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIilcclxuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgYnV0dG9uLmlubmVySFRNTCA9ICcmbGFycjsnO1xyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJiYWNrXCIpO1xyXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcclxuICAgIHBhcmVudC5jbGFzc0xpc3QuYWRkKFwicGFyZW50LWNvbnRhaW5lclwiKTtcclxuICAgIGNvbnN0IHBsYXllciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBwbGF5ZXIuaW5uZXJIVE1MID0gYDxoMj4keyBnYW1lcnRhZyB9PC9oMj5gO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBsYXllcik7XHJcbiAgICBjb25zdCBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIG1lc3NhZ2UuaW5uZXJIVE1MID0gJzxwPk5vIHZpZGVvcyBmb3VuZCBmb3IgdGhpcyB1c2VyPC9wPic7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobWVzc2FnZSk7XHJcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocGFyZW50KTtcclxuXHJcbiAgICBidXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvJztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHZpZGVvc0ZvdW5kID0gKGdhbWVydGFnLCBjbGlwcykgPT4ge1xyXG4gICAgY29uc3Qgc3BsYXNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNwbGFzaC1jb250ZW50XCIpWzBdO1xyXG4gICAgc3BsYXNoLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIGNvbnN0IGxvZ28gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibG9nb1wiKVswXTtcclxuICAgIGNvbnN0IHBhcmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpXHJcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgIGJ1dHRvbi5pbm5lckhUTUwgPSAnJmxhcnI7JztcclxuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYmFja1wiKTtcclxuICAgIHBhcmVudC5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XHJcbiAgICBwYXJlbnQuY2xhc3NMaXN0LmFkZChcInBhcmVudC1jb250YWluZXJcIik7XHJcbiAgICBjb25zdCBwbGF5ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgcGxheWVyLmlubmVySFRNTCA9IGA8aDI+JHsgZ2FtZXJ0YWcgfTwvaDI+YDtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwbGF5ZXIpO1xyXG4gICAgXHJcbiAgICBjb25zdCBsaXN0T2ZWaWRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xyXG4gICAgbGlzdE9mVmlkcy5jbGFzc0xpc3QuYWRkKFwibGlzdC1vZi12aWRzXCIpO1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGNsaXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XHJcbiAgICAgICAgdWwuaW5uZXJIVE1MID0gYDxoMz4keyBjbGlwc1tpXS52YWx1ZS5ldmVudC5raWxsZXIubmFtZSB9PC9oMz48c3Bhbj5raWxsaW5nICR7IGNsaXBzW2ldLnZhbHVlLmV2ZW50LnZpY3RpbS5uYW1lIH08L3NwYW4+YDtcclxuICAgICAgICB1bC5jbGFzc0xpc3QuYWRkKGAkeyBjbGlwc1tpXS52YWx1ZS5ldmVudC5raWxsZXIubmFtZSA9PT0gZ2FtZXJ0YWcgPyBcImdcIiA6IFwiclwiIH1gLCBcInZpZGVvQm94XCIpO1xyXG4gICAgICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XHJcbiAgICAgICAgbW9kYWwuY2xhc3NMaXN0LmFkZChcIm1vZGFsXCIpO1xyXG4gICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgZGl2LnNldEF0dHJpYnV0ZShcImlkXCIsIGAkeyBpIH1gKTtcclxuICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZChcInZmcmFtZTJcIik7XHJcbiAgICAgICAgbW9kYWwuYXBwZW5kQ2hpbGQoZGl2KTtcclxuXHJcbiAgICAgICAgdWwuYXBwZW5kQ2hpbGQobW9kYWwpO1xyXG4gICAgICAgIGxpc3RPZlZpZHMuYXBwZW5kQ2hpbGQodWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgYnRuLmlubmVySFRNTCA9ICcmIzEwMDA2Oyc7XHJcbiAgICBidG4uY2xhc3NMaXN0LmFkZChcImNsb3NlXCIpO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGxpc3RPZlZpZHMpXHJcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcclxuICAgIHBhcmVudC5hcHBlbmRDaGlsZChidG4pO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwYXJlbnQpO1xyXG5cclxuICAgIFxyXG4gICAgbGV0IG5hbWVzID0gW107XHJcbiAgICBmb3IobGV0IGogPSAwOyBqIDwgY2xpcHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICBuYW1lcy5wdXNoKFwicGxheWVyXCIgKyBqKVxyXG4gICAgfVxyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGNsaXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHdpZHRoOiA5NzAsXHJcbiAgICAgICAgICAgIGhlaWdodDogNTQwLFxyXG4gICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXHJcbiAgICAgICAgICAgIHRpbWU6IGAkeyBjbGlwc1tpXS52YWx1ZS50aW1lc3RhbXBJblNlY29uZHMgfWAsXHJcbiAgICAgICAgICAgIHZpZGVvOiBgJHsgY2xpcHNbaV0udmFsdWUudm9kLl9pZCB9YFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbmFtZXNbaV0gPSBuZXcgVHdpdGNoLlBsYXllcihgJHsgaSB9YCwgb3B0aW9ucyk7XHJcbiAgICAgICAgbmFtZXNbaV0uc2V0Vm9sdW1lKDAuNSk7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jbG9zZVwiKS5mb3JFYWNoKGIgPT4ge1xyXG4gICAgICAgICAgICBiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmFtZXNbaV0ucGF1c2UoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudmlkZW9Cb3gnKS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIGNvbnN0IGZybSA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLm1vZGFsJyk7XHJcbiAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsb3NlJyk7XHJcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG4gICAgICAgICAgICBmcm0uc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgICAgICAgICBidG4uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2xvc2UnKS5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgIHguYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1vZGFsJykuZm9yRWFjaChmcm0gPT4ge1xyXG4gICAgICAgICAgICAgICAgZnJtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgIHguc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICAgIGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy8nO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEtleSBmcm9tICcuLi9jb25maWcva2V5cyc7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0UGxheWVyQnlOYW1lID0gZ2FtZXJ0YWcgPT4ge1xyXG4gICAgY29uc3QgcGxheWVyQnlOYW1lSW5pdCA9IHtcclxuICAgICAgICBtZXRob2Q6ICdnZXQnXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIGxldCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoYGh0dHBzOi8vYXBpLnB1YmcuY29tL3NoYXJkcy94Ym94L3BsYXllcnM/ZmlsdGVyW3BsYXllck5hbWVzXT0keyBnYW1lcnRhZyB9YCwgcGxheWVyQnlOYW1lSW5pdCk7XHJcbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGAvcHViZy9nYW1lcnRhZy8keyBnYW1lcnRhZyB9YCwgcGxheWVyQnlOYW1lSW5pdClcclxuICAgIHJldHVybiBmZXRjaChyZXF1ZXN0KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxyXG4gICAgfSlcclxufVxyXG4vLyB3aW5kb3cuZ2V0UGxheWVyQnlOYW1lID0gZ2V0UGxheWVyQnlOYW1lO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldE1hdGNoID0gKG1hdGNoSWQpID0+IHtcclxuICAgIGNvbnN0IGdhbWVJbml0ID0ge1xyXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICB9XHJcblxyXG4gICAgLy8gbGV0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdChgaHR0cHM6Ly9hcGkucHViZy5jb20vc2hhcmRzL3hib3gvbWF0Y2hlcy8keyBtYXRjaElkIH1gLCBnYW1lSW5pdCk7XHJcbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGAvcHViZy9tYXRjaGVzLyR7IG1hdGNoSWQgfWAsIGdhbWVJbml0KVxyXG4gICAgcmV0dXJuIGZldGNoKHJlcXVlc3QpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXHJcbiAgICB9KVxyXG59XHJcbi8vIHdpbmRvdy5nZXRNYXRjaCA9IGdldE1hdGNoO1xyXG4vL1xyXG5leHBvcnQgY29uc3QgZ2V0VGVsZW1ldHJ5ID0gKHVybCkgPT4ge1xyXG4gICAgY29uc3QgdGVsZW1ldHJ5SW5pdCA9IHtcclxuICAgICAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoYC9wdWJnL3RlbGVtZXRyeS8/dXJsPSR7IHVybCB9YCwgdGVsZW1ldHJ5SW5pdCk7XHJcbiAgICByZXR1cm4gZmV0Y2gocmVxdWVzdCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKClcclxuICAgIH0pXHJcbn1cclxud2luZG93LmdldFRlbGVtZXRyeSA9IGdldFRlbGVtZXRyeTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRPQXV0aCA9ICgpID0+IHtcclxuICAgIGNvbnN0IG9hdXRoSW5pdCA9IHtcclxuICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAvLyBzY29wZTogJ3VzZXI6cmVhZDplbWFpbCdcclxuXHJcbiAgICB9XHJcbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGAvb2F1dGhgLCBvYXV0aEluaXQpO1xyXG4gICAgcmV0dXJuIGZldGNoKHJlcXVlc3QpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0VHdpdGNoVXNlciA9IGdhbWVydGFnID0+IHtcclxuICAgIGNvbnN0IHR3aXRjaFVzZXJJbml0ID0ge1xyXG4gICAgICAgIG1ldGhvZDogJ2dldCdcclxuICAgIH1cclxuICAgIGxldCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoYC90d2l0Y2gvJHsgZ2FtZXJ0YWcgfWAsIHR3aXRjaFVzZXJJbml0KTtcclxuICAgIHJldHVybiBmZXRjaChyZXF1ZXN0KS50aGVuKHIgPT4ge1xyXG4gICAgICAgIHJldHVybiByLmpzb24oKS50aGVuKGpzb24gPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGpzb25cclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG4vLyB3aW5kb3cuZ2V0VHdpdGNoVXNlciA9IGdldFR3aXRjaFVzZXI7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0VmlkZW9zID0gdXNlcklkID0+IHtcclxuICAgIGNvbnN0IHR3aXRjaFZpZGVvc0luaXQgPSB7XHJcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgIH1cclxuICAgIGxldCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoYC90d2l0Y2h2aWRlb3MvJHsgdXNlcklkIH1gLCB0d2l0Y2hWaWRlb3NJbml0KTtcclxuICAgIHJldHVybiBmZXRjaChyZXF1ZXN0KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxyXG4gICAgfSlcclxufVxyXG4vLyB3aW5kb3cuZ2V0VmlkZW9zID0gZ2V0VmlkZW9zO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFB1YmdWaWRlb3MgPSB2aWRlb0lkID0+IHtcclxuICAgIGNvbnN0IHR3aXRjaFB1YmdJbml0ID0ge1xyXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICB9XHJcbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGAvcHViZ3ZpZGVvcy8keyB2aWRlb0lkIH1gLCB0d2l0Y2hQdWJnSW5pdCk7XHJcbiAgICByZXR1cm4gZmV0Y2gocmVxdWVzdCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKClcclxuICAgIH0pXHJcbn1cclxuXHJcbi8vIHdpbmRvdy5nZXRQdWJnVmlkZW9zID0gZ2V0UHViZ1ZpZGVvcztcclxuXHJcblxyXG5leHBvcnQgY29uc3QgdGltZUdyZWF0ZXJUaGFuID0gKHQxLCB0MikgPT4ge1xyXG4gICAgLy8gZGVidWdnZXJcclxuICAgIGxldCB0MyA9IG5ldyBEYXRlKHQxKTtcclxuICAgIGxldCB0NCA9IG5ldyBEYXRlKHQyKTtcclxuXHJcbiAgICBpZih0MyA+PSB0NCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdGltZUdyZWF0ZXJUaGFuMiA9ICh0MSwgdDIsIHNlY29uZHMpID0+IHtcclxuICAgIC8vIGRlYnVnZ2VyXHJcbiAgICBsZXQgdDMgPSBuZXcgRGF0ZSh0MSk7XHJcbiAgICBsZXQgdDQgPSBuZXcgRGF0ZSh0Mik7XHJcbiAgICB0NC5zZXRIb3Vycyh0NC5nZXRIb3VycygpLCB0NC5nZXRNaW51dGVzKCksIHQ0LmdldFNlY29uZHMoKSArIHNlY29uZHMpO1xyXG4gICAgaWYgKHQzIDw9IHQ0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbiAgICAvLyBsZXQgaG91cnMgPSB0NC5nZXRIb3VycygpO1xyXG4gICAgLy8gbGV0IG1pbnV0ZXMgPSB0NC5nZXRNaW51dGVzKCk7XHJcbiAgICAvLyBsZXQgc2VjcyA9IHQ0LmdldFNlY29uZHMoKTtcclxuICAgIC8vIGlmKHNlY29uZHMgKyBzZWMgPCA2MCkge1xyXG4gICAgLy8gICAgIHQ0LnNldEhvdXJzKGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzICsgc2VjcylcclxuICAgIC8vIH0gZWxzZSBpZihzZWNvbmRzICsgc2VjID09PSA2MCkge1xyXG4gICAgLy8gICAgIHQ0LnNldEhvdXJzKGhvdXJzLCBtaW51dGVzICsgMSwgMClcclxuICAgIC8vIH0gZWxzZSBpZihzZWNvbmRzICsgc2VjID4gNjApIHtcclxuICAgIC8vICAgICBsZXQgbmV3U2VjcyA9IChzZWNvbmRzICsgc2VjKSAlIDYwO1xyXG4gICAgLy8gICAgIGxldCBuZXdNaW51dGVzID0gKChzZWNvbmRzICsgc2VjKSAtIG5ld1NlY3MpIC8gNjA7XHJcbiAgICAvLyAgICAgbGV0IG1pbjtcclxuICAgIC8vICAgICBsZXQgaG91cnM7XHJcbiAgICAvLyAgICAgaWYobmV3TWludXRlcyA+IDYwKSB7XHJcbiAgICAvLyAgICAgICAgIG1pbiA9IG5ld01pbnV0ZXMgJSA2MDtcclxuICAgIC8vICAgICAgICAgaG91cnMgPSAobmV3TWludXRlcyAtIG1pbikgLyA2MDtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB0aW1lc3RhbXAgPSAodDEsIHQyLCBzZWNvbmRzKSA9PiB7XHJcbiAgICAvLyBkZWJ1Z2dlclxyXG4gICAgbGV0IHQzID0gbmV3IERhdGUodDEpO1xyXG4gICAgbGV0IHQ0ID0gbmV3IERhdGUodDIpO1xyXG4gICAgdDQuc2V0SG91cnModDQuZ2V0SG91cnMoKSwgdDQuZ2V0TWludXRlcygpLCB0NC5nZXRTZWNvbmRzKCkgKyBzZWNvbmRzKTtcclxuICAgIGxldCBzZWNzID0gKCh0NCAtIHQzKSAvIDEwMDApO1xyXG4gICAgLy8gbGV0IG5UID0gdDQuc2V0SG91cnModDQuZ2V0SG91cnMoKSwgdDQuZ2V0TWludXRlcygpLCB0NC5nZXRTZWNvbmRzKCkgLSBzZWNzKTtcclxuICAgIC8vIGxldCBldmVudFRpbWVzdGFtcCA9IG5UIC0gKG5ldyBEYXRlKHQyKSk7XHJcbiAgICBsZXQgdCA9IG5ldyBEYXRlKG51bGwpO1xyXG4gICAgdC5zZXRTZWNvbmRzKChzZWNvbmRzIC0gc2VjcykgLSAxMCk7XHJcbiAgICBsZXQgYSA9IHQudG9JU09TdHJpbmcoKS5zdWJzdHIoMTEsIDgpLnNwbGl0KFwiOlwiKTtcclxuICAgIHJldHVybiBhWzBdICsgXCJoXCIgKyBhWzFdICsgXCJtXCIgKyBhWzJdICsgXCJzXCJcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHRpbWVzdGFtcDIgPSAodDEsIHQyLCBzZWNvbmRzKSA9PiB7XHJcbiAgICBsZXQgdDMgPSBuZXcgRGF0ZSh0MSk7XHJcbiAgICBsZXQgdDQgPSBuZXcgRGF0ZSh0Mik7XHJcbiAgICB0NC5zZXRIb3Vycyh0NC5nZXRIb3VycygpLCB0NC5nZXRNaW51dGVzKCksIHQ0LmdldFNlY29uZHMoKSArIHNlY29uZHMpO1xyXG4gICAgbGV0IHNlY3MgPSAoKHQ0IC0gdDMpIC8gMTAwMCk7XHJcbiAgICBsZXQgblQgPSB0NC5zZXRIb3Vycyh0NC5nZXRIb3VycygpLCB0NC5nZXRNaW51dGVzKCksIHQ0LmdldFNlY29uZHMoKSAtIHNlY3MpO1xyXG4gICAgcmV0dXJuICgoblQgLSAobmV3IERhdGUodDIpKSkgLyAxMDAwKSAtIDEwO1xyXG59IiwiaW1wb3J0IGRhdGVDb252ZXJ0ZXIgZnJvbSAnLi9kYXRlX2NvbnZlcnRlcic7XHJcbmltcG9ydCB7IHRpbWVHcmVhdGVyVGhhbiwgdGltZUdyZWF0ZXJUaGFuMiwgdGltZXN0YW1wLCB0aW1lc3RhbXAyIH0gZnJvbSAnLi9zZWFyY2hfdXRpbGl0aWVzJztcclxuXHJcbmV4cG9ydCBjb25zdCBkaXNwbGF5U3RyZWFtcyA9IChldmVudHMsIHZpZGVvcywgZ3RhZykgPT4ge1xyXG4gICAgY29uc3Qgc3BsYXNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNwbGFzaC1jb250ZW50XCIpWzBdO1xyXG4gICAgc3BsYXNoLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIGNvbnN0IGxvZ28gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibG9nb1wiKVswXTtcclxuICAgIGxvZ28uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgY29uc3QgZnAgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibG9hZFwiKVswXTtcclxuICAgIGZwLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIFxyXG4gICAgbGV0IGNsaXBzID0gW107XHJcbiAgICBsZXQgdmlkZW9IYXNFdmVudHMgPSB7fTtcclxuXHJcbiAgICAvLyBkZWJ1Z2dlclxyXG4gICAgZm9yKGxldCBqID0gMDsgaiA8IHZpZGVvcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYodGltZUdyZWF0ZXJUaGFuKGV2ZW50c1tpXS5fRCwgdmlkZW9zW2pdLmNyZWF0ZWRfYXQpICYmIHRpbWVHcmVhdGVyVGhhbjIoZXZlbnRzW2ldLl9ELCB2aWRlb3Nbal0uY3JlYXRlZF9hdCwgdmlkZW9zW2pdLmxlbmd0aCkpIHtcclxuICAgICAgICAgICAgICAgIHZpZGVvSGFzRXZlbnRzW3ZpZGVvc1tqXS5faWRdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNsaXBzLnB1c2goe1widmlkZW9faWRcIjogdmlkZW9zW2pdLl9pZCwgXCJ1cmxcIjogdmlkZW9zW2pdLnVybCwgXCJzZWVrXCI6IHRpbWVzdGFtcDIoZXZlbnRzW2ldLl9ELCB2aWRlb3Nbal0uY3JlYXRlZF9hdCwgdmlkZW9zW2pdLmxlbmd0aCksIFwidGltZXN0YW1wSW5TZWNvbmRzXCI6IHRpbWVzdGFtcChldmVudHNbaV0uX0QsIHZpZGVvc1tqXS5jcmVhdGVkX2F0LCB2aWRlb3Nbal0ubGVuZ3RoKSwgXCJldmVudFwiOiBldmVudHNbaV0sIFwidm9kXCI6IHZpZGVvc1tqXX0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGFyZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIilcclxuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgYnV0dG9uLmlubmVySFRNTCA9ICcmbGFycjsnO1xyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJiYWNrXCIpO1xyXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcclxuICAgIHBhcmVudC5jbGFzc0xpc3QuYWRkKFwicGFyZW50LWNvbnRhaW5lclwiKTtcclxuICAgIGNvbnN0IHBseXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgcGx5ci5pbm5lckhUTUwgPSBgPGgyPiR7IGd0YWcgfTwvaDI+YDtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwbHlyKTtcclxuICAgIFxyXG4gICAgY29uc3QgbGlzdE9mVmlkcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcclxuICAgIGxpc3RPZlZpZHMuY2xhc3NMaXN0LmFkZChcImxpc3Qtb2Ytdmlkc1wiKTtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB2aWRlb3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZih2aWRlb0hhc0V2ZW50c1t2aWRlb3NbaV0uX2lkXSkge1xyXG4gICAgICAgICAgICBjb25zdCB1bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcclxuICAgICAgICAgICAgdWwuaW5uZXJIVE1MID0gYDxoMz4keyB2aWRlb3NbaV0udGl0bGUgfTwvaDM+PHNwYW4+JHsgZGF0ZUNvbnZlcnRlcih2aWRlb3NbaV0uY3JlYXRlZF9hdCkgfTwvc3Bhbj5gO1xyXG4gICAgICAgICAgICB1bC5jbGFzc0xpc3QuYWRkKFwic3RyZWFtc0JveFwiKTtcclxuICAgICAgICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcclxuICAgICAgICAgICAgbW9kYWwuY2xhc3NMaXN0LmFkZChcIm1vZGFsMlwiKTtcclxuICAgICAgICAgICAgY29uc3QgbW9kYWxfY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIG1vZGFsX2NvbnRlbnQuY2xhc3NMaXN0LmFkZChcIm1vZGFsLWNvbnRlbnRcIik7XHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgY2xpcHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKGNsaXBzW2pdLnZpZGVvX2lkID09PSB2aWRlb3NbaV0uX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVidWdnZXJcclxuICAgICAgICAgICAgICAgICAgICBsaS5pbm5lckhUTUwgPSBgS2lsbGVyOiR7IGNsaXBzW2pdLmV2ZW50LmtpbGxlciA/IChjbGlwc1tqXS5ldmVudC5raWxsZXIubmFtZSkgOiBcIkVudmlyb25tZW50XCIgfSBWaWN0aW06JHsgY2xpcHNbal0uZXZlbnQudmljdGltLm5hbWUgfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmFkZChgJHsgY2xpcHNbal0uZXZlbnQua2lsbGVyID8gKGNsaXBzW2pdLmV2ZW50LmtpbGxlci5uYW1lID09PSBndGFnID8gXCJnclwiIDogXCJyZVwiKSA6IFwicmVcIiB9YCwgXCJub3N0eWxpc3RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7IGNsaXBzW2pdLnNlZWsgfWApXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kYWxfY29udGVudC5hcHBlbmRDaGlsZChsaSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbW9kYWwuYXBwZW5kQ2hpbGQobW9kYWxfY29udGVudCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7IGkgfWApO1xyXG4gICAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZChcInZmcmFtZVwiKTtcclxuICAgICAgICAgICAgbW9kYWwuYXBwZW5kQ2hpbGQoZGl2KTtcclxuXHJcbiAgICAgICAgICAgIHVsLmFwcGVuZENoaWxkKG1vZGFsKTtcclxuICAgICAgICAgICAgbGlzdE9mVmlkcy5hcHBlbmRDaGlsZCh1bCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgIGJ0bi5pbm5lckhUTUwgPSAnJiMxMDAwNjsnO1xyXG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJjbG9zZTJcIik7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobGlzdE9mVmlkcylcclxuICAgIHBhcmVudC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xyXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGJ0bik7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBhcmVudCk7XHJcblxyXG4gICAgbGV0IG5hbWVzID0gW107XHJcbiAgICBmb3IobGV0IGogPSAwOyBqIDwgdmlkZW9zLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgbmFtZXMucHVzaChcInBsYXllclwiICsgailcclxuICAgIH1cclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB2aWRlb3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZih2aWRlb0hhc0V2ZW50c1t2aWRlb3NbaV0uX2lkXSkge1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA5NzAsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDU0MCxcclxuICAgICAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHZpZGVvOiBgJHsgdmlkZW9zW2ldLl9pZCB9YFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBuYW1lc1tpXSA9IG5ldyBUd2l0Y2guUGxheWVyKGAkeyBpIH1gLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgbmFtZXNbaV0uc2V0Vm9sdW1lKDAuNSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ub3N0eWxpc3QnKS5mb3JFYWNoKGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWVzW2ldLnNlZWsoTnVtYmVyKGV2ZW50LmlkKSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNsb3NlMlwiKS5mb3JFYWNoKGIgPT4ge1xyXG4gICAgICAgICAgICAgICAgYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lc1tpXS5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN0cmVhbXNCb3gnKS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIGNvbnN0IGZybSA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLm1vZGFsMicpO1xyXG4gICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZTInKTtcclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcbiAgICAgICAgICAgIGZybS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgICAgICAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jbG9zZTInKS5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgIHguYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1vZGFsMicpLmZvckVhY2goZnJtID0+IHtcclxuICAgICAgICAgICAgICAgIGZybS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICB4LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICBidXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvJztcclxuICAgIH1cclxufSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJzb3VyY2VSb290IjoiIn0=