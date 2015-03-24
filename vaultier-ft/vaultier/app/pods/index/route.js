import Ember from 'ember';
import {inject, factory} from 'vaultier/app/utils/tools/di';

export default Ember.Route.extend(
  {
    redirect: function () {
      var auth = this.get('auth');
      if (auth.get('isAuthenticated')) {
        return this.transitionTo('Documents.index');
      } else {
        return this.transitionTo('auth-login');
      }
    }
  });

