import Ember from "ember";
import { test } from 'ember-qunit';
import { promisedComputed, resolveAfter} from './promise';
/* global module, deepEqual, throws, equal */

module('Utils - tools - promise - unit ', {});

test('promised as property returns always the same result', function () {

  var i = 0;

  // promised function to increment i on each call
  var incrementI = function() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      i++;
      Ember.run.later(function() {
        resolve(i);
      }, 50);
    });
  };

  // Object with promisable computed
  var o = Ember.Object.extend({
    value : function() {
      return incrementI();
    }.property()
  }).create();

  // I shold be always 1
  o.get('value').then(function(value) {
    equal(value,1);
  });

  o.get('value').then(function(value) {
    equal(value,1);
  });

  o.get('value').then(function(value) {
    equal(value,1);
  });

  return resolveAfter(100);



});
