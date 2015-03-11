import Ember from 'ember';
/* global RL */

/**
 * Base serializer, all custom adapters should be extension of this serializer
 * @module vaultier-dal-core
 * @class Vaultier.dal.core.JSONSerializer
 */
export default RL.JSONSerializer.extend({
  // Vaultier posts are native jsons without root
  serialize: function (resource, options) {
    options = options || {};
    options.nonEmbedded = true;
    return this._super.apply(this, [resource, options]);
  },

  keyForResourceName: function (name) {
    return name;
  },

  // Vaultier does not use camelizations
  attributeNameForKey: function (klass, key) {
    return key;
  }
});

