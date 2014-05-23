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
    var length = Po.R.randomInt(min, max);
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

Po.R.randomEmail = function () {
    return (Po.R.randomString(3, 10) + '@' + Po.R.randomString(3, 15) + '.' + Po.R.randomString(3, 3)).toLowerCase();
}

