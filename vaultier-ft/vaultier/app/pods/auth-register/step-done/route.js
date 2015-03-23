import props from './../props';
import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel: function() {
    if (!this.get('config.registration_allow') && !this.get('config.registration_enforce')) {
      var e = new Error('Registration is not allowed');
      e.status = 400;
      throw e;
    }
  },

  renderTemplate: function () {
    this.render(this.step, { outlet: 'AuthRegister'});
  },

  setupController: function (ctrl) {
    // prepare user model
    var user = this.modelFor('AuthRegister');
    ctrl.set('content', user);

    ctrl.set('props', props);
    ctrl.set('props.loginButtonHidden', true);
    ctrl.set('props.nextButtonDisabled', false);
    ctrl.set('props.nextButtonTitle', 'Start using vaultier');
  },

  actions: {

    next: function () {
      // get transition function created by newuserinit service this function is used to transition to proper page after registration
      // in case user refreshes the page transition is not available anymore, in that case user is redirected to index
      var transition = this.get('controller.props.transitionAfterRegister');
      if (transition) {
        transition();
      } else {
        this.transitionTo('index');
      }
    }
  }
});
