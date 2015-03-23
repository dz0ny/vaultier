import Ember from 'ember';
import {inject, factory} from 'vaultier/app/utils/tools/di';
import props from './../props';
/* global saveAs */

export default Ember.Route.extend({
  parentController: inject('controller:auth-register'),

  beforeModel: function (transition) {
    if (this.get('auth').get('isAuthenticated')) {
      transition.router.replaceWith('AuthRegister.sum');
    } else if (!this.get('config.registration_allow') && !this.get('config.registration_enforce')) {
      //@todo: fix error handling, this is obsolete pattern
      var e = new Error('Registration is not allowed');
      e.status = 400;
      throw e;
    }
  },

  actions: {
    next: function () {
      this.transitionTo('auth-register.step-creds');
    },

    downloadKey: function () {

      var ctrl = this.get('controller');

      // start download
      var blob = new Blob([ctrl.get('props.keys.privateKey')], {type: "text/plain;charset=utf-8"});
      saveAs(blob, "vaultier.key");

      //enable next button
      ctrl.set('props.nextButtonDisabled', false);
    }
  },

  setupController: function (ctrl) {
    ctrl.set('props', props);

    ctrl.set('props.loginButtonHidden', false);
    ctrl.set('props.nextButtonTitle', null)

    if (!ctrl.get('props.keysReady')) {
      ctrl.set('props.nextButtonDisabled', true);
      var auth = this.get('auth');
      auth.generateKeys(function (keys) {
        ctrl.set('props.keys', keys);
        ctrl.set('props.keysReady', true);
      }.bind(this));
    }
  }

});
