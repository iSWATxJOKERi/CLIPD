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
  document.querySelector("#getStreams").addEventListener("click", getInput);

  function getInput() {
    return _getInput.apply(this, arguments);
  }

  function _getInput() {
    _getInput = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var input, un, gt, submit, getStreams, _getStreams;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _getStreams = function _getStreams3() {
                _getStreams = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(uname, gtag) {
                  var matches, games, telemetry, twitchUser, videos;
                  return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          _context6.next = 2;
                          return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getPlayerByName"])(gtag);

                        case 2:
                          matches = _context6.sent;
                          // console.log(matches);
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
                          _context6.next = 6;
                          return Promise.allSettled(actual);

                        case 6:
                          games = _context6.sent;
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
                          _context6.next = 10;
                          return Promise.allSettled(events);

                        case 10:
                          telemetry = _context6.sent;
                          // console.log(telemetry)
                          telemetry.forEach(function (event) {
                            event.value.forEach(function (log) {
                              if (log._T === "LogPlayerKill" && log.killer && log.killer.name === gtag || log._T === "LogPlayerKill" && log.victim && log.victim.name === gtag) {
                                kAV.push(log);
                              }
                            });
                          }); // console.log(kAV);

                          _context6.next = 14;
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
                          twitchUser = _context6.sent;

                          if (!twitchUser) {
                            _context6.next = 23;
                            break;
                          }

                          if (!(twitchUser.data.length > 0)) {
                            _context6.next = 23;
                            break;
                          }

                          _context6.next = 19;
                          return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getVideos"])(twitchUser.data[0].id);

                        case 19:
                          videos = _context6.sent;

                          if (!(videos.data.length > 0)) {
                            _context6.next = 23;
                            break;
                          }

                          videos.data.map( /*#__PURE__*/function () {
                            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(vid) {
                              var clip;
                              return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                while (1) {
                                  switch (_context5.prev = _context5.next) {
                                    case 0:
                                      _context5.next = 2;
                                      return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getPubgVideos"])(vid.id).then(function (response) {
                                        if (response.ok) {
                                          return response.json();
                                        } else {
                                          return false;
                                        }
                                      });

                                    case 2:
                                      clip = _context5.sent;

                                      if (clip) {
                                        // debugger
                                        if (clip.game === "PLAYERUNKNOWN'S BATTLEGROUNDS") {
                                          streams.push(clip);
                                        }
                                      }

                                    case 4:
                                    case "end":
                                      return _context5.stop();
                                  }
                                }
                              }, _callee5);
                            }));

                            return function (_x6) {
                              return _ref5.apply(this, arguments);
                            };
                          }());
                          return _context6.abrupt("return", streams);

                        case 23:
                        case "end":
                          return _context6.stop();
                      }
                    }
                  }, _callee6);
                }));
                return _getStreams.apply(this, arguments);
              };

              getStreams = function _getStreams2(_x, _x2) {
                return _getStreams.apply(this, arguments);
              };

              input = document.createElement("section");
              input.classList.add("input-container");
              un = document.createElement("input");
              un.setAttribute("type", "text");
              un.setAttribute("placeholder", "Twitch User");
              un.classList.add("un-field");
              input.appendChild(un);
              gt = document.createElement("input");
              gt.setAttribute("type", "text");
              gt.setAttribute("placeholder", "PUBG User");
              gt.classList.add("gt-field");
              input.appendChild(gt);
              submit = document.createElement("span");
              submit.classList.add("submit-stream");
              submit.innerHTML = "Search";
              input.appendChild(submit);
              container.appendChild(input);
              document.querySelector(".submit-stream").addEventListener("click", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var uname, gtag, fp, allVids;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        // debugger
                        uname = document.getElementsByClassName("un-field")[0].value;
                        gtag = document.getElementsByClassName("gt-field")[0].value;

                        if (uname && gtag) {
                          fp = document.createElement("span");
                          fp.classList.add("loading1", "load");
                          fp.innerHTML = 'Fetching Videos ...';
                          input.appendChild(fp);
                        }

                        _context.next = 5;
                        return getStreams(uname, gtag);

                      case 5:
                        allVids = _context.sent;
                        Object(_scripts_streams__WEBPACK_IMPORTED_MODULE_4__["displayStreams"])(kAV, allVids, gtag);

                      case 7:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              })));

            case 20:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
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
    _getPlayer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
      var splash, fetchingPlayer, matches, fetchingMatches, games, fetchingEvents, telemetry, fetchingKillsAndDeaths, fetchingVideos, _iterator, _step, _loop, final;

      return regeneratorRuntime.wrap(function _callee13$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              splash = document.getElementsByClassName("splash-content")[0];
              fetchingPlayer = document.createElement("span");
              fetchingPlayer.classList.add("loading1", "loading");
              fetchingPlayer.innerHTML = 'Fetching Player ...';
              splash.appendChild(fetchingPlayer);
              _context14.next = 7;
              return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getPlayerByName"])(gamertag);

            case 7:
              matches = _context14.sent;
              // console.log(matches);
              actualMatches = matches.map( /*#__PURE__*/function () {
                var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(match) {
                  return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                      switch (_context8.prev = _context8.next) {
                        case 0:
                          _context8.next = 2;
                          return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getMatch"])(match.id);

                        case 2:
                          return _context8.abrupt("return", _context8.sent);

                        case 3:
                        case "end":
                          return _context8.stop();
                      }
                    }
                  }, _callee8);
                }));

                return function (_x7) {
                  return _ref6.apply(this, arguments);
                };
              }());
              fetchingPlayer.style.display = "none";
              fetchingMatches = document.createElement("span");
              fetchingMatches.classList.add("loading2", "loading");
              fetchingMatches.innerHTML = 'Fetching Matches ...';
              splash.appendChild(fetchingMatches);
              _context14.next = 16;
              return Promise.allSettled(actualMatches);

            case 16:
              games = _context14.sent;
              // console.log(games)
              fetchingMatches.style.display = "none";
              fetchingEvents = document.createElement("span");
              fetchingEvents.classList.add("loading3", "loading");
              fetchingEvents.innerHTML = 'Fetching Events ...';
              splash.appendChild(fetchingEvents);
              games.forEach( /*#__PURE__*/function () {
                var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(match) {
                  return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                      switch (_context10.prev = _context10.next) {
                        case 0:
                          if (match.value) {
                            if (match.value.included) {
                              match.value.included.forEach( /*#__PURE__*/function () {
                                var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(ele) {
                                  return regeneratorRuntime.wrap(function _callee9$(_context9) {
                                    while (1) {
                                      switch (_context9.prev = _context9.next) {
                                        case 0:
                                          if (ele.id === match.value.data.relationships.assets.data[0].id) {
                                            events.push(Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getTelemetry"])(ele.attributes.URL));
                                          }

                                        case 1:
                                        case "end":
                                          return _context9.stop();
                                      }
                                    }
                                  }, _callee9);
                                }));

                                return function (_x9) {
                                  return _ref8.apply(this, arguments);
                                };
                              }());
                            }
                          }

                        case 1:
                        case "end":
                          return _context10.stop();
                      }
                    }
                  }, _callee10);
                }));

                return function (_x8) {
                  return _ref7.apply(this, arguments);
                };
              }());
              _context14.next = 25;
              return Promise.allSettled(events);

            case 25:
              telemetry = _context14.sent;
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
              _context14.prev = 38;
              _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop() {
                var tEvent, eventTimestamp, twitchUser, videos, _twitchUser, _videos;

                return regeneratorRuntime.wrap(function _loop$(_context13) {
                  while (1) {
                    switch (_context13.prev = _context13.next) {
                      case 0:
                        tEvent = _step.value;
                        eventTimestamp = tEvent._D;

                        if (!tEvent.killer) {
                          _context13.next = 17;
                          break;
                        }

                        if (BLACKLISTED[tEvent.killer.name]) {
                          _context13.next = 17;
                          break;
                        }

                        _context13.next = 6;
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
                        twitchUser = _context13.sent;

                        if (!twitchUser) {
                          _context13.next = 16;
                          break;
                        }

                        if (!(twitchUser.data.length > 0)) {
                          _context13.next = 14;
                          break;
                        }

                        _context13.next = 11;
                        return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getVideos"])(twitchUser.data[0].id);

                      case 11:
                        videos = _context13.sent;

                        if (videos.data.length > 0) {
                          videos.data.map( /*#__PURE__*/function () {
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

                        BLACKLISTED[tEvent.killer.name] = tEvent.killer.name;

                      case 14:
                        _context13.next = 17;
                        break;

                      case 16:
                        BLACKLISTED[tEvent.killer.name] = tEvent.killer.name;

                      case 17:
                        if (!tEvent.victim) {
                          _context13.next = 32;
                          break;
                        }

                        if (BLACKLISTED[tEvent.victim.name]) {
                          _context13.next = 32;
                          break;
                        }

                        _context13.next = 21;
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
                        _twitchUser = _context13.sent;

                        if (!_twitchUser) {
                          _context13.next = 31;
                          break;
                        }

                        if (!(_twitchUser.data.length > 0)) {
                          _context13.next = 28;
                          break;
                        }

                        _context13.next = 26;
                        return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getVideos"])(_twitchUser.data[0].id);

                      case 26:
                        _videos = _context13.sent;

                        if (_videos.data.length > 0) {
                          _videos.data.map( /*#__PURE__*/function () {
                            var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(vid) {
                              var clip;
                              return regeneratorRuntime.wrap(function _callee12$(_context12) {
                                while (1) {
                                  switch (_context12.prev = _context12.next) {
                                    case 0:
                                      _context12.next = 2;
                                      return Object(_scripts_search_utilities__WEBPACK_IMPORTED_MODULE_1__["getPubgVideos"])(vid.id).then(function (response) {
                                        if (response.ok) {
                                          return response.json();
                                        } else {
                                          return false;
                                        }
                                      });

                                    case 2:
                                      clip = _context12.sent;

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
                                      return _context12.stop();
                                  }
                                }
                              }, _callee12);
                            }));

                            return function (_x11) {
                              return _ref10.apply(this, arguments);
                            };
                          }());
                        }

                      case 28:
                        BLACKLISTED[tEvent.victim.name] = tEvent.victim.name;
                        _context13.next = 32;
                        break;

                      case 31:
                        BLACKLISTED[tEvent.victim.name] = tEvent.victim.name;

                      case 32:
                      case "end":
                        return _context13.stop();
                    }
                  }
                }, _loop);
              });

              _iterator.s();

            case 41:
              if ((_step = _iterator.n()).done) {
                _context14.next = 45;
                break;
              }

              return _context14.delegateYield(_loop(), "t0", 43);

            case 43:
              _context14.next = 41;
              break;

            case 45:
              _context14.next = 50;
              break;

            case 47:
              _context14.prev = 47;
              _context14.t1 = _context14["catch"](38);

              _iterator.e(_context14.t1);

            case 50:
              _context14.prev = 50;

              _iterator.f();

              return _context14.finish(50);

            case 53:
              _context14.next = 55;
              return Promise.allSettled(clips);

            case 55:
              final = _context14.sent;
              console.log(final);

              if (final.length === 0) {
                fetchingVideos.style.display = "none";
                Object(_scripts_no_videos_found__WEBPACK_IMPORTED_MODULE_3__["noVideosFound"])(gamertag);
              } else {
                fetchingVideos.style.display = "none";
                Object(_scripts_no_videos_found__WEBPACK_IMPORTED_MODULE_3__["videosFound"])(gamertag, final);
              }

            case 58:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee13, null, [[38, 47, 50, 53]]);
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
    parent.style.display = "none";
  };
};
var videosFound = function videosFound(gamertag, clips) {
  var splash = document.getElementsByClassName("splash-content")[0];
  splash.style.display = "none";
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

  console.log(videos);
  console.log(clips);
  console.log(events);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2RhdGVfY29udmVydGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL25vX3ZpZGVvc19mb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9zZWFyY2hfdXRpbGl0aWVzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3N0cmVhbXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJwdWJnQVBJIiwidHdpdGNoQVBJIiwiY2xpZW50U0VDUkVUIiwib0FVVEgiLCJnYW1lSUQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJCTEFDS0xJU1RFRCIsImtBViIsImFjdHVhbCIsInN0cmVhbXMiLCJnYW1lcnRhZyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJ2YWx1ZSIsImNvbnRhaW5lciIsInF1ZXJ5U2VsZWN0b3IiLCJnZXRQbGF5ZXIiLCJnZXRJbnB1dCIsImdldFN0cmVhbXMiLCJ1bmFtZSIsImd0YWciLCJnZXRQbGF5ZXJCeU5hbWUiLCJtYXRjaGVzIiwibWFwIiwibWF0Y2giLCJnZXRNYXRjaCIsImlkIiwiUHJvbWlzZSIsImFsbFNldHRsZWQiLCJnYW1lcyIsImZvckVhY2giLCJpbmNsdWRlZCIsImVsZSIsImRhdGEiLCJyZWxhdGlvbnNoaXBzIiwiYXNzZXRzIiwiZXZlbnRzIiwicHVzaCIsImdldFRlbGVtZXRyeSIsImF0dHJpYnV0ZXMiLCJVUkwiLCJ0ZWxlbWV0cnkiLCJldmVudCIsImxvZyIsIl9UIiwia2lsbGVyIiwibmFtZSIsInZpY3RpbSIsImdldFR3aXRjaFVzZXIiLCJ0aGVuIiwicmVzcG9uc2UiLCJvayIsImpzb24iLCJ0d2l0Y2hVc2VyIiwibGVuZ3RoIiwiZ2V0VmlkZW9zIiwidmlkZW9zIiwidmlkIiwiZ2V0UHViZ1ZpZGVvcyIsImNsaXAiLCJnYW1lIiwiaW5wdXQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwidW4iLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsImd0Iiwic3VibWl0IiwiaW5uZXJIVE1MIiwiZnAiLCJhbGxWaWRzIiwiZGlzcGxheVN0cmVhbXMiLCJhY3R1YWxNYXRjaGVzIiwidGVsZW1ldHJ5RXZlbnRzIiwiY2xpcHMiLCJzcGxhc2giLCJmZXRjaGluZ1BsYXllciIsInN0eWxlIiwiZGlzcGxheSIsImZldGNoaW5nTWF0Y2hlcyIsImZldGNoaW5nRXZlbnRzIiwiZmV0Y2hpbmdLaWxsc0FuZERlYXRocyIsImZldGNoaW5nVmlkZW9zIiwidEV2ZW50IiwiZXZlbnRUaW1lc3RhbXAiLCJfRCIsInRpbWVHcmVhdGVyVGhhbiIsImNyZWF0ZWRfYXQiLCJ0aW1lR3JlYXRlclRoYW4yIiwidXJsIiwidGltZXN0YW1wIiwiZmluYWwiLCJjb25zb2xlIiwibm9WaWRlb3NGb3VuZCIsInZpZGVvc0ZvdW5kIiwiZGF0ZUNvbnZlcnRlciIsInVnbHlEYXRlIiwiZmFrZUhhbGYiLCJzcGxpdCIsInJlYWxIYWxmIiwicmVhbERhdGUiLCJNT05USFMiLCJwYXJlbnQiLCJidXR0b24iLCJwbGF5ZXIiLCJtZXNzYWdlIiwiYm9keSIsIm9uY2xpY2siLCJsaXN0T2ZWaWRzIiwiaSIsInVsIiwibW9kYWwiLCJpZnJtIiwidm9kIiwiX2lkIiwidGltZXN0YW1wSW5TZWNvbmRzIiwiYnRuIiwicXVlcnlTZWxlY3RvckFsbCIsIml0ZW0iLCJmcm0iLCJlIiwieCIsInBsYXllckJ5TmFtZUluaXQiLCJtZXRob2QiLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsIktleSIsIkFjY2VwdCIsInJlcXVlc3QiLCJSZXF1ZXN0IiwiZmV0Y2giLCJ3aW5kb3ciLCJtYXRjaElkIiwiZ2FtZUluaXQiLCJ0ZWxlbWV0cnlJbml0IiwiZ2V0T0F1dGgiLCJvYXV0aEluaXQiLCJ0d2l0Y2hVc2VySW5pdCIsInVzZXJJZCIsInR3aXRjaFZpZGVvc0luaXQiLCJ2aWRlb0lkIiwidHdpdGNoUHViZ0luaXQiLCJ0MSIsInQyIiwidDMiLCJEYXRlIiwidDQiLCJzZWNvbmRzIiwic2V0SG91cnMiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJnZXRTZWNvbmRzIiwic2VjcyIsInQiLCJzZXRTZWNvbmRzIiwiYSIsInRvSVNPU3RyaW5nIiwic3Vic3RyIiwidGltZXN0YW1wMiIsIm5UIiwidmlkZW9IYXNFdmVudHMiLCJqIiwicGx5ciIsInRpdGxlIiwibW9kYWxfY29udGVudCIsInZpZGVvX2lkIiwibGkiLCJzZWVrIiwiZGl2IiwibmFtZXMiLCJvcHRpb25zIiwid2lkdGgiLCJoZWlnaHQiLCJhdXRvcGxheSIsInZpZGVvIiwiVHdpdGNoIiwiUGxheWVyIiwic2V0Vm9sdW1lIiwiTnVtYmVyIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCOztBQUVoQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0Qzs7QUFFQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLDBDQUEwQztBQUMxQzs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZHQUE2RztBQUM3Rzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QyxXQUFXO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7OztBQUdBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdDQUF3QztBQUN4QywyQkFBMkI7QUFDM0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULG9DQUFvQztBQUNwQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILG9DQUFvQyxjQUFjO0FBQ2xEO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtB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VUFBQW9ILENBQUMsRUFBSTtBQUNoQ0QsU0FBRyxDQUFDMUMsS0FBSixDQUFVQyxPQUFWLEdBQW9CLE1BQXBCO0FBQ0FzQyxTQUFHLENBQUN2QyxLQUFKLENBQVVDLE9BQVYsR0FBb0IsT0FBcEI7QUFDSCxLQUhEO0FBSUgsR0FQRDtBQVNBM0UsVUFBUSxDQUFDa0gsZ0JBQVQsQ0FBMEIsU0FBMUIsRUFBcUN6RixPQUFyQyxDQUE2QyxVQUFBNkYsQ0FBQyxFQUFJO0FBQzlDQSxLQUFDLENBQUNySCxnQkFBRixDQUFtQixPQUFuQixFQUE0QixVQUFBb0gsQ0FBQyxFQUFJO0FBQzdCckgsY0FBUSxDQUFDa0gsZ0JBQVQsQ0FBMEIsU0FBMUIsRUFBcUN6RixPQUFyQyxDQUE2QyxVQUFBMkYsR0FBRyxFQUFJO0FBQ2hEQSxXQUFHLENBQUMxQyxLQUFKLENBQVVDLE9BQVYsR0FBb0IsTUFBcEI7QUFDQTJDLFNBQUMsQ0FBQzVDLEtBQUYsQ0FBUUMsT0FBUixHQUFrQixNQUFsQjtBQUNILE9BSEQ7QUFJSCxLQUxEO0FBTUgsR0FQRDs7QUFTQXlCLFFBQU0sQ0FBQ0ksT0FBUCxHQUFpQixZQUFXO0FBQ3hCaEMsVUFBTSxDQUFDRSxLQUFQLENBQWFDLE9BQWIsR0FBdUIsTUFBdkI7QUFDQXdCLFVBQU0sQ0FBQ3pCLEtBQVAsQ0FBYUMsT0FBYixHQUF1QixNQUF2QjtBQUNILEdBSEQ7QUFJSCxDQXRITSxDOzs7Ozs7Ozs7Ozs7QUNIUDtBQUFBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cbnZhciBydW50aW1lID0gZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cblxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBvYmpba2V5XTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgLy8gSUUgOCBoYXMgYSBicm9rZW4gT2JqZWN0LmRlZmluZVByb3BlcnR5IHRoYXQgb25seSB3b3JrcyBvbiBET00gb2JqZWN0cy5cbiAgICBkZWZpbmUoe30sIFwiXCIpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBkZWZpbmUgPSBmdW5jdGlvbiAob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7IC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuXG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7IC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cblxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJub3JtYWxcIixcbiAgICAgICAgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKVxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwidGhyb3dcIixcbiAgICAgICAgYXJnOiBlcnJcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiOyAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cblxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9OyAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cblxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fSAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG5cblxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG5cbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJiBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9IEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpOyAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgICBkZWZpbmUocHJvdG90eXBlLCBtZXRob2QsIGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uIChnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3IgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fCAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIiA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uIChnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGRlZmluZShnZW5GdW4sIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpO1xuICAgIH1cblxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9OyAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuXG5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgX19hd2FpdDogYXJnXG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvciwgUHJvbWlzZUltcGwpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG5cbiAgICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24gKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPSAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZykgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH0gLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cblxuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG5cbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjsgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG5cbiAgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uIChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCwgUHJvbWlzZUltcGwpIHtcbiAgICBpZiAoUHJvbWlzZUltcGwgPT09IHZvaWQgMCkgUHJvbWlzZUltcGwgPSBQcm9taXNlO1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3Iod3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCksIFByb21pc2VJbXBsKTtcbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfSAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG5cblxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuXG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZSA/IEdlblN0YXRlQ29tcGxldGVkIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkOyAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cblxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0gLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuXG5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG5cbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAvLyBOb3RlOiBbXCJyZXR1cm5cIl0gbXVzdCBiZSB1c2VkIGZvciBFUzMgcGFyc2luZyBjb21wYXRpYmlsaXR5LlxuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCFpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlOyAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7IC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9IC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cblxuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH0gLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuXG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcbiAgZGVmaW5lKEdwLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JcIik7IC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cblxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7XG4gICAgICB0cnlMb2M6IGxvY3NbMF1cbiAgICB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7XG4gICAgICB0cnlMb2M6IFwicm9vdFwiXG4gICAgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cblxuICAgIGtleXMucmV2ZXJzZSgpOyAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcblxuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH0gLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG5cblxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG5cbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsXG4gICAgICAgICAgICBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9IC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cblxuXG4gICAgcmV0dXJuIHtcbiAgICAgIG5leHQ6IGRvbmVSZXN1bHRcbiAgICB9O1xuICB9XG5cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgIGRvbmU6IHRydWVcbiAgICB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG4gICAgcmVzZXQ6IGZ1bmN0aW9uIChza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDsgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiYgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiYgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHN0b3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcblxuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uIChleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG5cbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhIWNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFicnVwdDogZnVuY3Rpb24gKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiYgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJiB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiYgKHR5cGUgPT09IFwiYnJlYWtcIiB8fCB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHwgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG4gICAgZmluaXNoOiBmdW5jdGlvbiAoZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG5cbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbiAodHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH0gLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG5cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24gKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07IC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuXG4gIHJldHVybiBleHBvcnRzO1xufSggLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbi8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4vLyBvYmplY3QuIEVpdGhlciB3YXksIHRoZSByZXN1bHRpbmcgb2JqZWN0IHdpbGwgYmUgdXNlZCB0byBpbml0aWFsaXplXG4vLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxudHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge30pO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIHB1YmdBUEk6ICdleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcWRHa2lPaUkxTm1NMVkyTTVNQzFsWW1abUxUQXhNemd0TVdReE9DMDBZbU15TmpWbU16RXlZakVpTENKcGMzTWlPaUpuWVcxbGJHOWphMlZ5SWl3aWFXRjBJam94TmpBeU1qQTRNRFl3TENKd2RXSWlPaUppYkhWbGFHOXNaU0lzSW5ScGRHeGxJam9pY0hWaVp5SXNJbUZ3Y0NJNkltTnNhWEJ3WldRaWZRLllHQmxoM2VKcVJQT2tlU0RKcVRVS0cycUFRX3E2Y2V4OE9CS1V1cEx0U0knLFxyXG4gICAgdHdpdGNoQVBJOiAnNmRnaWExcG12bXJsczNpNmxlemdybWlidjAzMHB6JyxcclxuICAgIGNsaWVudFNFQ1JFVDogJ2I3aGcyemdoOWxnczV2N2k5MDEwZmtsZ3djaWtzaycsXHJcbiAgICBvQVVUSDogJ24wdXM3bXk1MHh1ajIzZGcycTg5empqNnh2ejJhdycsXHJcbiAgICBnYW1lSUQ6ICc0OTMwNTcnXHJcbn0iLCJpbXBvcnQgJy4uL3NyYy9zdHlsZXMvaW5kZXguc2Nzcyc7XHJcbmltcG9ydCB7IGdldE1hdGNoLCBnZXRQbGF5ZXJCeU5hbWUsIGdldFR3aXRjaFVzZXIsIGdldFRlbGVtZXRyeSwgZ2V0VmlkZW9zLCBnZXRQdWJnVmlkZW9zLCB0aW1lR3JlYXRlclRoYW4sIHRpbWVHcmVhdGVyVGhhbjIsIHRpbWVzdGFtcCB9IGZyb20gJy4vc2NyaXB0cy9zZWFyY2hfdXRpbGl0aWVzJztcclxuaW1wb3J0IFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lXCI7XHJcbmltcG9ydCB7IG5vVmlkZW9zRm91bmQsIHZpZGVvc0ZvdW5kIH0gZnJvbSAnLi9zY3JpcHRzL25vX3ZpZGVvc19mb3VuZCc7XHJcbmltcG9ydCB7IGRpc3BsYXlTdHJlYW1zIH0gZnJvbSAnLi9zY3JpcHRzL3N0cmVhbXMnO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG4gICAgbGV0IEJMQUNLTElTVEVEID0ge307XHJcbiAgICBsZXQga0FWID0gW107XHJcbiAgICBsZXQgYWN0dWFsO1xyXG4gICAgbGV0IHN0cmVhbXMgPSBbXTtcclxuICAgIGxldCBnYW1lcnRhZyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJnYW1lcnRhZy1maWVsZFwiKVswXS52YWx1ZTtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJnZXRTdHJlYW1zXCIpWzBdO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mYS1zZWFyY2hcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGdldFBsYXllcik7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2dldFN0cmVhbXNcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGdldElucHV0KTtcclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRJbnB1dCgpIHtcclxuICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xyXG4gICAgICAgIGlucHV0LmNsYXNzTGlzdC5hZGQoXCJpbnB1dC1jb250YWluZXJcIik7XHJcbiAgICAgICAgY29uc3QgdW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgdW4uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XHJcbiAgICAgICAgdW4uc2V0QXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIiwgXCJUd2l0Y2ggVXNlclwiKTtcclxuICAgICAgICB1bi5jbGFzc0xpc3QuYWRkKFwidW4tZmllbGRcIik7XHJcbiAgICAgICAgaW5wdXQuYXBwZW5kQ2hpbGQodW4pO1xyXG4gICAgICAgIGNvbnN0IGd0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgIGd0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xyXG4gICAgICAgIGd0LnNldEF0dHJpYnV0ZShcInBsYWNlaG9sZGVyXCIsIFwiUFVCRyBVc2VyXCIpO1xyXG4gICAgICAgIGd0LmNsYXNzTGlzdC5hZGQoXCJndC1maWVsZFwiKTtcclxuICAgICAgICBpbnB1dC5hcHBlbmRDaGlsZChndCk7XHJcbiAgICAgICAgY29uc3Qgc3VibWl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgc3VibWl0LmNsYXNzTGlzdC5hZGQoXCJzdWJtaXQtc3RyZWFtXCIpO1xyXG4gICAgICAgIHN1Ym1pdC5pbm5lckhUTUwgPSBcIlNlYXJjaFwiO1xyXG4gICAgICAgIGlucHV0LmFwcGVuZENoaWxkKHN1Ym1pdCk7XHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGlucHV0KTtcclxuXHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3VibWl0LXN0cmVhbVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIGRlYnVnZ2VyXHJcblxyXG4gICAgICAgICAgICBjb25zdCB1bmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ1bi1maWVsZFwiKVswXS52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgZ3RhZyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJndC1maWVsZFwiKVswXS52YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmKHVuYW1lICYmIGd0YWcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgICAgICAgICBmcC5jbGFzc0xpc3QuYWRkKFwibG9hZGluZzFcIiwgXCJsb2FkXCIpO1xyXG4gICAgICAgICAgICAgICAgZnAuaW5uZXJIVE1MID0gJ0ZldGNoaW5nIFZpZGVvcyAuLi4nO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuYXBwZW5kQ2hpbGQoZnApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgYWxsVmlkcyA9IGF3YWl0IGdldFN0cmVhbXModW5hbWUsIGd0YWcpO1xyXG4gICAgICAgICAgICBkaXNwbGF5U3RyZWFtcyhrQVYsIGFsbFZpZHMsIGd0YWcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBhc3luYyBmdW5jdGlvbiBnZXRTdHJlYW1zKHVuYW1lLCBndGFnKSB7XHJcbiAgICAgICAgICAgIGxldCBtYXRjaGVzID0gYXdhaXQgZ2V0UGxheWVyQnlOYW1lKGd0YWcpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtYXRjaGVzKTtcclxuICAgICAgICAgICAgYWN0dWFsID0gbWF0Y2hlcy5tYXAoYXN5bmMgbWF0Y2ggPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IGdldE1hdGNoKG1hdGNoLmlkKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgXHJcbiAgICAgICAgICAgIGxldCBnYW1lcyA9IGF3YWl0IFByb21pc2UuYWxsU2V0dGxlZChhY3R1YWwpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lcylcclxuICAgIFxyXG4gICAgICAgICAgICBnYW1lcy5mb3JFYWNoKGFzeW5jIG1hdGNoID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKG1hdGNoLnZhbHVlKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihtYXRjaC52YWx1ZS5pbmNsdWRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaC52YWx1ZS5pbmNsdWRlZC5mb3JFYWNoKGFzeW5jIGVsZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbGUuaWQgPT09IG1hdGNoLnZhbHVlLmRhdGEucmVsYXRpb25zaGlwcy5hc3NldHMuZGF0YVswXS5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50cy5wdXNoKGdldFRlbGVtZXRyeShlbGUuYXR0cmlidXRlcy5VUkwpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgIFxyXG4gICAgICAgICAgICBsZXQgdGVsZW1ldHJ5ID0gYXdhaXQgUHJvbWlzZS5hbGxTZXR0bGVkKGV2ZW50cyk7XHJcbiAgICBcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGVsZW1ldHJ5KVxyXG4gICAgICAgICAgICB0ZWxlbWV0cnkuZm9yRWFjaChldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudC52YWx1ZS5mb3JFYWNoKGxvZyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoKChsb2cuX1QgPT09IFwiTG9nUGxheWVyS2lsbFwiICYmIGxvZy5raWxsZXIpICYmIGxvZy5raWxsZXIubmFtZSA9PT0gZ3RhZykgfHwgKChsb2cuX1QgPT09IFwiTG9nUGxheWVyS2lsbFwiICYmIGxvZy52aWN0aW0pICYmIGxvZy52aWN0aW0ubmFtZSA9PT0gZ3RhZykpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrQVYucHVzaChsb2cpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coa0FWKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCB0d2l0Y2hVc2VyID0gYXdhaXQgZ2V0VHdpdGNoVXNlcih1bmFtZSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgaWYocmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpLnRoZW4oanNvbiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBqc29uXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGlmKHR3aXRjaFVzZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmKHR3aXRjaFVzZXIuZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZpZGVvcyA9IGF3YWl0IGdldFZpZGVvcyh0d2l0Y2hVc2VyLmRhdGFbMF0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHZpZGVvcy5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9zLmRhdGEubWFwKGFzeW5jIHZpZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2xpcCA9IGF3YWl0IGdldFB1YmdWaWRlb3ModmlkLmlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNsaXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWJ1Z2dlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNsaXAuZ2FtZSA9PT0gXCJQTEFZRVJVTktOT1dOJ1MgQkFUVExFR1JPVU5EU1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbXMucHVzaChjbGlwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJlYW1zO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgYWN0dWFsTWF0Y2hlcyA9IFtdO1xyXG4gICAgbGV0IGV2ZW50cyA9IFtdO1xyXG4gICAgbGV0IHRlbGVtZXRyeUV2ZW50cyA9IFtdO1xyXG4gICAgbGV0IGNsaXBzID0gW107XHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRQbGF5ZXIoKSB7XHJcbiAgICAgICAgY29uc3Qgc3BsYXNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNwbGFzaC1jb250ZW50XCIpWzBdO1xyXG4gICAgICAgIGNvbnN0IGZldGNoaW5nUGxheWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgZmV0Y2hpbmdQbGF5ZXIuY2xhc3NMaXN0LmFkZChcImxvYWRpbmcxXCIsIFwibG9hZGluZ1wiKTtcclxuICAgICAgICBmZXRjaGluZ1BsYXllci5pbm5lckhUTUwgPSAnRmV0Y2hpbmcgUGxheWVyIC4uLic7XHJcbiAgICAgICAgc3BsYXNoLmFwcGVuZENoaWxkKGZldGNoaW5nUGxheWVyKTtcclxuICAgICAgICBsZXQgbWF0Y2hlcyA9IGF3YWl0IGdldFBsYXllckJ5TmFtZShnYW1lcnRhZyk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cobWF0Y2hlcyk7XHJcbiAgICAgICAgYWN0dWFsTWF0Y2hlcyA9IG1hdGNoZXMubWFwKGFzeW5jIG1hdGNoID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IGdldE1hdGNoKG1hdGNoLmlkKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGZldGNoaW5nUGxheWVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICBjb25zdCBmZXRjaGluZ01hdGNoZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICBmZXRjaGluZ01hdGNoZXMuY2xhc3NMaXN0LmFkZChcImxvYWRpbmcyXCIsIFwibG9hZGluZ1wiKTtcclxuICAgICAgICBmZXRjaGluZ01hdGNoZXMuaW5uZXJIVE1MID0gJ0ZldGNoaW5nIE1hdGNoZXMgLi4uJztcclxuICAgICAgICBzcGxhc2guYXBwZW5kQ2hpbGQoZmV0Y2hpbmdNYXRjaGVzKTtcclxuXHJcbiAgICAgICAgbGV0IGdhbWVzID0gYXdhaXQgUHJvbWlzZS5hbGxTZXR0bGVkKGFjdHVhbE1hdGNoZXMpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGdhbWVzKVxyXG5cclxuXHJcbiAgICAgICAgZmV0Y2hpbmdNYXRjaGVzLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICBjb25zdCBmZXRjaGluZ0V2ZW50cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgIGZldGNoaW5nRXZlbnRzLmNsYXNzTGlzdC5hZGQoXCJsb2FkaW5nM1wiLCBcImxvYWRpbmdcIik7XHJcbiAgICAgICAgZmV0Y2hpbmdFdmVudHMuaW5uZXJIVE1MID0gJ0ZldGNoaW5nIEV2ZW50cyAuLi4nO1xyXG4gICAgICAgIHNwbGFzaC5hcHBlbmRDaGlsZChmZXRjaGluZ0V2ZW50cyk7XHJcblxyXG4gICAgICAgIGdhbWVzLmZvckVhY2goYXN5bmMgbWF0Y2ggPT4ge1xyXG4gICAgICAgICAgICBpZihtYXRjaC52YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICBpZihtYXRjaC52YWx1ZS5pbmNsdWRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoLnZhbHVlLmluY2x1ZGVkLmZvckVhY2goYXN5bmMgZWxlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlLmlkID09PSBtYXRjaC52YWx1ZS5kYXRhLnJlbGF0aW9uc2hpcHMuYXNzZXRzLmRhdGFbMF0uaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50cy5wdXNoKGdldFRlbGVtZXRyeShlbGUuYXR0cmlidXRlcy5VUkwpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGxldCB0ZWxlbWV0cnkgPSBhd2FpdCBQcm9taXNlLmFsbFNldHRsZWQoZXZlbnRzKTtcclxuXHJcbiAgICAgICAgZmV0Y2hpbmdFdmVudHMuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIGNvbnN0IGZldGNoaW5nS2lsbHNBbmREZWF0aHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICBmZXRjaGluZ0tpbGxzQW5kRGVhdGhzLmNsYXNzTGlzdC5hZGQoXCJsb2FkaW5nNFwiLCBcImxvYWRpbmdcIik7XHJcbiAgICAgICAgZmV0Y2hpbmdLaWxsc0FuZERlYXRocy5pbm5lckhUTUwgPSAnRmV0Y2hpbmcgS2lsbHMgYW5kIERlYXRocyAuLi4nO1xyXG4gICAgICAgIHNwbGFzaC5hcHBlbmRDaGlsZChmZXRjaGluZ0tpbGxzQW5kRGVhdGhzKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0ZWxlbWV0cnkpXHJcbiAgICAgICAgdGVsZW1ldHJ5LmZvckVhY2goZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBldmVudC52YWx1ZS5mb3JFYWNoKGxvZyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZigoKGxvZy5fVCA9PT0gXCJMb2dQbGF5ZXJLaWxsXCIgJiYgbG9nLmtpbGxlcikgJiYgbG9nLmtpbGxlci5uYW1lID09PSBnYW1lcnRhZykgfHwgKChsb2cuX1QgPT09IFwiTG9nUGxheWVyS2lsbFwiICYmIGxvZy52aWN0aW0pICYmIGxvZy52aWN0aW0ubmFtZSA9PT0gZ2FtZXJ0YWcpKXtcclxuICAgICAgICAgICAgICAgICAgICB0ZWxlbWV0cnlFdmVudHMucHVzaChsb2cpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0ZWxlbWV0cnlFdmVudHMpXHJcbiAgICAgICAgZmV0Y2hpbmdLaWxsc0FuZERlYXRocy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgY29uc3QgZmV0Y2hpbmdWaWRlb3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICBmZXRjaGluZ1ZpZGVvcy5jbGFzc0xpc3QuYWRkKFwibG9hZGluZzVcIiwgXCJsb2FkaW5nXCIpO1xyXG4gICAgICAgIGZldGNoaW5nVmlkZW9zLmlubmVySFRNTCA9ICdGZXRjaGluZyBWaWRlb3MgLi4uJztcclxuICAgICAgICBzcGxhc2guYXBwZW5kQ2hpbGQoZmV0Y2hpbmdWaWRlb3MpO1xyXG4gICAgICAgIGZvcihjb25zdCB0RXZlbnQgb2YgdGVsZW1ldHJ5RXZlbnRzKSB7XHJcbiAgICAgICAgICAgIGxldCBldmVudFRpbWVzdGFtcCA9IHRFdmVudC5fRDtcclxuICAgICAgICAgICAgaWYodEV2ZW50LmtpbGxlcikge1xyXG4gICAgICAgICAgICAgICAgaWYoIUJMQUNLTElTVEVEW3RFdmVudC5raWxsZXIubmFtZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0d2l0Y2hVc2VyID0gYXdhaXQgZ2V0VHdpdGNoVXNlcih0RXZlbnQua2lsbGVyLm5hbWUpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCkudGhlbihqc29uID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ganNvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBpZih0d2l0Y2hVc2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHR3aXRjaFVzZXIuZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmlkZW9zID0gYXdhaXQgZ2V0VmlkZW9zKHR3aXRjaFVzZXIuZGF0YVswXS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih2aWRlb3MuZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9zLmRhdGEubWFwKGFzeW5jIHZpZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjbGlwID0gYXdhaXQgZ2V0UHViZ1ZpZGVvcyh2aWQuaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjbGlwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWJ1Z2dlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2xpcC5nYW1lID09PSBcIlBMQVlFUlVOS05PV04nUyBCQVRUTEVHUk9VTkRTXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWJ1Z2dlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRpbWVHcmVhdGVyVGhhbihldmVudFRpbWVzdGFtcCwgY2xpcC5jcmVhdGVkX2F0KSAmJiB0aW1lR3JlYXRlclRoYW4yKGV2ZW50VGltZXN0YW1wLCBjbGlwLmNyZWF0ZWRfYXQsIGNsaXAubGVuZ3RoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWJ1Z2dlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGlwcy5wdXNoKHtcInVybFwiOiBjbGlwLnVybCwgXCJ0aW1lc3RhbXBJblNlY29uZHNcIjogdGltZXN0YW1wKGV2ZW50VGltZXN0YW1wLCBjbGlwLmNyZWF0ZWRfYXQsIGNsaXAubGVuZ3RoKSwgXCJldmVudFwiOiB0RXZlbnQsIFwidm9kXCI6IGNsaXB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBCTEFDS0xJU1RFRFt0RXZlbnQua2lsbGVyLm5hbWVdID0gdEV2ZW50LmtpbGxlci5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQkxBQ0tMSVNURURbdEV2ZW50LmtpbGxlci5uYW1lXSA9IHRFdmVudC5raWxsZXIubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodEV2ZW50LnZpY3RpbSkge1xyXG4gICAgICAgICAgICAgICAgaWYoIUJMQUNLTElTVEVEW3RFdmVudC52aWN0aW0ubmFtZV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0d2l0Y2hVc2VyID0gYXdhaXQgZ2V0VHdpdGNoVXNlcih0RXZlbnQudmljdGltLm5hbWUpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCkudGhlbihqc29uID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ganNvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBpZih0d2l0Y2hVc2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHR3aXRjaFVzZXIuZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmlkZW9zID0gYXdhaXQgZ2V0VmlkZW9zKHR3aXRjaFVzZXIuZGF0YVswXS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih2aWRlb3MuZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9zLmRhdGEubWFwKGFzeW5jIHZpZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjbGlwID0gYXdhaXQgZ2V0UHViZ1ZpZGVvcyh2aWQuaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjbGlwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWJ1Z2dlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2xpcC5nYW1lID09PSBcIlBMQVlFUlVOS05PV04nUyBCQVRUTEVHUk9VTkRTXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWJ1Z2dlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRpbWVHcmVhdGVyVGhhbihldmVudFRpbWVzdGFtcCwgY2xpcC5jcmVhdGVkX2F0KSAmJiB0aW1lR3JlYXRlclRoYW4yKGV2ZW50VGltZXN0YW1wLCBjbGlwLmNyZWF0ZWRfYXQsIGNsaXAubGVuZ3RoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWJ1Z2dlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGlwcy5wdXNoKHtcInVybFwiOiBjbGlwLnVybCwgXCJ0aW1lc3RhbXBJblNlY29uZHNcIjogdGltZXN0YW1wKGV2ZW50VGltZXN0YW1wLCBjbGlwLmNyZWF0ZWRfYXQsIGNsaXAubGVuZ3RoKSwgXCJldmVudFwiOiB0RXZlbnQsIFwidm9kXCI6IGNsaXB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgQkxBQ0tMSVNURURbdEV2ZW50LnZpY3RpbS5uYW1lXSA9IHRFdmVudC52aWN0aW0ubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBCTEFDS0xJU1RFRFt0RXZlbnQudmljdGltLm5hbWVdID0gdEV2ZW50LnZpY3RpbS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZmluYWwgPSBhd2FpdCBQcm9taXNlLmFsbFNldHRsZWQoY2xpcHMpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGZpbmFsKTtcclxuICAgICAgICBpZihmaW5hbC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgZmV0Y2hpbmdWaWRlb3Muc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICBub1ZpZGVvc0ZvdW5kKGdhbWVydGFnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmZXRjaGluZ1ZpZGVvcy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgIHZpZGVvc0ZvdW5kKGdhbWVydGFnLCBmaW5hbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSIsImNvbnN0IGRhdGVDb252ZXJ0ZXIgPSAodWdseURhdGUpID0+IHtcclxuICAgIGxldCBmYWtlSGFsZiA9IHVnbHlEYXRlLnNwbGl0KFwiVFwiKTtcclxuICAgIGxldCByZWFsSGFsZiA9IGZha2VIYWxmWzBdLnNwbGl0KFwiLVwiKTtcclxuXHJcbiAgICBsZXQgcmVhbERhdGUgPSBNT05USFNbcmVhbEhhbGZbMV1dICsgXCIsIFwiICsgcmVhbEhhbGZbMl0gKyBcIiBcIiArIHJlYWxIYWxmWzBdO1xyXG5cclxuICAgIHJldHVybiByZWFsRGF0ZTtcclxufVxyXG5cclxuY29uc3QgTU9OVEhTID0ge1xyXG4gICAgXCIwMVwiOiBcIkphbnVhcnlcIixcclxuICAgIFwiMDJcIjogXCJGZWJydWFyeVwiLFxyXG4gICAgXCIwM1wiOiBcIk1hcmNoXCIsXHJcbiAgICBcIjA0XCI6IFwiQXByaWxcIixcclxuICAgIFwiMDVcIjogXCJNYXlcIixcclxuICAgIFwiMDZcIjogXCJKdW5lXCIsXHJcbiAgICBcIjA3XCI6IFwiSnVseVwiLFxyXG4gICAgXCIwOFwiOiBcIkF1Z3VzdFwiLFxyXG4gICAgXCIwOVwiOiBcIlNlcHRlbWJlclwiLFxyXG4gICAgXCIxMFwiOiBcIk9jdG9iZXJcIixcclxuICAgIFwiMTFcIjogXCJOb3ZlbWJlclwiLFxyXG4gICAgXCIxMlwiOiBcIkRlY2VtYmVyXCJcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGF0ZUNvbnZlcnRlcjsiLCJleHBvcnQgY29uc3Qgbm9WaWRlb3NGb3VuZCA9IChnYW1lcnRhZykgPT4ge1xyXG4gICAgY29uc3Qgc3BsYXNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNwbGFzaC1jb250ZW50XCIpWzBdO1xyXG4gICAgc3BsYXNoLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIGNvbnN0IHBhcmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpXHJcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgIGJ1dHRvbi5pbm5lckhUTUwgPSAnJmxhcnI7JztcclxuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYmFja1wiKTtcclxuICAgIHBhcmVudC5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XHJcbiAgICBwYXJlbnQuY2xhc3NMaXN0LmFkZChcInBhcmVudC1jb250YWluZXJcIik7XHJcbiAgICBjb25zdCBwbGF5ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgcGxheWVyLmlubmVySFRNTCA9IGA8aDI+JHsgZ2FtZXJ0YWcgfTwvaDI+YDtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwbGF5ZXIpO1xyXG4gICAgY29uc3QgbWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBtZXNzYWdlLmlubmVySFRNTCA9ICc8cD5ObyB2aWRlb3MgZm91bmQgZm9yIHRoaXMgdXNlcjwvcD4nO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1lc3NhZ2UpO1xyXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBhcmVudCk7XHJcblxyXG4gICAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBzcGxhc2guc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgICAgIHBhcmVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB2aWRlb3NGb3VuZCA9IChnYW1lcnRhZywgY2xpcHMpID0+IHtcclxuICAgIGNvbnN0IHNwbGFzaCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzcGxhc2gtY29udGVudFwiKVswXTtcclxuICAgIHNwbGFzaC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcblxyXG4gICAgY29uc3QgcGFyZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIilcclxuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgYnV0dG9uLmlubmVySFRNTCA9ICcmbGFycjsnO1xyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJiYWNrXCIpO1xyXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcclxuICAgIHBhcmVudC5jbGFzc0xpc3QuYWRkKFwicGFyZW50LWNvbnRhaW5lclwiKTtcclxuICAgIGNvbnN0IHBsYXllciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBwbGF5ZXIuaW5uZXJIVE1MID0gYDxoMj4keyBnYW1lcnRhZyB9PC9oMj5gO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBsYXllcik7XHJcbiAgICBcclxuICAgIGNvbnN0IGxpc3RPZlZpZHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XHJcbiAgICBsaXN0T2ZWaWRzLmNsYXNzTGlzdC5hZGQoXCJsaXN0LW9mLXZpZHNcIik7XHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgY2xpcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCB1bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcclxuICAgICAgICB1bC5pbm5lckhUTUwgPSBgPGgzPiR7IGNsaXBzW2ldLnZhbHVlLmV2ZW50LmtpbGxlci5uYW1lIH08L2gzPjxzcGFuPmtpbGxpbmcgJHsgY2xpcHNbaV0udmFsdWUuZXZlbnQudmljdGltLm5hbWUgfTwvc3Bhbj5gO1xyXG4gICAgICAgIHVsLmNsYXNzTGlzdC5hZGQoYCR7IGNsaXBzW2ldLnZhbHVlLmV2ZW50LmtpbGxlci5uYW1lID09PSBnYW1lcnRhZyA/IFwiZ1wiIDogXCJyXCIgfWAsIFwidmlkZW9Cb3hcIik7XHJcbiAgICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcclxuICAgICAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKFwibW9kYWxcIik7XHJcbiAgICAgICAgY29uc3QgaWZybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7XHJcbiAgICAgICAgaWZybS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgYGh0dHBzOi8vcGxheWVyLnR3aXRjaC50di8/dmlkZW89JHsgY2xpcHNbaV0udmFsdWUudm9kLl9pZCB9JmF1dG9wbGF5PWZhbHNlJnBhcmVudD1sb2NhbGhvc3QmdGltZT0keyBjbGlwc1tpXS52YWx1ZS50aW1lc3RhbXBJblNlY29uZHMgfWApO1xyXG4gICAgICAgIGlmcm0uc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIFwiNTQwXCIpO1xyXG4gICAgICAgIGlmcm0uc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgXCI5NzBcIik7XHJcbiAgICAgICAgaWZybS5zZXRBdHRyaWJ1dGUoXCJmcmFtZWJvcmRlclwiLCBcIjBcIik7XHJcbiAgICAgICAgaWZybS5zZXRBdHRyaWJ1dGUoXCJzY3JvbGxpbmdcIiwgXCJub1wiKTtcclxuICAgICAgICBpZnJtLnNldEF0dHJpYnV0ZShcImFsbG93ZnVsbHNjcmVlblwiLCBcInRydWVcIik7XHJcbiAgICAgICAgaWZybS5jbGFzc0xpc3QuYWRkKFwiZnJhbWVcIik7XHJcbiAgICAgICAgbW9kYWwuYXBwZW5kQ2hpbGQoaWZybSk7XHJcbiAgICAgICAgdWwuYXBwZW5kQ2hpbGQobW9kYWwpO1xyXG4gICAgICAgIGxpc3RPZlZpZHMuYXBwZW5kQ2hpbGQodWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgYnRuLmlubmVySFRNTCA9ICcmIzEwMDA2Oyc7XHJcbiAgICBidG4uY2xhc3NMaXN0LmFkZChcImNsb3NlXCIpO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGxpc3RPZlZpZHMpXHJcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcclxuICAgIHBhcmVudC5hcHBlbmRDaGlsZChidG4pO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwYXJlbnQpO1xyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy52aWRlb0JveCcpLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgY29uc3QgZnJtID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcubW9kYWwnKTtcclxuICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UnKTtcclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcbiAgICAgICAgICAgIGZybS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgICAgICAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jbG9zZScpLmZvckVhY2goeCA9PiB7XHJcbiAgICAgICAgeC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubW9kYWwnKS5mb3JFYWNoKGZybSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmcm0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgeC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gICAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBzcGxhc2guc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgICAgIHBhcmVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgS2V5IGZyb20gJy4uL2NvbmZpZy9rZXlzJztcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRQbGF5ZXJCeU5hbWUgPSBnYW1lcnRhZyA9PiB7XHJcbiAgICBjb25zdCBwbGF5ZXJCeU5hbWVJbml0ID0ge1xyXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7IEtleS5wdWJnQVBJIH1gLFxyXG4gICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi92bmQuYXBpK2pzb24nXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGV0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdChgaHR0cHM6Ly9hcGkucHViZy5jb20vc2hhcmRzL3hib3gvcGxheWVycz9maWx0ZXJbcGxheWVyTmFtZXNdPSR7IGdhbWVydGFnIH1gLCBwbGF5ZXJCeU5hbWVJbml0KTtcclxuICAgIHJldHVybiBmZXRjaChyZXF1ZXN0KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgaWYocmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgLy8gZGVidWdnZXJcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKS50aGVuKGpzb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGpzb24uZGF0YVswXS5yZWxhdGlvbnNoaXBzLm1hdGNoZXMuZGF0YTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcbndpbmRvdy5nZXRQbGF5ZXJCeU5hbWUgPSBnZXRQbGF5ZXJCeU5hbWU7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0TWF0Y2ggPSAobWF0Y2hJZCkgPT4ge1xyXG4gICAgY29uc3QgZ2FtZUluaXQgPSB7XHJcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgIH1cclxuXHJcbiAgICAvLyBsZXQgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGBodHRwczovL2FwaS5wdWJnLmNvbS9zaGFyZHMveGJveC9tYXRjaGVzLyR7IG1hdGNoSWQgfWAsIGdhbWVJbml0KTtcclxuICAgIGxldCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoYC9wdWJnL2dhbWVydGFnLyR7IG1hdGNoSWQgfWAsIGdhbWVJbml0KVxyXG4gICAgcmV0dXJuIGZldGNoKHJlcXVlc3QpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXHJcbiAgICB9KVxyXG59XHJcbndpbmRvdy5nZXRNYXRjaCA9IGdldE1hdGNoO1xyXG4vL1xyXG5leHBvcnQgY29uc3QgZ2V0VGVsZW1ldHJ5ID0gKHVybCkgPT4ge1xyXG4gICAgY29uc3QgdGVsZW1ldHJ5SW5pdCA9IHtcclxuICAgICAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vdm5kLmFwaStqc29uJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHVybCwgdGVsZW1ldHJ5SW5pdCk7XHJcbiAgICByZXR1cm4gZmV0Y2gocmVxdWVzdCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgIGlmKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCkudGhlbihqc29uID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBqc29uXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG53aW5kb3cuZ2V0VGVsZW1ldHJ5ID0gZ2V0VGVsZW1ldHJ5O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldE9BdXRoID0gKCkgPT4ge1xyXG4gICAgY29uc3Qgb2F1dGhJbml0ID0ge1xyXG4gICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgIC8vIHNjb3BlOiAndXNlcjpyZWFkOmVtYWlsJ1xyXG5cclxuICAgIH1cclxuICAgIGxldCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoYGh0dHBzOi8vaWQudHdpdGNoLnR2L29hdXRoMi90b2tlbj9jbGllbnRfaWQ9JHsgS2V5LnR3aXRjaEFQSSB9JmNsaWVudF9zZWNyZXQ9JHsgS2V5LmNsaWVudFNFQ1JFVCB9JmdyYW50X3R5cGU9Y2xpZW50X2NyZWRlbnRpYWxzYCwgb2F1dGhJbml0KTtcclxuICAgIHJldHVybiBmZXRjaChyZXF1ZXN0KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgaWYocmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRUd2l0Y2hVc2VyID0gZ2FtZXJ0YWcgPT4ge1xyXG4gICAgY29uc3QgdHdpdGNoVXNlckluaXQgPSB7XHJcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAkeyBLZXkub0FVVEggfWAsXHJcbiAgICAgICAgICAgICdDbGllbnQtSWQnOiBgJHsgS2V5LnR3aXRjaEFQSSB9YFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoYGh0dHBzOi8vYXBpLnR3aXRjaC50di9oZWxpeC91c2Vycz9sb2dpbj0keyBnYW1lcnRhZyB9YCwgdHdpdGNoVXNlckluaXQpO1xyXG4gICAgcmV0dXJuIGZldGNoKHJlcXVlc3QpXHJcbn1cclxud2luZG93LmdldFR3aXRjaFVzZXIgPSBnZXRUd2l0Y2hVc2VyO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFZpZGVvcyA9IHVzZXJJZCA9PiB7XHJcbiAgICBjb25zdCB0d2l0Y2hWaWRlb3NJbml0ID0ge1xyXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHsgS2V5Lm9BVVRIIH1gLFxyXG4gICAgICAgICAgICAnQ2xpZW50LUlkJzogYCR7IEtleS50d2l0Y2hBUEkgfWBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGBodHRwczovL2FwaS50d2l0Y2gudHYvaGVsaXgvdmlkZW9zP3VzZXJfaWQ9JHsgdXNlcklkIH1gLCB0d2l0Y2hWaWRlb3NJbml0KTtcclxuICAgIHJldHVybiBmZXRjaChyZXF1ZXN0KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgaWYocmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxud2luZG93LmdldFZpZGVvcyA9IGdldFZpZGVvcztcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRQdWJnVmlkZW9zID0gdmlkZW9JZCA9PiB7XHJcbiAgICBjb25zdCB0d2l0Y2hQdWJnSW5pdCA9IHtcclxuICAgICAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgXCJBY2NlcHRcIjogXCJhcHBsaWNhdGlvbi92bmQudHdpdGNodHYudjUranNvblwiLFxyXG4gICAgICAgICAgICAnQ2xpZW50LUlkJzogYCR7IEtleS50d2l0Y2hBUEkgfWBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGBodHRwczovL2FwaS50d2l0Y2gudHYva3Jha2VuL3ZpZGVvcy8keyB2aWRlb0lkIH1gLCB0d2l0Y2hQdWJnSW5pdCk7XHJcbiAgICByZXR1cm4gZmV0Y2gocmVxdWVzdClcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCB0aW1lR3JlYXRlclRoYW4gPSAodDEsIHQyKSA9PiB7XHJcbiAgICAvLyBkZWJ1Z2dlclxyXG4gICAgbGV0IHQzID0gbmV3IERhdGUodDEpO1xyXG4gICAgbGV0IHQ0ID0gbmV3IERhdGUodDIpO1xyXG5cclxuICAgIGlmKHQzID49IHQ0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB0aW1lR3JlYXRlclRoYW4yID0gKHQxLCB0Miwgc2Vjb25kcykgPT4ge1xyXG4gICAgLy8gZGVidWdnZXJcclxuICAgIGxldCB0MyA9IG5ldyBEYXRlKHQxKTtcclxuICAgIGxldCB0NCA9IG5ldyBEYXRlKHQyKTtcclxuICAgIHQ0LnNldEhvdXJzKHQ0LmdldEhvdXJzKCksIHQ0LmdldE1pbnV0ZXMoKSwgdDQuZ2V0U2Vjb25kcygpICsgc2Vjb25kcyk7XHJcbiAgICBpZiAodDMgPD0gdDQpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuICAgIC8vIGxldCBob3VycyA9IHQ0LmdldEhvdXJzKCk7XHJcbiAgICAvLyBsZXQgbWludXRlcyA9IHQ0LmdldE1pbnV0ZXMoKTtcclxuICAgIC8vIGxldCBzZWNzID0gdDQuZ2V0U2Vjb25kcygpO1xyXG4gICAgLy8gaWYoc2Vjb25kcyArIHNlYyA8IDYwKSB7XHJcbiAgICAvLyAgICAgdDQuc2V0SG91cnMoaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMgKyBzZWNzKVxyXG4gICAgLy8gfSBlbHNlIGlmKHNlY29uZHMgKyBzZWMgPT09IDYwKSB7XHJcbiAgICAvLyAgICAgdDQuc2V0SG91cnMoaG91cnMsIG1pbnV0ZXMgKyAxLCAwKVxyXG4gICAgLy8gfSBlbHNlIGlmKHNlY29uZHMgKyBzZWMgPiA2MCkge1xyXG4gICAgLy8gICAgIGxldCBuZXdTZWNzID0gKHNlY29uZHMgKyBzZWMpICUgNjA7XHJcbiAgICAvLyAgICAgbGV0IG5ld01pbnV0ZXMgPSAoKHNlY29uZHMgKyBzZWMpIC0gbmV3U2VjcykgLyA2MDtcclxuICAgIC8vICAgICBsZXQgbWluO1xyXG4gICAgLy8gICAgIGxldCBob3VycztcclxuICAgIC8vICAgICBpZihuZXdNaW51dGVzID4gNjApIHtcclxuICAgIC8vICAgICAgICAgbWluID0gbmV3TWludXRlcyAlIDYwO1xyXG4gICAgLy8gICAgICAgICBob3VycyA9IChuZXdNaW51dGVzIC0gbWluKSAvIDYwO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHRpbWVzdGFtcCA9ICh0MSwgdDIsIHNlY29uZHMpID0+IHtcclxuICAgIC8vIGRlYnVnZ2VyXHJcbiAgICBsZXQgdDMgPSBuZXcgRGF0ZSh0MSk7XHJcbiAgICBsZXQgdDQgPSBuZXcgRGF0ZSh0Mik7XHJcbiAgICB0NC5zZXRIb3Vycyh0NC5nZXRIb3VycygpLCB0NC5nZXRNaW51dGVzKCksIHQ0LmdldFNlY29uZHMoKSArIHNlY29uZHMpO1xyXG4gICAgbGV0IHNlY3MgPSAoKHQ0IC0gdDMpIC8gMTAwMCk7XHJcbiAgICAvLyBsZXQgblQgPSB0NC5zZXRIb3Vycyh0NC5nZXRIb3VycygpLCB0NC5nZXRNaW51dGVzKCksIHQ0LmdldFNlY29uZHMoKSAtIHNlY3MpO1xyXG4gICAgLy8gbGV0IGV2ZW50VGltZXN0YW1wID0gblQgLSAobmV3IERhdGUodDIpKTtcclxuICAgIGxldCB0ID0gbmV3IERhdGUobnVsbCk7XHJcbiAgICB0LnNldFNlY29uZHMoKHNlY29uZHMgLSBzZWNzKSAtIDEwKTtcclxuICAgIGxldCBhID0gdC50b0lTT1N0cmluZygpLnN1YnN0cigxMSwgOCkuc3BsaXQoXCI6XCIpO1xyXG4gICAgcmV0dXJuIGFbMF0gKyBcImhcIiArIGFbMV0gKyBcIm1cIiArIGFbMl0gKyBcInNcIlxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdGltZXN0YW1wMiA9ICh0MSwgdDIsIHNlY29uZHMpID0+IHtcclxuICAgIGxldCB0MyA9IG5ldyBEYXRlKHQxKTtcclxuICAgIGxldCB0NCA9IG5ldyBEYXRlKHQyKTtcclxuICAgIHQ0LnNldEhvdXJzKHQ0LmdldEhvdXJzKCksIHQ0LmdldE1pbnV0ZXMoKSwgdDQuZ2V0U2Vjb25kcygpICsgc2Vjb25kcyk7XHJcbiAgICBsZXQgc2VjcyA9ICgodDQgLSB0MykgLyAxMDAwKTtcclxuICAgIGxldCBuVCA9IHQ0LnNldEhvdXJzKHQ0LmdldEhvdXJzKCksIHQ0LmdldE1pbnV0ZXMoKSwgdDQuZ2V0U2Vjb25kcygpIC0gc2Vjcyk7XHJcbiAgICByZXR1cm4gKChuVCAtIChuZXcgRGF0ZSh0MikpKSAvIDEwMDApIC0gMTA7XHJcbn0iLCJpbXBvcnQgZGF0ZUNvbnZlcnRlciBmcm9tICcuL2RhdGVfY29udmVydGVyJztcclxuaW1wb3J0IHsgdGltZUdyZWF0ZXJUaGFuLCB0aW1lR3JlYXRlclRoYW4yLCB0aW1lc3RhbXAsIHRpbWVzdGFtcDIgfSBmcm9tICcuL3NlYXJjaF91dGlsaXRpZXMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGRpc3BsYXlTdHJlYW1zID0gKGV2ZW50cywgdmlkZW9zLCBndGFnKSA9PiB7XHJcbiAgICBjb25zdCBzcGxhc2ggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic3BsYXNoLWNvbnRlbnRcIilbMF07XHJcbiAgICBzcGxhc2guc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgXHJcbiAgICBsZXQgY2xpcHMgPSBbXTtcclxuICAgIGxldCB2aWRlb0hhc0V2ZW50cyA9IHt9O1xyXG5cclxuICAgIGRlYnVnZ2VyXHJcbiAgICBmb3IobGV0IGogPSAwOyBqIDwgdmlkZW9zLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZih0aW1lR3JlYXRlclRoYW4oZXZlbnRzW2ldLl9ELCB2aWRlb3Nbal0uY3JlYXRlZF9hdCkgJiYgdGltZUdyZWF0ZXJUaGFuMihldmVudHNbaV0uX0QsIHZpZGVvc1tqXS5jcmVhdGVkX2F0LCB2aWRlb3Nbal0ubGVuZ3RoKSkge1xyXG4gICAgICAgICAgICAgICAgdmlkZW9IYXNFdmVudHNbdmlkZW9zW2pdLl9pZF0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY2xpcHMucHVzaCh7XCJ2aWRlb19pZFwiOiB2aWRlb3Nbal0uX2lkLCBcInVybFwiOiB2aWRlb3Nbal0udXJsLCBcInNlZWtcIjogdGltZXN0YW1wMihldmVudHNbaV0uX0QsIHZpZGVvc1tqXS5jcmVhdGVkX2F0LCB2aWRlb3Nbal0ubGVuZ3RoKSwgXCJ0aW1lc3RhbXBJblNlY29uZHNcIjogdGltZXN0YW1wKGV2ZW50c1tpXS5fRCwgdmlkZW9zW2pdLmNyZWF0ZWRfYXQsIHZpZGVvc1tqXS5sZW5ndGgpLCBcImV2ZW50XCI6IGV2ZW50c1tpXSwgXCJ2b2RcIjogdmlkZW9zW2pdfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyh2aWRlb3MpO1xyXG4gICAgY29uc29sZS5sb2coY2xpcHMpO1xyXG4gICAgY29uc29sZS5sb2coZXZlbnRzKTtcclxuICAgIGNvbnN0IHBhcmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpXHJcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgIGJ1dHRvbi5pbm5lckhUTUwgPSAnJmxhcnI7JztcclxuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYmFja1wiKTtcclxuICAgIHBhcmVudC5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XHJcbiAgICBwYXJlbnQuY2xhc3NMaXN0LmFkZChcInBhcmVudC1jb250YWluZXJcIik7XHJcbiAgICBjb25zdCBwbHlyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHBseXIuaW5uZXJIVE1MID0gYDxoMj4keyBndGFnIH08L2gyPmA7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocGx5cik7XHJcbiAgICBcclxuICAgIGNvbnN0IGxpc3RPZlZpZHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XHJcbiAgICBsaXN0T2ZWaWRzLmNsYXNzTGlzdC5hZGQoXCJsaXN0LW9mLXZpZHNcIik7XHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdmlkZW9zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYodmlkZW9IYXNFdmVudHNbdmlkZW9zW2ldLl9pZF0pIHtcclxuICAgICAgICAgICAgY29uc3QgdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XHJcbiAgICAgICAgICAgIHVsLmlubmVySFRNTCA9IGA8aDM+JHsgdmlkZW9zW2ldLnRpdGxlIH08L2gzPjxzcGFuPiR7IGRhdGVDb252ZXJ0ZXIodmlkZW9zW2ldLmNyZWF0ZWRfYXQpIH08L3NwYW4+YDtcclxuICAgICAgICAgICAgdWwuY2xhc3NMaXN0LmFkZChcInN0cmVhbXNCb3hcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XHJcbiAgICAgICAgICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoXCJtb2RhbDJcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vZGFsX2NvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBtb2RhbF9jb250ZW50LmNsYXNzTGlzdC5hZGQoXCJtb2RhbC1jb250ZW50XCIpO1xyXG5cclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IGNsaXBzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihjbGlwc1tqXS52aWRlb19pZCA9PT0gdmlkZW9zW2ldLl9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRlYnVnZ2VyXHJcbiAgICAgICAgICAgICAgICAgICAgbGkuaW5uZXJIVE1MID0gYEtpbGxlcjokeyBjbGlwc1tqXS5ldmVudC5raWxsZXIgPyAoY2xpcHNbal0uZXZlbnQua2lsbGVyLm5hbWUpIDogXCJFbnZpcm9ubWVudFwiIH0gVmljdGltOiR7IGNsaXBzW2pdLmV2ZW50LnZpY3RpbS5uYW1lIH1gO1xyXG4gICAgICAgICAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoYCR7IGNsaXBzW2pdLmV2ZW50LmtpbGxlciA/IChjbGlwc1tqXS5ldmVudC5raWxsZXIubmFtZSA9PT0gZ3RhZyA/IFwiZ3JcIiA6IFwicmVcIikgOiBcInJlXCIgfWAsIFwibm9zdHlsaXN0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxpLnNldEF0dHJpYnV0ZShcImlkXCIsIGAkeyBjbGlwc1tqXS5zZWVrIH1gKVxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGFsX2NvbnRlbnQuYXBwZW5kQ2hpbGQobGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1vZGFsLmFwcGVuZENoaWxkKG1vZGFsX2NvbnRlbnQpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZShcImlkXCIsIGAkeyBpIH1gKTtcclxuICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoXCIudmZyYW1lXCIpO1xyXG4gICAgICAgICAgICBtb2RhbC5hcHBlbmRDaGlsZChkaXYpO1xyXG5cclxuICAgICAgICAgICAgdWwuYXBwZW5kQ2hpbGQobW9kYWwpO1xyXG4gICAgICAgICAgICBsaXN0T2ZWaWRzLmFwcGVuZENoaWxkKHVsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgYnRuLmlubmVySFRNTCA9ICcmIzEwMDA2Oyc7XHJcbiAgICBidG4uY2xhc3NMaXN0LmFkZChcImNsb3NlMlwiKTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChsaXN0T2ZWaWRzKVxyXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoYnRuKTtcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocGFyZW50KTtcclxuXHJcbiAgICBsZXQgbmFtZXMgPSBbXTtcclxuICAgIGZvcihsZXQgaiA9IDA7IGogPCB2aWRlb3MubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICBuYW1lcy5wdXNoKFwicGxheWVyXCIgKyBqKVxyXG4gICAgfVxyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHZpZGVvcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmKHZpZGVvSGFzRXZlbnRzW3ZpZGVvc1tpXS5faWRdKSB7XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDk3MCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogNTQwLFxyXG4gICAgICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdmlkZW86IGAkeyB2aWRlb3NbaV0uX2lkIH1gXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG5hbWVzW2ldID0gbmV3IFR3aXRjaC5QbGF5ZXIoYCR7IGkgfWAsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBuYW1lc1tpXS5zZXRWb2x1bWUoMC41KTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm5vc3R5bGlzdCcpLmZvckVhY2goZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZXNbaV0uc2VlayhOdW1iZXIoZXZlbnQuaWQpKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdHJlYW1zQm94JykuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBjb25zdCBmcm0gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbDInKTtcclxuICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UyJyk7XHJcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG4gICAgICAgICAgICBmcm0uc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgICAgICAgICBidG4uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2xvc2UyJykuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICB4LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tb2RhbDInKS5mb3JFYWNoKGZybSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmcm0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgeC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gICAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBzcGxhc2guc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgICAgIHBhcmVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICB9XHJcbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwic291cmNlUm9vdCI6IiJ9