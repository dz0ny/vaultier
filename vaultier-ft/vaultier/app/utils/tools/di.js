import Ember from 'ember';
import { requireClass } from './../syntaxsugar/types';

var defaultFactory = function (cls, context) {
  return cls.create();
};

var Tools = {

  inject: function (service) {
    return Ember.computed(function () {
      var container = this.get('container');
      requireClass(container, Object, false, `No container, cannot inject ${service}`);

      var injection = container.lookup(service);
      requireClass(injection, Object, false, `injection ${service} not found in container `);

      return injection;
    });
  },

  factory: function (service, factory = defaultFactory) {
    return Ember.computed(function () {
      requireClass(factory, Function, false, `factory must be function`);

      var container = this.get('container');
      requireClass(container, Object, false, `No container, cannot inject ${service}`);

      var injection = container.lookupFactory(service);
      requireClass(injection, Object, false, `injection ${service} not found in container `);

      return factory(injection, this);
    });
  }


};

export default Tools;
export var inject = Tools.inject;
export var factory = Tools.factory;
