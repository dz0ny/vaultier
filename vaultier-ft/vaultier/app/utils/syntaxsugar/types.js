import Ember from 'ember';
import { InvalidTypeError } from './error';
import { isArray } from './../tools/array';

var Types = {

  requireClass: function (variable, cls, allowNull = false, msg = '') {
    if (typeof cls === 'undefined') {
      throw new InvalidTypeError('Please specify class');
    }

    if (allowNull && variable === null) {
      // ok
      return true;
    }
    if (variable instanceof cls) {
      // ok
      return true;
    }

    // not ok...

    var name;
    // @todo: better classname detection
    try {
      name = cls.toString();
    } catch (e) {
      //pass
    }

    if (name) {
      msg = msg + ' ' + ` - Given variable must be instance of ${name}`;
    } else {
      msg = msg + ' ' + ' - Given variable has wrong type/class';
    }
    throw new InvalidTypeError(msg);
  },

  requireVar: function(variable, allowNull = false, msg = '') {
    if (allowNull && variable === null) {
      return true;
    }

    if (typeof variable !== 'undefined') {
      return true;
    }

    msg = msg + ' ' + ` - Given variable must not be undefined`;
    throw new InvalidTypeError(msg);
  },

  requireType: function (variable, type, allowNull = false, msg = '') {
    if (typeof type === 'undefined') {
      throw new InvalidTypeError('Please specify type');
    }

    if (allowNull && variable === null) {
      // ok
      return true;
    }

    if (type === 'array') {
      return isArray(variable);
    }

    if (typeof variable === type) {
      // ok
      return true;
    }

    // not ok...
    msg = msg + ' ' + ` - Given variable must be instance of ${type}`;

    throw new InvalidTypeError(msg);
  },


  //@todo: update all constants to use define constant
  defineConstant: function (constant = {}) {

    constant._cache = {};
    constant.valueToName = function (v) {
      if (!this._cache[v]) {
        for (var k in this) {
          if (this.hasOwnProperty(k)) {
            if (this[k] === v) {
              this._cache[v] = k;
              break;
            }
          }
        }
      }
      return this._cache[v];
    };

    return constant;
  }


};

//@todo: rename requireType to assertType
//@todo: rename requireClass to assertClass

export var requireType = Types.requireType;
export var requireClass = Types.requireClass;
export var requireVar = Types.requireVar;
export var defineConstant = Types.defineConstant;
