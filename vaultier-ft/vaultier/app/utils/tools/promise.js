import Ember from 'ember';
import { requireClass, requireType, requireVar } from './../syntaxsugar/types';

/**
 * @class phone.utils.tools.Promise
 */
var Tools = {
  /**
   * Ensure function result is promise
   *
   * @for phone.utils.tools.Promise
   * @param Function fn function to execute
   * @returns {Ember.RSVP.Promise}
   */
  ensurePromise: function (fn, scope, ...args) {
    requireType(fn, 'function', false, 'Function must be provided');

    return function () {
      try {
        var r = fn.apply(scope, args);
        if (r instanceof Ember.RSVP.Promise) {
          return r;
        } else {
          return Ember.RSVP.resolve(r);
        }
      } catch (e) {
        return Ember.RSVP.reject(e);
      }
    };
  },

  /**
   * Exectutes the function as promise
   *
   * @for phone.utils.tools.Promise
   * @param Function fn function to execute
   * @returns {Ember.RSVP.Promise}
   */
  executeAsPromise: function (fn) {
    return Ember.RSVP.resolve().then(fn);
  },

  /**
   * Runs function/promise after specified timeout
   * @param {Ember.RSVP.Promise|Function} promise
   * @param int timeout
   * @returns {Ember.RSVP.Promise}
   */
  deferrPromise: function (promise, timeout = 2000) {
    if (timeout) {

      return resolveAfter(timeout).then(function () {
        return ensurePromise(promise);
      });

    } else {
      return ensurePromise(promise);
    }
  },

  /**
   * Resolves after specified timeout
   * @param boolean doResolve resolve if true, rejects if false
   * @param int timeout
   * @returns {Ember.RSVP.Promise}
   */
  resolveAfter: function (timeout, doResolve = true) {
    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.run.later(function () {
        if (doResolve) {
          return resolve();
        } else {
          return reject();
        }
      }, timeout);
    });
  },


  ensurePromiseError: function (e) {
    // its undefined, create new error
    if (typeof e === 'undefined') {
      //@todo: be more specific here
      return new Error('Promise rejected without specified cause');
    }

    // error
    if (e instanceof Error) {
      // it is error
      return e;
    }

    // error convertible
    if (typeof e.toError === 'function') {
      return e.toError();
    }

    // finally some weird thing...
    return new Error('Promise rejected with unexcpected output ' + e.toString());
  }
};

export default Tools;
export var ensurePromise = Tools.ensurePromise;
export var executeAsPromise = Tools.executeAsPromise;
export var deferrPromise = Tools.deferrPromise;
export var resolveAfter = Tools.resolveAfter;
export var ensurePromiseError = Tools.ensurePromiseError;
