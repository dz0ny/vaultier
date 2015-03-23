import Ember from 'ember';
import props from './../props';
import {inject, factory} from 'vaultier/app/utils/tools/di';

export default Ember.Route.extend({
  newuserinit: inject('service:newuserinit'),

  auth: inject('auth'),

  beforeModel: function (transition) {
    if (this.get('auth').get('isAuthenticated')) {
      transition.router.replaceWith('AuthRegister.sum');
    } else if (!this.get('config.registration_allow') && !this.get('config.registration_enforce')) {
      //@todo: fuj
      var e = new Error('Registration is not allowed');
      e.status = 400;
      throw e;
    }
  },

  setupController: function (ctrl) {
    this._super.apply(this, arguments);

    ctrl.set('props', props);
    ctrl.set('props.loginButtonHidden', true);
    ctrl.set('props.nextButtonDisabled', false);
    ctrl.set('props.nextButtonTitle', 'Submit your credentials');

    // prepare user model
    var user = this.modelFor('AuthRegister');

    ctrl.set('content', user);

    // check if keys, otherwise go to step 1
    if (!ctrl.get('props.keysReady')) {
      this.transitionTo('AuthRegister');
    }
  },

  actions: {
    next: function () {

      // prepare data
      var auth = this.get('auth');
      var ctrl = this.get('controller');
      var user = ctrl.get('content');
      var keys = ctrl.get('props.keys');


      // update model
      user.set('public_key', keys.publicKey);

      // preapre controller
      ctrl.set('props.nextButtonDisabled', true);

      // register promise
      var promise = user

        // save record
        .saveRecord()

        .then(function (response) {
          return auth.login(user.get('email'), keys.privateKey, false)
            .then(function () {
              auth.rememberUser(null);
            }.bind(this));
        }.bind(this))

        .then(function () {
          // create default user environment
          //@todo: it fails here, we must fix initializeUser first
          throw new Error('it fails here, we must fix initializeUser first');
          return Ember.RSVP.hash({
            node: this.get('newuserinit').initializeUser()
          });
        }.bind(this))

        .then(function (newuservalues) {

          // save transition and created root node
          ctrl.get('props').setProperties(newuservalues);
          return this.transitionTo('auth-register.step-sum');
        }.bind(this))

        .catch(function (errors) {
          // unsuccessfull login
          console.log(errors);
          ctrl.set('errors', Ember.Object.create(errors.errors));
          ctrl.set('props.nextButtonDisabled', false);
          //$.notify('We are sorry, but your account cannot be created', 'error');
          return Ember.RSVP.reject(errors);
        }.bind(this));


      //ApplicationKernel.UI.showLoaderUponPromise(promise);
    }
  }
});
