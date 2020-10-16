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
  var streams = [];
  var gamertag = document.getElementsByClassName("gamertag-field")[0].value;
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
                  var matches, games, telemetry, twitchUser, videos;
                  return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          _context5.next = 2;
                          return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getPlayerByName"])(gtag);

                        case 2:
                          matches = _context5.sent;
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
                          _context5.next = 6;
                          return Promise.allSettled(actual);

                        case 6:
                          games = _context5.sent;
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
                          _context5.next = 10;
                          return Promise.allSettled(events);

                        case 10:
                          telemetry = _context5.sent;
                          // console.log(telemetry)
                          telemetry.forEach(function (event) {
                            event.value.forEach(function (log) {
                              if (log._T === "LogPlayerKill" && log.killer && log.killer.name === gtag || log._T === "LogPlayerKill" && log.victim && log.victim.name === gtag) {
                                kAV.push(log);
                              }
                            });
                          }); // console.log(kAV);

                          _context5.next = 14;
                          return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getTwitchUser"])(uname).then(function (response) {
                            if (response.ok) {
                              return response.json().then(function (json) {
                                return json;
                              });
                            } else {
                              return false;
                            }
                          });

                        case 14:
                          twitchUser = _context5.sent;

                          if (!twitchUser) {
                            _context5.next = 23;
                            break;
                          }

                          if (!(twitchUser.data.length > 0)) {
                            _context5.next = 23;
                            break;
                          }

                          _context5.next = 19;
                          return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getVideos"])(twitchUser.data[0].id);

                        case 19:
                          videos = _context5.sent;

                          if (!(videos.data.length > 0)) {
                            _context5.next = 23;
                            break;
                          }

                          videos.data.map( /*#__PURE__*/function () {
                            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(vid) {
                              var clip;
                              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                while (1) {
                                  switch (_context4.prev = _context4.next) {
                                    case 0:
                                      _context4.next = 2;
                                      return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getPubgVideos"])(vid.id).then(function (response) {
                                        if (response.ok) {
                                          return response.json();
                                        } else {
                                          return false;
                                        }
                                      });

                                    case 2:
                                      clip = _context4.sent;

                                      if (clip) {
                                        // debugger
                                        if (clip.game === "PLAYERUNKNOWN'S BATTLEGROUNDS") {
                                          streams.push(clip);
                                        }
                                      }

                                    case 4:
                                    case "end":
                                      return _context4.stop();
                                  }
                                }
                              }, _callee4);
                            }));

                            return function (_x6) {
                              return _ref4.apply(this, arguments);
                            };
                          }());
                          return _context5.abrupt("return", streams);

                        case 23:
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
      var splash, logo, fetchingPlayer, matches, fetchingMatches, games, fetchingEvents, telemetry, fetchingKillsAndDeaths, fetchingVideos, _iterator, _step, _loop, final;

      return regeneratorRuntime.wrap(function _callee12$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              splash = document.getElementsByClassName("splash-content")[0];
              logo = document.getElementsByClassName("logo")[0];
              fetchingPlayer = document.createElement("span");
              fetchingPlayer.classList.add("loading1", "loading");
              fetchingPlayer.innerHTML = 'Fetching Player ...';
              splash.appendChild(fetchingPlayer);
              _context13.next = 8;
              return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getPlayerByName"])(gamertag);

            case 8:
              matches = _context13.sent;
              // console.log(matches);
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

                return function (_x7) {
                  return _ref5.apply(this, arguments);
                };
              }());
              fetchingPlayer.style.display = "none";
              fetchingMatches = document.createElement("span");
              fetchingMatches.classList.add("loading2", "loading");
              fetchingMatches.innerHTML = 'Fetching Matches ...';
              splash.appendChild(fetchingMatches);
              _context13.next = 17;
              return Promise.allSettled(actualMatches);

            case 17:
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

                                return function (_x9) {
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

                return function (_x8) {
                  return _ref6.apply(this, arguments);
                };
              }());
              _context13.next = 26;
              return Promise.allSettled(events);

            case 26:
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
              _iterator = _createForOfIteratorHelper(telemetryEvents);
              _context13.prev = 39;
              _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop() {
                var tEvent, eventTimestamp, twitchUser, videos, _twitchUser, _videos;

                return regeneratorRuntime.wrap(function _loop$(_context12) {
                  while (1) {
                    switch (_context12.prev = _context12.next) {
                      case 0:
                        tEvent = _step.value;
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

                            return function (_x10) {
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

                            return function (_x11) {
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

              _iterator.s();

            case 42:
              if ((_step = _iterator.n()).done) {
                _context13.next = 46;
                break;
              }

              return _context13.delegateYield(_loop(), "t0", 44);

            case 44:
              _context13.next = 42;
              break;

            case 46:
              _context13.next = 51;
              break;

            case 48:
              _context13.prev = 48;
              _context13.t1 = _context13["catch"](39);

              _iterator.e(_context13.t1);

            case 51:
              _context13.prev = 51;

              _iterator.f();

              return _context13.finish(51);

            case 54:
              _context13.next = 56;
              return Promise.allSettled(clips);

            case 56:
              final = _context13.sent;
              console.log(final);

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
              return _context13.stop();
          }
        }
      }, _callee12, null, [[39, 48, 51, 54]]);
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
    splash.style.display = "flex";
    logo.style.display = "flex";
    parent.style.display = "none";
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
    var ifrm = document.createElement("iframe");
    ifrm.setAttribute("src", "https://player.twitch.tv/?video=".concat(clips[i].value.vod._id, "&autoplay=false&parent=localhost&time=").concat(clips[i].value.timestampInSeconds));
    ifrm.setAttribute("height", "540");
    ifrm.setAttribute("width", "970");
    ifrm.setAttribute("frameborder", "0");
    ifrm.setAttribute("scrolling", "no");
    ifrm.setAttribute("allowfullscreen", "true");
    ifrm.classList.add("frame");
    modal.appendChild(ifrm);
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
    splash.style.display = "flex";
    logo.style.display = "flex";
    parent.style.display = "none";
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
window.getPlayerByName = getPlayerByName;
var getMatch = function getMatch(matchId) {
  var gameInit = {
    method: 'get'
  }; // let request = new Request(`https://api.pubg.com/shards/xbox/matches/${ matchId }`, gameInit);

  var request = new Request("/pubg/gamertag/".concat(matchId), gameInit);
  return fetch(request).then(function (response) {
    return response.json();
  });
};
window.getMatch = getMatch; //

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
};
window.getTelemetry = getTelemetry;
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
};
window.getTwitchUser = getTwitchUser;
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
};
window.getVideos = getVideos;
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
  var clips = [];
  var videoHasEvents = {};
  debugger;

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
      div.classList.add(".vframe");
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
    splash.style.display = "flex";
    logo.style.display = "flex";
    parent.style.display = "none";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2RhdGVfY29udmVydGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL25vX3ZpZGVvc19mb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9zZWFyY2hfdXRpbGl0aWVzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3N0cmVhbXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJwdWJnQVBJIiwidHdpdGNoQVBJIiwiY2xpZW50U0VDUkVUIiwib0FVVEgiLCJnYW1lSUQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJCTEFDS0xJU1RFRCIsImtBViIsImFjdHVhbCIsInN0cmVhbXMiLCJnYW1lcnRhZyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJ2YWx1ZSIsImNvbnRhaW5lciIsInF1ZXJ5U2VsZWN0b3IiLCJnZXRQbGF5ZXIiLCJpbnB1dCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJzdHlsZSIsImRpc3BsYXkiLCJ1biIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwiZ3QiLCJzdWJtaXQiLCJpbm5lckhUTUwiLCJnZXRFbGVtZW50QnlJZCIsImUiLCJnZXRJbnB1dCIsImdldFN0cmVhbXMiLCJ1bmFtZSIsImd0YWciLCJnZXRQbGF5ZXJCeU5hbWUiLCJtYXRjaGVzIiwibWFwIiwibWF0Y2giLCJnZXRNYXRjaCIsImlkIiwiUHJvbWlzZSIsImFsbFNldHRsZWQiLCJnYW1lcyIsImZvckVhY2giLCJpbmNsdWRlZCIsImVsZSIsImRhdGEiLCJyZWxhdGlvbnNoaXBzIiwiYXNzZXRzIiwiZXZlbnRzIiwicHVzaCIsImdldFRlbGVtZXRyeSIsImF0dHJpYnV0ZXMiLCJVUkwiLCJ0ZWxlbWV0cnkiLCJldmVudCIsImxvZyIsIl9UIiwia2lsbGVyIiwibmFtZSIsInZpY3RpbSIsImdldFR3aXRjaFVzZXIiLCJ0aGVuIiwicmVzcG9uc2UiLCJvayIsImpzb24iLCJ0d2l0Y2hVc2VyIiwibGVuZ3RoIiwiZ2V0VmlkZW9zIiwidmlkZW9zIiwidmlkIiwiZ2V0UHViZ1ZpZGVvcyIsImNsaXAiLCJnYW1lIiwiZnAiLCJhbGxWaWRzIiwiZGlzcGxheVN0cmVhbXMiLCJhY3R1YWxNYXRjaGVzIiwidGVsZW1ldHJ5RXZlbnRzIiwiY2xpcHMiLCJzcGxhc2giLCJsb2dvIiwiZmV0Y2hpbmdQbGF5ZXIiLCJmZXRjaGluZ01hdGNoZXMiLCJmZXRjaGluZ0V2ZW50cyIsImZldGNoaW5nS2lsbHNBbmREZWF0aHMiLCJmZXRjaGluZ1ZpZGVvcyIsInRFdmVudCIsImV2ZW50VGltZXN0YW1wIiwiX0QiLCJ0aW1lR3JlYXRlclRoYW4iLCJjcmVhdGVkX2F0IiwidGltZUdyZWF0ZXJUaGFuMiIsInVybCIsInRpbWVzdGFtcCIsImZpbmFsIiwiY29uc29sZSIsIm5vVmlkZW9zRm91bmQiLCJ2aWRlb3NGb3VuZCIsImRhdGVDb252ZXJ0ZXIiLCJ1Z2x5RGF0ZSIsImZha2VIYWxmIiwic3BsaXQiLCJyZWFsSGFsZiIsInJlYWxEYXRlIiwiTU9OVEhTIiwicGFyZW50IiwiYnV0dG9uIiwicGxheWVyIiwibWVzc2FnZSIsImJvZHkiLCJvbmNsaWNrIiwibGlzdE9mVmlkcyIsImkiLCJ1bCIsIm1vZGFsIiwiaWZybSIsInZvZCIsIl9pZCIsInRpbWVzdGFtcEluU2Vjb25kcyIsImJ0biIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpdGVtIiwiZnJtIiwieCIsInBsYXllckJ5TmFtZUluaXQiLCJtZXRob2QiLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsIktleSIsIkFjY2VwdCIsInJlcXVlc3QiLCJSZXF1ZXN0IiwiZmV0Y2giLCJ3aW5kb3ciLCJtYXRjaElkIiwiZ2FtZUluaXQiLCJ0ZWxlbWV0cnlJbml0IiwiZ2V0T0F1dGgiLCJvYXV0aEluaXQiLCJ0d2l0Y2hVc2VySW5pdCIsInVzZXJJZCIsInR3aXRjaFZpZGVvc0luaXQiLCJ2aWRlb0lkIiwidHdpdGNoUHViZ0luaXQiLCJ0MSIsInQyIiwidDMiLCJEYXRlIiwidDQiLCJzZWNvbmRzIiwic2V0SG91cnMiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJnZXRTZWNvbmRzIiwic2VjcyIsInQiLCJzZXRTZWNvbmRzIiwiYSIsInRvSVNPU3RyaW5nIiwic3Vic3RyIiwidGltZXN0YW1wMiIsIm5UIiwidmlkZW9IYXNFdmVudHMiLCJqIiwicGx5ciIsInRpdGxlIiwibW9kYWxfY29udGVudCIsInZpZGVvX2lkIiwibGkiLCJzZWVrIiwiZGl2IiwibmFtZXMiLCJvcHRpb25zIiwid2lkdGgiLCJoZWlnaHQiLCJhdXRvcGxheSIsInZpZGVvIiwiVHdpdGNoIiwiUGxheWVyIiwic2V0Vm9sdW1lIiwiTnVtYmVyIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCOztBQUVoQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0Qzs7QUFFQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLDBDQUEwQztBQUMxQzs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZHQUE2RztBQUM3Rzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QyxXQUFXO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7OztBQUdBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdDQUF3QztBQUN4QywyQkFBMkI7QUFDM0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULG9DQUFvQztBQUNwQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILG9DQUFvQyxjQUFjO0FBQ2xEO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7O0FBRWhELHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7OztBQUdBO0FBQ0E7QUFDQSxHQUFHLGdDQUFnQyxrQkFBa0I7QUFDckQ7OztBQUdBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CO0FBQ25COztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDhDQUE4QyxRQUFRO0FBQ3REO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQSw4Q0FBOEMsUUFBUTtBQUN0RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSw4Q0FBOEMsUUFBUTtBQUN0RDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7OztBQUdBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLEtB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VUFBQXdCLENBQUMsRUFBSTtBQUM3QnpCLGNBQVEsQ0FBQ3FILGdCQUFULENBQTBCLFNBQTFCLEVBQXFDOUUsT0FBckMsQ0FBNkMsVUFBQWdGLEdBQUcsRUFBSTtBQUNoREEsV0FBRyxDQUFDdkcsS0FBSixDQUFVQyxPQUFWLEdBQW9CLE1BQXBCO0FBQ0F1RyxTQUFDLENBQUN4RyxLQUFGLENBQVFDLE9BQVIsR0FBa0IsTUFBbEI7QUFDSCxPQUhEO0FBSUgsS0FMRDtBQU1ILEdBUEQ7O0FBU0FzRixRQUFNLENBQUNJLE9BQVAsR0FBaUIsWUFBVztBQUN4Qi9CLFVBQU0sQ0FBQzVELEtBQVAsQ0FBYUMsT0FBYixHQUF1QixNQUF2QjtBQUNBNEQsUUFBSSxDQUFDN0QsS0FBTCxDQUFXQyxPQUFYLEdBQXFCLE1BQXJCO0FBQ0FxRixVQUFNLENBQUN0RixLQUFQLENBQWFDLE9BQWIsR0FBdUIsTUFBdkI7QUFDSCxHQUpEO0FBS0gsQ0F0SE0sQzs7Ozs7Ozs7Ozs7O0FDSFA7QUFBQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG52YXIgcnVudGltZSA9IGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqW2tleV07XG4gIH1cblxuICB0cnkge1xuICAgIC8vIElFIDggaGFzIGEgYnJva2VuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB0aGF0IG9ubHkgd29ya3Mgb24gRE9NIG9iamVjdHMuXG4gICAgZGVmaW5lKHt9LCBcIlwiKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZGVmaW5lID0gZnVuY3Rpb24gKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldID0gdmFsdWU7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pOyAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cblxuICBleHBvcnRzLndyYXAgPSB3cmFwOyAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwibm9ybWFsXCIsXG4gICAgICAgIGFyZzogZm4uY2FsbChvYmosIGFyZylcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcInRocm93XCIsXG4gICAgICAgIGFyZzogZXJyXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjsgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTsgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge30gLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuXG5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbiAgSXRlcmF0b3JQcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuXG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJiBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiYgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPSBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb247XG4gIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gZGVmaW5lKEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKTsgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cblxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZCkge1xuICAgICAgZGVmaW5lKHByb3RvdHlwZSwgbWV0aG9kLCBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbiAoZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHwgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCIgOiBmYWxzZTtcbiAgfTtcblxuICBleHBvcnRzLm1hcmsgPSBmdW5jdGlvbiAoZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBkZWZpbmUoZ2VuRnVuLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKTtcbiAgICB9XG5cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTsgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cblxuXG4gIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbiAoYXJnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIF9fYXdhaXQ6IGFyZ1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IsIFByb21pc2VJbXBsKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuXG4gICAgICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uICh1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2VJbXBsKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID0gLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLCAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcpIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9IC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG5cblxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuXG4gIEFzeW5jSXRlcmF0b3IucHJvdG90eXBlW2FzeW5jSXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7IC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbiAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QsIFByb21pc2VJbXBsKSB7XG4gICAgaWYgKFByb21pc2VJbXBsID09PSB2b2lkIDApIFByb21pc2VJbXBsID0gUHJvbWlzZTtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLCBQcm9taXNlSW1wbCk7XG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKSA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH0gLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuXG5cbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcblxuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmUgPyBHZW5TdGF0ZUNvbXBsZXRlZCA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDsgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9IC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cblxuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuXG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgLy8gTm90ZTogW1wicmV0dXJuXCJdIG11c3QgYmUgdXNlZCBmb3IgRVMzIHBhcnNpbmcgY29tcGF0aWJpbGl0eS5cbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTsgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jOyAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfSAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG5cblxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9IC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cblxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG4gIGRlZmluZShHcCwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yXCIpOyAvLyBBIEdlbmVyYXRvciBzaG91bGQgYWx3YXlzIHJldHVybiBpdHNlbGYgYXMgdGhlIGl0ZXJhdG9yIG9iamVjdCB3aGVuIHRoZVxuICAvLyBAQGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBpdC4gU29tZSBicm93c2VycycgaW1wbGVtZW50YXRpb25zIG9mIHRoZVxuICAvLyBpdGVyYXRvciBwcm90b3R5cGUgY2hhaW4gaW5jb3JyZWN0bHkgaW1wbGVtZW50IHRoaXMsIGNhdXNpbmcgdGhlIEdlbmVyYXRvclxuICAvLyBvYmplY3QgdG8gbm90IGJlIHJldHVybmVkIGZyb20gdGhpcyBjYWxsLiBUaGlzIGVuc3VyZXMgdGhhdCBkb2Vzbid0IGhhcHBlbi5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9pc3N1ZXMvMjc0IGZvciBtb3JlIGRldGFpbHMuXG5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEdwLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0ge1xuICAgICAgdHJ5TG9jOiBsb2NzWzBdXG4gICAgfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbe1xuICAgICAgdHJ5TG9jOiBcInJvb3RcIlxuICAgIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgZXhwb3J0cy5rZXlzID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG5cbiAgICBrZXlzLnJldmVyc2UoKTsgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG5cbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9IC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuXG5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuXG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLFxuICAgICAgICAgICAgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfSAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG5cblxuICAgIHJldHVybiB7XG4gICAgICBuZXh0OiBkb25lUmVzdWx0XG4gICAgfTtcbiAgfVxuXG4gIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgICBkb25lOiB0cnVlXG4gICAgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuICAgIHJlc2V0OiBmdW5jdGlvbiAoc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7IC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBzdG9wOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbiAoZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuXG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISFjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uICh0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiYgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmICh0eXBlID09PSBcImJyZWFrXCIgfHwgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJiBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJiBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcbiAgICBjb21wbGV0ZTogZnVuY3Rpb24gKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8IHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuICAgIGZpbmlzaDogZnVuY3Rpb24gKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuXG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24gKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9IC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuXG5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uIChpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9OyAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cblxuICByZXR1cm4gZXhwb3J0cztcbn0oIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4vLyBhcyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIG5hbWVzcGFjZS4gT3RoZXJ3aXNlIGNyZWF0ZSBhIG5ldyBlbXB0eVxuLy8gb2JqZWN0LiBFaXRoZXIgd2F5LCB0aGUgcmVzdWx0aW5nIG9iamVjdCB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbnR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgPyBtb2R1bGUuZXhwb3J0cyA6IHt9KTtcblxudHJ5IHtcbiAgcmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbn0gY2F0Y2ggKGFjY2lkZW50YWxTdHJpY3RNb2RlKSB7XG4gIC8vIFRoaXMgbW9kdWxlIHNob3VsZCBub3QgYmUgcnVubmluZyBpbiBzdHJpY3QgbW9kZSwgc28gdGhlIGFib3ZlXG4gIC8vIGFzc2lnbm1lbnQgc2hvdWxkIGFsd2F5cyB3b3JrIHVubGVzcyBzb21ldGhpbmcgaXMgbWlzY29uZmlndXJlZC4gSnVzdFxuICAvLyBpbiBjYXNlIHJ1bnRpbWUuanMgYWNjaWRlbnRhbGx5IHJ1bnMgaW4gc3RyaWN0IG1vZGUsIHdlIGNhbiBlc2NhcGVcbiAgLy8gc3RyaWN0IG1vZGUgdXNpbmcgYSBnbG9iYWwgRnVuY3Rpb24gY2FsbC4gVGhpcyBjb3VsZCBjb25jZWl2YWJseSBmYWlsXG4gIC8vIGlmIGEgQ29udGVudCBTZWN1cml0eSBQb2xpY3kgZm9yYmlkcyB1c2luZyBGdW5jdGlvbiwgYnV0IGluIHRoYXQgY2FzZVxuICAvLyB0aGUgcHJvcGVyIHNvbHV0aW9uIGlzIHRvIGZpeCB0aGUgYWNjaWRlbnRhbCBzdHJpY3QgbW9kZSBwcm9ibGVtLiBJZlxuICAvLyB5b3UndmUgbWlzY29uZmlndXJlZCB5b3VyIGJ1bmRsZXIgdG8gZm9yY2Ugc3RyaWN0IG1vZGUgYW5kIGFwcGxpZWQgYVxuICAvLyBDU1AgdG8gZm9yYmlkIEZ1bmN0aW9uLCBhbmQgeW91J3JlIG5vdCB3aWxsaW5nIHRvIGZpeCBlaXRoZXIgb2YgdGhvc2VcbiAgLy8gcHJvYmxlbXMsIHBsZWFzZSBkZXRhaWwgeW91ciB1bmlxdWUgcHJlZGljYW1lbnQgaW4gYSBHaXRIdWIgaXNzdWUuXG4gIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG59IiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBwdWJnQVBJOiAnZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnFkR2tpT2lJMU5tTTFZMk01TUMxbFltWm1MVEF4TXpndE1XUXhPQzAwWW1NeU5qVm1NekV5WWpFaUxDSnBjM01pT2lKbllXMWxiRzlqYTJWeUlpd2lhV0YwSWpveE5qQXlNakE0TURZd0xDSndkV0lpT2lKaWJIVmxhRzlzWlNJc0luUnBkR3hsSWpvaWNIVmlaeUlzSW1Gd2NDSTZJbU5zYVhCd1pXUWlmUS5ZR0JsaDNlSnFSUE9rZVNESnFUVUtHMnFBUV9xNmNleDhPQktVdXBMdFNJJyxcclxuICAgIHR3aXRjaEFQSTogJzZkZ2lhMXBtdm1ybHMzaTZsZXpncm1pYnYwMzBweicsXHJcbiAgICBjbGllbnRTRUNSRVQ6ICdiN2hnMnpnaDlsZ3M1djdpOTAxMGZrbGd3Y2lrc2snLFxyXG4gICAgb0FVVEg6ICduMHVzN215NTB4dWoyM2RnMnE4OXpqajZ4dnoyYXcnLFxyXG4gICAgZ2FtZUlEOiAnNDkzMDU3J1xyXG59IiwiaW1wb3J0ICcuLi9zcmMvc3R5bGVzL2luZGV4LnNjc3MnO1xyXG5pbXBvcnQgeyBnZXRNYXRjaCwgZ2V0UGxheWVyQnlOYW1lLCBnZXRUd2l0Y2hVc2VyLCBnZXRUZWxlbWV0cnksIGdldFZpZGVvcywgZ2V0UHViZ1ZpZGVvcywgdGltZUdyZWF0ZXJUaGFuLCB0aW1lR3JlYXRlclRoYW4yLCB0aW1lc3RhbXAgfSBmcm9tICcuL3NjcmlwdHMvc2VhcmNoX3V0aWxpdGllcyc7XHJcbmltcG9ydCBcInJlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZVwiO1xyXG5pbXBvcnQgeyBub1ZpZGVvc0ZvdW5kLCB2aWRlb3NGb3VuZCB9IGZyb20gJy4vc2NyaXB0cy9ub192aWRlb3NfZm91bmQnO1xyXG5pbXBvcnQgeyBkaXNwbGF5U3RyZWFtcyB9IGZyb20gJy4vc2NyaXB0cy9zdHJlYW1zJztcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICAgIGxldCBCTEFDS0xJU1RFRCA9IHt9O1xyXG4gICAgbGV0IGtBViA9IFtdO1xyXG4gICAgbGV0IGFjdHVhbDtcclxuICAgIGxldCBzdHJlYW1zID0gW107XHJcbiAgICBsZXQgZ2FtZXJ0YWcgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZ2FtZXJ0YWctZmllbGRcIilbMF0udmFsdWU7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZ2V0U3RyZWFtc1wiKVswXTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmEtc2VhcmNoXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBnZXRQbGF5ZXIpO1xyXG5cclxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XHJcbiAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKFwiaW5wdXQtY29udGFpbmVyXCIpO1xyXG4gICAgaW5wdXQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgY29uc3QgdW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICB1bi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dFwiKTtcclxuICAgIHVuLnNldEF0dHJpYnV0ZShcInBsYWNlaG9sZGVyXCIsIFwiVHdpdGNoIFVzZXJcIik7XHJcbiAgICB1bi5jbGFzc0xpc3QuYWRkKFwidW4tZmllbGRcIik7XHJcbiAgICBpbnB1dC5hcHBlbmRDaGlsZCh1bik7XHJcbiAgICBjb25zdCBndCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIGd0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xyXG4gICAgZ3Quc2V0QXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIiwgXCJQVUJHIFVzZXJcIik7XHJcbiAgICBndC5jbGFzc0xpc3QuYWRkKFwiZ3QtZmllbGRcIik7XHJcbiAgICBpbnB1dC5hcHBlbmRDaGlsZChndCk7XHJcbiAgICBjb25zdCBzdWJtaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgIHN1Ym1pdC5jbGFzc0xpc3QuYWRkKFwic3VibWl0LXN0cmVhbVwiKTtcclxuICAgIHN1Ym1pdC5pbm5lckhUTUwgPSBcIlNlYXJjaFwiO1xyXG4gICAgaW5wdXQuYXBwZW5kQ2hpbGQoc3VibWl0KTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChpbnB1dCk7XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnZXRTdHJlYW1zXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcclxuICAgICAgICBpZihpbnB1dC5zdHlsZS5kaXNwbGF5ID09PSBcImZsZXhcIikge1xyXG4gICAgICAgICAgICBpbnB1dC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBpbnB1dC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1Ym1pdC1zdHJlYW1cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGdldElucHV0KTtcclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRJbnB1dCgpIHtcclxuICAgICAgICBjb25zdCB1bmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ1bi1maWVsZFwiKVswXS52YWx1ZTtcclxuICAgICAgICBjb25zdCBndGFnID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImd0LWZpZWxkXCIpWzBdLnZhbHVlO1xyXG5cclxuICAgICAgICBpZih1bmFtZSAmJiBndGFnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgICAgIGZwLmNsYXNzTGlzdC5hZGQoXCJsb2FkaW5nMVwiLCBcImxvYWRcIik7XHJcbiAgICAgICAgICAgIGZwLmlubmVySFRNTCA9ICdGZXRjaGluZyBWaWRlb3MgLi4uJztcclxuICAgICAgICAgICAgaW5wdXQuYXBwZW5kQ2hpbGQoZnApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFsbFZpZHMgPSBhd2FpdCBnZXRTdHJlYW1zKHVuYW1lLCBndGFnKTtcclxuICAgICAgICBkaXNwbGF5U3RyZWFtcyhrQVYsIGFsbFZpZHMsIGd0YWcpO1xyXG5cclxuXHJcbiAgICAgICAgYXN5bmMgZnVuY3Rpb24gZ2V0U3RyZWFtcyh1bmFtZSwgZ3RhZykge1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2hlcyA9IGF3YWl0IGdldFBsYXllckJ5TmFtZShndGFnKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobWF0Y2hlcyk7XHJcbiAgICAgICAgICAgIGFjdHVhbCA9IG1hdGNoZXMubWFwKGFzeW5jIG1hdGNoID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBnZXRNYXRjaChtYXRjaC5pZClcclxuICAgICAgICAgICAgfSlcclxuICAgIFxyXG4gICAgICAgICAgICBsZXQgZ2FtZXMgPSBhd2FpdCBQcm9taXNlLmFsbFNldHRsZWQoYWN0dWFsKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZ2FtZXMpXHJcbiAgICBcclxuICAgICAgICAgICAgZ2FtZXMuZm9yRWFjaChhc3luYyBtYXRjaCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihtYXRjaC52YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYobWF0Y2gudmFsdWUuaW5jbHVkZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2gudmFsdWUuaW5jbHVkZWQuZm9yRWFjaChhc3luYyBlbGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlLmlkID09PSBtYXRjaC52YWx1ZS5kYXRhLnJlbGF0aW9uc2hpcHMuYXNzZXRzLmRhdGFbMF0uaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudHMucHVzaChnZXRUZWxlbWV0cnkoZWxlLmF0dHJpYnV0ZXMuVVJMKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICBcclxuICAgICAgICAgICAgbGV0IHRlbGVtZXRyeSA9IGF3YWl0IFByb21pc2UuYWxsU2V0dGxlZChldmVudHMpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRlbGVtZXRyeSlcclxuICAgICAgICAgICAgdGVsZW1ldHJ5LmZvckVhY2goZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQudmFsdWUuZm9yRWFjaChsb2cgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCgobG9nLl9UID09PSBcIkxvZ1BsYXllcktpbGxcIiAmJiBsb2cua2lsbGVyKSAmJiBsb2cua2lsbGVyLm5hbWUgPT09IGd0YWcpIHx8ICgobG9nLl9UID09PSBcIkxvZ1BsYXllcktpbGxcIiAmJiBsb2cudmljdGltKSAmJiBsb2cudmljdGltLm5hbWUgPT09IGd0YWcpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAga0FWLnB1c2gobG9nKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGtBVik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgdHdpdGNoVXNlciA9IGF3YWl0IGdldFR3aXRjaFVzZXIodW5hbWUpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGlmKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKS50aGVuKGpzb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ganNvblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBpZih0d2l0Y2hVc2VyKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0d2l0Y2hVc2VyLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2aWRlb3MgPSBhd2FpdCBnZXRWaWRlb3ModHdpdGNoVXNlci5kYXRhWzBdLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZih2aWRlb3MuZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvcy5kYXRhLm1hcChhc3luYyB2aWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsaXAgPSBhd2FpdCBnZXRQdWJnVmlkZW9zKHZpZC5pZCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjbGlwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGVidWdnZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjbGlwLmdhbWUgPT09IFwiUExBWUVSVU5LTk9XTidTIEJBVFRMRUdST1VORFNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJlYW1zLnB1c2goY2xpcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyZWFtcztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGFjdHVhbE1hdGNoZXMgPSBbXTtcclxuICAgIGxldCBldmVudHMgPSBbXTtcclxuICAgIGxldCB0ZWxlbWV0cnlFdmVudHMgPSBbXTtcclxuICAgIGxldCBjbGlwcyA9IFtdO1xyXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0UGxheWVyKCkge1xyXG4gICAgICAgIGNvbnN0IHNwbGFzaCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzcGxhc2gtY29udGVudFwiKVswXTtcclxuICAgICAgICBjb25zdCBsb2dvID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImxvZ29cIilbMF07XHJcbiAgICAgICAgY29uc3QgZmV0Y2hpbmdQbGF5ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICBmZXRjaGluZ1BsYXllci5jbGFzc0xpc3QuYWRkKFwibG9hZGluZzFcIiwgXCJsb2FkaW5nXCIpO1xyXG4gICAgICAgIGZldGNoaW5nUGxheWVyLmlubmVySFRNTCA9ICdGZXRjaGluZyBQbGF5ZXIgLi4uJztcclxuICAgICAgICBzcGxhc2guYXBwZW5kQ2hpbGQoZmV0Y2hpbmdQbGF5ZXIpO1xyXG4gICAgICAgIGxldCBtYXRjaGVzID0gYXdhaXQgZ2V0UGxheWVyQnlOYW1lKGdhbWVydGFnKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhtYXRjaGVzKTtcclxuICAgICAgICBhY3R1YWxNYXRjaGVzID0gbWF0Y2hlcy5tYXAoYXN5bmMgbWF0Y2ggPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgZ2V0TWF0Y2gobWF0Y2guaWQpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZmV0Y2hpbmdQbGF5ZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIGNvbnN0IGZldGNoaW5nTWF0Y2hlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgIGZldGNoaW5nTWF0Y2hlcy5jbGFzc0xpc3QuYWRkKFwibG9hZGluZzJcIiwgXCJsb2FkaW5nXCIpO1xyXG4gICAgICAgIGZldGNoaW5nTWF0Y2hlcy5pbm5lckhUTUwgPSAnRmV0Y2hpbmcgTWF0Y2hlcyAuLi4nO1xyXG4gICAgICAgIHNwbGFzaC5hcHBlbmRDaGlsZChmZXRjaGluZ01hdGNoZXMpO1xyXG5cclxuICAgICAgICBsZXQgZ2FtZXMgPSBhd2FpdCBQcm9taXNlLmFsbFNldHRsZWQoYWN0dWFsTWF0Y2hlcyk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coZ2FtZXMpXHJcblxyXG5cclxuICAgICAgICBmZXRjaGluZ01hdGNoZXMuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIGNvbnN0IGZldGNoaW5nRXZlbnRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgZmV0Y2hpbmdFdmVudHMuY2xhc3NMaXN0LmFkZChcImxvYWRpbmczXCIsIFwibG9hZGluZ1wiKTtcclxuICAgICAgICBmZXRjaGluZ0V2ZW50cy5pbm5lckhUTUwgPSAnRmV0Y2hpbmcgRXZlbnRzIC4uLic7XHJcbiAgICAgICAgc3BsYXNoLmFwcGVuZENoaWxkKGZldGNoaW5nRXZlbnRzKTtcclxuXHJcbiAgICAgICAgZ2FtZXMuZm9yRWFjaChhc3luYyBtYXRjaCA9PiB7XHJcbiAgICAgICAgICAgIGlmKG1hdGNoLnZhbHVlKXtcclxuICAgICAgICAgICAgICAgIGlmKG1hdGNoLnZhbHVlLmluY2x1ZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2gudmFsdWUuaW5jbHVkZWQuZm9yRWFjaChhc3luYyBlbGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihlbGUuaWQgPT09IG1hdGNoLnZhbHVlLmRhdGEucmVsYXRpb25zaGlwcy5hc3NldHMuZGF0YVswXS5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzLnB1c2goZ2V0VGVsZW1ldHJ5KGVsZS5hdHRyaWJ1dGVzLlVSTCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgbGV0IHRlbGVtZXRyeSA9IGF3YWl0IFByb21pc2UuYWxsU2V0dGxlZChldmVudHMpO1xyXG5cclxuICAgICAgICBmZXRjaGluZ0V2ZW50cy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgY29uc3QgZmV0Y2hpbmdLaWxsc0FuZERlYXRocyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgIGZldGNoaW5nS2lsbHNBbmREZWF0aHMuY2xhc3NMaXN0LmFkZChcImxvYWRpbmc0XCIsIFwibG9hZGluZ1wiKTtcclxuICAgICAgICBmZXRjaGluZ0tpbGxzQW5kRGVhdGhzLmlubmVySFRNTCA9ICdGZXRjaGluZyBLaWxscyBhbmQgRGVhdGhzIC4uLic7XHJcbiAgICAgICAgc3BsYXNoLmFwcGVuZENoaWxkKGZldGNoaW5nS2lsbHNBbmREZWF0aHMpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRlbGVtZXRyeSlcclxuICAgICAgICB0ZWxlbWV0cnkuZm9yRWFjaChldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50LnZhbHVlLmZvckVhY2gobG9nID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKCgobG9nLl9UID09PSBcIkxvZ1BsYXllcktpbGxcIiAmJiBsb2cua2lsbGVyKSAmJiBsb2cua2lsbGVyLm5hbWUgPT09IGdhbWVydGFnKSB8fCAoKGxvZy5fVCA9PT0gXCJMb2dQbGF5ZXJLaWxsXCIgJiYgbG9nLnZpY3RpbSkgJiYgbG9nLnZpY3RpbS5uYW1lID09PSBnYW1lcnRhZykpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbGVtZXRyeUV2ZW50cy5wdXNoKGxvZylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRlbGVtZXRyeUV2ZW50cylcclxuICAgICAgICBmZXRjaGluZ0tpbGxzQW5kRGVhdGhzLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICBjb25zdCBmZXRjaGluZ1ZpZGVvcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgIGZldGNoaW5nVmlkZW9zLmNsYXNzTGlzdC5hZGQoXCJsb2FkaW5nNVwiLCBcImxvYWRpbmdcIik7XHJcbiAgICAgICAgZmV0Y2hpbmdWaWRlb3MuaW5uZXJIVE1MID0gJ0ZldGNoaW5nIFZpZGVvcyAuLi4nO1xyXG4gICAgICAgIHNwbGFzaC5hcHBlbmRDaGlsZChmZXRjaGluZ1ZpZGVvcyk7XHJcbiAgICAgICAgZm9yKGNvbnN0IHRFdmVudCBvZiB0ZWxlbWV0cnlFdmVudHMpIHtcclxuICAgICAgICAgICAgbGV0IGV2ZW50VGltZXN0YW1wID0gdEV2ZW50Ll9EO1xyXG4gICAgICAgICAgICBpZih0RXZlbnQua2lsbGVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZighQkxBQ0tMSVNURURbdEV2ZW50LmtpbGxlci5uYW1lXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR3aXRjaFVzZXIgPSBhd2FpdCBnZXRUd2l0Y2hVc2VyKHRFdmVudC5raWxsZXIubmFtZSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKS50aGVuKGpzb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBqc29uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHR3aXRjaFVzZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodHdpdGNoVXNlci5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2aWRlb3MgPSBhd2FpdCBnZXRWaWRlb3ModHdpdGNoVXNlci5kYXRhWzBdLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHZpZGVvcy5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWRlb3MuZGF0YS5tYXAoYXN5bmMgdmlkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsaXAgPSBhd2FpdCBnZXRQdWJnVmlkZW9zKHZpZC5pZCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNsaXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlYnVnZ2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjbGlwLmdhbWUgPT09IFwiUExBWUVSVU5LTk9XTidTIEJBVFRMRUdST1VORFNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlYnVnZ2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGltZUdyZWF0ZXJUaGFuKGV2ZW50VGltZXN0YW1wLCBjbGlwLmNyZWF0ZWRfYXQpICYmIHRpbWVHcmVhdGVyVGhhbjIoZXZlbnRUaW1lc3RhbXAsIGNsaXAuY3JlYXRlZF9hdCwgY2xpcC5sZW5ndGgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlYnVnZ2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaXBzLnB1c2goe1widXJsXCI6IGNsaXAudXJsLCBcInRpbWVzdGFtcEluU2Vjb25kc1wiOiB0aW1lc3RhbXAoZXZlbnRUaW1lc3RhbXAsIGNsaXAuY3JlYXRlZF9hdCwgY2xpcC5sZW5ndGgpLCBcImV2ZW50XCI6IHRFdmVudCwgXCJ2b2RcIjogY2xpcH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJMQUNLTElTVEVEW3RFdmVudC5raWxsZXIubmFtZV0gPSB0RXZlbnQua2lsbGVyLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBCTEFDS0xJU1RFRFt0RXZlbnQua2lsbGVyLm5hbWVdID0gdEV2ZW50LmtpbGxlci5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0RXZlbnQudmljdGltKSB7XHJcbiAgICAgICAgICAgICAgICBpZighQkxBQ0tMSVNURURbdEV2ZW50LnZpY3RpbS5uYW1lXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR3aXRjaFVzZXIgPSBhd2FpdCBnZXRUd2l0Y2hVc2VyKHRFdmVudC52aWN0aW0ubmFtZSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKS50aGVuKGpzb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBqc29uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHR3aXRjaFVzZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodHdpdGNoVXNlci5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2aWRlb3MgPSBhd2FpdCBnZXRWaWRlb3ModHdpdGNoVXNlci5kYXRhWzBdLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHZpZGVvcy5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWRlb3MuZGF0YS5tYXAoYXN5bmMgdmlkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsaXAgPSBhd2FpdCBnZXRQdWJnVmlkZW9zKHZpZC5pZCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNsaXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlYnVnZ2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjbGlwLmdhbWUgPT09IFwiUExBWUVSVU5LTk9XTidTIEJBVFRMRUdST1VORFNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlYnVnZ2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGltZUdyZWF0ZXJUaGFuKGV2ZW50VGltZXN0YW1wLCBjbGlwLmNyZWF0ZWRfYXQpICYmIHRpbWVHcmVhdGVyVGhhbjIoZXZlbnRUaW1lc3RhbXAsIGNsaXAuY3JlYXRlZF9hdCwgY2xpcC5sZW5ndGgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlYnVnZ2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaXBzLnB1c2goe1widXJsXCI6IGNsaXAudXJsLCBcInRpbWVzdGFtcEluU2Vjb25kc1wiOiB0aW1lc3RhbXAoZXZlbnRUaW1lc3RhbXAsIGNsaXAuY3JlYXRlZF9hdCwgY2xpcC5sZW5ndGgpLCBcImV2ZW50XCI6IHRFdmVudCwgXCJ2b2RcIjogY2xpcH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBCTEFDS0xJU1RFRFt0RXZlbnQudmljdGltLm5hbWVdID0gdEV2ZW50LnZpY3RpbS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJMQUNLTElTVEVEW3RFdmVudC52aWN0aW0ubmFtZV0gPSB0RXZlbnQudmljdGltLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBmaW5hbCA9IGF3YWl0IFByb21pc2UuYWxsU2V0dGxlZChjbGlwcyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZmluYWwpO1xyXG4gICAgICAgIGlmKGZpbmFsLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBmZXRjaGluZ1ZpZGVvcy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgIGxvZ28uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICBub1ZpZGVvc0ZvdW5kKGdhbWVydGFnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsb2dvLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgZmV0Y2hpbmdWaWRlb3Muc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICB2aWRlb3NGb3VuZChnYW1lcnRhZywgZmluYWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkiLCJjb25zdCBkYXRlQ29udmVydGVyID0gKHVnbHlEYXRlKSA9PiB7XHJcbiAgICBsZXQgZmFrZUhhbGYgPSB1Z2x5RGF0ZS5zcGxpdChcIlRcIik7XHJcbiAgICBsZXQgcmVhbEhhbGYgPSBmYWtlSGFsZlswXS5zcGxpdChcIi1cIik7XHJcblxyXG4gICAgbGV0IHJlYWxEYXRlID0gTU9OVEhTW3JlYWxIYWxmWzFdXSArIFwiLCBcIiArIHJlYWxIYWxmWzJdICsgXCIgXCIgKyByZWFsSGFsZlswXTtcclxuXHJcbiAgICByZXR1cm4gcmVhbERhdGU7XHJcbn1cclxuXHJcbmNvbnN0IE1PTlRIUyA9IHtcclxuICAgIFwiMDFcIjogXCJKYW51YXJ5XCIsXHJcbiAgICBcIjAyXCI6IFwiRmVicnVhcnlcIixcclxuICAgIFwiMDNcIjogXCJNYXJjaFwiLFxyXG4gICAgXCIwNFwiOiBcIkFwcmlsXCIsXHJcbiAgICBcIjA1XCI6IFwiTWF5XCIsXHJcbiAgICBcIjA2XCI6IFwiSnVuZVwiLFxyXG4gICAgXCIwN1wiOiBcIkp1bHlcIixcclxuICAgIFwiMDhcIjogXCJBdWd1c3RcIixcclxuICAgIFwiMDlcIjogXCJTZXB0ZW1iZXJcIixcclxuICAgIFwiMTBcIjogXCJPY3RvYmVyXCIsXHJcbiAgICBcIjExXCI6IFwiTm92ZW1iZXJcIixcclxuICAgIFwiMTJcIjogXCJEZWNlbWJlclwiXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRhdGVDb252ZXJ0ZXI7IiwiZXhwb3J0IGNvbnN0IG5vVmlkZW9zRm91bmQgPSAoZ2FtZXJ0YWcpID0+IHtcclxuICAgIGNvbnN0IHNwbGFzaCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzcGxhc2gtY29udGVudFwiKVswXTtcclxuICAgIHNwbGFzaC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICBjb25zdCBsb2dvID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImxvZ29cIilbMF07XHJcbiAgICBsb2dvLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIGNvbnN0IHBhcmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpXHJcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgIGJ1dHRvbi5pbm5lckhUTUwgPSAnJmxhcnI7JztcclxuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYmFja1wiKTtcclxuICAgIHBhcmVudC5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XHJcbiAgICBwYXJlbnQuY2xhc3NMaXN0LmFkZChcInBhcmVudC1jb250YWluZXJcIik7XHJcbiAgICBjb25zdCBwbGF5ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgcGxheWVyLmlubmVySFRNTCA9IGA8aDI+JHsgZ2FtZXJ0YWcgfTwvaDI+YDtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwbGF5ZXIpO1xyXG4gICAgY29uc3QgbWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBtZXNzYWdlLmlubmVySFRNTCA9ICc8cD5ObyB2aWRlb3MgZm91bmQgZm9yIHRoaXMgdXNlcjwvcD4nO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1lc3NhZ2UpO1xyXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBhcmVudCk7XHJcblxyXG4gICAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBzcGxhc2guc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgICAgIGxvZ28uc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgICAgIHBhcmVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB2aWRlb3NGb3VuZCA9IChnYW1lcnRhZywgY2xpcHMpID0+IHtcclxuICAgIGNvbnN0IHNwbGFzaCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzcGxhc2gtY29udGVudFwiKVswXTtcclxuICAgIHNwbGFzaC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICBjb25zdCBsb2dvID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImxvZ29cIilbMF07XHJcbiAgICBjb25zdCBwYXJlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKVxyXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICBidXR0b24uaW5uZXJIVE1MID0gJyZsYXJyOyc7XHJcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImJhY2tcIik7XHJcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xyXG4gICAgcGFyZW50LmNsYXNzTGlzdC5hZGQoXCJwYXJlbnQtY29udGFpbmVyXCIpO1xyXG4gICAgY29uc3QgcGxheWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHBsYXllci5pbm5lckhUTUwgPSBgPGgyPiR7IGdhbWVydGFnIH08L2gyPmA7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocGxheWVyKTtcclxuICAgIFxyXG4gICAgY29uc3QgbGlzdE9mVmlkcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcclxuICAgIGxpc3RPZlZpZHMuY2xhc3NMaXN0LmFkZChcImxpc3Qtb2Ytdmlkc1wiKTtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBjbGlwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xyXG4gICAgICAgIHVsLmlubmVySFRNTCA9IGA8aDM+JHsgY2xpcHNbaV0udmFsdWUuZXZlbnQua2lsbGVyLm5hbWUgfTwvaDM+PHNwYW4+a2lsbGluZyAkeyBjbGlwc1tpXS52YWx1ZS5ldmVudC52aWN0aW0ubmFtZSB9PC9zcGFuPmA7XHJcbiAgICAgICAgdWwuY2xhc3NMaXN0LmFkZChgJHsgY2xpcHNbaV0udmFsdWUuZXZlbnQua2lsbGVyLm5hbWUgPT09IGdhbWVydGFnID8gXCJnXCIgOiBcInJcIiB9YCwgXCJ2aWRlb0JveFwiKTtcclxuICAgICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xyXG4gICAgICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoXCJtb2RhbFwiKTtcclxuICAgICAgICBjb25zdCBpZnJtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlmcmFtZVwiKTtcclxuICAgICAgICBpZnJtLnNldEF0dHJpYnV0ZShcInNyY1wiLCBgaHR0cHM6Ly9wbGF5ZXIudHdpdGNoLnR2Lz92aWRlbz0keyBjbGlwc1tpXS52YWx1ZS52b2QuX2lkIH0mYXV0b3BsYXk9ZmFsc2UmcGFyZW50PWxvY2FsaG9zdCZ0aW1lPSR7IGNsaXBzW2ldLnZhbHVlLnRpbWVzdGFtcEluU2Vjb25kcyB9YCk7XHJcbiAgICAgICAgaWZybS5zZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiwgXCI1NDBcIik7XHJcbiAgICAgICAgaWZybS5zZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiLCBcIjk3MFwiKTtcclxuICAgICAgICBpZnJtLnNldEF0dHJpYnV0ZShcImZyYW1lYm9yZGVyXCIsIFwiMFwiKTtcclxuICAgICAgICBpZnJtLnNldEF0dHJpYnV0ZShcInNjcm9sbGluZ1wiLCBcIm5vXCIpO1xyXG4gICAgICAgIGlmcm0uc2V0QXR0cmlidXRlKFwiYWxsb3dmdWxsc2NyZWVuXCIsIFwidHJ1ZVwiKTtcclxuICAgICAgICBpZnJtLmNsYXNzTGlzdC5hZGQoXCJmcmFtZVwiKTtcclxuICAgICAgICBtb2RhbC5hcHBlbmRDaGlsZChpZnJtKTtcclxuICAgICAgICB1bC5hcHBlbmRDaGlsZChtb2RhbCk7XHJcbiAgICAgICAgbGlzdE9mVmlkcy5hcHBlbmRDaGlsZCh1bCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICBidG4uaW5uZXJIVE1MID0gJyYjMTAwMDY7JztcclxuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwiY2xvc2VcIik7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobGlzdE9mVmlkcylcclxuICAgIHBhcmVudC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xyXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGJ0bik7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBhcmVudCk7XHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnZpZGVvQm94JykuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBjb25zdCBmcm0gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCcpO1xyXG4gICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZScpO1xyXG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgICAgICAgICAgZnJtLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgICAgICAgICAgYnRuLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNsb3NlJykuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICB4LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tb2RhbCcpLmZvckVhY2goZnJtID0+IHtcclxuICAgICAgICAgICAgICAgIGZybS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICB4LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICBidXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHNwbGFzaC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgICAgICAgbG9nby5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgICAgICAgcGFyZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIH1cclxufSIsImltcG9ydCBLZXkgZnJvbSAnLi4vY29uZmlnL2tleXMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFBsYXllckJ5TmFtZSA9IGdhbWVydGFnID0+IHtcclxuICAgIGNvbnN0IHBsYXllckJ5TmFtZUluaXQgPSB7XHJcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHsgS2V5LnB1YmdBUEkgfWAsXHJcbiAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL3ZuZC5hcGkranNvbidcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGBodHRwczovL2FwaS5wdWJnLmNvbS9zaGFyZHMveGJveC9wbGF5ZXJzP2ZpbHRlcltwbGF5ZXJOYW1lc109JHsgZ2FtZXJ0YWcgfWAsIHBsYXllckJ5TmFtZUluaXQpO1xyXG4gICAgcmV0dXJuIGZldGNoKHJlcXVlc3QpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICBpZihyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICAvLyBkZWJ1Z2dlclxyXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpLnRoZW4oanNvbiA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ganNvbi5kYXRhWzBdLnJlbGF0aW9uc2hpcHMubWF0Y2hlcy5kYXRhO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxud2luZG93LmdldFBsYXllckJ5TmFtZSA9IGdldFBsYXllckJ5TmFtZTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRNYXRjaCA9IChtYXRjaElkKSA9PiB7XHJcbiAgICBjb25zdCBnYW1lSW5pdCA9IHtcclxuICAgICAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgfVxyXG5cclxuICAgIC8vIGxldCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoYGh0dHBzOi8vYXBpLnB1YmcuY29tL3NoYXJkcy94Ym94L21hdGNoZXMvJHsgbWF0Y2hJZCB9YCwgZ2FtZUluaXQpO1xyXG4gICAgbGV0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdChgL3B1YmcvZ2FtZXJ0YWcvJHsgbWF0Y2hJZCB9YCwgZ2FtZUluaXQpXHJcbiAgICByZXR1cm4gZmV0Y2gocmVxdWVzdCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKClcclxuICAgIH0pXHJcbn1cclxud2luZG93LmdldE1hdGNoID0gZ2V0TWF0Y2g7XHJcbi8vXHJcbmV4cG9ydCBjb25zdCBnZXRUZWxlbWV0cnkgPSAodXJsKSA9PiB7XHJcbiAgICBjb25zdCB0ZWxlbWV0cnlJbml0ID0ge1xyXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi92bmQuYXBpK2pzb24nXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QodXJsLCB0ZWxlbWV0cnlJbml0KTtcclxuICAgIHJldHVybiBmZXRjaChyZXF1ZXN0KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgaWYocmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKS50aGVuKGpzb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGpzb25cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcbndpbmRvdy5nZXRUZWxlbWV0cnkgPSBnZXRUZWxlbWV0cnk7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0T0F1dGggPSAoKSA9PiB7XHJcbiAgICBjb25zdCBvYXV0aEluaXQgPSB7XHJcbiAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgLy8gc2NvcGU6ICd1c2VyOnJlYWQ6ZW1haWwnXHJcblxyXG4gICAgfVxyXG4gICAgbGV0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdChgaHR0cHM6Ly9pZC50d2l0Y2gudHYvb2F1dGgyL3Rva2VuP2NsaWVudF9pZD0keyBLZXkudHdpdGNoQVBJIH0mY2xpZW50X3NlY3JldD0keyBLZXkuY2xpZW50U0VDUkVUIH0mZ3JhbnRfdHlwZT1jbGllbnRfY3JlZGVudGlhbHNgLCBvYXV0aEluaXQpO1xyXG4gICAgcmV0dXJuIGZldGNoKHJlcXVlc3QpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICBpZihyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldFR3aXRjaFVzZXIgPSBnYW1lcnRhZyA9PiB7XHJcbiAgICBjb25zdCB0d2l0Y2hVc2VySW5pdCA9IHtcclxuICAgICAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7IEtleS5vQVVUSCB9YCxcclxuICAgICAgICAgICAgJ0NsaWVudC1JZCc6IGAkeyBLZXkudHdpdGNoQVBJIH1gXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGV0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdChgaHR0cHM6Ly9hcGkudHdpdGNoLnR2L2hlbGl4L3VzZXJzP2xvZ2luPSR7IGdhbWVydGFnIH1gLCB0d2l0Y2hVc2VySW5pdCk7XHJcbiAgICByZXR1cm4gZmV0Y2gocmVxdWVzdClcclxufVxyXG53aW5kb3cuZ2V0VHdpdGNoVXNlciA9IGdldFR3aXRjaFVzZXI7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0VmlkZW9zID0gdXNlcklkID0+IHtcclxuICAgIGNvbnN0IHR3aXRjaFZpZGVvc0luaXQgPSB7XHJcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAkeyBLZXkub0FVVEggfWAsXHJcbiAgICAgICAgICAgICdDbGllbnQtSWQnOiBgJHsgS2V5LnR3aXRjaEFQSSB9YFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoYGh0dHBzOi8vYXBpLnR3aXRjaC50di9oZWxpeC92aWRlb3M/dXNlcl9pZD0keyB1c2VySWQgfWAsIHR3aXRjaFZpZGVvc0luaXQpO1xyXG4gICAgcmV0dXJuIGZldGNoKHJlcXVlc3QpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICBpZihyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG53aW5kb3cuZ2V0VmlkZW9zID0gZ2V0VmlkZW9zO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFB1YmdWaWRlb3MgPSB2aWRlb0lkID0+IHtcclxuICAgIGNvbnN0IHR3aXRjaFB1YmdJbml0ID0ge1xyXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkFjY2VwdFwiOiBcImFwcGxpY2F0aW9uL3ZuZC50d2l0Y2h0di52NStqc29uXCIsXHJcbiAgICAgICAgICAgICdDbGllbnQtSWQnOiBgJHsgS2V5LnR3aXRjaEFQSSB9YFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoYGh0dHBzOi8vYXBpLnR3aXRjaC50di9rcmFrZW4vdmlkZW9zLyR7IHZpZGVvSWQgfWAsIHR3aXRjaFB1YmdJbml0KTtcclxuICAgIHJldHVybiBmZXRjaChyZXF1ZXN0KVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IHRpbWVHcmVhdGVyVGhhbiA9ICh0MSwgdDIpID0+IHtcclxuICAgIC8vIGRlYnVnZ2VyXHJcbiAgICBsZXQgdDMgPSBuZXcgRGF0ZSh0MSk7XHJcbiAgICBsZXQgdDQgPSBuZXcgRGF0ZSh0Mik7XHJcblxyXG4gICAgaWYodDMgPj0gdDQpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHRpbWVHcmVhdGVyVGhhbjIgPSAodDEsIHQyLCBzZWNvbmRzKSA9PiB7XHJcbiAgICAvLyBkZWJ1Z2dlclxyXG4gICAgbGV0IHQzID0gbmV3IERhdGUodDEpO1xyXG4gICAgbGV0IHQ0ID0gbmV3IERhdGUodDIpO1xyXG4gICAgdDQuc2V0SG91cnModDQuZ2V0SG91cnMoKSwgdDQuZ2V0TWludXRlcygpLCB0NC5nZXRTZWNvbmRzKCkgKyBzZWNvbmRzKTtcclxuICAgIGlmICh0MyA8PSB0NCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG4gICAgLy8gbGV0IGhvdXJzID0gdDQuZ2V0SG91cnMoKTtcclxuICAgIC8vIGxldCBtaW51dGVzID0gdDQuZ2V0TWludXRlcygpO1xyXG4gICAgLy8gbGV0IHNlY3MgPSB0NC5nZXRTZWNvbmRzKCk7XHJcbiAgICAvLyBpZihzZWNvbmRzICsgc2VjIDwgNjApIHtcclxuICAgIC8vICAgICB0NC5zZXRIb3Vycyhob3VycywgbWludXRlcywgc2Vjb25kcyArIHNlY3MpXHJcbiAgICAvLyB9IGVsc2UgaWYoc2Vjb25kcyArIHNlYyA9PT0gNjApIHtcclxuICAgIC8vICAgICB0NC5zZXRIb3Vycyhob3VycywgbWludXRlcyArIDEsIDApXHJcbiAgICAvLyB9IGVsc2UgaWYoc2Vjb25kcyArIHNlYyA+IDYwKSB7XHJcbiAgICAvLyAgICAgbGV0IG5ld1NlY3MgPSAoc2Vjb25kcyArIHNlYykgJSA2MDtcclxuICAgIC8vICAgICBsZXQgbmV3TWludXRlcyA9ICgoc2Vjb25kcyArIHNlYykgLSBuZXdTZWNzKSAvIDYwO1xyXG4gICAgLy8gICAgIGxldCBtaW47XHJcbiAgICAvLyAgICAgbGV0IGhvdXJzO1xyXG4gICAgLy8gICAgIGlmKG5ld01pbnV0ZXMgPiA2MCkge1xyXG4gICAgLy8gICAgICAgICBtaW4gPSBuZXdNaW51dGVzICUgNjA7XHJcbiAgICAvLyAgICAgICAgIGhvdXJzID0gKG5ld01pbnV0ZXMgLSBtaW4pIC8gNjA7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdGltZXN0YW1wID0gKHQxLCB0Miwgc2Vjb25kcykgPT4ge1xyXG4gICAgLy8gZGVidWdnZXJcclxuICAgIGxldCB0MyA9IG5ldyBEYXRlKHQxKTtcclxuICAgIGxldCB0NCA9IG5ldyBEYXRlKHQyKTtcclxuICAgIHQ0LnNldEhvdXJzKHQ0LmdldEhvdXJzKCksIHQ0LmdldE1pbnV0ZXMoKSwgdDQuZ2V0U2Vjb25kcygpICsgc2Vjb25kcyk7XHJcbiAgICBsZXQgc2VjcyA9ICgodDQgLSB0MykgLyAxMDAwKTtcclxuICAgIC8vIGxldCBuVCA9IHQ0LnNldEhvdXJzKHQ0LmdldEhvdXJzKCksIHQ0LmdldE1pbnV0ZXMoKSwgdDQuZ2V0U2Vjb25kcygpIC0gc2Vjcyk7XHJcbiAgICAvLyBsZXQgZXZlbnRUaW1lc3RhbXAgPSBuVCAtIChuZXcgRGF0ZSh0MikpO1xyXG4gICAgbGV0IHQgPSBuZXcgRGF0ZShudWxsKTtcclxuICAgIHQuc2V0U2Vjb25kcygoc2Vjb25kcyAtIHNlY3MpIC0gMTApO1xyXG4gICAgbGV0IGEgPSB0LnRvSVNPU3RyaW5nKCkuc3Vic3RyKDExLCA4KS5zcGxpdChcIjpcIik7XHJcbiAgICByZXR1cm4gYVswXSArIFwiaFwiICsgYVsxXSArIFwibVwiICsgYVsyXSArIFwic1wiXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB0aW1lc3RhbXAyID0gKHQxLCB0Miwgc2Vjb25kcykgPT4ge1xyXG4gICAgbGV0IHQzID0gbmV3IERhdGUodDEpO1xyXG4gICAgbGV0IHQ0ID0gbmV3IERhdGUodDIpO1xyXG4gICAgdDQuc2V0SG91cnModDQuZ2V0SG91cnMoKSwgdDQuZ2V0TWludXRlcygpLCB0NC5nZXRTZWNvbmRzKCkgKyBzZWNvbmRzKTtcclxuICAgIGxldCBzZWNzID0gKCh0NCAtIHQzKSAvIDEwMDApO1xyXG4gICAgbGV0IG5UID0gdDQuc2V0SG91cnModDQuZ2V0SG91cnMoKSwgdDQuZ2V0TWludXRlcygpLCB0NC5nZXRTZWNvbmRzKCkgLSBzZWNzKTtcclxuICAgIHJldHVybiAoKG5UIC0gKG5ldyBEYXRlKHQyKSkpIC8gMTAwMCkgLSAxMDtcclxufSIsImltcG9ydCBkYXRlQ29udmVydGVyIGZyb20gJy4vZGF0ZV9jb252ZXJ0ZXInO1xyXG5pbXBvcnQgeyB0aW1lR3JlYXRlclRoYW4sIHRpbWVHcmVhdGVyVGhhbjIsIHRpbWVzdGFtcCwgdGltZXN0YW1wMiB9IGZyb20gJy4vc2VhcmNoX3V0aWxpdGllcyc7XHJcblxyXG5leHBvcnQgY29uc3QgZGlzcGxheVN0cmVhbXMgPSAoZXZlbnRzLCB2aWRlb3MsIGd0YWcpID0+IHtcclxuICAgIGNvbnN0IHNwbGFzaCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzcGxhc2gtY29udGVudFwiKVswXTtcclxuICAgIHNwbGFzaC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICBjb25zdCBsb2dvID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImxvZ29cIilbMF07XHJcbiAgICBsb2dvLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIFxyXG4gICAgbGV0IGNsaXBzID0gW107XHJcbiAgICBsZXQgdmlkZW9IYXNFdmVudHMgPSB7fTtcclxuXHJcbiAgICBkZWJ1Z2dlclxyXG4gICAgZm9yKGxldCBqID0gMDsgaiA8IHZpZGVvcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYodGltZUdyZWF0ZXJUaGFuKGV2ZW50c1tpXS5fRCwgdmlkZW9zW2pdLmNyZWF0ZWRfYXQpICYmIHRpbWVHcmVhdGVyVGhhbjIoZXZlbnRzW2ldLl9ELCB2aWRlb3Nbal0uY3JlYXRlZF9hdCwgdmlkZW9zW2pdLmxlbmd0aCkpIHtcclxuICAgICAgICAgICAgICAgIHZpZGVvSGFzRXZlbnRzW3ZpZGVvc1tqXS5faWRdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNsaXBzLnB1c2goe1widmlkZW9faWRcIjogdmlkZW9zW2pdLl9pZCwgXCJ1cmxcIjogdmlkZW9zW2pdLnVybCwgXCJzZWVrXCI6IHRpbWVzdGFtcDIoZXZlbnRzW2ldLl9ELCB2aWRlb3Nbal0uY3JlYXRlZF9hdCwgdmlkZW9zW2pdLmxlbmd0aCksIFwidGltZXN0YW1wSW5TZWNvbmRzXCI6IHRpbWVzdGFtcChldmVudHNbaV0uX0QsIHZpZGVvc1tqXS5jcmVhdGVkX2F0LCB2aWRlb3Nbal0ubGVuZ3RoKSwgXCJldmVudFwiOiBldmVudHNbaV0sIFwidm9kXCI6IHZpZGVvc1tqXX0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGFyZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIilcclxuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgYnV0dG9uLmlubmVySFRNTCA9ICcmbGFycjsnO1xyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJiYWNrXCIpO1xyXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcclxuICAgIHBhcmVudC5jbGFzc0xpc3QuYWRkKFwicGFyZW50LWNvbnRhaW5lclwiKTtcclxuICAgIGNvbnN0IHBseXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgcGx5ci5pbm5lckhUTUwgPSBgPGgyPiR7IGd0YWcgfTwvaDI+YDtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwbHlyKTtcclxuICAgIFxyXG4gICAgY29uc3QgbGlzdE9mVmlkcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcclxuICAgIGxpc3RPZlZpZHMuY2xhc3NMaXN0LmFkZChcImxpc3Qtb2Ytdmlkc1wiKTtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB2aWRlb3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZih2aWRlb0hhc0V2ZW50c1t2aWRlb3NbaV0uX2lkXSkge1xyXG4gICAgICAgICAgICBjb25zdCB1bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcclxuICAgICAgICAgICAgdWwuaW5uZXJIVE1MID0gYDxoMz4keyB2aWRlb3NbaV0udGl0bGUgfTwvaDM+PHNwYW4+JHsgZGF0ZUNvbnZlcnRlcih2aWRlb3NbaV0uY3JlYXRlZF9hdCkgfTwvc3Bhbj5gO1xyXG4gICAgICAgICAgICB1bC5jbGFzc0xpc3QuYWRkKFwic3RyZWFtc0JveFwiKTtcclxuICAgICAgICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcclxuICAgICAgICAgICAgbW9kYWwuY2xhc3NMaXN0LmFkZChcIm1vZGFsMlwiKTtcclxuICAgICAgICAgICAgY29uc3QgbW9kYWxfY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIG1vZGFsX2NvbnRlbnQuY2xhc3NMaXN0LmFkZChcIm1vZGFsLWNvbnRlbnRcIik7XHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgY2xpcHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKGNsaXBzW2pdLnZpZGVvX2lkID09PSB2aWRlb3NbaV0uX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVidWdnZXJcclxuICAgICAgICAgICAgICAgICAgICBsaS5pbm5lckhUTUwgPSBgS2lsbGVyOiR7IGNsaXBzW2pdLmV2ZW50LmtpbGxlciA/IChjbGlwc1tqXS5ldmVudC5raWxsZXIubmFtZSkgOiBcIkVudmlyb25tZW50XCIgfSBWaWN0aW06JHsgY2xpcHNbal0uZXZlbnQudmljdGltLm5hbWUgfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmFkZChgJHsgY2xpcHNbal0uZXZlbnQua2lsbGVyID8gKGNsaXBzW2pdLmV2ZW50LmtpbGxlci5uYW1lID09PSBndGFnID8gXCJnclwiIDogXCJyZVwiKSA6IFwicmVcIiB9YCwgXCJub3N0eWxpc3RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7IGNsaXBzW2pdLnNlZWsgfWApXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kYWxfY29udGVudC5hcHBlbmRDaGlsZChsaSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbW9kYWwuYXBwZW5kQ2hpbGQobW9kYWxfY29udGVudCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7IGkgfWApO1xyXG4gICAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZChcIi52ZnJhbWVcIik7XHJcbiAgICAgICAgICAgIG1vZGFsLmFwcGVuZENoaWxkKGRpdik7XHJcblxyXG4gICAgICAgICAgICB1bC5hcHBlbmRDaGlsZChtb2RhbCk7XHJcbiAgICAgICAgICAgIGxpc3RPZlZpZHMuYXBwZW5kQ2hpbGQodWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICBidG4uaW5uZXJIVE1MID0gJyYjMTAwMDY7JztcclxuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwiY2xvc2UyXCIpO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGxpc3RPZlZpZHMpXHJcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcclxuICAgIHBhcmVudC5hcHBlbmRDaGlsZChidG4pO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwYXJlbnQpO1xyXG5cclxuICAgIGxldCBuYW1lcyA9IFtdO1xyXG4gICAgZm9yKGxldCBqID0gMDsgaiA8IHZpZGVvcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgIG5hbWVzLnB1c2goXCJwbGF5ZXJcIiArIGopXHJcbiAgICB9XHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdmlkZW9zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYodmlkZW9IYXNFdmVudHNbdmlkZW9zW2ldLl9pZF0pIHtcclxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogOTcwLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA1NDAsXHJcbiAgICAgICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB2aWRlbzogYCR7IHZpZGVvc1tpXS5faWQgfWBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgbmFtZXNbaV0gPSBuZXcgVHdpdGNoLlBsYXllcihgJHsgaSB9YCwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIG5hbWVzW2ldLnNldFZvbHVtZSgwLjUpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubm9zdHlsaXN0JykuZm9yRWFjaChldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lc1tpXS5zZWVrKE51bWJlcihldmVudC5pZCkpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN0cmVhbXNCb3gnKS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIGNvbnN0IGZybSA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLm1vZGFsMicpO1xyXG4gICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZTInKTtcclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcbiAgICAgICAgICAgIGZybS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgICAgICAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jbG9zZTInKS5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgIHguYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1vZGFsMicpLmZvckVhY2goZnJtID0+IHtcclxuICAgICAgICAgICAgICAgIGZybS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICB4LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICBidXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHNwbGFzaC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgICAgICAgbG9nby5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgICAgICAgcGFyZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIH1cclxufSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJzb3VyY2VSb290IjoiIn0=