import Ember from 'ember';
import {PrivateError, NotImplementedError, DependencyInjectionError} from './error';

var Abstract =  {

  /**
   * Placeholder empty function
   *
   * @returns {Function}
   */
  EmptyFunction: function () {
  },

  /**
   * returns empty function
   *
   * @returns {Function}
   */
  EventPlaceholder: function () {
  },

  /**
   * Placeholder for abstract function
   *
   * @returns {Function}
   */
  AbstractFunction: function() {
    return function() {
      throw new NotImplementedError();
    };
  },

  NotImplementedFunction: function() {
    return function() {
      throw new NotImplementedError();
    };
  },

  /**
   * Placeholder for abstract promise
   *
   * @returns Ember.RSVP.Promise
   */
  AbstractPromise: function() {
    try {
      throw new NotImplementedError();
    } catch (e) {
      return new Ember.RSVP.reject(e);
    }
  },

  /**
   * Placeholder for Dependency injection
   */
  DependencyInjection: function(service) {
    return Ember.computed(function () {
      //@todo: be more specific about error here
      throw new Error(`service ${service} not injected yet!`);
    });
 }


};

export var EmptyFunction = Abstract.EmptyFunction;
export var EventPlaceholder = Abstract.EventPlaceholder;
export var AbstractFunction = Abstract.AbstractFunction;
export var DependencyInjection = Abstract.DependencyInjection;
export var NotImplementedFunction = Abstract.NotImplementedFunction;
