import Ember from 'ember';
/* global RL, moment */

/**
 * @module vaultier-dal-mixin
 * @class Vaultier.dal.mixin.RollbackMixin
 * @extends Ember.Mixin
 */
export default Ember.Mixin.create({

  init: function () {
    this._super();

    this.on('didLoad', function () {
      this.storeCleanValues();
    }.bind(this));
    this.on('didUpdate', function () {
      this.storeCleanValues();
    }.bind(this));
    this.on('didCreate', function () {
      this.storeCleanValues();
    }.bind(this));

    this.storeCleanValues();
  },

  cleanValues: {},

  storeCleanValues: function () {
    this.set('cleanValues', {});
    var fields = Ember.get(this.constructor, 'fields');
    for (var f in fields) {
      if (fields.hasOwnProperty(f)) {
        var v = this.get(f);
        this.set('cleanValues.' + f, v);

      }
    }
  },

  rollback: function () {
    if (this.get('isSaving')) {
      throw Error('Cannot rollback. Record is in state isSaving.')
    }
    var fields = Ember.get(this.constructor, 'fields');
    for (var field in fields) {
      if (fields.hasOwnProperty(field)) {
        this.set(field, this.get('cleanValues.' + field));
      }
    }
    this.set('isDirty', false);
  }

});
