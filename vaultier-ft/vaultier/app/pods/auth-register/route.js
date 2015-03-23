import Ember from 'ember';
import {inject, factory} from 'vaultier/app/utils/tools/di';


export default Ember.Route.extend({

  router: inject('router'),

  store: inject('store'),

  auth: inject('auth'),


  beforeModel: function (transition) {
    if (this.get('auth').get('isAuthenticated')) {
      this.get('router').replaceWith('auth-register.step-sum');
    } else {
      this.get('router').replaceWith('auth-register.step-keys');
    }
  },

  model: function () {
    var auth = this.get('auth');
    if (auth.get('isAuthenticated')) {
      return auth.get('user');
    } else {
      return this.get('store').createRecord('User');
    }
  },

  deactivate: function () {
    var user = this.modelFor(user);
    if (user) {
      this.get('store').unloadRecord(user);
    }
  }

});
