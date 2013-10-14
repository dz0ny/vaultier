// creates pohon namespace
if (!Po) {
    var Po = {};
}


/************************************************************************************************
 ************************************************************************************************
 * FUNCTION PROTOTYPES
 ************************************************************************************************
 ***********************************************************************************************/

/**
 * Calls function in specified scope
 * @return {Function}
 */
Function.prototype.scopize = function () {
    var fn = this, args = [].slice.call(arguments), object = args.shift();
    return function () {
        return fn.apply(object, args.concat([].slice.call(arguments)));
    };
};


/************************************************************************************************
 ************************************************************************************************
 * CORE FUNCTIONS
 ************************************************************************************************
 ***********************************************************************************************/

/**
 * Creates namespace
 * eg. Po.NS('aaa.bbb.ccc') creates namespace aaa.bbb.ccc
 * @return {*}
 */
Po.NS = function () {
    var len1 = arguments.length, i = 0, len2, j, /*main,*/ ns, sub, current;

    for (; i < len1; ++i) {
        //main = arguments[i];
        ns = arguments[i].split('.');
        current = window[ns[0]];
        if (current === undefined) {
            current = window[ns[0]] = {};
        }
        sub = ns.slice(1);
        len2 = sub.length;
        for (j = 0; j < len2; ++j) {
            current = current[sub[j]] = current[sub[j]] || {};
        }
    }
    return current;
}

/**
 * Merges objet o with c and defaults
 * @todo: document usage
 * @param o
 * @param c
 * @param defaults
 * @return {*}
 */
Po.merge = function (o, c, defaults) {
    if (!o) {
        o = {};
    }
    // no "this" reference for friendly out of scope calls
    if (defaults) {
        $.mergeObject(o, defaults);
    }
    if (o && c && typeof c == 'object') {
        for (var p in c) {
            o[p] = c[p];
        }
    }
    return o;
};
/**
 * Generates unique ids.
 */

Po.idSeed = 0;

/**
 * Generates unique ID throught this session
 * @param prefix prefix to use
 * @returns {String} generated id
 */
Po.generateId = function (prefix) {
    var id = (prefix || "po-id-") + (++Po.idSeed);
    return id;
};

/************************************************************************************************
 ************************************************************************************************
 * Pohon classes
 ************************************************************************************************
 ***********************************************************************************************/

Po.NS('Po.O');

/**
 * Checks if the argument variable is empty
 * undefined, null, false, number 0, empty string,
 * string "0", objects without properties and empty arrays
 * are considered empty
 *
 */
Po.O.empty = function (mixed_var) {
    var undef, key, i, len;
    var emptyValues = [undef, null, false, 0, "", "0"];

    for (i = 0, len = emptyValues.length; i < len; i++) {
        if (mixed_var === emptyValues[i]) {
            return true;
        }
    }

    if (typeof mixed_var === "object") {
        for (key in mixed_var) {
            if (mixed_var.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }

    return false;
}

/**
 *  Usage:
 *
 *  Creates class (or function) from string
 *
 *  my = {};
 *  my.namespaced = {};
 *  my.namespaced.MyClass = function() {
 *      console.log("constructed");
 *  }).prototype = {
 *   do: function() {
 *     console.log("doing");
 *   }
 *  };
 *
 *  var MyClass = stringToFunction("my.namespaced.MyClass");
 *  var instance = new MyClass(arg1, arg2);
 *  instance.do();
 *
 * @param {String} str string to be converted to function
 * @param bool exception throw exception if not found
 * @return {Function}
 */
Po.O.evaluate = function (str, exception) {
    var arr = str.split(".");

    var fn = (window || this);
    for (var i = 0, len = arr.length; i < len; i++) {
        try {
            fn = fn[arr[i]];
        } catch (e) {
            fn = false;
        }
    }

    if (typeof fn !== "function") {
        fn = false;
        if (exception) {
            throw new Error("function '#fn#' not found".replace('#fn#', str));
        }
    }

    return  fn;
};


/**
 * Returns if specified variable is instance of given class, allows checking of variable type or throws exception
 *
 * @param {Mixed} variable variable to check
 * @param {Mixed} cls class to be instanceof
 * @param {Boolean} exception whether to throw exceptions or not
 * @param {String} msg message to show
 */
Po.O.checkInstance = function (variable, cls, msg, exception) {
    exception = Po.F.optional(exception, true);
    msg = Po.F.optional(msg, '');
    if (variable instanceof cls) {
        return true;
    }
    if (exception) {
        var name = false;
        if (cls && cls.meta && cls.meta.name) {
            name = cls.meta.name;
        }

        if (name) {
            var msg = msg + ' ' + ' - Given variable must be instance of \'#name#\''.replace('#name#', name);
        } else {
            var msg = msg + ' ' + ' - Given variable has wrong type/class';
        }
        throw new Error(msg);
    }
    return false;
};

/**
 * Returns true if specified object is has given role. Allows checking of object role or throws exception
 *
 * @param {Mixed} object
 * @param {Mixed} role
 * @param {Boolean} exception whether to throw exceptions or not
 * @param {String} msg message to show
 */
Po.O.checkRole = function (object, role, msg, exception) {
    exception = Po.F.optional(exception, true);
    msg = Po.F.optional(msg, '');
    if (object && object.meta && object.meta.does(role)) {
        return true;
    }
    if (exception) {
        var name = false;
        if (role && role.meta && role.meta.name) {
            name = role.meta.name;
        }

        if (name) {
            var msg = msg + ' ' + ' - Given object must have role \'#name#\''.replace('#name#', name);
        } else {
            var msg = msg + ' ' + ' - Given object has wrong role';
        }
        throw new Error(msg);
    }
    return false;
};

/************************************************************************************************
 ************************************************************************************************
 * Pohon Arrays
 ************************************************************************************************
 ***********************************************************************************************/
Po.NS('Po.A');

Po.A.each = function (items, fn, scope) {
    if (scope instanceof Object) {
        fn = fn.scopize(scope);
    }

    // iterate Array
    if (items instanceof Array) {
        return each = Joose.A.each(items, fn);
    }

    // iterate jQuery
    if (items instanceof jQuery) {
        return items.each(function (key, value) {
            return fn(value, key);
        });
    }

    // iterate eachable
    if (items instanceof Object && typeof items.each == 'function') {
        return items.each(fn);
    }

    // iterate Object
    if (items instanceof Object) {
        return Joose.O.eachOwn(items, fn);
    }

    throw Error('Unsupported object to "each"');

}

/************************************************************************************************
 ************************************************************************************************
 * Pohon Functions
 ************************************************************************************************
 ***********************************************************************************************/
Po.NS('Po.F');


/**
 *
 * Allows to create functions with optional variables
 *
 * var func = function(a, b, c) {
 *      a = Po.F.optional(a, 1);
 *      b = Po.F.optional(b, 1);
 *      c = Po.F.optional(c, 1);
 *      return a+b+c;
 * }
 *
 * func(1,2) returns 4
 * func() returns 3
 *
 * (petr) note that default arguments can be emulated in a way that's explicit,
 * yet still conscise enough:
 *
 *   function f(opt_arg) {
 *     // loose checking, overwrites falsey values; often suffices:
 *     opt_arg = opt_arg || 'default';
 *     // OR strict checking, equivalent to Po.F.optional:
 *     opt_arg = typeof opt_arg !== 'undefined' ? opt_arg : 'default';
 *
 *     ...
 *   }
 *
 * @param variable variable to make optional
 * @param defaultize value if varible is undefined
 * @returns {*}
 */
Po.F.optional = function (variable, defaultize) {
    if (typeof variable == 'undefined') {
        variable = defaultize;
    }
    return variable;
}

/**
 * Throttling decorator
 *
 * If you need arguments to your callback, wrap it in an anonymous function
 * (for now)
 *
 * usage:
 *
 *   myObserved.on('change', Po.F.throttle(1000, myObj.myMethod, myObj));
 *   // fires only once at first trigger and once after a 1000ms:
 *   myObserved.trigger('change');
 *   myObserved.trigger('change');
 *   myObserved.trigger('change');
 *
 * @param {Number} interval throttling interval in milliseconds
 * @param {Function} callback function to call if enough time passed,
 * or schedule otherwise
 * @param {Object=} context optional context to provide to the callback
 * (defaults to window)
 * @returns {Function}
 */
Po.F.throttle = function (interval, callback, context) {
    f = function self() {
        self.throttle.fire();
    };
    f.throttle = new Po.Async.Throttle({
        interval: interval,
        callback: callback,
        context: context
    });
    return f;
}

/**
 * Delay decorator
 *
 * Wraps a function to delay its execution. Preserves arguments, optionally
 * binds to the provided context. If the "resetting" argument is set to true,
 * all subsequent calls will reset any active timeouts, thus cancelling any
 * earlier calls that haven't been executed yet.
 *
 * usage:
 *
 *   var f = Po.F.delay(500, function() {
 *     console.log(this); console.log(arguments);
 *   }, {my: 'object'});
 *   f(1, 2, 3);
 *
 *   // log half a second later:
 *   Object {my: "object"}
 *   [1, 2, 3]
 *
 * @param {Number} delay delay in milliseconds
 * @param {Function} callback function to call after delay
 * @param {Object=} context optional context to provide to the callback
 * (defaults to window)
 * @param {boolean=} resetting if true, every call resets earlier timeouts
 * @returns {Function}
 */
Po.F.delay = function (delay, callback, context, resetting) {
    return function self() {
        var args = Array.prototype.slice.apply(arguments);
        if (resetting) {
            window.clearTimeout(self.timeout);
        }
        self.timeout = window.setTimeout(function () {
            callback.apply(context, args);
        }, delay);
    };
}

/**
 * Delay decorator
 *
 * Wraps a function to delay its execution. Preserves arguments, optionally
 * binds to the provided context. If the "resetting" argument is set to true,
 * all subsequent calls will reset any active timeouts, thus cancelling any
 * earlier calls that haven't been executed yet.
 *
 * usage:
 *
 *   var f = Po.F.delay(500, function() {
 *     console.log(this); console.log(arguments);
 *   }, {my: 'object'});
 *   f(1, 2, 3);
 *
 *   // log half a second later:
 *   Object {my: "object"}
 *   [1, 2, 3]
 *
 * @param {Number} delay delay in milliseconds
 * @param {Function} callback function to call after delay
 * @param {Object=} context optional context to provide to the callback
 * (defaults to window)
 * @param {boolean=} resetting if true, every call resets earlier timeouts
 * @returns {Function}
 */
Po.F.map = function (delay, callback, context, resetting) {
    return function self() {
        var args = Array.prototype.slice.apply(arguments);
        if (resetting) {
            window.clearTimeout(self.timeout);
        }
        self.timeout = window.setTimeout(function () {
            callback.apply(context, args);
        }, delay);
    };
}

Po.NS('Po.S');
/**
 * Uppercase first letter of given string
 * example:
 * ucfirst('kevin van zonneveld');
 * returns 'Kevin van zonneveld'
 */
Po.S.ucfirst = function (str) {
    if (typeof str !== 'string') {
        throw Error('String parameter is expected');
    }

    str += '';
    var f = str.charAt(0).toUpperCase();
    return f + str.substr(1);
}

/************************************************************************************************
 ************************************************************************************************
 * Initial root paths
 ************************************************************************************************
 ***********************************************************************************************/
Po.NS('Po.paths');

Po.paths.root = function () {
    // get script url
    var scripts = document.getElementsByTagName('script');
    var index = scripts.length - 1;
    var url = scripts[index].src;

    // extract pathinfo
    var a = document.createElement('a');
    a.href = url;

    // returns
    return a.pathname.replace('Pohon/Pohon.js', '');
}();

/************************************************************************************************
 ************************************************************************************************
 * Logging
 ************************************************************************************************
 ***********************************************************************************************/

/**
 * Logs message to console
 * @param {Mixed} message
 */
Po.log = function (message) {
    console.log(message);
}

/**
 * Logs message to console
 * @param {Mixed} message
 */
Po.error = function (error) {
    var msg;
    if (error instanceof Error) {
        msg = error.stack;
        if (!msg) {
            msg = error.message;
        }
    }
    if (!msg) {
        msg = error;
    }

    console.error(msg);
}

/**
 * Logs message to console
 * @param {Mixed} message
 */
Po.warning = function (message) {
    console.warning(message);
}

/************************************************************************************************
 ************************************************************************************************
 * Form
 ************************************************************************************************
 ***********************************************************************************************/

/**
 * Serialize form into JS object
 *
 * @param form element
 * @returns {object}
 */
Po.NS('Po.form');

Po.form.serializeObject = function (form) {
    var o = {};
    var a = form.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            if (this.name.indexOf('[]') != -1) {
                o[this.name] = [this.value || ''];
            } else {
                o[this.name] = this.value || '';
            }

        }
    });
    return o;
};

/************************************************************************************************
 ************************************************************************************************
 * Type checking
 ************************************************************************************************
 ***********************************************************************************************/

Po.NS('Po.check');

Po.check.Array = function (what) {
    if (Array.isArray)
        return Array.isArray(what);
    return (Object.prototype.toString.call(someVar) === '[object Array]');
};

Po.check.Object = function (what) {
    var t = typeof what;
    return (t == 'object' && what != null || t == 'function');
};

/************************************************************************************************
 ************************************************************************************************
 * Random
 ************************************************************************************************
 ***********************************************************************************************/

Po.NS('Po.R');

Po.R.randomFloat = function (min, max) {
    return Math.random() * (max - min) + min;
}

Po.R.randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Po.R.randomString = function (min, max) {
    min = Po.F.optional(min, 5);
    max = Po.F.optional(max, 20);
    length = Po.R.randomInt(min, max);
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

Po.R.randomEmail = function () {
    return (Po.R.randomString(3, 10) + '@' + Po.R.randomString(3, 15) + '.' + Po.R.randomString(3, 3)).toLowerCase();
}



/************************************************************************************************
 ************************************************************************************************
 * Debug
 ************************************************************************************************
 ***********************************************************************************************/

/**
 * Logs message to console, stops javascript
 * @param {Mixed} message
 */
ldd = function (o) {
    Po.log(o);
    throw 'Javascript stopped';
}

/**
 * Logs message to console
 * @param o
 */
ld = function (o) {
    Po.log(o);
}


/**
 * Array.prototype.map compatibility
 */

// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.com/#x15.4.4.19
if (!Array.prototype.map) {
    Array.prototype.map = function (callback, thisArg) {

        var T, A, k;

        if (this == null) {
            throw new TypeError(" this is null or not defined");
        }

        // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If IsCallable(callback) is false, throw a TypeError exception.
        // See: http://es5.github.com/#x9.11
        if (typeof callback !== "function") {
            throw new TypeError(callback + " is not a function");
        }

        // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (thisArg) {
            T = thisArg;
        }

        // 6. Let A be a new array created as if by the expression new Array(len) where Array is
        // the standard built-in constructor with that name and len is the value of len.
        A = new Array(len);

        // 7. Let k be 0
        k = 0;

        // 8. Repeat, while k < len
        while (k < len) {

            var kValue, mappedValue;

            // a. Let Pk be ToString(k).
            //   This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
            //   This step can be combined with c
            // c. If kPresent is true, then
            if (k in O) {

                // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
                kValue = O[ k ];

                // ii. Let mappedValue be the result of calling the Call internal method of callback
                // with T as the this value and argument list containing kValue, k, and O.
                mappedValue = callback.call(T, kValue, k, O);

                // iii. Call the DefineOwnProperty internal method of A with arguments
                // Pk, Property Descriptor {Value: mappedValue, : true, Enumerable: true, Configurable: true},
                // and false.

                // In browsers that support Object.defineProperty, use the following:
                // Object.defineProperty(A, Pk, { value: mappedValue, writable: true, enumerable: true, configurable: true });

                // For best browser support, use the following:
                A[ k ] = mappedValue;
            }
            // d. Increase k by 1.
            k++;
        }

        // 9. return A
        return A;
    };
}
