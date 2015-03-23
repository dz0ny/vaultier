import Ember from 'ember';
import {inject, factory} from 'vaultier/app/utils/tools/di';

export default Ember.Route.extend({

  router: inject('router:main'),

  beforeModel: function (transition) {
    var router = this.get('router');
    if (this.get('auth').get('isAuthenticated')) {
      router.replaceWith('AuthRegister.sum');
    } else {
      router.replaceWith('AuthRegister.keys');
    }
  }
});

